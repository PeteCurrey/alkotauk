import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Wrench, 
  Flame, 
  Gauge, 
  Layers, 
  Activity, 
  Target, 
  RotateCcw, 
  ShieldAlert, 
  Filter, 
  Zap, 
  CheckCircle2, 
  Package, 
  Link2, 
  Cpu, 
  Plus, 
  ExternalLink,
  Phone,
  Truck,
  Sparkles
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/parts/ProductCard';
import SafeImage from '@/components/ui/SafeImage';

export const dynamic = 'force-dynamic';

const ICON_MAP: Record<string, React.ElementType> = {
  Gauge,
  Flame,
  Layers,
  Activity,
  Wrench,
  Target,
  RotateCcw,
  ShieldAlert,
  Filter,
  Zap,
  CheckCircle2,
  Package,
  Link2,
  Cpu,
  Plus,
};

export default async function PartsHomePage() {
  // Fetch categories
  const { data: dbCategories } = await supabaseAdmin
    .from('part_categories')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  // Fetch brand partners
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  // Fetch featured parts (fallback to first 8 active parts if no featured yet)
  let { data: featuredParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
    .eq('featured', true)
    .eq('active', true)
    .order('sort_order')
    .limit(8);

  if (!featuredParts || featuredParts.length === 0) {
    const { data: fallbackParts } = await supabaseAdmin
      .from('parts')
      .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine,featured,is_attachment')
      .eq('active', true)
      .order('sort_order')
      .limit(8);
    featuredParts = fallbackParts || [];
  }

  // Fetch newest parts
  const { data: newArrivals } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(6);

  // Fetch service kits
  const { data: serviceKits } = await supabaseAdmin
    .from('service_kits')
    .select('id,kit_number,name,slug,service_purpose,price,in_stock')
    .eq('active', true)
    .order('sort_order')
    .limit(3);

  const categories = dbCategories || [];
  const brands = dbBrands || [];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">

      {/* ── 01: EDITORIAL DEPARTMENT HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-between bg-[#0A0A0A] text-white px-6 sm:px-12 lg:px-24 pt-20 pb-16 overflow-hidden border-b border-[#222]">
        {/* Subtle grid and radial glow */}
        <div
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 80% 30%, rgba(255,105,0,0.09) 0%, transparent 60%),
                              radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          }}
        />
        <div 
          className="absolute right-0 bottom-0 select-none pointer-events-none font-extralight text-white opacity-[0.02] text-[18vw] leading-none tracking-tight"
          aria-hidden="true"
        >
          PARTS
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 bg-alkota-orange rounded-full animate-pulse" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#999]">
              Alkota UK // OEM Spares, Tooling &amp; High-Pressure Attachments
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.05] max-w-5xl mb-8">
            The Parts Department.{' '}
            <span className="text-alkota-orange font-normal italic block sm:inline">
              Engineered to fit. Built to run.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#AAA] font-normal leading-relaxed max-w-3xl mb-10">
            From factory-original triplex pump packings and Schedule 80 heating coils to Swiss-precision Mosmatic surface cleaners and Cox Reels industrial hose systems. Every component verified for severe industrial service.
          </p>

          {/* Live Search Bar inside Hero */}
          <div className="max-w-2xl bg-white p-2 mb-10 shadow-2xl">
            <form action="/parts-attachments/all" method="GET" className="flex items-center gap-2">
              <Search className="h-5 w-5 text-[#888] ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Search by part number (e.g. 20-001), pump model, Mosmatic, Cox Reels..."
                className="w-full bg-transparent text-alkota-black text-sm px-3 py-3 focus:outline-none font-normal"
              />
              <button
                type="submit"
                className="bg-alkota-orange hover:bg-alkota-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action Pathways */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/parts-attachments/all"
              className="inline-flex items-center gap-3 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Browse Full Catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/parts/machine"
              className="inline-flex items-center gap-3 border border-[#444] hover:border-white text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all bg-[#141414]"
            >
              Identify Parts by Machine Model
            </Link>
            <Link
              href="/parts-attachments/enquiry"
              className="inline-flex items-center gap-2 text-alkota-orange hover:text-white font-ibm-plex-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors"
            >
              Submit Parts Enquiry →
            </Link>
          </div>
        </div>

        {/* Hero Bottom Metric Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-[#222] pt-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Catalogue Breadth
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              500+ Components
            </span>
          </div>
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Partner Brands
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              5 Industry Leaders
            </span>
          </div>
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              OEM Assurance
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              100% Genuine Parts
            </span>
          </div>
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              UK Logistics
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              Next-Day Despatch
            </span>
          </div>
        </div>
      </section>


      {/* ── 02: BRAND PARTNERS LOGO ROW ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
              // Official Brand Partners &amp; Authorised Stockists
            </span>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888]">
              Select a brand to view dedicated catalogue
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { slug: 'alkota', name: 'Alkota OEM', tag: 'Factory Spares & Coils', origin: 'USA / UK' },
              { slug: 'mosmatic', name: 'Mosmatic', tag: 'Swiss Rotary Tooling', origin: 'Switzerland' },
              { slug: 'cox-reels', name: 'Cox Reels', tag: 'Heavy-Duty Hose Reels', origin: 'USA' },
              { slug: 'steel-eagle', name: 'Steel Eagle', tag: 'Surface Cleaners', origin: 'USA' },
              { slug: 'dual-pumps', name: 'Dual Pumps', tag: 'Industrial Pump Parts', origin: 'UK' },
            ].map((b) => (
              <Link
                key={b.slug}
                href={`/parts-attachments/brands/${b.slug}`}
                className="group p-5 bg-[#FAF9F5] border border-[#E8E8E4] hover:border-alkota-orange transition-all duration-200 no-underline flex flex-col justify-between"
              >
                <div>
                  <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#999] block mb-1">
                    {b.origin}
                  </span>
                  <h3 className="text-lg font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs text-[#666] mt-1 font-normal">
                    {b.tag}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE9E2] flex items-center justify-between text-xs text-[#888] group-hover:text-alkota-orange">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest">Browse Range</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── 03: CATEGORY GRID ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#F2F1EC] border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // System Taxonomy
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight">
                Browse by Component Category
              </h2>
              <p className="text-sm text-[#666] font-normal leading-relaxed mt-2 max-w-xl">
                Organised with engineering precision. Find high-pressure components, hydraulic assemblies, and service kits with zero clutter.
              </p>
            </div>

            <Link
              href="/parts-attachments/all"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors shrink-0"
            >
              <span>View All 15 Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const IconComponent = ICON_MAP[cat.icon_name || 'Wrench'] || Wrench;
              return (
                <Link
                  key={cat.slug}
                  href={`/parts-attachments/${cat.slug}`}
                  className="group bg-white p-6 border border-[#E8E8E4] hover:border-alkota-orange hover:shadow-sm transition-all no-underline flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 bg-[#FAF9F5] group-hover:bg-alkota-orange/10 flex items-center justify-center mb-4 transition-colors">
                      <IconComponent className="h-5 w-5 text-[#555] group-hover:text-alkota-orange transition-colors" />
                    </div>
                    <h3 className="text-sm font-normal text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#777] leading-relaxed line-clamp-2">
                      {cat.short_desc || 'High-pressure replacement components and spares.'}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F0EFEB] flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] group-hover:text-alkota-orange">
                      Explore →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── 04: FEATURED & POPULAR PARTS ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
              // High-Demand Stock
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight">
              Featured Components &amp; Fast Movers
            </h2>
            <p className="text-sm text-[#666] font-normal leading-relaxed mt-2">
              Our most frequently requested pumps, guns, surface cleaners, and rebuild kits ready for direct dispatch.
            </p>
          </div>

          <Link
            href="/parts-attachments/all"
            className="inline-flex items-center gap-2 bg-[#141414] hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shrink-0"
          >
            <span>Full Catalogue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {featuredParts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredParts.map((part) => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-[#E8E8E4]">
            <p className="text-sm text-[#888] font-mono">
              // Catalogue parts will be displayed here once seeded from Supabase.
            </p>
          </div>
        )}
      </section>


      {/* ── 05: SERVICE KITS SPOTLIGHT ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-y border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Preventative Maintenance
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl text-white tracking-tight">
                Factory Service &amp; Overhaul Kits
              </h2>
              <p className="text-sm text-[#AAA] font-normal leading-relaxed mt-2 max-w-xl">
                Pre-packaged maintenance sets containing all seals, valves, o-rings, and filters required for 500-hour and annual PPM service intervals.
              </p>
            </div>

            <Link
              href="/parts-attachments/service-kits"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-white hover:text-alkota-orange transition-colors shrink-0"
            >
              <span>View All Service Kits →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                kit: 'ALK-KIT-200',
                name: 'Annual Service Kit — 200 Series',
                desc: 'Includes primary fuel filter, inlet water mesh, burner electrode pair, atomising nozzle, and high-pressure unloader rebuild seals.',
                price: '£145.00',
                slug: 'annual-service-kit-200-series'
              },
              {
                kit: 'ALK-KIT-4000',
                name: 'Annual Service Kit — 4000 & XH4 Series',
                desc: 'Heavy-duty kit for high-volume commercial machines: 10-micron fuel water separator, Viton pump packing set, burner tuning kit, and safety burst disc.',
                price: '£175.00',
                slug: 'annual-service-kit-4000-series'
              },
              {
                kit: 'GP-TS2021-KIT',
                name: 'General Pump TS2021 Complete Overhaul',
                desc: 'Full triplex plunger rebuild set with 3x solid ceramic plungers, 6x stainless valve cages with O-rings, and complete V-packing assemblies.',
                price: '£89.00',
                slug: 'pump-rebuild-kit-ts2021'
              }
            ].map((k) => (
              <div key={k.kit} className="bg-[#141414] border border-[#262626] p-6 flex flex-col justify-between hover:border-alkota-orange transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider">
                      {k.kit}
                    </span>
                    <span className="bg-green-950/80 border border-green-800/50 text-green-400 font-ibm-plex-mono text-[9px] px-2 py-0.5 uppercase">
                      In Stock
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-white tracking-tight mb-2">
                    {k.name}
                  </h3>
                  <p className="text-xs text-[#999] leading-relaxed mb-6 font-normal">
                    {k.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222] flex items-center justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">
                      Price Ex VAT
                    </span>
                    <span className="font-ibm-plex-mono text-base text-white">
                      {k.price}
                    </span>
                  </div>
                  <Link
                    href={`/parts-attachments/enquiry?part=${k.kit}`}
                    className="inline-flex items-center gap-1.5 bg-alkota-orange hover:bg-white hover:text-black text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors no-underline"
                  >
                    <span>Enquire Kit</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 06: EDITORIAL BRAND SHOWCASES (Mosmatic & Cox Reels) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Mosmatic Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#666]">
                  Mosmatic Switzerland // Rotary Precision Tooling
                </span>
              </div>
              <h3 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight">
                Swiss rotary unions and surface cleaners built for extreme continuous pressure.
              </h3>
              <p className="text-sm text-[#666] leading-relaxed font-normal">
                Mosmatic is the undisputed world benchmark for high-RPM rotary pressure washing equipment. With maintenance-free Swiss stainless steel swivel unions rated up to 500 BAR and 120°C, Mosmatic surface cleaners eliminate zebra-striping and double operator cleaning speeds.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/parts-attachments/brands/mosmatic"
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Browse Mosmatic Tooling
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#E8E8E4] p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                  // Popular Mosmatic Lines
                </span>
                <div className="divide-y divide-[#EAE9E2]">
                  {[
                    { name: 'DL-UHD 46 Flat Surface Cleaner', spec: '500 BAR · 120°C · Stainless Steel Housing' },
                    { name: 'UC-E Undercarriage Wash System', spec: 'Multi-nozzle vehicle chassis wash rig' },
                    { name: 'DGV Live Swivels (3/8" & 1/2")', spec: 'High-RPM low-torque rotary unions' },
                    { name: 'TurboKing 6" Rotary Jet Nozzle', spec: 'Extreme pinpoint dirt & paint stripping' },
                  ].map((m) => (
                    <div key={m.name} className="py-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-normal text-alkota-black">{m.name}</h4>
                        <p className="text-xs text-[#777]">{m.spec}</p>
                      </div>
                      <Link href="/parts-attachments/brands/mosmatic" className="text-alkota-orange hover:text-alkota-black">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cox Reels Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-[#E8E8E4]">
            <div className="lg:col-span-6 order-2 lg:order-1 bg-[#FAF9F5] border border-[#E8E8E4] p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                  // Popular Cox Reels Series
                </span>
                <div className="divide-y divide-[#EAE9E2]">
                  {[
                    { name: '1125 Series Hand Crank Reels', spec: 'Direct crank · Solid 1-piece steel CNC hub' },
                    { name: '1175 Series Motorised 12V/240V', spec: 'Electric chain & sprocket power rewind' },
                    { name: 'Super Hub™ Dual-Axle Support', spec: 'Eliminates vibration & drum axle deflection' },
                    { name: 'Stainless Steel Fluid Path Options', spec: 'Safe for harsh detergents and de-icers' },
                  ].map((c) => (
                    <div key={c.name} className="py-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-normal text-alkota-black">{c.name}</h4>
                        <p className="text-xs text-[#777]">{c.spec}</p>
                      </div>
                      <Link href="/parts-attachments/brands/cox-reels" className="text-alkota-orange hover:text-alkota-black">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#666]">
                  Cox Reels USA // Industrial Hose Management
                </span>
              </div>
              <h3 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight">
                American heavy-duty hose reels engineered for the harshest wash bays and vehicle rigs.
              </h3>
              <p className="text-sm text-[#666] leading-relaxed font-normal">
                Manufactured in the USA since 1923, Cox Reels are standard equipment on Alkota bespoke trailer and van installations. Featuring CNC robotic welded heavy-gauge steel frames, proprietary CPC™ powder coating, and dual-axle Super Hub™ drum support.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/parts-attachments/brands/cox-reels"
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Explore Cox Reels
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ── 07: CAN'T FIND YOUR PART? ENQUIRY CTA ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-alkota-orange text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-white/80 block">
              // Direct Factory Sourcing
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl text-white tracking-tight">
              Can’t find the exact part or schematic number?
            </h2>
            <p className="text-white/90 text-sm leading-relaxed font-normal">
              Our engineering parts desk can trace components for any Alkota, General Pump, Cat Pump, or legacy cleaning system. Tell us your machine model or upload a photo of the data plate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="w-full sm:w-auto text-center bg-white text-alkota-black hover:bg-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-lg no-underline"
            >
              Submit Parts Enquiry
            </Link>
            <a
              href="tel:+441234567890"
              className="w-full sm:w-auto text-center border border-white text-white hover:bg-white hover:text-alkota-orange px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors no-underline"
            >
              Call 01234 567 890
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
