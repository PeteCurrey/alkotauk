'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Layers, Wrench, Droplet } from 'lucide-react';

export default function CuratedCategoryDoors() {
  return (
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#1A1917] text-[#F4F1EA]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── SECTION HEADER ── */}
        <div className="space-y-3 max-w-2xl">
          <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
            // Category Navigation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F1EA]">
            Built for the machines that work for a living.
          </h2>
          <p className="text-sm sm:text-base text-[#AAA] font-normal leading-relaxed">
            Select your department below to view compatible hardware, technical specifications, and immediate UK stock.
          </p>
        </div>

        {/* ── ASYMMETRIC PHOTOGRAPHIC DOORS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Door 1: Rotary Tooling & Attachments (7 Columns) */}
          <div className="lg:col-span-7 relative group min-h-[420px] sm:min-h-[480px] bg-[#242220] border border-white/10 hover:border-[#FF6900] transition-all duration-300 flex flex-col justify-between p-8 sm:p-12 overflow-hidden">
            {/* Background Image & Scrim */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/industries/construction.png"
                alt="Surface cleaner on concrete yard"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center brightness-[0.4] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/70 to-black/40" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] bg-black/40 px-3 py-1 border border-white/10">
                <Layers className="w-3 h-3 text-[#FF6900]" />
                <span>Department 01</span>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Attachments &amp; Rotary Tooling
              </h3>
              <p className="text-sm text-[#DDD] font-normal leading-relaxed max-w-lg">
                Double your square-metre cleaning throughput with Mosmatic rotary surface cleaners, undercarriage wash bars, and heavy-gauge hose reels.
              </p>
              <div className="pt-2">
                <a
                  href="#catalogue-search"
                  className="inline-flex items-center gap-3 bg-[#FF6900] hover:bg-white hover:text-black text-white px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold"
                >
                  <span>Explore Attachments</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Door 2: OEM Spares & Mechanical Components (5 Columns) */}
          <div className="lg:col-span-5 relative group min-h-[420px] sm:min-h-[480px] bg-[#242220] border border-white/10 hover:border-[#FF6900] transition-all duration-300 flex flex-col justify-between p-8 sm:p-12 overflow-hidden">
            {/* Background Image & Scrim */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/hot-water-gauge-hero.jpg"
                alt="Alkota precision pressure gauge and brass unloader"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-[0.4] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/70 to-black/40" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] bg-black/40 px-3 py-1 border border-white/10">
                <Wrench className="w-3 h-3 text-[#FF6900]" />
                <span>Department 02</span>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Pumps, Coils &amp; Genuine Spares
              </h3>
              <p className="text-sm text-[#DDD] font-normal leading-relaxed">
                Direct-fit replacement triplex pumps, Schedule 80 boiler coils, unloaders, and burner assemblies built to exact factory tolerances.
              </p>
              <div className="pt-2">
                <a
                  href="#catalogue-search"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white hover:text-black text-white border border-white/30 px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold backdrop-blur-sm"
                >
                  <span>View Genuine Parts</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6900]" />
                </a>
              </div>
            </div>
          </div>

          {/* Door 3: Dedicated Cleaning Chemistry (12 Columns Full-Width Visual) */}
          <div className="lg:col-span-12 relative group min-h-[320px] sm:min-h-[360px] bg-[#242220] border border-white/10 hover:border-[#FF6900] transition-all duration-300 flex flex-col justify-between p-8 sm:p-12 overflow-hidden">
            {/* Background Image & Scrim */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/industries/fleet.png"
                alt="Commercial fleet washdown with Alkota detergent"
                fill
                sizes="100vw"
                className="object-cover object-center brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/90 via-[#1A1917]/50 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] bg-black/40 px-3 py-1 border border-white/10">
                <Droplet className="w-3 h-3 text-[#FF6900]" />
                <span>Department 03 — Dedicated Chemical Storefront</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Alkota Cleaning Chemistry
                </h3>
                <p className="text-sm sm:text-base text-[#DDD] font-normal leading-relaxed">
                  Hot water accelerated traffic film removers, non-caustic workshop degreasers, aluminium brighteners, and coil descalers. In stock in 5L, 20L, 200L, and 1,000L IBCs.
                </p>
              </div>

              <Link
                href="/parts-attachments/chemicals"
                className="inline-flex items-center gap-3 bg-[#FF6900] hover:bg-white hover:text-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold whitespace-nowrap shadow-lg shadow-[#FF6900]/20"
              >
                <span>Enter Chemicals Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
