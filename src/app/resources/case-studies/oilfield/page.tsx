import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';

export const metadata: Metadata = {
  title: 'Oilfield & Petrochemical Pressure Washers Case Study | Alkota UK',
  description:
    'How Alkota extreme-duty hot-water pressure washers and steam cleaners tackle heavy crude, bitumen, and drilling mud in oilfield environments.',
  openGraph: {
    title: 'Oilfield & Petrochemical Pressure Washers Case Study | Alkota UK',
    description:
      'How Alkota extreme-duty hot-water pressure washers and steam cleaners tackle heavy crude, bitumen, and drilling mud in oilfield environments.',
    url: 'https://alkota.co.uk/resources/case-studies/oilfield',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Oilfield and Petrochemical Industrial Cleaning with Alkota',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/oilfield',
  },
};

export default function OilfieldCaseStudyPage() {
  const caseStudy = getCaseStudyBySlug('oilfield');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/oilfield#article',
        headline: caseStudy.title,
        description: caseStudy.standfirst,
        image: caseStudy.heroImage,
        author: {
          '@type': 'Organization',
          name: 'Alkota UK Editorial Intelligence',
          url: 'https://alkota.co.uk',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://alkota.co.uk/resources/case-studies/oilfield',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://alkota.co.uk',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: 'https://alkota.co.uk/resources',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Case Studies',
            item: 'https://alkota.co.uk/resources/case-studies',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Oilfield',
            item: 'https://alkota.co.uk/resources/case-studies/oilfield',
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-alkota-black font-normal overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <CaseStudyHeader caseStudy={caseStudy} />

      <div className="mx-auto max-w-4xl px-6 sm:px-12 py-20 sm:py-28 font-normal">
        {/* Oilfield Challenge Frame */}
        <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] mb-16">
          <h2 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-4">
            The Hydrocarbon Challenge
          </h2>
          <p className="text-base text-[#555] leading-relaxed mb-8 font-normal">
            {caseStudy.problem}
          </p>
          <div className="border-t border-[#E8E8E4] pt-6">
            <span className="text-xs uppercase tracking-wider text-[#FF6900] block mb-3 font-normal">
              Demanded Oilfield Criteria
            </span>
            <ul className="space-y-2 text-sm text-[#666]">
              {caseStudy.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-16">
          {caseStudy.narrativeSections?.map((sec, idx) => (
            <section key={idx} className="border-t border-[#E8E8E4] pt-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-normal">
                Technical Angle 0{idx + 1}
              </span>
              <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-6">
                {sec.title}
              </h3>
              <div className="space-y-4 text-base sm:text-lg text-[#444] leading-relaxed">
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Specifications */}
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Oilfield Operating Specs"
          subtitle="Extreme thermal parameters for tubular degreasing and hazardous site washdown"
        />

        {/* Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Extreme-Duty Industrial Skids"
        />
      </div>

      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />
      <Footer />
    </main>
  );
}
