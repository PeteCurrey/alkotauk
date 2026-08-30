'use client';

import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductInstructionSteps({ product }: Props) {
  return (
    <section id="usage" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              Application Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              Three steps to a clean surface.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
            Follow this application sequence to maximise chemical cleaning efficiency and prevent waste.
          </p>
        </div>

        {/* 3 Step Horizontal Sequence (Clean & Editorial) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* STEP 01: DILUTE */}
          <div className="bg-white p-8 border border-[#E8E8E4] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-2xl font-extralight text-alkota-orange block">
                01
              </span>
              <h3 className="text-xl font-light text-[#0A0A0A] uppercase tracking-tight">
                Dilute &amp; Meter
              </h3>
              <p className="font-ibm-plex-mono text-xs text-alkota-black font-medium">
                {product.dilution_information || 'Standard 1:20 to 1:50 with water'}
              </p>
              <p className="text-xs text-[#666] font-normal leading-relaxed">
                Set downstream injector or foam lance metering valve to match water hardness and soil density.
              </p>
            </div>
          </div>

          {/* STEP 02: APPLY */}
          <div className="bg-white p-8 border border-[#E8E8E4] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-2xl font-extralight text-alkota-orange block">
                02
              </span>
              <h3 className="text-xl font-light text-[#0A0A0A] uppercase tracking-tight">
                Apply &amp; Dwell
              </h3>
              <p className="text-xs text-alkota-black font-medium">
                {product.usage_instructions ? product.usage_instructions.split('.')[0] : 'Apply via chemical injector or foam cannon'}
              </p>
              <p className="text-xs text-[#666] font-normal leading-relaxed">
                Apply evenly from bottom to top to prevent run lines. Allow 2–3 minutes contact dwell without letting it dry.
              </p>
            </div>
          </div>

          {/* STEP 03: RINSE */}
          <div className="bg-white p-8 border border-[#E8E8E4] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-2xl font-extralight text-alkota-orange block">
                03
              </span>
              <h3 className="text-xl font-light text-[#0A0A0A] uppercase tracking-tight">
                High-Pressure Rinse
              </h3>
              <p className="text-xs text-alkota-black font-medium">
                150–200 Bar pressure rinse with 50°C–65°C hot water
              </p>
              <p className="text-xs text-[#666] font-normal leading-relaxed">
                Rinse thoroughly from top to bottom. Surfaces will sheet freely with zero chalky detergent residue.
              </p>
            </div>
          </div>

        </div>

        {/* Safety Warning Strip */}
        {Boolean(product.warnings && (Array.isArray(product.warnings) ? product.warnings.length > 0 : Boolean(product.warnings))) && (
          <div className="p-6 bg-white border border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
              <div className="text-[#555] font-normal">
                <span className="font-medium text-alkota-black mr-2 uppercase font-ibm-plex-mono text-[10px]">
                  Safety:
                </span>
                {Array.isArray(product.warnings) ? product.warnings.join(' ') : String(product.warnings)}
              </div>
            </div>
            <a
              href={`/api/chemicals/sds?code=${product.originating_master_code}`}
              target="_blank"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-wider text-alkota-black hover:text-alkota-orange shrink-0 underline"
            >
              SDS PDF →
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
