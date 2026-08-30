'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles, ShieldCheck } from 'lucide-react';

export default function ShowroomHero() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 lg:px-24 font-normal border-b border-[#1A1A1A]"
      aria-label="Alkota UK Parts & Attachments Showroom"
    >
      {/* ── RESTORED AUTHENTIC WORKSHOP BACKGROUND WITH HIGH-CONTRAST GRADING ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/assets/parts/parts-hero-workshop.jpg"
          alt="Alkota engineering workshop"
          className="h-full w-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.62) contrast(1.15)' }}
        />
        {/* Cinematic Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-alkota-orange/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── MAIN HERO IDENTITY & MONUMENTAL TYPOGRAPHY (CLEAN, NO CLUMSING SIDE BOX) ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-24 sm:py-32">
        <div className="max-w-3xl space-y-8">
          
          {/* Provenance Tag */}
          <div className="inline-flex items-center gap-3 font-normal">
            <span className="h-[1.5px] w-6 bg-alkota-orange shrink-0" />
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-white/90 font-light">
              Alkota UK · Genuine OEM Parts &amp; Precision Attachments
            </span>
          </div>

          {/* Monumental Headline */}
          <h1
            className="font-extralight uppercase tracking-tight text-white leading-[0.92]"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
          >
            Parts that keep<br />
            <span className="text-alkota-orange">the pressure on.</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-[#E0E0DC] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-light">
            Genuine Alkota pump components, Schedule 80 heating coils, Swiss Mosmatic rotary surface cleaners, and heavy-duty Cox Reels. Engineered to endure continuous industrial duty.
          </p>

          {/* Fast Precision Part / Model Search Bar */}
          <div className="max-w-xl bg-white/95 backdrop-blur-md p-1.5 shadow-2xl">
            <form action="/parts-attachments/search" method="GET" className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[#888] ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Search part number, pump model (e.g. TS2021), or brand..."
                className="w-full bg-transparent text-alkota-black text-xs sm:text-sm px-2 py-3 focus:outline-none font-normal"
              />
              <button
                type="submit"
                className="bg-alkota-orange hover:bg-black text-white px-7 py-3 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors shrink-0 cursor-pointer font-medium"
              >
                Search Store
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 text-xs font-ibm-plex-mono uppercase tracking-[0.2em] transition-all shadow-xl group font-medium"
            >
              <span>Explore All Categories</span>
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

          {/* Telemetry Strip */}
          <div className="pt-6 flex flex-wrap items-center gap-8 font-ibm-plex-mono text-xs text-[#AAA] border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange" />
              <span className="text-white font-medium">500+ OEM Spares In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Next-Day UK Mainland Despatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Guaranteed Fitment</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
