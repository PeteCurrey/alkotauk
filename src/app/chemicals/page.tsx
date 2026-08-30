import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Search, Sparkles, ShieldCheck, Droplets, FlaskConical } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  getRetailProducts, 
  getChemicalApplications, 
  getMasterFormulations 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Pressure Washer Chemicals & Detergents | Alkota UK',
  description: 'Engineered commercial vehicle traffic film removers, aluminium acid brighteners, agricultural degreasers, and Schedule 80 coil descalers.',
};

export default async function ChemicalsStoreHomePage() {
  const featuredProducts = await getRetailProducts({ featuredOnly: true, limit: 6 });
  const applications = await getChemicalApplications();
  const formulations = await getMasterFormulations();

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white"
        aria-label="Alkota UK Professional Chemistry"
      >
        {/* Full-bleed industrial wash bay photography */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota industrial chemical wash bay"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.55) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 my-auto py-28 sm:py-36">
          <div className="max-w-2xl">
            {/* Provenance */}
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
              <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-white/80 font-normal">
                Alkota UK · Industrial Chemical Commerce
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.93] mb-7"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.2rem)' }}
            >
              Professional Chemistry.<br />
              <span className="text-alkota-orange">Engineered to clean.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-[#DDDBD6] text-base sm:text-lg leading-relaxed mb-9 max-w-xl font-normal">
              High-potency commercial vehicle detergents, agricultural muck strippers, acid aluminium brighteners, and Schedule 80 coil protectors. Formulated for maximum impingement with hot water pressure washers.
            </p>

            {/* Comprehensive Chemical Search */}
            <div className="max-w-xl bg-white/95 backdrop-blur-sm p-1.5 mb-9 shadow-2xl">
              <form action="/chemicals/search" method="GET" className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#888] ml-2.5 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search by code (TR-407), formulation, or application..."
                  className="w-full bg-transparent text-alkota-black text-sm px-2 py-2.5 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  className="bg-alkota-orange hover:bg-black text-white px-5 py-2.5 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/chemicals/applications"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group"
              >
                <span>Find Your Application</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/chemicals/finder"
                className="inline-flex items-center justify-center gap-3 border border-white/35 bg-black/35 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Chemical Match Wizard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: WHAT ARE YOU CLEANING? (Editorial Application Discovery) ─────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // Application-Led Commerce
              </span>
              <h2 className="font-extralight text-alkota-black tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                What are you cleaning?
              </h2>
            </div>
            <Link
              href="/chemicals/applications"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors flex items-center gap-1.5"
            >
              <span>Explore All {applications.length} Applications</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Large Editorial Bands (No 20-box grid) */}
          <div className="divide-y divide-[#E0DEDC]">
            {applications.slice(0, 6).map((app, idx) => (
              <Link
                key={app.slug}
                href={`/chemicals/applications/${app.slug}`}
                className="group py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:pl-2 transition-all no-underline"
              >
                <div className="flex items-baseline gap-6 lg:w-5/12 min-w-0">
                  <span className="font-ibm-plex-mono text-[10px] text-[#BBB] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666] font-normal mt-1 leading-relaxed">
                      {app.tagline}
                    </p>
                  </div>
                </div>

                <div className="lg:w-6/12 flex items-center justify-between gap-4 lg:pl-8">
                  <p className="hidden sm:block text-xs font-light text-[#888] line-clamp-1 max-w-md">
                    {app.description}
                  </p>
                  <div className="flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange group-hover:translate-x-1 transition-transform shrink-0">
                    <span>View Chemistry</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03: FEATURED CHEMICAL RAIL (Live Products Only) ───────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // Chemical Formulations in Stock
              </span>
              <h2 className="font-extralight text-alkota-black tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Featured Formulations.
              </h2>
            </div>
            <Link
              href="/chemicals/search"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors flex items-center gap-1.5"
            >
              <span>Full Chemical Catalogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#E8E6E2]">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="bg-white">
                <ChemicalCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04: MASTER FORMULATION INTEGRITY & TRACEABILITY ───────────────────── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6 space-y-7">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.22em] text-[#555]">
                  Alkota Formulation Standards
                </span>
              </div>
              <h2 className="font-extralight text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                100% Traceable<br />
                <span className="text-alkota-orange">Master Formulations.</span>
              </h2>
              <p className="text-[#AAA] text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                Every bottle, drum, and IBC we deliver links back to an authoritative Alkota master chemical formulation code (TR-407, TS-602, DE-703, SD-927). Verified for UK GB-CLP, COSHH safety compliance, and maximum coil compatibility.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/chemicals/finder"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-7 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Chemical Finder</span>
                </Link>
              </div>
            </div>

            {/* Master Formulation Ledger Snapshot */}
            <div className="lg:col-span-6 space-y-3">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#555] block mb-4">
                // Selected Master Chemical Codes
              </span>
              <div className="divide-y divide-[#1C1C1C] border border-[#1C1C1C] bg-[#111]">
                {formulations.slice(0, 6).map((f) => (
                  <div key={f.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sm text-[#FF6900]">{f.master_code}</span>
                        <span className="text-white font-light text-sm">{f.original_name}</span>
                      </div>
                      <span className="font-ibm-plex-mono text-[10px] text-[#666] block mt-0.5">
                        Family: {f.formulation_family} · pH {f.ph_level?.split(' ')[0] || '—'}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                      CLP Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: ENQUIRY & TECHNICAL SOURCING CTA ──────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-alkota-orange text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-white/70 block mb-4">
              // Chemical Advisory Desk
            </span>
            <h2 className="font-extralight text-white leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Need custom dilution advice or IBC volume pricing?
            </h2>
            <p className="text-white/85 text-sm leading-relaxed font-normal max-w-xl">
              Our chemical application engineers can formulate tailored wash bay dosing setups, test water hardness, and arrange 200L barrel and 1000L IBC multi-site contract delivery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="text-center bg-white text-alkota-black hover:bg-black hover:text-white px-10 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shadow-lg"
            >
              Contact Chemical Desk
            </Link>
            <Link
              href="/chemicals/finder"
              className="text-center border border-white/50 text-white hover:bg-white hover:text-alkota-orange px-10 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors"
            >
              Guided Chemical Finder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
