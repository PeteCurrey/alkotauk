import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Alkota UK',
  description: 'Privacy Policy for Alkota UK — how we collect, use and protect your personal data in accordance with UK GDPR.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://alkota.co.uk/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#FAF9F5] text-alkota-black min-h-screen pt-32 pb-24 px-6 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
            Legal
          </span>
          <h1 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none mb-10">
            Privacy Policy
          </h1>

          <div className="prose prose-sm sm:prose max-w-none text-[#444] leading-relaxed space-y-8 font-normal">
            <p className="text-sm text-[#777]">Last updated: November 2025</p>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">1. Who We Are</h2>
              <p>
                Alkota UK is the exclusive UK distributor for Alkota Cleaning Systems Inc. (Est. 1964, Alcester, South Dakota, USA). We supply industrial hot water pressure washers, bespoke mobile wash trailers, dry vapour steam cleaners, and industrial cleaning chemicals to commercial, agricultural, and industrial customers throughout the United Kingdom.
              </p>
              <p className="mt-3">
                For the purpose of UK GDPR and the Data Protection Act 2018, Alkota UK acts as the Data Controller for personal data collected through this website and our commercial activities.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">2. Data We Collect</h2>
              <p>We may collect and process the following personal data:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Name, email address, and telephone number submitted via enquiry forms</li>
                <li>Company name and address for quotation and order processing</li>
                <li>IP address and browser information collected automatically via analytics</li>
                <li>Dealer portal login credentials (email and hashed password)</li>
                <li>Payment information processed securely via Stripe (we do not store card data)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">3. How We Use Your Data</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Respond to product enquiries and provide quotations</li>
                <li>Process orders and arrange delivery of equipment</li>
                <li>Provide after-sales technical support and warranty services</li>
                <li>Send relevant product updates where you have provided consent</li>
                <li>Maintain and secure the Alkota UK Dealer Portal</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">4. Legal Basis for Processing</h2>
              <p>
                We process your data under the following lawful bases: <strong>contract performance</strong> (to fulfil orders and deliver services), <strong>legitimate interests</strong> (to respond to commercial enquiries and improve our services), <strong>consent</strong> (for marketing communications), and <strong>legal obligation</strong> (for tax and regulatory compliance).
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">5. Data Retention</h2>
              <p>
                We retain personal data only as long as necessary for the purpose for which it was collected, or as required by law. Enquiry data is typically retained for 3 years. Order and financial records are retained for 7 years as required by HMRC regulations.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">6. Your Rights</h2>
              <p>Under UK GDPR you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Access the personal data we hold about you</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Erasure of your personal data ('right to be forgotten')</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time where consent is the basis for processing</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:sales@alkota.co.uk" className="text-alkota-orange hover:underline">
                  sales@alkota.co.uk
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">7. Cookies</h2>
              <p>
                This website uses strictly necessary cookies for session management and security. We may also use analytical cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">8. Third-Party Services</h2>
              <p>We use the following third-party services which may process your data:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Supabase</strong> — secure database hosting (EU region)</li>
                <li><strong>Stripe</strong> — payment processing (PCI DSS Level 1 certified)</li>
                <li><strong>Vercel</strong> — website hosting and delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">9. Contact & Complaints</h2>
              <p>
                For data protection enquiries, please contact us at{' '}
                <a href="mailto:sales@alkota.co.uk" className="text-alkota-orange hover:underline">
                  sales@alkota.co.uk
                </a>{' '}
                or by post to our registered UK address. If you are unhappy with how we handle your data, you have the right to lodge a complaint with the{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-alkota-orange hover:underline"
                >
                  Information Commissioner's Office (ICO)
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
