'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Droplet, Award } from 'lucide-react';

export default function ChemicalStorefrontHero() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#1A1917] text-[#F4F1EA] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28">
      {/* ── FULL-BLEED PHOTOGRAPHIC BACKGROUND WITH SCRIM ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/industries/fleet.png"
          alt="Alkota commercial vehicle pressure washing with high performance chemical detergent"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.55] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/90 via-[#1A1917]/50 to-transparent" />
      </div>

      {/* ── TOP BADGE & CONTEXT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 text-[11px] font-ibm-plex-mono text-[#F4F1EA]">
          <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[#FF6900] font-medium">Alkota Cleaning Chemistry</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80">GB-CLP Certified Detergents &amp; Degreasers</span>
        </div>
      </div>

      {/* ── CENTER / HERO CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12 lg:py-16">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F1EA] leading-[1.05]">
            CHEMISTRY THAT EARNS ITS KEEP.
          </h1>
          
          <p className="text-base sm:text-xl text-[#D0CCC4] font-normal leading-relaxed max-w-2xl">
            Commercial-grade detergents, degreasers and restorative chemistry. Hot-water accelerated to cut clean times in half without surface damage.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a
              href="#featured-chemicals"
              className="inline-flex items-center justify-center gap-3 bg-[#FF6900] hover:bg-white hover:text-[#1A1917] text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold shadow-lg shadow-[#FF6900]/20"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#commercial-bulk"
              className="inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-[#F4F1EA] border border-white/30 hover:border-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium backdrop-blur-sm"
            >
              <span>Commercial Bulk / IBC Supply</span>
              <ArrowRight className="w-4 h-4 text-[#FF6900]" />
            </a>
          </div>
        </div>
      </div>

      {/* ── BASE TRUST STRIP ── */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#1A1917]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-ibm-plex-mono text-[#D0CCC4]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>100% GB-CLP Compliant &amp; SDS Verified</span>
          </div>
          <div className="flex items-center gap-3 sm:justify-center">
            <Droplet className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>Available in 5L, 20L, 200L &amp; 1000L IBC</span>
          </div>
          <div className="flex items-center gap-3 sm:justify-end">
            <Truck className="w-4 h-4 text-[#FF6900] shrink-0" />
            <span>Next-Day Despatch from UK Warehouse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
