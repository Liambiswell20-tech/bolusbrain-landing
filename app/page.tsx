'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmmqcrspr3q4f0iz6m4c7trq0';
const SCREENSHOTS_READY = false;

// ─── Fade-up animation wrapper ────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Email waitlist form ───────────────────────────────────────────────────────
const CGM_OPTIONS = ['Libre', 'Dexcom', 'Other', 'None yet'] as const;

function WaitlistForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [cgmType, setCgmType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ email });
      if (firstName) params.set('firstName', firstName);
      if (cgmType) params.set('cgmType', cgmType);
      const res = await fetch(LOOPS_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!res.ok && res.status !== 409) {
        const body = await res.text().catch(() => '(no body)');
        console.error('[Loops] HTTP', res.status, res.statusText, body);
        throw new Error(`HTTP ${res.status}: ${body}`);
      }
      // Fire transactional confirmation email (non-blocking — don't fail the signup if this errors)
      console.log('[Loops] firing send-welcome for', email);
      fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: firstName || '' }),
      })
        .then(async r => {
          const body = await r.json().catch(() => ({}));
          if (r.ok) {
            console.log('[Loops] send-welcome success', body);
          } else {
            console.error('[Loops] send-welcome failed', r.status, body);
          }
        })
        .catch(err => console.error('[Loops] send-welcome network error:', err));
      setSubmitted(true);
    } catch (err) {
      console.error('[Loops] form submission error:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl p-5 max-w-md" style={{ background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.25)' }}>
        <p className="font-semibold text-lg" style={{ color: '#00C853' }}>You&apos;re on the list</p>
        <p className="text-sm mt-2 text-zinc-400">A confirmation email is on its way — check your junk folder if you don&apos;t see it. Mark us as safe to make sure you get updates going forward.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none transition text-sm font-semibold"
            style={{ background: '#2a2a2a', border: '1px solid #444', color: '#fff' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#00C853')}
            onBlur={e => (e.currentTarget.style.borderColor = '#444')}
          />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none transition text-sm font-semibold"
            style={{ background: '#2a2a2a', border: '1px solid #444', color: '#fff' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#00C853')}
            onBlur={e => (e.currentTarget.style.borderColor = '#444')}
          />
        </div>
        <div>
          <p className="text-xs text-zinc-600 mb-2 text-center">Which CGM do you use?</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {CGM_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setCgmType(cgmType === opt ? '' : opt)}
                className="text-xs px-3 py-1.5 rounded-lg transition font-medium"
                style={{
                  background: cgmType === opt ? 'rgba(0,200,83,0.15)' : '#111',
                  border: cgmType === opt ? '1px solid rgba(0,200,83,0.5)' : '1px solid #2a2a2a',
                  color: cgmType === opt ? '#00C853' : '#666',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="font-bold px-6 py-3 rounded-xl transition text-sm disabled:opacity-50"
          style={{ background: '#00C853', color: '#000' }}
        >
          {loading ? 'Joining…' : 'Join waitlist'}
        </button>
      </form>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      <p className="text-xs text-zinc-700 mt-2">No spam. Unsubscribe any time.</p>
    </div>
  );
}

// ─── iPhone mockup ────────────────────────────────────────────────────────────
function IPhoneMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 172 }}>
      <div className="relative bg-zinc-800 shadow-2xl" style={{ borderRadius: '2.5rem', border: '3px solid #2a2a2a' }}>
        <div className="absolute top-0 inset-x-0 flex justify-center z-10" style={{ paddingTop: 2 }}>
          <div className="bg-zinc-800" style={{ width: 76, height: 22, borderRadius: '0 0 1rem 1rem' }} />
        </div>
        <div className="overflow-hidden bg-black" style={{ borderRadius: '2.3rem', paddingTop: 28, paddingBottom: 20 }}>
          {SCREENSHOTS_READY ? (
            <Image src={src} alt={alt} width={166} height={340} className="w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center bg-zinc-900" style={{ height: 340, width: '100%' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0,200,83,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="3" stroke="#00C853" strokeWidth="1.5"/>
                  <circle cx="12" cy="17" r="1" fill="#00C853"/>
                </svg>
              </div>
              <p className="text-zinc-600 text-xs text-center px-4 leading-relaxed">{label}</p>
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 flex justify-center" style={{ bottom: 8 }}>
          <div className="bg-zinc-600 rounded-full" style={{ width: 64, height: 4 }} />
        </div>
      </div>
      <div className="absolute bg-zinc-700 rounded-l" style={{ left: -3, top: 64, width: 3, height: 28 }} />
      <div className="absolute bg-zinc-700 rounded-l" style={{ left: -3, top: 104, width: 3, height: 40 }} />
      <div className="absolute bg-zinc-700 rounded-l" style={{ left: -3, top: 156, width: 3, height: 40 }} />
      <div className="absolute bg-zinc-700 rounded-r" style={{ right: -3, top: 92, width: 3, height: 56 }} />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const steps = [
  { n: '01', title: 'Snap a photo of your meal or add a note', desc: 'BolusBrain estimates carbs from the photo using UK CoFID food standards — no manual entry needed.' },
  { n: '02', title: 'Log your insulin dose', desc: 'Record your bolus alongside the meal. Takes three seconds, one-handed.' },
  { n: '03', title: 'See exactly what happened', desc: 'A 3-hour glucose curve shows precisely how your body responded to that meal and dose.' },
];

const features = [
  { icon: '⚡', title: 'Live glucose display', desc: 'Real-time readings from FreeStyle Libre, always in mmol/L.' },
  { icon: '📷', title: 'AI carb estimation', desc: 'Snap a photo — get a carb count using UK CoFID standards.' },
  { icon: '🧠', title: 'Pattern memory', desc: 'BolusBrain remembers what you ate and how your body responded.' },
  { icon: '📊', title: '3-month review', desc: 'Estimated HbA1c and full trend analysis from your own data.' },
  { icon: '📝', title: 'Context logging', desc: 'Log exercise, illness, and stress alongside meals and insulin.' },
  { icon: '🩺', title: 'Consultant export', desc: 'Share a clear, readable report with your diabetes care team.' },
];

const compareRows: Array<{ label: string; bb: boolean | string; mysugr: boolean | string; snaq: boolean | string; quin: boolean | string; gb: boolean | string }> = [
  { label: 'T1D-only focus',    bb: true,      mysugr: false,      snaq: false,  quin: true,   gb: false },
  { label: 'Pattern memory',    bb: true,      mysugr: false,      snaq: false,  quin: false,  gb: false },
  { label: 'UK-native',         bb: true,      mysugr: false,      snaq: true,   quin: true,   gb: false },
  { label: 'Free meal logging', bb: true,      mysugr: false,      snaq: true,   quin: true,   gb: false },
  { label: 'Price',             bb: 'Free',    mysugr: '£2.99/mo', snaq: 'Free', quin: 'Free', gb: '£3.99/mo' },
];

const apps = ['BolusBrain', 'mySugr', 'SNAQ', 'Quin', 'Glucose Buddy'] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a', fontFamily: 'var(--font-geist-sans)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(10,10,10,0.9)', borderColor: '#1a1a1a', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-white font-extrabold text-2xl tracking-tight">Bolus Brain</span>
            <span className="text-zinc-500 text-sm">Your glucose memory</span>
          </div>
          <a
            href="#waitlist"
            className="text-sm font-bold px-5 py-2.5 rounded-full transition"
            style={{ background: '#00C853', color: '#000' }}
          >
            Join waitlist
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <FadeUp>
          <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-widest uppercase"
            style={{ background: 'rgba(0,200,83,0.08)', color: '#00C853', border: '1px solid rgba(0,200,83,0.18)' }}>
            Now in beta · FreeStyle Libre
          </div>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
            The T1D app that{' '}
            <span style={{ color: '#00C853' }}>learns&nbsp;you.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">
            Snap a photo. Log your dose. See your glucose response — every meal, every time. Built by a Type 1 diabetic, for Type 1 diabetics.
          </p>
        </FadeUp>
        <FadeUp delay={0.15} className="flex justify-center">
          <WaitlistForm />
        </FadeUp>
      </section>

      {/* ── How it works ── */}
      <section className="border-t py-20 px-6" style={{ borderColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00C853' }}>How it works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-14 max-w-lg leading-tight">Three steps. Less than a minute.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.07}>
                <div className="rounded-2xl p-7 h-full" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                  <p className="text-5xl font-black mb-5 leading-none" style={{ color: 'rgba(0,200,83,0.15)' }}>{s.n}</p>
                  <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t py-20 px-6" style={{ borderColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00C853' }}>Features</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-14 leading-tight">Everything you need.<br />Nothing you don&apos;t.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <div className="rounded-2xl p-6 h-full" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                  <span className="text-2xl mb-4 block">{f.icon}</span>
                  <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="border-y py-12 px-6" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
        <FadeUp>
          <p className="text-center text-lg md:text-xl font-medium text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Built by a Type 1 diabetic.{' '}
            <span className="text-white font-semibold">Tested on real meals.</span>{' '}
            Designed for real life.
          </p>
        </FadeUp>
      </section>

      {/* ── Comparison table ── */}
      <section className="border-t py-20 px-6" style={{ borderColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00C853' }}>Why BolusBrain</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 leading-tight">How we compare</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #1e1e1e' }}>
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }}>
                    <th className="text-left px-5 py-4 text-zinc-600 font-medium w-44"></th>
                    {apps.map(app => (
                      <th key={app} className="px-4 py-4 text-center font-semibold" style={app === 'BolusBrain' ? { color: '#00C853' } : { color: '#aaa' }}>
                        {app === 'BolusBrain' ? (
                          <span className="inline-flex items-center gap-1.5 justify-center">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00C853' }} />
                            {app}
                          </span>
                        ) : app}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, ri) => {
                    const vals = [row.bb, row.mysugr, row.snaq, row.quin, row.gb];
                    return (
                      <tr key={row.label} style={{ borderBottom: ri < compareRows.length - 1 ? '1px solid #181818' : undefined, background: ri % 2 === 0 ? '#0a0a0a' : '#0d0d0d' }}>
                        <td className="px-5 py-4 text-zinc-400">{row.label}</td>
                        {vals.map((val, ci) => (
                          <td key={ci} className="px-4 py-4 text-center" style={ci === 0 ? { background: 'rgba(0,200,83,0.04)' } : {}}>
                            {typeof val === 'boolean' ? (
                              val
                                ? <span className="font-bold text-base" style={{ color: '#00C853' }}>✓</span>
                                : <span className="text-zinc-700">—</span>
                            ) : (
                              <span style={ci === 0 ? { color: '#00C853', fontWeight: 600 } : { color: '#666' }}>{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="waitlist" className="border-t py-24 px-6" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
        <div className="max-w-xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Your glucose has a memory.<br />
              <span style={{ color: '#00C853' }}>Now so does your app.</span>
            </h2>
            <p className="text-zinc-500 mb-10 text-sm leading-relaxed">
              Join the waitlist and be the first to know when BolusBrain is ready.
            </p>
          </FadeUp>
          <FadeUp delay={0.08} className="flex justify-center">
            <WaitlistForm />
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t px-6 py-10" style={{ borderColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-2xl tracking-tight">Bolus Brain</span>
              <span className="text-zinc-500 text-sm">Your glucose memory</span>
            </div>
            <p className="text-xs text-zinc-700 mt-2">ICO Registration: ZC100677</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-xs text-zinc-600">
            <div className="flex gap-5">
              <a href="/privacy" className="hover:text-zinc-400 transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-zinc-400 transition">Terms</a>
            </div>
            <p>© 2026 BolusBrain. All rights reserved.</p>
            <p className="text-zinc-800">Not medical advice. Consult your diabetes care team.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
