import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const DAILY_LIMIT = 10;

// Service role client — bypasses RLS for rate limit counting
const supabaseAdmin = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    console.error('[carb-estimate] ANTHROPIC_API_KEY not set');
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  // --- JWT-based rate limiting (graceful: skips if Supabase not configured) ---
  let requestId: string | null = null;
  const auth = req.headers.get('authorization');
  const jwt = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  if (supabaseAdmin && jwt) {
    const { data: userData, error: authError } = await supabaseAdmin.auth.getUser(jwt);
    if (authError || !userData?.user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    const userId = userData.user.id;

    // Count requests in last 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from('ai_carb_requests')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('requested_at', since);

    if (countError) {
      console.error('[carb-estimate] rate check failed', countError);
      return NextResponse.json({ error: 'Rate check failed' }, { status: 500 });
    }

    if ((count ?? 0) >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: 'Daily limit reached. Please try again tomorrow.' },
        { status: 429, headers: { 'Retry-After': '86400' } }
      );
    }

    // Reservation: insert BEFORE calling Anthropic
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('ai_carb_requests')
      .insert({ user_id: userId, requested_at: new Date().toISOString(), estimate_returned: false })
      .select('id')
      .single();

    if (insertError) {
      console.error('[carb-estimate] rate insert failed', insertError);
      return NextResponse.json({ error: 'Rate insert failed' }, { status: 500 });
    }
    requestId = insertData?.id ?? null;
  } else if (supabaseAdmin && !jwt) {
    // Supabase is configured but no JWT sent — warn but allow (backward compat during rollout)
    console.warn('[carb-estimate] No JWT provided — rate limit not enforced for this request');
  }

  // --- Existing Anthropic proxy logic (unchanged) ---
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

Reply in exactly this format:
Line 1: carb estimate as a single number or short range (e.g. "45g" or "40-50g")
Line 2: a short meal name describing the food (e.g. "Chicken rice and vegetables", "Toast with peanut butter") — lowercase, no quantities, no brands
Line 3: one sentence explaining your reasoning including the estimated portion weight

If no food is visible, say so briefly on a single line.`,
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

  // Mark reservation as fulfilled
  if (supabaseAdmin && requestId) {
    try {
      const { error: updateError } = await supabaseAdmin
        .from('ai_carb_requests')
        .update({ estimate_returned: true })
        .eq('id', requestId);
      if (updateError) {
        console.error('[carb-estimate] reservation update failed', updateError);
      }
    } catch (err: unknown) {
      console.error('[carb-estimate] reservation update failed', err);
    }
  }

  return NextResponse.json({ result: text });
}
