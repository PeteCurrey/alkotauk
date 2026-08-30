'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductProblemVisualiser({ product }: Props) {
  const brand = product.brand_identity;
  const problems = brand?.problem_labels || [
    'Road film & diesel exhaust soot',
    'Heavy machinery grease & hydraulic oil',
    'Winter road salt & de-icer chlorides',
    'Atmospheric soot & industrial fallout',
    'Baked brake dust & transmission fluids'
  ];

  return (
    <section id="problem" className="py-28 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#777] block font-medium">
            Target Soils
          </span>
          <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
            The dirt it dissolves.
          </h2>
          <p className="text-sm sm:text-base text-[#666] font-normal leading-relaxed">
            Formulated specifically to dissolve stubborn environmental residues, baked soot, and oily binders that resist ordinary wash soap.
          </p>
        </div>

        {/* Clean Unboxed Problem List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E8E8E4] flex flex-col justify-between min-h-[140px]"
            >
              <span className="font-ibm-plex-mono text-xs text-[#888] font-light">
                0{idx + 1}
              </span>
              <h3 className="text-lg font-light text-[#0A0A0A] tracking-tight leading-snug">
                {prob}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
