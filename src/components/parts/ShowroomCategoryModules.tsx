'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { MASTER_TAXONOMY, PartCategoryDefinition } from '@/lib/parts/taxonomy';

interface Props {
  categories?: PartCategoryDefinition[];
}

export default function ShowroomCategoryModules({ categories = MASTER_TAXONOMY }: Props) {
  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Equipment Directory
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Shop by component.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Every part, assembly, and attachment organized by task. Direct-fit spares, Swiss rotary tooling, and heavy-duty hose management.
            </p>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors font-medium"
            >
              <span>View all 16 categories index</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
            </Link>
          </div>
        </div>

        {/* ── ASYMMETRICAL RUNWAY ── */}
        <div className="space-y-12">
          
          {/* 1. HERO WIDE BAND: HOSES & HOSE REELS */}
          <div className="bg-white border border-[#E8E8E4] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888]">
                01 / High-Pressure Hose Management
              </span>
              <h3 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase leading-tight">
                Hoses, Swivels &amp; Heavy-Duty Reels
              </h3>
              <p className="text-sm text-[#555] font-normal leading-relaxed max-w-md">
                Twin-wire steel braided washdown hoses rated from 300 to 600 Bar, non-marking grey options, and Cox Reels all-steel manual and spring rewind assemblies.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {['3/8" 300 Bar Hoses', 'Spring-Rewind Cox Reels', 'Non-Marking Hoses', '360° Live Swivels'].map((sub) => (
                  <span key={sub} className="font-ibm-plex-mono text-[10px] text-[#666] bg-[#F5F4EF] px-3 py-1">
                    {sub}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/parts-attachments/hoses"
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  <span>Explore Hose Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[280px]">
              <img
                src="/assets/products/high-pressure-hose.png"
                alt="High Pressure Hoses and Cox Reels"
                className="max-h-[300px] w-auto object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 2. DUAL EDITORIAL SPLIT: SURFACE CLEANERS & PUMPS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Split 1: Surface Cleaners */}
            <div className="bg-white border border-[#E8E8E4] p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888]">
                    02 / Rotary Surface Cleaners
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-medium">
                    Mosmatic &amp; Steel Eagle
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-[#FAF9F5] flex items-center justify-center p-6">
                  <img
                    src="/assets/products/whirl-away-surface-cleaner.png"
                    alt="Rotary Flat Surface Cleaners"
                    className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight uppercase mb-2">
                    Flat Surface &amp; Undercarriage Cleaners
                  </h4>
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    12" to 30" stainless steel rotary tooling designed to blast parking lots, depot aprons, and vehicle chassis in a single pass.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase">From £185.00 ex VAT</span>
                <Link
                  href="/parts-attachments/surface-cleaners"
                  className="font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Browse Range</span>
                  <ChevronRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            </div>

            {/* Split 2: Pumps & Packings */}
            <div className="bg-white border border-[#E8E8E4] p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888]">
                    03 / Triplex Pumps &amp; Seal Kits
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-medium">
                    General Pump &amp; CAT
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-[#FAF9F5] flex items-center justify-center p-6">
                  <img
                    src="/assets/products/industrial-pump.png"
                    alt="High-Pressure Triplex Pumps"
                    className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight uppercase mb-2">
                    Pumps, Ceramic Plungers &amp; Valves
                  </h4>
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    Complete replacement pump assemblies, solid alumina ceramic plunger rods, V-packings, and check valve overhaul kits.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase">Kits From £28.00 ex VAT</span>
                <Link
                  href="/parts-attachments/pumps"
                  className="font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Browse Range</span>
                  <ChevronRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            </div>

          </div>

          {/* 3. FOUR-COLUMN TYPOGRAPHIC STRIP (Guns, Nozzles, Burners, Chemicals) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '04',
                title: 'Spray Guns & Lances',
                desc: 'Alkota Easy-Pull handles, 1000mm insulated lances, and high-temp steam dump guns.',
                href: '/parts-attachments/trigger-guns',
                price: 'From £28.00'
              },
              {
                number: '05',
                title: 'Nozzles & Turbo Tips',
                desc: 'Quick-release colour-coded fan tips, ceramic dirt-killers, and chemical foam cannons.',
                href: '/parts-attachments/lances-nozzles',
                price: 'From £5.50'
              },
              {
                number: '06',
                title: 'Burners & Heating Coils',
                desc: 'Beckett AFG heads, ignition transformers, and Schedule 80 continuous coils.',
                href: '/parts-attachments/burners',
                price: 'Genuine OEM'
              },
              {
                number: '07',
                title: 'Cleaning Chemistry',
                desc: 'RoadForce touchless TFR, heavy degreasers, aluminium deoxidisers, and descaling acid.',
                href: '/parts-attachments/chemicals',
                price: 'From £28.50'
              }
            ].map((col) => (
              <Link
                key={col.number}
                href={col.href}
                className="bg-white border border-[#E8E8E4] hover:border-black p-8 flex flex-col justify-between space-y-6 transition-colors group no-underline"
              >
                <div className="space-y-3">
                  <span className="font-ibm-plex-mono text-xs text-[#888] block font-light">
                    SECTION {col.number}
                  </span>
                  <h4 className="text-xl font-light text-[#0A0A0A] tracking-tight uppercase group-hover:text-alkota-orange transition-colors">
                    {col.title}
                  </h4>
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    {col.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between font-ibm-plex-mono text-xs">
                  <span className="text-[#888] text-[10px]">{col.price}</span>
                  <span className="text-alkota-black group-hover:text-alkota-orange uppercase tracking-wider font-medium flex items-center gap-1">
                    <span>Shop</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
