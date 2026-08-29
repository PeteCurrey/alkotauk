import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHubHero from '@/components/case-studies/CaseStudyHubHero';
import CaseStudyFlagshipCard from '@/components/case-studies/CaseStudyFlagshipCard';
import CaseStudyEditorialGrid from '@/components/case-studies/CaseStudyEditorialGrid';
import { getAllCaseStudies, getFeaturedCaseStudy } from '@/lib/case-studies/data';

export const metadata: Metadata = {
  title: 'Industrial Pressure Washer Case Studies | Alkota UK',
  description:
    'See Alkota industrial pressure washers working across extreme environments, crane hire, industrial cleaning, agriculture, marine, oil and gas and bespoke mobile systems.',
  openGraph: {
    title: 'Industrial Pressure Washer Case Studies | Alkota UK',
    description:
      'See Alkota industrial pressure washers working across extreme environments, crane hire, industrial cleaning, agriculture, marine, oil and gas and bespoke mobile systems.',
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
        name: 'Industrial Pressure Washer Case Studies | Alkota UK',
        description:
          'See Alkota industrial pressure washers working across extreme environments, crane hire, industrial cleaning, agriculture, marine, oil and gas and bespoke mobile systems.',
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
      <CaseStudyFlagshipCard caseStudy={flagship} />

      {/* ── 03: ASYMMETRICAL EDITORIAL CASE-STUDY INDEX ────────────── */}
      <CaseStudyEditorialGrid caseStudies={caseStudies} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
