'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react';

export default function StorefrontHero() {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen bg-[#1A1917] text-[#F4F1EA] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28">
      {/* ── LEVEL 01: BACKGROUND PHOTOGRAPHY WITH AMBIENT BREATHING ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full animate-ambient-zoom origin-center">
          <Image
            src="/assets/hot-water-gauge-hero.jpg"
            alt="Alkota industrial pressure washer high-temperature manifold and engineering precision"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.62] contrast-[1.12]"
          />
        </div>
        {/* Multistage Scrim: deep bottom-and-top gradient for pure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/90 via-[#1A1917]/40 to-transparent" />
      </div>

      {/* ── LEVEL 02: TOP CONTEXT BADGE ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 text-[11px] font-ibm-plex-mono text-[#F4F1EA] rounded-[4px] shadow-tactile-sm">
          <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[#FF6900] font-medium">Alkota UK Storefront</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80">OEM Spares, Tooling &amp; Chemistry</span>
        </div>
      </div>

      {/* ── LEVEL 03 & 04: HERO HEADLINE & TACTILE ACTIONS ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12 lg:py-16">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F1EA] leading-[1.05] drop-shadow-sm">
            MAKE YOUR ALKOTA DO MORE.
          </h1>
          
          <p className="text-base sm:text-xl text-[#D0CCC4] font-normal leading-relaxed max-w-2xl">
            Parts, attachments and cleaning chemistry for serious machines. OEM pumps, Swiss rotary tooling, and UK-blended formulations.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a
              href="#featured-tooling"
              className="inline-flex items-center justify-center gap-3 bg-[#FF6900] hover:bg-white hover:text-[#1A1917] text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest font-semibold rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Shop Attachments</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/parts-attachments/chemicals"
              className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-[#F4F1EA] border border-white/25 hover:border-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest font-medium backdrop-blur-sm rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Shop Cleaning Chemistry</span>
              <ArrowRight className="w-4 h-4 text-[#FF6900]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── BASE TRUST STRIP WITH MATERIAL GROUNDING ── */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#1A1917]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-ibm-plex-mono text-[#D0CCC4]">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>Next-Day UK Mainland Delivery</span>
          </div>
          <div className="flex items-center gap-3 sm:justify-center">
            <ShieldCheck className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>Official Factory Warranties</span>
          </div>
          <div className="flex items-center gap-3 sm:justify-end">
            <Wrench className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>Est. 1964 · Alcester, South Dakota</span>
          </div>
        </div>
      </div>
    </section>
  );
}
