'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  productCount: number;
}

export default function ChemicalCampaignHero({ productCount }: Props) {
  return (
    <section 
      className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden"
      aria-label="Alkota UK Professional Cleaning Chemistry Campaign"
    >
      {/* Full-Bleed Atmospheric Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/industries/fleet.png"
          alt="Alkota Commercial Cleaning Chemistry in action"
          aria-hidden="true"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
      </div>

      {/* Main Campaign Statement Anchored to Bottom Left */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 pb-20 pt-40">
        <div className="max-w-2xl space-y-8">
          
          <div className="space-y-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-white/50 font-medium block">
              Professional Cleaning Chemistry
            </span>

            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Cleaning <br />
              <span className="text-white/50 font-light">chemistry.</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-md">
            Made for serious cleaning. Formulated to work faster under 50°C–90°C hot water pressure washing. Not domestic. Not diluted.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
            <a
              href="#flagships"
              className="inline-flex items-center gap-3 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-md cursor-pointer"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/chemicals/finder"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors py-4 px-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              <span>Chemical Match Tool</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Discreet Atmospheric Bottom Strip */}
      <div className="relative z-10 border-t border-white/10 px-6 sm:px-12 lg:px-24 py-4 flex flex-wrap items-center justify-between gap-4 text-[10px] font-ibm-plex-mono text-white/40 uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-6">
          <span>GB-CLP Compliant</span>
          <span className="text-white/20">·</span>
          <span>Accelerates at 50°C–90°C</span>
          <span className="text-white/20">·</span>
          <span>5L · 20L · 200L · 1000L IBC</span>
        </div>

        <a href="#catalogue" className="text-white/50 hover:text-white transition-colors">
          All Formulations ({productCount}) ↓
        </a>
      </div>
    </section>
  );
}
