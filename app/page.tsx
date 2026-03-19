'use client';

import { useState } from 'react';
import Image from 'next/image';

const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmmqcrspr3q4f0iz6m4c7trq0';

// ─── Screenshot swap ──────────────────────────────────────────────────────────
// Set SCREENSHOTS_READY to true once you've added both files to public/screenshots/:
//   • public/screenshots/home.png          — HomeScreen (live glucose + quick log buttons)
//   • public/screenshots/carb-estimate.png — MealLogScreen showing AI carb estimation result
// Both should be portrait screenshots at the same resolution (e.g. 390×844 from your device).
const SCREENSHOTS_READY = false;
// ─────────────────────────────────────────────────────────────────────────────

const roadmapNow = [
  'Live glucose display (FreeStyle Libre)',
  'Meal photo logging',
  'AI carb estimation (UK standards)',
  'Post-meal glucose curve (3hr)',
  'Insulin dose logging',
  'est. HbA1c from 30-day data',
];

const roadmapSoon = [
  '"You\'ve eaten this before" recall',
  'Context logging (exercise, illness, stress)',
  'FreeStyle Libre direct connection',
  'Meal pattern matching',
];

const roadmapPro = [
  '3-month personalised pattern report',
  'Glucose prediction before eating',
  'Share report with your consultant',
  'Full meal analytics & best dose history',
];

