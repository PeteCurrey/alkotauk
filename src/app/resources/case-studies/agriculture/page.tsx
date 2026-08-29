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
  title: 'Agricultural Pressure Washers Case Study | Alkota UK',
  description:
    'How Alkota hot-water pressure washers tackle mud, manure, and grease across UK farms, tractors, combines, and livestock sheds.',
  openGraph: {
    title: 'Agricultural Pressure Washers Case Study | Alkota UK',
    description:
      'How Alkota hot-water pressure washers tackle mud, manure, and grease across UK farms, tractors, combines, and livestock sheds.',
    url: 'https://alkota.co.uk/resources/case-studies/agriculture',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Agricultural Tractor and Machinery Washdown with Alkota Hot Water',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/agriculture',
  },
};

export default function AgricultureCaseStudyPage() {
  const caseStudy = getCaseStudyBySlug('agriculture');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/agriculture#article',
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
          '@id': 'https://alkota.co.uk/resources/case-studies/agriculture',
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
            name: 'Agriculture',
            item: 'https://alkota.co.uk/resources/case-studies/agriculture',
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
        {/* Agricultural Problem Frame */}
        <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] mb-16">
          <h2 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-4">
            The Agricultural Washing Reality
          </h2>
          <p className="text-base text-[#555] leading-relaxed mb-8 font-normal">
            {caseStudy.problem}
          </p>
          <div className="border-t border-[#E8E8E4] pt-6">
            <span className="text-xs uppercase tracking-wider text-[#FF6900] block mb-3 font-normal">
              Farm Demands & Criteria
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
                Agricultural Focus 0{idx + 1}
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
          title="Agricultural Operating Specs"
          subtitle="Recommended parameters for farm workshops and livestock buildings"
        />

        {/* Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Built for British Farming"
        />
      </div>

      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />
      <Footer />
    </main>
  );
}
