import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudyBespokeWorkflow from '@/components/case-studies/CaseStudyBespokeWorkflow';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';
import { ArrowRight, ArrowUpRight, Wrench, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bespoke Mobile Wash Trailers Case Study | Alkota UK',
  description:
    'Discover how Alkota UK engineers turnkey mobile pressure washing trailers with integrated water tanks, hot-water skids, hose reels, and wastewater recovery.',
  openGraph: {
    title: 'Bespoke Mobile Wash Trailers Case Study | Alkota UK',
    description:
      'Discover how Alkota UK engineers turnkey mobile pressure washing trailers with integrated water tanks, hot-water skids, hose reels, and wastewater recovery.',
    url: 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bespoke Mobile Pressure Washing Trailer Engineering',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
  },
};

export default function BespokeTrailersCaseStudyPage() {
  const caseStudy = getCaseStudyBySlug('bespoke-trailer-builds');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds#article',
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
          '@id': 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
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
            name: 'Bespoke Trailer Systems',
            item: 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
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
        {/* Engineering Challenge Frame */}
        <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] mb-16">
          <h2 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-4">
            The Autonomous Mobile Cleaning Problem
          </h2>
          <p className="text-base text-[#555] leading-relaxed mb-8 font-normal">
            {caseStudy.problem}
          </p>
          <div className="border-t border-[#E8E8E4] pt-6">
            <span className="text-xs uppercase tracking-wider text-[#FF6900] block mb-3 font-normal">
              Bespoke Platform Requirements
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

        {/* 12-Step Engineering Journey */}
        <CaseStudyBespokeWorkflow steps={caseStudy.workflowSteps || []} />

        {/* Specifications */}
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Bespoke Platform Sizing Options"
          subtitle="Engineering configurations available from the Alkota UK bespoke division"
        />

        {/* Configurator Callout */}
        <div className="p-8 sm:p-12 bg-[#121212] text-white border border-[#222] my-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-mono">
              Ready to specify your rig?
            </span>
            <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
              Interactive Trailer Configurator
            </h3>
            <p className="text-sm text-[#AAA] max-w-lg font-normal">
              Customise chassis type, water tank volume, hot-water power, hose reels, and wastewater recovery with real-time payload calculation.
            </p>
          </div>
          <Link
            href="/trailers/configure"
            className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-normal no-underline shrink-0"
          >
            <span>Launch Configurator</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="trailer"
          headline="Bespoke Rig Components"
        />
      </div>

      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />
      <Footer />
    </main>
  );
}
