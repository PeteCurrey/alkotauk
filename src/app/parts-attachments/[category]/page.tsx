import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Wrench, 
  ArrowRight, 
  Filter, 
  Check, 
  ChevronRight, 
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ 
    brand?: string; 
    available?: string; 
    sort?: string; 
    q?: string;
    attachment?: string;
  }>;
}

export default async function CategoryBrowsePage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const sp = await searchParams;
  const selectedBrand = sp.brand;
  const isAvailableOnly = sp.available === 'yes';
  const sortOption = sp.sort || 'default';
  const searchQuery = sp.q;
  const isAttachmentOnly = sp.attachment === 'yes';

  // Fetch category info
  let catName = 'All Parts & Attachments';
  let catDesc = 'Browse the complete Alkota UK parts and tooling catalogue.';
  
  if (categorySlug !== 'all') {
    const { data: catInfo } = await supabaseAdmin
      .from('part_categories')
      .select('*')
      .eq('slug', categorySlug)
      .single();

    if (catInfo) {
      catName = catInfo.name;
      catDesc = catInfo.short_desc || '';
    } else {
      catName = categorySlug.replace(/-/g, ' ').toUpperCase();
    }
  }

  // Fetch all brands for filter sidebar
  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug,name')
    .eq('active', true)
    .order('sort_order');

  // Fetch all categories for navigation
  const { data: allCategories } = await supabaseAdmin
    .from('part_categories')
    .select('slug,name')
    .eq('active', true)
    .order('sort_order');

  // Build query for parts
  let query = supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment,weight_kg')
    .eq('active', true);

  if (categorySlug !== 'all') {
    query = query.eq('category', categorySlug);
  }

  if (selectedBrand) {
    query = query.eq('brand', selectedBrand);
  }

  if (isAvailableOnly) {
    query = query.eq('in_stock', true);
  }

  if (isAttachmentOnly) {
    query = query.eq('is_attachment', true);
  }

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,part_number.ilike.%${searchQuery}%,manufacturer.ilike.%${searchQuery}%`);
  }

  // Sorting
  if (sortOption === 'price_asc') {
    query = query.order('price', { ascending: true, nullsFirst: false });
  } else if (sortOption === 'price_desc') {
    query = query.order('price', { ascending: false, nullsFirst: false });
  } else if (sortOption === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else {
    query = query.order('sort_order').order('name');
  }

  const { data: parts } = await query.limit(60);
  const partList = parts || [];

  // Helper function to build URL queries
  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    if (selectedBrand) p.set('brand', selectedBrand);
    if (isAvailableOnly) p.set('available', 'yes');
    if (sortOption && sortOption !== 'default') p.set('sort', sortOption);
    if (searchQuery) p.set('q', searchQuery);
    if (isAttachmentOnly) p.set('attachment', 'yes');

    for (const [k, v] of Object.entries(newParams)) {
      if (v === undefined || v === '') {
        p.delete(k);
      } else {
        p.set(k, v);
      }
    }
    const qs = p.toString();
    return `/parts-attachments/${categorySlug}${qs ? `?${qs}` : ''}`;
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24">
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-white transition-colors">
              Parts &amp; Attachments
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-alkota-orange">{catName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // OEM &amp; Industrial Spares Catalogue
              </span>
              <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight">
                {catName}
              </h1>
              {catDesc && (
                <p className="text-[#AAA] text-sm font-normal leading-relaxed mt-2 max-w-2xl">
                  {catDesc}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-ibm-plex-mono text-xs uppercase tracking-wider text-[#AAA]">
                {partList.length} {partList.length === 1 ? 'Product' : 'Products'} Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Search within category */}
            <div className="bg-white border border-[#E8E8E4] p-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Search Category
              </span>
              <form action={`/parts-attachments/${categorySlug}`} method="GET" className="relative">
                {selectedBrand && <input type="hidden" name="brand" value={selectedBrand} />}
                {isAvailableOnly && <input type="hidden" name="available" value="yes" />}
                {sortOption && <input type="hidden" name="sort" value={sortOption} />}
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery || ''}
                  placeholder="Part name or SKU..."
                  className="w-full bg-[#F7F7F5] border border-[#E0E0DA] text-xs px-3 py-2 pr-8 focus:outline-none focus:border-alkota-orange"
                />
                <button type="submit" className="absolute right-2 top-2.5 text-[#888] hover:text-alkota-orange">
                  <Search className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            {/* Category Switcher */}
            <div className="bg-white border border-[#E8E8E4] p-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Categories
              </span>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                <Link
                  href={buildUrl({})}
                  className={`block text-xs py-1 px-2 rounded-xs transition-colors no-underline ${
                    categorySlug === 'all'
                      ? 'bg-[#141414] text-white font-normal'
                      : 'text-[#555] hover:text-alkota-orange'
                  }`}
                >
                  All Categories
                </Link>
                {(allCategories || []).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/parts-attachments/${c.slug}${selectedBrand ? `?brand=${selectedBrand}` : ''}`}
                    className={`block text-xs py-1 px-2 rounded-xs transition-colors no-underline ${
                      categorySlug === c.slug
                        ? 'bg-[#141414] text-white font-normal'
                        : 'text-[#555] hover:text-alkota-orange'
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white border border-[#E8E8E4] p-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Filter by Brand
              </span>
              <div className="space-y-1.5">
                <Link
                  href={buildUrl({ brand: undefined })}
                  className={`flex items-center justify-between text-xs py-1 px-2 transition-colors no-underline ${
                    !selectedBrand ? 'bg-alkota-orange text-white' : 'text-[#555] hover:text-alkota-orange'
                  }`}
                >
                  <span>All Brands</span>
                  {!selectedBrand && <Check className="h-3 w-3" />}
                </Link>
                {(brands || []).map((b) => {
                  const isSel = selectedBrand === b.slug;
                  return (
                    <Link
                      key={b.slug}
                      href={buildUrl({ brand: isSel ? undefined : b.slug })}
                      className={`flex items-center justify-between text-xs py-1 px-2 transition-colors no-underline ${
                        isSel ? 'bg-alkota-orange text-white' : 'text-[#555] hover:text-alkota-orange'
                      }`}
                    >
                      <span>{b.name}</span>
                      {isSel && <Check className="h-3 w-3" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="bg-white border border-[#E8E8E4] p-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Stock Availability
              </span>
              <Link
                href={buildUrl({ available: isAvailableOnly ? undefined : 'yes' })}
                className={`flex items-center justify-between p-2.5 border text-xs transition-colors no-underline ${
                  isAvailableOnly 
                    ? 'border-green-600 bg-green-50 text-green-800' 
                    : 'border-[#E0E0DA] bg-[#F7F7F5] text-[#555] hover:border-alkota-orange'
                }`}
              >
                <span>In Stock Lines Only</span>
                {isAvailableOnly && <Check className="h-3.5 w-3.5 text-green-700" />}
              </Link>
            </div>

            {/* Reset Filters */}
            {(selectedBrand || isAvailableOnly || searchQuery || sortOption !== 'default') && (
              <Link
                href={`/parts-attachments/${categorySlug}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#CCC] bg-[#EFEFEA] hover:bg-white text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black transition-colors no-underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All Filters</span>
              </Link>
            )}
          </aside>

          {/* Right Product Grid */}
          <section className="lg:col-span-9">
            {/* Top Toolbar (Sorting & Summary) */}
            <div className="bg-white border border-[#E8E8E4] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#888]">
                  Sort By:
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {[
                    { key: 'default', label: 'Recommended' },
                    { key: 'price_asc', label: 'Price: Low → High' },
                    { key: 'price_desc', label: 'Price: High → Low' },
                    { key: 'newest', label: 'New Arrivals' },
                  ].map((s) => (
                    <Link
                      key={s.key}
                      href={buildUrl({ sort: s.key === 'default' ? undefined : s.key })}
                      className={`px-2.5 py-1 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors no-underline ${
                        (sortOption === s.key) || (s.key === 'default' && sortOption === 'default')
                          ? 'bg-[#141414] text-white'
                          : 'bg-[#F5F5F2] text-[#666] hover:text-black'
                      }`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {searchQuery && (
                <div className="text-xs text-[#777]">
                  Searching for: <span className="font-mono text-alkota-orange font-normal">"{searchQuery}"</span>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {partList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {partList.map((part) => (
                  <ProductCard key={part.id} part={part} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E8E8E4] p-16 text-center space-y-4">
                <Wrench className="h-10 w-10 text-[#CCC] mx-auto" />
                <h3 className="text-xl font-light text-alkota-black">No components found</h3>
                <p className="text-xs text-[#777] max-w-md mx-auto">
                  No parts matched your exact combination of category, brand, or search filters.
                </p>
                <div className="pt-2 flex justify-center gap-4">
                  <Link
                    href={`/parts-attachments/${categorySlug}`}
                    className="inline-flex items-center gap-2 bg-[#141414] text-white px-5 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-alkota-orange transition-colors"
                  >
                    Clear Category Filters
                  </Link>
                  <Link
                    href="/parts-attachments/enquiry"
                    className="inline-flex items-center gap-2 border border-[#CCC] px-5 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-black transition-colors"
                  >
                    Request Custom Sourcing
                  </Link>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
