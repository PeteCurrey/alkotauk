import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Search, Sparkles, ArrowRight, FlaskConical, ShieldCheck } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { searchChemicals, getChemicalApplications } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q || 'Chemicals';
  return {
    title: `Search: "${q}" | Alkota UK Chemicals`,
    description: `Search results for chemical formulations, master codes, and pressure washing detergents matching "${q}".`,
  };
}

export default async function ChemicalSearchResultsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const query = sp.q || '';
  const result = await searchChemicals(query);
  const applications = await getChemicalApplications();

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans pb-28">
      {/* ── SEARCH HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-12 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/chemicals" className="hover:text-alkota-orange transition-colors">
              Chemicals
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">Search</span>
          </div>

          {/* Large Search Bar */}
          <form action="/chemicals/search" method="GET" className="flex items-stretch gap-0 mb-8 max-w-3xl">
            <div className="flex items-center flex-1 bg-white px-4 gap-3">
              <Search className="w-4 h-4 text-[#999] shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search master code (TR-407), formulation (Power Blast), or retail name (RoadForce)..."
                className="w-full bg-transparent text-alkota-black text-sm py-4 focus:outline-none font-normal"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="flex items-center justify-between gap-4">
            <div>
              {query ? (
                <h1 className="text-2xl sm:text-3xl font-extralight text-white">
                  Results for <span className="text-alkota-orange italic font-light">"{query}"</span>
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-extralight text-white">
                  All Chemical Formulations
                </h1>
              )}
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] mt-1">
                {result.totalCount} {result.totalCount === 1 ? 'formulation' : 'formulations'} found
              </p>
            </div>
            <Link
              href="/chemicals/finder"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-white px-5 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333] shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              Chemical Match Wizard
            </Link>
          </div>
        </div>
      </section>

      {/* ── MASTER CODE MATCH NOTICES (IF USER SEARCHED A CODE DIRECTLY) ── */}
      {result.matchedMasterCodes.length > 0 && (
        <section className="bg-orange-50/70 border-b border-orange-200 px-6 sm:px-12 lg:px-24 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-xs uppercase bg-[#FF6900] text-white px-2.5 py-0.5 rounded">
                Master Code Matched
              </span>
              <span className="text-xs text-alkota-black font-medium">
                {result.matchedMasterCodes.map(m => `${m.master_code} (${m.original_name})`).join(', ')}
              </span>
            </div>
            <span className="text-[11px] font-ibm-plex-mono text-[#666]">
              Showing all retail identities derived from this formulation
            </span>
          </div>
        </section>
      )}

      {/* ── RESULTS GRID ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 space-y-12">
        {result.retailProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E0DEDC]">
            {result.retailProducts.map((prod) => (
              <div key={prod.id} className="bg-[#FAF9F5]">
                <ChemicalCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center space-y-8">
            <div className="space-y-3">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA]">
                // No Formulations Matched
              </p>
              <h2 className="text-3xl font-extralight text-alkota-black">
                Nothing matched <span className="text-alkota-orange">"{query}"</span>
              </h2>
              <p className="text-sm font-light text-[#666] max-w-md leading-relaxed">
                Try searching an Alkota master code (e.g. TR-407, TS-602, DE-703) or broad application like "truck wash", "degreaser", or "aluminium".
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/chemicals/finder"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Launch Chemical Matcher
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
