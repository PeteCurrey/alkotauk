'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, FlaskConical, Layers } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import ChemicalCard from '@/components/chemicals/ChemicalCard';

interface Props {
  product: ChemicalRetailProduct;
  relatedProducts: ChemicalRetailProduct[];
}

export default function ProductSystemCrossSell({ product, relatedProducts }: Props) {
  const brand = product.brand_identity;
  const workflowSteps = brand?.workflow_steps;

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E0DEDC] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Integrated Cleaning Regimen
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              Complete the Cleaning System.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-light leading-relaxed">
            Professional results come from sequential chemistry. Pair {product.retail_name} with dedicated degreasers, brighteners, and protective finishes.
          </p>
        </div>

        {/* ── WORKFLOW JOURNEY STRIP (IF DEFINED) ── */}
        {workflowSteps && workflowSteps.length > 0 && (
          <div className="bg-[#0A0A0A] text-white p-8 sm:p-12 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.2em] text-[#AAA]">
                6-Stage Commercial Wash Protocol
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 border transition-colors flex flex-col justify-between min-h-[140px] ${
                    step.is_current_product
                      ? 'border-alkota-orange bg-white/10'
                      : 'border-[#222] bg-[#121212]'
                  }`}
                >
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-alkota-orange block mb-1">
                      {step.label}
                    </span>
                    <h4 className="text-sm font-light text-white leading-tight">
                      {step.product_name || 'Alkota Spec'}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[10px] text-[#777] font-light">
                    {step.notes || 'Sequential phase'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COMPLEMENTARY PRODUCTS GRID ── */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
                Matching Formulations ({relatedProducts.length})
              </span>
              <Link
                href="/chemicals"
                className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black transition-colors"
              >
                Explore Full Chemical Range →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E0DEDC]">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-[#FAF9F5]">
                  <ChemicalCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
