import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  ChevronRight, 
  Search, 
  Wrench, 
  Check, 
  Filter, 
  X, 
  ChevronLeft, 
  Layers,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    brand?: string;
    available?: string;
    price_type?: string;
    sort?: string;
    page?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;

  if (categorySlug === 'all') {
    return {
      title: 'All Parts, Spares & Tooling Attachments | Alkota UK',
      description: 'Explore the complete Alkota UK catalogue of pressure washing spares, pumps, hoses, nozzles, burner heads, and rotary surface cleaners.',
      alternates: {
        canonical: 'https://alkota.co.uk/parts-attachments/all',
      },
    };
  }

  const { data: catInfo } = await supabaseAdmin
    .from('part_categories')
    .select('name, short_desc')
    .eq('slug', categorySlug)
    .single();

  const name = catInfo?.name || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const desc = catInfo?.short_desc || `Genuine OEM ${name} components, spares, and attachments for industrial pressure washers. Next-day UK despatch.`;

  return {
    title: `${name} | Alkota UK Parts & Equipment`,
    description: desc,
    alternates: {
      canonical: `https://alkota.co.uk/parts-attachments/${categorySlug}`,
    },
    openGraph: {
      title: `${name} — Genuine Spares & Attachments | Alkota UK`,
      description: desc,
      url: `https://alkota.co.uk/parts-attachments/${categorySlug}`,
    },
  };
}

