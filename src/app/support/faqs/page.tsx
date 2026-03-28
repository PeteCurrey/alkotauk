import Navigation from '@/components/Navigation';
import { safeFetch } from '@/sanity/client';

export const metadata = {
  title: 'Frequently Asked Questions | Alkota UK',
  description: 'Technical, sales, and service FAQs for Alkota Industrial Pressure Washers.',
};

export default async function FaqPage() {
  const query = `*[_type == "faq"] | order(category asc, question asc) {
    question,
    answer,
    category
  }`;
  
  const faqs = await safeFetch(query, []);

  // Group faqs by category if data exists, otherwise show placeholder
  const isMock = faqs.length === 0;

  // Generate FAQPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Detailed answer from portable text.', // Simplified for mock
      }
    })),
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          FREQUENTLY ASKED <span className="text-alkota-orange">QUESTIONS.</span>
        </h1>
        
        {isMock ? (
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-black italic uppercase text-3xl mt-12 mb-6 border-b border-alkota-iron pb-4">General</h2>
            <div className="mb-8">
              <h3 className="text-alkota-orange text-xl font-bold">Why should I choose hot water over cold water?</h3>
              <p className="text-alkota-silver">Hot water slices through grease, oil, and fat. If you are cleaning engines, food processing areas, or heavy earthmoving equipment, cold water simply pushes the grease around. Hot water melts it.</p>
            </div>
            <div className="mb-8">
              <h3 className="text-alkota-orange text-xl font-bold">What is Schedule 80 pipe?</h3>
              <p className="text-alkota-silver">Schedule 80 refers to the thickness of the steel pipe used in our heating coils. It is significantly thicker than standard pipe, meaning it withstands higher pressures and lasts years longer without burning through.</p>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Render dynamically grouped FAQs from Sanity here */}
            {faqs.map((faq: any, idx: number) => (
              <div key={idx} className="mb-8">
                <h3 className="text-alkota-orange text-xl font-bold">{faq.question}</h3>
                <p className="text-alkota-silver">Dynamic Answer Rendering from Portable text goes here.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
