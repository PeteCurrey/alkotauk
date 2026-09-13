import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import CategoryCard from '@/components/parts/CategoryCard';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alkota UK Parts & Equipment Store | OEM Spares & Tooling',
  description: 'Official UK parts department for Alkota pressure washers, Mosmatic rotary surface cleaners, Cox Reels, General Pump triplex spares, and genuine OEM components.',
  openGraph: {
    title: 'Alkota UK Parts & Equipment Store',
    description: 'Next-day UK mainland despatch on genuine OEM pumps, coils, hoses, burners, and Swiss precision tooling.',
    url: 'https://alkota.co.uk/parts-attachments',
  },
};

export default async function PartsHomePage() {
  // 1. Fetch categories from Supabase with counts and hero images
  const { data: categories } = await supabaseAdmin
    .from('part_categories')
    .select('id, slug, name, short_desc, icon_name, sort_order, hero_image_url')
    .eq('active', true)
    .order('sort_order');

  // 2. Fetch verified purchasable parts with real prices
  const { data: featuredParts } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, sku, mpn, name, slug, category, brand, manufacturer, price, in_stock, availability_status, image_url, oem_genuine, description')
    .eq('active', true)
    .not('price', 'is', null)
    .gt('price', 0)
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .limit(8);

  // 3. Fetch verified brand partners
  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('id, slug, name, tagline, country_of_origin, description')
    .eq('active', true)
    .order('sort_order')
    .limit(8);

  // 4. Fetch live catalogue metrics
  const [{ count: totalPartsCount }, { count: inStockCount }] = await Promise.all([
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('active', true),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('active', true).eq('in_stock', true),
  ]);

  // Fallback to authoritative MASTER_TAXONOMY if categories not populated
  const catList = (categories && categories.length > 0)
    ? categories
    : MASTER_TAXONOMY.map((m, idx) => ({
        id: m.slug,
        slug: m.slug,
        name: m.name,
        short_desc: m.shortDesc,
        icon_name: m.iconName,
        sort_order: idx + 1,
        hero_image_url: null,
      }));

  const brandList = brands || [];
  const partsList = featuredParts || [];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1917] font-sans selection:bg-[#FF6900] selection:text-white">
      
      {/* ── 01: HERO SECTION WITH PROMINENT PARTS SEARCH ── */}
      <section className="relative bg-[#0F172A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#1E293B] overflow-hidden">
        {/* Background Image with Authentic Alkota Engineering Instrumentation */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/assets/parts/parts-hero-bg.jpg"
            alt="Alkota UK industrial pressure washer instrumentation and genuine parts"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right"
            style={{ filter: 'brightness(0.38) contrast(1.15)' }}
          />
          {/* Multi-stage gradients to guarantee text legibility while revealing the gauge instrumentation */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/70" />
          {/* Subtle engineering grid background overlay */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay" 
            style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E293B] border border-[#334155] rounded-[4px] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900] animate-pulse" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CBD5E1]">
              Alkota UK Parts &amp; Equipment Department
            </span>
          </div>

          <div className="max-w-3xl space-y-4 mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08]">
              Genuine Alkota Parts <br />
              <span className="italic font-normal text-[#FF6900]">&amp; Industrial Attachments</span>
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed max-w-2xl">
              Factory OEM components, General Pump assemblies, Swiss Mosmatic rotary tooling, and Cox Reels hose systems. Sourced, verified, and despatched next-day from the UK.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <form action="/parts-attachments/search" method="GET" className="max-w-2xl mb-10">
            <div className="flex items-stretch bg-white rounded-[5px] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#334155] focus-within:border-[#FF6900] transition-colors">
              <div className="flex items-center flex-1 px-3 gap-3">
                <Search className="w-5 h-5 text-[#64748B] shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search by part number, description, or SKU (e.g. 20-001, TS2021)..."
                  className="w-full bg-transparent text-[#0F172A] text-sm py-2.5 focus:outline-none placeholder-[#94A3B8] font-normal"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6900] hover:bg-[#E55D00] text-white font-ibm-plex-mono text-xs uppercase tracking-wider font-bold rounded-[4px] transition-all cursor-pointer shrink-0 shadow-sm"
              >
                Search Catalogue
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3 font-ibm-plex-mono text-[11px] text-[#94A3B8]">
              <span>Popular searches:</span>
              {['TS2021', '20-001', 'VRT3', 'Mosmatic 20"', 'Burner Electrode', 'Schedule 80 Coil'].map(term => (
                <Link
                  key={term}
                  href={`/parts-attachments/search?q=${encodeURIComponent(term)}`}
                  className="text-[#CBD5E1] hover:text-[#FF6900] underline decoration-[#475569] underline-offset-4 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </form>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1E293B]">
            {[
              { icon: Truck, title: 'Next-Day Despatch', desc: 'Mainland UK priority courier' },
              { icon: ShieldCheck, title: '100% OEM Genuine', desc: 'Factory guaranteed tolerances' },
              { icon: Layers, title: `${(totalPartsCount ?? 2560).toLocaleString()} Parts Active`, desc: 'Comprehensive UK inventory' },
              { icon: Clock, title: 'Technical Sourcing', desc: '24-hour turnaround on POA' },
            ].map(v => (
              <div key={v.title} className="flex items-start gap-3">
                <v.icon className="w-4 h-4 text-[#FF6900] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-semibold text-white tracking-tight">{v.title}</h2>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02: DATABASE CATEGORIES DIRECTORY ── */}
      <section className="py-20 sm:py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E8E6DF]/70 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-[#E8E6DF]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold block mb-1.5">
                // Equipment Catalogue Taxonomy
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#0F172A] tracking-tight">
                Browse by Equipment Department
              </h2>
            </div>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-wider text-[#64748B] hover:text-[#FF6900] transition-colors font-medium group"
            >
              <span>View All Departments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {catList.map((cat, idx) => (
              <CategoryCard key={cat.slug} category={cat} priority={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03: FEATURED VERIFIED OEM HARDWARE RUNWAY ── */}
      {partsList.length > 0 && (
        <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#F4F1EA] border-y border-[#E8E6DF]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#DDD8CD]">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold block mb-1">
                  // Verified Stock &amp; Pricing
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-[#0F172A] tracking-tight">
                  Featured Components &amp; Attachments
                </h2>
              </div>
              <span className="font-ibm-plex-mono text-xs text-[#64748B]">
                Immediate Online Checkout via Stripe · Next-Day Despatch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partsList.map(part => (
                <ProductCard key={part.id} part={part} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 04: BRAND PARTNERS DIRECTORY ── */}
      <section className="py-20 sm:py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-12 pb-5 border-b border-[#E8E6DF]">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold block mb-1.5">
            // Approved Manufacturers
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#0F172A] tracking-tight">
            Official Equipment &amp; Brand Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {brandList.map(brand => (
            <Link
              key={brand.slug}
              href={`/parts-attachments/brands/${brand.slug}`}
              className="group relative flex flex-col justify-between bg-white border border-[#E6E4DD] hover:border-[#CCC8BD] rounded-[5px] p-5 sm:p-6 shadow-[0_2px_6px_rgba(26,25,23,0.03),0_1px_2px_rgba(26,25,23,0.02)] hover:shadow-[0_10px_24px_-2px_rgba(26,25,23,0.07),0_3px_8px_-1px_rgba(26,25,23,0.04)] hover:-translate-y-1 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900] focus-visible:ring-offset-2 select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[15px] sm:text-base font-normal text-[#0F172A] group-hover:text-[#FF6900] transition-colors duration-300 tracking-tight">
                    {brand.name}
                  </span>
                  {brand.country_of_origin && (
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#94A3B8] bg-[#FAF9F5] border border-[#EAE8E1] px-2 py-0.5 rounded-[3px]">
                      {brand.country_of_origin}
                    </span>
                  )}
                </div>
                {brand.tagline && (
                  <p className="text-[11px] sm:text-xs text-[#64748B] font-light line-clamp-2 leading-relaxed mt-1">
                    {brand.tagline}
                  </p>
                )}
              </div>
              <div className="mt-5 pt-3 border-t border-[#F0EEE8] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#8A8780] group-hover:text-[#FF6900] transition-colors duration-300">
                  View Brand Range
                </span>
                <ArrowRight className="w-3 h-3 text-[#CBD5E1] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all duration-300 motion-reduce:transform-none" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 05: BESPOKE PARTS DESK & ENQUIRY CALLOUT ── */}
      <section className="px-6 sm:px-12 lg:px-24 pb-20 max-w-7xl mx-auto">
        <div className="bg-[#0F172A] text-white rounded-[8px] p-8 sm:p-12 relative overflow-hidden border border-[#1E293B] shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold block">
                // Sourcing Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                Can't find the exact part number for your Alkota?
              </h2>
              <p className="text-sm text-[#94A3B8] font-light leading-relaxed max-w-xl">
                Our UK engineering desk holds factory exploded schematics and parts diagrams for all current and legacy Alkota hot and cold pressure washers. Submit your machine model code or serial number and we will identify and quote the confirmed OEM replacement.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/parts-attachments/enquiry"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF6900] hover:bg-[#E55D00] text-white font-ibm-plex-mono text-xs uppercase tracking-wider font-bold rounded-[4px] transition-all shadow-sm text-center"
              >
                Submit Parts Enquiry
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/parts-attachments/finder"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1E293B] hover:bg-[#334155] text-white font-ibm-plex-mono text-xs uppercase tracking-wider font-semibold rounded-[4px] transition-all text-center border border-[#334155]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6900]" />
                Machine Spares Finder
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
