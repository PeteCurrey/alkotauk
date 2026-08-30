import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, ChevronRight, Sparkles, Search, ShieldCheck, Wrench, Plus, Check } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import SafeImage from '@/components/ui/SafeImage';

import { Metadata } from 'next';

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

      {/* ── 01: EDITORIAL CATEGORY HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-6">
            <Link href="/parts-attachments" className="hover:text-white transition-colors">
              Parts Showroom
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-alkota-orange">{catName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange" />
                <span>OEM Verified Range · Industrial Specification</span>
              </div>
              
              <h1 className="font-extralight text-white tracking-tight uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                {catName}
              </h1>

              {catDesc && (
                <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                  {catDesc}
                </p>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3 text-xs font-ibm-plex-mono text-[#777]">
              <div>
                <span className="text-white font-medium text-lg">{partList.length}</span>
                <span className="ml-1 uppercase tracking-wider">Catalogued Components</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Next-Day UK Mainland Delivery</span>
              </div>
            </div>
          </div>

          {/* Subcategory Pill Navigation */}
          {taxonomyCat && taxonomyCat.subcategories.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#222] flex flex-wrap items-center gap-2">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#666] mr-2">
                Sub-Assemblies:
              </span>
              {taxonomyCat.subcategories.slice(0, 8).map((sub) => (
                <Link
                  key={sub.slug}
                  href={buildUrl({ sub: selectedSub === sub.slug ? undefined : sub.slug })}
                  className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors ${
                    selectedSub === sub.slug 
                      ? 'bg-alkota-orange border-alkota-orange text-white' 
                      : 'border-[#333] text-[#888] hover:border-white hover:text-white bg-black/40'
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
      <section className="bg-white border-b border-[#E0DEDC] px-6 sm:px-12 lg:px-24 py-4 sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#999] mr-1">
              Filter:
            </span>

            {/* In Stock */}
            <Link
              href={buildUrl({ available: isAvailableOnly ? undefined : 'yes' })}
              className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                isAvailableOnly
                  ? 'bg-alkota-orange border-alkota-orange text-white font-medium'
                  : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
              }`}
            >
              In Stock Only
            </Link>

            {/* Brand Filter Pills */}
            {(brands || []).slice(0, 6).map((b) => (
              <Link
                key={b.slug}
                href={buildUrl({ brand: selectedBrand === b.slug ? undefined : b.slug })}
                className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  selectedBrand === b.slug
                    ? 'bg-alkota-orange border-alkota-orange text-white font-medium'
                    : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
                }`}
              >
                {b.name}
              </Link>
            ))}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Link
                href={`/parts-attachments/${categorySlug}`}
                className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange hover:text-black transition-colors ml-2 font-medium"
              >
                Clear Filters ×
              </Link>
            )}
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-1.5 text-xs font-ibm-plex-mono">
            <span className="text-[#888] text-[9px] uppercase tracking-widest mr-1">Sort:</span>
            {[
              { key: 'default', label: 'Featured' },
              { key: 'price_asc', label: 'Price ↑' },
              { key: 'price_desc', label: 'Price ↓' },
              { key: 'newest', label: 'Newest' },
            ].map((s) => (
              <Link
                key={s.key}
                href={buildUrl({ sort: s.key === 'default' ? undefined : s.key })}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                  (sortOption === s.key) || (s.key === 'default' && sortOption === 'default')
                    ? 'bg-[#0A0A0A] text-white font-medium'
                    : 'text-[#888] hover:text-alkota-black'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03: SHOWROOM CATALOGUE & EDITORIAL FEATURE ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 space-y-12">

        {/* Flagship Lead Spotlight Card (if parts exist & not filtered out) */}
        {flagshipPart && !hasActiveFilters && (
          <div className="bg-[#0A0A0A] text-white border border-[#222] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 border border-alkota-orange/30 px-2 py-0.5 font-medium">
                    Category Flagship
                  </span>
                  <span className="font-ibm-plex-mono text-xs text-[#888]">
                    {flagshipPart.part_number}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extralight text-white tracking-tight uppercase">
                  {flagshipPart.name}
                </h2>

                <p className="text-sm text-[#AAA] font-light leading-relaxed max-w-xl">
                  {flagshipPart.description || 'Engineered for continuous heavy duty operations, meeting exacting OEM manufacturing standards with guaranteed direct fitment.'}
                </p>

                <div className="pt-4 flex items-center gap-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block">Trade Price</span>
                    <span className="font-ibm-plex-mono text-2xl text-white font-light">
                      {flagshipPart.price ? `£${Number(flagshipPart.price).toFixed(2)}` : 'POA'}
                      <span className="text-xs text-[#777] ml-1">ex VAT</span>
                    </span>
                  </div>

                  <Link
                    href={`/parts-attachments/product/${flagshipPart.slug}`}
                    className="bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium inline-flex items-center gap-2 shadow-lg"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-sm bg-[#141412] border border-[#262624] p-8 flex items-center justify-center">
                  {flagshipPart.image_url ? (
                    <SafeImage
                      src={flagshipPart.image_url}
                      alt={flagshipPart.name}
                      fill
                      className="object-contain p-6"
                    />
                  ) : (
                    <Wrench className="w-16 h-16 text-[#444]" />
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Supporting Component Grid */}
        {partList.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
                {supportingParts.length} Component{supportingParts.length === 1 ? '' : 's'} in Showcase
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {supportingParts.map((part) => (
                <ProductCard key={part.id} part={part} />
              ))}
            </div>
          </div>
        ) : (
          /* Premium Empty State */
          <div className="py-24 flex flex-col items-center text-center space-y-6">
            <Wrench className="h-12 w-12 text-[#AAA]" />
            <div className="space-y-2">
              <h2 className="text-3xl font-extralight text-alkota-black">
                No matching components found.
              </h2>
              <p className="text-sm text-[#666] font-light max-w-md">
                Try clearing your active filter parameters or submit a custom parts identification request to our technical team.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={`/parts-attachments/${categorySlug}`}
                className="bg-[#0A0A0A] text-white px-7 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                Reset Filters
              </Link>
              <Link
                href="/parts-attachments/enquiry"
                className="border border-[#CCC] px-7 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest hover:border-black transition-colors"
              >
                Submit Parts Request
              </Link>
            </div>
          </div>
        )}

      </section>

    </main>
  );
}
