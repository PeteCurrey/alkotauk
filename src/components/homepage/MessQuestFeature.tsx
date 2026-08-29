'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, X } from 'lucide-react';

export default function MessQuestFeature() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'vFnvcx3vRUY';

  return (
    <section
      className="relative min-h-screen w-full bg-[#0A0A08] text-white flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 overflow-hidden font-normal"
      aria-label="Mess Quest Documentary Series"
    >
      {/* Full-bleed ambient video background using export 3.mp4 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.4) contrast(1.15)' }}
        >
          <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
        </video>
        {/* Soft atmospheric gradient overlays for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-[#0A0A08]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-light">
            Documentary Series · Real-World Proof
          </span>

          <h2
            className="font-extralight uppercase tracking-tight text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            Mess Quest.<br />
            <span className="text-alkota-orange font-extralight">Real Industrial Tests.</span>
          </h2>

          <p className="text-lg sm:text-xl text-white font-light leading-snug mb-4">
            &ldquo;Real industrial messes. Real Alkota machines.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[#ccc] leading-relaxed mb-10 max-w-2xl font-normal">
            No staging. Standard Alkota hot water pressure washers tested against extreme contamination across heavy fleet, agriculture, and manufacturing environments. Watch the thermal breakdown of bitumen, concrete slurry, and encrusted grease.
          </p>

          {/* Action CTAs: Play Documentary / Explore Series */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 font-normal">
            <button
              onClick={() => setIsPlaying(true)}
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-2xl cursor-pointer font-normal"
            >
              <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
              <span>Watch Episode 01</span>
            </button>

            <Link
              href="/mess-quest"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline group font-normal"
            >
              <span>Explore All Episodes</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal when clicking Play */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-[16/9] bg-black shadow-2xl">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-alkota-orange transition-colors cursor-pointer"
              aria-label="Close Video"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
              title="Alkota Mess Quest Series"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

