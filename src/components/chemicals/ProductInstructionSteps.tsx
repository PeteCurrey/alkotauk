'use client';

import React from 'react';
import { ArrowRight, Droplets, Flame, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductInstructionSteps({ product }: Props) {
  return (
    <section id="usage" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E0DEDC] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Standard Operating Protocol
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              Three Steps to a Perfect Clean.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-light leading-relaxed">
            Engineered for high chemical induction efficiency. Follow the exact protocol for maximum cleaning speed and minimum chemical wastage.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* STEP 01: DILUTE */}
          <div className="bg-white p-8 sm:p-10 border border-[#E0DEDC] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E0DEDC] pb-4">
                <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                  01
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                  Phase: Metering
                </span>
              </div>

              <h3 className="text-2xl font-light text-alkota-black">
                DILUTE
              </h3>

              <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange block font-bold">
                  Verified Dilution Ratio:
                </span>
                <p className="font-ibm-plex-mono text-xs text-[#222] leading-relaxed">
                  {product.dilution_information}
                </p>
              </div>
            </div>

            <div className="text-xs text-[#666] font-light leading-relaxed border-t border-[#E8E8E4] pt-4">
              Calibrate your pressure washer downstream injector or foam cannon metering valve to match your local water hardness.
            </div>
          </div>

          {/* STEP 02: APPLY */}
          <div className="bg-white p-8 sm:p-10 border border-[#E0DEDC] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E0DEDC] pb-4">
                <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                  02
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                  Phase: Application
                </span>
              </div>

              <h3 className="text-2xl font-light text-alkota-black">
                APPLY &amp; DWELL
              </h3>

              <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange block font-bold">
                  Application Method:
                </span>
                <p className="text-xs text-[#444] leading-relaxed font-normal">
                  {product.usage_instructions ? product.usage_instructions.split('.')[0] : 'Apply via low-pressure chemical injector or foam lance'}.
                </p>
              </div>
            </div>

            <div className="text-xs text-[#666] font-light leading-relaxed border-t border-[#E8E8E4] pt-4">
              Apply uniformly from bottom to top to prevent chemical streaking. Allow 2–3 minutes contact dwell without letting dry.
            </div>
          </div>

          {/* STEP 03: RINSE */}
          <div className="bg-white p-8 sm:p-10 border border-[#E0DEDC] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E0DEDC] pb-4">
                <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                  03
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                  Phase: High Pressure Rinse
                </span>
              </div>

              <h3 className="text-2xl font-light text-alkota-black">
                RINSE &amp; FLUSH
              </h3>

              <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange block font-bold">
                  Optimal Rinse Profile:
                </span>
                <p className="text-xs text-[#444] leading-relaxed font-normal">
                  High pressure water blast (150–200 BAR). 50°C–65°C hot water dramatically accelerates soil release.
                </p>
              </div>
            </div>

            <div className="text-xs text-[#666] font-light leading-relaxed border-t border-[#E8E8E4] pt-4">
              Rinse thoroughly from top to bottom. Surfaces will sheet freely without chalky detergent residues.
            </div>
          </div>

        </div>

        {/* Safety Warning Strip */}
        {Boolean(product.warnings && (Array.isArray(product.warnings) ? product.warnings.length > 0 : Boolean(product.warnings))) && (
          <div className="p-6 bg-orange-50/70 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#FF6900] shrink-0 mt-0.5" />
              <div className="text-xs text-[#555]">
                <span className="font-bold text-alkota-black mr-2 font-mono uppercase text-[10px]">
                  Safety &amp; Handling:
                </span>
                {Array.isArray(product.warnings) ? product.warnings.join(' ') : String(product.warnings)}
              </div>
            </div>
            <a
              href={`/api/chemicals/sds?code=${product.originating_master_code}`}
              target="_blank"
              className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-black shrink-0 underline"
            >
              Download SDS PDF →
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
