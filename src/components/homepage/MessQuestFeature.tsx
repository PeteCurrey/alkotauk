'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, X, Film, CheckCircle2, Sparkles } from 'lucide-react';

export default function MessQuestFeature() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'vFnvcx3vRUY'; // Alkota official featured challenge video

  return (
    <section className="relative bg-[#0A0A0A] py-24 sm:py-32 px-6 sm:px-12 text-white border-b border-[#222] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-alkota-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-[#222] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-pulse" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF6900]">
                ORIGINAL VIDEO SERIES // REAL-WORLD PROOF
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl lg:text-8xl font-black uppercase italic tracking-tight text-white leading-none">
              MESS QUEST.
            </h2>
          </div>
          <p className="font-inter text-sm text-[#888] max-w-md leading-relaxed">
            Real industrial messes. Real Alkota machines. Real results. No studio tricks. No staged contamination. Just extreme jobs and the equipment built to wash them.
          </p>
        </div>

        {/* Video Player / Facade Container */}
        <div className="relative aspect-[16/9] w-full bg-[#141414] border border-[#2B2B2B] overflow-hidden shadow-2xl group">
          {!isPlaying ? (
            /* Lightweight Poster Facade (Zero initial iframe penalty) */
            <div className="relative w-full h-full">
              {/* Cinematic Background Poster */}
              <img
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1600&auto=format&fit=crop&q=80"
                alt="Alkota Mess Quest Industrial Cleaning Challenge"
                className="w-full h-full object-cover grayscale-[0.4] contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

              {/* Play Trigger & Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#FF6900] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black cursor-pointer group/btn"
                  aria-label="Play Mess Quest Episode"
                >
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current translate-x-0.5" />
                </button>

                <div className="mt-8 max-w-xl">
                  <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6900] bg-black/60 px-3 py-1 border border-[#FF6900]/30 inline-block mb-3">
                    FEATURED CHALLENGE // ASPHALT & HEAVY CRUDE DEGREASING
                  </span>
                  <h3 className="font-barlow-condensed text-3xl sm:text-5xl font-black uppercase italic text-white leading-tight">
                    "IF IT MAKES A MESS, AN ALKOTA CLEANS IT."
                  </h3>
                </div>
              </div>

              {/* Bottom Episode Meta Strip */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-6 font-ibm-plex-mono text-xs text-[#aaa]">
                  <div>
                    <span className="text-[#666] block text-[9px] uppercase">MACHINE FEATURED</span>
                    <span className="text-white font-bold">Alkota 420X4 Hot Water</span>
                  </div>
                  <div>
                    <span className="text-[#666] block text-[9px] uppercase">OPERATING SPEC</span>
                    <span className="text-[#FF6900] font-bold">200 BAR @ 90°C</span>
                  </div>
                  <div>
                    <span className="text-[#666] block text-[9px] uppercase">LOCATION</span>
                    <span className="text-white font-bold">Plant Rebuild Yard</span>
                  </div>
                </div>

                <Link
                  href="/mess-quest"
                  className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white hover:text-[#FF6900] transition-colors"
                >
                  <span>Explore Full Series</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Lazy-Loaded Live Video Embed */
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
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white hover:bg-[#FF6900] transition-colors"
                aria-label="Close Video Player"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
