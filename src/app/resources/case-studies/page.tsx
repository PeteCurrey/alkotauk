import { Metadata } from 'next';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHubHero from '@/components/case-studies/CaseStudyHubHero';
import CaseStudyFlagshipCard from '@/components/case-studies/CaseStudyFlagshipCard';
import CaseStudyEditorialGrid from '@/components/case-studies/CaseStudyEditorialGrid';
import { getAllCaseStudies, getFeaturedCaseStudy } from '@/lib/case-studies/data';

export const metadata: Metadata = {
  title: 'Pressure Washer Case Studies & Field Stories | Alkota UK',
  description:
    'Explore Alkota pressure washer case studies, field stories and engineered systems across heavy plant, facilities, agriculture, marine, oilfield, cleaning contractors and bespoke mobile rigs.',
  openGraph: {
    title: 'Pressure Washer Case Studies & Field Stories | Alkota UK',
    description:
      'Explore Alkota pressure washer case studies, field stories and engineered systems across heavy plant, facilities, agriculture, marine, oilfield, cleaning contractors and bespoke mobile rigs.',
    url: 'https://alkota.co.uk/resources/case-studies',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Alkota UK Industrial Case Studies and Field Proof',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies',
  },
};

export default function CaseStudiesHubPage() {
  const caseStudies = getAllCaseStudies();
  const flagship = getFeaturedCaseStudy();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://alkota.co.uk/resources/case-studies#collection',
        url: 'https://alkota.co.uk/resources/case-studies',
        name: 'Pressure Washer Case Studies & Field Stories | Alkota UK',
        description:
          'Explore Alkota pressure washer case studies, field stories and engineered systems across heavy plant, facilities, agriculture, marine, oilfield, cleaning contractors and bespoke mobile rigs.',
        publisher: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
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

      {/* ── 01: FULL VIEWPORT HERO ─────────────────────────────────── */}
      <CaseStudyHubHero />

      {/* ── 02: FLAGSHIP ANTARCTICA EDITORIAL FEATURE ──────────────── */}
      {flagship && <CaseStudyFlagshipCard caseStudy={flagship} />}

      {/* ── 03: ASYMMETRICAL EDITORIAL CASE-STUDY INDEX & DISCOVERY ── */}
      <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-[#888]">Loading Field Stories...</div>}>
        <CaseStudyEditorialGrid caseStudies={caseStudies} />
      </Suspense>

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
