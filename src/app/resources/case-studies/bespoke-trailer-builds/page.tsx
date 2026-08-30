import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyConsultationCTA from '@/components/case-studies/CaseStudyConsultationCTA';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import CaseStudyBespokeWorkflow from '@/components/case-studies/CaseStudyBespokeWorkflow';
import {
  BespokeSystemAnatomy,
  BespokeTrailerPayloadCalculator,
  BespokeTrailerEditorialFAQ,
} from '@/components/case-studies/BespokeFieldTools';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';
import {
  ShieldCheck,
  Gauge,
  Droplets,
  Flame,
  Clock,
  Wrench,
  Truck,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Workflow,
  Fuel,
  Compass,
  Zap,
  Shield,
  Activity,
  HardHat,
  Tractor,
  Anchor,
  Factory,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bespoke Pressure Washer Trailers & Mobile Wash Systems | Alkota UK',
  description:
    'Explore Alkota UK’s bespoke pressure-washer trailer engineering process, from water, power and machine selection through hose reels, chemical systems, payload, serviceability and final build.',
  openGraph: {
    title: 'Bespoke Pressure Washer Trailers & Mobile Wash Systems | Alkota UK',
    description:
      'Explore Alkota UK’s bespoke pressure-washer trailer engineering process, from water, power and machine selection through hose reels, chemical systems, payload, serviceability and final build.',
    url: 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bespoke Mobile Pressure Washing Trailer Engineering and Fabrication',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/bespoke-trailer-builds',
  },
};