export default async function CategoryBrowsePage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const sp = await searchParams;

  const selectedBrand    = sp.brand;
  const isAvailableOnly  = sp.available === 'yes';
  const priceType        = sp.price_type || 'all';
  const sortOption       = sp.sort || 'default';
  const searchQuery      = sp.q || '';
  const currentPage      = Math.max(1, parseInt(sp.page || '1', 10));
  const pageSize         = 24;
  const from             = (currentPage - 1) * pageSize;
  const to               = from + pageSize - 1;

  // 1. Fetch category metadata
  let catName = 'All Parts & Equipment';
  let catDesc = 'Browse the complete Alkota UK parts and tooling inventory.';
  let subcategories: { slug: string; name: string }[] = [];

  if (categorySlug !== 'all') {
    const { data: catInfo } = await supabaseAdmin
      .from('part_categories')
      .select('name, short_desc, subcategories')
      .eq('slug', categorySlug)
      .single();

    if (catInfo) {
      catName = catInfo.name;
      catDesc = catInfo.short_desc || catDesc;
      if (Array.isArray(catInfo.subcategories)) {
        subcategories = catInfo.subcategories;
      }
    } else {
      catName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  // 2. Fetch brands for filter list
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug, name')
    .eq('active', true)
    .order('sort_order');

  const brands = dbBrands || [];

  // 3. Build database query with exact count
  const PUBLIC_PROJECTION = `
    id, part_number, sku, mpn, name, slug, description, category, subcategory,
    manufacturer, brand, price, vat_rate, in_stock, availability_status,
    superseded_by, weight_kg, image_url, oem_genuine, featured, is_attachment
  `;

  let query = supabaseAdmin
    .from('parts')
    .select(PUBLIC_PROJECTION, { count: 'exact' })
    .eq('active', true);

  if (categorySlug !== 'all') {
    query = query.eq('category', categorySlug);
  }
  if (selectedBrand && selectedBrand !== 'all') {
    query = query.eq('brand', selectedBrand);
  }
  if (isAvailableOnly) {
    query = query.eq('in_stock', true);
  }
  if (priceType === 'priced') {
    query = query.not('price', 'is', null).gt('price', 0);
  } else if (priceType === 'poa') {
    query = query.or('price.is.null,price.lte.0');
  }
  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,part_number.ilike.%${searchQuery}%,mpn.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%,manufacturer.ilike.%${searchQuery}%`
    );
  }

  // Sorting
  switch (sortOption) {
    case 'price_asc':
      query = query.order('price', { ascending: true, nullsFirst: false });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false, nullsFirst: false });
      break;
    case 'name_asc':
      query = query.order('name', { ascending: true });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'default':
    default:
      query = query
        .order('featured', { ascending: false })
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });
      break;
  }

  // Pagination
  query = query.range(from, to);

  const { data: parts, count: totalCount } = await query;
  const partList = parts || [];
  const total = totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // URL builder helper preserving other filters
  const buildFilterUrl = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    if (selectedBrand) p.set('brand', selectedBrand);
    if (isAvailableOnly) p.set('available', 'yes');
    if (priceType !== 'all') p.set('price_type', priceType);
    if (sortOption !== 'default') p.set('sort', sortOption);
    if (searchQuery) p.set('q', searchQuery);

    for (const [k, v] of Object.entries(overrides)) {
      if (!v || v === 'all') p.delete(k);
      else p.set(k, v);
    }
    // Reset to page 1 if not setting page explicitly
    if (!('page' in overrides)) p.delete('page');

    const qs = p.toString();
    return `/parts-attachments/${categorySlug}${qs ? `?${qs}` : ''}`;
  };

  const hasActiveFilters = Boolean(selectedBrand || isAvailableOnly || priceType !== 'all' || searchQuery);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1917] pb-24 font-sans selection:bg-[#FF6900] selection:text-white">
      
      {/* ── 01: BREADCRUMBS & CATEGORY HEADER ── */}
      <section className="bg-white border-b border-[#E8E6DF] pt-32 pb-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/parts-attachments" className="hover:text-[#FF6900] transition-colors">
              Parts Store
            </Link>
            <ChevronRight className="h-3 w-3 text-[#BBB] shrink-0" />
            <span className="text-[#0F172A] font-semibold">{catName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900]" />
                <span>OEM Verified Range · UK Mainland Despatch</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0F172A]">
                {catName}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-light leading-relaxed">
                {catDesc}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-ibm-plex-mono text-xl font-bold text-[#0F172A] block">
                {total.toLocaleString()}
              </span>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                Parts Listed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: FILTER SUITE & CONTROLS STRIP ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-8 pb-4">
        <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
          
          {/* Filter Bar Row */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Inline search within category */}
            <form action={`/parts-attachments/${categorySlug}`} method="GET" className="relative flex-1 min-w-[200px] max-w-sm">
              {selectedBrand && <input type="hidden" name="brand" value={selectedBrand} />}
              {isAvailableOnly && <input type="hidden" name="available" value="yes" />}
              {priceType !== 'all' && <input type="hidden" name="price_type" value={priceType} />}
              {sortOption !== 'default' && <input type="hidden" name="sort" value={sortOption} />}
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search within this category..."
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-[5px] pl-9 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] transition-colors"
              />
            </form>

            {/* Brand Filter */}
            <div className="relative">
              <select
                value={selectedBrand || 'all'}
                onChange={e => {
                  window.location.href = buildFilterUrl({ brand: e.target.value === 'all' ? undefined : e.target.value });
                }}
                className="bg-white border border-[#CBD5E1] rounded-[5px] pl-3 pr-8 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
              >
                <option value="all">All Brands</option>
                {brands.map(b => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Pricing Status */}
            <div className="relative">
              <select
                value={priceType}
                onChange={e => {
                  window.location.href = buildFilterUrl({ price_type: e.target.value === 'all' ? undefined : e.target.value });
                }}
                className="bg-white border border-[#CBD5E1] rounded-[5px] pl-3 pr-8 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
              >
                <option value="all">All Products</option>
                <option value="priced">Priced (Immediate Basket)</option>
                <option value="poa">Price on Application (POA)</option>
              </select>
            </div>

            {/* In Stock Toggle */}
            <Link
              href={buildFilterUrl({ available: isAvailableOnly ? undefined : 'yes' })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-[5px] text-xs font-medium border transition-colors ${
                isAvailableOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-[#475569] border-[#CBD5E1] hover:border-[#94A3B8]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailableOnly ? 'bg-emerald-600' : 'bg-[#94A3B8]'}`} />
              <span>In Stock Only</span>
            </Link>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Link
                href={`/parts-attachments/${categorySlug}`}
                className="flex items-center gap-1 px-3 py-2 bg-[#FFF0E6] text-[#FF6900] hover:bg-[#FFE0CC] text-xs font-semibold rounded-[4px] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </Link>
            )}

            {/* Sort Select on right */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[11px] font-ibm-plex-mono text-[#64748B] uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={e => {
                  window.location.href = buildFilterUrl({ sort: e.target.value === 'default' ? undefined : e.target.value });
                }}
                className="bg-white border border-[#CBD5E1] rounded-[5px] pl-3 pr-8 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── 03: PRODUCT GRID ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-6">
        {partList.length === 0 ? (
          <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-12 sm:p-16 text-center space-y-4">
            <Wrench className="w-12 h-12 text-[#CBD5E1] mx-auto stroke-[1.5]" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[#0F172A]">No parts matched your filters</h2>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed font-light">
                Try resetting your filters or search query. Our engineering team can also source unlisted parts directly from the manufacturer.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {hasActiveFilters && (
                <Link
                  href={`/parts-attachments/${categorySlug}`}
                  className="px-5 py-2.5 bg-[#0F172A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#FF6900] transition-colors"
                >
                  Reset Category Filters
                </Link>
              )}
              <Link
                href={`/parts-attachments/enquiry?notes=${encodeURIComponent(`Category query: ${categorySlug}, search: ${searchQuery}`)}`}
                className="px-5 py-2.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] hover:bg-[#E55D00] transition-colors"
              >
                Request Part Sourcing
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partList.map(part => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        )}

        {/* ── 04: PAGINATION CONTROLS ── */}
        {total > pageSize && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8E6DF]">
            <span className="text-xs text-[#64748B] font-ibm-plex-mono">
              Showing <span className="font-bold text-[#0F172A]">{(from + 1).toLocaleString()}–{Math.min(to + 1, total).toLocaleString()}</span> of{' '}
              <span className="font-bold text-[#0F172A]">{total.toLocaleString()}</span> items
            </span>

            <div className="flex items-center gap-1.5">
              {currentPage > 1 ? (
                <Link
                  href={buildFilterUrl({ page: String(currentPage - 1) })}
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
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={buildFilterUrl({ page: String(currentPage + 1) })}
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
