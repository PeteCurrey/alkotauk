import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { COMPREHENSIVE_BRANDS } from '@/lib/parts/seed-comprehensive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Authorized Brand Partners & Manufacturers | Alkota UK',
  description: 'Shop genuine pressure washing pumps, reels, valves, and attachments from Alkota, Mosmatic, Giant Pumps, Interpump, General Pump, CoxREELS, and Steel Eagle.',
};

export default async function BrandsDirectoryPage() {
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const brands = (dbBrands && dbBrands.length > 0) ? dbBrands : COMPREHENSIVE_BRANDS;

  // Real product counts from database
  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('brand')
    .eq('active', true);

  const brandCounts: Record<string, number> = {};
  (parts || []).forEach((p) => {
    if (p.brand) {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    }
  });

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* ── HEADER HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">Brand Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            Authorized Brand <span className="text-alkota-orange italic font-light">Partners.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            We partner directly with leading industrial pump manufacturers, Swiss rotating tooling specialists, and American hose reel engineers to supply guaranteed genuine OEM components.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#888]">
            <span className="flex items-center gap-1.5 bg-[#141414] border border-[#282828] px-3 py-1.5 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-alkota-orange" />
              100% Genuine OEM Sourced
            </span>
            <span className="flex items-center gap-1.5 bg-[#141414] border border-[#282828] px-3 py-1.5 text-[10px]">
              <Globe className="w-3.5 h-3.5 text-alkota-orange" />
              Direct Tier-1 Sourcing
            </span>
          </div>
        </div>
      </section>

      {/* ── TYPOGRAPHIC DIRECTORY LIST (No Card Farm) ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-[#0A0A0A] mb-2 font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
            <span className="col-span-12 md:col-span-4">Brand / Manufacturer</span>
            <span className="hidden md:block md:col-span-2">Origin</span>
            <span className="hidden lg:block lg:col-span-4">Engineering Focus</span>
            <span className="col-span-12 md:col-span-2 text-left md:text-right">Catalogue</span>
          </div>

          {/* Directory Rows */}
          <div className="divide-y divide-[#E0DEDC]">
            {brands.map((brand: any) => {
              const count = brandCounts[brand.slug] || 0;

              return (
                <Link
                  key={brand.slug}
                  href={`/parts-attachments/brands/${brand.slug}`}
                  className="grid grid-cols-12 gap-4 py-6 group hover:bg-[#F2F1EC] transition-colors -mx-4 px-4 items-center no-underline"
                >
                  {/* Brand Name & Tagline */}
                  <div className="col-span-12 md:col-span-4">
                    <h2 className="text-xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {brand.name}
                    </h2>
                    {brand.tagline && (
                      <span className="block font-ibm-plex-mono text-[10px] text-[#888] mt-0.5">
                        {brand.tagline}
                      </span>
                    )}
                  </div>

                  {/* Origin */}
                  <div className="hidden md:block md:col-span-2">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666]">
                      {brand.country_of_origin || 'International'}
                    </span>
                  </div>

                  {/* Specialisation */}
                  <div className="hidden lg:block lg:col-span-4">
                    <span className="text-sm font-light text-[#666] line-clamp-1 leading-relaxed">
                      {brand.description || `Industrial pressure washing components from ${brand.name}.`}
                    </span>
                  </div>

                  {/* Count & Arrow */}
                  <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                    {count > 0 && (
                      <span className="font-ibm-plex-mono text-[9px] text-[#999] uppercase tracking-wider">
                        {count} {count === 1 ? 'part' : 'parts'}
                      </span>
                    )}
                    <span className="text-alkota-orange group-hover:translate-x-1 transition-transform text-sm font-ibm-plex-mono">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
