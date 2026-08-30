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
  MarineWaterLogisticsCalculator,
  MarineSystemSelector,
  MarineEditorialFAQ,
} from '@/components/case-studies/MarineFieldTools';
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
  Anchor,
  Compass,
  Ship,
  Waves,
  ShieldAlert,
  AlertOctagon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marine Pressure Washers & Vessel Cleaning Equipment | Alkota UK',
  description:
    'Explore industrial pressure-washing systems for marine environments, from salt and dockside contamination to fishing vessels, shipyards, hot-water cleaning, mobile rigs and wastewater considerations.',
  openGraph: {
    title: 'Marine Pressure Washers & Vessel Cleaning Equipment | Alkota UK',
    description:
      'Explore industrial pressure-washing systems for marine environments, from salt and dockside contamination to fishing vessels, shipyards, hot-water cleaning, mobile rigs and wastewater considerations.',
    url: 'https://alkota.co.uk/resources/case-studies/marine',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Commercial Fishing Vessels and Marine Harbourside Industrial Cleaning',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/marine',
  },
};

export default function MarineCaseStudyPage() {
  const caseStudy = getCaseStudyBySlug('marine');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/marine#article',
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
          '@id': 'https://alkota.co.uk/resources/case-studies/marine',
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
            name: 'Marine',
            item: 'https://alkota.co.uk/resources/case-studies/marine',
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
            01 // The Marine Reality
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            The sea doesn’t just make equipment dirty.<br />
            <span className="text-[#FF6900]">It attacks it.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                From working commercial fishing vessels to harbourside cranes and dry-dock engineering facilities, marine operations exist in an environment of constant saline assault, dense biofouling, and heavy mechanical contamination.
              </p>
              <p>
                Salt spray dries into hygroscopic crystalline crusts that trap moisture and accelerate galvanic corrosion under paint coatings. Fish slime, biological oils, diesel soot, and heavy winch grease create acute slip hazards on steel decks. In this environment, washing is not an aesthetic exercise — it is an operational necessity to maintain deck safety, inspect critical mechanical fittings, and keep working vessels compliant between tides.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#0B131E] text-white p-6 sm:p-8 border border-[#1E2D3D] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] block border-b border-white/10 pb-2">
                What the Sea Leaves Behind
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#CBD5E1]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Salt Encrustations:</strong> Soluble ionic crystals that draw atmospheric moisture onto steel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Fish Slime & Fats:</strong> Organic proteins and biological oils that create hazardous slip surfaces.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Winch & Cable Grease:</strong> Heavy water-resistant lubricants mixed with abrasive salt sand.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Marine Biofouling:</strong> Algae, weed, and barnacle crusts adhering to slipways and hulls.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE MARINE ENVIRONMENT (THE HARBOUR IS THE WORKSHOP) ─── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Operating Environments</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            The harbour is the workshop.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            Diverse commercial maritime environments requiring industrial cleaning systems
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">01 / FISHING</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Commercial Fishing Vessels</span>
              <p className="text-[#666]">Trawler decks, gutting tables, net handling machinery, and fish-hold sanitisation.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">02 / QUAYS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Harbours & Fishing Quays</span>
              <p className="text-[#666]">Concrete landing quays, fish market hardstanding, and forklift loading bays.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">03 / SHIPYARDS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Shipyards & Dry Docks</span>
              <p className="text-[#666]">Steel hull washdown, marine growth blasting, propeller degreasing, and scale removal.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">04 / ACCESS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Slipways & Pontoons</span>
              <p className="text-[#666]">Tidal algae removal, slipway slime clearing, and floating pontoon maintenance.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">05 / PLANT</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Dockside Machinery</span>
              <p className="text-[#666]">Harbour mobile cranes, container reach stackers, capstans, and slew bearings.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">06 / HYDRAULICS</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Deck Winches & Rams</span>
              <p className="text-[#666]">Trawl winches, anchor windlasses, crane wire ropes, and hydraulic powerpacks.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">07 / ENGINEERING</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Marine Workshops</span>
              <p className="text-[#666]">Inboard diesel engine overhauls, gearbox degreasing, and pump rebuilds.</p>
            </div>
            <div className="p-5 bg-white border border-[#E8E8E4]">
              <span className="text-[#FF6900] font-mono block mb-1">08 / COASTAL</span>
              <span className="text-alkota-black font-medium block text-sm mb-1">Coastal Industrial Plants</span>
              <p className="text-[#666]">Power stations, offshore fabrication yards, and seaside processing works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: SALT CONTAMINATION & FRESH WATER ─────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Salt Chemistry & Rinsing</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Salt is small. Its consequences aren’t.<br />
            <span className="text-[#FF6900]">After the sea, fresh water matters.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                When seawater dries on vessel superstructures and deck fittings, it leaves behind microscopic sodium chloride and magnesium chloride crystals. These salts are hygroscopic — they continually absorb moisture from coastal air, creating localized electrolytic cells that accelerate galvanic oxidation beneath paint layers.
              </p>
              <p>
                Because salt is highly water-soluble, high-flow <strong>freshwater rinsing</strong> is the only method to dissolve and carry salt ions away. Washing with salt water simply redeposits ions. Alkota high-flow washdown units deliver the volumetric freshwater capacity required to penetrate complex structural corners, hinge pins, and bolt threads.
              </p>
              <p className="text-xs text-[#777] italic border-l-2 border-[#FF6900] pl-4">
                *Removing salt contamination is one part of an effective maintenance regime. It does not replace sacrificial zinc anodes, protective marine coatings, or scheduled mechanical overhauls.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F4] p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Freshwater Rinsing Principles
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>High Flow Over Pressure:</strong> High L/min dissolves and flushes salt crystals out of seams without forcing water into sealed bearings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Cold Water Adequacy:</strong> Salt readily dissolves in cold fresh water; heating is reserved for grease and fish oils.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span><strong>Drainage Traps:</strong> Rinsing downward from top superstructure to prevent salt pooling in deck recesses.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: PRESSURE CAUTION & COMPONENT INTEGRITY ──────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0B131E] text-white border-b border-[#1E2D3D]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Component Engineering Caution</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            More pressure is not always<br />
            <span className="text-[#FF6900]">more marine cleaning.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                Marine vessels and dock machinery incorporate delicate substrate interfaces: epoxy antifouling coatings, gelcoat laminates, sacrificial anodes, rubber propeller shaft cutless bearings, and IP67-rated radar/navigation enclosures.
              </p>
              <p>
                Blasting these components with extreme hydraulic pressure (300+ BAR) at close range can strip protective antifouling films prematurely, force water past waterproof electrical gland seals, or delaminate composite panels. Marine washdowns require calibrated pressure, wide-fan spray nozzles (25°–40°), and proper stand-off distances.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Always adhere to vessel manufacturer, coating specialist, and marine electronics cleaning guidelines.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-1">
                <AlertOctagon className="h-4 w-4" />
                <span>Marine Components Requiring Stand-Off & Care</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Gelcoat & Antifouling:</strong> Avoid point-blank 0° nozzles that can pit gelcoat or blister antifouling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Propeller Shaft Seals:</strong> Keep a minimum 40cm stand-off to avoid pushing water past lip seals into sterntubes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Bridge Electronics & Radars:</strong> Water is the tool; sensitive radomes and GPS antennas are not the target.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] mt-1.5 shrink-0" />
                  <span><strong>Sacrificial Anodes:</strong> Clean zinc/aluminium anodes of loose scale without stripping mounting fasteners.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: FLOW VS HOT WATER IN MARITIME WORK ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Flow & Thermodynamics</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Salt rinses.<br />
            <span className="text-[#FF6900]">Grease needs more.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Cold Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#38BDF8] font-mono mb-2">
                  <Droplets className="h-4 w-4" />
                  <span>High-Flow Cold Fresh Water</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Salt & Superstructure Washdown
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  For daily vessel washdown, pontoon algae clearing, and quayside mud rinsing, high freshwater flow rate (20–30 L/min) provides the volumetric flushing capacity needed to dissolve soluble salt crusts rapidly with zero burner fuel overhead.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Superstructures, window salt rinsing, slipways, floating pontoons, general decks.
              </div>
            </div>

            {/* Hot Water Box */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                  <Flame className="h-4 w-4" />
                  <span>Industrial Hot Water & Vapour Steam</span>
                </div>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Winch Grease & Fish Oil Emulsification
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  When dealing with heavy water-resistant winch grease, hydraulic oil weeping on deck cranes, diesel exhaust soot, or biological fish slime in hold compartments, 85°C hot water liquefies hydrocarbons and animal fats instantly, restoring non-slip deck traction.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E8E4] text-xs text-[#777]">
                <strong>Best For:</strong> Trawl winches, deck machinery, fish processing holds, engine rooms, oily slipways.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: COMMERCIAL FISHING OPERATIONS WORKFLOW ───────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Fishing Operations</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            When the boat comes in, the cleaning starts.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            An illustrative commercial fishing vessel turnaround between tides
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 01</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">01 / Land Catch</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Discharge catch onto quayside fish market. Inspect deck, gutting bins, and conveyor chutes for gross organic residues.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 02</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">02 / Gross Wash</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Use high-flow freshwater lances to flush loose scales, fish waste, and salt spray down deck scuppers into dock containment sumps.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 03</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">03 / Thermal Degrease</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Deploy 85°C Alkota hot water across non-slip deck coatings, gutting tables, and winch blocks to dissolve stubborn fish oils.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 04</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">04 / Winch Inspection</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Clean trawl winches and capstans to inspect wire rope condition, hydraulic ram seals, and brake band linings for wear.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 05</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">05 / Hold Sanitisation</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Thermal washdown of insulated fish-hold bulkheads, ice storage sumps, and drainage lines prior to restocking fresh ice.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">PHASE 06</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">06 / Ready for Tide</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Re-grease essential mechanical lubrication points and stage nets, ready for departure on the next high-water window.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: WATER LOGISTICS & HOSE CALCULATOR ────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <MarineWaterLogisticsCalculator />
        </div>
      </section>

      {/* ── 08: ENVIRONMENTAL CONTROLS & WATER RECOVERY ──────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0B131E] text-white border-b border-[#1E2D3D]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">Environmental Controls</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            The sea is not the drain.<br />
            <span className="text-[#FF6900]">What comes off the vessel matters.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
              <p>
                In UK ports, harbours, and coastal boatyards, wash water containing petroleum hydrocarbons, toxic copper/biocide antifouling paint flakes, or heavy degreasers must not be discharged directly into the sea or municipal stormwater drains.
              </p>
              <p>
                Professional maritime contractors utilise enclosed rotary surface cleaners fitted with perimeter vacuum recovery ports. Alkota water recovery systems extract wash water directly at the cleaning head, transferring trade effluent into onboard holding tanks or mobile oil-water separation systems.
              </p>
              <p className="text-xs text-[#888] italic border-l-2 border-[#FF6900] pl-4">
                Local harbour authorities enforce strict trade effluent regulations. Always establish containment and recovery controls prior to washdowns.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-white/10 pb-2">
                Dockside Environmental Solutions
              </span>
              <div className="space-y-4 text-xs text-[#CBD5E1]">
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Vacuum Recovery Surface Cleaners</span>
                  <p>Enclosed stainless steel rotary cleaners that capture and extract dirty wash water instantly on slipways and docks.</p>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Inflatable Drain Bunds & Berms</span>
                  <p>Chemical-resistant containment barriers that prevent quayside runoff from entering harbour waters.</p>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm mb-1">Closed-Loop Recovery Rigs</span>
                  <p>Multi-stage sediment and coalescing oil-water separation for self-contained shipyard operations.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/trailers/recovery"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
                >
                  <span>Explore Marine Water Recovery Systems →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: FIXED VS MOBILE TRAILER PLATFORMS ────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Infrastructure Configuration</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            When the cleaning can’t stay in the yard.<br />
            <span className="text-[#FF6900]">Fixed workshops vs mobile marine rigs.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Fixed Marine Skid */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">CONFIGURATION 01</span>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Fixed Shipyard / Workshop Skid
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  Stationary electric or diesel hot-water skids housed in marine engineering workshops or dry-dock plant rooms, piped to permanent overhead boom drops with remote quayside operator control boxes.
                </p>
                <div className="space-y-1.5 text-xs text-[#666] border-t border-[#E8E8E4] pt-4">
                  <div><strong>Key Features:</strong> Stainless steel wraps, frost-protected housing, continuous 24/7 duty.</div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal hover:underline no-underline"
                >
                  <span>Design a Shipyard Wash System →</span>
                </Link>
              </div>
            </div>

            {/* Mobile Trailer Rig */}
            <div className="p-8 bg-white border border-[#E8E8E4] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#FF6900] uppercase block mb-1">CONFIGURATION 02</span>
                <h3 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Towable Marine Trailer Rig
                </h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6">
                  A self-contained highway trailer carrying an industrial hot-water washer, 1,000L baffled freshwater tank, diesel engine, generator, and dual live stainless steel hose reels for long pontoon deployments.
                </p>
                <div className="space-y-1.5 text-xs text-[#666] border-t border-[#E8E8E4] pt-4">
                  <div><strong>Key Features:</strong> 1,000L baffled water tank, live stainless reels, complete mobility across quays.</div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/trailers"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal hover:underline no-underline"
                >
                  <span>Explore Mobile Marine Trailer Rigs →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10: MARINE SYSTEM SELECTOR ──────────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <MarineSystemSelector />
        </div>
      </section>

      {/* ── 11: SPECIFICATIONS & CANONICAL HARDWARE ─────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Maritime Operating Parameter Framework"
          subtitle="Standard engineering parameters recommended for commercial vessels, shipyards, and dockside wash pads"
        />

        {/* Canonical Recommended Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Marine & Harbourside Operations"
        />

        {/* Marine Editorial FAQ */}
        <MarineEditorialFAQ />

        {/* ── 12: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="MARITIME SYSTEM SPECIFICATION"
          headline="The Sea is Hard on Equipment. Your Cleaning System Should Be Built for the Same Reality."
          description="Tell us what you clean, where you operate, what contamination you face and how mobile the system needs to be. Alkota UK can specify the equipment around the marine environment."
          primaryCTA={{
            label: 'Specify a Marine System',
            href: '/tools/configurator',
          }}
          secondaryCTA={{
            label: 'Explore Hot Water Machines',
            href: '/machines/hot-water',
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
