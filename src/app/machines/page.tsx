import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import MachineCard from '@/components/MachineCard';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Sliders } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Industrial Pressure Washing Fleet & Catalogue | Alkota UK',
  description: 'Explore the complete 127-machine Alkota fleet. Hot water, cold water, industrial steam, mobile trailers, and bespoke wash systems.',
};

export default async function MachinesPage() {
  // Fetch all machines from Supabase products table
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order');
    
  const machines = data || [];
  
  // Unique categories from real data
  const categories = Array.from(new Set((machines || []).map((m: any) => m.category))).map(cat => {
    const slug = cat === 'parts-washer' ? 'parts-washers' : cat as string;
    return {
      name: (slug as string).replace('-', ' '),
      slug
    };
  });

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal pb-0">
      <Navigation />

      {/* ── 01. FULL-SCREEN CINEMATIC HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between bg-[#0A0A08] text-white px-6 sm:px-12 pt-32 pb-16 overflow-hidden border-b border-[#222]">
        {/* Background Image / Ambient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center scale-105"
            style={{ 
              backgroundImage: 'url(/assets/hero-home-header.jpg)',
              filter: 'brightness(0.45) contrast(1.15)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-black/60" />
        </div>

        {/* Top Breadcrumbs */}
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Fleet & Catalogue' }]} />
        </div>

        {/* Hero Centrepiece */}
        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-alkota-orange">
                THE 127-MACHINE INDUSTRIAL FLEET
              </span>
            </div>

            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
            >
              Industrial <br />
              <span className="text-alkota-orange">Command.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#CCC] leading-relaxed max-w-2xl mb-10 font-light">
              The definitive standard in industrial cleaning. From continuous-duty hot water skids and high-flow cold water systems to saturated dry steam and turnkey road trailers.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-3 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 text-xs font-medium uppercase tracking-widest transition-all shadow-xl no-underline"
              >
                <span>Browse Full Fleet Below</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <Link
                href="/tools/machine-match"
                className="inline-flex items-center gap-2 border border-white/25 bg-black/40 text-white px-6 py-4 text-xs font-medium uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all backdrop-blur-sm no-underline"
              >
                <Sliders className="h-4 w-4 text-alkota-orange" />
                <span>Launch Machine Matcher</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Category Quick-Jump Strip */}
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <Link href="/machines/hot-water" className="p-4 bg-white/5 hover:bg-alkota-orange/20 border border-white/10 hover:border-alkota-orange transition-all no-underline text-white block">
              <span className="text-[10px] text-alkota-orange uppercase block mb-1">01 · THERMAL</span>
              <span className="text-sm uppercase font-light">Hot Water Washers →</span>
            </Link>
            <Link href="/machines/cold-water" className="p-4 bg-white/5 hover:bg-alkota-orange/20 border border-white/10 hover:border-alkota-orange transition-all no-underline text-white block">
              <span className="text-[10px] text-alkota-orange uppercase block mb-1">02 · HIGH-FLOW</span>
              <span className="text-sm uppercase font-light">Cold Water Washers →</span>
            </Link>
            <Link href="/machines/steam" className="p-4 bg-white/5 hover:bg-alkota-orange/20 border border-white/10 hover:border-alkota-orange transition-all no-underline text-white block">
              <span className="text-[10px] text-alkota-orange uppercase block mb-1">03 · SANITATION</span>
              <span className="text-sm uppercase font-light">Steam Cleaners →</span>
            </Link>
            <Link href="/trailers" className="p-4 bg-white/5 hover:bg-alkota-orange/20 border border-white/10 hover:border-alkota-orange transition-all no-underline text-white block">
              <span className="text-[10px] text-alkota-orange uppercase block mb-1">04 · MOBILE</span>
              <span className="text-sm uppercase font-light">Trailer Rigs →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02. FULL CATALOGUE GRID ────────────────────────────────────────── */}
      <section id="catalogue" className="py-24 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#E0E0DC]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                COMPLETE INVENTORY
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black">
                All Available Models ({machines.length})
              </h2>
            </div>
            <p className="text-xs font-mono text-[#888] uppercase tracking-wider">
              Engineered in Alcester, SD · Backed Across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine: any) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
