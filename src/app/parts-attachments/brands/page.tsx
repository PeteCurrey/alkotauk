import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Building2, ArrowRight, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { COMPREHENSIVE_BRANDS } from '@/lib/parts/seed-comprehensive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Authorized Brand Partners & Manufacturers | Alkota UK',
  description: 'Shop genuine pressure washing pumps, reels, valves, and attachments from Alkota, Mosmatic, Giant Pumps, Interpump, General Pump, CoxREELS, and Steel Eagle.',
};

export default async function BrandsDirectoryPage() {
  // Fetch dynamic brands from DB or fallback
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const brands = (dbBrands && dbBrands.length > 0) ? dbBrands : COMPREHENSIVE_BRANDS;

  // Fetch product counts per brand
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
      <section className="bg-[#0A0A0A] text-white py-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
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
            <span className="flex items-center gap-1.5 bg-[#141414] border border-[#282828] px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-alkota-orange" />
              100% Genuine OEM Sourced
            </span>
            <span className="flex items-center gap-1.5 bg-[#141414] border border-[#282828] px-3 py-1.5">
              <Globe className="w-3.5 h-3.5 text-alkota-orange" />
              Global Tier-1 Engineering
            </span>
          </div>
        </div>
      </section>

      {/* ── BRANDS DIRECTORY GRID ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand: any) => {
              const count = brandCounts[brand.slug] || 0;

              return (
                <Link
                  key={brand.slug}
                  href={`/parts-attachments/brands/${brand.slug}`}
                  className="group bg-white border border-[#E8E8E4] hover:border-alkota-orange p-8 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                          {brand.country_of_origin || 'International'}
                        </span>
                        <h2 className="text-2xl font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors">
                          {brand.name}
                        </h2>
                      </div>
                      <div className="h-10 w-10 bg-[#FAF9F5] border border-[#E8E8E4] flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-[#888] group-hover:text-alkota-orange transition-colors" />
                      </div>
                    </div>

                    <p className="text-xs font-normal text-[#555] mb-2 leading-relaxed">
                      {brand.tagline}
                    </p>
                    <p className="text-xs font-light text-[#777] line-clamp-3 leading-relaxed">
                      {brand.description || `Specialist pressure washing components and genuine spares from ${brand.name}.`}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F0EFEB] flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                      {count > 0 ? `${count} Components in Stock` : 'Catalogue Available'}
                    </span>
                    <span className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Browse Brand <ArrowRight className="w-3 h-3" />
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
