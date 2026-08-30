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
  OilfieldLogisticsCalculator,
  OilfieldSystemSelector,
  OilfieldEditorialFAQ,
} from '@/components/case-studies/OilfieldFieldTools';
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
  ShieldAlert,
  AlertOctagon,
  Factory,
  HardHat,
  Cpu,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Oilfield Pressure Washers & Industrial Cleaning Systems | Alkota UK',
  description:
    'Explore industrial pressure-washing systems for oilfield and heavy industrial applications, including oil, grease, drilling mud, paraffin, hot-water cleaning, mobile rigs and wastewater considerations.',
  openGraph: {
    title: 'Oilfield Pressure Washers & Industrial Cleaning Systems | Alkota UK',
    description:
      'Explore industrial pressure-washing systems for oilfield and heavy industrial applications, including oil, grease, drilling mud, paraffin, hot-water cleaning, mobile rigs and wastewater considerations.',
    url: 'https://alkota.co.uk/resources/case-studies/oilfield',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Heavy Industrial Petrochemical and Oilfield Machinery Washdown',
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

      {/* ── 00: FULL-VIEWPORT HERO ─────────────────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 01: OPENING EDITORIAL STATEMENT ────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // The Industrial Reset
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            This isn’t a cosmetic clean.<br />
            <span className="text-[#FF6900]">It’s a reset between jobs.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                Heavy industrial machinery operating across drilling sites, pipe lay yards, refineries, and processing plants encounters extreme hydrocarbon contamination: thick crude oil, synthetic polymers, bentonite drilling mud, paraffin waxes, and abrasive mineral scale.
              </p>
              <p>
                In these environments, cleaning is an essential engineering step that resets equipment between operational cycles. It allows non-destructive testing (NDT) on drill string threads, enables rapid visual inspection of hydraulic manifolds, clears clogged mud screens, and prepares heavy capital plant for safe transport and redeployment.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#121210] text-white p-6 sm:p-8 border border-[#2B2B24] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                Operational Purpose of Industrial Cleaning
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#CCC]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Thread & NDT Inspection:</strong> Stripping heavy pipe dope down to bare metal for crack detection.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Thermal Degreasing:</strong> Melting stubborn paraffin waxes and bitumen with 95°C water.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Mud Displacement:</strong> High volumetric flow (21–30 L/min) to carry dense barite slurry away.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Turnaround Readiness:</strong> Preparing plant skids for swift redeployment between project contracts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE CONTAMINATION TAXONOMY ───────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Contamination Science</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            Some dirt doesn’t want to leave.<br />
            <span className="text-[#FF6900]">The industrial contamination stack.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-14 font-normal">
            Industrial contamination is governed by complex chemistry and high-melting-point physics. Cold water and extreme pressure alone merely spread viscous hydrocarbons into wider, slippery films.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 01</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Heavy Crude & Bitumen</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Dense hydrocarbons with high molecular weight. Requires 85°C–95°C hot water to lower viscosity and break stubborn surface adhesion bonds.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 02</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Paraffin Wax & Pipe Dope</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Waxy compounds and zinc/copper thread lubricants that solidify at ambient temperatures. Demands saturated vapour steam (140°C) to flash into liquid state.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 03</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Synthetic Drilling Mud</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Non-Newtonian mixtures of bentonite clay, barite weighting solids, and synthetic polymers. Requires high water flow volume (18–25+ L/min) to float heavy solids.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 04</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Heavy Mechanical Grease</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Waterproof lithium/calcium greases mixed with grit around open gearboxes, drawworks, and slewing rings.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 05</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Mineral Scale & Rust</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Hard calcium carbonate deposits and ferrous corrosion crusts on drill casings and pipe racks requiring calibrated rotary nozzles.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">CONTAMINANT 06</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Field Soil & Sediment</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Abrasive mineral sediment and compacted mud accumulated across mobile plant undercarriages, crawler tracks, and transport trailers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: HEAT & THERMAL PHYSICS ──────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Thermal Thermodynamics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            When contamination changes viscosity,<br />
            <span className="text-[#FF6900]">heat changes the equation.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Viscosity in petroleum hydrocarbons is thermally dependent. As temperature rises from 15°C to 85°C, the kinematic viscosity of heavy oil drops by orders of magnitude, turning stiff, adhesive tar into a free-flowing liquid.
              </p>
              <p>
                Alkota continuous Schedule 80 heating coils deliver sustained 90°C water at full trigger pull, while our saturated steam generators produce 140°C vapour. This thermal energy liquefies waxes and asphalt instantly, allowing water flow to carry the emulsion away with minimal chemical consumption.
              </p>
              <p className="text-xs text-[#777] italic border-l-2 border-[#FF6900] pl-4">
                *Specific temperature settings depend on contamination melting thresholds, substrate coatings, and safety procedures.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Thermal Performance Comparison
              </span>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white border border-[#E8E8E4]">
                  <strong className="text-alkota-black block text-sm mb-1">Cold Water Washdown (15°C)</strong>
                  <p className="text-[#666]">Effective for loose mud and sediment. Ineffective on paraffin wax, bitumen, and heavy crude.</p>
                </div>
                <div className="p-3 bg-white border border-[#E8E8E4]">
                  <strong className="text-alkota-black block text-sm mb-1">Industrial Hot Water (80°C–95°C)</strong>
                  <p className="text-[#666]">Melts heavy crude, mechanical grease, and pipe dope. Cuts cleaning time by two-thirds.</p>
                </div>
                <div className="p-3 bg-white border border-[#E8E8E4] border-t-2 border-t-[#FF6900]">
                  <strong className="text-alkota-black block text-sm mb-1">Saturated Vapour Steam (140°C)</strong>
                  <p className="text-[#666]">Flashes high-melting-point waxes and asphalt into liquid state with minimal water volume.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: THE FOUR-PART CLEANING MODEL ────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Physics of Industrial Cleaning</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Pressure is force. It isn’t the whole process.<br />
            <span className="text-[#FF6900]">Loosening is only half the job.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-6 bg-white border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-[#FF6900] font-mono mb-2">
                <Gauge className="h-4 w-4" />
                <span>VARIABLE 01</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">Pressure</h3>
              <p className="text-[#666] leading-relaxed">
                Mechanical cutting force. Breaks surface adhesion without pitting parent metal or stripping critical protective coatings.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-[#FF6900] font-mono mb-2">
                <Droplets className="h-4 w-4" />
                <span>VARIABLE 02</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">Flow Rate</h3>
              <p className="text-[#666] leading-relaxed">
                Flushing volume (L/min). Carries heavy drilling mud solids, barite slurry, and emulsified oil away into recovery channels.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4] border-t-2 border-t-[#FF6900]">
              <div className="flex items-center gap-2 text-[#FF6900] font-mono mb-2">
                <Flame className="h-4 w-4" />
                <span>VARIABLE 03</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">Thermal Heat</h3>
              <p className="text-[#666] leading-relaxed">
                90°C thermal energy. Liquefies waxes, lowers oil viscosity, and accelerates detergent surfactant kinetics instantly.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-[#FF6900] font-mono mb-2">
                <Clock className="h-4 w-4" />
                <span>VARIABLE 04</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">Chemistry / Dwell</h3>
              <p className="text-[#666] leading-relaxed">
                Targeted industrial degreasers. Pre-softens bitumen bonds to minimise mechanical wear and operator fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: HAZARDOUS AREAS & SAFETY STANDARDS (CRITICAL SECTION) ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#1A1A18] text-white border-b border-[#333]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Safety & Classification Standard</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            Industrial does not mean<br />
            <span className="text-[#FF6900]">hazardous-area approved.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
            <div className="lg:col-span-7 space-y-6">
              <p>
                Oil and gas facilities incorporate strictly classified hazardous zones (e.g. ATEX Zone 0, Zone 1, and Zone 2) where flammable gas, vapours, or mists may occur during normal operations.
              </p>
              <p>
                Standard industrial pressure washers and burner skids feature open electric motors, ignition systems, and diesel combustion chambers. <strong>They are not intrinsically safe or explosion-proof certified.</strong>
              </p>
              <p>
                Alkota equipment must only be deployed in unclassified non-hazardous areas, designated pipe yards, or under strictly supervised site-specific Hot Work Permits issued by the responsible operating company.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-1">
                <ShieldAlert className="h-4 w-4" />
                <span>The 3-Tier Site Qualification Rule</span>
              </div>
              <div className="space-y-3 text-xs text-[#CBD5E1]">
                <div className="p-3 bg-black/40 border border-white/10">
                  <strong className="text-white block mb-0.5">01 / Verify the Site</strong>
                  <p>Check hazardous zone drawings. Pressure washers must be positioned in unclassified safe zones.</p>
                </div>
                <div className="p-3 bg-black/40 border border-white/10">
                  <strong className="text-white block mb-0.5">02 / Verify the Equipment</strong>
                  <p>Ensure spark arrestors, emergency stops, and low-water cutoffs are operational.</p>
                </div>
                <div className="p-3 bg-black/40 border border-white/10">
                  <strong className="text-white block mb-0.5">03 / Verify the Procedure</strong>
                  <p>Obtain required Hot Work Permits and establish continuous gas monitoring prior to starting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: REMOTE LOGISTICS ESTIMATOR (WATER & FUEL) ───────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <OilfieldLogisticsCalculator />
        </div>
      </section>

      {/* ── 07: ENVIRONMENTAL CONTROLS & WATER RECOVERY ──────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Environmental Containment</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            What comes off the machine<br />
            <span className="text-[#FF6900]">doesn’t disappear.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                Industrial wash water containing crude oil, toxic drilling polymers, or heavy mechanical degreasers must never be discharged onto ground soil or allowed to enter surface waterways.
              </p>
              <p>
                Alkota closed-loop recovery solutions deploy vacuum recovery surface cleaners, heavy-duty impermeable containment bunds, and multi-stage oil-water separation skids to capture 100% of effluent for licensed transfer and disposal.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Always assess site-specific environmental discharge licenses and implement containment sumps prior to washing.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                Containment & Recovery Architecture
              </span>
              <div className="space-y-3 text-xs text-[#CBD5E1]">
                <div>
                  <strong className="text-white block text-sm mb-0.5">Heavy-Duty Containment Berms</strong>
                  <p>Drive-over chemical-resistant berms that create instant wash bays on remote drilling pads.</p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <strong className="text-white block text-sm mb-0.5">Vacuum Recovery Shrouds</strong>
                  <p>Continuous suction heads that extract dirty water directly into onboard holding tanks.</p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <strong className="text-white block text-sm mb-0.5">Coalescing Oil-Water Separators</strong>
                  <p>Multi-stage filtration removing free oils and suspended solids down to legal discharge thresholds.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/trailers/recovery"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
                >
                  <span>Explore Water Recovery Systems →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: BESPOKE TRAILER ENGINEERING WORKFLOW ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Bespoke Engineering</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            The trailer becomes the wash bay.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            The 12-stage Alkota bespoke engineering lifecycle for remote industrial field rigs
          </p>

          <CaseStudyBespokeWorkflow />

          <div className="mt-8 text-center">
            <Link
              href="/trailers/configure"
              className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shadow-md"
            >
              <span>Engineer a Bespoke Field Rig →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 09: SERVICEABILITY & METALLURGY ─────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Remote Reliability</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Remote work punishes weak equipment.<br />
            <span className="text-[#FF6900]">The part you don’t have is the part you need.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                When equipment operates on remote drilling sites or pipeline spreads hours from technical support, fragility is fatal. Equipment must be serviceable with standard mechanical tools.
              </p>
              <p>
                Alkota machines eliminate complex computer circuit boards in favour of heavy-duty electro-mechanical switches, external brass unloader manifolds, and 1,450 RPM ceramic plunger pumps. Our continuous Schedule 80 ASTM A53 seamless steel coils survive violent thermal expansion, backed by Alkota UK’s national spare parts inventory.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/support/replacement-parts"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black font-normal hover:text-[#FF6900] transition-colors no-underline"
                >
                  <span>Industrial Spares & Critical Spares Kits →</span>
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#666] font-normal hover:text-black transition-colors no-underline"
                >
                  <span>Planned Maintenance Contracts →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Recommended Remote Field Spares Kit
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Replacement unloader valve cartridge & seal kit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>High-pressure hose repair joiners & quick-release O-rings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Assorted high-pressure spray nozzles & steam nozzles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Diesel fuel filter water-separator cartridge</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Spare ignition electrodes & burner photocell</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10: INDUSTRIAL SYSTEM SELECTOR ──────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <OilfieldSystemSelector />
        </div>
      </section>

      {/* ── 11: SPECIFICATIONS & CANONICAL HARDWARE ─────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Oilfield Operating Parameter Framework"
          subtitle="Standard engineering parameters recommended for drilling tubulars, mud pumps, and heavy petrochemical skids"
        />

        {/* Canonical Recommended Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Oilfield & Heavy Industry"
        />

        {/* Oilfield Editorial FAQ */}
        <OilfieldEditorialFAQ />

        {/* ── 12: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="INDUSTRIAL SYSTEM SPECIFICATION"
          headline="When the Site is Remote, the Contamination is Heavy and the Equipment Can’t Afford to Wait, Specification Matters."
          description="Tell Alkota what you clean, where the system will operate, what contamination you face, how much water is available and how mobile the system needs to be."
          primaryCTA={{
            label: 'Specify an Industrial System',
            href: '/tools/configurator',
          }}
          secondaryCTA={{
            label: 'Engineer a Mobile Rig',
            href: '/trailers/configure',
          }}
        />
      </div>

      {/* ── 13: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
