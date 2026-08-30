import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Wrench, 
  Gauge, 
  Activity, 
  Target, 
  RotateCcw, 
  Layers, 
  Link2, 
  Flame, 
  Zap, 
  Cpu, 
  Filter, 
  Package,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Parts & Components Master Taxonomy | Alkota UK',
  description: 'Browse the complete catalogue of industrial pressure washing pumps, heating coils, burners, hoses, guns, and precision attachments.',
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Gauge: <Gauge className="w-6 h-6 text-alkota-orange" />,
  Activity: <Activity className="w-6 h-6 text-alkota-orange" />,
  Wrench: <Wrench className="w-6 h-6 text-alkota-orange" />,
  Target: <Target className="w-6 h-6 text-alkota-orange" />,
  RotateCcw: <RotateCcw className="w-6 h-6 text-alkota-orange" />,
  Layers: <Layers className="w-6 h-6 text-alkota-orange" />,
  Link2: <Link2 className="w-6 h-6 text-alkota-orange" />,
  Flame: <Flame className="w-6 h-6 text-alkota-orange" />,
  Zap: <Zap className="w-6 h-6 text-alkota-orange" />,
  Cpu: <Cpu className="w-6 h-6 text-alkota-orange" />,
  Filter: <Filter className="w-6 h-6 text-alkota-orange" />,
  Package: <Package className="w-6 h-6 text-alkota-orange" />,
};

export default async function MasterCategoriesPage() {
  // Fetch dynamic categories count from parts table if available
  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('category')
    .eq('active', true);

  const categoryCounts: Record<string, number> = {};
  (parts || []).forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24">
      {/* ── HEADER HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">All Categories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            Master Component <span className="text-alkota-orange italic font-light">Taxonomy.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            Complete catalogue depth across 13 core industrial engineering categories and over 100 specialised subcategories. Sourced, verified, and stocked for rapid UK delivery.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use Parts Finder Wizard
            </Link>
            <Link
              href="/parts-attachments/brands"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#CCC] hover:text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333]"
            >
              Shop by Brand Partner →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 13 MASTER CATEGORIES GRID ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          {MASTER_TAXONOMY.map((cat, idx) => {
            const count = categoryCounts[cat.slug] || 0;

            return (
              <div
                key={cat.slug}
                className="bg-white border border-[#E8E8E4] p-8 sm:p-10 transition-all hover:border-[#CCC]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-[#F0EFEB]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FAF9F5] border border-[#E8E8E4] shrink-0">
                      {ICON_MAP[cat.iconName] || <Wrench className="w-6 h-6 text-alkota-orange" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest">
                          // CAT {String(idx + 1).padStart(2, '0')}
                        </span>
                        {count > 0 && (
                          <span className="font-ibm-plex-mono text-[9px] bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 text-[#666]">
                            {count} Parts Listed
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-light text-alkota-black tracking-tight">
                        {cat.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#666] font-light max-w-2xl mt-1">
                        {cat.shortDesc}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/parts-attachments/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono text-alkota-orange hover:underline uppercase tracking-widest shrink-0 self-start lg:self-center"
                  >
                    <span>View Category ({cat.subcategories.length} Subcategories)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subcategories Pills Grid */}
                <div className="pt-6">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] block mb-3">
                    Subcategories & Component Groups:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/parts-attachments/${cat.slug}?sub=${sub.slug}`}
                        className="group p-3 bg-[#FAF9F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all flex flex-col justify-between"
                      >
                        <span className="text-xs font-normal text-alkota-black group-hover:text-alkota-orange transition-colors">
                          {sub.name}
                        </span>
                        {sub.shortDesc && (
                          <span className="text-[10px] text-[#777] font-light mt-1 line-clamp-1">
                            {sub.shortDesc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
