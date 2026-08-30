'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

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
      <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8] text-alkota-black border-t border-[#E5E3DC]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          <div className="max-w-md space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-medium">
              Authorised Partners
            </span>
            <h3 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
              Stockists for world-class engineering.
            </h3>
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Official UK distribution for Mosmatic Switzerland, Cox Reels USA, General Pump, and Steel Eagle.
            </p>
          </div>

          {/* Clean Editorial Brand List */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="divide-y divide-[#DCDAD2] border-y border-[#DCDAD2]">
              {brands.slice(0, 5).map((b) => (
                <Link
                  key={b.slug}
                  href={`/parts-attachments/brands/${b.slug}`}
                  className="flex items-center justify-between py-4 group hover:pl-2 transition-all no-underline text-inherit"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-lg font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {b.name}
                    </span>
                    {b.country_of_origin && (
                      <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                        {b.country_of_origin}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#888] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 02: TECHNICAL PARTS DESK ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] border-t border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#777] block font-medium">
              UK Engineering Desk
            </span>
            <h2 className="font-extralight text-[#0A0A0A] leading-tight" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Can't locate your part number?
            </h2>
            <p className="text-[#666] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Our UK engineering parts desk traces components for any Alkota, General Pump, CAT Pump, or custom wash system. Send us your data plate photo for a direct quote within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal w-full lg:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="text-center bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors font-medium whitespace-nowrap shadow-sm"
            >
              Submit Parts Enquiry
            </Link>
            <Link
              href="/parts-attachments/finder"
              className="text-center border border-[#DCDAD4] hover:border-black text-alkota-black px-8 py-4 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors font-medium whitespace-nowrap"
            >
              Use Parts Finder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
