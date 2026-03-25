import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    console.error('[carb-estimate] ANTHROPIC_API_KEY not set');
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  let body: { image: string; mediaType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid request body' }, { status: 400 });
  }

  const { image, mediaType = 'image/jpeg' } = body;
  if (!image) {
    return NextResponse.json({ error: 'image required' }, { status: 400 });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: image },
            },
            {
              type: 'text',
              text: `Estimate the total carbohydrate content of the food shown in this image. Use UK nutritional standards throughout:
- Base figures on McCance & Widdowson / CoFID (UK food composition database)
- Carbohydrate means AVAILABLE carbohydrate only: starch + sugars. Do NOT include fibre.
- All portion sizes and weights in grams only. Do not use cups, ounces, or US measures.
- Use UK food references where applicable (e.g. Weetabix, Hovis, Heinz, Warburtons, Lurpak). Prefer UK branded products over US equivalents.
- Do NOT use USDA figures.
- Report one combined carbohydrate total only. Do NOT break down into sugars separately — sugars are already included within the carbohydrate figure and must not be listed or added on top.

Give a single number or short range (e.g. "45g" or "40–50g") on the first line, then one sentence explaining your reasoning including the estimated portion weight. If no food is visible, say so briefly.`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    console.error('[carb-estimate] Anthropic API error', res.status, err);
    return NextResponse.json(
      { error: err?.error?.message ?? `Anthropic error ${res.status}` },
      { status: 502 }
    );
  }

  const data = await res.json() as { content?: { text?: string }[] };
  const text = (data.content?.[0]?.text ?? '').trim();

  return NextResponse.json({ result: text });
}
