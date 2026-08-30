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
    <section id="story" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E0DEDC] pb-8">
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
              // The Product Story
            </span>
            <h2 className="text-4xl sm:text-6xl font-extralight text-alkota-black tracking-tight leading-none uppercase">
              {brand?.product_story_headline || "THIS ISN'T JUST SOAP."}
            </h2>
          </div>
          
          <div className="max-w-md font-ibm-plex-mono text-xs text-[#666] leading-relaxed">
            <span className="text-[#0A0A0A] font-bold block mb-1">
              ENGINEERED FOR THE DIRT THAT REFUSES TO BUDGE.
            </span>
            Standard commercial detergents rely on superficial foaming. Alkota master formulations attack the electrostatic and molecular bonds of industrial contamination.
          </div>
        </div>

        {/* ── EDITORIAL ESSAY & VISUAL ACCENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl sm:text-2xl font-light text-alkota-black leading-relaxed">
              {brand?.product_story_body || product.long_description}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#555] font-normal leading-relaxed">
              <p>
                Every day, commercial fleet operators, agricultural plant managers, and workshop technicians fight a losing battle against road film, hydrocarbon grease, and baked-on soot. When high-pressure water alone hits these surfaces, it merely shears off the loose top layer—leaving behind a static, dulling film that dulls paintwork and hides metal fatigue.
              </p>
              <p>
                <strong className="text-alkota-black font-semibold">{product.retail_name}</strong> is built around the authentic <span className="font-mono text-alkota-orange font-bold">{product.originating_master_code} ({product.originating_master_name})</span> formulation. Developed across fifty years of American hot-water pressure washing innovation, it features heat-stable surfactants that rapidly saponify oils and suspend soil particles in the rinse stream before they can redeposit.
              </p>
            </div>

            {/* Credibility Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white border border-[#E0DEDC] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                  01 // Synergy
                </span>
                <h4 className="text-sm font-light text-alkota-black">Hot Water Activated</h4>
                <p className="text-xs text-[#777]">Surfactants accelerate above 50°C without breaking down.</p>
              </div>

              <div className="p-4 bg-white border border-[#E0DEDC] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                  02 // Machine Safe
                </span>
                <h4 className="text-sm font-light text-alkota-black">Pump &amp; Coil Friendly</h4>
                <p className="text-xs text-[#777]">Non-corrosive to high-pressure valves and heating elements.</p>
              </div>

              <div className="p-4 bg-white border border-[#E0DEDC] space-y-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                  03 // Traceable
                </span>
                <h4 className="text-sm font-light text-alkota-black">100% GB-CLP Pure</h4>
                <p className="text-xs text-[#777]">Fully registered with verified UK safety dossiers.</p>
              </div>
            </div>

          </div>

          {/* Right Macro Contamination Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0A0A0A] text-white p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-alkota-orange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
                // Chemical Action Blueprint
              </span>
              <h3 className="text-2xl font-extralight text-white tracking-tight">
                What Happens at the Molecular Surface.
              </h3>
            </div>

            <div className="space-y-4 divide-y divide-[#222] text-xs">
              <div className="pt-3 first:pt-0">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#AAA] block mb-1">
                  1. Wetting &amp; Penetration
                </span>
                <p className="text-[#888] leading-relaxed">
                  Lowers water surface tension, penetrating micro-crevices in vehicle paint, raw aluminium, and metal casings.
                </p>
              </div>

              <div className="pt-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#AAA] block mb-1">
                  2. Hydrocarbon Saponification
                </span>
                <p className="text-[#888] leading-relaxed">
                  Active alkaline and solvent agents break petroleum oils and organic fats into water-soluble soap compounds.
                </p>
              </div>

              <div className="pt-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#AAA] block mb-1">
                  3. Soil Suspension &amp; Sheeting
                </span>
                <p className="text-[#888] leading-relaxed">
                  Negatively charges released dirt particles so they repel each other and flush away in the rinse stream without streaking.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex items-center justify-between font-ibm-plex-mono text-[10px]">
              <span className="text-[#666] uppercase">Master Chemistry Code:</span>
              <span className="text-alkota-orange font-bold">{product.originating_master_code}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
