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
    <section id="problem" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#222] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Target Contamination Spectrum
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase">
              The Dirt It Was Born to Destroy.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
            Formulated specifically to dissolve stubborn chemical and environmental residues that evade standard cleaning products.
          </p>
        </div>

        {/* Big Typographic Problem Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222]">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 bg-[#0E0E0E] hover:bg-[#141414] transition-colors flex flex-col justify-between min-h-[220px] group"
            >
              <div className="space-y-3">
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange">
                  SOIL 0{idx + 1}
                </span>
                <h3 className="text-2xl font-light text-white tracking-tight group-hover:text-alkota-orange transition-colors">
                  {prob}
                </h3>
              </div>

              <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-ibm-plex-mono text-[#666]">
                <span>Alkota Action: Emulsified</span>
                <span className="text-alkota-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  Active //
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification and Link to Chemical Finder */}
        <div className="p-6 bg-[#141414] border border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono">
          <div className="flex items-center gap-2 text-[#AAA]">
            <Sparkles className="w-4 h-4 text-alkota-orange shrink-0" />
            <span>Have a specific unlisted contamination or stubborn industrial deposit?</span>
          </div>
          <Link
            href="/chemicals/finder"
            className="inline-flex items-center gap-1.5 text-alkota-orange hover:text-white uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Run Chemical Match Wizard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
