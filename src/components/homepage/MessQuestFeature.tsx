'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, X } from 'lucide-react';

export default function MessQuestFeature() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'vFnvcx3vRUY';

  return (
    <section
      className="relative bg-[#0A0A08] text-white py-24 sm:py-32 overflow-hidden"
      aria-label="Mess Quest Documentary Series"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-white/10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                Original Video Series · Real-World Proof
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-white leading-none">
              MESS QUEST.
            </h2>
          </div>
          <Link
            href="/mess-quest"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-[#aaa] hover:text-alkota-orange transition-colors no-underline shrink-0"
          >
            <span>Explore All Episodes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cinematic Film Poster / Video Player Canvas */}
        <div className="relative w-full aspect-[16/9] bg-[#141412] overflow-hidden">
          {!isPlaying ? (
            <div
              className="relative w-full h-full group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* Background documentary image */}
              <img
                src="/assets/industries/manufacturing.png"
                alt="Mess Quest — Alkota Heavy Degreasing Episode"
                className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.15] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Play Trigger & Episode Information */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12">
                <div className="self-start bg-black/70 backdrop-blur-sm border border-white/15 px-4 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold text-alkota-orange">
                  Episode 01 // Extreme Bitumen & Heavy Crude Degreasing
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div className="max-w-xl">
                    <p className="font-barlow-condensed text-2xl sm:text-4xl font-black uppercase italic text-white leading-tight mb-2">
                      "REAL INDUSTRIAL MESSES. REAL ALKOTA MACHINES."
                    </p>
                    <p className="font-inter text-xs sm:text-sm text-[#bbb] leading-relaxed">
                      No studio staging. We put standard Alkota hot water pressure washers to work on the toughest industrial contamination in the field.
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-alkota-orange text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 shrink-0 cursor-pointer"
                    aria-label="Play Mess Quest Episode"
                  >
                    <Play className="h-7 w-7 sm:h-8 w-8 fill-current translate-x-0.5" />
                  </button>
                </div>
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
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white hover:bg-alkota-orange transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Technical Episode Metadata */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 font-ibm-plex-mono text-xs text-[#888]">
          <div className="flex items-center gap-6">
            <span>Machine Featured: <strong className="text-white">Alkota 420X4 Hot Water</strong></span>
            <span>Operating Spec: <strong className="text-alkota-orange">200 BAR @ 90°C</strong></span>
          </div>
          <Link
            href="/mess-quest"
            className="inline-flex items-center gap-2 text-white hover:text-alkota-orange transition-colors no-underline font-bold uppercase tracking-wider"
          >
            <span>Watch Full Series</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
