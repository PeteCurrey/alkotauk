import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Search, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import { searchParts } from '@/lib/parts/search-engine';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    brand?: string;
    available?: string;
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q || 'Parts';
  return {
    title: `Search: "${q}" | Alkota UK Parts & Attachments`,
    description: `Search results for "${q}" across genuine OEM pumps, heating coils, hoses, guns, and accessories.`,
    robots: { index: false, follow: true }, // Search result pages should generally be noindex to prevent crawl bloat
  };
}

export default async function SearchResultsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const query = sp.q || '';
  const category = sp.cat;
  const brand = sp.brand;
  const inStockOnly = sp.available === 'yes';
  const sort = (sp.sort as any) || 'relevance';
  const page = Math.max(1, parseInt(sp.page || '1', 10));
  const limit = 24;

  const searchResult = await searchParts({
    query,
    category,
    brand,
    inStockOnly,
    sortBy: sort,
    page,
    limit,
    logAnalytics: true,
  });

  const [{ data: dbBrands }, { data: dbCategories }] = await Promise.all([
    supabaseAdmin.from('brand_partners').select('slug, name').eq('active', true).order('sort_order'),
    supabaseAdmin.from('part_categories').select('slug, name').eq('active', true).order('sort_order'),
  ]);

  const brands = dbBrands || [];
  const categories = dbCategories || [];
  const hasFilters = Boolean(brand || category || inStockOnly);
  const total = searchResult.totalCount;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const buildSearchUrl = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    if (query) p.set('q', query);
    if (category) p.set('cat', category);
    if (brand) p.set('brand', brand);
    if (inStockOnly) p.set('available', 'yes');
    if (sort !== 'relevance') p.set('sort', sort);

    for (const [k, v] of Object.entries(overrides)) {
      if (!v || v === 'all') p.delete(k);
      else p.set(k, v);
    }
    if (!('page' in overrides)) p.delete('page');

    const qs = p.toString();
    return `/parts-attachments/search${qs ? `?${qs}` : ''}`;
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1917] pb-24 font-sans selection:bg-[#FF6900] selection:text-white">
      
      {/* ── 01: SEARCH HEADER ── */}
      <section className="bg-[#0F172A] text-white pt-32 pb-12 px-6 sm:px-12 lg:px-24 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-4">
            <Link href="/parts-attachments" className="hover:text-[#FF6900] transition-colors">
              Parts Store
            </Link>
            <span>/</span>
            <span className="text-[#FF6900]">Search</span>
          </div>

          {/* Search Form */}
          <form action="/parts-attachments/search" method="GET" className="max-w-3xl mb-6">
            <div className="flex items-stretch bg-white rounded-[5px] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-[#334155] focus-within:border-[#FF6900] transition-colors">
              <div className="flex items-center flex-1 px-3 gap-3">
                <Search className="w-5 h-5 text-[#64748B] shrink-0" />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search by part number, description, or SKU..."
                  className="w-full bg-transparent text-[#0F172A] text-sm py-2.5 focus:outline-none placeholder-[#94A3B8]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6900] hover:bg-[#E55D00] text-white font-ibm-plex-mono text-xs uppercase tracking-wider font-bold rounded-[4px] transition-all cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {query ? (
                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  Search Results for <span className="text-[#FF6900] font-normal">"{query}"</span>
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  All Catalogue Components
                </h1>
              )}
              <p className="font-ibm-plex-mono text-xs text-[#94A3B8] mt-1">
                {total.toLocaleString()} {total === 1 ? 'part' : 'parts'} found in catalogue
              </p>
            </div>

            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white px-4 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-wider rounded-[4px] transition-all border border-[#334155] self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6900]" />
              <span>Machine Fitment Finder</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02: FILTER BAR ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8">
        <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-wrap items-center gap-3 mb-8">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
            Filter Results:
          </span>

          {/* In Stock Toggle */}
          <Link
            href={buildSearchUrl({ available: inStockOnly ? undefined : 'yes' })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium border transition-colors ${
              inStockOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-[#475569] border-[#CBD5E1] hover:border-[#94A3B8]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${inStockOnly ? 'bg-emerald-600' : 'bg-[#94A3B8]'}`} />
            <span>In Stock Only</span>
          </Link>

          {/* Brand Filter */}
          <div className="relative">
            <select
              value={brand || 'all'}
              onChange={e => {
                window.location.href = buildSearchUrl({ brand: e.target.value === 'all' ? undefined : e.target.value });
              }}
              className="bg-white border border-[#CBD5E1] rounded-[4px] pl-3 pr-8 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={category || 'all'}
              onChange={e => {
                window.location.href = buildSearchUrl({ cat: e.target.value === 'all' ? undefined : e.target.value });
              }}
              className="bg-white border border-[#CBD5E1] rounded-[4px] pl-3 pr-8 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <Link
              href={buildSearchUrl({ brand: undefined, cat: undefined, available: undefined })}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF0E6] text-[#FF6900] hover:bg-[#FFE0CC] text-xs font-semibold rounded-[4px] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </Link>
          )}

          {/* Sort Select */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-ibm-plex-mono text-[#64748B] uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={sort}
              onChange={e => {
                window.location.href = buildSearchUrl({ sort: e.target.value === 'relevance' ? undefined : e.target.value });
              }}
              className="bg-white border border-[#CBD5E1] rounded-[4px] pl-3 pr-8 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
            >
              <option value="relevance">Best Match</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>

        {/* ── 03: PRODUCT GRID / NO RESULTS EXPERIENCE ── */}
        {searchResult.parts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResult.parts.map(part => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        ) : (
          /* Useful No-Results Experience with Enquiry Action */
          <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-12 sm:p-16 text-center space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="w-16 h-16 rounded-full bg-[#FFF0E6] text-[#FF6900] flex items-center justify-center mx-auto">
              <Search className="w-7 h-7 stroke-[1.5]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-light text-[#0F172A] tracking-tight">
                Can't find the part you're looking for?
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] font-light leading-relaxed">
                No components matched <strong className="text-[#0F172A]">"{query}"</strong> with your current filters. If you have an Alkota machine model or a stamped part number from your pump or burner, our workshop team can source and dispatch it.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href={`/parts-attachments/enquiry?part=${encodeURIComponent(query)}&notes=${encodeURIComponent(`Search query with no result: "${query}"`)}`}
                className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E55D00] text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-wider font-bold rounded-[4px] transition-colors shadow-sm"
              >
                <span>Request This Part from Sourcing Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/parts-attachments"
                className="inline-flex items-center gap-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-wider font-semibold rounded-[4px] transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* ── 04: PAGINATION ── */}
        {total > limit && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8E6DF]">
            <span className="text-xs text-[#64748B] font-ibm-plex-mono">
              Showing <span className="font-bold text-[#0F172A]">{((page - 1) * limit + 1).toLocaleString()}–{Math.min(page * limit, total).toLocaleString()}</span> of{' '}
              <span className="font-bold text-[#0F172A]">{total.toLocaleString()}</span> parts
            </span>

            <div className="flex items-center gap-1.5">
              {page > 1 ? (
                <Link
                  href={buildSearchUrl({ page: String(page - 1) })}
                  className="flex items-center gap-1 px-3 py-2 bg-white border border-[#CBD5E1] rounded-[4px] text-xs font-semibold text-[#334155] hover:bg-[#F1F5F9] transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#94A3B8] cursor-not-allowed">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </span>
              )}

              <span className="px-3 py-2 font-ibm-plex-mono text-xs text-[#0F172A] font-bold">
                {page} / {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  href={buildSearchUrl({ page: String(page + 1) })}
                  className="flex items-center gap-1 px-3 py-2 bg-white border border-[#CBD5E1] rounded-[4px] text-xs font-semibold text-[#334155] hover:bg-[#F1F5F9] transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#94A3B8] cursor-not-allowed">
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
