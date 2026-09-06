'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.hero-fade-in');
    if (!items) return;
    items.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(20px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
      aria-label="Alkota UK Industrial Cleaning Equipment"
    >
      {/* Full-bleed authentic photography background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-home-header.jpg"
          alt="Alkota industrial hot water pressure washer on site"
          className="h-full w-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.65) contrast(1.12)' }}
        />
        {/* Cinematic soft vignettes for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
      </div>

      {/* Main hero typography & CTAs — Vertically centered */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
        <div className="max-w-2xl">
          {/* Subtle provenance monoline */}
          <div className="hero-fade-in mb-5 inline-flex items-center gap-3 font-normal">
            <span className="h-[1.5px] w-5 bg-alkota-orange" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
              Est. 1964 · Alcester, South Dakota · UK Direct
            </span>
          </div>

          {/* Primary Statement — Extra Light Work Sans */}
          <h1
            className="hero-fade-in font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
          >
            Industrial Power.<br />
            <span className="text-alkota-orange">Built to</span> Outlast.
          </h1>

          {/* Concise supporting paragraph — clean Normal Work Sans */}
          <p className="hero-fade-in text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-normal">
            Six decades of heavy American industrial engineering. Cold-rolled structural steel, ceramic triplex pumps, and Schedule 80 seamless heating coils built for continuous duty.
          </p>

          {/* Dual CTAs — Clean and confident */}
          <div className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dealers/demo-request"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Book On-Site Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
