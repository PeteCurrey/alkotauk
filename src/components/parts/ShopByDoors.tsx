'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, Shield, Layers, Building2, Flame } from 'lucide-react';

export default function ShopByDoors() {
  const CATEGORY_TILES = [
    { name: 'Pumps & Plungers', slug: 'pumps', count: '45+ SKUs', desc: 'Alkota OEM, General Pump & triplex pumps & seals' },
    { name: 'Hoses & Hose Reels', slug: 'hoses', count: '60+ SKUs', desc: 'Cox Reels USA, 300 Bar wire-braid & non-marking hoses' },
    { name: 'Surface Cleaners', slug: 'surface-cleaners', count: '25+ SKUs', desc: 'Mosmatic DL-UHD & rotary flat surface tools' },
    { name: 'Guns & Lances', slug: 'trigger-guns', count: '40+ SKUs', desc: 'Easy-Pull fatigue-reducing guns & insulated stainless lances' },
    { name: 'Heating Coils & Burners', slug: 'coils', count: '30+ SKUs', desc: 'Schedule 80 hydro-insulated coils & burner assemblies' },
    { name: 'Valves & Unloaders', slug: 'valves-unloaders', count: '35+ SKUs', desc: 'VRT3 unloaders, thermal relief & brass safety valves' },
  ];

  return (
    <section className="w-full py-20 px-6 sm:px-12 lg:px-16 bg-[#E2E0D8] border-t border-[#D0CEC5]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C8C6BD]">
          <div className="space-y-1">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#777] font-semibold block">
              CURATED ENTRY POINTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#111110] tracking-tight uppercase">
              How Would You Like to Browse?
            </h2>
          </div>
          <p className="text-xs font-ibm-plex-mono text-[#666] max-w-sm">
            Navigate genuine OEM parts and attachments through three dedicated, curated channels.
          </p>
        </div>

        {/* ── 2 LARGE EDITORIAL DOORS (MACHINE VS BRAND) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Door 01: Shop by Machine Model */}
          <Link
            href="/parts-attachments/machines"
            className="relative overflow-hidden bg-[#ECEAE3] border border-[#D5D3CA] p-8 sm:p-12 group hover:border-[#111110] transition-all flex flex-col justify-between min-h-[340px]"
          >
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
                // DOOR 01 · MACHINE MATCH
              </span>
              <h3 className="text-2xl sm:text-3xl font-extralight text-[#111110] tracking-tight uppercase">
                Parts for My Alkota Machine
              </h3>
              <p className="text-sm text-[#555] font-normal leading-relaxed max-w-md">
                Find guaranteed OEM-compatible pumps, coils, electrodes, and fittings tailored specifically to your 4305, 3305, 216, or bespoke trailer skid.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between font-ibm-plex-mono text-xs uppercase tracking-wider text-[#111110] group-hover:text-[#FF6900] transition-colors">
              <span className="font-semibold">Select Machine Model →</span>
              <span className="text-[10px] text-[#777]">100% Guaranteed Fit</span>
            </div>
          </Link>

          {/* Door 02: Shop by Brand Partner */}
          <Link
            href="/parts-attachments/brands"
            className="relative overflow-hidden bg-[#ECEAE3] border border-[#D5D3CA] p-8 sm:p-12 group hover:border-[#111110] transition-all flex flex-col justify-between min-h-[340px]"
          >
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
                // DOOR 02 · AUTHORISED BRANDS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extralight text-[#111110] tracking-tight uppercase">
                Shop by Brand Partner
              </h3>
              <p className="text-sm text-[#555] font-normal leading-relaxed max-w-md">
                Swiss rotary precision from Mosmatic, heavy-gauge hose reels from Cox Reels USA, and genuine factory spares direct from South Dakota.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between font-ibm-plex-mono text-xs uppercase tracking-wider text-[#111110] group-hover:text-[#FF6900] transition-colors">
              <span className="font-semibold">Explore Brand Shelves →</span>
              <span className="text-[10px] text-[#777]">Authorised UK Reseller</span>
            </div>
          </Link>

        </div>

        {/* ── DOOR 03: 6 LARGE CATEGORY TILES ── */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#777] font-semibold">
              // DOOR 03 · APPLICATION &amp; COMPONENT CATEGORIES
            </span>
            <Link 
              href="/parts-attachments/categories"
              className="font-ibm-plex-mono text-xs text-[#111110] hover:text-[#FF6900] uppercase tracking-wider transition-colors"
            >
              All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.slug}
                href={`/parts-attachments/${tile.slug}`}
                className="p-6 bg-[#ECEAE3] hover:bg-[#111110] hover:text-white transition-all group border border-[#D5D3CA] flex flex-col justify-between min-h-[160px]"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-light text-lg text-[#111110] group-hover:text-white transition-colors">
                      {tile.name}
                    </h4>
                    <span className="font-ibm-plex-mono text-[10px] text-[#FF6900] font-semibold">
                      {tile.count}
                    </span>
                  </div>
                  <p className="text-xs text-[#666] group-hover:text-[#AAA] transition-colors">
                    {tile.desc}
                  </p>
                </div>

                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#777] group-hover:text-white/80 block mt-4">
                  Browse Shelf →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
