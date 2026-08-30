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
  AgriculturalWaterCalculator,
  AgriculturalSystemSelector,
  AgriculturalEditorialFAQ,
} from '@/components/case-studies/AgriculturalFieldTools';
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
  Tractor,
  Calendar,
  AlertOctagon,
  Sun,
  CloudRain,
  Wheat,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agricultural Pressure Washers & Farm Machinery Cleaning | Alkota UK',
  description:
    'Explore how industrial pressure-washing systems can support tractors, farm machinery, yards and agricultural cleaning, with guidance on flow, hot water, biosecurity, fixed wash bays and mobile systems.',
  openGraph: {
    title: 'Agricultural Pressure Washers & Farm Machinery Cleaning | Alkota UK',
    description:
      'Explore how industrial pressure-washing systems can support tractors, farm machinery, yards and agricultural cleaning, with guidance on flow, hot water, biosecurity, fixed wash bays and mobile systems.',
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

      {/* ── 00: FULL-VIEWPORT HERO ─────────────────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 01: OPENING EDITORIAL STATEMENT ────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // The Agricultural Reality
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            A tractor doesn’t get dirty for show.<br />
            <span className="text-[#FF6900]">It gets dirty because it works.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                Agricultural machinery operates in one of the most mechanically abrasive and biologically aggressive environments on earth. Tractors, combines, telehandlers, and implements work immersed in compacted clay, caustic livestock manure, corrosive silage juices, hydraulic oil weepage, and fine crop chaff.
              </p>
              <p>
                In farming, washing machinery is not a cosmetic luxury. It is a vital maintenance discipline that prevents engine overheating during harvest, enables rapid visual leak inspections, protects paintwork from acid etching, and supports biosecure animal health protocols. When cleaning equipment fails, it stalls the operational rhythm of the entire farm.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-6 sm:p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                What Agricultural Cleaning Supports
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-alkota-black">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Cooling Efficiency:</strong> Clearing radiator packs to prevent costly harvest engine shutdowns.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Pre-Service Inspection:</strong> Revealing hydraulic weeping, pin wear, and chassis stress cracks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Corrosion Defence:</strong> Stripping caustic manure and fertiliser salts from chassis steel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Biosecurity Preparedness:</strong> Removing organic matter prior to approved disinfectant applications.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE MACHINES (FARM MACHINERY ROSTER) ───────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Machinery Fleet</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            The machine that cleans the machines.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            The agricultural capital equipment an industrial washing system must handle
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">01 / TRACTORS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">High-Horsepower Tractors</span>
              <p className="text-[#666]">Deep mud in dual tyres, axle seals, front link linkages, and cab filters.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">02 / HARVEST</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Combines & Foragers</span>
              <p className="text-[#666]">Chaff build-up, rotary screen dust, sieve decks, and grain tank augers.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">03 / HANDLING</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Telehandlers & Loaders</span>
              <p className="text-[#666]">Silage clamp grease, boom slide pads, steer axles, and headstock pins.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">04 / CROPPING</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Drills & Cultivators</span>
              <p className="text-[#666]">Compacted seedbed clay, disc bearings, packer rollers, and coulters.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">05 / SPREADERS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Muck & Slurry Tankers</span>
              <p className="text-[#666]">Caustic animal waste, vacuum pump housings, and splash plates.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">06 / APPLICATION</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Crop Sprayers</span>
              <p className="text-[#666]">Chemical rinse cycles, boom washdown, and induction hopper cleaning.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">07 / HAULAGE</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Grain & Silage Trailers</span>
              <p className="text-[#666]">Brake dust, road spray, tailgates, and hydraulic tipping rams.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">08 / LIVESTOCK</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Pens & Housing Equipment</span>
              <p className="text-[#666]">Dairy parlours, calf pens, handling races, and feed barriers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: THE CONTAMINATION STACK ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Contamination Science</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            It isn’t just mud.<br />
            <span className="text-[#FF6900]">The agricultural contamination stack.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-14 font-normal">
            Farming soil is not a single uniform material. A tractor collects layers of heavy clay, baked hydraulic oil, corrosive manure acids, plant sugars, and road film. Different soils require fundamentally different hydraulic and thermal responses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 01</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Compacted Field Mud & Clay</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Dense, cohesive clay packed between dual wheels and under chassis belly plates. Demands high volumetric flow rate (18–25+ L/min) to lift and carry heavy solids away.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 02</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Grease & Hydraulic Oil Weepage</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Hydrocarbons around loader pins, quick-release couplings, and PTO gearboxes. Cold water merely smears it; hot water (85°C) melts the oil binder instantly.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 03</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Manure & Caustic Livestock Waste</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Highly acidic and organic biological deposits. Requires immediate washdown to prevent paint corrosion, followed by dedicated biosecurity disinfection protocols.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 04</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Crop Residue, Chaff & Silage</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Fibrous plant material that binds around cutterbars and packs cooling radiators, creating acute fire risks during dry summer harvest windows.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 05</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Road & Traffic Film</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Oily bitumen residues and road grime accumulated when hauling grain trailers between remote farm holdings and central drying plants.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-[#FF6900] block mb-1">SOIL TYPE 06</span>
              <h4 className="font-light text-lg uppercase text-white mb-2">Fertiliser & Chemical Salts</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Liquid nitrogen, potash, and chemical spray residues that cause aggressive galvanic corrosion on boom linkages and steel fasteners if left unwashed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: SENSITIVE COMPONENT CAUTION ─────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Component Engineering Caution</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Blasting harder isn’t always cleaning better.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                Modern agricultural tractors are sophisticated electronic systems equipped with complex wiring looms, CAN bus sensors, radar guidance, and high-pressure hydraulic actuators. Indiscriminate high pressure (300+ BAR) at point-blank range can force water past rubber seals, stripping bearing grease and corroding electrical connectors.
              </p>
              <p>
                Alkota advocates calibrated cleaning: using high water flow and thermal energy to loosen grime safely, rather than relying on extreme hydraulic brute force that risks thousands of pounds in electrical downtime.
              </p>
              <p className="text-xs text-[#777] italic">
                *Always follow tractor and implement OEM washing guidelines regarding sensitive electrical junction boxes and rotary seal standoff distances.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#FFF9F5] border border-[#FFD8BF] p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-1">
                <AlertOctagon className="h-4 w-4" />
                <span>Components Requiring Stand-off & Caution</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#444]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Wheel Bearings & Axle Seals:</strong> Keep a minimum 30cm stand-off to avoid pushing water past grease seals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>ISOBUS & ECU Harnesses:</strong> Never direct high-pressure spray into wiring grommets or fuse boxes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Radiator Cooling Packs:</strong> Use wide fan nozzles to prevent folding delicate aluminium cooling fins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Safety Decals & Paint:</strong> High-pressure turbo nozzles can strip protective paint coatings if used too close.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: FLOW VS HEAT ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Flow & Thermodynamics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Mud can be rinsed.<br />
            <span className="text-[#FF6900]">Grease changes the job.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Cold Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#38BDF8] font-mono mb-2">
                  <Droplets className="h-4 w-4" />
                  <span>High-Flow Cold Water</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Volumetric Mud Shifting
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  For tractors returning from autumn ploughing coated in thick field clay, high water volume (21–30 L/min) is king. Flow provides the hydraulic mass needed to carry heavy stones and slurry out of deep wheel arches and cultivator frames without consuming burner fuel.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Daily wheel washdowns, cultivator cleaning, loose soil rinsing, trailer bodies.
              </div>
            </div>

            {/* Hot Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                  <Flame className="h-4 w-4" />
                  <span>Industrial Hot Water (80°C–90°C)</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Thermal Degreasing & Livestock Fats
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  When soil mixes with hydraulic weeping, greased pivot pins, or livestock fats, cold water merely creates a smeared oily slurry. Water heated to 85°C breaks hydrocarbon viscosity instantly, cutting degreasing time by two thirds without corrosive solvents.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Farm workshops, loader pins, engine bays, milking parlours, combine harvest prep.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: AGRICULTURE IS SEASONAL (TIMELINE) ───────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Operational Rhythms</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            The workload doesn’t arrive evenly.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            A representative seasonal equipment cycle on UK arable and mixed farms
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Sun className="h-4 w-4" />
                <span>Spring</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Drilling & Activation
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                De-winterising machinery, washing seed drills after planting, removing corrosive fertiliser dust from spreaders, and yard sanitisation.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Wheat className="h-4 w-4" />
                <span>Summer / Harvest</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                18-Hour Harvest Windows
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Intensive combine harvester operation, daily radiator chaff blowout, telehandler clamp cleaning, and grain trailer turnaround.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <CloudRain className="h-4 w-4" />
                <span>Autumn</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Heavy Field Mud
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Ploughing and cultivation washdown, potato and sugar beet harvest mud removal, slurry tanker washdown, and road compliance rinsing.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Snowflake className="h-4 w-4" />
                <span>Winter</span>
              </div>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Workshop & Storage
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Annual machine overhauls, pre-inspection deep cleans, implement repainting preparation, and machine freeze-protection procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: CLEANING + MAINTENANCE & RADIATOR CARE ──────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Maintenance Discipline</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Clean first. Then look.<br />
            <span className="text-[#FF6900]">Some dirt needs finesse, not force.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                A tractor coated in 2 inches of dried soil conceals critical mechanical defects: weeping hydraulic fittings, cracked loader brackets, worn steering ball joints, and loose wheel bolts. Removing the grime is the first step in scheduled preventive maintenance.
              </p>
              <p>
                Similarly, during harvest, combine radiators pack with fine chaff. Directing high-pressure water at close range folds the aluminium fins, permanently destroying cooling capacity. Alkota machines feature adjustable steam and low-pressure hot-water settings that melt baked organic sap from radiator cores without mechanical fin damage.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Thorough washdowns support visual inspection but do not replace statutory LOLER/PUWER examinations or scheduled dealer servicing.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Visual Inspection Checkpoints Post-Wash
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Hydraulic ram seals for weeping oil rings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Chassis weld fillets and three-point linkages for fatigue cracks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Brake lines and electrical harnesses for chafing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Radiator cores and intercoolers for unobstructed airflow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: BIOSECURITY & DISINFECTION DISTINCTION ──────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Biosecurity Protocols</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
            Clean is not the same as biosecure.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                In livestock farming, poultry production, and pig rearing, confusing pressure washing with biosecure disinfection is a dangerous biosecurity mistake.
              </p>
              <p>
                Pressure washing is the <strong>pre-cleaning stage</strong>: it physically removes gross organic matter, bedding, and manure from surfaces. Disinfection is a <strong>separate biological process</strong>: applying DEFRA-approved agricultural disinfectants at the correct dilution, coverage rate, and contact dwell time to bare substrate to kill viral and bacterial pathogens.
              </p>
              <p>
                Alkota high-temperature pressure washers enhance this process: removing organic biofilms with 85°C water ensures disinfectants contact bare concrete rather than being neutralised by organic manure layers.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                The 2-Stage Livestock Sanitisation Protocol
              </span>
              <div className="space-y-4 text-xs text-[#555]">
                <div>
                  <strong className="text-alkota-black block text-sm mb-0.5">Stage 01: Thermal Gross Wash</strong>
                  <p>Use Alkota 85°C hot water and high flow to strip manure, grease, and biological crusts down to bare concrete.</p>
                </div>
                <div className="border-t border-[#E8E8E4] pt-3">
                  <strong className="text-alkota-black block text-sm mb-0.5">Stage 02: Approved Disinfection</strong>
                  <p>Apply DEFRA-approved veterinary disinfectant at prescribed dilution and allow full manufacturer contact time prior to restocking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: FIXED WASH BAY VS MOBILE FARM RIGS ───────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Infrastructure Formats</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Sometimes the best machine doesn’t move.<br />
            <span className="text-[#FF6900]">Sometimes it has to go to the field.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Fixed Bay Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">CONFIGURATION 01</span>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Dedicated Farm Wash Bay
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  A stationary electric or diesel hot-water skid installed in a dedicated plant room, piped to 360° overhead stainless steel boom arms in a concrete wash bay. Operators simply grab the hose and wash without moving machinery or setting up cables.
                </p>
                <div className="space-y-1.5 text-xs text-[#666] border-t border-[#E8E8E4] pt-4">
                  <div><strong>Key Features:</strong> Overhead booms, frost-protected plant room, silt-trap drainage.</div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal hover:underline no-underline"
                >
                  <span>Design a Farm Wash Bay →</span>
                </Link>
              </div>
            </div>

            {/* Mobile Trailer Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">CONFIGURATION 02</span>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Towable Mobile Rig
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  A self-contained highway trailer carrying an industrial hot-water washer, 1,000L baffled water tank, engine/generator power, and twin live hose reels. Clean machinery in remote yards, grain stores, or customer holdings with zero site hookups.
                </p>
                <div className="space-y-1.5 text-xs text-[#666] border-t border-[#E8E8E4] pt-4">
                  <div><strong>Key Features:</strong> 1,000L baffled water tank, live hose reels, complete mobility.</div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/trailers"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal hover:underline no-underline"
                >
                  <span>Explore Mobile Trailer Systems →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10: WATER CALCULATOR & WATER WEIGHT ───────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <AgriculturalWaterCalculator />
        </div>
      </section>

      {/* ── 11: WINTER OPERATION & SERVICEABILITY ────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">11</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Winter & Servicing</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Water + frost is a bad combination.<br />
            <span className="text-[#FF6900]">The farm doesn’t shut for a part.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                In unheated farm workshops and open machinery barns, winter sub-zero temperatures represent the number one killer of commercial pressure washers. Water trapped in brass pump heads or continuous steel coils expands when frozen, cracking manifolds and rupturing hydro-insulated coils.
              </p>
              <p>
                Alkota equipment is engineered with rapid drain taps and optional antifreeze recirculating bypass loops. Furthermore, our heavy Schedule 80 ASTM A53 seamless steel coils are protected by a 7-year guarantee, backed by Alkota UK’s national next-day spare parts dispatch.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/support/replacement-parts"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black font-normal hover:text-[#FF6900] transition-colors no-underline"
                >
                  <span>Genuine Agricultural Spares →</span>
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#666] font-normal hover:text-black transition-colors no-underline"
                >
                  <span>On-Farm Service Network →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Farm Winterisation Essentials
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <Snowflake className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Drain water filter bowls and unloader bypass lines</span>
                </li>
                <li className="flex items-start gap-2">
                  <Snowflake className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Run 5L of agricultural antifreeze through pump and coil</span>
                </li>
                <li className="flex items-start gap-2">
                  <Snowflake className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Disconnect spray gun and purge high-pressure hose</span>
                </li>
                <li className="flex items-start gap-2">
                  <Snowflake className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Store trigger guns in frost-free workshop lockers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12: AGRICULTURAL SYSTEM SELECTOR ────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <AgriculturalSystemSelector />
        </div>
      </section>

      {/* ── 13: SPECIFICATIONS & CANONICAL HARDWARE ──────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Agricultural Operating Parameter Framework"
          subtitle="Standard engineering parameters recommended for tractors, combines, and farm workshop wash pads"
        />

        {/* Canonical Recommended Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Agricultural Operations"
        />

        {/* Agricultural Editorial FAQ */}
        <AgriculturalEditorialFAQ />

        {/* ── 14: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="FARM SYSTEM SPECIFICATION"
          headline="Your Machinery Works for a Living. So Should the Machine That Cleans It."
          description="Tell Alkota what machinery you operate, what contamination you deal with, how often you clean and whether you need a fixed or mobile system. We will help specify the equipment around the farm."
          primaryCTA={{
            label: 'Specify My Agricultural System',
            href: '/tools/configurator',
          }}
          secondaryCTA={{
            label: 'Explore Hot Water Machines',
            href: '/machines/hot-water',
          }}
        />
      </div>

      {/* ── 15: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
