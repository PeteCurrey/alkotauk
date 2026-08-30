import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, ChevronRight, Sparkles, Search, ShieldCheck, Wrench, Plus, Check } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import SafeImage from '@/components/ui/SafeImage';
import { Metadata } from 'next';
import SortSelect from '@/components/parts/SortSelect';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ brand?: string; available?: string; sort?: string; q?: string; sub?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const taxonomyCat = MASTER_TAXONOMY.find(c => c.slug === category);
  
  if (category === 'all') {
    return {
      title: 'All Parts, Spares & Tooling Attachments | Alkota UK',
      description: 'Explore the complete Alkota UK catalogue of pressure washing spares, pumps, hoses, nozzles, burner heads, and rotary surface cleaners.',
    };
  }

  const name = taxonomyCat?.name || category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const desc = taxonomyCat?.shortDesc || `Shop genuine OEM ${name.toLowerCase()} and accessories for industrial pressure washers and cleaning equipment.`;

  return {
    title: `${name} | Alkota UK Parts & Attachments`,
    description: desc,
    openGraph: {
      title: `${name} — Genuine Spares & Attachments | Alkota UK`,
      description: desc,
      url: `https://alkota.co.uk/parts-attachments/${category}`,
    },
  };
}

export default async function CategoryBrowsePage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const sp = await searchParams;
  const selectedBrand = sp.brand;
  const isAvailableOnly = sp.available === 'yes';
  const sortOption = sp.sort || 'default';
  const searchQuery = sp.q;
  const selectedSub = sp.sub;

  // Resolve category from taxonomy first
  const taxonomyCat = MASTER_TAXONOMY.find(c => c.slug === categorySlug);

  // Also try DB for enhanced description
  let catName = taxonomyCat?.name || 'All Parts & Attachments';
  let catDesc = taxonomyCat?.shortDesc || 'Browse the complete Alkota UK parts and tooling catalogue.';
  
  if (categorySlug !== 'all') {
    const { data: catInfo } = await supabaseAdmin
      .from('part_categories')
      .select('*')
      .eq('slug', categorySlug)
      .single();

    if (catInfo) {
      catName = catInfo.name;
      catDesc = catInfo.short_desc || catDesc;
    } else if (!taxonomyCat) {
      catName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  // Fetch brands for filters
  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug,name')
    .eq('active', true)
    .order('sort_order');

  // Build product query
  let query = supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment,weight_kg,description')
    .eq('active', true);

  if (categorySlug !== 'all') {
    query = query.eq('category', categorySlug);
  }
  if (selectedBrand) query = query.eq('brand', selectedBrand);
  if (isAvailableOnly) query = query.eq('in_stock', true);
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

  // Lead Flagship Item for Editorial Spotlight
  const flagshipPart = partList.length > 0 ? (partList.find(p => p.featured) || partList[0]) : null;
  const supportingParts = flagshipPart ? partList.filter(p => p.id !== flagshipPart.id) : partList;

  // URL builder helper
  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    if (selectedBrand) p.set('brand', selectedBrand);
    if (isAvailableOnly) p.set('available', 'yes');
    if (sortOption && sortOption !== 'default') p.set('sort', sortOption);
    if (searchQuery) p.set('q', searchQuery);
    for (const [k, v] of Object.entries(newParams)) {
      if (v === undefined || v === '') p.delete(k);
      else p.set(k, v);
    }
    const qs = p.toString();
    return `/parts-attachments/${categorySlug}${qs ? `?${qs}` : ''}`;
  };

  const hasActiveFilters = !!(selectedBrand || isAvailableOnly || searchQuery);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: CLEAN, LIGHT EDITORIAL CATEGORY HEADER ── */}
      <section className="bg-[#FAF9F5] text-alkota-black pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#E8E8E4] relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-6">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Showroom
            </Link>
            <ChevronRight className="h-3 w-3 text-[#BBB]" />
            <span className="text-alkota-black font-medium">{catName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange" />
                <span>OEM Verified Range · Industrial Specification</span>
              </div>
              
              <h1 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]" 
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                {catName}
              </h1>

              {catDesc && (
                <p className="text-[#555] text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                  {catDesc}
                </p>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-2 text-xs font-ibm-plex-mono text-[#777]">
              <div>
                <span className="text-alkota-black font-semibold text-lg">{partList.length}</span>
                <span className="ml-1 uppercase tracking-wider">Catalogued Components</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Next-Day UK Mainland Delivery</span>
              </div>
            </div>
          </div>

          {/* Subcategory Pill Navigation */}
          {taxonomyCat && taxonomyCat.subcategories.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E8E8E4] flex flex-wrap items-center gap-2">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#888] mr-2">
                Sub-Assemblies:
              </span>
              {taxonomyCat.subcategories.slice(0, 8).map((sub) => (
                <Link
                  key={sub.slug}
                  href={buildUrl({ sub: selectedSub === sub.slug ? undefined : sub.slug })}
                  className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                    selectedSub === sub.slug 
                      ? 'bg-alkota-black border-black text-white font-medium' 
                      : 'border-[#DCDAD4] text-[#666] hover:border-black hover:text-black bg-white'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 02: REFINED HORIZONTAL FILTER BAR ── */}
      <section className="bg-white border-b border-[#E8E8E4] px-6 sm:px-12 lg:px-24 py-4 sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mr-2">
              Filter:
            </span>

            {/* In Stock */}
            <Link
              href={buildUrl({ available: isAvailableOnly ? undefined : 'yes' })}
              className={`font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-colors pb-0.5 ${
                isAvailableOnly
                  ? 'text-alkota-black font-semibold border-b-2 border-black'
                  : 'text-[#777] hover:text-black'
              }`}
            >
              In Stock Only
            </Link>

            {/* Brand Filter */}
            {(brands || []).slice(0, 6).map((b) => (
              <Link
                key={b.slug}
                href={buildUrl({ brand: selectedBrand === b.slug ? undefined : b.slug })}
                className={`font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-colors pb-0.5 ${
                  selectedBrand === b.slug
                    ? 'text-alkota-black font-semibold border-b-2 border-black'
                    : 'text-[#777] hover:text-black'
                }`}
              >
                {b.name}
              </Link>
            ))}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Link
                href={`/parts-attachments/${categorySlug}`}
                className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange hover:text-black"
              >
                Reset (×)
              </Link>
            )}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2 text-xs font-ibm-plex-mono text-[#777]">
            <span className="text-[10px] uppercase tracking-wider text-[#888]">Sort:</span>
            <SortSelect
              value={sortOption}
              categorySlug={categorySlug}
              brand={selectedBrand}
              available={sp.available}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </section>

      {/* ── 03: PRODUCT GRID (CLEAN UNBOXED STAGING) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-16">
        {partList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partList.map((part) => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white border border-[#E8E8E4] p-12 space-y-4">
            <Wrench className="w-8 h-8 text-[#BBB] mx-auto" />
            <h3 className="text-xl font-light text-alkota-black">No components found</h3>
            <p className="text-xs text-[#666] max-w-md mx-auto">
              No parts matched your current filters. Try resetting the brand filter or search query.
            </p>
            <Link
              href={`/parts-attachments/${categorySlug}`}
              className="inline-block bg-alkota-black hover:bg-alkota-orange text-white px-6 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </section>

    </main>
  );
}
