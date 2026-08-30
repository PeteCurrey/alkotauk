import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Search, Sparkles, Droplets, ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  getRetailProducts, 
  getChemicalApplications, 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Chemicals & Detergents Store | Alkota Parts & Attachments UK',
  description: 'Shop commercial vehicle traffic film removers (RoadForce), heavy degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and Schedule 80 coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
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

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">

      {/* ── 01: STORE HERO ── */}
      <section
        className="relative min-h-[75vh] w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
        aria-label="Alkota UK Retail Chemistry Store"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota commercial chemistry store"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.62) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
          <div className="max-w-2xl">
            {/* Provenance */}
            <div className="mb-5 inline-flex items-center gap-3 font-normal">
              <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
                Parts &amp; Attachments Store · Chemicals
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
            >
              Professional Chemistry.<br />
              <span className="text-alkota-orange">Engineered for the work.</span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
              Direct-to-trade commercial detergents, heavy traffic film removers, aluminium acid brighteners, and Schedule 80 coil scale descalers in 5L, 20L, 200L and 1000L IBC packs.
            </p>

            {/* Search Bridge Form */}
            <div className="max-w-lg bg-white/95 backdrop-blur-sm p-1.5 mb-8 shadow-xl">
              <form action="/parts-attachments/chemicals" method="GET" className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#888] ml-2.5 shrink-0" />
                <input
                  type="text"
                  name="q"
                  defaultValue={q || ''}
                  placeholder="Search RoadForce, TR-407, degreaser, acid brightener..."
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

            {/* Technical Hub Link Bridge */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#AAA]">
              <span>Need bulk tanker delivery or master specs?</span>
              <Link
                href="/chemicals"
                className="text-white hover:text-alkota-orange underline underline-offset-4 transition-colors"
              >
                View Alkota Technical Chemical Hub →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: APPLICATION FILTER STRIP ── */}
      <section className="bg-white border-b border-[#E0DEDC] sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Link
              href="/parts-attachments/chemicals"
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-none whitespace-nowrap transition-colors ${
                !app
                  ? 'bg-alkota-orange text-white font-medium'
                  : 'bg-[#F2EFEB] text-[#444] hover:bg-black hover:text-white'
              }`}
            >
              All Chemicals ({allProducts.length})
            </Link>

            {applications.map((application) => {
              const isActive = app === application.slug;
              return (
                <Link
                  key={application.slug}
                  href={`/parts-attachments/chemicals?app=${application.slug}`}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-none whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-alkota-orange text-white font-medium'
                      : 'bg-[#F2EFEB] text-[#444] hover:bg-black hover:text-white'
                  }`}
                >
                  {application.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 03: RETAIL PRODUCT GRID ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-alkota-orange block mb-1">
                // Live Chemical Inventory
              </span>
              <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
                {app 
                  ? applications.find(a => a.slug === app)?.name || 'Chemical Formulations'
                  : q 
                    ? `Search Results for "${q}"`
                    : 'All Retail Chemical Formulations'
                }
              </h2>
            </div>
            <span className="font-mono text-xs text-[#888]">
              Showing {filteredProducts.length} formulations
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E0DEDC] space-y-4">
              <Droplets className="h-10 w-10 text-[#BBB] mx-auto" />
              <h3 className="text-lg font-normal text-alkota-black">No chemical products match your filter.</h3>
              <p className="text-xs text-[#777]">Try clearing your search or view all products across our catalogue.</p>
              <Link
                href="/parts-attachments/chemicals"
                className="inline-block bg-alkota-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Clear Filters
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

      {/* ── 04: TECHNICAL COMPLIANCE & SDS BRIDGE ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#141412] text-white border-t border-[#222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
              Technical Safety &amp; COSHH
            </span>
            <h3 className="text-2xl font-extralight text-white mb-2">
              Need technical documentation or SDS data?
            </h3>
            <p className="text-xs text-[#AAA] leading-relaxed font-normal">
              All Alkota chemistry is fully compliant with UK GB-CLP and REACH regulations. Access our technical document library to download full 16-point Safety Data Sheets (SDS) and application guides.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal">
            <Link
              href="/chemicals/safety-data"
              className="inline-flex items-center justify-center gap-2 bg-white text-alkota-black hover:bg-alkota-orange hover:text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>SDS Download Portal</span>
            </Link>
            <Link
              href="/chemicals"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:border-white hover:bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              <span>Alkota Chemical Overview</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
