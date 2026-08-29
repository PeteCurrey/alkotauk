'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gauge, Zap, Flame, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/products';

interface FeaturedMachinesProps {
  categorySlug: string;
  featuredProducts: Product[];
}

export default function FeaturedMachines({
  categorySlug,
  featuredProducts,
}: FeaturedMachinesProps) {
  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className="bg-white border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
              Curated Equipment Selection
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight">
              Featured Industrial Systems
            </h2>
          </div>
          <a
            href="#catalogue"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6900] hover:text-[#1A1A18] transition-colors no-underline"
          >
            <span>Browse Full Catalogue Below</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Featured Machines Grid (Intelligent column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-[#FAFAF8] border border-[#E5E5E0] hover:border-[#FF6900] transition-all p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-white border border-[#E5E5E0] text-[10px] font-mono font-medium uppercase tracking-widest text-[#FF6900]">
                    {product.series || 'Elite Series'}
                  </span>
                  <span className="text-[10px] font-mono text-[#888]">
                    {product.power_source || 'Industrial'}
                  </span>
                </div>

                <div className="relative w-full h-56 mb-6 flex items-center justify-center bg-white border border-[#EBEBE6] p-4">
                  <Image
                    src={product.primary_image_url || '/assets/products/hot-water-skid.png'}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                  />
                </div>

                <h3 className="font-light text-2xl uppercase tracking-tight text-[#1A1A18] mb-2 group-hover:text-[#FF6900] transition-colors">
                  {product.name}
                </h3>
                <p className="font-normal text-xs sm:text-sm text-[#666] leading-relaxed line-clamp-2 mb-6">
                  {product.tagline || product.short_description || product.description}
                </p>
              </div>

              <div>
                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-[#EAEAE5] font-mono text-xs mb-6">
                  <div>
                    <span className="text-[10px] text-[#888] block">Pressure</span>
                    <span className="font-medium text-[#1A1A18]">
                      {product.pressure_bar ? `${product.pressure_bar} BAR` : (product.pressure_psi ? `${product.pressure_psi} PSI` : 'High Output')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] block">Flow Delivery</span>
                    <span className="font-medium text-[#1A1A18]">
                      {product.flow_rate_lpm ? `${product.flow_rate_lpm} L/MIN` : (product.flow_rate_gpm ? `${product.flow_rate_gpm} GPM` : 'Heavy Flow')}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/machines/${categorySlug}/${product.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A18] group-hover:bg-[#FF6900] text-white py-3 text-xs font-medium uppercase tracking-widest transition-colors no-underline"
                >
                  <span>View Machine Specifications</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
