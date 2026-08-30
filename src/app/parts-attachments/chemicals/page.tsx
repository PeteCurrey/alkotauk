import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, ChevronRight, Droplets, Sparkles, Check } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  getRetailProducts, 
  getChemicalApplications,
  getMasterFormulations 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Cleaning Chemistry | Alkota UK',
  description: 'Commercial vehicle traffic film removers (RoadForce), heavy plant degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
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

  // The 4 Core Powerhouses
  const flagshipProducts = [
    {
      slug: 'roadforce-fleet-heavy-tfr',
      masterCode: 'TR-407',
      name: 'RoadForce Fleet Heavy TFR',
      task: 'Touchless Traffic Film Remover',
      headline: 'Cuts through road film and diesel grime.',
      desc: 'The standard for commercial fleet washdowns. Removes static road film, soot, and winter salt in one touchless pass without etching vehicle livery or polished aluminium.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L'],
      fromPrice: '£38.50',
      image: '/assets/industries/fleet.png',
      transformation: {
        from: 'Static Road Film & Diesel Soot',
        to: 'Clean Paintwork & Clear Sheeting'
      }
    },
    {
      slug: 'greasecut-workshop-degreaser',
      masterCode: 'DE-703',
      name: 'GreaseCut Workshop Degreaser',
      task: 'High-Alkaline Plant Degreaser',
      headline: 'Dissolves baked oil and chassis grease on contact.',
      desc: 'Accelerates under 50°C–90°C hot water washing to saponify heavy petroleum oils and hydraulic grease into clean rinse water.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L'],
      fromPrice: '£42.00',
      image: '/assets/parts/parts-hero-workshop.jpg',
      transformation: {
        from: 'Baked Hydraulic Oil & Grease',
        to: 'Bare Metal Soluble Rinse'
      }
    },
    {
      slug: 'alumarestore-aluminium-acid-brightener',
      masterCode: 'TS-602',
      name: 'AlumaRestore Acid Brightener',
      task: 'Aluminium Cleaner & Deoxidiser',
      headline: 'Restores weathered aluminium to satin brilliance.',
      desc: 'Phosphoric and organic acid deoxidiser that strips grey chalking and heavy oxidation from fuel tanks, wheels, and tipper bodies in under two minutes.',
      packSizes: ['5 L', '20 L', '200 L', '1000 L'],
      fromPrice: '£46.00',
      image: '/assets/hot-water-gauge-hero.jpg',
      transformation: {
        from: 'Oxidised Chalky Aluminium',
        to: 'Restored Satin Finish'
      }
    },
    {
      slug: 'scaleguard-coil-protector',
      masterCode: 'SD-927',
      name: 'ScaleGuard Coil Protector',
      task: 'Heating Coil Scale Inhibitor',
      headline: 'Binds hard water minerals before they block your coil.',
      desc: 'Essential preventative treatment for hot water pressure washers. Prevents scale choke points and preserves your 7-year boiler warranty.',
      packSizes: ['5 L', '20 L', '200 L'],
      fromPrice: '£34.00',
      image: '/assets/engineered-continuous-duty.jpg',
      transformation: {
        from: 'Hard Calcium Precipitation',
        to: 'Continuous Free Water Flow'
      }
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: CAMPAIGN HERO — DRAMATIC CHEMICAL STAGING ── */}
      <section 
        className="relative min-h-[90vh] w-full flex flex-col justify-between bg-[#FAF9F5] text-alkota-black pt-36 pb-16 px-6 sm:px-12 lg:px-24 overflow-hidden"
        aria-label="Alkota UK Professional Cleaning Chemistry"
      >
        <div className="max-w-7xl mx-auto w-full my-auto space-y-12">
          
          <div className="max-w-3xl space-y-6">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-[#777] font-medium block">
              Professional Cleaning Chemistry
            </span>

            <h1 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.9] select-none"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 6.2rem)' }}
            >
              Cleaning <br />
              <span className="text-[#666] font-light">chemistry.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#555] font-normal leading-relaxed max-w-lg">
              Made for serious cleaning. Formulated to work faster with hot water pressure washing.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#flagships"
                className="inline-flex items-center gap-3 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/chemicals/finder"
                className="inline-flex items-center gap-2 text-[#666] hover:text-black font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors py-4 px-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Chemical Match Tool</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Ambient Line */}
        <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#777]">
          <div className="flex flex-wrap items-center gap-6">
            <span>50+ Years USA Craft</span>
            <span className="text-[#DDD]">•</span>
            <span>Accelerates at 50°C–90°C</span>
            <span className="text-[#DDD]">•</span>
            <span>100% GB-CLP Compliant</span>
          </div>

          <a href="#catalogue" className="text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors">
            All Products ({allProducts.length}) ↓
          </a>
        </div>
      </section>

      {/* ── 02: VISUAL STORYTELLING — BEFORE / AFTER TRANSFORMATION ── */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-y border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-20">
          
          <div className="max-w-xl space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              Surface Transformation
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              The result on the surface.
            </h2>
            <p className="text-sm sm:text-base text-[#666] font-normal leading-relaxed">
              Standard detergents only lift loose dust. Alkota chemistry breaks the static bond holding road grime, grease, and oxidation to metal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flagshipProducts.map((p) => (
              <div key={p.slug} className="space-y-6">
                <div className="space-y-2">
                  <span className="font-ibm-plex-mono text-xs text-[#888] font-light">
                    {p.masterCode}
                  </span>
                  <h3 className="text-xl font-light text-[#0A0A0A] tracking-tight uppercase">
                    {p.name.split(' ')[0]}
                  </h3>
                </div>

                {/* Transformation Visual Strip */}
                <div className="p-6 bg-[#FAF9F5] border border-[#E8E8E4] space-y-4">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#999] block mb-1">
                      Before Application
                    </span>
                    <p className="text-xs font-normal text-[#444]">
                      {p.transformation.from}
                    </p>
                  </div>

                  <div className="h-px bg-[#E8E8E4] flex items-center justify-center">
                    <span className="bg-[#FAF9F5] px-2 text-[10px] text-alkota-orange font-mono">↓</span>
                  </div>

                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                      After Hot Water Rinse
                    </span>
                    <p className="text-xs font-medium text-alkota-black">
                      {p.transformation.to}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/chemicals/product/${p.slug}`}
                  className="font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>View Formulation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 03: THE 4 POWERHOUSES (INDIVIDUAL PHYSICAL PRODUCT MOMENTS) ── */}
      <section id="flagships" className="py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                Core Formulations
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
              >
                The 4 Powerhouses.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
              Targeted chemistry for commercial haulage, agricultural machinery, workshop wash bays, and boiler protection.
            </p>
          </div>

          <div className="space-y-20">
            {flagshipProducts.map((p, idx) => (
              <div 
                key={p.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-[#E8E8E4] pb-20 last:border-b-0 last:pb-0"
              >
                {/* 6 Cols Narrative */}
                <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-2">
                    <span className="font-ibm-plex-mono text-xs text-alkota-orange uppercase tracking-wider font-semibold">
                      {p.masterCode} · {p.task}
                    </span>
                    <h3 
                      className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
                      style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                    >
                      {p.name}
                    </h3>
                  </div>

                  <p className="text-base sm:text-lg text-[#1A1A1A] font-light leading-snug">
                    "{p.headline}"
                  </p>

                  <p className="text-sm text-[#555] font-normal leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] mr-2">
                      Pack Formats:
                    </span>
                    {p.packSizes.map((size) => (
                      <span key={size} className="font-ibm-plex-mono text-[10px] text-[#444] bg-white border border-[#E0DED8] px-2.5 py-1">
                        {size}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[#E8E8E4] flex items-center justify-between">
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] block">Trade Price</span>
                      <span className="font-ibm-plex-mono text-2xl text-alkota-black font-light">From {p.fromPrice} <span className="text-[10px] text-[#777]">ex VAT</span></span>
                    </div>
                    <Link
                      href={`/chemicals/product/${p.slug}`}
                      className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 6 Cols Visual Staging */}
                <div className={`lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] bg-white border border-[#E8E8E4] p-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-x-12 bottom-6 h-12 bg-black/10 blur-xl rounded-full pointer-events-none" />
                  
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative z-10 max-h-[340px] w-auto object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 04: COMPLETE PRODUCT DIRECTORY (CLEAN UNBOXED GRID) ── */}
      <section id="catalogue" className="py-32 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                Complete Range
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
                All Formulations.
              </h2>
            </div>
            <div className="text-xs font-ibm-plex-mono text-[#777]">
              {filteredProducts.length} verified commercial chemical formulations
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((prod) => (
              <ChemicalCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
