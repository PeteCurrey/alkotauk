'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import VideoBackground from '@/components/ui/VideoBackground';
import { usePartsRequest } from './PartsRequestListContext';

export default function ContinuousToolingExperience() {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const handleAddMosmatic = () => {
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
    <div className="relative w-full overflow-hidden">
      
      {/* ════════════════════════════════════════════════════════════════════════
          STAGE 01: THE WORLD (ARRIVAL FILM)
          100vh full-bleed industrial washdown film. No cards, no clutter.
          ════════════════════════════════════════════════════════════════════════ */}
      <section 
        className="relative min-h-screen w-full flex flex-col justify-between text-white bg-[#0A0A0A]"
        aria-label="Alkota UK Industrial Showroom Arrival"
      >
        <div className="absolute inset-0 w-full h-full">
          <VideoBackground
            src="/assets/video/alkota-action.mp4"
            poster="/assets/industrial-steam-washers.jpg"
            className="w-full h-full"
            overlayClassName="bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/20"
          />
        </div>

        {/* Global Nav Clearance */}
        <div className="pt-32" />

        {/* Monumental Hero Narration */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 my-auto py-12">
          <div className="max-w-4xl space-y-6">
            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)' }}
            >
              Make your <br />
              Alkota <br />
              <span className="text-white/60 font-light">do more.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/80 font-light leading-relaxed max-w-xl">
              Swiss rotary surface cleaners, heavy-duty hose management, and genuine factory spares. Stocked in the UK for next-day delivery.
            </p>
          </div>
        </div>

        {/* Seamless Downward Cue into Stage 02 */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-24 pb-8 flex items-center justify-between text-xs font-ibm-plex-mono text-white/50">
          <span>OEM Genuine Tooling</span>
          <a
            href="#product-reveal"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>Explore Tooling</span>
            <ChevronDown className="w-4 h-4 text-alkota-orange animate-bounce" />
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STAGE 02: THE OBJECT (PRODUCT REVEAL — MOSMATIC DL-UHD)
          Asymmetric canvas on warm stone (#FAF9F5). Physical product dominance.
          ════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="product-reveal" 
        className="relative w-full bg-[#FAF9F5] text-alkota-black py-24 sm:py-36 px-6 sm:px-12 lg:px-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Physical Dominance: Massive Product Cutout Crossing Bounds (7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[580px]">
            {/* Natural Ambient Contact Shadow */}
            <div className="absolute inset-x-8 bottom-4 h-16 bg-black/15 blur-3xl rounded-full pointer-events-none" />

            <img
              src="/assets/products/whirl-away-surface-cleaner.png"
              alt="Mosmatic DL-UHD 43 Stainless Steel Rotary Surface Cleaner"
              className="relative z-10 w-full h-auto max-w-[640px] object-contain filter drop-shadow-[0_28px_48px_rgba(0,0,0,0.18)] hover:scale-[1.02] transition-transform duration-700 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
              }}
            />
          </div>

          {/* Off-centre Narration & Quiet Commerce (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                Mosmatic Switzerland · 18" Rotary Dome
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)' }}
              >
                Clean large areas<br />
                <span className="text-[#666] font-light">faster.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed">
              Twin stainless steel spray arms rotate at 2,000 RPM inside a welded protective dome. Blasts concrete yards, forecourts, and workshop bays streak-free with zero overspray.
            </p>

            {/* Integrated Quiet Commerce */}
            <div className="pt-4 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£445.00</span>
                <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
                <span className="text-xs text-[#888] font-ibm-plex-mono ml-auto">In Stock · UK Warehouse</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddMosmatic}
                  className="bg-alkota-black hover:bg-alkota-orange text-white py-4 px-8 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Add to Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/parts-attachments/product/mosmatic-dl-uhd-43"
                  className="py-4 px-6 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STAGE 03: THE TRANSFORMATION (PRODUCT IN ACTION)
          Full-bleed real-world concrete washdown. Visual proof of performance.
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-12 min-h-[70vh] bg-[#F5F4EF] overflow-hidden">
        {/* Full-bleed Concrete Washdown Visual (7 Cols) */}
        <div className="lg:col-span-7 relative min-h-[45vh] lg:min-h-0 overflow-hidden">
          <img
            src="/assets/industries/construction.png"
            alt="Commercial concrete surface cleaning in action"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Narrative Anchor (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center p-10 sm:p-16 lg:p-20 bg-[#F5F4EF] space-y-6">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
            Real-World Application · Concrete Hardstanding
          </span>
          
          <h3 
            className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)' }}
          >
            Clean more<br />
            <span className="text-[#777] font-light">ground.</span>
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
      </section>

    </div>
  );
}
