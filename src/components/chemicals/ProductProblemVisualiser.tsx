'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductProblemVisualiser({ product }: Props) {
  const brand = product.brand_identity;
  const problems = brand?.problem_labels || [
    'ELECTROSTATIC ROAD FILM',
    'DIESEL EXHAUST PARTICLES',
    'HYDROCARBON GREASE & OIL',
    'ROAD SALT & DE-ICER CHLORIDES',
    'ATMOSPHERIC INDUSTRIAL FALLOUT'
  ];

  return (
    <section id="problem" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Target Soils
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              The grime it dissolves.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
            Formulated specifically to dissolve stubborn environmental residues, baked soot, and oily binders that resist ordinary soap.
          </p>
        </div>

        {/* Clean Typographic Problem Tiles (Light Staging) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 bg-white border border-[#E8E8E4] hover:border-black transition-colors flex flex-col justify-between min-h-[200px] group"
            >
              <div className="space-y-3">
                <span className="font-ibm-plex-mono text-xs text-[#888] font-light">
                  SOIL 0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-[#0A0A0A] tracking-tight group-hover:text-alkota-orange transition-colors uppercase">
                  {prob}
                </h3>
              </div>

              <div className="pt-6 border-t border-[#E8E8E4] flex items-center justify-between text-xs font-ibm-plex-mono text-[#777]">
                <span>Alkota Action: Emulsified</span>
                <span className="text-emerald-700 font-medium">
                  Verified Active ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chemical Match Link */}
        <div className="p-6 bg-white border border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono">
          <div className="flex items-center gap-2 text-[#555]">
            <Sparkles className="w-4 h-4 text-alkota-orange shrink-0" />
            <span>Dealing with an unusual industrial residue or hard water challenge?</span>
          </div>
          <Link
            href="/chemicals/finder"
            className="inline-flex items-center gap-1.5 text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors shrink-0 font-medium"
          >
            <span>Run Chemical Match Tool</span>
            <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
          </Link>
        </div>

      </div>
    </section>
  );
}
