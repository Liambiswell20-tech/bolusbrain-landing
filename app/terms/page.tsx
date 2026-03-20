import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Bolus Brain',
  description: 'Terms and Conditions of Use for the Bolus Brain mobile application.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="text-zinc-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Warning({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl px-5 py-4 my-4 text-sm leading-relaxed" style={{ background: 'rgba(255,80,80,0.05)', border: '1px solid rgba(255,80,80,0.2)', color: '#ccc' }}>
      <span className="font-semibold" style={{ color: '#ff6b6b' }}>{label} </span>
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a', fontFamily: 'var(--font-geist-sans)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(10,10,10,0.9)', borderColor: '#1a1a1a', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col leading-tight">
            <span className="text-white font-extrabold text-xl tracking-tight">Bolus Brain</span>
            <span className="text-zinc-500 text-xs">Your glucose memory</span>
          </a>
          <a href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition">← Back</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00C853' }}>Legal</p>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Terms and Conditions of Use</h1>
          <p className="text-zinc-500 text-sm">Version 1.0 &nbsp;|&nbsp; Effective Date: 20 March 2026</p>
          <p className="text-zinc-500 text-sm">Applies to: Bolus Brain mobile application (iOS and Android)</p>

          <div className="mt-6 rounded-xl px-5 py-4 text-sm leading-relaxed space-y-2" style={{ background: 'rgba(255,80,80,0.05)', border: '1px solid rgba(255,80,80,0.2)', color: '#ccc' }}>
            <p className="font-bold" style={{ color: '#ff6b6b' }}>READ BEFORE USING THIS APP — IMPORTANT SAFETY NOTICE</p>
            <p>Bolus Brain is a personal data logging and pattern recall tool. It is <strong className="text-white">NOT a medical device</strong>. It does NOT provide medical advice, diagnoses, or insulin dosing recommendations. Information displayed in this app reflects only your own historical data. It does NOT tell you what insulin dose to take.</p>
            <p>Always check the carbohydrate and nutritional content on the product label before dosing. Labels vary between brands, pack sizes, and product formulations. Never rely solely on the app.</p>
            <p>Always consult your diabetes care team (DSN, consultant, or GP) before making any changes to your insulin regimen. If in doubt, seek professional medical advice.</p>
          </div>
        </div>

        <Section title="1. Agreement to These Terms">
          <p>By downloading, installing, or using the Bolus Brain application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the app.</p>
          <p>These Terms are a legally binding agreement between you and Liam Biswell (trading as Bolus Brain), based in Leighton Buzzard, England, United Kingdom.</p>
          <p>We may update these Terms from time to time. We will notify you of material changes via in-app notification. Continued use after notification constitutes acceptance of the updated Terms.</p>
        </Section>

        <Section title="2. What Bolus Brain Is — and Is Not">
          <p className="text-white font-medium">2.1 What the App Does</p>
          <p>Bolus Brain is a personal logging and pattern recall tool that:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Records meals (with optional photographs), insulin doses, and glucose readings you log manually</li>
            <li>Fetches glucose data from your connected Nightscout/CGM integration</li>
            <li>Calculates and displays glucose response curves based on your historical data</li>
            <li>Shows you what happened previously when you logged the same or similar meals</li>
            <li>Allows you to log context (exercise, illness, stress) to help you identify patterns in your own data</li>
          </ul>
          <p className="text-white font-medium mt-4">2.2 What the App Does NOT Do</p>
          <Warning label="THE APP DOES NOT GIVE MEDICAL ADVICE">
            Bolus Brain never tells you how much insulin to take. All information displayed by the app relates only to your own past data. The phrase &apos;last time you ate this, your peak was X&apos; is historical information, not a recommendation. You are solely responsible for all insulin dosing decisions.
          </Warning>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>The app does NOT diagnose any medical condition</li>
            <li>The app does NOT prescribe or recommend insulin doses</li>
            <li>The app does NOT replace your diabetes care team</li>
            <li>The app does NOT account for all factors affecting glucose (illness, stress, activity, hormones, infusion site, insulin batch variation, and many other factors)</li>
            <li>The app does NOT verify the accuracy of your CGM or glucose meter readings</li>
          </ul>
        </Section>

        <Section title="3. Medical Disclaimer and Limitation of Liability">
          <p className="text-white font-medium">3.1 Not a Medical Device</p>
          <p>Bolus Brain is not currently registered as a medical device with the Medicines and Healthcare products Regulatory Agency (MHRA) or any other regulatory body. It is provided as a personal data logging tool only.</p>
          <p>The app is not intended to be used as a substitute for professional medical judgement, diagnosis, or treatment. Always seek the advice of your diabetes care team or other qualified healthcare professional with any questions you may have regarding your diabetes management.</p>

          <p className="text-white font-medium mt-4">3.2 Insulin Dosing Warning</p>
          <Warning label="CRITICAL — INSULIN IS A HIGH-RISK MEDICATION">
            Insulin overdose can cause severe hypoglycaemia, which can be life-threatening. Never adjust your insulin dosing based solely on information shown in this app. Always check current glucose levels, consider all relevant factors, and follow the guidance of your diabetes care team. If you experience symptoms of hypoglycaemia, follow your emergency treatment plan immediately.
          </Warning>

          <p className="text-white font-medium mt-4">3.3 Label Checking Warning</p>
          <Warning label="ALWAYS CHECK PRODUCT LABELS">
            Nutritional content — including carbohydrate content — varies between products, brands, pack sizes, and product formulations. The same meal name logged on different occasions may involve different products with different carbohydrate content. Always check the product label before estimating carbohydrate intake and dosing. Do not rely on the app&apos;s historical data as a substitute for reading current product labels.
          </Warning>

          <p className="text-white font-medium mt-4">3.4 CGM Data Accuracy</p>
          <p>Continuous Glucose Monitor (CGM) readings are estimates of interstitial glucose, not blood glucose. There can be a delay of 5–15 minutes between blood glucose and interstitial glucose. CGM readings may be inaccurate during periods of rapid glucose change, or due to sensor issues. Always confirm with a blood glucose meter if clinical decisions depend on a reading.</p>

          <p className="text-white font-medium mt-4">3.5 Limitation of Liability</p>
          <p>To the fullest extent permitted by English law:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Liam Biswell (trading as Bolus Brain) shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the app</li>
            <li>We shall not be liable for any harm, injury, or adverse health outcome resulting from insulin dosing decisions made in connection with information displayed in the app</li>
            <li>We shall not be liable for loss or corruption of your logged data</li>
            <li>We shall not be liable for the accuracy of glucose data provided by your CGM, Nightscout integration, or any third-party service</li>
          </ul>
          <p className="text-white font-medium mt-4">Statutory Rights</p>
          <p>Nothing in these Terms limits or excludes any liability that cannot lawfully be excluded under English law, including liability for death or personal injury caused by our negligence, or liability for fraud or fraudulent misrepresentation.</p>
        </Section>

        <Section title="4. Your Responsibilities">
          <p>By using Bolus Brain, you agree that:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You are 13 years of age or older (users aged 13–17 must have parental consent)</li>
            <li>You will use the app only as a personal logging and pattern-recall tool, not as a basis for clinical decision-making</li>
            <li>You will always consult a qualified healthcare professional before making changes to your insulin regimen</li>
            <li>You will always check product labels for current nutritional content before dosing</li>
            <li>You will keep your account credentials secure and notify us immediately of any unauthorised access</li>
            <li>You will not use the app to log data on behalf of another person without their explicit consent</li>
            <li>You will not attempt to reverse-engineer, copy, or commercially exploit the app or its content</li>
            <li>You will not upload any content that is illegal, offensive, or infringes third-party rights</li>
          </ul>
        </Section>

        <Section title="5. Account Registration">
          <p>You must create an account to use Bolus Brain. You agree to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Provide accurate information during registration</li>
            <li>Keep your email address current</li>
            <li>Keep your password secure and not share it with others</li>
          </ul>
          <p>We reserve the right to suspend or terminate accounts that breach these Terms, are suspected of fraudulent activity, or have been inactive for more than 24 months.</p>
        </Section>

        <Section title="6. Subscription and Payment (Pro Features)">
          <p className="text-white font-medium">6.1 Free Tier</p>
          <p>Core logging features are available free of charge with no time limit. See our current feature list in-app for what is included in the free tier.</p>

          <p className="text-white font-medium mt-4">6.2 Bolus Brain Pro</p>
          <p>Bolus Brain Pro is a paid subscription offering enhanced analytics and features. Current pricing is displayed in-app and in the app store listing. Prices may change with reasonable notice.</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Subscriptions are billed monthly or annually, in advance, via the Apple App Store or Google Play Store</li>
            <li>Payment is processed by Apple or Google — we do not handle payment card details directly</li>
            <li>Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date</li>
            <li>You may cancel at any time via your App Store or Google Play subscription settings</li>
            <li>Refunds are subject to Apple&apos;s or Google&apos;s refund policies — we have no direct control over App Store refunds</li>
          </ul>

          <p className="text-white font-medium mt-4">6.3 Free Trial</p>
          <p>Where a free trial is offered, it will be clearly indicated. Unused trial periods are forfeited upon subscription purchase.</p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>All intellectual property rights in the Bolus Brain application, its design, code, and content (excluding your personal data) belong to Liam Biswell. Nothing in these Terms transfers any intellectual property rights to you.</p>
          <p>You are granted a limited, non-exclusive, non-transferable, revocable licence to use the app for your personal, non-commercial use only.</p>
        </Section>

        <Section title="8. Your Content">
          <p>You retain ownership of all data you enter into Bolus Brain (meal photos, notes, log entries). By using the app, you grant us a limited licence to store, process, and display that data solely for the purpose of operating the app for your benefit.</p>
          <p>We will never use your personal health data for commercial profiling or advertising. See our <a href="/privacy" className="underline hover:text-white transition">Privacy Policy</a> for full details of how we handle your data.</p>
        </Section>

        <Section title="9. Third-Party Services">
          <p>Bolus Brain integrates with third-party services including Nightscout (CGM data), the Apple App Store, and Google Play. Your use of these services is governed by their respective terms and privacy policies. We are not responsible for the availability, accuracy, or security of third-party services.</p>
          <p>Nightscout is an open-source, community-developed project. We are not affiliated with, and take no responsibility for, your Nightscout instance or the accuracy of data it provides.</p>
        </Section>

        <Section title="10. Service Availability">
          <p>We aim to provide a reliable service but cannot guarantee uninterrupted availability. We may take the app offline for maintenance, updates, or due to circumstances beyond our control.</p>
          <p>We are not liable for any loss resulting from service unavailability, including periods when you cannot access your historical data.</p>
        </Section>

        <Section title="11. Termination">
          <p className="text-white font-medium">11.1 By You</p>
          <p>You may stop using the app and delete your account at any time via Settings &gt; Account &gt; Delete Account. This will permanently delete all your logged data within 30 days, in accordance with our Privacy Policy.</p>
          <p className="text-white font-medium mt-4">11.2 By Us</p>
          <p>We may suspend or terminate your account if you materially breach these Terms, or if we decide to discontinue the service. We will provide reasonable notice where possible. If the service is discontinued, we will give you the opportunity to export your data before deletion.</p>
        </Section>

        <Section title="12. Governing Law and Disputes">
          <p>These Terms are governed by and construed in accordance with the laws of England and Wales.</p>
          <p>If a dispute arises, we encourage you to contact us first at <a href="mailto:support@bolusbrain.app" className="underline hover:text-white transition">support@bolusbrain.app</a> and we will attempt to resolve it informally within 30 days.</p>
          <p>If a dispute cannot be resolved informally, it shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </Section>

        <Section title="13. Severability">
          <p>If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.</p>
        </Section>

        <Section title="14. Entire Agreement">
          <p>These Terms and Conditions, together with our <a href="/privacy" className="underline hover:text-white transition">Privacy Policy</a>, constitute the entire agreement between you and Liam Biswell regarding your use of Bolus Brain, and supersede all prior agreements and understandings.</p>
        </Section>

        <Section title="15. Contact Us">
          <p className="text-white font-medium">Get in Touch</p>
          <p>For questions about these Terms, or to report concerns:</p>
          <p>Liam Biswell (Bolus Brain)</p>
          <p>Email: <a href="mailto:support@bolusbrain.app" className="underline hover:text-white transition">support@bolusbrain.app</a></p>
          <p>19 Leopold Road, Leighton Buzzard, Bedfordshire, LU7 2QU</p>
          <p>We aim to respond to all enquiries within 5 working days.</p>
        </Section>

        <div className="border-t pt-8 mt-4 text-center text-xs text-zinc-700" style={{ borderColor: '#1a1a1a' }}>
          Bolus Brain — Built by a T1D, for T1Ds. Your data is yours.
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-8" style={{ borderColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2026 BolusBrain. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-zinc-400 transition">Privacy Policy</a>
            <a href="/terms" className="text-zinc-400">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
