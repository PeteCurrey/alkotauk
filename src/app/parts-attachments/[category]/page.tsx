import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, ChevronRight, Sparkles, Search } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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

  // Resolve category from taxonomy first (fast, no DB needed for structure)
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

  // Fetch brands for filters — DB only
  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug,name')
    .eq('active', true)
    .order('sort_order');

  // Build product query
  let query = supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment,weight_kg')
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
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">

      {/* ── EDITORIAL CATEGORY HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-5">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-alkota-orange">{catName}</span>
          </nav>

          {/* Category Title — No product count here, that's below the fold */}
          <h1 className="font-extralight text-white tracking-tight mb-3" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {catName}
          </h1>
          {catDesc && (
            <p className="text-[#888] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
              {catDesc}
            </p>
          )}

          {/* Subcategory Text Navigation */}
          {taxonomyCat && taxonomyCat.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#555] self-center">
                Subcategories:
              </span>
              {taxonomyCat.subcategories.slice(0, 10).map((sub) => (
                <Link
                  key={sub.slug}
                  href={buildUrl({ sub: selectedSub === sub.slug ? undefined : sub.slug })}
                  className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors ${
                    selectedSub === sub.slug 
                      ? 'text-alkota-orange' 
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FILTER ROW — horizontal, not a sidebar ── */}
      <section className="bg-white border-b border-[#E0DEDC] px-6 sm:px-12 lg:px-24 py-4 sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#999]">
            Filter:
          </span>

          {/* In Stock */}
          <Link
            href={buildUrl({ available: isAvailableOnly ? undefined : 'yes' })}
            className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3.5 py-1.5 border transition-colors ${
              isAvailableOnly
                ? 'bg-alkota-orange border-alkota-orange text-white'
                : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
            }`}
          >
            In Stock
          </Link>

          {/* Brand Filter Pills — DB-driven */}
          {(brands || []).map((b) => (
            <Link
              key={b.slug}
              href={buildUrl({ brand: selectedBrand === b.slug ? undefined : b.slug })}
              className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3.5 py-1.5 border transition-colors ${
                selectedBrand === b.slug
                  ? 'bg-alkota-orange border-alkota-orange text-white'
                  : 'border-[#D0CEC9] text-[#666] hover:border-alkota-orange hover:text-alkota-orange'
              }`}
            >
              {b.name}
            </Link>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            {[
              { key: 'default', label: 'Recommended' },
              { key: 'price_asc', label: 'Price ↑' },
              { key: 'price_desc', label: 'Price ↓' },
              { key: 'newest', label: 'Newest' },
            ].map((s) => (
              <Link
                key={s.key}
                href={buildUrl({ sort: s.key === 'default' ? undefined : s.key })}
                className={`font-ibm-plex-mono text-[10px] uppercase tracking-widest px-3 py-1.5 transition-colors ${
                  (sortOption === s.key) || (s.key === 'default' && sortOption === 'default')
                    ? 'bg-[#0A0A0A] text-white'
                    : 'text-[#888] hover:text-alkota-black'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Link
              href={`/parts-attachments/${categorySlug}`}
              className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
            >
              Clear ×
            </Link>
          )}
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12">

        {/* Result Count — below the fold, not screamed in the header */}
        {partList.length > 0 && (
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA] mb-6">
            {partList.length} {partList.length === 1 ? 'component' : 'components'} in {catName}
            {selectedBrand && ` · ${brands?.find(b => b.slug === selectedBrand)?.name || selectedBrand}`}
            {isAvailableOnly && ' · In Stock Only'}
          </p>
        )}

        {partList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#E0DEDC]">
            {partList.map((part) => (
              <div key={part.id} className="bg-[#FAF9F5]">
                <ProductCard part={part} />
              </div>
            ))}
          </div>
        ) : (
          /* Premium empty state */
          <div className="py-28 flex flex-col items-center text-center space-y-8">
            <div className="space-y-3">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA]">
                // No Components Found
              </p>
              <h2 className="text-3xl font-extralight text-alkota-black">
                Nothing here yet.
              </h2>
              <p className="text-sm font-light text-[#666] max-w-md leading-relaxed">
                {hasActiveFilters
                  ? 'No parts match your current filter combination. Try clearing some filters.'
                  : 'This category is being built. Parts will appear here as they are catalogued and verified.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {hasActiveFilters && (
                <Link
                  href={`/parts-attachments/${categorySlug}`}
                  className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-alkota-orange transition-colors"
                >
                  Clear Filters
                </Link>
              )}
              <Link
                href="/parts-attachments/finder"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Parts Finder Wizard
              </Link>
              <Link
                href="/parts-attachments/enquiry"
                className="inline-flex items-center gap-2 border border-[#CCC] px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:border-black transition-colors"
              >
                Submit Parts Enquiry
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
