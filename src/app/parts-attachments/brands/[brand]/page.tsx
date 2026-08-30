import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const { data: brand } = await supabaseAdmin
    .from('brand_partners')
    .select('name, tagline, description')
    .eq('slug', brandSlug)
    .single();

  const brandName = brand?.name || brandSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const tagline = brand?.tagline ? ` — ${brand.tagline}` : '';
  const desc = brand?.description || `Explore genuine ${brandName} parts, tooling, and attachments stocked and despatched by Alkota UK.`;

  return {
    title: `${brandName}${tagline} | Alkota UK Parts & Attachments`,
    description: desc,
    openGraph: {
      title: `${brandName} Spares & Attachments | Alkota UK`,
      description: desc,
      url: `https://alkota.co.uk/parts-attachments/brands/${brandSlug}`,
    },
  };
}

export default async function BrandPartnerPage({ params }: PageProps) {
  const { brand: brandSlug } = await params;

  // Fetch brand from DB
  const { data: brand } = await supabaseAdmin
    .from('brand_partners')
    .select('*')
    .eq('slug', brandSlug)
    .single();

  // Fallback editorial definitions for known partners not yet in DB
  const FALLBACK_BRANDS: Record<string, any> = {
    mosmatic: {
      name: 'Mosmatic',
      tagline: 'Swiss Rotary Precision Tooling',
      description: 'Swiss-engineered rotating unions, flat surface cleaners, undercarriage wash systems, and turbo nozzles. The worldwide benchmark for rotating pressure wash tooling.',
      country_of_origin: 'Switzerland',
      website_url: 'https://mosmatic.com'
    },
    'cox-reels': {
      name: 'CoxREELS',
      tagline: 'American Hose Reel Engineering',
      description: 'Heavy-duty industrial hose reels manufactured in the USA since 1923. Standard equipment on Alkota bespoke trailer and wash bay installations.',
      country_of_origin: 'USA',
      website_url: 'https://coxreels.com'
    },
    'steel-eagle': {
      name: 'Steel Eagle',
      tagline: 'Commercial Surface Cleaning Equipment',
      description: 'Specialist surface cleaners, deck cleaning attachments, and bar nozzle systems designed for heavy commercial and industrial pressure washing operations.',
      country_of_origin: 'USA',
      website_url: 'https://steeleagle.com'
    },
    'dual-pumps': {
      name: 'Dual Pumps',
      tagline: 'UK Industrial Fluid Power',
      description: 'UK distributor and manufacturer of industrial high-pressure pumps, bypass manifolds, unloader valves, and fluid transfer systems.',
      country_of_origin: 'UK',
      website_url: 'https://dualpumps.co.uk'
    },
    alkota: {
      name: 'Alkota Genuine Spares',
      tagline: 'Factory OEM Replacement Components',
      description: 'Original equipment manufacturer replacement parts for all Alkota hot water, cold water, steam, and trailer cleaning systems. Backed by factory engineering and full warranty compatibility.',
      country_of_origin: 'USA',
      website_url: 'https://alkota.co.uk'
    },
    'giant-pumps': {
      name: 'Giant Pumps',
      tagline: 'High-Pressure Triplex Pump Engineering',
      description: 'Industry-standard triplex plunger pumps, ceramic plungers, manifold heads, and complete repair kits for professional-grade pressure washing applications.',
      country_of_origin: 'USA',
      website_url: 'https://giantpumps.com'
    },
    interpump: {
      name: 'Interpump',
      tagline: 'European Precision Pump Manufacturing',
      description: 'Italy\'s largest pump group. High-pressure plunger pumps, pump repair kits, and associated valves for professional pressure washing and industrial fluid transfer.',
      country_of_origin: 'Italy',
      website_url: 'https://interpumpgroup.com'
    },
  };

  if (!brand && !FALLBACK_BRANDS[brandSlug]) {
    notFound();
  }

  const brandData = brand || FALLBACK_BRANDS[brandSlug] || {
    name: brandSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    tagline: 'Authorised Stockist',
    description: 'Explore genuine parts and tooling sourced and stocked in the UK.',
    country_of_origin: 'International',
    website_url: null,
  };

  // Fetch all parts for this brand from DB
  const { data: brandParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
    .eq('brand', brandSlug)
    .eq('active', true)
    .order('sort_order')
    .order('name');

  const parts = brandParts || [];

  // Group parts by category — DB-driven
  const partsByCategory = parts.reduce((acc: Record<string, typeof parts>, part) => {
    const cat = part.category || 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(part);
    return acc;
  }, {});

  const categoryKeys = Object.keys(partsByCategory);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">

      {/* ── EDITORIAL BRAND HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#1A1A1A] relative overflow-hidden">
        {/* Subtle watermark brand name */}
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none font-extralight text-white/[0.025] uppercase leading-none"
          aria-hidden="true"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
        >
          {brandData.name.split(' ')[0]}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-7">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">Parts Hub</Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <Link href="/parts-attachments/brands" className="hover:text-white transition-colors">Brands</Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-alkota-orange">{brandData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Brand Story */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-5 bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.22em] text-[#555]">
                  {brandData.country_of_origin || 'International'} · Authorised UK Stockist
                </span>
              </div>

              <h1 className="font-extralight text-white tracking-tight leading-[0.92]" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                {brandData.name}
              </h1>

              {brandData.tagline && (
                <p className="text-alkota-orange font-light text-xl">{brandData.tagline}</p>
              )}

              {brandData.description && (
                <p className="text-[#AAA] text-base leading-relaxed font-normal max-w-2xl">
                  {brandData.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {parts.length > 0 && (
                  <Link
                    href={`/parts-attachments/search?brand=${brandSlug}`}
                    className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all group"
                  >
                    <span>All {brandData.name} Components</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {brandData.website_url && (
                  <a
                    href={brandData.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#333] hover:border-white text-[#AAA] hover:text-white px-7 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
                  >
                    <span>Official Website</span>
                    <ExternalLink className="h-3 w-3 text-[#666]" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Only show real DB stats when > 0 */}
            {parts.length > 0 && (
              <div className="lg:col-span-4 space-y-0 divide-y divide-[#1C1C1C] border border-[#1C1C1C]">
                <div className="px-6 py-5">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                    Components Listed
                  </span>
                  <span className="text-2xl font-extralight text-white">{parts.length}</span>
                </div>
                {categoryKeys.length > 0 && (
                  <div className="px-6 py-5">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                      Product Categories
                    </span>
                    <span className="text-2xl font-extralight text-white">{categoryKeys.length}</span>
                  </div>
                )}
                <div className="px-6 py-5">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                    OEM Sourcing
                  </span>
                  <span className="text-sm font-light text-[#CCC]">Genuine · Factory Direct</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRODUCT LISTINGS BY CATEGORY ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16">
        {parts.length > 0 ? (
          <div className="space-y-20">
            {categoryKeys.map((catKey) => {
              const catParts = partsByCategory[catKey];
              const categoryLabel = catKey.replace(/-/g, ' ');

              return (
                <section key={catKey}>
                  {/* Category heading — simple, no box */}
                  <div className="flex items-baseline justify-between pb-5 border-b border-[#E0DEDC] mb-8">
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-1">
                        Category
                      </span>
                      <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
                        {categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}
                      </h2>
                    </div>
                    <Link
                      href={`/parts-attachments/${catKey}?brand=${brandSlug}`}
                      className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors flex items-center gap-1.5"
                    >
                      <span>View all {catParts.length}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#E0DEDC]">
                    {catParts.slice(0, 10).map((p) => (
                      <div key={p.id} className="bg-[#FAF9F5]">
                        <ProductCard part={p} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Premium empty state — no icon in a box */
          <div className="py-28 flex flex-col items-center text-center space-y-8">
            <div className="space-y-3">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA]">
                // Catalogue in Progress
              </p>
              <h2 className="text-3xl font-extralight text-alkota-black">
                {brandData.name} components are being added.
              </h2>
              <p className="text-sm font-light text-[#666] max-w-md leading-relaxed">
                Parts are being catalogued and verified. Request any specific item directly from our parts desk.
              </p>
            </div>
            <Link
              href={`/parts-attachments/enquiry?notes=${encodeURIComponent(`Enquiry for ${brandData.name} components`)}`}
              className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
            >
              Enquire for {brandData.name} Parts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
