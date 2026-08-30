import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Parts & Components Master Taxonomy | Alkota UK',
  description: 'Browse the complete catalogue of industrial pressure washing pumps, heating coils, burners, hoses, guns, and precision attachments.',
};

export default async function MasterCategoriesPage() {
  // Fetch real counts from DB only
  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('category')
    .eq('active', true);

  const categoryCounts: Record<string, number> = {};
  (parts || []).forEach((p) => {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
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
            <span className="text-alkota-orange">All Categories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            The Full <span className="text-alkota-orange italic font-light">Range.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            Complete catalogue depth across industrial pressure washing pumps, Schedule 80 hydro-insulated coils, high-pressure hose management, and precision rotary attachments.
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

      {/* ── EDITORIAL CATEGORY ROWS (No Box Farm) ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto divide-y divide-[#E0DEDC]">
          {MASTER_TAXONOMY.map((cat, idx) => {
            const count = categoryCounts[cat.slug] || 0;

            return (
              <div key={cat.slug} className="py-10 group">
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
                  {/* Left: Index + Title + Description */}
                  <div className="flex items-baseline gap-6 lg:w-5/12 min-w-0">
                    <span className="font-ibm-plex-mono text-[10px] text-[#BBB] shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <Link href={`/parts-attachments/${cat.slug}`} className="no-underline">
                        <h2 className="text-2xl sm:text-3xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                          {cat.name}
                        </h2>
                      </Link>
                      {cat.shortDesc && (
                        <p className="text-sm text-[#666] font-light mt-1.5 leading-relaxed max-w-xl">
                          {cat.shortDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Subcategories + Real Count + Action */}
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 lg:justify-end lg:w-6/12">
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-start lg:justify-end">
                      {cat.subcategories.slice(0, 6).map((sub, si) => (
                        <React.Fragment key={sub.slug}>
                          <Link
                            href={`/parts-attachments/${cat.slug}?sub=${sub.slug}`}
                            className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors whitespace-nowrap"
                          >
                            {sub.name}
                          </Link>
                          {si < Math.min(5, cat.subcategories.length - 1) && (
                            <span className="text-[#D0CEC9] text-[10px]" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                      {cat.subcategories.length > 6 && (
                        <Link
                          href={`/parts-attachments/${cat.slug}`}
                          className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange"
                        >
                          +{cat.subcategories.length - 6} more
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0 mt-2 lg:mt-0">
                      {count > 0 && (
                        <span className="font-ibm-plex-mono text-[9px] text-[#999]">
                          {count} {count === 1 ? 'part' : 'parts'}
                        </span>
                      )}
                      <Link
                        href={`/parts-attachments/${cat.slug}`}
                        className="text-alkota-orange group-hover:translate-x-1 transition-transform text-lg inline-block"
                        aria-label={`Browse ${cat.name}`}
                      >
                        →
                      </Link>
                    </div>
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
