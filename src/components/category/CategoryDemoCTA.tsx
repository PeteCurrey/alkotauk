'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Sliders, ShieldCheck } from 'lucide-react';

interface CategoryDemoCTAProps {
  categorySlug: string;
  categoryName: string;
}

export default function CategoryDemoCTA({
  categorySlug,
  categoryName,
}: CategoryDemoCTAProps) {
  return (
    <section className="bg-[#0A0A0A] text-white py-20 px-6 sm:px-12 border-b border-[#222]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
              On-Site Demonstration & Technical Specification
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
              Experience Alkota Continuous Duty on Your Site
            </h2>
            <p className="font-light text-base sm:text-lg text-[#AAA] leading-relaxed max-w-2xl">
              We provide on-site demonstrations across the United Kingdom. Test {categoryName.toLowerCase()} on your specific contamination before specifying your permanent fleet.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Link
              href={`/contact?enquiry=demo-${categorySlug}`}
              className="inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline shadow-lg"
            >
              <span>Request a Demonstration</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={`/tools/machine-match?category=${categorySlug}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline"
            >
              <Sliders className="h-4 w-4 text-[#FF6900]" />
              <span>Launch Machine Matcher</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
