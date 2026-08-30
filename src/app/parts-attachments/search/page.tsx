import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Search, Filter, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
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
    description: `Search results for "${q}" across 10,000+ genuine OEM pumps, heating coils, hoses, guns, and accessories.`,
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

  // Fetch available brands for filter sidebar
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

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* ── HEADER SEARCH STRIP ── */}
      <section className="bg-[#0A0A0A] text-white py-12 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-3">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">Global Search</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white mb-2">
                {query ? (
                  <>
                    Search Results for <span className="text-alkota-orange italic font-light">"{query}"</span>
                  </>
                ) : (
                  'All Catalogue Components'
                )}
              </h1>
              <p className="text-[#888] font-ibm-plex-mono text-xs uppercase tracking-wider">
                Found {searchResult.totalCount} matching engineering components
              </p>
            </div>

            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-white px-5 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333] shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              Parts Finder Wizard
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: SIDEBAR + RESULTS ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#E8E8E4] p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEB]">
                <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black font-medium flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-alkota-orange" />
                  Filters
                </span>
                {(brand || category || inStockOnly) && (
                  <Link
                    href={`/parts-attachments/search?q=${encodeURIComponent(query)}`}
                    className="text-[10px] font-ibm-plex-mono text-alkota-orange hover:underline uppercase tracking-wider"
                  >
                    Clear All
                  </Link>
                )}
              </div>

              {/* In Stock Toggle */}
              <div>
                <label className="flex items-center gap-2.5 text-xs text-alkota-black cursor-pointer font-light">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => {
                      const params = new URLSearchParams(window.location.search);
                      if (inStockOnly) params.delete('available');
                      else params.set('available', 'yes');
                      window.location.href = `/parts-attachments/search?${params.toString()}`;
                    }}
                    className="rounded border-[#CCC] text-alkota-orange focus:ring-0"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>

              {/* Brand Filter */}
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block mb-2">
                  Brand / Manufacturer
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-none text-xs">
                  <Link
                    href={`/parts-attachments/search?q=${encodeURIComponent(query)}${category ? `&cat=${category}` : ''}`}
                    className={`block py-1 px-2 rounded ${!brand ? 'bg-[#F0EFEB] font-normal text-alkota-black' : 'text-[#666] hover:text-black'}`}
                  >
                    All Brands
                  </Link>
                  {(dbBrands || []).map((b) => (
                    <Link
                      key={b.slug}
                      href={`/parts-attachments/search?q=${encodeURIComponent(query)}&brand=${b.slug}${category ? `&cat=${category}` : ''}`}
                      className={`block py-1 px-2 rounded ${brand === b.slug ? 'bg-alkota-orange text-white' : 'text-[#666] hover:text-black'}`}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block mb-2">
                  Component Category
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-none text-xs">
                  <Link
                    href={`/parts-attachments/search?q=${encodeURIComponent(query)}${brand ? `&brand=${brand}` : ''}`}
                    className={`block py-1 px-2 rounded ${!category ? 'bg-[#F0EFEB] font-normal text-alkota-black' : 'text-[#666] hover:text-black'}`}
                  >
                    All Categories
                  </Link>
                  {(dbCategories || []).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/parts-attachments/search?q=${encodeURIComponent(query)}&cat=${c.slug}${brand ? `&brand=${brand}` : ''}`}
                      className={`block py-1 px-2 rounded ${category === c.slug ? 'bg-alkota-orange text-white' : 'text-[#666] hover:text-black'}`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            {searchResult.parts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResult.parts.map((part) => (
                  <ProductCard key={part.id} part={part} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E8E8E4] p-12 text-center space-y-6">
                <AlertCircle className="w-12 h-12 text-alkota-orange mx-auto" />
                <div>
                  <h3 className="text-2xl font-light text-alkota-black mb-2">
                    No components found matching your search.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666] font-light max-w-md mx-auto leading-relaxed">
                    Try checking the part number spelling, broadening your brand filters, or request a manual parts search from our technical team.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/parts-attachments/finder"
                    className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Open Parts Finder Wizard
                  </Link>
                  <Link
                    href={`/parts-attachments/enquiry?notes=${encodeURIComponent(`Search query with 0 results: ${query}`)}`}
                    className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    Submit Parts Enquiry →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
