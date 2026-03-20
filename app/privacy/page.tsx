import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Bolus Brain',
  description: 'How Bolus Brain collects, uses, and protects your personal health data.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4" style={{ color: '#fff' }}>{title}</h2>
      <div className="text-zinc-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl my-4" style={{ border: '1px solid #1e1e1e' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-zinc-400 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid #181818' : undefined, background: ri % 2 === 0 ? '#0a0a0a' : '#0d0d0d' }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-zinc-400 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Version 1.0 &nbsp;|&nbsp; Effective Date: 20 March 2026</p>
          <p className="text-zinc-500 text-sm">Applies to: Bolus Brain mobile application (iOS and Android)</p>

          <div className="mt-6 rounded-xl px-5 py-4 text-sm leading-relaxed" style={{ background: 'rgba(0,200,83,0.06)', border: '1px solid rgba(0,200,83,0.2)', color: '#ccc' }}>
            <span className="font-semibold" style={{ color: '#00C853' }}>IMPORTANT — NOT MEDICAL ADVICE: </span>
            Bolus Brain is a personal data logging and pattern recall tool for Type 1 diabetics. It does NOT provide medical advice, diagnoses, or insulin dosing recommendations. Always consult your diabetes care team before making changes to your insulin regimen. Always check product labels for carbohydrate content.
          </div>
        </div>

        <Section title="1. Who We Are">
          <p>Bolus Brain is developed and operated by Liam Biswell, a sole trader based in Leighton Buzzard, England, United Kingdom.</p>
          <p>For data protection purposes, Liam Biswell is the Data Controller for all personal data processed through this application.</p>
          <p className="mt-3"><span className="text-white font-medium">Contact Details</span></p>
          <p>For all privacy and data protection enquiries:</p>
          <p><a href="mailto:support@bolusbrain.app" className="underline hover:text-white transition">support@bolusbrain.app</a></p>
          <p>19 Leopold Road, Leighton Buzzard, Bedfordshire, LU7 2QU</p>
        </Section>

        <Section title="2. About This Policy">
          <p>This Privacy Policy explains what personal data we collect, why we collect it, how we use it, how long we keep it, and your rights under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018 (DPA 2018), as amended by the Data (Use and Access) Act 2025.</p>
          <p>This policy is written in plain English. If anything is unclear, please contact us before using the app.</p>
          <p>We will notify you of any material changes to this policy by in-app notification. Continued use of the app after notification constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="3. What Data We Collect">
          <p className="text-white font-medium">3.1 Special Category Health Data (Highest Protection)</p>
          <p>The following data is classified as special category data under Article 9 of the UK GDPR and receives the highest level of legal protection:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Glucose readings (mmol/L) drawn from your connected Nightscout/CGM integration</li>
            <li>Insulin doses you log manually within the app</li>
            <li>Meal names, descriptions, and photographs you upload</li>
            <li>Glucose response curves (start glucose, peak glucose, time to peak, total rise) automatically calculated after meals</li>
            <li>Context flags you choose to log (Exercise, Illness, Stress)</li>
            <li>Snack logs and quick-log entries</li>
          </ul>
          <p className="text-white font-medium mt-4">3.2 Account and Technical Data</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Email address and password hash (for account creation and authentication)</li>
            <li>Device type, operating system version, and app version (for technical support and crash diagnostics)</li>
            <li>Timestamps of app activity (for data accuracy and pattern calculations)</li>
          </ul>
          <p className="text-white font-medium mt-4">3.3 Data We Do NOT Collect</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>We do not collect your name</li>
            <li>We do not collect location data</li>
            <li>We do not use advertising trackers or analytics SDKs that profile you</li>
            <li>We do not sell your data to third parties</li>
            <li>We do not share your data with pharmaceutical companies, insurers, or employers</li>
          </ul>
        </Section>

        <Section title="4. Why We Process Your Data — Legal Bases">
          <p>Under UK GDPR, we must have a lawful basis to process your personal data. Because we process health data (special category data), we need both a lawful basis under Article 6 and a condition under Article 9.</p>
          <Table
            headers={['Purpose', 'Lawful Basis & Article 9 Condition']}
            rows={[
              ['Storing your glucose readings, insulin doses, and meal logs so the app can function', 'Article 6(1)(b) — Performance of a contract with you; Article 9(2)(a) — Your explicit consent'],
              ['Calculating glucose response curves and displaying meal pattern history', 'Article 6(1)(b) — Performance of a contract; Article 9(2)(a) — Explicit consent'],
              ['Sending in-app notifications (e.g. policy updates)', 'Article 6(1)(f) — Legitimate interests'],
              ['Diagnosing technical errors and crashes', 'Article 6(1)(f) — Legitimate interests; no special category data accessed'],
              ['Anonymised aggregate analytics for app improvement (future, opt-in)', 'Article 6(1)(a) — Consent; Article 9(2)(a) — Explicit consent'],
            ]}
          />
          <p className="text-white font-medium mt-2">Your Explicit Consent</p>
          <p>Because we process health data, we will ask for your explicit, informed, and freely given consent during onboarding. You may withdraw this consent at any time by deleting your account. Withdrawal will not affect the lawfulness of processing before withdrawal.</p>
        </Section>

        <Section title="5. How Long We Keep Your Data">
          <p>We apply the principle of data minimisation and do not keep your data longer than necessary.</p>
          <Table
            headers={['Data Type', 'Retention Period']}
            rows={[
              ['Glucose readings and insulin logs', '3 years from the date of logging, then automatically deleted'],
              ['Meal photographs', '3 years from the date of logging, then automatically deleted'],
              ['Glucose response curves and pattern data', '3 years from the date of logging, then automatically deleted'],
              ['Account credentials (email / password hash)', 'Until account deletion, or 12 months of inactivity, whichever comes first'],
              ['Technical/crash logs', '90 days, then automatically purged'],
            ]}
          />
          <p className="text-white font-medium mt-2">Why 3 Years?</p>
          <p>A 3-year retention period allows the app to identify meaningful long-term patterns in your glucose data (e.g. seasonal variation, changes after medication adjustments) while keeping data storage proportionate. You may request earlier deletion at any time — see Section 7.</p>
        </Section>

        <Section title="6. Data Storage and Security">
          <p className="text-white font-medium">6.1 Where Your Data is Stored</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>App data (meals, insulin, glucose curves) is stored in a PostgreSQL database hosted on a UK/EEA-compliant cloud provider</li>
            <li>Meal photographs are stored using a secure image hosting service (Cloudinary or Amazon S3, both with UK/EEA data residency options)</li>
            <li>Your CGM glucose data is fetched from your personal Nightscout instance — we do not store your Nightscout credentials</li>
          </ul>
          <p className="text-white font-medium mt-4">6.2 Security Measures</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Passwords are hashed using bcrypt — we never store plaintext passwords</li>
            <li>All data is transmitted using TLS 1.2 or higher encryption</li>
            <li>Database access is restricted to application services only — no public access</li>
            <li>Meal photographs are stored in private, access-controlled buckets</li>
            <li>We carry out periodic security reviews of our infrastructure</li>
          </ul>
          <p className="text-white font-medium mt-4">6.3 Data Breach</p>
          <p>In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the Information Commissioner&apos;s Office (ICO) within 72 hours and notify you without undue delay, as required by UK GDPR Article 33–34.</p>
        </Section>

        <Section title="7. Your Rights Under UK GDPR">
          <p>You have the following rights regarding your personal data. To exercise any of these rights, contact us at the address in Section 1. We will respond within one calendar month.</p>
          <Table
            headers={['Right', 'What This Means']}
            rows={[
              ['Right of Access (Article 15)', 'You can request a copy of all personal data we hold about you, in a portable format'],
              ['Right to Rectification (Article 16)', 'You can ask us to correct inaccurate data'],
              ['Right to Erasure (Article 17)', 'You can ask us to delete all your data at any time. We will action this within 30 days'],
              ['Right to Restriction (Article 18)', 'You can ask us to pause processing your data in certain circumstances'],
              ['Right to Data Portability (Article 20)', 'You can request your data in a machine-readable format (e.g. JSON or CSV) for transfer to another service'],
              ['Right to Object (Article 21)', 'You can object to processing based on legitimate interests'],
              ['Right to Withdraw Consent', 'You can withdraw your consent to process health data at any time by deleting your account in-app'],
            ]}
          />
          <p>If you believe we have handled your data incorrectly, you have the right to complain to the Information Commissioner&apos;s Office (ICO):</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">ico.org.uk</a></li>
            <li>Helpline: 0303 123 1113</li>
            <li>Address: Information Commissioner&apos;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
          </ul>
        </Section>

        <Section title="8. Sharing Your Data">
          <p>We do not sell, rent, or trade your personal data. We share data only in the following limited circumstances:</p>
          <p className="text-white font-medium mt-2">8.1 Service Providers (Data Processors)</p>
          <p>We use the following third-party processors who act on our instructions under Data Processing Agreements:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Cloud database host — for storing app data (UK/EEA based)</li>
            <li>Image storage provider (Cloudinary or Amazon S3) — for meal photographs</li>
          </ul>
          <p>All processors are contractually required to implement appropriate security measures and may not use your data for their own purposes.</p>
          <p className="text-white font-medium mt-4">8.2 Legal Obligations</p>
          <p>We may disclose data if required to do so by law, court order, or regulatory authority. We will notify you where legally permitted to do so.</p>
          <p className="text-white font-medium mt-4">8.3 Future: Anonymous Research Partnerships</p>
          <p>We will NEVER sell or share identifiable health data. If we introduce any anonymised data partnerships in future (e.g. aggregate research), we will notify you in advance, obtain separate explicit consent, and provide a straightforward way to opt out before this begins.</p>
        </Section>

        <Section title="9. International Data Transfers">
          <p>We aim to keep your data within the UK and EEA. If any of our processors operate outside the UK/EEA, we will ensure that appropriate safeguards are in place (such as UK adequacy decisions or Standard Contractual Clauses) as required by UK GDPR Chapter V.</p>
          <p>Your Nightscout data is fetched from your own Nightscout instance. We do not control where your Nightscout instance is hosted.</p>
        </Section>

        <Section title="10. Children">
          <p>Bolus Brain is not designed for children under 13. We do not knowingly collect personal data from children under 13. If you are a parent or guardian and believe your child has provided data to us, please contact us and we will delete it promptly.</p>
          <p>Users aged 13–17 should obtain parental consent before using the app.</p>
        </Section>

        <Section title="11. Automated Decision-Making">
          <p>Bolus Brain does not make automated decisions that produce legal or similarly significant effects on you. The app displays historical data and patterns from your own records to inform your personal decisions. No automated dosing recommendations are generated.</p>
          <p>Under the UK Data (Use and Access) Act 2025, automated decision-making based on special category health data that has significant effects on you requires your explicit consent and the right to human review. We do not engage in such processing.</p>
        </Section>

        <Section title="12. Cookies and Device Storage">
          <p>The Bolus Brain mobile app uses minimal local device storage for the following purposes only:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Authentication token — to keep you logged in between sessions</li>
            <li>App preferences — display settings you have configured</li>
          </ul>
          <p>We do not use advertising cookies, tracking pixels, or third-party analytics frameworks.</p>
        </Section>

        <Section title="13. ICO Registration">
          <p>Liam Biswell is registered with the Information Commissioner&apos;s Office (ICO) as a data controller. ICO Registration Number: <span className="text-white font-medium">ZC100677</span> (registered 02 March 2026, expires 01 March 2027).</p>
          <p>This registration covers the processing of personal data in connection with the Bolus Brain application.</p>
        </Section>

        <Section title="14. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. When we do:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>We will update the version number and effective date at the top of this document</li>
            <li>We will notify you via in-app notification before the changes take effect</li>
            <li>For material changes affecting how we process health data, we will ask for renewed consent where required</li>
          </ul>
          <p>You can always find the current version of this policy in the app under Settings &gt; Privacy Policy.</p>
        </Section>

        <Section title="15. Contact Us">
          <p className="text-white font-medium">Data Controller Contact</p>
          <p>Liam Biswell</p>
          <p>Email: <a href="mailto:support@bolusbrain.app" className="underline hover:text-white transition">support@bolusbrain.app</a></p>
          <p>19 Leopold Road, Leighton Buzzard, Bedfordshire, LU7 2QU</p>
          <p>Response time: We aim to respond to all data requests within 30 days.</p>
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
            <a href="/privacy" className="text-zinc-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-zinc-400 transition">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
