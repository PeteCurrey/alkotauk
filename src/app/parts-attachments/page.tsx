import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

export const dynamic = 'force-dynamic';

const FEATURED_CATEGORY_SLUGS = [
  'pumps',
  'hoses',
  'trigger-guns',
  'lances-nozzles',
  'surface-cleaners',
  'burners',
];

const EDITORIAL_APPLICATIONS = [
  { label: 'Fleet & Vehicle Cleaning', href: '/parts-attachments/applications' },
  { label: 'Industrial Washdown', href: '/parts-attachments/applications' },
  { label: 'Hard Surface Cleaning', href: '/parts-attachments/applications' },
  { label: 'Drain & Pipe Jetting', href: '/parts-attachments/applications' },
  { label: 'Agricultural & Outdoor', href: '/parts-attachments/applications' },
];

export default async function PartsHomePage() {
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('id,slug,name,tagline,country_of_origin,description')
    .eq('active', true)
    .order('sort_order')
    .limit(12);

  let { data: featuredParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
    .eq('featured', true)
    .eq('active', true)
    .order('sort_order')
    .limit(6);

  if (!featuredParts || featuredParts.length === 0) {
    const { data: fallback } = await supabaseAdmin
      .from('parts')
      .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
      .eq('active', true)
      .order('sort_order')
      .limit(6);
    featuredParts = fallback || [];
  }

  const brands = dbBrands || [];
  const featuredBrand = brands[0] || null;

  const featuredCats = FEATURED_CATEGORY_SLUGS
    .map(slug => MASTER_TAXONOMY.find(c => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">

      {/* ── 01: HERO ── */}
      <section
        className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
        aria-label="Alkota UK Parts & Attachments"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota engineering workshop"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.65) contrast(1.12)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3 font-normal">
              <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
                Alkota UK · Parts, Spares & Tooling
              </span>
            </div>

            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
            >
              Parts that keep<br />
              <span className="text-alkota-orange">the pressure on.</span>
            </h1>

            <p className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
              Genuine Alkota components, Swiss-precision Mosmatic tooling, and professional-grade attachments from the world's leading pressure-washing manufacturers.
            </p>

            <div className="max-w-lg bg-white/95 backdrop-blur-sm p-1.5 mb-8 shadow-xl">
              <form action="/parts-attachments/search" method="GET" className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#888] ml-2.5 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search by part number, brand, or machine model"
                  className="w-full bg-transparent text-alkota-black text-xs sm:text-sm px-2 py-2 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  className="bg-alkota-orange hover:bg-black text-white px-5 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
              <Link
                href="/parts-attachments/categories"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group shadow-xl font-normal"
              >
                <span>Explore Parts</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/parts-attachments/finder"
                className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all font-normal"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Find My Part</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── 02: THREE WAYS IN ── */}
      <section className="bg-white border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E0DEDC]">

            <Link
              href="/parts-attachments/categories"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">01 / Browse</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Shop the Range
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  Pumps, hoses, nozzles, guns, surface cleaners, and everything in between.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange">
                <span>Explore every component</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/parts-attachments/machines"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">02 / Compatibility</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Find by Machine
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  Tell us what you're running and we'll show you guaranteed-compatible parts.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange">
                <span>Select your machine</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/parts-attachments/brands"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">03 / Manufacturer</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Shop by Brand
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  {brands.length > 0
                    ? brands.slice(0, 4).map(b => b.name).join('. ') + '. And more.'
                    : 'Giant. Interpump. Mosmatic. CoxREELS. And more.'}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange">
                <span>Browse all brands</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* ── 03: SHOP THE RANGE — Editorial category rows ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // The Range
              </span>
              <h2 className="font-extralight text-alkota-black tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Every component.<br />
                <span className="text-[#999]">Organised with precision.</span>
              </h2>
            </div>
            <Link
              href="/parts-attachments/categories"
              className="hidden md:flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors"
            >
              <span>All Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#E0DEDC]">
            {featuredCats.map((cat, idx) => (
              <div key={cat.slug} className="group py-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12">
                <div className="flex items-baseline gap-5 lg:w-1/3 min-w-0">
                  <span className="font-ibm-plex-mono text-[9px] text-[#C0BDB8] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Link href={`/parts-attachments/${cat.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 flex-1 min-w-0">
                  {cat.subcategories.slice(0, 6).map((sub, si) => (
                    <React.Fragment key={sub.slug}>
                      <Link
                        href={`/parts-attachments/${cat.slug}?sub=${sub.slug}`}
                        className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#999] hover:text-alkota-orange transition-colors whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                      {si < Math.min(5, cat.subcategories.length - 1) && (
                        <span className="text-[#D8D5D0] text-[10px]" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                  {cat.subcategories.length > 6 && (
                    <Link
                      href={`/parts-attachments/${cat.slug}`}
                      className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange"
                    >
                      +{cat.subcategories.length - 6} more
                    </Link>
                  )}
                </div>

                <Link
                  href={`/parts-attachments/${cat.slug}`}
                  className="text-alkota-orange group-hover:translate-x-1 transition-transform shrink-0 text-lg"
                  aria-label={`Browse ${cat.name}`}
                >
                  →
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-8 flex md:hidden">
            <Link
              href="/parts-attachments/categories"
              className="flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>


      {/* ── 04: FEATURED PRODUCTS — DB-driven only ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // In the Catalogue
              </span>
              <h2 className="font-extralight text-alkota-black tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Featured Components.
              </h2>
            </div>
            <Link
              href="/parts-attachments/categories"
              className="hidden md:flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors"
            >
              <span>Full Catalogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {featuredParts && featuredParts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#E8E6E2]">
              {featuredParts.slice(0, 6).map((part) => (
                <div key={part.id} className="bg-white">
                  <ProductCard part={part} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 border border-dashed border-[#D0CEC9] flex flex-col items-center gap-5 text-center">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#BBB]">
                // Catalogue being assembled
              </p>
              <p className="text-[#777] text-sm font-light max-w-sm">
                Parts are being catalogued and will appear here as they are verified and listed.
              </p>
              <Link
                href="/parts-attachments/enquiry"
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
              >
                Submit a parts enquiry <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

        </div>
      </section>


      {/* ── 05: EDITORIAL BRAND FEATURE ── */}
      <section className={`py-24 px-6 sm:px-12 lg:px-24 border-b ${featuredBrand ? 'bg-[#0A0A0A] text-white border-[#1A1A1A]' : 'bg-[#0A0A0A] text-white border-[#1A1A1A]'}`}>
        <div className="max-w-7xl mx-auto">
          {featuredBrand ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-7">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.22em] text-[#555]">
                    {featuredBrand.country_of_origin || 'International'} · Featured Partner
                  </span>
                </div>
                <h2 className="font-extralight text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  {featuredBrand.name}
                </h2>
                {featuredBrand.tagline && (
                  <p className="text-alkota-orange font-light text-lg">{featuredBrand.tagline}</p>
                )}
                {featuredBrand.description && (
                  <p className="text-[#888] text-sm leading-relaxed font-normal max-w-md">
                    {featuredBrand.description}
                  </p>
                )}
                <Link
                  href={`/parts-attachments/brands/${featuredBrand.slug}`}
                  className="inline-flex items-center gap-3 border border-white/20 hover:border-alkota-orange text-white hover:text-alkota-orange px-7 py-3 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-all group"
                >
                  <span>View {featuredBrand.name} Range</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#3A3A3A] block mb-5">
                  // All Brand Partners
                </span>
                <div className="divide-y divide-[#1C1C1C]">
                  {brands.slice(0, 8).map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/parts-attachments/brands/${brand.slug}`}
                      className="flex items-center justify-between py-3.5 group"
                    >
                      <div>
                        <span className="text-sm font-light text-[#CCC] group-hover:text-white transition-colors">
                          {brand.name}
                        </span>
                        {brand.country_of_origin && (
                          <span className="font-ibm-plex-mono text-[9px] text-[#555] ml-3 uppercase tracking-widest">
                            {brand.country_of_origin}
                          </span>
                        )}
                      </div>
                      <span className="text-[#444] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all text-sm">
                        →
                      </span>
                    </Link>
                  ))}
                  {brands.length > 8 && (
                    <Link
                      href="/parts-attachments/brands"
                      className="flex items-center gap-2 pt-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange"
                    >
                      All {brands.length} Brand Partners <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-5">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#444] block">
                // Brand Partners
              </span>
              <p className="font-extralight text-white text-3xl">
                Authorised stockists for the world's best.
              </p>
              <Link
                href="/parts-attachments/brands"
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange"
              >
                View All Brands <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* ── 06: BY APPLICATION — Editorial discovery strip ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // By Application
              </span>
              <h2 className="font-extralight text-alkota-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Designed for the job.
              </h2>
            </div>
            <Link
              href="/parts-attachments/applications"
              className="hidden md:flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors"
            >
              <span>All Applications</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#E0DEDC]">
            {EDITORIAL_APPLICATIONS.map((app, idx) => (
              <Link
                key={app.href + idx}
                href={app.href}
                className="group flex items-center justify-between py-6 hover:pl-2 transition-all"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-ibm-plex-mono text-[9px] text-[#C0BDB8]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl sm:text-2xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {app.label}
                  </span>
                </div>
                <span className="text-alkota-orange group-hover:translate-x-1 transition-transform text-lg shrink-0 ml-4">
                  →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* ── 07: ENQUIRY CTA ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-alkota-orange text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-white/60 block mb-4">
              // Parts Desk
            </span>
            <h2 className="font-extralight text-white leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Can't find the exact part?
            </h2>
            <p className="text-white/85 text-sm leading-relaxed font-normal max-w-xl">
              Our engineering parts desk can trace components for any Alkota, General Pump, CAT Pump, or legacy cleaning system. Tell us your machine model or share a photo of the data plate.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Link
              href="/parts-attachments/enquiry"
              className="text-center bg-white text-alkota-black hover:bg-black hover:text-white px-10 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shadow-lg"
            >
              Submit Parts Enquiry
            </Link>
            <Link
              href="/parts-attachments/finder"
              className="text-center border border-white/50 text-white hover:bg-white hover:text-alkota-orange px-10 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors"
            >
              Use Parts Finder
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
