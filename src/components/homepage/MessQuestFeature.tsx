'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, X } from 'lucide-react';

export default function MessQuestFeature() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'vFnvcx3vRUY';

  return (
    <section
      className="relative bg-[#0A0A08] text-white py-24 sm:py-32 px-6 sm:px-12 overflow-hidden font-normal"
      aria-label="Mess Quest Documentary Series"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-light">
              Documentary Series · Real-World Proof
            </span>
            <h2 className="font-extralight text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none">
              Mess Quest.
            </h2>
          </div>
          <Link
            href="/mess-quest"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#aaa] hover:text-alkota-orange transition-colors no-underline shrink-0 font-normal"
          >
            <span>Explore All Episodes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cinematic Film Poster / Video Player Canvas */}
        <div className="relative w-full aspect-[16/9] bg-[#141412] overflow-hidden font-normal shadow-2xl">
          {!isPlaying ? (
            <div
              className="relative w-full h-full group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* Background documentary image */}
              <img
                src="/assets/industries/manufacturing.png"
                alt="Mess Quest — Alkota Heavy Degreasing Episode"
                className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.15] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Play Trigger & Episode Information */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 font-normal">
                <span className="self-start text-xs uppercase font-light text-alkota-orange">
                  Episode 01 // Heavy Industrial Bitumen Breakdown
                </span>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 font-normal">
                  <div className="max-w-xl">
                    <p className="text-2xl sm:text-4xl uppercase font-light text-white leading-tight mb-3">
                      "Real industrial messes. Real Alkota machines."
                    </p>
                    <p className="text-sm text-[#bbb] leading-relaxed font-normal">
                      No staging. Standard Alkota hot water pressure washers tested against extreme contamination.
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
      </div>
    </section>
  );
}
