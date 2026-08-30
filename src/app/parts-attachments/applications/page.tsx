import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
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

      {/* ── EDITORIAL APPLICATIONS STRIP (No Box Farm) ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto divide-y divide-[#E0DEDC]">
          {apps.map((app: any, idx: number) => (
            <Link
              key={app.slug}
              href={`/parts-attachments/applications/${app.slug}`}
              className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 py-10 group hover:bg-[#F2F1EC] -mx-4 px-4 transition-colors no-underline"
            >
              {/* Index & Title */}
              <div className="flex items-baseline gap-6 lg:w-5/12 min-w-0">
                <span className="font-ibm-plex-mono text-[10px] text-[#BBB] shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {app.name}
                  </h2>
                  {app.tagline && (
                    <p className="text-sm text-[#555] font-normal mt-1 leading-relaxed">
                      {app.tagline}
                    </p>
                  )}
                  {app.editorial_intro && (
                    <p className="text-xs text-[#777] font-light mt-2 leading-relaxed line-clamp-2 max-w-xl">
                      {app.editorial_intro}
                    </p>
                  )}
                </div>
              </div>

              {/* Recommended Spec & Action */}
              <div className="lg:w-6/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:pl-8">
                {app.recommended_specs ? (
                  <div className="font-ibm-plex-mono text-[11px] text-[#777]">
                    <span className="text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                      Recommended Spec:
                    </span>
                    <span>{app.recommended_specs}</span>
                  </div>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Explore Tooling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
