import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Search, Sparkles, ShieldCheck, Wrench, Award, ChevronRight } from 'lucide-react';
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

const EDITORIAL_APPLICATIONS = [
  { label: 'Commercial Fleet & Haulage Washdown', desc: 'Heavy vehicle washdown lances, non-marking hoses, and foam injectors.', href: '/parts-attachments/applications' },
  { label: 'Hard Surface & Flat Ground Restoration', desc: 'Mosmatic dual-arm rotary surface cleaners and undercarriage wash bars.', href: '/parts-attachments/applications' },
  { label: 'Agricultural & Farm Mud Clearance', desc: 'High-volume clay displacement nozzles, ceramic turbo tips, and live swivels.', href: '/parts-attachments/applications' },
  { label: 'Workshop Degreasing & Engine Overhaul', desc: 'Low-foaming chemical injectors, steam dump guns, and 150°C hoses.', href: '/parts-attachments/applications' },
  { label: 'Drain, Tube & Industrial Jetting', desc: 'Forward-firing retro jetting nozzles and flexible thermo-plastic lines.', href: '/parts-attachments/applications' },
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

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: CINEMATIC SHOWROOM HERO ── */}
      <ShowroomHero />

      {/* ── 02: 3 CORE PATHWAYS (EDITORIAL SPLIT) ── */}
      <section className="bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E8E4]">

            <Link
              href="/parts-attachments/categories"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors no-underline"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">01 / Category Range</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Shop by Component
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  Pumps, hoses, nozzles, guns, surface cleaners, burner heads, and everything in between.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors font-medium">
                <span>Explore all 16 categories</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-alkota-orange" />
              </div>
            </Link>

            <Link
              href="/parts-attachments/machines"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors no-underline"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">02 / Verified Fitment</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Find by Machine Model
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  Select your Alkota series or model code for guaranteed-compatible replacement parts and kits.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors font-medium">
                <span>Select your machine</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-alkota-orange" />
              </div>
            </Link>

            <Link
              href="/parts-attachments/brands"
              className="group flex flex-col justify-between px-10 py-14 hover:bg-[#FAF9F5] transition-colors no-underline"
            >
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA] block mb-5">03 / Manufacturing Partners</span>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Authorised Brands
                </h2>
                <p className="text-sm font-normal text-[#666] leading-relaxed max-w-xs">
                  {brands.length > 0
                    ? brands.slice(0, 4).map(b => b.name).join(' · ') + ' & more.'
                    : 'General Pump · Mosmatic · CoxREELS · Steel Eagle · Dual Pumps.'}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors font-medium">
                <span>Browse brand catalogue</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-alkota-orange" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── 03: FEATURED TOOLING SPOTLIGHT SHOWROOM ── */}
      <FeaturedToolingShowcase featuredParts={featuredParts} />

      {/* ── 04: CATEGORY SHOWROOM MODULES ── */}
      <ShowroomCategoryModules categories={MASTER_TAXONOMY} />

      {/* ── 05: MECHANICAL INTEGRITY & METALLURGY STANDARD ── */}
      <EngineeringIntegritySection />

      {/* ── 06: AUTHORISED BRAND DIRECTORY (CLEAN EDITORIAL) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#F5F4EF] text-alkota-black border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          {featuredBrand ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-7">
                <div className="flex items-center gap-3">
                  <span className="h-[1.5px] w-6 bg-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.22em] text-[#777] font-medium">
                    {featuredBrand.country_of_origin || 'International'} · Authorised Partner
                  </span>
                </div>
                <h2 className="font-extralight text-[#0A0A0A] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  {featuredBrand.name}
                </h2>
                {featuredBrand.tagline && (
                  <p className="text-alkota-orange font-light text-lg">{featuredBrand.tagline}</p>
                )}
                {featuredBrand.description && (
                  <p className="text-[#666] text-sm leading-relaxed font-normal max-w-md">
                    {featuredBrand.description}
                  </p>
                )}
                <Link
                  href={`/parts-attachments/brands/${featuredBrand.slug}`}
                  className="inline-flex items-center gap-3 bg-alkota-black hover:bg-alkota-orange text-white px-7 py-3.5 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors group font-medium"
                >
                  <span>View {featuredBrand.name} Catalogue</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-[#888] block mb-5 font-medium">
                  // Authorised Brand Partners
                </span>
                <div className="divide-y divide-[#E0DED8] bg-white border border-[#E0DED8]">
                  {brands.slice(0, 8).map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/parts-attachments/brands/${brand.slug}`}
                      className="flex items-center justify-between px-6 py-4 group hover:bg-[#FAF9F5] transition-all no-underline"
                    >
                      <div>
                        <span className="text-sm font-light text-[#0A0A0A] group-hover:text-alkota-orange transition-colors">
                          {brand.name}
                        </span>
                        {brand.country_of_origin && (
                          <span className="font-ibm-plex-mono text-[9px] text-[#888] ml-3 uppercase tracking-widest">
                            {brand.country_of_origin}
                          </span>
                        )}
                      </div>
                      <span className="text-[#888] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all text-sm">
                        →
                      </span>
                    </Link>
                  ))}
                  {brands.length > 8 && (
                    <Link
                      href="/parts-attachments/brands"
                      className="flex items-center gap-2 px-6 py-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-medium hover:underline"
                    >
                      View All {brands.length} Brand Partners <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-[#888] block">
                // Brand Partners
              </span>
              <p className="font-extralight text-[#0A0A0A] text-3xl">
                Authorised stockists for genuine industrial equipment.
              </p>
              <Link
                href="/parts-attachments/brands"
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-[11px] uppercase tracking-widest text-alkota-orange font-medium"
              >
                View All Brands <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 07: APPLICATION DISCOVERY ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-6">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-alkota-orange block mb-2 font-medium">
                // Operational Sectors
              </span>
              <h2 className="font-extralight text-[#0A0A0A] text-3xl sm:text-4xl uppercase tracking-tight">
                Tooling By Application.
              </h2>
            </div>
            <Link
              href="/parts-attachments/applications"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#666] hover:text-alkota-orange transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span>Explore All Applications</span>
              <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
            </Link>
          </div>

          <div className="divide-y divide-[#E8E8E4]">
            {EDITORIAL_APPLICATIONS.map((app, idx) => (
              <Link
                key={app.label + idx}
                href={app.href}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 hover:pl-3 transition-all gap-2 md:gap-8 no-underline"
              >
                <div className="flex items-baseline gap-6 min-w-0">
                  <span className="font-ibm-plex-mono text-[10px] text-[#BBB] shrink-0 font-medium">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-[#0A0A0A] group-hover:text-alkota-orange transition-colors">
                      {app.label}
                    </h3>
                    <p className="text-xs text-[#777] font-normal mt-0.5">{app.desc}</p>
                  </div>
                </div>
                <span className="text-alkota-orange group-hover:translate-x-1 transition-transform text-lg shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 08: PARTS DESK & ENQUIRY CTA (LIGHT WARM STONE) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 bg-white border border-[#E8E8E4] p-10 sm:p-14 shadow-sm">
          <div className="max-w-2xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-alkota-orange block mb-3 font-medium">
              // Technical Parts Helpdesk
            </span>
            <h2 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Can't locate the exact part number?
            </h2>
            <p className="text-[#666] text-sm leading-relaxed font-normal max-w-xl">
              Our UK engineering parts desk traces components for any Alkota, General Pump, CAT Pump, or legacy industrial system. Share your machine model or data plate photo for a direct quote in 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal w-full lg:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="text-center bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors font-medium whitespace-nowrap"
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
