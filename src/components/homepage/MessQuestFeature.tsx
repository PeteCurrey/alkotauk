'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, X } from 'lucide-react';

export default function MessQuestFeature() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'vFnvcx3vRUY';

  return (
    <section
      className="relative bg-[#0C0C0A] overflow-hidden"
      aria-label="Mess Quest — The Original Series"
    >
      {/* ── Top label strip ─────────────────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-16 pt-16 pb-0">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
              <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
                Original Video Series — Real-World Proof
              </span>
            </div>
            <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-white leading-[0.88]"
              style={{ fontSize: 'clamp(4rem, 9vw, 8rem)' }}
            >
              MESS<br />QUEST.
            </h2>
          </div>
          <div className="max-w-sm pb-2">
            <p className="font-inter text-sm text-[#777] leading-relaxed">
              Real industrial messes. Real Alkota machines. Real results. No studio tricks. No staged contamination.
            </p>
            <Link
              href="/mess-quest"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-orange hover:text-white transition-colors no-underline mt-4 group"
            >
              <span>Explore Full Series</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Full-width Video Facade ──────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/8' }}>
        {!isPlaying ? (
          <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* Poster — actual Alkota machine image for maximum authenticity */}
            <div className="absolute inset-0 bg-[#0C0C0A] flex items-center justify-center overflow-hidden">
              {/* Left — machine reveals */}
              <div className="absolute left-0 bottom-0 top-0 w-[40%] flex items-end justify-center pb-8 pl-16 lg:pl-24">
                <img
                  src="/assets/products/420x4.png"
                  alt="Alkota 420X4 — Featured in Mess Quest"
                  className="w-full max-w-sm object-contain transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 40px 100px rgba(255,105,0,0.3))' }}
                />
              </div>

              {/* Right machine */}
              <div className="absolute right-0 bottom-0 top-0 w-[30%] flex items-end justify-center pb-8 pr-8 opacity-40">
                <img
                  src="/assets/products/trailer-single.png"
                  alt="Alkota Mobile Trailer"
                  className="w-full max-w-xs object-contain"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8)) grayscale(0.5)' }}
                />
              </div>

              {/* Dark gradient centre */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0C0C0A]/80" />
            </div>

            {/* Centre play zone */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
              {/* Glowing play button */}
              <button
                className="relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-alkota-orange text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black mb-8 group/btn"
                aria-label="Play Mess Quest Episode"
                style={{ boxShadow: '0 0 80px rgba(255,105,0,0.4)' }}
              >
                <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current translate-x-0.5" />
              </button>

              <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.35em] text-alkota-orange bg-black/60 px-4 py-2 border border-alkota-orange/30 mb-4">
                Featured Episode — Asphalt & Heavy Crude Degreasing
              </span>
              <p className="font-barlow-condensed text-2xl sm:text-4xl lg:text-5xl font-black uppercase italic text-white max-w-2xl leading-tight">
                "IF IT MAKES A MESS, AN ALKOTA CLEANS IT."
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
              title="Alkota Mess Quest Series"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white hover:bg-alkota-orange transition-colors"
              aria-label="Close Video"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom meta strip ────────────────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-16 py-8 border-t border-[#1C1C1A]">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-6 font-ibm-plex-mono text-xs">
          <div className="flex flex-wrap items-center gap-8 text-[#777]">
            <div>
              <span className="text-[#444] block text-[9px] uppercase mb-1">Machine Featured</span>
              <span className="text-white font-bold">Alkota 420X4 Hot Water</span>
            </div>
            <div>
              <span className="text-[#444] block text-[9px] uppercase mb-1">Operating Spec</span>
              <span className="text-alkota-orange font-bold">200 BAR @ 90°C</span>
            </div>
            <div>
              <span className="text-[#444] block text-[9px] uppercase mb-1">Schedule</span>
              <span className="text-white font-bold">Schedule 80 Coil</span>
            </div>
          </div>
          <Link
            href="/mess-quest"
            className="inline-flex items-center gap-2 border border-[#333] px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline"
          >
            Enter Mess Quest Hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
