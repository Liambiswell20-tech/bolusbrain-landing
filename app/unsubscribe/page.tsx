'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [status, setStatus] = useState<'loading' | 'done' | 'error' | 'missing'>('loading');

  useEffect(() => {
    if (!email) {
      setStatus('missing');
      return;
    }
    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => (res.ok ? setStatus('done') : setStatus('error')))
      .catch(() => setStatus('error'));
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a0a0a', fontFamily: 'var(--font-geist-sans)' }}>
      <div className="max-w-md w-full text-center">
        <div className="flex flex-col leading-tight mb-10">
          <span className="text-white font-extrabold text-2xl tracking-tight">Bolus Brain</span>
          <span className="text-zinc-500 text-sm">Your glucose memory</span>
        </div>

        {status === 'loading' && (
          <p className="text-zinc-400 text-sm">Unsubscribing…</p>
        )}

        {status === 'done' && (
          <div className="rounded-2xl p-8" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
            <p className="text-white font-bold text-xl mb-2">You&apos;ve been unsubscribed</p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {email} has been removed from the BolusBrain waitlist. You won&apos;t hear from us again.
            </p>
            <a
              href="/"
              className="inline-block mt-6 text-xs text-zinc-600 hover:text-zinc-400 transition"
            >
              Back to bolusbrain.app
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-2xl p-8" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
            <p className="text-white font-bold text-xl mb-2">Something went wrong</p>
            <p className="text-zinc-500 text-sm">
              Please email <a href="mailto:liam@bolusbrain.app" className="underline">liam@bolusbrain.app</a> and we&apos;ll remove you manually.
            </p>
          </div>
        )}

        {status === 'missing' && (
          <div className="rounded-2xl p-8" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
            <p className="text-white font-bold text-xl mb-2">Invalid link</p>
            <p className="text-zinc-500 text-sm">
              This unsubscribe link is missing your email. Please email <a href="mailto:liam@bolusbrain.app" className="underline">liam@bolusbrain.app</a> to be removed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  );
}
