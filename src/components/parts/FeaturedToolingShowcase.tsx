'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

interface FeaturedToolingShowcaseProps {
  featuredParts?: any[];
}

export default function FeaturedToolingShowcase({ featuredParts = [] }: FeaturedToolingShowcaseProps) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const handleAddSurfaceCleaner = () => {
    addItem({
      id: 'featured-mosmatic-43',
      part_number: 'MOS-DL-UHD-43',
      name: 'Mosmatic DL-UHD 43 Flat Surface Cleaner (18")',
      price_each: 445.00,
      quantity: 1,
      image: '/assets/products/whirl-away-surface-cleaner.png',
      category: 'surface-cleaners',
    });
    setIsDrawerOpen(true);
  };

  const handleAddPump = () => {
    addItem({
      id: 'featured-gp-ts2021',
      part_number: 'ALK-PMP-001',
      name: 'General Pump TS2021 High-Pressure Triplex Pump',
      price_each: 645.00,
      quantity: 1,
      image: '/assets/products/industrial-pump.png',
      category: 'pumps',
    });
    setIsDrawerOpen(true);
  };

  const handleAddReel = () => {
    addItem({
      id: 'featured-cox-1125',
      part_number: 'COX-HR-001',
      name: 'Cox Reels 1125-3-100 Hand-Crank Hose Reel (30m)',
      price_each: 285.00,
      quantity: 1,
      image: '/assets/products/high-pressure-hose.png',
      category: 'hoses',
    });
    setIsDrawerOpen(true);
  };

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              // Featured Equipment
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
            >
              Essential attachments.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
            Professional attachments that cut cleaning times, protect hoses from damage, and replace worn pump components back to factory output.
          </p>
        </div>

        {/* ── STAGE 01: MONUMENTAL PRODUCT STAGE (65% Product Scale) ── */}
        <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-14 lg:p-16 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 7 Cols: Massive Product Cutout on Clean Off-White */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] p-6">
              
              {/* Soft Ground Shadow */}
              <div className="absolute inset-x-12 bottom-4 h-10 bg-black/10 blur-2xl rounded-full pointer-events-none" />

              <img
                src="/assets/products/whirl-away-surface-cleaner.png"
                alt="Mosmatic DL-UHD 43 Flat Surface Cleaner"
                className="relative z-10 max-h-[420px] w-auto object-contain filter drop-shadow-[0_20px_32px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-700 select-none"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
                }}
              />
            </div>

            {/* Right 5 Cols: Human Story, Clear Specs, and Direct Buy Action */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] block">
                  Swiss Rotary Tooling · 18" Cleaning Path
                </span>
                <h3 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase leading-tight">
                  Clean large areas in half the time.
                </h3>
                <p className="text-sm text-[#555] font-normal leading-relaxed pt-2">
                  The Mosmatic DL-UHD surface cleaner glides over concrete yards, transport depots, and workshop floors. Two high-pressure jets rotate at up to 2,000 RPM inside a stainless steel housing, delivering consistent, streak-free cleaning without overspray.
                </p>
              </div>

              {/* Spec Strip */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E8E4] font-ibm-plex-mono text-xs">
                <div>
                  <span className="text-[#888] block text-[9px] uppercase tracking-wider">Working Width</span>
                  <span className="text-alkota-black font-medium">430mm (18")</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[9px] uppercase tracking-wider">Max Pressure</span>
                  <span className="text-alkota-black font-medium">275 Bar</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[9px] uppercase tracking-wider">Max Temp</span>
                  <span className="text-alkota-black font-medium">120°C</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-6 border-t border-[#E8E8E4] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest block">Trade Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£445.00</span>
                      <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                    </div>
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] text-emerald-800 bg-emerald-100/80 px-2.5 py-1 font-medium">
                    In Stock (UK Warehouse)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddSurfaceCleaner}
                    className="flex-1 bg-alkota-black hover:bg-alkota-orange text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Add to Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/parts-attachments/product/mosmatic-dl-uhd-43"
                    className="px-6 py-4 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                  >
                    Details
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── STAGE 02: ASYMMETRICAL DUAL SPOTLIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Card 1: General Pump TS2021 */}
          <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-medium">
                  Triplex Pump Assembly
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                  ALK-PMP-001
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-white border border-[#EBEAE5] flex items-center justify-center p-8 overflow-hidden">
                <img
                  src="/assets/products/industrial-pump.png"
                  alt="General Pump TS2021 High-Pressure Triplex Pump"
                  className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/420x4.png');
                  }}
                />
              </div>

              <div>
                <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight uppercase mb-2">
                  General Pump TS2021 Series
                </h4>
                <p className="text-xs text-[#666] font-normal leading-relaxed">
                  The benchmark commercial pressure pump. Solid 99.8% alumina ceramic plungers and forged brass head engineered for continuous daily hot or cold washdown.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E4] flex items-center justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase block">Trade Price</span>
                <span className="font-ibm-plex-mono text-xl text-alkota-black font-light">£645.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddPump}
                  className="bg-alkota-black hover:bg-alkota-orange text-white px-4 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors font-medium cursor-pointer"
                >
                  Add
                </button>
                <Link
                  href="/parts-attachments/product/general-pump-ts2021"
                  className="font-ibm-plex-mono text-xs text-[#555] hover:text-black uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Specs</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Cox Reels 1125 Series */}
          <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-medium">
                  Hose Management
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                  COX-1125-3-100
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-white border border-[#EBEAE5] flex items-center justify-center p-8 overflow-hidden">
                <img
                  src="/assets/products/high-pressure-hose.png"
                  alt="Cox Reels 1125 Series Hand Crank Hose Reel"
                  className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/216x4.png');
                  }}
                />
              </div>

              <div>
                <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight uppercase mb-2">
                  Cox Reels 1125 Hand-Crank Reel
                </h4>
                <p className="text-xs text-[#666] font-normal leading-relaxed">
                  Heavy-gauge all-steel welded frame accommodating up to 30 metres of 3/8" high-pressure hose. Features nickel-plated brass live swivel and adjustable drag brake.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E4] flex items-center justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase block">Trade Price</span>
                <span className="font-ibm-plex-mono text-xl text-alkota-black font-light">£285.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddReel}
                  className="bg-alkota-black hover:bg-alkota-orange text-white px-4 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors font-medium cursor-pointer"
                >
                  Add
                </button>
                <Link
                  href="/parts-attachments/product/cox-reels-1125-3-100"
                  className="font-ibm-plex-mono text-xs text-[#555] hover:text-black uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Specs</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
