'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Wrench, ChevronRight, Activity, Gauge, Flame } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface FeaturedToolingShowcaseProps {
  featuredParts?: any[];
}

export default function FeaturedToolingShowcase({ featuredParts = [] }: FeaturedToolingShowcaseProps) {
  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#1C1C1A] relative overflow-hidden">
      
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#FF6900]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-radial from-white/3 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* ── SECTION HEADER: LUXURY EDITORIAL TYPOGRAPHY ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#222] pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange animate-pulse" />
              <span>Flagship Engineering Showcase</span>
            </div>
            <h2 
              className="font-extralight text-white tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
            >
              Engineered for more.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
            High-value industrial attachments and OEM pump components calibrated to maximize hydraulic impact, thermal efficiency, and multi-shift durability.
          </p>
        </div>

        {/* ── STAGE 01: MONUMENTAL FLAGSHIP SHOWCASE (Watch / Automotive Staging) ── */}
        <div className="relative bg-gradient-to-b from-[#141412] to-[#0A0A0A] border border-[#262624] overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left 7 Cols: Massive Hero Product Imagery with Technical Callouts */}
            <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[520px] bg-radial from-[#1E1E1B] to-[#10100E] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262624] overflow-hidden group">
              
              {/* Product Identifier Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.25em] text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                  FLAGSHIP PUMP ASSEMBLY · 1450 RPM
                </span>
                <span className="font-ibm-plex-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Solid Alumina Ceramic</span>
                </span>
              </div>

              {/* Centered High-Res Machinery Rendering with Depth */}
              <div className="my-auto py-8 relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
                  <img
                    src="/assets/products/420x4.png"
                    alt="General Pump TS2021 High Pressure Ceramic Plunger Pump"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', '/assets/products/hot-water-skid.png');
                    }}
                  />
                </div>

                {/* Floating Technical Annotation Callouts */}
                <div className="hidden sm:block absolute bottom-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 font-ibm-plex-mono text-[10px] text-[#DDD]">
                  <span className="text-[#666] block text-[8px] uppercase">Forged Manifold</span>
                  Forged Nickel-Plated Brass
                </div>

                <div className="hidden sm:block absolute top-12 right-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 font-ibm-plex-mono text-[10px] text-[#DDD]">
                  <span className="text-[#666] block text-[8px] uppercase">Crankcase Duty</span>
                  Oversized Connecting Rods
                </div>
              </div>

              {/* Bottom Technical Bar */}
              <div className="z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-ibm-plex-mono text-xs">
                <div>
                  <span className="text-[#666] block text-[9px] uppercase tracking-wider">Pressure Rating</span>
                  <span className="text-white font-medium">200 BAR (3000 PSI)</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase tracking-wider">Flow Output</span>
                  <span className="text-white font-medium">21.0 L/MIN</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase tracking-wider">Shaft Diameter</span>
                  <span className="text-white font-medium">24mm Solid Keyed</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Editorial Narrative & Commercial Action */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#0D0D0B]">
              <div className="space-y-6">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-[0.2em] block mb-2 font-medium">
                    // Model Code: GP-TS2021
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extralight text-white tracking-tight leading-tight uppercase">
                    General Pump TS2021 Series
                  </h3>
                  <span className="text-xs font-ibm-plex-mono text-[#777] block mt-1 uppercase tracking-wider">
                    Genuine Alkota Hot &amp; Cold Water Triplex Pump
                  </span>
                </div>

                <p className="text-sm text-[#AAA] font-light leading-relaxed">
                  The benchmark industrial workhorse for continuous multi-shift pressure washing. Built with forged brass manifolds, solid 99.8% alumina ceramic plungers, and dual-pack V-seals that eliminate thermal shock degradation.
                </p>

                {/* Compatibility tags */}
                <div className="space-y-2 pt-2 border-t border-[#222]">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block">
                    Direct Fitment Compatibility:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Alkota 420X4', 'Alkota 518X4', 'Alkota 311X4', '200 Series Skids', 'Industrial Trailer Rigs'].map((m) => (
                      <span key={m} className="font-ibm-plex-mono text-[10px] text-[#BBB] bg-[#1A1A18] px-2.5 py-1 border border-[#2A2A28]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trade Price & Direct Action */}
              <div className="pt-6 border-t border-[#222] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase tracking-widest block">Direct Trade Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-ibm-plex-mono text-3xl text-white font-light">£645.00</span>
                      <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase">ex VAT</span>
                    </div>
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30">
                    In Stock (UK Warehouse)
                  </span>
                </div>

                <Link
                  href="/parts-attachments/product/general-pump-ts2021"
                  className="w-full bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-[0.2em] transition-all font-medium inline-flex items-center justify-center gap-3 shadow-xl group"
                >
                  <span>View Technical Specification</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* ── STAGE 02: ASYMMETRICAL DUAL PRECISION SHOWCASE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Mosmatic DL-UHD Surface Cleaner */}
          <div className="bg-gradient-to-b from-[#121210] to-[#0A0A0A] border border-[#222] hover:border-alkota-orange/60 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                  Swiss Rotary Tooling
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#888]">
                  MOS-DL-UHD-43
                </span>
              </div>

              <div className="relative aspect-[16/9] bg-black/40 border border-[#222] flex items-center justify-center p-6 overflow-hidden">
                <img
                  src="/assets/products/surface-cleaner.png"
                  alt="Mosmatic DL-UHD 43 Surface Cleaner"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/216bd2.png');
                  }}
                />
              </div>

              <div>
                <h4 className="text-2xl font-light text-white tracking-tight uppercase mb-2">
                  Mosmatic DL-UHD 43 Surface Cleaner
                </h4>
                <p className="text-xs text-[#999] font-light leading-relaxed">
                  Swiss-engineered stainless steel dual-arm rotary cleaner with integrated recovery port for splash-free flat surface decontamination.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#222] flex items-center justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase block">Trade Price</span>
                <span className="font-ibm-plex-mono text-lg text-white">£445.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
              </div>
              <Link
                href="/parts-attachments/product/mosmatic-dl-uhd-43"
                className="font-ibm-plex-mono text-xs text-alkota-orange hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <span>View Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Cox Reels Industrial Hose Reel */}
          <div className="bg-gradient-to-b from-[#121210] to-[#0A0A0A] border border-[#222] hover:border-alkota-orange/60 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                  Industrial Hose Management
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#888]">
                  COX-1125-3-100
                </span>
              </div>

              <div className="relative aspect-[16/9] bg-black/40 border border-[#222] flex items-center justify-center p-6 overflow-hidden">
                <img
                  src="/assets/products/hose-reel.png"
                  alt="Cox Reels 1125 Series Hand Crank Reel"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/216x4.png');
                  }}
                />
              </div>

              <div>
                <h4 className="text-2xl font-light text-white tracking-tight uppercase mb-2">
                  Cox Reels 1125-3-100 Hand-Crank Reel
                </h4>
                <p className="text-xs text-[#999] font-light leading-relaxed">
                  All-steel welded chassis accommodating 30m of 3/8" 300 Bar hose with nickel-plated brass live swivel and adjustable drag brake.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#222] flex items-center justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase block">Trade Price</span>
                <span className="font-ibm-plex-mono text-lg text-white">£285.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
              </div>
              <Link
                href="/parts-attachments/product/cox-reels-1125-3-100"
                className="font-ibm-plex-mono text-xs text-alkota-orange hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <span>View Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
