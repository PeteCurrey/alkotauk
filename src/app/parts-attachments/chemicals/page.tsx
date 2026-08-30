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

  // Curated 4 Flagship Powerhouses with human, clear copy
  const flagshipProducts = [
    {
      slug: 'roadforce-fleet-heavy-tfr',
      masterCode: 'TR-407',
      masterName: 'Power Blast',
      brandFamily: 'RoadForce Heavy TFR',
      descriptor: 'Touchless Traffic Film Remover',
      headline: 'Cuts through heavy road film and diesel grime in one pass.',
      description: 'The standard for commercial fleet washdowns. Removes baked electrostatic road film and winter salt without etching vehicle livery or polished aluminium.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£38.50',
      badge: 'FLAGSHIP TFR'
    },
    {
      slug: 'greasecut-workshop-degreaser',
      masterCode: 'DE-703',
      masterName: 'Grease Cutter',
      brandFamily: 'GreaseCut Degreaser',
      descriptor: 'Heavy Plant & Chassis Degreaser',
      headline: 'Dissolves thick hydraulic oil and chassis grease on contact.',
      description: 'Accelerates under hot water pressure washing up to 90°C. Saponifies heavy petroleum binders into soluble emulsion that rinses away clean.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£42.00',
      badge: 'HEAVY DEGREASER'
    },
    {
      slug: 'alumarestore-aluminium-acid-brightener',
      masterCode: 'TS-602',
      masterName: 'Aluma Shine 2',
      brandFamily: 'AlumaRestore Brightener',
      descriptor: 'Aluminium Acid Cleaner & Deoxidiser',
      headline: 'Restores weathered, chalky aluminium back to satin brilliance.',
      description: 'Phosphoric and organic acid deoxidiser that strips grey oxidation from fuel tanks, wheels, and tipper bodies in under two minutes.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L IBC'],
      fromPrice: '£46.00',
      badge: 'METAL BRIGHTENER'
    },
    {
      slug: 'scaleguard-coil-protector',
      masterCode: 'SD-927',
      masterName: 'No Scale',
      brandFamily: 'ScaleGuard Descaler',
      descriptor: 'Heating Coil Scale Inhibitor',
      headline: 'Binds hard water calcium before it blocks your boiler coil.',
      description: 'Essential preventative treatment for hot water pressure washers. Prevents scale choke points and protects your 7-year boiler warranty.',
      packSizes: ['5 L', '20 L', '200 L'],
      fromPrice: '£34.00',
      badge: 'COIL PROTECTOR'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: CLEAN, LIGHT EDITORIAL HERO ── */}
      <section 
        className="relative min-h-[85vh] w-full flex flex-col justify-center bg-[#FAF9F5] text-alkota-black pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#E8E8E4] overflow-hidden"
        aria-label="Alkota UK Professional Chemical Store"
      >
        <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
          
          <div className="inline-flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-[#777] font-medium">
              Professional Cleaning Chemistry
            </span>
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.8rem)' }}
            >
              Chemistry built <br />
              <span className="text-[#555] font-light">for the work.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed max-w-xl">
              Ordinary detergents break down at 40°C. Alkota chemistry accelerates up to 90°C under hot water pressure washing — turning stubborn traffic film, clay, and grease into clean rinse water.
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-md bg-white border border-[#DCDAD4] hover:border-black shadow-sm transition-all">
            <form action="/parts-attachments/chemicals" method="GET" className="flex items-center gap-2 p-1">
              <Search className="h-4 w-4 text-[#888] ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={q || ''}
                placeholder="Search RoadForce, TFR, degreaser, acid brightener..."
                className="w-full bg-transparent text-xs sm:text-sm text-alkota-black px-2 py-3 focus:outline-none placeholder:text-[#999] font-normal"
              />
              <button
                type="submit"
                className="bg-alkota-black hover:bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer font-medium"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-ibm-plex-mono">
            <a
              href="#flagships"
              className="inline-flex items-center gap-2 text-alkota-black hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors"
            >
              <span>View Flagship Formulations</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
            </a>
            <span className="text-[#DDD]">•</span>
            <Link
              href="/chemicals/finder"
              className="inline-flex items-center gap-2 text-[#666] hover:text-black uppercase tracking-wider transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              <span>Chemical Match Tool</span>
            </Link>
          </div>

        </div>

        {/* Bottom Telemetry Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 mt-12 border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-ibm-plex-mono text-[#777]">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Heritage</span>
              <span className="text-alkota-black font-medium">50+ Years USA Craft</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-[#E0DED8]" />
            <div>
              <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Thermal Synergy</span>
              <span className="text-alkota-black font-medium">Accelerates at 50°C–90°C</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-[#E0DED8]" />
            <div>
              <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Machine Safety</span>
              <span className="text-emerald-700 font-medium">Schedule 80 Coil Safe</span>
            </div>
          </div>
          <span className="text-[#888] uppercase text-[10px]">100% GB-CLP &amp; UK REACH Compliant</span>
        </div>
      </section>

      {/* ── 02: THE 4 POWERHOUSES (CLEAN LIGHT STAGING) ── */}
      <section id="flagships" className="py-28 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                // The Core Four
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
              >
                The 4 Powerhouses.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
              Formulated not as generic detergents, but as targeted solutions for the UK’s most demanding transport, plant, and agricultural wash bays.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {flagshipProducts.map((p) => (
              <div 
                key={p.slug}
                className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-12 flex flex-col justify-between space-y-8 hover:border-black transition-colors"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-semibold">
                      {p.badge}
                    </span>
                    <span className="font-ibm-plex-mono text-xs text-[#777]">
                      Master: <strong className="text-alkota-black font-semibold">{p.masterCode}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase leading-tight mb-2">
                      {p.brandFamily}
                    </h3>
                    <span className="font-ibm-plex-mono text-xs text-[#777] block uppercase tracking-wider">
                      {p.descriptor}
                    </span>
                  </div>

                  <p className="text-base text-[#1A1A1A] font-light leading-snug">
                    "{p.headline}"
                  </p>
                  
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-4 border-t border-[#E8E8E4] flex flex-wrap items-center gap-2">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] mr-2">
                      Pack Sizes:
                    </span>
                    {p.packSizes.map((size) => (
                      <span key={size} className="font-ibm-plex-mono text-[10px] text-[#444] bg-white border border-[#E0DED8] px-2.5 py-1">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8E8E4] flex items-center justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] block">Trade Price</span>
                    <span className="font-ibm-plex-mono text-xl text-alkota-black font-light">From {p.fromPrice} <span className="text-[10px] text-[#777]">ex VAT</span></span>
                  </div>
                  <Link
                    href={`/chemicals/product/${p.slug}`}
                    className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 03: 5-STAGE PROCESS REGIMEN (CONTINUOUS PROCESS FLOW) ── */}
      <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="border-b border-[#E8E8E4] pb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Sequential Process Flow
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
            >
              The 5-Stage Regimen.
            </h2>
            <p className="text-sm text-[#666] font-normal mt-2 max-w-xl">
              Alkota chemistry is engineered to work together. Combining pre-treatments, thermal detergents, and acid brighteners cuts total cleaning time by up to 60%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Pre-Soak & Degrease',
                formula: 'GreaseCut DE-703',
                action: 'Dissolves heavy chassis grease, fifth-wheel grease, and baked oil build-up on contact.',
                tag: 'DEGREASER'
              },
              {
                step: '02',
                title: 'Touchless TFR',
                formula: 'RoadForce TR-407',
                action: 'Penetrates static road film, soot, and salt across vehicle paintwork without scrubbing.',
                tag: 'TRAFFIC FILM'
              },
              {
                step: '03',
                title: 'Aluminium Brightening',
                formula: 'AlumaRestore TS-602',
                action: 'Deoxidises weathered raw aluminium fuel tanks, wheels, and tippers back to satin shine.',
                tag: 'BRIGHTENER'
              },
              {
                step: '04',
                title: 'Coil Protection',
                formula: 'ScaleGuard SD-927',
                action: 'Binds hard water calcium inside Schedule 80 heating coils, preventing limescale blockage.',
                tag: 'SCALE STOP'
              },
              {
                step: '05',
                title: 'Interceptor Safe',
                formula: 'Quick-Break Surfactants',
                action: 'Allows oil-water interceptors to cleanly separate oils for compliant environmental discharge.',
                tag: 'UK COMPLIANCE'
              }
            ].map((st) => (
              <div key={st.step} className="p-6 bg-white border border-[#E8E8E4] flex flex-col justify-between space-y-4 hover:border-black transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-ibm-plex-mono text-2xl font-extralight text-alkota-orange">{st.step}</span>
                    <span className="font-ibm-plex-mono text-[8px] uppercase tracking-wider text-[#666] bg-[#F5F4EF] px-2 py-0.5 font-medium">{st.tag}</span>
                  </div>
                  <h4 className="text-base font-medium text-[#0A0A0A] mb-1">{st.title}</h4>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange block mb-2 font-medium">{st.formula}</span>
                  <p className="text-xs text-[#666] leading-relaxed font-normal">{st.action}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 04: FULL CATALOGUE DIRECTORY ── */}
      <section className="py-28 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                // Complete Range
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
                All Formulations.
              </h2>
            </div>
            <div className="text-xs font-ibm-plex-mono text-[#777]">
              Showing {filteredProducts.length} verified commercial chemical products
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <ChemicalCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
