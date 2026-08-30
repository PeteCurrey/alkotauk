'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

export default function ChemicalTransformationScene() {
  return (
    <div id="flagships" className="w-full">
      
      {/* ── 01: ROADFORCE — FULL-WIDTH 50/50 SPLIT ── */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-[#E8E8E4]">
        {/* Left: Full-bleed Fleet Photography */}
        <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden order-2 lg:order-1">
          <img
            src="/assets/industries/fleet.png"
            alt="Commercial fleet vehicle washing with RoadForce TFR"
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/10" />
          <span className="absolute bottom-6 left-6 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1">
            TR-407 · Touchless Traffic Film Remover
          </span>
        </div>

        {/* Right: Editorial Narrative & Action */}
        <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 bg-[#F5F4EF] space-y-8 order-1 lg:order-2">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
              Fleet Traffic Film Remover
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              RoadForce<br />
              <span className="text-[#666] font-light">Fleet Heavy TFR</span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#1A1A1A] font-light leading-snug max-w-md">
            "Cuts through road film and diesel grime in one touchless pass — without etching vehicle livery or polished aluminium."
          </p>

          <p className="text-sm text-[#666] font-normal leading-relaxed max-w-md">
            Static road film, winter road salt, and diesel exhaust soot release on contact. Works with cold water; accelerates significantly under 50°C–90°C hot washdown.
          </p>

          <div className="space-y-2 pt-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#999] tracking-widest block">
              Pack Formats
            </span>
            <div className="flex flex-wrap gap-2">
              {['5 L', '20 L', '200 L Drum', '1000 L IBC'].map(s => (
                <span key={s} className="font-ibm-plex-mono text-[10px] text-[#444] px-3 py-1 bg-white border border-[#DCDAD4]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#E0DED8]">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#999] block">Trade Price</span>
              <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">
                £38.50 <span className="text-[10px] text-[#777]">ex VAT</span>
              </span>
            </div>
            <Link
              href="/chemicals/product/roadforce-fleet-heavy-tfr"
              className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02: GREASECUT — DARK WORKSHOP IMMERSIVE ── */}
      <section className="w-full flex flex-col lg:flex-row min-h-[75vh] bg-[#111110] text-white overflow-hidden border-b border-[#222]">
        {/* Dark Left Column */}
        <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-24 bg-[#111110] lg:w-1/2 space-y-8 z-10">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium block">
              Plant Degreaser · DE-703
            </span>
            <h2 
              className="font-extralight text-white tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              GreaseCut<br />
              <span className="text-white/40 font-light">Workshop</span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-white/80 font-light leading-snug max-w-md">
            "Dissolves baked oil and chassis grease on contact."
          </p>

          <p className="text-sm text-white/50 font-normal leading-relaxed max-w-md">
            High-alkaline surfactant formulation engineered for earthmoving plant, agricultural equipment, and workshop maintenance bays. Saponifies heavy hydraulic fluids into clean rinse water.
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-white/40 block">Trade Price</span>
              <span className="font-ibm-plex-mono text-2xl text-white font-light">
                From £42.00 <span className="text-[10px] text-white/40">ex VAT</span>
              </span>
            </div>
            <Link
              href="/chemicals/product/greasecut-workshop-degreaser"
              className="inline-flex items-center gap-2 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-md"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Full-bleed Workshop Image */}
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Workshop degreasing heavy plant machinery"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* ── 03: ALUMARESTORE — PURE EDITORIAL TYPOGRAPHY WITH INLINE IMAGE ── */}
      <section className="w-full py-28 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Oversized Index Number */}
            <div className="lg:col-span-1 hidden lg:block">
              <span 
                className="font-ibm-plex-mono font-light text-[#EBEBEB] select-none leading-none block"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
              >
                03
              </span>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                  Aluminium Brightener · TS-602
                </span>
                <h2 
                  className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
                >
                  AlumaRestore<br />
                  <span className="text-[#999] font-light">Acid Brightener</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#1A1A1A] font-light leading-snug max-w-lg">
                "Restores weathered aluminium to satin brilliance in under two minutes."
              </p>

              <p className="text-sm text-[#666] leading-relaxed max-w-lg font-normal">
                Phosphoric and organic acid deoxidiser that strips grey chalking and heavy road oxidation from fuel tanks, wheels, and tipper bodies. Safe on painted surfaces when rinsed promptly.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['5 L', '20 L', '200 L', '1000 L'].map(s => (
                  <span key={s} className="font-ibm-plex-mono text-[10px] text-[#444] px-3 py-1 border border-[#DCDAD4] bg-[#FAF9F5]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Image & Direct Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#FAF9F5]">
                <img
                  src="/assets/hot-water-gauge-hero.jpg"
                  alt="Hot water pressure washer gauge detail"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase text-[#999] block">Trade Price</span>
                  <span className="font-ibm-plex-mono text-2xl text-alkota-black font-light">
                    From £46.00 <span className="text-[10px] text-[#777]">ex VAT</span>
                  </span>
                </div>
                <Link
                  href="/chemicals/product/alumarestore-aluminium-acid-brightener"
                  className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors font-medium"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 04: SCALEGUARD — WARM STONE CANVAS ── */}
      <section className="w-full py-28 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8] border-b border-[#E5E3DC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                Coil Protector · SD-927
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
              >
                ScaleGuard<br />
                <span className="text-[#999] font-light">Coil Protector</span>
              </h2>
              <p className="text-base sm:text-lg text-[#1A1A1A] font-light leading-snug max-w-sm">
                "Binds hard water minerals before they block your heating coil."
              </p>
              <p className="text-sm text-[#666] leading-relaxed max-w-sm font-normal">
                Essential preventative treatment for all hot water pressure washers. Prevents scale choke points and keeps your 7-year boiler warranty intact.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-[#DCDAD4]">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] block">Trade Price</span>
                  <span className="font-ibm-plex-mono text-2xl text-alkota-black font-light">
                    From £34.00 <span className="text-[10px] text-[#777]">ex VAT</span>
                  </span>
                </div>
                <Link
                  href="/chemicals/product/scaleguard-coil-protector"
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/assets/engineered-continuous-duty.jpg"
                alt="Alkota pressure washer heating coil"
                className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
