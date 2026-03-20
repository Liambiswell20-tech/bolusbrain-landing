import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error('[Loops] Missing LOOPS_API_KEY');
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  const res = await fetch('https://app.loops.so/api/v1/contacts/update', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subscribed: false }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('[Loops] unsubscribe error', res.status, body);
    return NextResponse.json({ error: 'failed to unsubscribe', detail: body }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
