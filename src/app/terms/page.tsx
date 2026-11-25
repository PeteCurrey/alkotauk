import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Supply | Alkota UK',
  description: 'Terms and Conditions of Supply for Alkota UK industrial cleaning equipment, parts, chemicals and services.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://alkota.co.uk/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#FAF9F5] text-alkota-black min-h-screen pt-32 pb-24 px-6 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
            Legal
          </span>
          <h1 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none mb-10">
            Terms of Supply
          </h1>

          <div className="prose prose-sm sm:prose max-w-none text-[#444] leading-relaxed space-y-8 font-normal">
            <p className="text-sm text-[#777]">Last updated: November 2025</p>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">1. Definitions</h2>
              <p>
                In these Terms, <strong>"Alkota UK"</strong> means the entity operating this website and distributing Alkota products in the United Kingdom. <strong>"Customer"</strong> means any person or business placing an order. <strong>"Goods"</strong> means pressure washing equipment, parts, chemicals, trailers and ancillary items supplied by Alkota UK. <strong>"Services"</strong> means installation, servicing, repair and training activities.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">2. Orders & Acceptance</h2>
              <p>
                All orders are subject to acceptance by Alkota UK. A binding contract is formed only upon our written confirmation. We reserve the right to decline any order. Quotations are valid for 30 days unless otherwise stated and are subject to availability.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">3. Pricing & Payment</h2>
              <p>
                All prices are quoted exclusive of VAT unless otherwise stated. Payment terms are net 30 days from invoice date for approved trade accounts. New customers and consumer purchasers must pay in full prior to dispatch. We accept payment by BACS, card (via Stripe), or cheque. Title to Goods does not pass until payment is received in full.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">4. Delivery</h2>
              <p>
                Delivery dates are estimates only. Alkota UK will not be liable for delays caused by circumstances beyond our reasonable control. Risk passes to the Customer on delivery. The Customer must inspect Goods on receipt and report any damage or shortfall within 48 hours.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">5. Warranty</h2>
              <p>
                Alkota industrial pressure washers are covered by a 7-year heating coil warranty and a 2-year comprehensive parts warranty against defects in materials and workmanship, subject to proof of annual service by an authorised technician. Warranty is void if equipment is modified, misused, or operated outside of rated specifications. Chemical products carry a 12-month shelf-life guarantee under correct storage conditions.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">6. Returns & Cancellations</h2>
              <p>
                Goods may be returned within 14 days of delivery in original unused condition, subject to a 15% restocking charge. Bespoke or custom-manufactured items (including trailer systems and wash plant) are non-returnable. Cancellation of orders after manufacture has commenced will incur costs at Alkota UK's discretion.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Alkota UK's total liability to the Customer under any contract shall not exceed the price paid for the Goods or Services giving rise to the claim. We exclude liability for indirect, consequential or economic loss. Nothing in these Terms limits liability for death or personal injury caused by negligence, or for fraudulent misrepresentation.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="font-light text-xl sm:text-2xl text-alkota-black mb-3">9. Contact</h2>
              <p>
                For any queries regarding these Terms, please contact us at{' '}
                <a href="mailto:sales@alkota.co.uk" className="text-alkota-orange hover:underline">
                  sales@alkota.co.uk
                </a>{' '}
                or call{' '}
                <a href="tel:+447912506738" className="text-alkota-orange hover:underline">
                  +44 7912 506738
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
