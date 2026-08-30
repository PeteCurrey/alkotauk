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
import {
  ContractorDowntimeCalculator,
  ContractorSystemSelector,
  ContractorBuyingChecklist,
  ContractorEditorialFAQ,
} from '@/components/case-studies/ContractorFieldGuideTools';
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
  Snowflake,
  Activity,
  Maximize2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Pressure Washers for Cleaning Contractors | Alkota UK',
  description:
    'A practical guide to specifying professional pressure-washing equipment for cleaning contractors, covering pressure, flow, hot water, duty cycle, hoses, tanks, trailers, serviceability and total operating cost.',
  openGraph: {
    title: 'Professional Pressure Washers for Cleaning Contractors | Alkota UK',
    description:
      'A practical guide to specifying professional pressure-washing equipment for cleaning contractors, covering pressure, flow, hot water, duty cycle, hoses, tanks, trailers, serviceability and total operating cost.',
    url: 'https://alkota.co.uk/resources/case-studies/professional-cleaning-contractors',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Professional Cleaning Contractors High-Pressure Hot Water Washdown',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/professional-cleaning-contractors',
  },
};

export default function ProfessionalCleaningContractorsPage() {
  const caseStudy = getCaseStudyBySlug('professional-cleaning-contractors');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/professional-cleaning-contractors#article',
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
          '@id': 'https://alkota.co.uk/resources/case-studies/professional-cleaning-contractors',
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
            name: 'Contractor Field Guide',
            item: 'https://alkota.co.uk/resources/case-studies/professional-cleaning-contractors',
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

      {/* ── 01: OPENING COMMERCIAL STATEMENT ───────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // The Contractor Proposition
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            The machine isn’t an expense.<br />
            <span className="text-[#FF6900]">It’s the thing you send out to earn.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                A pressure washer used occasionally at home can be replaced without serious consequence if it fails on a Saturday afternoon. A commercial cleaning contractor’s machine operates in an entirely different commercial reality.
              </p>
              <p>
                It is booked onto client sites with strict completion deadlines, transported daily across varied road conditions, operated by multiple team members, and expected to run continuously for 6 to 8 hours against heavy industrial contamination. In that environment, equipment specification stops being about purchase price and starts being about productive output and downtime protection.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-6 sm:p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                The Operational Realities of Contract Cleaning
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-alkota-black">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Fixed Access Windows:</strong> Overnight or weekend shutdowns where work must complete on time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Severe Contamination:</strong> Heavy grease, fuel stains, chewing gum, and industrial biofilms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Employee Operation:</strong> Machinery built to withstand varied user handling without delicate failure points.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Transport Stress:</strong> Continuous road vibration and varying water supply qualities.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE CONTRACTOR MINDSET ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Specification Mindset</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
            Stop buying PSI. Start buying productivity.
          </h2>

          <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-3xl mb-12">
            The pressure washing market has historically trained buyers to look at a single metric: maximum PSI. In contract cleaning, headline pressure is only one variable in a complex hydraulic and thermodynamic equation. Real contractor productivity is governed by a complete system.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">01 / HYDRAULICS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Pressure & Flow</span>
              <p className="text-[#666]">Balanced mechanical cutting force and volumetric flushing capacity.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">02 / THERMODYNAMICS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Water Temperature</span>
              <p className="text-[#666]">80°C–90°C hot water to melt hydrocarbons and activate chemistry.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">03 / ERGONOMICS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Hose Management</span>
              <p className="text-[#666]">30m–60m live reels to clean expansive areas without machine moves.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">04 / INFRASTRUCTURE</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Water Supply</span>
              <p className="text-[#666]">Baffled buffer tanks to prevent pump cavitation on weak mains.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">05 / COMPLIANCE</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Wastewater Control</span>
              <p className="text-[#666]">Vacuum recovery and interceptor drainage compatibility.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">06 / METALLURGY</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Duty Cycle</span>
              <p className="text-[#666]">Low-RPM ceramic triplex pumps and Schedule 80 seamless steel coils.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">07 / CHEMISTRY</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Targeted Detergents</span>
              <p className="text-[#666]">Alkaline degreasers and surfactants calibrated for hot water.</p>
            </div>
            <div className="p-4 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">08 / EFFICIENCY</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Setup & Pack-Down</span>
              <p className="text-[#666]">Quick-couplings and roller guides that save 30–45 mins per site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: PRESSURE VS FLOW ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Hydraulic Engineering</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Pressure breaks it free.<br />
            <span className="text-[#FF6900]">Flow gets it gone.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                <strong>Pressure (BAR / PSI)</strong> is mechanical cutting force. It provides the energy required to shear surface adhesion bonds, strip loose paint, or blast compacted grit out of textured tarmac. However, extreme pressure without adequate water volume simply pulverises dirt in place.
              </p>
              <p>
                <strong>Flow Rate (Litres per Minute)</strong> is the volumetric vehicle that carries loosened contamination away from the work area into drainage channels. In large-area commercial cleaning (such as car parks, block paving, and warehouse floors), high flow rate is what allows operators to maintain high square-metre coverage rates without stopping to chase slurry.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                  <Gauge className="h-4 w-4" />
                  <span>Pressure Threshold</span>
                </div>
                <h4 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">
                  180 – 250 BAR (2,600 – 3,600 PSI)
                </h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  The ideal range for commercial cleaning. Sufficient force to cut surface dirt and chewing gum without risking substrate damage, aggregate fracturing, or mortar blowout.
                </p>
              </div>

              <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                  <Droplets className="h-4 w-4" />
                  <span>Flow Rate Threshold</span>
                </div>
                <h4 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">
                  15 – 21+ Litres / Minute
                </h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  High-volume water throughput required to drive 20"–24" stainless steel rotary surface cleaners and float suspended mud and tyre slurry continuously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: HOT WATER VS COLD WATER ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Thermal Energy Specification</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            When the dirt contains oil, heat matters.<br />
            <span className="text-[#888]">Not every job needs a burner.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Hot Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                  <Flame className="h-4 w-4" />
                  <span>When Hot Water is Essential</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-4">
                  Thermal Degreasing & Emulsification
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  Water heated to 80°C–95°C reduces the viscosity of petroleum oils, diesel residues, kitchen greases, and tyre waxes instantly. It melts chewing gum and accelerates chemical detergent reaction rates, dramatically cutting labour time on forecourts, drive-thrus, and industrial yards.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Forecourts, drive-thrus, plant depots, food processing yards, heavy degreasing.
              </div>
            </div>

            {/* Cold Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#38BDF8] font-mono mb-2">
                  <Droplets className="h-4 w-4" />
                  <span>When Cold Water is Appropriate</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-4">
                  High-Volume Hydraulic Washdown
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  For loose mud, agricultural soil, clay, dust, and general aggregate rinse washdown, heat provides little mechanical advantage. Cold-water machines focus 100% of input power into high volumetric flow rate with zero burner overhead, lower weight, and simpler setup.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Agricultural mud, building site wheel washdowns, masonry rinsing, general exterior cleaning.
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black font-normal hover:text-[#FF6900] transition-colors no-underline"
            >
              <span>Compare Full Range of Hot & Cold Water Systems →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 05: CONTRACTOR DUTY CYCLE ──────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Duty Cycle Engineering</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            One hour a month and eight hours a day are not the same job.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Consumer pressure washers are rated for intermittent duty: 15 to 30 minutes of running followed by cool-down periods. Their high-speed direct-drive pumps (2,800+ RPM) generate intense internal heat, causing pump packings and brass manifolds to degrade rapidly under sustained loads.
              </p>
              <p>
                Alkota industrial machines are engineered for 100% continuous duty cycles. We utilise slow-turning (1,450 RPM) ceramic plunger pumps coupled via belt drives or heavy gearboxes, oversized crankcases holding copious oil volumes, and heavy Schedule 80 continuous steel heating coils that withstand thousands of thermal expansion cycles without metal fatigue.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Slow-RPM Pump</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">1,450 RPM Operation</span>
                <p className="text-[#666]">Cuts seal wear and internal heat by 50% compared to direct-drive consumer pumps.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Schedule 80 Steel</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">ASTM A53 Heavy-Wall Pipe</span>
                <p className="text-[#666]">Seamless construction backed by a 7-year coil warranty against thermal stress.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Ceramic Plungers</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">Solid Industrial Plungers</span>
                <p className="text-[#666]">Eliminates heat pitting and scoring under continuous multi-hour trigger pulls.</p>
              </div>
              <div className="p-5 bg-[#F8F7F4] border border-[#E8E8E4]">
                <span className="font-mono text-[#FF6900] uppercase block mb-1">Modular Unloader</span>
                <span className="text-alkota-black font-medium block text-sm mb-1">External Brass Manifold</span>
                <p className="text-[#666]">Separated from pump head for lower thermal stress and immediate 10-minute replacement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: TOTAL COST OF OWNERSHIP & DOWNTIME CALCULATOR ──────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Commercial Economics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The cheapest machine can become the most expensive one you own.
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed max-w-3xl mb-8">
            <p>
              When evaluating commercial pressure washers, purchase price represents only a fraction of total operating cost over a 3-to-5-year horizon. Equipment downtime on commercial sites cascades into cancelled jobs, idle operators, emergency hire charges, and damaged client reputation.
            </p>
          </div>

          {/* Interactive Downtime Calculator */}
          <ContractorDowntimeCalculator />
        </div>
      </section>

      {/* ── 07: SERVICEABILITY & MACHINE ACCESS ─────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Serviceability & Spares</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            When it wears, can you fix it?<br />
            <span className="text-[#FF6900]">A small part can stop a big job.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Professional cleaning equipment should be fully maintainable, not disposable. High-pressure pumps, burners, and unloaders are mechanical machines subject to wear. When a seal wears after 1,500 hours, an operator should be able to replace the £30 packing set on site rather than scrapping the entire machine.
              </p>
              <p>
                Alkota machinery features open steel chassis construction where every maintenance component — pump oil sight glass, fuel water-separator, burner electrodes, unloader valve, and thermostat — is immediately accessible with standard hand tools.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/support/replacement-parts"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black font-normal hover:text-[#FF6900] transition-colors no-underline"
                >
                  <span>Explore Genuine UK Replacement Parts →</span>
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#666] font-normal hover:text-black transition-colors no-underline"
                >
                  <span>Alkota UK Planned Maintenance →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Essential Contractor Spares to Carry
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Spare unloader valve & quick-couple manifold</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Assorted calibrated high-pressure spray nozzles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Rotary surface cleaner replacement spray bar & nozzles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Quick-release O-rings and high-pressure hose joiners</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Replacement diesel fuel filter and inline water strainer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: HOSE LENGTH & PRESSURE LOSS ─────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Hydraulic Hose Engineering</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The job might be 80 metres from the van.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                In commercial exterior cleaning, dragging heavy machinery up stairs, over kerbs, or through pedestrianised zones wastes time and introduces site risk. Professional contractors park their vehicle or trailer at a central location and deploy long hose runs.
              </p>
              <p>
                However, hydraulic friction causes pressure loss over long distances. Using a standard 3/8" internal diameter (ID) hose over an 80m run at 21 L/min can introduce a friction loss of 25–35 BAR. For extreme runs, specifying a 1/2" ID high-flow hose preserves working pressure at the lance.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Hydraulic Friction Guidelines (At 18 L/MIN)
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-[#E8E8E4]">
                  <span>30m Run (3/8&quot; ID Hose):</span>
                  <span className="font-mono font-medium text-alkota-black">~10 – 12 BAR Loss (Negligible)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#E8E8E4]">
                  <span>60m Run (3/8&quot; ID Hose):</span>
                  <span className="font-mono font-medium text-alkota-black">~20 – 24 BAR Loss (Manageable)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#E8E8E4]">
                  <span>80m Run (3/8&quot; ID Hose):</span>
                  <span className="font-mono font-medium text-[#FF6900]">~30 – 35 BAR Loss (Requires Tuning)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#E8E8E4]">
                  <span>80m Run (1/2&quot; ID Hose):</span>
                  <span className="font-mono font-medium text-emerald-600">~12 – 15 BAR Loss (Optimal)</span>
                </div>
              </div>
              <p className="text-[11px] text-[#777] italic pt-2">
                *Estimated values based on standard smooth-bore hydraulic hose friction tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: VAN VS TRAILER VS STATIC RIGS ───────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Mounting & Transport Formats</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Where does the machine live?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">FORMAT 01</span>
                <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-3">Van-Mounted Skid</h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-4">
                  Enclosed within a 3.5t commercial panel van. Provides excellent security, weather protection, and urban manoeuvrability.
                </p>
                <div className="space-y-1.5 text-xs text-[#555] border-t border-[#E8E8E4] pt-3">
                  <div><strong>Pros:</strong> Fast deployment, locked security, compact footprint.</div>
                  <div><strong>Cons:</strong> Payload limitations (water weight), exhaust venting required.</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] border-t-2 border-t-[#FF6900] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">FORMAT 02</span>
                <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-3">Towable Trailer Rig</h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-4">
                  Dedicated high-capacity platform carrying 1,000L–1,500L baffled water tanks, twin live reels, and generator power.
                </p>
                <div className="space-y-1.5 text-xs text-[#555] border-t border-[#E8E8E4] pt-3">
                  <div><strong>Pros:</strong> High water payload, leaves van free for other tools, multi-operator.</div>
                  <div><strong>Cons:</strong> Requires tow hitch, parking space, and driver towing categories.</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">FORMAT 03</span>
                <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-3">Static Plant Skid</h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-4">
                  Fixed installation in a dedicated wash bay or boiler room, piped to multi-bay overhead boom drops.
                </p>
                <div className="space-y-1.5 text-xs text-[#555] border-t border-[#E8E8E4] pt-3">
                  <div><strong>Pros:</strong> Zero transport vibration, mains gas/electric power, 24/7 duty.</div>
                  <div><strong>Cons:</strong> Fixed location, civil infrastructure and drainage install required.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/trailers"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal hover:underline no-underline"
            >
              <span>Explore Alkota Bespoke Mobile Trailer Rigs →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10: WATER WEIGHT & SUPPLY INFRASTRUCTURE ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">10</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Water Logistics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            1,000 litres of water weighs about a tonne.<br />
            <span className="text-[#FF6900]">The best machine is useless without water.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Water logistics are the most overlooked operational factor in mobile pressure washing. A standard UK commercial panel van has a total legal payload of 1,000kg to 1,400kg. Filling a 1,000L tank immediately consumes 1,000kg of payload before factoring in the weight of the pressure washer, fuel, hose reels, operator, and tools.
              </p>
              <p>
                Furthermore, customer mains taps often supply only 10 to 12 L/min. Running an 18 L/min industrial washer directly from a weak tap leads to pump cavitation and damaged valves within minutes. An onboard baffled buffer tank (500L–1,000L) with a low-pressure float valve bridges this gap, allowing continuous cleaning.
              </p>
              <p className="text-xs text-[#777] italic">
                *Always verify vehicle gross vehicle weight (GVW) and axle limits prior to configuring onboard water tanks.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Water Management Engineering
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Internal Baffles:</strong> Prevents dynamic water surging during vehicle braking and cornering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Float Valve Automation:</strong> Automatically tops up reservoir without manual monitoring or overflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Multi-Stage Filtration:</strong> 50-mesh inlet strainers prevent sediment and rust from reaching pump seals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Low-Water Cutoff Switch:</strong> Automatically shuts down burner and pump if reservoir empties.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11: WATER RECOVERY & ENVIRONMENTAL RESPONSIBILITY ────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">11</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Environmental Compliance</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            The water doesn’t disappear<br />
            <span className="text-[#FF6900]">when it leaves the nozzle.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                In the UK, commercial surface runoff containing petroleum hydrocarbons, chemical detergents, or heavy industrial particulate cannot be legally discharged into surface water drains without interceptor separation.
              </p>
              <p>
                Professional contractors win high-value corporate and facilities management contracts by offering vacuum recovery systems. Alkota recovery shrouds extract dirty wash water directly at the cleaning head, pulling effluent back into onboard holding tanks for licensed disposal.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Site environmental regulations vary. Always inspect site drainage schematics and establish containment controls prior to washdown.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                Wastewater Management Capabilities
              </span>
              <div className="space-y-4 text-xs text-[#AAA]">
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Vacuum Recovery Surface Cleaners</span>
                  <p>Enclosed rotary cleaners fitted with perimeter vacuum suction rings that eliminate overspray and recover 95%+ of wash water instantaneously.</p>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Inflatable Drain Bunds & Berms</span>
                  <p>Rapidly deployable chemical-resistant containment barriers that block stormwater grates and create localized recovery sumps.</p>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Onboard Separation & Filtration</span>
                  <p>Multi-stage sediment traps and oil-absorbent filtration cartridges for closed-loop wash bay operations.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/trailers/recovery"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
                >
                  <span>Explore Alkota Water Recovery Systems →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12: NOZZLES, SURFACE CLEANERS & TOOLING ──────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">12</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Tooling & Productivity</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The smallest part can change the whole machine.<br />
            <span className="text-[#FF6900]">The lance isn’t always the fastest tool.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">TOOL 01</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Nozzle Calibration</h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4">
                Nozzle orifice size dictates operating pressure at a given flow. An oversized nozzle causes pressure drops; an undersized nozzle forces the unloader into bypass.
              </p>
              <div className="text-xs text-[#555] border-t border-[#E8E8E4] pt-2">
                <strong>Angles:</strong> 0° (cutting), 15° (stripping), 25° (general wash), 40° (wide rinse).
              </div>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">TOOL 02</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Rotary Turbo Nozzles</h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4">
                Combines 0° impact force with a rotating 25° cone pattern. Essential for removing hardened mortar, heavy rust, and tree root ingress on hard stone.
              </p>
              <div className="text-xs text-[#555] border-t border-[#E8E8E4] pt-2">
                <strong>Caution:</strong> Never use on soft timber, fragile pointing, or vehicle paint.
              </div>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">TOOL 03</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">Rotary Flat Surface Cleaners</h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4">
                Twin spinning spray nozzles enclosed in an 18"–24" stainless steel dome. Maintains consistent stand-off distance and cleans flat hardstanding 4x faster than a wand.
              </p>
              <div className="text-xs text-[#555] border-t border-[#E8E8E4] pt-2">
                <strong>Benefit:</strong> Zero zebra striping and eliminates dirty wall overspray.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13: MULTI-OPERATOR & BESPOKE RIG ARCHITECTURE ─────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">13</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Bespoke Rig Engineering</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Don’t build your workflow around the machine.<br />
            <span className="text-[#FF6900]">Build the machine around your workflow.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                When a contractor business scales to multiple team members, running two separate small pressure washers from separate vans multiplies vehicle overhead, fuel costs, and maintenance points.
              </p>
              <p>
                Alkota engineers high-output multi-operator platforms delivering 30 to 40 L/min of 90°C hot water. Fitted with dual unloaders and independent hose reels, two operators can clean simultaneously from a single trailer rig — doubling site square-metre velocity.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/trailers/configure"
                  className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shadow-md"
                >
                  <span>Engineer a Contractor Rig →</span>
                </Link>
                <Link
                  href="/trailers/multi-operator"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-[#FF6900] font-normal transition-colors no-underline"
                >
                  <span>Multi-Operator Systems →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Bespoke Contractor Rig Capabilities
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Dual 60m live stainless steel hose reels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Integrated 1,000L baffled water storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Onboard generator power & LED site worklights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Chemical softwash dosing injection manifold</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Winter antifreeze recirculating bypass loop</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14: INTERACTIVE SYSTEM SELECTOR ─────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <ContractorSystemSelector />
        </div>
      </section>

      {/* ── 15: 12-POINT BUYING CHECKLIST ───────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <ContractorBuyingChecklist />
        </div>
      </section>

      {/* ── 16: SPECIFICATIONS & CANONICAL PRODUCTS ─────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Contractor Equipment Parameter Framework"
          subtitle="Standard engineering parameters recommended for commercial pressure washing and surface restoration"
        />

        {/* Canonical Recommended Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Professional Cleaning Contractors"
        />

        {/* Contractor FAQ */}
        <ContractorEditorialFAQ />

        {/* ── 17: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="CONTRACTOR SPECIFICATION ADVICE"
          headline="If the Machine Makes You Money, Specify It Like Business Equipment."
          description="Tell us what you clean, how many hours you work, where the machine operates and how you transport it. Alkota UK will help specify the system around the work."
          primaryCTA={{
            label: 'Build My Contractor System',
            href: '/tools/configurator',
          }}
          secondaryCTA={{
            label: 'Talk to Alkota Technical Team',
            href: '/contact?enquiry=contractor-system',
          }}
        />
      </div>

      {/* ── 18: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
