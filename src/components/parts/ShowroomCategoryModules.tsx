'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, Wrench, ShieldCheck, Flame, RotateCcw, Droplets } from 'lucide-react';
import { MASTER_TAXONOMY, PartCategoryDefinition } from '@/lib/parts/taxonomy';

interface Props {
  categories?: PartCategoryDefinition[];
}

export default function ShowroomCategoryModules({ categories = MASTER_TAXONOMY }: Props) {
  // Select top 6 flagship categories to showcase as large visual modules
  const primaryCategories = [
    {
      slug: 'surface-cleaners',
      name: 'Rotary Surface Cleaners & Undercarriage Tooling',
      shortName: 'Surface Cleaners',
      number: '01',
      tagline: 'Swiss-machined stainless steel flat surface cleaners & vehicle undercarriage wash bars.',
      highlight: 'Up to 24" Cleaning Path · 275 Bar Rated',
      link: '/parts-attachments/surface-cleaners',
      image: '/assets/products/surface-cleaner.png',
      fallbackImage: '/assets/parts/parts-hero-workshop.jpg',
      subcategories: ['Flat Surface Cleaners', 'Undercarriage Washers', 'Rotary Swivels', 'Replacement Spray Arms', 'Castor Wheel Kits']
    },
    {
      slug: 'hoses',
      name: 'High-Pressure Hoses & Industrial Reels',
      shortName: 'Hoses & Reels',
      number: '02',
      tagline: 'Twin-wire steel braided hydraulic washdown hoses, non-marking covers, and Cox Reels industrial spring rewind systems.',
      highlight: '300–600 Bar Working Pressure · Steam Rated to 155°C',
      link: '/parts-attachments/hoses',
      image: '/assets/products/hose-reel.png',
      fallbackImage: '/assets/engineered-continuous-duty.jpg',
      subcategories: ['Steel Braided 3/8" Hoses', 'Spring-Rewind Cox Reels', 'Non-Marking Food Grade Hoses', 'Live Ball-Bearing Swivels', 'Hose Protection Sleeves']
    },
    {
      slug: 'pumps',
      name: 'Triplex High-Pressure Plunger Pumps & Seal Kits',
      shortName: 'Pumps & Packing',
      number: '03',
      tagline: 'General Pump, CAT Pump, and AR ceramic plunger pump assemblies with genuine brass manifolds and V-packing kits.',
      highlight: '100% Solid Ceramic Plungers · Forged Brass Manifolds',
      link: '/parts-attachments/pumps',
      image: '/assets/products/420x4.png',
      fallbackImage: '/assets/hot-water-gauge-hero.jpg',
      subcategories: ['General Pump TS2021 Series', 'CAT Pumps 5CP / 7CP', 'High-Pressure Packing Kits', 'Ceramic Plunger Sleeves', 'Stainless Check Valve Kits']
    },
    {
      slug: 'lances-nozzles',
      name: 'Industrial Lances, Turbo Nozzles & Spray Tooling',
      shortName: 'Lances & Nozzles',
      number: '04',
      tagline: 'Insulated stainless steel double lances, ceramic rotating dirt killers, and high-impact tungsten carbide spray tips.',
      highlight: 'Vented Grips · Hardened 0° to 40° Spray Angles',
      link: '/parts-attachments/lances-nozzles',
      image: '/assets/products/lance-nozzle.png',
      fallbackImage: '/assets/products/216bd2.png',
      subcategories: ['Vented Insulated Lances', 'Ceramic Turbo Rotating Nozzles', 'Colour-Coded QC Nozzle Sets', 'Chemical Low-Pressure Lances', 'Dual-Lance Chemical Manifolds']
    },
    {
      slug: 'burners',
      name: 'Oil Burners, Electrodes & Schedule 80 Coils',
      shortName: 'Burners & Coils',
      number: '05',
      tagline: 'Beckett and Riello 240V/12V oil burners, ignition transformers, fuel solenoids, and continuous-duty hydro-insulated heating coils.',
      highlight: 'Schedule 80 Seamless Cold-Rolled Steel · 7-Year Warranty',
      link: '/parts-attachments/burners',
      image: '/assets/products/coil-burner.png',
      fallbackImage: '/assets/engineered-continuous-duty.jpg',
      subcategories: ['Schedule 80 Heating Coils', 'Beckett AFG Burner Heads', 'Ignition Transformers & Electrodes', 'Suntec Fuel Pumps', 'Ceramic Combustion Discs']
    },
    {
      slug: 'trigger-guns',
      name: 'Heavy-Duty Trigger Guns & Steam Dumps',
      shortName: 'Trigger Guns',
      number: '06',
      tagline: 'Suttner and Alkota Easy-Pull high-pressure washdown guns with stainless steel valve seats and continuous steam dump capability.',
      highlight: 'Fatigue-Reducing Easy-Pull Triggers · 150°C Max Temp',
      link: '/parts-attachments/trigger-guns',
      image: '/assets/products/trigger-gun.png',
      fallbackImage: '/assets/products/216x4.png',
      subcategories: ['Alkota Easy-Pull Guns', 'Suttner ST-1500 Industrial Guns', 'Open-Dump Steam Guns', 'Swivel-Inlet Trigger Assemblies', 'Linear Washdown Guns']
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header with Refined Editorial Rhythm */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E0DEDC] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Precision Categories &amp; Systems
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              Engineered Modules.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-sm text-[#666] font-light leading-relaxed">
              Every component is organized with mechanical clarity. Direct-fit spares, Swiss tooling, and industrial accessories categorized by operational function.
            </p>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs text-alkota-orange hover:text-black uppercase tracking-wider transition-colors font-medium"
            >
              <span>Explore All 16 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Large Asymmetrical Category Modules (2x3 Large Visual Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {primaryCategories.map((cat) => (
            <div
              key={cat.slug}
              className="group bg-white border border-[#E8E8E4] hover:border-alkota-orange/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Category Top Image Area */}
              <div className="relative aspect-[16/10] bg-[#121210] p-6 overflow-hidden flex items-center justify-center">
                <img
                  src={cat.fallbackImage}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-black/50" />
                
                {/* Number & Highlight Tag */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-xs text-white/80 font-medium">
                      CATEGORY {cat.number}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-black/60 px-2 py-0.5 border border-alkota-orange/30">
                      OEM Verified
                    </span>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] text-white/90 uppercase tracking-wide block">
                      {cat.highlight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Body */}
              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors mb-2">
                    {cat.shortName}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed font-normal mb-4">
                    {cat.tagline}
                  </p>

                  {/* Subcategory Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F0EFEB]">
                    {cat.subcategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="font-ibm-plex-mono text-[10px] text-[#777] bg-[#F5F4F0] px-2 py-0.5"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-orange bg-[#F5F4F0] px-2 py-0.5 font-medium">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0EFEB] flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-[11px] uppercase tracking-wider text-[#999] group-hover:text-black transition-colors">
                    Browse Component Range
                  </span>
                  <Link
                    href={cat.link}
                    className="h-8 w-8 rounded-full bg-[#121210] group-hover:bg-alkota-orange text-white flex items-center justify-center transition-colors shrink-0"
                    aria-label={`View ${cat.shortName}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
