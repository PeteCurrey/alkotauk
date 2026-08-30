'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import ChemicalCard from '@/components/chemicals/ChemicalCard';

interface Props {
  product: ChemicalRetailProduct;
  relatedProducts: ChemicalRetailProduct[];
}

export default function ProductSystemCrossSell({ product, relatedProducts }: Props) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              Complementary Formulations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              Pair with matching chemistry.
            </h2>
          </div>
          <Link
            href="/parts-attachments/chemicals"
            className="font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>Full Chemical Range</span>
            <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
          </Link>
        </div>

        {/* Clean Complementary Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.slice(0, 4).map((p) => (
            <ChemicalCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
