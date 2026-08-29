'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Flame, Gauge, Wrench } from 'lucide-react';

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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0F0F0D] text-white pt-36 sm:pt-40 pb-10 sm:pb-14 font-normal"
      aria-label="Alkota UK Industrial Cleaning Equipment"
    >
      {/* Full-bleed authentic photography background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-home-header.jpg"
          alt="Alkota industrial hot water pressure washer on site"
          className="h-full w-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.68) contrast(1.12)' }}
        />
        {/* Soft cinematic tonal shading */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
      </div>

      {/* Main hero typography & CTAs */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* Subtle monoline tag */}
          <div className="hero-fade-in mb-6 inline-flex items-center gap-3 font-normal">
            <span className="h-[2px] w-6 bg-alkota-orange" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light">
              Est. 1964 · Alcester, South Dakota · UK Direct
            </span>
          </div>

          {/* Primary Statement — Extra Light */}
          <h1
            className="hero-fade-in font-extralight uppercase tracking-tight text-white leading-[0.92] mb-7 drop-shadow-md"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
          >
            Industrial Power.<br />
            <span className="text-alkota-orange">Built to</span> Outlast.
          </h1>

          {/* Supporting paragraph — Normal */}
          <p className="hero-fade-in text-[#DCDCD8] text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-normal">
            Six decades of heavy American industrial engineering. Heavy cold-rolled steel chassis, slow-turning ceramic triplex plunger pumps, and continuous-wound Schedule 80 seamless heating coils. Built for continuous duty where equipment failure halts production.
          </p>

          {/* Dual CTAs — Normal weight */}
          <div className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-9 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dealers/demo-request"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
            >
              <span>Book On-Site Demonstration</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Proof strip at base */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 pt-8 border-t border-white/15 font-normal">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-alkota-orange shrink-0 mt-0.5" />
            <div>
              <span className="text-white text-xs uppercase block font-light">7-Year Warranty</span>
              <span className="text-[10px] text-[#aaa] uppercase tracking-wider block font-normal">Schedule 80 Heating Coil</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Flame className="h-5 w-5 text-alkota-orange shrink-0 mt-0.5" />
            <div>
              <span className="text-white text-xs uppercase block font-light">Up to 140°C Vapour</span>
              <span className="text-[10px] text-[#aaa] uppercase tracking-wider block font-normal">Thermal Steam Sanitisation</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Gauge className="h-5 w-5 text-alkota-orange shrink-0 mt-0.5" />
            <div>
              <span className="text-white text-xs uppercase block font-light">Slow-Turning Ceramic</span>
              <span className="text-[10px] text-[#aaa] uppercase tracking-wider block font-normal">Low-RPM Triplex Plungers</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wrench className="h-5 w-5 text-alkota-orange shrink-0 mt-0.5" />
            <div>
              <span className="text-white text-xs uppercase block font-light">Open Architecture</span>
              <span className="text-[10px] text-[#aaa] uppercase tracking-wider block font-normal">Zero Captive Lockouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
