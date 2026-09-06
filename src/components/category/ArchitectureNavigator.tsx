'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Sliders, Shield, Zap, Flame, Fuel } from 'lucide-react';
import { Product } from '@/lib/products';

interface ArchitectureFamily {
  id: string;
  name: string;
  tagline: string;
  description: string;
  drive: string;
  powerFuel: string;
  pressureRange: string;
  flowRange: string;
  idealApplication: string;
  representativeModelSlug?: string;
  representativeImage: string;
}

interface ArchitectureNavigatorProps {
  categorySlug: string;
  architectures: ArchitectureFamily[];
  allCategoryProducts: Product[];
}

export default function ArchitectureNavigator({
  categorySlug,
  architectures,
  allCategoryProducts,
}: ArchitectureNavigatorProps) {
  const [selectedArchId, setSelectedArchId] = useState<string>(architectures[0]?.id || '');

  const activeArch = architectures.find(a => a.id === selectedArchId) || architectures[0];

  // Find representative product if available
  const repProduct = allCategoryProducts.find(p => 
    p.slug === activeArch?.representativeModelSlug || 
    p.series?.toLowerCase().includes(activeArch?.id.toLowerCase())
  ) || allCategoryProducts[0];

  return (
    <section id="architectures" className="bg-[#FAFAF8] border-b border-[#E5E5E0] py-24 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
            Machine Architecture Navigator
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-4">
            Engineered Configurations & Chassis Formats
          </h2>
          <p className="font-normal text-sm sm:text-base text-[#666] leading-relaxed">
            Alkota builds multiple distinct mechanical architectures within each category to match your specific power supply, fuel availability, continuous duty cycle, and mobility requirements.
          </p>
        </div>

        {/* Interactive Architecture Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[#E5E5E0] overflow-x-auto">
          {architectures.map((arch) => {
            const isSelected = arch.id === activeArch.id;
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelectedArchId(arch.id)}
                className={`px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all text-left border rounded-[4px] ${
                  isSelected
                    ? 'bg-[#1A1A18] text-white border-[#1A1A18] shadow-sm'
                    : 'bg-white text-[#555] border-[#E5E5E0] hover:border-[#CCC] hover:text-[#1A1A18]'
                }`}
              >
                <span className="block font-medium">{arch.name}</span>
                <span className={`block text-[10px] truncate max-w-[160px] ${isSelected ? 'text-[#FF6900]' : 'text-[#888]'}`}>
                  {arch.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Showcase Card */}
        {activeArch && (
          <div className="bg-white border border-[#E5E5E0] shadow-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[6px] shadow-tactile">
            {/* Left: Focal Machine Image */}
            <div className="lg:col-span-6 bg-[#F4F4F0] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E5E0] relative min-h-[360px]">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 bg-[#1A1A18] text-[#FF6900] text-[10px] font-mono font-medium uppercase tracking-widest rounded-[3px]">
                  {activeArch.name}
                </span>
                <span className="text-xs font-mono text-[#888]">
                  Continuous Duty Platform
                </span>
              </div>

              <div className="relative w-full h-64 sm:h-80 my-4 flex items-center justify-center">
                <Image
                  src={repProduct?.primary_image_url || activeArch.representativeImage || '/assets/products/hot-water-skid.png'}
                  alt={activeArch.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="relative z-10 pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-xs font-mono text-[#666]">
                <span>Representative Model: {repProduct?.name || 'Alkota Heavy Duty'}</span>
                <span className="text-[#FF6900] font-medium">South Dakota Built</span>
              </div>
            </div>

            {/* Right: Architecture Specifications & Capabilities */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] block mb-1">
                  Architecture Overview
                </span>
                <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-[#1A1A18] mb-3">
                  {activeArch.name}
                </h3>
                <p className="font-normal text-sm sm:text-base text-[#555] leading-relaxed mb-6">
                  {activeArch.description}
                </p>

                {/* Specs Matrix */}
                <div className="grid grid-cols-2 gap-4 p-5 bg-[#FAFAF8] border border-[#E5E5E0] mb-6 font-mono text-xs rounded-[5px]">
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Pressure Rating</span>
                    <span className="text-sm font-medium text-[#1A1A18]">{activeArch.pressureRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Flow Delivery</span>
                    <span className="text-sm font-medium text-[#1A1A18]">{activeArch.flowRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Drive Mechanism</span>
                    <span className="text-sm font-medium text-[#1A1A18]">{activeArch.drive}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Power / Fuel</span>
                    <span className="text-sm font-medium text-[#1A1A18]">{activeArch.powerFuel}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888] block mb-1">
                    Primary Operational Target:
                  </span>
                  <p className="text-xs sm:text-sm text-[#444] font-normal leading-relaxed">
                    {activeArch.idealApplication}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E5E5E0] flex flex-wrap items-center gap-4">
                <a
                  href="#catalogue"
                  className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#1A1A18] text-white px-5 py-3 text-xs font-medium uppercase tracking-widest transition-colors no-underline rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
                >
                  <span>Filter Catalogue for {activeArch.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                {repProduct && (
                  <Link
                    href={`/machines/${categorySlug}/${repProduct.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#555] hover:text-[#FF6900] transition-colors no-underline"
                  >
                    <span>View {repProduct.name} Specs</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
