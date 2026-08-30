'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, ShieldCheck, Flame, Wrench } from 'lucide-react';
import { MASTER_TAXONOMY, PartCategoryDefinition } from '@/lib/parts/taxonomy';

interface Props {
  categories?: PartCategoryDefinition[];
}

export default function ShowroomCategoryModules({ categories = MASTER_TAXONOMY }: Props) {
  const primaryCategories = [
    {
      slug: 'surface-cleaners',
      name: 'Rotary Surface Cleaners',
      number: '01',
      tagline: 'Swiss-machined stainless steel flat surface cleaners & undercarriage wash tooling.',
      highlight: 'Up to 24" Cleaning Path · 275 Bar',
      link: '/parts-attachments/surface-cleaners',
      image: '/assets/products/surface-cleaner.png',
      backdrop: '/assets/parts/parts-hero-workshop.jpg',
      subcategories: ['Flat Surface Cleaners', 'Undercarriage Washers', 'Rotary Swivels', 'Spray Arms']
    },
    {
      slug: 'hoses',
      name: 'Hoses & Industrial Reels',
      number: '02',
      tagline: 'Twin-wire steel braided hydraulic washdown hoses & Cox Reels spring rewind systems.',
      highlight: '300–600 Bar Rating · 155°C Steam',
      link: '/parts-attachments/hoses',
      image: '/assets/products/hose-reel.png',
      backdrop: '/assets/engineered-continuous-duty.jpg',
      subcategories: ['Steel Braided 3/8" Hoses', 'Spring-Rewind Cox Reels', 'Non-Marking Hoses', 'Swivels']
    },
    {
      slug: 'pumps',
      name: 'Pumps & Ceramic Packing',
      number: '03',
      tagline: 'General Pump & CAT Pump triplex assemblies with solid ceramic plungers and brass manifolds.',
      highlight: '100% Solid Alumina Ceramic',
      link: '/parts-attachments/pumps',
      image: '/assets/products/420x4.png',
      backdrop: '/assets/hot-water-gauge-hero.jpg',
      subcategories: ['General Pump TS2021', 'CAT Pumps 5CP', 'V-Packing Kits', 'Plunger Sleeves']
    },
    {
      slug: 'lances-nozzles',
      name: 'Lances & Turbo Nozzles',
      number: '04',
      tagline: 'Insulated stainless double lances, ceramic rotating dirt killers & tungsten spray tips.',
      highlight: 'Vented Grips · Hardened Tips',
      link: '/parts-attachments/lances-nozzles',
      image: '/assets/products/lance-nozzle.png',
      backdrop: '/assets/products/216bd2.png',
      subcategories: ['Vented Lances', 'Ceramic Turbo Nozzles', 'Colour-Coded QC Tips', 'Dual Lances']
    },
    {
      slug: 'burners',
      name: 'Burners & Schedule 80 Coils',
      number: '05',
      tagline: 'Beckett and Riello oil burners, ignition transformers & continuous-duty heating coils.',
      highlight: 'Schedule 80 Steel · 7-Yr Warranty',
      link: '/parts-attachments/burners',
      image: '/assets/products/coil-burner.png',
      backdrop: '/assets/engineered-continuous-duty.jpg',
      subcategories: ['Schedule 80 Coils', 'Beckett AFG Heads', 'Ignition Transformers', 'Fuel Pumps']
    },
    {
      slug: 'trigger-guns',
      name: 'Trigger Guns & Steam Dumps',
      number: '06',
      tagline: 'Suttner and Alkota Easy-Pull washdown guns with stainless steel valve seats.',
      highlight: 'Fatigue-Reducing · 150°C Rated',
      link: '/parts-attachments/trigger-guns',
      image: '/assets/products/trigger-gun.png',
      backdrop: '/assets/products/216x4.png',
      subcategories: ['Alkota Easy-Pull', 'Suttner ST-1500', 'Steam Dump Guns', 'Swivel Inlets']
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E0DEDC] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Precision Taxonomy
            </span>
            <h2 
              className="font-extralight text-alkota-black tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Component Architecture.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-sm text-[#666] font-light leading-relaxed">
              Every assembly organized with engineering precision. Direct-fit spares, Swiss rotary tooling, and industrial accessories categorized by operational task.
            </p>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs text-alkota-orange hover:text-black uppercase tracking-wider transition-colors font-medium"
            >
              <span>View Complete 16-Category Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── ARCHITECTURAL RUNWAY MODULES (No Box Farm) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {primaryCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.link}
              className="group flex flex-col justify-between bg-white border border-[#E8E8E4] hover:border-black transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl no-underline"
            >
              {/* Category Visual Canvas */}
              <div className="relative aspect-[16/11] bg-[#0E0E0C] p-8 overflow-hidden flex flex-col justify-between">
                
                {/* Background Photography with Depth */}
                <img
                  src={cat.backdrop}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale group-hover:scale-108 group-hover:opacity-40 transition-all duration-700 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0C] via-transparent to-black/60 pointer-events-none" />

                {/* Top Number & Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-xs font-light text-white/90 tracking-widest">
                    SECTION {cat.number}
                  </span>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-black/70 px-2.5 py-0.5 border border-alkota-orange/30">
                    OEM Verified
                  </span>
                </div>

                {/* Bottom Spec Callout */}
                <div className="relative z-10">
                  <span className="font-ibm-plex-mono text-[10px] text-white/90 uppercase tracking-widest block font-medium">
                    {cat.highlight}
                  </span>
                </div>
              </div>

              {/* Category Body with Negative Space */}
              <div className="p-8 flex flex-col justify-between flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors uppercase mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed font-light">
                    {cat.tagline}
                  </p>

                  {/* Sub-Assembly Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {cat.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="font-ibm-plex-mono text-[9px] text-[#777] bg-[#F5F4F0] px-2 py-0.5 uppercase tracking-wider"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-[#F0EFEB] flex items-center justify-between text-xs font-ibm-plex-mono">
                  <span className="text-[#888] uppercase tracking-wider group-hover:text-black transition-colors font-medium">
                    Explore Component Range
                  </span>
                  <div className="h-8 w-8 rounded-full bg-[#0A0A0A] group-hover:bg-alkota-orange text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