// ─── iPhone mockup ────────────────────────────────────────────────────────────
// CSS-only phone frame. Shows a labelled placeholder until SCREENSHOTS_READY
// is true and the image files are present in public/screenshots/.
function IPhoneMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 172 }}>
      {/* Outer frame */}
      <div
        className="relative bg-zinc-800 shadow-2xl"
        style={{ borderRadius: '2.5rem', border: '3px solid #3f3f46' }}
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-10" style={{ paddingTop: 2 }}>
          <div className="bg-zinc-800" style={{ width: 76, height: 22, borderRadius: '0 0 1rem 1rem' }} />
        </div>

        {/* Screen area */}
        <div
          className="overflow-hidden bg-black"
          style={{ borderRadius: '2.3rem', paddingTop: 28, paddingBottom: 20 }}
        >
          {SCREENSHOTS_READY ? (
            <Image
              src={src}
              alt={alt}
              width={166}
              height={340}
              className="w-full object-cover"
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center bg-zinc-900"
              style={{ height: 340, width: '100%' }}
            >
              <span className="text-3xl mb-3">📱</span>
              <p className="text-zinc-500 text-xs text-center px-4 leading-relaxed">
                {label}
              </p>
              <p className="text-zinc-700 text-xs text-center mt-1">
                screenshot coming soon
              </p>
            </div>
          )}
        </div>

        {/* Home bar */}
        <div className="absolute inset-x-0 flex justify-center" style={{ bottom: 8 }}>
          <div className="bg-zinc-600 rounded-full" style={{ width: 64, height: 4 }} />
        </div>
      </div>

      {/* Volume buttons (left) */}
      <div className="absolute bg-zinc-600 rounded-l" style={{ left: -3, top: 64, width: 3, height: 28 }} />
      <div className="absolute bg-zinc-600 rounded-l" style={{ left: -3, top: 104, width: 3, height: 40 }} />
      <div className="absolute bg-zinc-600 rounded-l" style={{ left: -3, top: 156, width: 3, height: 40 }} />
      {/* Power button (right) */}
      <div className="absolute bg-zinc-600 rounded-r" style={{ right: -3, top: 92, width: 3, height: 56 }} />
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(LOOPS_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // 409 = already on the list — treat as success, not an error
      if (!res.ok && res.status !== 409) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="bg-green-500 border-b border-green-600">
        <div className="flex items-center justify-between px-6 py-0 max-w-6xl mx-auto w-full">
          <Image src="/logo.png" alt="BolusBrain" width={222} height={72} className="object-contain" />
          <a
            href="#hero"
            className="bg-white hover:bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full transition"
          >
            Join waitlist
          </a>
        </div>
      </nav>

      {/* ── Above-fold section ──────────────────────────────────────────────────
           Everything in this section is visible on desktop without scrolling.
           Contains: hero copy + email form + iPhone mockups + Dexcom teaser.
      ───────────────────────────────────────────────────────────────────────── */}
      <section id="hero" className="px-6 pt-10 pb-6 max-w-6xl mx-auto">

        {/* Two-column: copy + form (left) | phones (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-6">

          {/* Left — headline, tagline, email form */}
          <div>
            <div className="inline-block bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
              Now in beta · FreeStyle Libre
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              The T1D app that<br />
              <span className="text-green-400">learns you.</span>
            </h1>

            <p className="text-base text-gray-400 mb-7 leading-relaxed max-w-md">
              Built by a Type 1 diabetic. Snap a photo, log your insulin, and BolusBrain shows exactly what happened — every time.
            </p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 max-w-md">
                <p className="text-green-400 font-semibold text-lg">You&apos;re on the list 🎉</p>
                <p className="text-gray-400 text-sm mt-1">We&apos;ll be in touch when BolusBrain launches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl transition whitespace-nowrap"
                >
                  {loading ? 'Joining...' : 'Join waitlist'}
                </button>
              </form>
            )}
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>

          {/* Right — iPhone mockups (desktop only) */}
          <div className="hidden lg:flex gap-5 justify-center items-end">
            {/* Home screen — offset higher */}
            <div style={{ marginBottom: 32 }}>
              <IPhoneMockup
                src="/screenshots/home.png"
                alt="BolusBrain home screen with live glucose"
                label="Home Screen"
              />
            </div>
            {/* Carb estimate — sits lower */}
            <IPhoneMockup
              src="/screenshots/carb-estimate.png"
              alt="AI carb estimation from meal photo"
              label="AI Carb Estimation"
            />
          </div>
        </div>

        {/* CGM status bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
            <p className="text-sm text-gray-300">
              <span className="text-white font-semibold">Already live on FreeStyle Libre</span>
              {' '}— beta testing underway with Libre users
            </p>
          </div>
          <span className="shrink-0 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full font-semibold">
            Beta
          </span>
        </div>

        {/* Dexcom teaser — visible at fold, same section as hero */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <p className="text-sm text-gray-300">
              <span className="text-white font-semibold">Dexcom integration</span>
              {' '}— full CGM compatibility coming to BolusBrain
            </p>
          </div>
          <span className="shrink-0 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-semibold">
            Coming soon
          </span>
        </div>

      </section>
      {/* ── End above-fold section ──────────────────────────────────────────── */}

      {/* What it does */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📷', title: 'Photo log your meals', desc: 'Snap a photo, log insulin, and let BolusBrain do the rest.' },
            { icon: '📈', title: 'See your glucose response', desc: 'A 3-hour curve after every meal shows exactly what happened.' },
            { icon: '🧠', title: 'Build a personal memory', desc: 'Over time, BolusBrain learns how your body responds to what you eat.' },
          ].map(item => (
            <div key={item.title} className="bg-zinc-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-white text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Liam's story */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-8 md:p-10">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-4">Why I built this</p>
          <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
            &ldquo;I was diagnosed with Type 1 diabetes at 30. Late onset — no family history, no warning. Suddenly I was counting every carb, logging doses in Notes, and trying to remember what I ate three Tuesdays ago when my levels went haywire.
            <br /><br />
            I wanted an app that actually remembered for me. One that could tell me: last time you had this, your glucose peaked here, your insulin worked like this. BolusBrain is that app.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">LB</div>
            <div>
              <p className="font-semibold text-white text-sm">Liam Biswell</p>
              <p className="text-gray-500 text-xs">Founder · T1D since 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Roadmap</h2>
        <p className="text-gray-500 text-center mb-10">Where we are and where we&apos;re going</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-zinc-900 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              <span className="text-green-400 font-semibold text-sm uppercase tracking-wide">Live now</span>
            </div>
            <ul className="space-y-3">
              {roadmapNow.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Coming soon</span>
            </div>
            <ul className="space-y-3">
              {roadmapSoon.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-orange-400 mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wide">BolusBrain Pro</span>
            </div>
            <ul className="space-y-3">
              {roadmapPro.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-purple-400 mt-0.5 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8 text-center text-zinc-600 text-sm">
        <p>
          © {new Date().getFullYear()} BolusBrain ·{' '}
          <a href="mailto:support@bolusbrain.app" className="hover:text-zinc-400 transition">
            support@bolusbrain.app
          </a>
        </p>
        <p className="mt-1 text-xs text-zinc-700">
          BolusBrain does not provide medical advice. Always consult your diabetes care team.
        </p>
      </footer>

    </main>
  );
}
