'use client';

import React from 'react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductStoryEditorial({ product }: Props) {
  const brand = product.brand_identity;

  return (
    <section id="story" className="py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
            Formulation
          </span>
          <h2 
            className="text-4xl sm:text-5xl font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
          >
            {brand?.product_story_headline || "Clean deeper. In less time."}
          </h2>
          <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed pt-2">
            Standard detergents rely on superficial foam. Alkota master chemistry attacks the static bond holding road film, grease, and exhaust soot to paint and metal.
          </p>
        </div>

        {/* 2-Column Editorial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Human Story */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#555] font-normal leading-relaxed">
            <p>
              When high-pressure water alone hits road film or engine grease, it shears off the loose top layer while leaving behind a dull static film.
            </p>
            <p>
              <strong className="text-alkota-black font-semibold">{product.retail_name}</strong> is built around the original <span className="font-mono text-alkota-orange font-bold">{product.originating_master_code}</span> formula. Developed alongside industrial pressure washers, it uses heat-stable surfactants that break down grease and suspend dirt in the rinse stream before it can re-settle.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 font-ibm-plex-mono text-xs text-[#666]">
              <div className="border-t border-[#E8E8E4] pt-4">
                <span className="text-alkota-black font-medium block mb-1">Hot Water Synergy</span>
                <span>Accelerates from 50°C to 90°C without evaporating active agents.</span>
              </div>
              <div className="border-t border-[#E8E8E4] pt-4">
                <span className="text-alkota-black font-medium block mb-1">Coil Safe</span>
                <span>Non-crystallising formula protects heating coils and pump seals.</span>
              </div>
              <div className="border-t border-[#E8E8E4] pt-4">
                <span className="text-alkota-black font-medium block mb-1">UK Compliant</span>
                <span>Fully registered with verified UK Safety Data Sheets.</span>
              </div>
            </div>
          </div>

          {/* Right Column: How It Cleans (Unboxed Minimalist Editorial) */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            <h3 className="text-xl font-light text-[#0A0A0A] uppercase tracking-tight">
              Surface Action
            </h3>

            <div className="space-y-6 text-xs font-normal text-[#666] leading-relaxed divide-y divide-[#E8E8E4]">
              <div className="pt-4 first:pt-0 space-y-1">
                <strong className="text-alkota-black font-medium block text-sm">1. Penetrates the Film</strong>
                <p className="text-sm text-[#555]">Lowers water surface tension to get beneath road dirt and traffic grime.</p>
              </div>
              <div className="pt-4 space-y-1">
                <strong className="text-alkota-black font-medium block text-sm">2. Breaks Down Oils</strong>
                <p className="text-sm text-[#555]">Turns heavy petroleum oils and diesel exhaust soot into water-soluble emulsion.</p>
              </div>
              <div className="pt-4 space-y-1">
                <strong className="text-alkota-black font-medium block text-sm">3. Clean Rinse</strong>
                <p className="text-sm text-[#555]">Holds dirt suspended so it washes away completely without streaking.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
