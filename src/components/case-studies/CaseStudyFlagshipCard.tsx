import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Thermometer, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies/types';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyFlagshipCard({ caseStudy }: Props) {
  return (
    <section id="flagship-story" className="bg-[#121212] text-white py-20 sm:py-28 px-6 sm:px-12 border-b border-[#222]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Flagship Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#3B82F6] font-mono">
                Flagship Field Story // Historical Project
              </span>
            </div>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              The Half-Mile Machine
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888] font-mono">
            <ShieldCheck className="h-4 w-4 text-[#3B82F6]" />
            <span>HISTORICAL PROJECT / VERIFIED SOURCES</span>
          </div>
        </div>

        {/* Magazine Cover Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Image Canvas (Substantial Viewport Feature) */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden bg-[#1A1A18] group border border-white/10 rounded-[6px]">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.heroAlt}
              className="w-full h-full object-cover object-center filter contrast-115 brightness-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            
            {/* Technical overlay badge on image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="bg-black/90 backdrop-blur-sm px-4 py-2 border border-white/20 text-white rounded-[3px]">
                <span className="text-[#3B82F6] mr-2">LOCATION:</span>
                <span>West Antarctic Ice Sheet (84.24°S, 153.64°W)</span>
              </div>
              <div className="bg-black/90 backdrop-blur-sm px-4 py-2 border border-white/20 text-white rounded-[3px]">
                <span className="text-[#3B82F6] mr-2">EQUIPMENT:</span>
                <span>6 × Alkota 12257K Units</span>
              </div>
            </div>
          </div>

          {/* Editorial Story Content */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#181816] p-8 sm:p-12 border border-white/10 rounded-[6px] shadow-tactile">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#888] font-mono mb-4">
                Antarctica / 2013 // Subglacial Lake Whillans
              </div>

              <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight mb-4">
                Six Alkota Pressure Washers.<br />
                800 Metres of Antarctic Ice.<br />
                <span className="text-[#3B82F6]">A World Below the Surface.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#CCC] leading-relaxed font-normal mb-8">
                In January 2013, an expedition team achieved the first clean hot-water access through 800 metres of West Antarctic ice into Subglacial Lake Whillans. Operating at the core of the thermal heating system were six Alkota pressure-washer units delivering continuous high-temperature thermal energy in sub-zero polar conditions.
              </p>

              {/* Restrained Technical Metric Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/15 mb-8 font-mono">
                <div>
                  <span className="font-extralight text-3xl sm:text-4xl text-[#3B82F6] block mb-1">
                    ~800 m
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#888] block">
                    Ice Penetration Depth
                  </span>
                </div>
                <div>
                  <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">
                    ~270 L/min
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#888] block">
                    Max Thermal Array Flow
                  </span>
                </div>
              </div>
            </div>

            {/* Read CTA */}
            <div>
              <Link
                href={`/resources/case-studies/${caseStudy.slug}`}
                className="inline-flex items-center justify-between w-full bg-[#3B82F6] text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono no-underline group shadow-lg rounded-[4px] btn-tactile"
              >
                <span>Enter the Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 06: WHY START WITH ANTARCTICA? ─────────────────────────── */}
        <div className="bg-[#181816] p-8 sm:p-12 border border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase text-[#3B82F6] tracking-widest block mb-2">
                Editorial Prologue
              </span>
              <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight">
                Why start with Antarctica?
              </h3>
            </div>
            <div className="lg:col-span-7 text-sm sm:text-base text-[#BBB] leading-relaxed space-y-3 font-normal">
              <p>
                <strong className="text-white">Because it proves the point.</strong> Alkota equipment was not selected because Antarctica needed a pressure washer. It was integrated into a major scientific drilling system operating in one of the most demanding environments on Earth.
              </p>
              <p className="text-xs sm:text-sm text-[#888] font-mono uppercase tracking-wider pt-2 border-t border-white/10">
                The standard for this entire field journal: <span className="text-[#3B82F6]">Understand the job. Then engineer the system.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
