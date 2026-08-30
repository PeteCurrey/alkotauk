import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyEvidencePanel from '@/components/case-studies/CaseStudyEvidencePanel';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyConsultationCTA from '@/components/case-studies/CaseStudyConsultationCTA';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';
import {
  ShieldCheck,
  Building2,
  Warehouse,
  Flame,
  Gauge,
  Droplets,
  Clock,
  Wrench,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Layers,
  Activity,
  SlidersHorizontal,
  CircleDot,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EntireFM Industrial Cleaning | Professional Pressure Washer Case Study | Alkota UK',
  description:
    'Explore how industrial hot-water pressure washing supports professional cleaning operations, from grease and heavy contamination to contractor productivity, serviceability and uptime.',
  openGraph: {
    title: 'EntireFM Industrial Cleaning | Professional Pressure Washer Case Study | Alkota UK',
    description:
      'Explore how industrial hot-water pressure washing supports professional cleaning operations, from grease and heavy contamination to contractor productivity, serviceability and uptime.',
    url: 'https://alkota.co.uk/resources/case-studies/entirefm-industrial-cleaning',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'EntireFM Industrial Cleaning & Facilities Management Hot Water Pressure Washing',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/entirefm-industrial-cleaning',
  },
};

export default function EntireFMPage() {
  const caseStudy = getCaseStudyBySlug('entirefm-industrial-cleaning');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/entirefm-industrial-cleaning#article',
        headline: caseStudy.title,
        description: caseStudy.standfirst,
        image: caseStudy.heroImage,
        datePublished: '2024-01-22T00:00:00Z',
        dateModified: new Date().toISOString(),
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
          '@id': 'https://alkota.co.uk/resources/case-studies/entirefm-industrial-cleaning',
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
            name: 'EntireFM',
            item: 'https://alkota.co.uk/resources/case-studies/entirefm-industrial-cleaning',
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

      {/* ── 00: FULL-VIEWPORT CINEMATIC HERO ───────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 01: OPENING STATEMENT & CONTRACTOR ECONOMICS ───────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // Contractor Economics
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            A domestic machine costs money when you buy it.<br />
            <span className="text-[#FF6900]">A professional machine costs money when it stops.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                For a commercial cleaning contractor or facilities management provider, pressure washing machinery is not merely a utility stored in a van. It is a revenue-producing production asset. Every hour spent on site is directly linked to labour cost, customer satisfaction, and contract margin.
              </p>
              <p>
                When a lightweight machine falters — struggling to produce continuous hot water, suffering pump cavitation, blowing delicate unloader seals, or requiring repeated slow passes across grease-stained concrete — the economic loss is immediate. Professional contractors require equipment engineered to operate under continuous duty cycles without interruption.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-6 sm:p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Operational Friction Points That Cost Money
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-alkota-black">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Lukewarm Water:</strong> Smearing oily binders instead of emulsifying them.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Inadequate Flow:</strong> Loosening dirt without sufficient volume to flush it away.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Thermal Cutout:</strong> Intermittent duty cycles forcing idle operator downtime.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Fragile Components:</strong> Plastic unloader bodies cracking under pressure spikes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Repeated Passes:</strong> Burning costly labour hours to achieve an acceptable standard.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE OPERATOR (THE CONTRACTOR) ───────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Contractor Profile</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
                EntireFM
              </h2>
              <p className="text-sm uppercase tracking-wider text-[#FF6900] font-mono mb-6">
                Facilities Management & Industrial Cleaning · UK Operations
              </p>
              <div className="space-y-4 text-base text-[#444] leading-relaxed">
                <p>
                  EntireFM provides integrated facilities management, specialist building maintenance, and comprehensive industrial cleaning services across commercial property portfolios throughout the UK.
                </p>
                <p>
                  Their specialist industrial teams are called upon to handle demanding external hardstanding, distribution centre loading bays, warehouse floor deep cleans, and factory decommissioning projects where standard commercial cleaning methods prove inadequate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E8E4] text-xs">
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Core Sector</span>
                  <span className="text-alkota-black font-normal">Facilities Management (FM)</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Service Scope</span>
                  <span className="text-alkota-black font-normal">Industrial & Deep Cleaning</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Operating Footprint</span>
                  <span className="text-alkota-black font-normal">Commercial & Industrial UK</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Operational Focus</span>
                  <span className="text-alkota-black font-normal">Planned & Reactive Delivery</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEFEA] border border-[#E8E8E4]">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial warehouse floor cleaning and facilities management"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-3 text-[11px] text-white flex items-center justify-between border-t border-white/10">
                  <span>Industrial concrete floor degreasing in commercial warehouse</span>
                  <span className="text-[#AAA] uppercase tracking-wider text-[10px]">Commercial Site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: THE ENVIRONMENTS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Operating Environments</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            The job changes. The requirement doesn’t.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            Typical commercial cleaning environments encountered by facilities contractors
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">01 // LOGISTICS</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Warehouses & Hubs
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Extensive internal concrete floors, loading dock levellers, and distribution bays marked by heavy forklift tyre scuffs and pallet friction.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">02 // HARDSTANDING</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Service Yards & Aprons
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Large external concrete aprons, trailer parking hardstanding, and fuel delivery islands contaminated with diesel residue and road films.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">03 // MACHINERY</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Plant & Equipment
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Fixed manufacturing plant footprints, conveyor drive assemblies, and compactors requiring high-temperature degreasing during maintenance shutdowns.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">04 // ENVELOPES</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Building Exteriors
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Commercial cladding panels, entrance canopies, structural steel frames, and perimeter brickwork affected by traffic soot and organic staining.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">05 // SERVICES</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Back-of-House Zones
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Refuse stores, recycling compounds, grease-trap access areas, and service corridors demanding thermal sanitisation and odour control.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">06 // DEEP CLEANS</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Decommissioning
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Lease-end dilapidation cleans and factory restorations where years of oil soakage and chemical deposits must be removed to bare substrate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: THE CONTAMINATION TAXONOMY ───────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Contamination Science</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            Dirt isn’t one material.<br />
            <span className="text-[#FF6900]">Neither is the solution.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-14 font-normal">
            Treating every commercial surface with cold water and maximum pressure is ineffective and risks damaging substrates. Professional industrial cleaning requires matching thermal energy, flow volume, pressure, and chemical dwell to the specific molecular profile of the contaminant.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL PROFILE 01</span>
              <h4 className="font-light text-base uppercase text-white mb-2">Hydrocarbon Oils & Grease</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Gearbox weeping, motor oil, and hydraulic films. Requires 80°C–90°C thermal breakdown to reduce viscosity and lift from porous concrete.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL PROFILE 02</span>
              <h4 className="font-light text-base uppercase text-white mb-2">Hardened Rubber Tyre Burns</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Forklift friction deposits in warehouse aisles. Demands concentrated rotary surface pressure combined with hot water to soften rubber binders.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL PROFILE 03</span>
              <h4 className="font-light text-base uppercase text-white mb-2">Atmospheric Carbon & Soot</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Diesel particulate and industrial fallout on cladding. Requires alkaline chemical pre-treatment and wide-fan medium-pressure rinsing.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL PROFILE 04</span>
              <h4 className="font-light text-base uppercase text-white mb-2">Organic Biofilms & Slime</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Algae, moss, and food residues in wet service corridors. Thermal water aids sanitisation and kills spore roots without aggressive biocide runoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: THE FOUR VARIABLES (CLEANING PHYSICS) ────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Physics of Cleaning</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
            Pressure is only one number.
          </h2>

          <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-3xl mb-12">
            The cleaning industry often over-indexes on pump pressure (PSI / BAR). In reality, professional cleaning productivity is governed by the balanced interaction of four fundamental physical variables.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#E8E8E4]">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Gauge className="h-4 w-4" />
                <span>Variable 01</span>
              </div>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Pressure</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Mechanical cutting force. High enough to shear surface bonds, but calibrated to avoid etching concrete or stripping protective paint coats.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Droplets className="h-4 w-4" />
                <span>Variable 02</span>
              </div>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Flow Rate</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Flushing capacity (Litres per Minute). Flow floats loosened contamination away. Without high volume, dirt simply settles back onto the surface.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] border-t-2 border-t-[#FF6900]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Flame className="h-4 w-4" />
                <span>Variable 03</span>
              </div>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Thermal Heat</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Thermal emulsification. 80°C–90°C water transforms solid grease and sticky oils into easily rinseable liquid emulsions instantly.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Clock className="h-4 w-4" />
                <span>Variable 04</span>
              </div>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Time / Output</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Labour velocity. Balancing pressure, flow, and heat dramatically increases square metres cleaned per hour, protecting project profit margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: WHY HOT WATER ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Thermal Thermodynamics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Cold water moves dirt.<br />
            <span className="text-[#FF6900]">Hot water can change the contamination.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                In the right industrial cleaning application, heating water to 80°C–90°C fundamentally alters the physical state of the contaminant. Petroleum oils, animal fats, tyre waxes, and fuel residues have high melting thresholds.
              </p>
              <p>
                When cold water hits heavy grease, it spreads the oily layer into a wider film. Hot water melts the hydrocarbon binder into an emulsion, allowing standard flow to wash it cleanly into drainage channels. This materially reduces physical scrubbing time and enhances the effectiveness of cleaning chemicals.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Thermal Impact on Industrial grimes
              </span>
              <div className="space-y-3 text-xs sm:text-sm text-[#555]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Viscosity Drop:</strong> Grease liquefies above 65°C without harsh solvents.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Detergent Activation:</strong> Chemical surfactants perform at optimal kinetic energy.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Rapid Drying:</strong> High surface temperature speeds concrete dry times on internal floors.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Reduced Runoff:</strong> Lower chemical concentrations satisfy site discharge criteria.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: PROFESSIONAL DUTY CYCLE ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Contractor Duty Cycle</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The job doesn’t stop after twenty minutes.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Commercial cleaning contractors do not run machines for brief 15-minute bursts. An industrial warehouse floor deep clean or a logistics depot washdown frequently demands 6 to 8 hours of continuous, multi-operator trigger time across weekend shutdowns.
              </p>
              <p>
                Consumer pressure washers use high-speed direct-drive pumps (2,800+ RPM) with aluminium heads and thin coils that overheat under sustained loads. Alkota machines are built with low-speed (1,450 RPM) ceramic plunger pumps and heavy Schedule 80 steel coils designed for true 100% continuous industrial duty.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Slow-RPM Pump</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">1,450 RPM Operation</span>
                <p className="text-[#666]">Lower crankshaft speed cuts heat build-up and seal friction, extending packing life for thousands of operating hours.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Schedule 80 Pipe</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">ASTM A53 Cold-Rolled Steel</span>
                <p className="text-[#666]">Heavy-wall continuous coil withstands violent thermal cycling and hard-water scale without cracking.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Industrial Burner</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">Continuous Thermal Output</span>
                <p className="text-[#666]">Modulating combustion system maintains target water temperature even during continuous dual-lance trigger pulls.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Thermal Protection</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">Hydro-Insulated Casing</span>
                <p className="text-[#666]">Double-wall air-jacket design cools outer surfaces while preheating burner intake air for thermal efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: CONTRACTOR WORKFLOW (FIELD SOP) ─────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Operational Process</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            Arrive. Set up. Clean. Move on.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            A professional industrial cleaning site workflow
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 01</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">01 / Assess</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Survey substrate integrity, identify contamination types, locate drainage points, and evaluate electrical/water hookup availability.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 02</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">02 / Control</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Establish safety barriers, protect sensitive electrical junction boxes, and position drain bunds or vacuum recovery dams.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 03</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">03 / Pre-Treat</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Apply targeted industrial degreasers or detergents to thick oil pools or tyre burns, allowing calibrated chemical dwell time.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 04</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">04 / Heat</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Fire the Alkota Schedule 80 burner and calibrate water temperature (75°C–90°C) according to the contamination profile.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 05</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">05 / Clean</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Execute overlapping passes using rotary flat-surface cleaners for open concrete or calibrated hot-water lances for machinery edges.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 06</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">06 / Rinse</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Use high volumetric water flow to flush suspended solids, emulsified oils, and loosened grit towards collection points.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 07</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">07 / Recover</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Operate vacuum recovery systems or oil-water filtration where environmental site regulations prohibit untreated surface runoff.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 08</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">08 / Verify</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Conduct quality walk-through with site facilities managers to confirm surfaces meet contract cleanliness specifications.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 09</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">09 / Reset</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Reel in high-pressure hoses, drain water filters, conduct post-op checks, and stage the rig ready for the next deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: THE ECONOMICS OF DOWNTIME & LIFECYCLE VALUE ────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Total Cost of Ownership</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The expensive machine is the one that stops the job.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                When professional cleaning machinery breaks down in the middle of a commercial contract, the purchase price difference between an entry-level washer and an industrial machine evaporates in minutes.
              </p>
              <p>
                Contractors face idle labour hours, rescheduled night shifts, emergency hire expenses, customer frustration, and potential penalty clauses. Alkota designs machinery around lifecycle reliability: serviceable components, standardized plumbing, and heavy-gauge construction that eliminates premature machine write-offs.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#888] block mb-1">
                  Purchase Price vs Lifecycle Value
                </span>
                <h4 className="font-light text-xl uppercase tracking-tight text-alkota-black">
                  What Are You Actually Paying For?
                </h4>
              </div>

              <div className="space-y-3 text-xs text-[#555] border-t border-[#E8E8E4] pt-4">
                <div className="flex justify-between items-center py-1 border-b border-[#E8E8E4]">
                  <span>Component Serviceability:</span>
                  <span className="font-medium text-alkota-black">100% Rebuildable Ceramic Pump</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E8E8E4]">
                  <span>Heating Coil Longevity:</span>
                  <span className="font-medium text-alkota-black">Schedule 80 Seamless (7-Yr Warranty)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E8E8E4]">
                  <span>Spare Parts Availability:</span>
                  <span className="font-medium text-alkota-black">Next-Day UK Dispatch</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E8E8E4]">
                  <span>Contract Downtime Risk:</span>
                  <span className="font-medium text-[#FF6900]">Minimised via Heavy-Duty Build</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10: SERVICEABILITY & PARTS AVAILABILITY ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">10</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Maintenance & Support</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Built to be worked on.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Industrial machinery should never require an engineering degree or proprietary diagnostic software to perform routine maintenance. Alkota builds open-chassis frames where all critical wear items — unloader valves, fuel filters, burner electrodes, pump packings, and oil drains — are immediately accessible with standard hand tools.
              </p>
              <p>
                Supported by Alkota UK’s national servicing network and comprehensive inventory of replacement pumps, coils, burner motors, and seal kits, contractor equipment is maintained in the field for continuous revenue generation.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black font-normal hover:text-[#FF6900] transition-colors no-underline"
                >
                  <span>Explore UK Servicing Plans</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/support/replacement-parts"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#666] font-normal hover:text-black transition-colors no-underline"
                >
                  <span>Genuine Replacement Parts</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Field-Serviceable Architecture
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>External unloader valve and plumbing for quick replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Instant access to fuel filter water-separators</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Clear-sight oil dipsticks and low-level engine shutoffs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Standardised BSP fittings compatible with UK industrial accessories</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11: HOSE & WORKSPACE MANAGEMENT ─────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">11</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Ergonomics & Safety</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The machine is only half the workspace.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                In large commercial facilities, dragging 300kg pressure washers across warehouse floors or through tight pedestrian gates causes fatigue and site hazards.
              </p>
              <p>
                Professional contractors position the machine centrally or in a mobile trailer, deploying 30m to 60m of continuous non-marking hot-water hose via heavy-duty stainless steel live reels. This eliminates machine movement, reduces setup time, protects customer surfaces, and streamlines pack-down.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Hose Management Advantages
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#FF6900] font-mono uppercase block mb-1">Extended Radius</span>
                  <span className="text-alkota-black font-medium block">30m – 60m Runs</span>
                  <p className="text-[#666] mt-1">Clean deep warehouse floors without relocating the machine.</p>
                </div>
                <div>
                  <span className="text-[#FF6900] font-mono uppercase block mb-1">Site Safety</span>
                  <span className="text-alkota-black font-medium block">Trip Hazard Control</span>
                  <p className="text-[#666] mt-1">Live swivels and friction brakes keep hoses tidy and organized.</p>
                </div>
                <div>
                  <span className="text-[#FF6900] font-mono uppercase block mb-1">Substrate Care</span>
                  <span className="text-alkota-black font-medium block">Non-Marking Covers</span>
                  <p className="text-[#666] mt-1">Prevents black rubber scuffs on clean industrial screeds.</p>
                </div>
                <div>
                  <span className="text-[#FF6900] font-mono uppercase block mb-1">Rapid Pack-Down</span>
                  <span className="text-alkota-black font-medium block">Roller Guides</span>
                  <p className="text-[#666] mt-1">Rewind 60m of hot hose in under two minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12: CHEMICAL INTEGRATION & ENVIRONMENTAL CONTROLS ───────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">12</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Chemistry & Drainage</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            Heat. Pressure. Chemistry.<br />
            <span className="text-[#FF6900]">Where does the water go?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                Certain industrial contaminants require chemical assistance. By integrating Alkota professional detergents with hot water, chemical reaction rates double for every 10°C rise, allowing contractors to use lower chemical concentrations while achieving pristine degreasing.
              </p>
              <p>
                Additionally, professional exterior cleaning demands environmental compliance. When working on sites without interceptor drainage, contractors use vacuum recovery shrouds or portable wastewater dams to manage trade effluent responsibly.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Site environmental requirements vary and appropriate drainage controls should always be assessed prior to commencing work.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 bg-white/5 border border-white/10">
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">CHEMICAL RANGE</span>
                <h4 className="font-light text-lg uppercase text-white mb-2">Alkota Industrial Chemical Systems</h4>
                <p className="text-xs text-[#AAA] leading-relaxed mb-4">
                  Formulated for high-temperature pressure washing: heavy alkaline degreasers, traffic film removers, and food-grade detergents.
                </p>
                <Link
                  href="/chemicals"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
                >
                  <span>Explore Alkota Cleaning Chemicals</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="p-6 bg-white/5 border border-white/10">
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">WASTEWATER CONTROL</span>
                <h4 className="font-light text-lg uppercase text-white mb-2">Closed-Loop Recovery Options</h4>
                <p className="text-xs text-[#AAA] leading-relaxed mb-4">
                  Vacuum recovery surface cleaners that extract dirty wash water directly into onboard holding tanks for licensed disposal.
                </p>
                <Link
                  href="/trailers/recovery"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
                >
                  <span>Explore Recovery Systems</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13: WHAT PRODUCTIVITY ACTUALLY MEANS ────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">13</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Productivity Equation</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            What productivity actually means.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            Machine performance is only one component of commercial job profitability
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono uppercase block mb-1">01 / SETUP</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Rapid Deployment</span>
              <p className="text-[#666]">Reel-fed plumbing and quick-couple fittings get water on target in minutes.</p>
            </div>
            <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono uppercase block mb-1">02 / FLOW</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">High Cleaning Rate</span>
              <p className="text-[#666]">High L/min and 90°C heat cover maximum square metres per hour.</p>
            </div>
            <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono uppercase block mb-1">03 / PRECISION</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Zero Rework</span>
              <p className="text-[#666]">Surface cleanliness achieved on the first pass without second-day return visits.</p>
            </div>
            <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono uppercase block mb-1">04 / UPTIME</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Zero Shift Stops</span>
              <p className="text-[#666]">Continuous duty cycles ensure crews finish on time during fixed window shutdowns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14: SPECIFICATIONS & CANONICAL HARDWARE ──────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Contractor Deployment Parameters"
          subtitle="Equipment specifications for commercial facilities management and industrial contract cleaning"
        />

        {/* Customer Evidence (Renders if available) */}
        <CaseStudyEvidencePanel
          evidence={caseStudy.evidence}
          clientName={caseStudy.clientName}
        />

        {/* Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Facilities & Industrial Cleaners"
        />

        {/* ── 15: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="CONTRACTOR SYSTEM SPECIFICATION"
          headline="Your Pressure Washer Shouldn’t Just Clean. It Should Earn."
          description="Tell Alkota what you clean, how often you use the machine, what contamination you encounter and how your operation works. We can specify the system around the job."
          primaryCTA={{
            label: 'Specify a Contractor System',
            href: '/machines/hot-water',
          }}
          secondaryCTA={{
            label: 'Explore Hot Water Machines',
            href: '/machines/hot-water',
          }}
        />
      </div>

      {/* ── 16: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
