import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronRight, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Wrench,
  Globe,
  Truck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPartnerPage({ params }: PageProps) {
  const { brand: brandSlug } = await params;

  // Fetch brand information
  const { data: brand } = await supabaseAdmin
    .from('brand_partners')
    .select('*')
    .eq('slug', brandSlug)
    .single();

  if (!brand) {
    // If not found in database, check for standard partner fallback definitions
    const FALLBACK_BRANDS: Record<string, any> = {
      mosmatic: {
        name: 'Mosmatic',
        tagline: 'Swiss Rotary Precision Tooling',
        description: 'Swiss-engineered rotating unions, flat surface cleaners, undercarriage wash systems, and turbo nozzles. The worldwide benchmark for rotating pressure wash tooling used by professional cleaning contractors.',
        country_of_origin: 'Switzerland',
        website_url: 'https://mosmatic.com'
      },
      'cox-reels': {
        name: 'Cox Reels',
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
        country_of_origin: 'USA / UK',
        website_url: 'https://alkota.co.uk'
      }
    };

    if (!FALLBACK_BRANDS[brandSlug]) {
      notFound();
    }
  }

  const brandData = brand || {
    name: brandSlug.replace(/-/g, ' ').toUpperCase(),
    tagline: 'Authorised Stockist & Technical Support',
    description: 'Explore genuine parts and tooling sourced and stocked in the UK.',
    country_of_origin: 'International',
    website_url: null,
  };

  // Fetch all parts for this brand
  const { data: brandParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
    .eq('brand', brandSlug)
    .eq('active', true)
    .order('sort_order')
    .order('name');

  const parts = brandParts || [];

  // Group parts by category
  const partsByCategory = parts.reduce((acc: Record<string, typeof parts>, part) => {
    const cat = part.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(part);
    return acc;
  }, {});

  const categoryKeys = Object.keys(partsByCategory);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24">
      {/* Brand Hero Header */}
      <section className="bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 lg:px-24 pt-16 pb-20 relative overflow-hidden">
        <div 
          className="absolute right-0 bottom-0 select-none pointer-events-none font-extralight text-white opacity-[0.02] text-[18vw] leading-none uppercase"
          aria-hidden="true"
        >
          {brandSlug}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-6">
            <Link href="/parts-attachments" className="hover:text-white transition-colors">
              Parts &amp; Attachments
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>Brands</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-alkota-orange">{brandData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#AAA]">
                  Authorised Stockist // {brandData.country_of_origin}
                </span>
              </div>

              <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                {brandData.name}
              </h1>

              {brandData.tagline && (
                <p className="text-xl text-alkota-orange font-light">
                  {brandData.tagline}
                </p>
              )}

              <p className="text-base text-[#BBB] leading-relaxed max-w-2xl font-normal">
                {brandData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/parts-attachments/all?brand=${brandSlug}`}
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-md no-underline"
                >
                  <span>Browse All {brandData.name} SKUs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {brandData.website_url && (
                  <a
                    href={brandData.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors bg-[#141414] no-underline"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="h-3 w-3 text-[#888]" />
                  </a>
                )}
              </div>
            </div>

            {/* Brand Key Metrics Box */}
            <div className="lg:col-span-4 bg-[#141414] border border-[#262626] p-8 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block pb-2 border-b border-[#222]">
                // Brand Specifications
              </span>

              <div className="space-y-4 font-normal">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    Catalogue Coverage
                  </span>
                  <span className="text-xl font-extralight text-white">
                    {parts.length} Verified Components
                  </span>
                </div>

                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    Product Groups
                  </span>
                  <span className="text-xl font-extralight text-white">
                    {categoryKeys.length} Categories
                  </span>
                </div>

                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    Logistics Lead Time
                  </span>
                  <span className="text-xl font-extralight text-white">
                    Next-Day UK Dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Product Listings by Category */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16">
        {parts.length > 0 ? (
          <div className="space-y-16">
            {categoryKeys.map((catKey) => {
              const catParts = partsByCategory[catKey];
              return (
                <section key={catKey} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E4]">
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                        Category
                      </span>
                      <h2 className="font-extralight text-2xl text-alkota-black tracking-tight">
                        {catKey.replace(/-/g, ' ').toUpperCase()}
                      </h2>
                    </div>

                    <Link
                      href={`/parts-attachments/${catKey}?brand=${brandSlug}`}
                      className="font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors"
                    >
                      View All ({catParts.length}) →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {catParts.map((p) => (
                      <ProductCard key={p.id} part={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E8E8E4] p-16 text-center space-y-4">
            <Wrench className="h-10 w-10 text-[#CCC] mx-auto" />
            <h3 className="text-xl font-light text-alkota-black">
              Catalogue Seeding in Progress
            </h3>
            <p className="text-xs text-[#777] max-w-md mx-auto">
              Products for {brandData.name} are currently being added to the database. You can request specific items from our parts desk.
            </p>
            <div className="pt-2">
              <Link
                href={`/parts-attachments/enquiry?notes=Enquiry regarding ${brandData.name} components`}
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Enquire for {brandData.name} Parts
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
