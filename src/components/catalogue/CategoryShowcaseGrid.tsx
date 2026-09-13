'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Cpu } from 'lucide-react';
import { CategoryDetails } from '@/lib/catalogue/series';

interface CategoryShowcaseGridProps {
  categories: CategoryDetails[];
}

export default function CategoryShowcaseGrid({ categories }: CategoryShowcaseGridProps) {
  return (
    <section className="mb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E0] gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] block mb-1 font-semibold">
            01 // EQUIPMENT CLASSIFICATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight">
            The Eight Heavy Industrial Categories
          </h2>
        </div>
        <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
          South Dakota Engineering · Built for Continuous Duty
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, idx) => (
          <Link
            key={cat.slug}
            href={`/machines/${cat.routeSlug}`}
            className="group flex flex-col bg-white border border-[#E5E5E0] hover:border-[#FF6900] rounded-[4px] p-5 shadow-xs hover:shadow-md transition-all duration-300 no-underline"
          >
            {/* Header: Index & Model Count */}
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-[11px] font-bold text-[#FF6900]">
                0{idx + 1}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#888] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EFEFEA]">
                {cat.modelCount} Models · {cat.seriesCount} Series
              </span>
            </div>

            {/* Representative Real Machine Photography */}
            <div className="relative aspect-[16/11] w-full bg-[#FAF9F5] rounded-[3px] p-4 mb-4 flex items-center justify-center overflow-hidden border border-[#F0F0EC]">
              <img
                src={cat.representativeImage}
                alt={`${cat.name} category representative`}
                loading="lazy"
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>

            {/* Category Title & Tagline */}
            <h3 className="text-base font-medium text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug mb-1.5">
              {cat.name}
            </h3>

            <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-4 flex-1">
              {cat.description}
            </p>

            {/* Footer action link */}
            <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-mono text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
              <span className="uppercase tracking-wider font-semibold">Explore Category</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
