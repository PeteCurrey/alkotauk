'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function ShowroomHero() {
  return (
    <section 
      className="relative min-h-[92vh] w-full flex flex-col justify-between bg-[#FAF9F5] text-alkota-black pt-36 pb-16 px-6 sm:px-12 lg:px-24 overflow-hidden"
      aria-label="Alkota UK Parts and Attachments Showroom"
    >
      {/* Subtle Natural Light Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F4EF] via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-3/5 bg-gradient-to-l from-[#F0EFEB]/80 to-transparent pointer-events-none hidden lg:block" />

      {/* Main Hero Composition: Monumental Typography + Enormous Floating Product */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Confident, Restrained Editorial Narrative (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#777] font-medium block">
              Equipment &amp; Spares Showroom
            </span>

            <h1 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.9] select-none"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 6.2rem)' }}
            >
              Make your <br />
              Alkota <br />
              <span className="text-[#666] font-light">do more.</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed max-w-md">
            Swiss rotary surface cleaners, heavy-duty hose management, and genuine factory spares. Stocked in the UK for next-day delivery.
          </p>

          {/* Minimal, Confident Actions */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="#surface-cleaners"
              className="inline-flex items-center justify-center gap-3 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer shadow-sm"
            >
              <span>Explore Attachments</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center justify-center gap-2 text-[#555] hover:text-black font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors py-4 px-2"
            >
              <span>Parts Finder</span>
              <ChevronRight className="w-3.5 h-3.5 text-alkota-orange" />
            </Link>
          </div>

        </div>

        {/* Right Column: Giant Product Cutout (7 Cols, Dominating the Screen) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
          
          {/* Natural Ambient Ground Shadow */}
          <div className="absolute inset-x-8 bottom-4 h-16 bg-black/10 blur-3xl rounded-full pointer-events-none" />

          {/* Monumental Product Image Cutout */}
          <img
            src="/assets/products/whirl-away-surface-cleaner.png"
            alt="Mosmatic Stainless Steel Flat Surface Cleaner"
            className="relative z-10 max-h-[540px] w-auto object-contain filter drop-shadow-[0_28px_48px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 select-none"
            onError={(e) => {
              (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
            }}
          />

          {/* Discreet Floating Product Caption */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md border border-[#E0DED8] px-4 py-2.5 shadow-sm hidden sm:block">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-semibold">
              Mosmatic DL-UHD
            </span>
            <span className="text-xs font-light text-alkota-black">
              18" Rotary Surface Cleaner · 275 Bar
            </span>
          </div>

        </div>

      </div>

      {/* Discreet Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#777]">
        <div className="flex flex-wrap items-center gap-6">
          <span>OEM Genuine Parts</span>
          <span className="text-[#DDD]">•</span>
          <span>Mosmatic · Cox Reels · General Pump</span>
          <span className="text-[#DDD]">•</span>
          <span>Despatched UK Mainland</span>
        </div>

        <Link
          href="/parts-attachments/categories"
          className="text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors inline-flex items-center gap-1 font-medium"
        >
          <span>All 16 Categories</span>
          <ArrowRight className="w-3 h-3 text-alkota-orange" />
        </Link>
      </div>

    </section>
  );
}
