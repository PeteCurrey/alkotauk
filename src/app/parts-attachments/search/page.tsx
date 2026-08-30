import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { searchParts } from '@/lib/parts/search-engine';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q || 'Parts';
  return {
    title: `Search: "${q}" | Alkota UK Parts & Attachments`,
    description: `Search results for "${q}" across genuine OEM pumps, heating coils, hoses, guns, and accessories.`,
  };
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    brand?: string;
    available?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;
  const query = sp.q || '';
  const category = sp.cat;
  const brand = sp.brand;
  const inStockOnly = sp.available === 'yes';
  const sort = (sp.sort as any) || 'relevance';
  const page = parseInt(sp.page || '1', 10);

  const searchResult = await searchParts({
    query,
    category,
    brand,
    inStockOnly,
    sortBy: sort,
    page,
    limit: 24,
    logAnalytics: true,
  });

  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug, name')
    .eq('active', true)
    .order('sort_order');

  const { data: dbCategories } = await supabaseAdmin
    .from('part_categories')
    .select('slug, name')
    .eq('active', true)
    .order('sort_order');

  const hasFilters = !!(brand || category || inStockOnly);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* ── SEARCH HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-12 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">Search</span>
          </div>

          {/* Search Form — Large & Prominent */}
          <form action="/parts-attachments/search" method="GET" className="flex items-stretch gap-0 mb-8 max-w-3xl">
            <div className="flex items-center flex-1 bg-white px-4 gap-3">
              <Search className="w-4 h-4 text-[#999] shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by part number, brand, machine model or component type"
                className="w-full bg-transparent text-alkota-black text-sm py-4 focus:outline-none font-normal"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shrink-0"
            >
              Search
            </button>
          </form>

          {/* Results Summary — DB driven count only */}
          <div className="flex items-center justify-between gap-4">
            <div>
              {query ? (
                <h1 className="text-2xl sm:text-3xl font-extralight text-white">
                  Results for <span className="text-alkota-orange italic font-light">"{query}"</span>
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-extralight text-white">All Catalogue Components</h1>
              )}
              {searchResult.totalCount > 0 && (
                <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] mt-1">
                  {searchResult.totalCount} {searchResult.totalCount === 1 ? 'component' : 'components'} found
                </p>
              )}
            </div>
            <Link
              href="/parts-attachments/finder"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-white px-5 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333] shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              Parts Finder Wizard
            </Link>
          </div>
        </div>
      </section>

      {/* ── FILTER ROW + RESULTS ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8">

        {/* ── Filter Bar — horizontal, restrained ── */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#E0DEDC] mb-8">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
            Filter:
          </span>

          {/* In Stock Toggle */}
          <Link
            href={`/parts-attachments/search?q=${encodeURIComponent(query)}${category ? `&cat=${category}` : ''}${brand ? `&brand=${brand}` : ''}${!inStockOnly ? '&available=yes' : ''}`}
            className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-4 py-1.5 border transition-colors ${
              inStockOnly
                ? 'bg-alkota-orange border-alkota-orange text-white'
                : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
            }`}
          >
            In Stock
          </Link>

          {/* Brand Filter Pills — DB only */}
          {(dbBrands || []).slice(0, 8).map((b) => (
            <Link
              key={b.slug}
              href={`/parts-attachments/search?q=${encodeURIComponent(query)}${brand === b.slug ? '' : `&brand=${b.slug}`}${category ? `&cat=${category}` : ''}${inStockOnly ? '&available=yes' : ''}`}
              className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-4 py-1.5 border transition-colors ${
                brand === b.slug
                  ? 'bg-alkota-orange border-alkota-orange text-white'
                  : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
              }`}
            >
              {b.name}
            </Link>
          ))}

          {/* Category Filter — DB only */}
          {(dbCategories || []).slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/parts-attachments/search?q=${encodeURIComponent(query)}${brand ? `&brand=${brand}` : ''}${category === c.slug ? '' : `&cat=${c.slug}`}${inStockOnly ? '&available=yes' : ''}`}
              className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-4 py-1.5 border transition-colors hidden lg:inline-flex ${
                category === c.slug
                  ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white'
                  : 'border-[#D0CEC9] text-[#666] hover:border-[#0A0A0A] hover:text-alkota-black'
              }`}
            >
              {c.name}
            </Link>
          ))}

          {/* Clear Filters */}
          {hasFilters && (
            <Link
              href={`/parts-attachments/search?q=${encodeURIComponent(query)}`}
              className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors ml-auto"
            >
              Clear Filters ×
            </Link>
          )}
        </div>

        {/* ── Product Grid / Empty State ── */}
        {searchResult.parts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E0DEDC]">
            {searchResult.parts.map((part) => (
              <div key={part.id} className="bg-[#FAF9F5]">
                <ProductCard part={part} />
              </div>
            ))}
          </div>
        ) : (
          /* Premium empty state — no icon-in-a-box */
          <div className="py-24 flex flex-col items-center text-center space-y-8">
            <div className="space-y-3">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA]">
                // No Components Found
              </p>
              {query ? (
                <>
                  <h2 className="text-3xl font-extralight text-alkota-black">
                    Nothing matched <span className="text-alkota-orange">"{query}"</span>
                  </h2>
                  <p className="text-sm font-light text-[#666] max-w-md leading-relaxed">
                    Try checking the part number spelling, broadening your brand filters, or use the Parts Finder to identify the correct component.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-extralight text-alkota-black">Nothing to show yet.</h2>
                  <p className="text-sm font-light text-[#666] max-w-md">Try searching or browsing categories.</p>
                </>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/parts-attachments/finder"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Open Parts Finder
              </Link>
              <Link
                href={`/parts-attachments/enquiry?notes=${encodeURIComponent(`Search query with no results: ${query}`)}`}
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                Submit Parts Enquiry
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Pagination — only show if DB has more pages */}
        {searchResult.totalCount > 24 && (
          <div className="flex items-center justify-center gap-4 pt-12">
            {page > 1 && (
              <Link
                href={`/parts-attachments/search?q=${encodeURIComponent(query)}&page=${page - 1}${brand ? `&brand=${brand}` : ''}${category ? `&cat=${category}` : ''}${inStockOnly ? '&available=yes' : ''}`}
                className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#666] hover:text-alkota-orange transition-colors"
              >
                ← Previous
              </Link>
            )}
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA]">
              Page {page} of {Math.ceil(searchResult.totalCount / 24)}
            </span>
            {page < Math.ceil(searchResult.totalCount / 24) && (
              <Link
                href={`/parts-attachments/search?q=${encodeURIComponent(query)}&page=${page + 1}${brand ? `&brand=${brand}` : ''}${category ? `&cat=${category}` : ''}${inStockOnly ? '&available=yes' : ''}`}
                className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#666] hover:text-alkota-orange transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
