import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, ArrowRight, ShieldCheck, Flame, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  COMPREHENSIVE_MACHINE_FAMILIES,
  COMPREHENSIVE_MACHINE_MODELS,
} from '@/lib/parts/seed-comprehensive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop Parts by Machine Model & Series | Alkota UK',
  description: 'Find guaranteed compatible pumps, coils, burners, hoses, and service kits for your exact Alkota pressure washer model.',
};

export default async function MachineDiscoveryPage() {
  const { data: dbFamilies } = await supabaseAdmin
    .from('machine_families')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const { data: dbModels } = await supabaseAdmin
    .from('machine_models')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const families = (dbFamilies && dbFamilies.length > 0) ? dbFamilies : COMPREHENSIVE_MACHINE_FAMILIES;
  const models = (dbModels && dbModels.length > 0) ? dbModels : COMPREHENSIVE_MACHINE_MODELS;

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
            <span className="text-alkota-orange">Shop by Machine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            Find Parts for <span className="text-alkota-orange italic font-light">Your Machine.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            Select your Alkota machine family and model to view guaranteed 100% OEM compatible replacement pumps, heating coils, burner electrodes, hoses, trigger handles, and scheduled service kits.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Identify by Serial Number
            </Link>
            <Link
              href="/support/replacement-parts"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#CCC] hover:text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all border border-[#333]"
            >
              Interactive Exploded Diagrams →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MACHINE FAMILIES & MODELS SECTION ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          {families.map((fam: any) => {
            const famModels = models.filter((m: any) => m.series === fam.name || m.family_slug === fam.slug || m.name.includes(fam.name.split(' ')[0]));

            return (
              <div key={fam.slug} className="bg-white border border-[#E8E8E4] p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F0EFEB]">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      // {fam.manufacturer || 'Alkota'} Machine Family
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-light text-alkota-black tracking-tight">
                      {fam.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#666] font-light max-w-xl mt-1">
                      {fam.description}
                    </p>
                  </div>
                  <div className="font-ibm-plex-mono text-xs text-[#888] uppercase tracking-wider">
                    {famModels.length} Models Supported
                  </div>
                </div>

                {/* Models Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  {famModels.map((m: any) => (
                    <Link
                      key={m.slug}
                      href={`/parts-attachments/machines/alkota/${m.slug}`}
                      className="group bg-[#FAF9F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange p-5 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-ibm-plex-mono text-xs font-normal text-alkota-orange">
                            Model {m.model_code}
                          </span>
                          <span className="text-[9px] font-ibm-plex-mono bg-white border border-[#DDD] px-2 py-0.5 text-[#555]">
                            {m.power_source || 'Electric'}
                          </span>
                        </div>
                        <h3 className="text-base font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                          {m.name}
                        </h3>
                        <p className="text-xs text-[#666] font-light mt-1 line-clamp-2">
                          {m.specs_summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#EAEAE6] flex items-center justify-between">
                        <span className="text-[10px] font-ibm-plex-mono text-[#888] uppercase tracking-wider">
                          Compatible Spares
                        </span>
                        <span className="text-xs font-ibm-plex-mono text-alkota-orange flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Parts <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
