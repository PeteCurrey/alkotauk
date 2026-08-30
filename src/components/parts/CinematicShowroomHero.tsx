'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';
import VideoBackground from '@/components/ui/VideoBackground';

export default function CinematicShowroomHero() {
  return (
    <section 
      className="relative min-h-screen w-full flex flex-col justify-between text-white overflow-hidden"
      aria-label="Alkota UK Parts & Attachments Cinematic Showroom"
    >
      <VideoBackground
        src="/assets/video/alkota-action.mp4"
        poster="/assets/industrial-steam-washers.jpg"
        className="absolute inset-0 w-full h-full"
        overlayClassName="bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/25"
      />

      {/* Top Spacer for Global Fixed Navigation */}
      <div className="pt-32" />

      {/* Main Campaign Narrative: Monumental Typography Anchored to Viewport */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 my-auto py-12">
        <div className="max-w-4xl space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] text-white/70 font-medium">
                Equipment &amp; Tooling Showroom
              </span>
            </div>

            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)' }}
            >
              Make your <br />
              Alkota <br />
              <span className="text-white/60 font-light">do more.</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-xl">
            Swiss rotary surface cleaners, heavy-duty hose management, and genuine factory spares. Stocked in the UK for next-day delivery.
          </p>

          {/* Restrained Actions */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              href="#surface-cleaners"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-9 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium cursor-pointer shadow-lg"
            >
              <span>Explore Attachments</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/parts-attachments/finder"
              className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors py-4 px-3"
            >
              <span>Parts Finder</span>
              <ChevronRight className="w-3.5 h-3.5 text-alkota-orange" />
            </Link>
          </div>

        </div>
      </div>

      {/* Discreet Cinematic Film Strip Footer */}
      <div className="relative z-10 border-t border-white/10 px-6 sm:px-12 lg:px-24 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-white/50">
        <div className="flex flex-wrap items-center gap-6">
          <span>OEM Factory Stock</span>
          <span className="text-white/20">•</span>
          <span>Mosmatic · Cox Reels · General Pump</span>
          <span className="text-white/20">•</span>
          <span>Next-Day UK Mainland Despatch</span>
        </div>

        <a
          href="#surface-cleaners"
          className="text-white/60 hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>Scroll to Discover</span>
          <span className="text-alkota-orange">↓</span>
        </a>
      </div>

    </section>
  );
}
