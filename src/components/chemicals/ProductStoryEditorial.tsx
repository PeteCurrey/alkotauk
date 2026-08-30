'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Flame, Droplets, Sparkles, CheckCircle2 } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductStoryEditorial({ product }: Props) {
  const brand = product.brand_identity;

  return (
    <section id="story" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-8">
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              // The Formulation Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              {brand?.product_story_headline || "Clean deeper. Faster."}
            </h2>
          </div>
          
          <div className="max-w-md font-ibm-plex-mono text-xs text-[#666] leading-relaxed">
            <span className="text-alkota-black font-semibold block mb-1">
              SURFACE TRANSFORMATION WITHOUT MECHANICAL ABRASION.
            </span>
            Standard detergents rely on high foam. Alkota master formulations attack the electrostatic and oily bonds that hold grime to metal and paintwork.
          </div>
        </div>

        {/* ── EDITORIAL ESSAY & REFINED TECHNICAL CARD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl sm:text-2xl font-light text-alkota-black leading-relaxed">
              {brand?.product_story_body || product.long_description}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#555] font-normal leading-relaxed">
              <p>
                When high-pressure water alone hits road film or engine grease, it shears off the loose top layer while leaving behind a dull static film.
              </p>
              <p>
                <strong className="text-alkota-black font-semibold">{product.retail_name}</strong> is built around the authentic <span className="font-mono text-alkota-orange font-bold">{product.originating_master_code} ({product.originating_master_name})</span> formulation. Developed across fifty years of American hot-water pressure washing, it features heat-stable surfactants that saponify oils and suspend dirt in the rinse stream before it can redeposit.
              </p>
            </div>

            {/* Credibility Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-medium">
                  01 // Synergy
                </span>
                <h4 className="text-sm font-medium text-alkota-black">Hot Water Activated</h4>
                <p className="text-xs text-[#666] font-normal">Surfactants accelerate above 50°C without breaking down.</p>
              </div>

              <div className="p-5 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-medium">
                  02 // Machine Safe
                </span>
                <h4 className="text-sm font-medium text-alkota-black">Coil &amp; Pump Friendly</h4>
                <p className="text-xs text-[#666] font-normal">Non-crystallising in high-pressure valves and heating coils.</p>
              </div>

              <div className="p-5 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-medium">
                  03 // Traceable
                </span>
                <h4 className="text-sm font-medium text-alkota-black">100% GB-CLP Pure</h4>
                <p className="text-xs text-[#666] font-normal">Fully registered with verified UK safety dossiers.</p>
              </div>
            </div>

          </div>

          {/* Right Blueprint Card (5 Cols, Light Stone & Black Text) */}
          <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-10 space-y-6">
            
            <div className="space-y-2">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
                // Chemical Action
              </span>
              <h3 className="text-2xl font-extralight text-[#0A0A0A] tracking-tight">
                How It Works on the Surface.
              </h3>
            </div>

            <div className="space-y-4 divide-y divide-[#E8E8E4] text-xs">
              <div className="pt-3 first:pt-0">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-black font-semibold block mb-1">
                  1. Wetting &amp; Penetration
                </span>
                <p className="text-[#666] leading-relaxed font-normal">
                  Lowers water surface tension to penetrate micro-crevices in paintwork, metal castings, and chassis rails.
                </p>
              </div>

              <div className="pt-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-black font-semibold block mb-1">
                  2. Hydrocarbon Saponification
                </span>
                <p className="text-[#666] leading-relaxed font-normal">
                  Active surfactants break heavy petroleum oils, diesel grime, and organic fats into water-soluble compounds.
                </p>
              </div>

              <div className="pt-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-black font-semibold block mb-1">
                  3. Soil Suspension &amp; Rinsing
                </span>
                <p className="text-[#666] leading-relaxed font-normal">
                  Holds released dirt particles in suspension so they rinse cleanly away without streaking or re-adhering.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between font-ibm-plex-mono text-[10px]">
              <span className="text-[#888] uppercase">Master Code:</span>
              <span className="text-alkota-black font-bold">{product.originating_master_code}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
