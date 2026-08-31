'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Brand {
  slug: string;
  name: string;
  country_of_origin?: string | null;
}

interface Props {
  brands?: Brand[];
}

export default function PartsDeskConcierge({ brands = [] }: Props) {
  return (
    <div className="w-full">
      {/* ── 01: AUTHORISED MANUFACTURING PARTNERS ── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#EDE9E0] text-[#1A1917] border-t border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          <div className="max-w-md space-y-3">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] block font-semibold">
              // Authorised Partners
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1917]">
              Stockists for world-class engineering.
            </h3>
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Official UK distribution for Mosmatic Switzerland, Cox Reels USA, and Alkota OEM Genuine components.
            </p>
          </div>

          {/* Clean Editorial Brand List */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="divide-y divide-[#DDD8CE] border-y border-[#DDD8CE]">
              {brands.slice(0, 5).map((b) => (
                <Link
                  key={b.slug}
                  href={`/parts-attachments/brands/${b.slug}`}
                  className="flex items-center justify-between py-4 group hover:pl-2 transition-all no-underline text-inherit"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-lg font-normal text-[#1A1917] group-hover:text-[#FF6900] transition-colors">
                      {b.name}
                    </span>
                    {b.country_of_origin && (
                      <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                        {b.country_of_origin}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#888] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 02: TECHNICAL PARTS DESK ── */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA] border-t border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#777] block font-semibold">
              // UK Engineering Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1917] leading-tight">
              Can't locate your part number?
            </h2>
            <p className="text-[#666] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Our UK engineering parts desk traces components for any Alkota, General Pump, Cat Pump, or custom wash system. Send us your data plate photo for a direct quote within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal w-full lg:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="text-center bg-[#1A1917] hover:bg-[#FF6900] text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold whitespace-nowrap rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              Submit Parts Enquiry →
            </Link>
            <Link
              href="/parts-attachments/finder"
              className="text-center border border-[#DDD8CE] hover:border-black text-[#1A1917] px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium whitespace-nowrap rounded-[4px] bg-white shadow-tactile-sm btn-tactile"
            >
              Use Parts Finder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
