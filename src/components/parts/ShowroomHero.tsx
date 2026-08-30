'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';

export default function ShowroomHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/parts-attachments/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section 
      className="relative min-h-[88vh] w-full flex flex-col justify-between bg-[#FAF9F5] text-alkota-black pt-32 pb-12 px-6 sm:px-12 lg:px-24 border-b border-[#E8E8E4] overflow-hidden"
      aria-label="Alkota UK Parts and Attachments Showroom"
    >
      {/* Background Subtle Warm Stone Gradient & Architecture Line */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F4EF] via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#F2F0E8]/60 to-transparent pointer-events-none hidden lg:block" />

      {/* Main Grid: Left Typography & Search / Right Dramatic Product Scale */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-10">
        
        {/* Left Column: Human, Restrained, Confident Typography (7 Cols) */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Section Marker */}
          <div className="inline-flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-[#777] font-medium">
              Parts &amp; Tooling Showroom
            </span>
          </div>

          {/* Monumental Headline (Human Language, No Buzzwords) */}
          <h1 
            className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.8rem)' }}
          >
            Make your Alkota <br />
            <span className="text-[#555] font-light">do more.</span>
          </h1>

          {/* Simple Supporting Copy */}
          <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed max-w-lg">
            Genuine factory spares, Swiss rotary surface cleaners, and heavy-duty hose reels. Sourced and stocked in the UK for next-day dispatch.
          </p>

          {/* Minimal Search Input */}
          <form onSubmit={handleSearch} className="max-w-md">
            <div className="relative flex items-center bg-white border border-[#DCDAD4] hover:border-black focus-within:border-black focus-within:ring-2 focus-within:ring-alkota-orange/20 shadow-sm transition-all">
              <Search className="w-4 h-4 text-[#888] ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Part number, machine model, or attachment..."
                className="w-full bg-transparent text-xs sm:text-sm text-alkota-black px-3 py-3.5 focus:outline-none placeholder:text-[#999] font-normal"
              />
              <button
                type="submit"
                className="bg-alkota-black hover:bg-alkota-orange text-white px-5 py-3.5 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* Clean Action Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-ibm-plex-mono">
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-2 text-alkota-black hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors group"
            >
              <span>Browse 16 Categories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-alkota-orange" />
            </Link>
            <span className="text-[#DDD]">•</span>
            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center gap-2 text-[#666] hover:text-black uppercase tracking-wider transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              <span>Parts Finder Tool</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Massive Hero Product Imagery (6 Cols, 60%+ Visual Area) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          {/* Subtle Stage Background */}
          <div className="relative w-full max-w-xl aspect-square flex items-center justify-center p-6">
            
            {/* Soft Ambient Radial Shadow */}
            <div className="absolute inset-x-8 bottom-6 h-12 bg-black/10 blur-2xl rounded-full pointer-events-none" />
            
            {/* High-Resolution Hero Attachment Cutout */}
            <img
              src="/assets/products/whirl-away-surface-cleaner.png"
              alt="Mosmatic Stainless Steel Flat Surface Cleaner"
              className="relative z-10 max-h-[90%] max-w-[90%] object-contain filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-700 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
              }}
            />

            {/* Minimalist Floating Product Tag */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-[#E0DED8] px-4 py-2 shadow-lg z-20">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-semibold">
                Mosmatic DL-UHD
              </span>
              <span className="text-xs font-light text-alkota-black">
                Dual-Arm Surface Cleaner
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Telemetry & Trust Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-ibm-plex-mono text-[#777]">
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Inventory</span>
            <span className="text-alkota-black font-medium">500+ Spares Stocked in UK</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-[#E0DED8]" />
          <div>
            <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Dispatch</span>
            <span className="text-alkota-black font-medium">Next-Day UK Mainland Delivery</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-[#E0DED8]" />
          <div>
            <span className="text-[#AAA] block text-[9px] uppercase tracking-widest">Compatibility</span>
            <span className="text-emerald-700 font-medium">100% Guaranteed Fitment</span>
          </div>
        </div>

        <Link
          href="/parts-attachments/enquiry"
          className="text-[#666] hover:text-black uppercase tracking-wider transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Need help finding a part? Talk to an engineer</span>
          <ChevronRight className="w-3.5 h-3.5 text-alkota-orange" />
        </Link>
      </div>

    </section>
  );
}
