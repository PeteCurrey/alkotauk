import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Search, ShieldCheck, Wrench, Award, ChevronRight } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import ShowroomHero from '@/components/parts/ShowroomHero';
import ShowroomCategoryModules from '@/components/parts/ShowroomCategoryModules';
import FeaturedToolingShowcase from '@/components/parts/FeaturedToolingShowcase';
import EngineeringIntegritySection from '@/components/parts/EngineeringIntegritySection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Genuine OEM Parts, Spares & Tooling Attachments | Alkota UK',
  description: 'Genuine Alkota OEM pressure washer spares, General Pump & CAT pump seals, Mosmatic rotary surface cleaners, Cox Reels hose reels, and high-pressure accessories despatched across the UK.',
  openGraph: {
    title: 'Genuine OEM Parts & Attachments Store | Alkota UK',
    description: 'High-pressure pumps, heating coils, burner electrodes, rotary tooling, and heavy-duty hose reels.',
    url: 'https://alkota.co.uk/parts-attachments',
  },
};

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

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: OPEN WITH PRODUCT (HERO SHOWROOM) ── */}
      <ShowroomHero />

      {/* ── 02: EDITORIAL PRODUCT FEATURES & CONTRAST MOMENTS ── */}
      <FeaturedToolingShowcase featuredParts={featuredParts} />

      {/* ── 03: UNBOXED COMPONENT RUNWAY ── */}
      <ShowroomCategoryModules categories={MASTER_TAXONOMY} />

      {/* ── 04: MANUFACTURING STANDARDS & METALLURGY ── */}
      <EngineeringIntegritySection />

      {/* ── 05: AUTHORISED MANUFACTURING PARTNERS ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8] text-alkota-black border-b border-[#E5E3DC]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          <div className="max-w-md space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              Authorised Partners
            </span>
            <h3 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              Stockists for world-class engineering.
            </h3>
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Official UK distribution for Mosmatic Switzerland, Cox Reels USA, General Pump, and Steel Eagle.
            </p>
          </div>

          {/* Clean Editorial Brand List */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="divide-y divide-[#DCDAD2] border-y border-[#DCDAD2]">
              {brands.slice(0, 5).map((b) => (
                <Link
                  key={b.slug}
                  href={`/parts-attachments/brands/${b.slug}`}
                  className="flex items-center justify-between py-4 group hover:pl-2 transition-all no-underline text-inherit"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-lg font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {b.name}
                    </span>
                    {b.country_of_origin && (
                      <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                        {b.country_of_origin}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#888] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 06: TECHNICAL PARTS DESK ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#777] block font-medium">
              UK Engineering Desk
            </span>
            <h2 className="font-extralight text-[#0A0A0A] leading-tight" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Can't locate your part number?
            </h2>
            <p className="text-[#666] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Our UK engineering parts desk traces components for any Alkota, General Pump, CAT Pump, or custom wash system. Send us your data plate photo for a direct quote.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal w-full lg:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="text-center bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors font-medium whitespace-nowrap shadow-sm"
            >
              Submit Parts Enquiry
            </Link>
            <Link
              href="/parts-attachments/finder"
              className="text-center border border-[#DCDAD4] hover:border-black text-alkota-black px-8 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors font-medium whitespace-nowrap"
            >
              Use Parts Finder
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
