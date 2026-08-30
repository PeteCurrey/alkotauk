'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

export default function MosmaticRevealScene() {
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

  return (
    <section id="surface-cleaners" className="w-full bg-[#FAF9F5] text-alkota-black overflow-hidden">
      
      {/* ── 01: THE PRODUCT REVEAL STAGE ── */}
      <div className="py-28 sm:py-36 px-6 sm:px-12 lg:px-24 border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Massive Physical Cutout Floating in Space (7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[580px]">
            <div className="absolute inset-x-12 bottom-6 h-20 bg-black/10 blur-3xl rounded-full pointer-events-none" />

            <img
              src="/assets/products/whirl-away-surface-cleaner.png"
              alt="Mosmatic DL-UHD 43 Stainless Steel Surface Cleaner"
              className="relative z-10 w-full h-auto max-w-[620px] object-contain filter drop-shadow-[0_32px_56px_rgba(0,0,0,0.16)] hover:scale-[1.03] transition-transform duration-700 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
              }}
            />
          </div>

          {/* Right Column: Confident Editorial Story & Direct Order (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-medium">
                Mosmatic Switzerland · 18" Rotary Tooling
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
              >
                Clean large areas<br />
                <span className="text-[#666] font-light">in half the time.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed pt-2">
                Twin stainless steel arms rotate at 2,000 RPM inside a welded dome. Blasts concrete yards, forecourts, and workshop bays streak-free with zero overspray.
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E8E4] font-ibm-plex-mono text-xs text-[#555]">
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Diameter</span>
                <span className="text-alkota-black font-medium">430mm (18")</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Pressure</span>
                <span className="text-alkota-black font-medium">275 Bar</span>
              </div>
              <div>
                <span className="text-[#999] block text-[9px] uppercase tracking-wider">Rating</span>
                <span className="text-alkota-black font-medium">120°C Hot Water</span>
              </div>
            </div>

            {/* Direct Order Actions */}
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
      </div>

      {/* ── 02: PRODUCT IN USE (REAL-WORLD SCALE & TRANSFORMATION) ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] bg-white border-b border-[#E8E8E4]">
        <div className="lg:col-span-6 relative min-h-[40vh] lg:min-h-0 overflow-hidden">
          <img
            src="/assets/industries/construction.png"
            alt="Commercial concrete surface cleaning in progress"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="lg:col-span-6 flex flex-col justify-center p-10 sm:p-16 lg:p-20 bg-[#F5F4EF] space-y-6">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
            Application · Concrete &amp; Pavement
          </span>
          <h3 
            className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            Zero zebra striping.<br />
            <span className="text-[#777] font-light">Consistent high-speed pass.</span>
          </h3>
          <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed max-w-md">
            Wand cleaning creates uneven pressure peaks and leaves zebra stripes on concrete. Mosmatic rotary arm geometry maintains a constant 25mm clearance and uniform pass coverage across thousands of square metres.
          </p>
          <div className="pt-2">
            <Link
              href="/parts-attachments/surface-cleaners"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors"
            >
              <span>Explore All Rotary Cleaners</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
