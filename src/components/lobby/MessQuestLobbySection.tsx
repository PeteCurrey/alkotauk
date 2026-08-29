'use client';

import { Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MessQuestLobbySection() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#0F0F10] text-white border-b border-[#222]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block font-light font-mono">
              Chapter 07 // Field Testing Documentary
            </span>

            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none">
              Mess Quest.<br />
              <span className="text-[#FF6900]">Real Industrial Proof.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#ccc] leading-relaxed font-normal">
              No staging. No domestic demos. Mess Quest puts standard Alkota continuous-duty pressure washers directly into the UK’s most extreme contamination environments — from bitumen asphalt tankers to grease-caked combine harvesters.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/mess-quest"
                className="inline-flex items-center gap-2.5 bg-[#FF6900] hover:bg-white hover:text-black text-white px-6 py-3.5 text-xs uppercase tracking-widest transition-all font-normal no-underline shadow-lg"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Watch Featured Episode</span>
              </Link>

              <Link
                href="/mess-quest"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-6 py-3.5 text-xs uppercase tracking-widest transition-colors font-normal no-underline"
              >
                <span>View Full Documentary Series</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Video Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video w-full overflow-hidden bg-black border border-white/15 shadow-2xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] block mb-1">
                    Featured Case Episode
                  </span>
                  <h3 className="font-light text-lg sm:text-xl text-white">
                    Episode 01: Heavy Plant Bitumen & Aggregate Removal
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center bg-[#FF6900] text-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
