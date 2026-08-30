'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles, ShieldCheck, Wrench, ChevronRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

export default function ShowroomHero() {
  return (
    <section 
      className="relative min-h-[92vh] w-full flex flex-col justify-between bg-[#0A0A0A] text-white pt-28 pb-12 px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-[#222]"
      aria-label="Alkota Parts & Attachments Showroom Hero"
    >
      {/* ── CINEMATIC BACKGROUND WITH INDUSTRIAL DEPTH & VIGNETTES ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 opacity-30 filter grayscale contrast-125 scale-105 transition-transform duration-1000">
          <SafeImage
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota Precision Parts Workshop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Soft Radial and Directional Vignettes for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-alkota-orange/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── TOP TELEMETRY / CATEGORY PATH INDICATOR ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
          <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange animate-pulse" />
          <span className="text-white font-medium">Alkota UK Parts &amp; Tooling Showroom</span>
          <span>·</span>
          <span>500+ OEM Spares &amp; Precision Attachments</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-ibm-plex-mono text-[#AAA]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest">Guaranteed Compatibility</span>
          </div>
          <span className="text-[#444] hidden sm:inline">|</span>
          <div className="text-[10px] uppercase tracking-widest text-white/90">
            Next-Day UK Despatch
          </div>
        </div>
      </div>

      {/* ── MAIN HERO IDENTITY & OVERSIZED COMPOSITION ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Monumental Typography & Discovery Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 font-normal">
              <span className="h-[1.5px] w-6 bg-alkota-orange shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light font-ibm-plex-mono">
                Genuine OEM Components &amp; Swiss Tooling
              </span>
            </div>

            <h1 
              className="font-extralight uppercase tracking-tight text-white leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 6.8vw, 6.2rem)' }}
            >
              Engineered to<br />
              <span className="text-alkota-orange">multiply output.</span>
            </h1>

            <p className="text-[#DDD] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Genuine Alkota pump assemblies, Schedule 80 heating coils, Swiss Mosmatic rotary surface cleaners, and heavy-duty Cox Reels. Built to withstand continuous industrial duty.
            </p>

            {/* Fast Precision Part / Model Search Bar */}
            <div className="max-w-xl bg-white/95 backdrop-blur-sm p-1.5 shadow-2xl">
              <form action="/parts-attachments/search" method="GET" className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#888] ml-2.5 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Part number, pump model (e.g. TS2021), brand or keyword..."
                  className="w-full bg-transparent text-alkota-black text-xs sm:text-sm px-2 py-2.5 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  className="bg-alkota-orange hover:bg-black text-white px-6 py-2.5 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer font-medium"
                >
                  Search Store
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
              <Link
                href="/parts-attachments/categories"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 text-xs font-ibm-plex-mono uppercase tracking-[0.2em] transition-all shadow-xl group font-medium"
              >
                <span>Browse All Categories</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/parts-attachments/finder"
                className="inline-flex items-center justify-center gap-3 border border-white/30 bg-black/40 backdrop-blur-sm text-white px-7 py-4 text-xs font-ibm-plex-mono uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Interactive Part Finder</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Feature Card (5 cols - Porsche / Apple Inspired) */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-[#181816] to-[#0E0E0C] border border-[#2A2A28] p-7 shadow-2xl">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 border border-alkota-orange/30 px-2 py-0.5">
                  Featured Attachment
                </span>
                <span className="font-ibm-plex-mono text-xs text-[#888]">
                  Swiss Precision
                </span>
              </div>

              <div className="relative aspect-[4/3] bg-black/50 border border-[#222] overflow-hidden mb-6 group flex items-center justify-center p-4">
                <img
                  src="/assets/products/surface-cleaner.png"
                  alt="Mosmatic DL-UHD Professional Surface Cleaner"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high pressure pump image if surface cleaner asset not present
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/420x4.png');
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-1 border border-white/10 font-ibm-plex-mono text-[9px] text-[#CCC]">
                  MOS-DL-UHD-43
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-light text-white tracking-tight">
                  Mosmatic DL-UHD 43 Surface Cleaner
                </h3>
                <p className="text-xs text-[#999] leading-relaxed font-normal">
                  Swiss-machined stainless steel dual-arm rotary cleaner with integrated recovery port for clean indoor/outdoor surface restoration.
                </p>
                <div className="pt-3 flex items-center justify-between border-t border-[#222]">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase block">Trade Price</span>
                    <span className="font-ibm-plex-mono text-base text-white font-medium">£445.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
                  </div>
                  <Link
                    href="/parts-attachments/product/mosmatic-dl-uhd-43"
                    className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs text-alkota-orange hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM TELEMETRY STRIP ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#888]">
        <div className="flex flex-wrap items-center gap-6 text-[11px] font-ibm-plex-mono">
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">OEM Coverage</span>
            <span className="text-white font-medium">100% Alkota Machine Lineup</span>
          </div>
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">Brand Partners</span>
            <span className="text-white font-medium">Mosmatic · CoxREELS · Steel Eagle · General Pump</span>
          </div>
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">UK Inventory</span>
            <span className="text-emerald-400 font-medium">In Stock &amp; Despatched UK-Wide</span>
          </div>
        </div>

        <div className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
          Precision Machined Parts × Guaranteed Fitment
        </div>
      </div>
    </section>
  );
}
