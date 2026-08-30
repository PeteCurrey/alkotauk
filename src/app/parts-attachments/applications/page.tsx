import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { COMPREHENSIVE_APPLICATIONS } from '@/lib/parts/seed-comprehensive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop Parts & Attachments by Industry Application | Alkota UK',
  description: 'Application-led discovery for vehicle cleaning, concrete restoration, agricultural washdown, drain jetting, and food hygiene washdown.',
};

export default async function ApplicationsDirectoryPage() {
  const { data: dbApps } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const apps = (dbApps && dbApps.length > 0) ? dbApps : COMPREHENSIVE_APPLICATIONS;

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
            <span className="text-alkota-orange">Shop by Application</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            Application-Led <span className="text-alkota-orange italic font-light">Discovery.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            The job defines the tooling. Browse equipment setups, rotating surface tools, chemical injectors, and specialist nozzles curated for your exact operating environment.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Parts Finder Wizard
            </Link>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#CCC] hover:text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333]"
            >
              Browse All Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10 INDUSTRIAL APPLICATIONS GRID ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app: any, idx: number) => (
              <Link
                key={app.slug}
                href={`/parts-attachments/applications/${app.slug}`}
                className="group bg-white border border-[#E8E8E4] hover:border-alkota-orange p-8 sm:p-10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                      // APP {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-ibm-plex-mono text-[#888] uppercase tracking-wider">
                      Specialist Tooling
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors mb-3">
                    {app.name}
                  </h2>

                  <p className="text-sm font-normal text-[#444] mb-4 leading-relaxed">
                    {app.tagline}
                  </p>

                  <p className="text-xs font-light text-[#666] leading-relaxed line-clamp-3 mb-6">
                    {app.editorial_intro}
                  </p>

                  <div className="p-3.5 bg-[#FAF9F5] border border-[#E8E8E4] font-ibm-plex-mono text-[11px] text-[#555]">
                    <span className="text-alkota-orange font-medium block mb-1 uppercase tracking-wider text-[9px]">
                      Recommended Setup:
                    </span>
                    <span>{app.recommended_specs}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F0EFEB] flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                    Equipment & Attachments
                  </span>
                  <span className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Application <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
