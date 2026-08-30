'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
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

  return (
    <div className="w-full">
      
      {/* ── 01: MAJOR EDITORIAL TRANSITION / TYPOGRAPHIC STATEMENT ── */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8] text-alkota-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-[#777] block mb-4 font-medium">
              Productivity Tooling
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            >
              The right tool <br />
              <span className="text-[#666] font-light">changes the job.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed">
              A commercial pressure washer is only as productive as the attachment at the end of the line. Clean double the square footage in half the time, protect hoses from vehicle runovers, and replace worn pump components back to factory output.
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs font-ibm-plex-mono">
              <Link
                href="/parts-attachments/surface-cleaners"
                className="text-alkota-black hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <span>Surface Cleaners</span>
                <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
              </Link>
              <span className="text-[#CCC]">•</span>
              <Link
                href="/parts-attachments/hoses"
                className="text-alkota-black hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <span>Hose Management</span>
                <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 02: EDITORIAL FEATURE — MOSMATIC SURFACE CLEANER (PURE WHITE, 70% PRODUCT) ── */}
      <section id="surface-cleaners" className="py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left 7 Cols: Massive Product Cutout Floating Openly */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] sm:min-h-[520px]">
            <div className="absolute inset-x-12 bottom-6 h-14 bg-black/10 blur-2xl rounded-full pointer-events-none" />

            <img
              src="/assets/products/whirl-away-surface-cleaner.png"
              alt="Mosmatic DL-UHD Flat Surface Cleaner"
              className="relative z-10 max-h-[460px] w-auto object-contain filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-700 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
              }}
            />
          </div>

          {/* Right 5 Cols: Short, Confident Story & Direct Buy Action */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
                Mosmatic Switzerland · 18" Rotary Tooling
              </span>
              <h3 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
              >
                Clean large areas in half the time.
              </h3>
              <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed pt-2">
                Twin stainless steel arms rotate at up to 2,000 RPM inside a welded dome. Blasts concrete yards, forecourts, and workshop floors streak-free with zero overspray.
              </p>
            </div>

            {/* Spec Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E8E4] font-ibm-plex-mono text-xs text-[#555]">
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Width</span>
                <span className="text-alkota-black font-medium">430mm (18")</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Pressure</span>
                <span className="text-alkota-black font-medium">275 Bar</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Temp</span>
                <span className="text-alkota-black font-medium">120°C Hot Water</span>
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
                <span className="font-ibm-plex-mono text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 font-medium border border-emerald-200">
                  In Stock · UK Warehouse
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
                  View Details
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 03: DRAMATIC CONTRAST MOMENT — COX REELS (FULL-BLEED DARK SPLIT) ── */}
      <section className="w-full flex flex-col lg:flex-row min-h-[85vh] overflow-hidden">
        
        {/* Left: dark text column — full height, generous padding */}
        <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 xl:px-24 py-24 bg-[#111110] text-white lg:w-5/12 space-y-8">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              Cox Reels USA · Industrial Hose Management
            </span>
            <h3 
              className="font-extralight text-white tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
            >
              All-steel hose<br />
              <span className="text-white/40 font-light">management.</span>
            </h3>
            <p className="text-sm sm:text-base text-[#AAA] font-normal leading-relaxed max-w-sm pt-2">
              Keep 30 metres of high-pressure hose tidy, safe, and ready to deploy. Heavy-gauge welded steel frame with CPC brass live swivel and adjustable drag brake.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#262626] font-ibm-plex-mono text-xs text-[#AAA]">
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-wider">Capacity</span>
              <span className="text-white font-medium">30m (3/8")</span>
            </div>
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-wider">Rating</span>
              <span className="text-white font-medium">300 Bar</span>
            </div>
            <div>
              <span className="text-[#666] block text-[9px] uppercase tracking-wider">Mount</span>
              <span className="text-white font-medium">Floor / Wall</span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#262626] space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase tracking-widest">Trade Price</span>
              <span className="font-ibm-plex-mono text-3xl text-white font-light">£285.00</span>
              <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddReel}
                className="flex-1 bg-white hover:bg-alkota-orange text-black hover:text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add to Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/parts-attachments/product/cox-reels-1125-3-100"
                className="px-6 py-4 border border-[#333] hover:border-white text-white text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Right: product floats on a dark field — full height */}
        <div className="relative lg:w-7/12 min-h-[50vh] lg:min-h-0 flex items-center justify-center bg-[#0D0D0C] overflow-hidden">
          <div className="absolute inset-x-24 bottom-8 h-20 bg-black/60 blur-3xl rounded-full pointer-events-none" />
          <img
            src="/assets/products/high-pressure-hose.png"
            alt="Cox Reels Heavy Duty Hose Reel"
            className="relative z-10 w-full h-auto max-w-[520px] object-contain filter drop-shadow-[0_32px_56px_rgba(0,0,0,0.7)] hover:scale-[1.03] transition-transform duration-700 select-none px-8 lg:px-0"
            onError={(e) => {
              (e.target as HTMLElement).setAttribute('src', '/assets/products/216x4.png');
            }}
          />
        </div>

      </section>

      {/* ── 04: SCULPTURAL PUMP FEATURE — GENERAL PUMP TS2021 (WARM STONE CANVAS) ── */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left 7 Cols: Massive Pump Cutout */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] sm:min-h-[520px]">
            <div className="absolute inset-x-12 bottom-6 h-14 bg-black/10 blur-2xl rounded-full pointer-events-none" />

            <img
              src="/assets/products/industrial-pump.png"
              alt="General Pump TS2021 Triplex Pump"
              className="relative z-10 max-h-[440px] w-auto object-contain filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-700 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/products/420x4.png');
              }}
            />
          </div>

          {/* Right 5 Cols: Pump Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
                General Pump · High-Pressure Triplex
              </span>
              <h3 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
              >
                The benchmark industrial pump.
              </h3>
              <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed pt-2">
                Solid 99.8% alumina ceramic plungers and heavy forged brass head. Engineered for continuous daily hot or cold washdown in the harshest industrial environments.
              </p>
            </div>

            {/* Spec Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E8E4] font-ibm-plex-mono text-xs text-[#555]">
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Output</span>
                <span className="text-alkota-black font-medium">15 L/min</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Pressure</span>
                <span className="text-alkota-black font-medium">200 Bar</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Plungers</span>
                <span className="text-alkota-black font-medium">Solid Ceramic</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-[#E8E8E4] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest block">Trade Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£645.00</span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                  </div>
                </div>
                <span className="font-ibm-plex-mono text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 font-medium border border-emerald-200">
                  In Stock · UK Warehouse
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddPump}
                  className="flex-1 bg-alkota-black hover:bg-alkota-orange text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Add to Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/parts-attachments/product/general-pump-ts2021"
                  className="px-6 py-4 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
