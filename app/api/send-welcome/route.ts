import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json();

  console.log('[send-welcome] called — email:', email, 'firstName:', firstName ?? '(none)');

  if (!email) {
    console.error('[send-welcome] missing email');
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  const apiKey = process.env.LOOPS_API_KEY;
  const transactionalId = process.env.LOOPS_WAITLIST_TRANSACTIONAL_ID;

  console.log('[send-welcome] env check — apiKey:', apiKey ? 'present' : 'MISSING', 'transactionalId:', transactionalId ? 'present' : 'MISSING');

  if (!apiKey || !transactionalId) {
    console.error('[Loops] Missing LOOPS_API_KEY or LOOPS_WAITLIST_TRANSACTIONAL_ID');
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  const joinDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const res = await fetch('https://app.loops.so/api/v1/transactional', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transactionalId,
      email,
      dataVariables: {
        firstName: firstName || '',
        joinDate,
        unsubscribeUrl: `https://bolusbrain.app/unsubscribe?email=${encodeURIComponent(email)}`,
      },
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('[Loops] transactional API error', res.status, body);
    return NextResponse.json({ error: 'failed to send email', detail: body }, { status: 502 });
  }

  console.log('[send-welcome] transactional email sent successfully to', email);
  return NextResponse.json({ success: true });
}
