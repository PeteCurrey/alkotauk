import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  FileText, 
  FlaskConical,
  Award,
  Layers,
  CheckCircle2,
  Truck,
  Tractor,
  HardHat,
  ChevronDown
} from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import AmericanHeritageFlagOverlay from '@/components/chemicals/AmericanHeritageFlagOverlay';
import SafeImage from '@/components/ui/SafeImage';
import { 
  getRetailProducts, 
  getChemicalApplications,
  getMasterFormulations 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Chemical Range & Detergents Store | Alkota Parts & Attachments UK',
  description: 'Shop commercial vehicle traffic film removers (RoadForce TR-407), heavy workshop degreasers (GreaseCut DE-703), aluminium brighteners (AlumaRestore TS-602), and Schedule 80 coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
};

interface ChemicalsStorePageProps {
  searchParams: Promise<{
    app?: string;
    family?: string;
    q?: string;
  }>;
}

export default async function ChemicalsStorefrontPage({ searchParams }: ChemicalsStorePageProps) {
  const { app, family, q } = await searchParams;
  
  const allProducts = await getRetailProducts({
    applicationSlug: app,
    family: family,
  });

  const applications = await getChemicalApplications();
  const formulations = await getMasterFormulations();

  // Filter by search query if present
  let filteredProducts = allProducts;
  if (q && q.trim()) {
    const term = q.trim().toLowerCase();
    filteredProducts = allProducts.filter(p => 
      p.retail_name.toLowerCase().includes(term) ||
      p.originating_master_code.toLowerCase().includes(term) ||
      p.originating_master_name.toLowerCase().includes(term) ||
      p.short_description.toLowerCase().includes(term) ||
      p.retail_family.toLowerCase().includes(term)
    );
  }

  // Curated 4 Flagship Powerhouses
  const flagshipProducts = [
    {
      slug: 'roadforce-fleet-heavy-tfr',
      masterCode: 'TR-407',
      masterName: 'Power Blast',
      brandFamily: 'RoadForce',
      descriptor: 'Heavy-Duty Traffic Film Remover (TFR)',
      headline: 'Built for the dirt ordinary detergents leave behind.',
      description: 'The UK haulage standard for touchless static road film, diesel particulate, and winter salt removal without etching livery vinyls or raw aluminium.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£38.50',
      image: '/assets/industries/fleet.png',
      badge: 'FLAGSHIP TFR'
    },
    {
      slug: 'greasecut-workshop-degreaser',
      masterCode: 'DE-703',
      masterName: 'Grease Cutter',
      brandFamily: 'GreaseCut',
      descriptor: 'High-Alkaline Workshop & Plant Degreaser',
      headline: 'Molecular saponification of baked hydraulic fluid & engine oils.',
      description: 'Accelerates under hot water pressure washing up to 95°C to turn stubborn hydrocarbon binders into soluble emulsion in under 60 seconds.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£42.00',
      image: '/assets/parts/parts-hero-workshop.jpg',
      badge: 'HEAVY DEGREASER'
    },
    {
      slug: 'alumarestore-aluminium-acid-brightener',
      masterCode: 'TS-602',
      masterName: 'Aluma Shine 2',
      brandFamily: 'AlumaRestore',
      descriptor: 'Aluminium Acid Cleaner & Deoxidiser',
      headline: 'Instant chemical restoration of weathered raw aluminium.',
      description: 'Phosphoric and organic acid deoxidiser that strips grey chalking and oxidation from fuel tanks, wheels, and tipper bodies back to a factory satin luster.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£46.00',
      image: '/assets/hot-water-gauge-hero.jpg',
      badge: 'METAL BRIGHTENER'
    },
    {
      slug: 'scaleguard-coil-protector',
      masterCode: 'SD-927',
      masterName: 'No Scale',
      brandFamily: 'ScaleGuard',
      descriptor: 'Preventative Boiler Descaler & Scale Inhibitor',
      headline: 'Essential protection for continuous-duty Schedule 80 heating coils.',
      description: 'Binds free calcium and magnesium minerals before thermal precipitation, preventing scale blockage and preserving your 7-year boiler warranty.',
      packSizes: ['5 L', '20 L', '200 L'],
      fromPrice: '£34.00',
      image: '/assets/engineered-continuous-duty.jpg',
      badge: 'COIL PROTECTOR'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: IMMERSIVE FULL-SCREEN EDITORIAL HERO ────────────────────────── */}
      <section
        className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
        aria-label="Alkota UK Professional Chemistry Store"
      >
        {/* Authentic Background Photography + Subtle American Flag Fade Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota commercial chemical engineering"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.60) contrast(1.12)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
          <AmericanHeritageFlagOverlay opacity={0.16} />
        </div>

        {/* Content Container — Vertically Centred */}
        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
          <div className="max-w-2xl">
            {/* Provenance Monoline */}
            <div className="mb-5 inline-flex items-center gap-3 font-normal">
              <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
                Est. 1964 · Alcester, South Dakota · UK Direct Formulations
              </span>
            </div>

            {/* Monumental Work Sans Headline */}
            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
            >
              Professional Chemistry.<br />
              <span className="text-alkota-orange">Built for the work.</span>
            </h1>

            {/* Editorial Supporting Subtitle */}
            <p className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-normal">
              Ordinary detergents break down at 40°C. Alkota thermal chemistry accelerates at 90°C — turning road film, compacted clay, and hydraulic grease into water-soluble emulsion.
            </p>

            {/* Fast Search Input Bar */}
            <div className="max-w-lg bg-white/95 backdrop-blur-sm p-1.5 mb-8 shadow-2xl">
              <form action="/parts-attachments/chemicals" method="GET" className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#888] ml-2.5 shrink-0" />
                <input
                  type="text"
                  name="q"
                  defaultValue={q || ''}
                  placeholder="Search RoadForce, TR-407, TFR, degreaser, acid brightener..."
                  className="w-full bg-transparent text-alkota-black text-xs sm:text-sm px-2 py-2 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  className="bg-alkota-orange hover:bg-black text-white px-5 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
              <a
                href="#flagships"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal"
              >
                <span>Flagship Range</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/chemicals/finder"
                className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Chemical Match Tool</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="relative z-10 max-w-7xl w-full mx-auto border-t border-white/10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#AAA]">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-widest">Formulation Heritage</span>
              <span className="text-white font-medium">50+ Years USA Craft</span>
            </div>
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-widest">Thermal Synergy</span>
              <span className="text-emerald-400 font-medium">Up to 95°C Stable</span>
            </div>
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-widest">Machine Safety</span>
              <span className="text-white font-medium">Schedule 80 Coil Safe</span>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#777]">
            100% GB-CLP &amp; UK REACH Compliant
          </div>
        </div>
      </section>

      {/* ── 02: THE 4 POWERHOUSE FORMULATIONS (EDITORIAL SPOTLIGHT) ────────── */}
      <section id="flagships" className="py-24 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // The Core Range
              </span>
              <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase">
                The 4 Powerhouses.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
              Engineered not as commodity detergents, but as targeted chemical solutions for the UK’s most unforgiving commercial cleaning demands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {flagshipProducts.map((p, idx) => (
              <div 
                key={p.slug}
                className="group relative bg-[#121210] border border-[#222] hover:border-alkota-orange/80 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Subtle Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-alkota-orange/5 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 border border-alkota-orange/30 px-2.5 py-1">
                      {p.badge}
                    </span>
                    <span className="font-ibm-plex-mono text-xs text-[#888]">
                      Master: <strong className="text-white">{p.masterCode}</strong>
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extralight text-white tracking-tight leading-tight mb-2 group-hover:text-alkota-orange transition-colors">
                    {p.brandFamily}
                  </h3>
                  <span className="font-ibm-plex-mono text-xs text-[#AAA] block mb-4 uppercase tracking-wider">
                    {p.descriptor}
                  </span>

                  <p className="text-base text-[#DDD] font-light mb-3 leading-snug">
                    "{p.headline}"
                  </p>
                  <p className="text-xs text-[#888] font-normal leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="pt-4 border-t border-[#222] flex flex-wrap items-center gap-2 mb-6">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mr-2">
                      Available In:
                    </span>
                    {p.packSizes.map((size) => (
                      <span key={size} className="font-ibm-plex-mono text-[10px] text-[#BBB] bg-white/5 border border-white/10 px-2 py-0.5">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#222] flex items-center justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] block">Direct Trade Price</span>
                    <span className="font-ibm-plex-mono text-lg text-white font-medium">From {p.fromPrice} <span className="text-[10px] text-[#888]">ex VAT</span></span>
                  </div>
                  <Link
                    href={`/chemicals/product/${p.slug}`}
                    className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shadow-lg font-medium"
                  >
                    <span>View Formulation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03: THE 5-STAGE SEQUENTIAL CLEANING SYSTEM ───────────────────────── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="border-b border-[#E0DEDC] pb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Sequential Process Engineering
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              The 5-Stage Regimen.
            </h2>
            <p className="text-sm text-[#666] font-normal mt-2 max-w-xl">
              Alkota chemistry is engineered as an integrated system. Combining pre-treatments, thermal detergents, and acid brighteners cuts cleaning time by up to 60%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Pre-Soak & Degrease',
                formula: 'GreaseCut DE-703',
                action: 'Saponifies baked hydrocarbons, heavy chassis grease, and fifth-wheel deposits on contact.',
                tag: 'HIGH ALKALINE'
              },
              {
                step: '02',
                title: 'High-Pressure TFR',
                formula: 'RoadForce TR-407',
                action: 'Penetrates electrostatically bonded traffic film and diesel soot across vehicle paintwork.',
                tag: 'TOUCHLESS TFR'
              },
              {
                step: '03',
                title: 'Aluminium Brightening',
                formula: 'AlumaRestore TS-602',
                action: 'Deoxidises weathered raw aluminium fuel tanks, tippers, and catwalks back to satin shine.',
                tag: 'ACID DEOXIDISER'
              },
              {
                step: '04',
                title: 'Coil Protection',
                formula: 'ScaleGuard SD-927',
                action: 'Sequesters hard water minerals inside Schedule 80 heating coils, preventing limescale buildup.',
                tag: 'DESCALER'
              },
              {
                step: '05',
                title: 'Water Recovery Safe',
                formula: 'Quick-Break Tech',
                action: 'Allows oil-water interceptors to cleanly separate oil fractions for environmental discharge.',
                tag: 'GB COMPLIANCE'
              }
            ].map((st) => (
              <div key={st.step} className="p-6 bg-white border border-[#E0DEDC] flex flex-col justify-between space-y-4 hover:border-alkota-orange transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-ibm-plex-mono text-2xl font-extralight text-alkota-orange">{st.step}</span>
                    <span className="font-ibm-plex-mono text-[8px] uppercase tracking-wider text-[#888] bg-[#F5F4F0] px-1.5 py-0.5">{st.tag}</span>
                  </div>
                  <h4 className="text-base font-medium text-alkota-black mb-1">{st.title}</h4>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange block mb-2">{st.formula}</span>
                  <p className="text-xs text-[#666] leading-relaxed font-normal">{st.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04: APPLICATION FILTER STRIP & LIVE CATALOGUE ─────────────────────── */}
      <section id="catalog" className="py-20 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // Direct Trade Storefront
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-alkota-black tracking-tight uppercase">
                {app 
                  ? applications.find(a => a.slug === app)?.name || 'Chemical Formulations'
                  : q 
                    ? `Search Results for "${q}"`
                    : 'Complete Formulation Catalogue'
                }
              </h2>
            </div>
            <span className="font-mono text-xs text-[#888]">
              Showing {filteredProducts.length} verified chemical products
            </span>
          </div>

          {/* Application Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-[#E8E8E4]">
            <Link
              href="/parts-attachments/chemicals#catalog"
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-none whitespace-nowrap transition-colors ${
                !app
                  ? 'bg-alkota-orange text-white font-medium shadow-sm'
                  : 'bg-[#F5F4F0] text-[#555] hover:bg-black hover:text-white'
              }`}
            >
              All Formulations ({allProducts.length})
            </Link>

            {applications.map((application) => {
              const isActive = app === application.slug;
              return (
                <Link
                  key={application.slug}
                  href={`/parts-attachments/chemicals?app=${application.slug}#catalog`}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-none whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-alkota-orange text-white font-medium shadow-sm'
                      : 'bg-[#F5F4F0] text-[#555] hover:bg-black hover:text-white'
                  }`}
                >
                  {application.name}
                </Link>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-[#FAF9F5] border border-[#E0DEDC] space-y-4">
              <Droplets className="h-10 w-10 text-[#BBB] mx-auto" />
              <h3 className="text-lg font-normal text-alkota-black">No chemical formulations match your criteria.</h3>
              <p className="text-xs text-[#777]">Try clearing your search query or select another application sector.</p>
              <Link
                href="/parts-attachments/chemicals#catalog"
                className="inline-block bg-alkota-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Reset Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ChemicalCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── 05: BULK 200L, 1000L IBC & FLEET SUPPLY (COMMERCIAL REVENUE) ─────── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
                // High-Volume Commercial Distribution
              </span>
              <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase leading-tight">
                Bulk Drums &amp; 1000L IBC Tanker Supply.
              </h2>
              <p className="text-[#AAA] text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                Operating multi-bay haulage depots, plant hire operations, or agricultural machinery fleets? Alkota UK provides full palletised 200L barrel drops, 1000L IBC containers, automated chemical dosing skids, and scheduled site restocking agreements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 bg-[#141412] border border-[#222]">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">01 / Palletised IBCs</span>
                  <span className="text-xs text-[#CCC] font-light">Direct forklift-ready 1000L IBC containers with integrated draw valves.</span>
                </div>
                <div className="p-5 bg-[#141412] border border-[#222]">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">02 / Automated Dosing</span>
                  <span className="text-xs text-[#CCC] font-light">Proportional venturi and peristaltic chemical manifolds for wash bays.</span>
                </div>
                <div className="p-5 bg-[#141412] border border-[#222]">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">03 / Scheduled Supply</span>
                  <span className="text-xs text-[#CCC] font-light">Volume trade pricing with predictable monthly depot replenishment.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white text-alkota-black p-8 sm:p-10 border border-[#E0DEDC] space-y-6 shadow-2xl">
              <h3 className="text-2xl font-light text-alkota-black">
                Commercial Trade Accounts
              </h3>
              <p className="text-xs text-[#666] leading-relaxed font-normal">
                Speak directly with an Alkota chemical engineer for volume-tiered pricing, COSHH safety compliance files, or site trial evaluations.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact?type=chemical-bulk"
                  className="flex items-center justify-center gap-2 w-full bg-alkota-orange text-white py-4 font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors shadow-md font-medium"
                >
                  <span>Request Bulk Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/chemicals/safety-data"
                  className="flex items-center justify-center gap-2 w-full border border-[#CCC] text-alkota-black py-3.5 font-mono text-xs uppercase tracking-widest hover:border-black transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-alkota-orange" />
                  <span>Download SDS Portal</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 06: MASTER HERITAGE INTEGRITY FOOTER ─────────────────────────────── */}
      <section className="bg-[#11110F] text-white py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Award className="w-6 h-6 text-alkota-orange shrink-0" />
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                Authentic American Chemistry Heritage
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-white">
                Master Formulations · Alcester, South Dakota × UK Commercial Distribution
              </span>
            </div>
          </div>
          <div className="font-ibm-plex-mono text-xs text-[#888]">
            Alkota UK · Guaranteed Machine &amp; Heating Coil Compatibility
          </div>
        </div>
      </section>

    </main>
  );
}
