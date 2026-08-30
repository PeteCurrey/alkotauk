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

  const defaultFaqs = [
    {
      q: 'Why should I choose hot water over cold water pressure washing?',
      a: 'Hot water accelerates chemical reaction rates and melts heavy hydrocarbon grease, oil, and animal fat. If you are cleaning engine bays, commercial vehicles, food processing areas, or plant machinery, cold water merely pushes grease around, whereas hot water at 90°C melts and emulsifies it rapidly.'
    },
    {
      q: 'What is an Alkota Schedule 80 heating coil and why does it last longer?',
      a: 'Schedule 80 refers to the heavy structural wall thickness of the seamless cold-rolled steel pipe used in Alkota heating coils. It is significantly thicker than industry-standard Schedule 40 coils, withstands higher thermal fatigue and operating pressure, and is backed by Alkota’s 7-Year Warranty.'
    },
    {
      q: 'Can Alkota pressure washers run on single-phase 230V or three-phase 400V power?',
      a: 'Yes. Alkota manufactures units configured for 230V single-phase, 400V 3-phase, 110V site supply, engine-driven petrol (Honda/Vanguard), and diesel-driven skid configurations.'
    },
    {
      q: 'Where are Alkota UK spare parts and service engineers based?',
      a: 'Alkota UK maintains an extensive inventory of genuine OEM replacement parts, General Pump packing kits, Beckett burner components, and high-pressure hoses dispatched nationwide with on-site engineer dispatch across the United Kingdom.'
    }
  ];

  const faqEntities = faqs.length > 0 
    ? faqs.map((f: any) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof f.answer === 'string' ? f.answer : 'Detailed engineering guidance provided by Alkota UK.',
        }
      }))
    : defaultFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        }
      }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities,
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