export default function BespokeTrailerBuildsCaseStudyPage() {
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
        datePublished: '2024-01-22T00:00:00Z',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Alkota UK Engineering Intelligence',
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
            name: 'Bespoke Trailer Builds',
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

      {/* ── 00: FULL-VIEWPORT HERO ─────────────────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 01: OPENING EDITORIAL STATEMENT ────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // The System Philosophy
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            Don’t buy a trailer.<br />
            <span className="text-[#FF6900]">Engineer a workflow.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                A trailer is simply a platform on wheels. The true engineering discipline is creating a complete, road-legal mobile wash platform that enables an operator to arrive on site, deploy 60 metres of hose in 90 seconds, strip difficult contamination with continuous 90°C thermal power, capture wastewater, and pack away safely without operational friction.
              </p>
              <p>
                Bolting an off-the-shelf pressure washer and an unbaffled water container onto a generic builder&apos;s trailer creates dangerous weight distribution, axle overloads, and maintenance headaches. Alkota UK designs and fabricates turnkey mobile systems where every component is calculated around the operator&apos;s daily contract reality.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#0D0D0B] text-white p-6 sm:p-8 border border-[#222] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                The Machine vs The System
              </span>
              <div className="space-y-3 text-xs text-[#CCC]">
                <div>
                  <strong className="text-white block text-sm mb-0.5">The Machine:</strong>
                  <p>A high-pressure pump and burner coil generating hydraulic and thermal energy.</p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <strong className="text-white block text-sm mb-0.5 text-[#FF6900]">The System:</strong>
                  <p>Type-approved chassis, baffled water storage, prime mover, live hose reels, chemical dosing, closed-loop recovery, work lighting, and technician service access.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE 12-STAGE ENGINEERING WORKFLOW ────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <CaseStudyBespokeWorkflow steps={caseStudy.workflowSteps || []} />
      </div>

      {/* ── 03: INTERACTIVE SYSTEM ANATOMY INSPECTOR ─────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-y border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <BespokeSystemAnatomy />
        </div>
      </section>

      {/* ── 04: WATER ENGINEERING & PAYLOAD CALCULATOR ───────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <BespokeTrailerPayloadCalculator />
        </div>
      </section>

      {/* ── 05: SELECTION & THERMAL ENGINEERING ──────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Hydraulic & Thermal Sizing</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            We don’t start with PSI.<br />
            <span className="text-[#FF6900]">Adding heat changes the whole system.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Consumer pressure washers market headline PSI numbers. In commercial mobile engineering, we start with the contaminant and work backwards:
              </p>
              <div className="font-mono text-xs text-[#666] bg-[#F8F7F4] p-4 border border-[#E8E8E4] space-y-1">
                <div>APPLICATION $\rightarrow$ CONTAMINATION $\rightarrow$ FLOW RATE $\rightarrow$ HEAT $\rightarrow$ DUTY CYCLE $\rightarrow$ CHASSIS</div>
              </div>
              <p>
                Integrating an industrial hot-water burner introduces substantial engineering factors: high-efficiency diesel combustion, flue gas ventilation, vibration-isolated fuel lines, electrical flame sensing, and ASTM A53 Schedule 80 heavy-wall seamless steel coils capable of handling continuous 90°C thermal output.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Prime Mover & Power Architecture
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Industrial Diesel / Petrol Engines:</strong> Kubota, Honda, and Vanguard engines with electric start and low-oil cutouts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Auxiliary Power Generators:</strong> 240V/110V power generation for onboard vacuum recovery and jobsite floodlights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Battery Management:</strong> High-output engine alternators with smart trickle charging and master isolators.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: HOSE ARCHITECTURE & HUMAN FACTORS ────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Ergonomics & Deployment</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            The hose is the operator’s working range.<br />
            <span className="text-[#FF6900]">The trailer is a workstation.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                In contractor operations, job profitability is dictated by setup and pack-down speed. Dragging 50 metres of tangled hose across a busy high street or distribution yard wastes time and creates acute trip hazards.
              </p>
              <p>
                Alkota builds feature direct-plumbed stainless steel live hose reels mounted at ergonomic waist height with 4-way roller guides. Operators simply pull out the exact hose length needed and begin washing immediately. When finished, heavy-duty gear-reduction hand cranks or electric rewinds retrieve the hose in under 60 seconds.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                Human-Factors Engineering Standards
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Kerbside Control Access:</strong> Operating controls facing the footpath rather than live highway traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Slide-Out Service Trays:</strong> Pump and engine slide outward on heavy-duty lockable runners for effortless maintenance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Lockable Tool Vaults:</strong> Secure, integrated storage for lances, surface cleaners, nozzles, and chemical canisters.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: SECTOR APPLICATION CROSS-LINK MATRIX ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Sector Adaptability</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            Where bespoke mobile systems deploy.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            Explore how Alkota mobile engineering adapts across diverse UK commercial sectors
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/resources/case-studies/one-great-northern"
              className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] hover:border-[#FF6900] transition-colors group no-underline text-inherit block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Sector 01 // Heavy Plant</span>
                <ArrowRight className="h-4 w-4 text-[#888] group-hover:text-[#FF6900] transition-colors" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900]">
                One Great Northern
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Mobile crane fleet care, high-flow hot water, and pre-inspection degreasing without fixed wash bays.
              </p>
            </Link>

            <Link
              href="/resources/case-studies/entirefm-industrial-cleaning"
              className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] hover:border-[#FF6900] transition-colors group no-underline text-inherit block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Sector 02 // Contractors</span>
                <ArrowRight className="h-4 w-4 text-[#888] group-hover:text-[#FF6900] transition-colors" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900]">
                EntireFM Facilities
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Professional facilities contractor economics, rapid turnaround, and multi-surface chewing gum removal.
              </p>
            </Link>

            <Link
              href="/resources/case-studies/agriculture"
              className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] hover:border-[#FF6900] transition-colors group no-underline text-inherit block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Sector 03 // Agriculture</span>
                <ArrowRight className="h-4 w-4 text-[#888] group-hover:text-[#FF6900] transition-colors" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900]">
                Agricultural Washdown
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Mud, grease, livestock biosecurity, tractor washdowns, and remote field trailer systems.
              </p>
            </Link>

            <Link
              href="/resources/case-studies/marine"
              className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] hover:border-[#FF6900] transition-colors group no-underline text-inherit block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Sector 04 // Maritime</span>
                <ArrowRight className="h-4 w-4 text-[#888] group-hover:text-[#FF6900] transition-colors" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900]">
                Marine & Harbourside
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Commercial fishing vessels, quayside fresh water rinsing, slipways, and trade effluent recovery.
              </p>
            </Link>

            <Link
              href="/resources/case-studies/oilfield"
              className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] hover:border-[#FF6900] transition-colors group no-underline text-inherit block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Sector 05 // Oil & Gas</span>
                <ArrowRight className="h-4 w-4 text-[#888] group-hover:text-[#FF6900] transition-colors" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900]">
                Oilfield & Extreme Duty
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Heavy crude, paraffin wax melting, drilling mud displacement, and self-contained remote logistics.
              </p>
            </Link>

            <Link
              href="/trailers/configure"
              className="p-6 bg-[#0D0D0B] text-white border border-[#222] hover:border-[#FF6900] transition-colors group no-underline block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-[#FF6900]">Interactive Tool</span>
                <ArrowRight className="h-4 w-4 text-[#FF6900]" />
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-white mb-2 group-hover:text-[#FF6900]">
                Trailer Configurator
              </h3>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Select your chassis, tank size, pressure washer skid, reels, and recovery system online.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 08: SPECIFICATIONS & CANONICAL PRODUCTS ─────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Bespoke Platform Parameter Framework"
          subtitle="Standard engineering parameters available across single and tandem-axle Alkota UK trailer builds"
        />

        {/* Canonical Recommended Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="trailers"
          headline="Core Pressure Washing Skids for Trailer Integration"
        />

        {/* Bespoke Trailer Editorial FAQ */}
        <BespokeTrailerEditorialFAQ />

        {/* ── 09: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="BESPOKE MOBILE PLATFORM SPECIFICATION"
          headline="You Don’t Need Another Trailer. You Need the Right System on Wheels."
          description="Tell us what the equipment has to do. We’ll work backwards from the application and engineer the complete mobile wash system around it."
          primaryCTA={{
            label: 'Build My Bespoke System',
            href: '/trailers/configure',
          }}
          secondaryCTA={{
            label: 'Talk to an Engineer',
            href: '/contact?enquiry=bespoke-trailer',
          }}
        />
      </div>

      {/* ── 10: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
