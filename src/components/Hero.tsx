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
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 80 + i * 120);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#121210] text-white pt-32 sm:pt-36 pb-8 sm:pb-12"
      aria-label="Alkota UK Industrial Cleaning Equipment"
    >
      {/* ── FULL SCREEN PHOTOGRAPHIC BACKGROUND ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-home-header.jpg"
          alt="Alkota industrial pressure washer with operator and tractor"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          style={{ filter: 'brightness(0.65) contrast(1.15)' }}
        />
        {/* Multilayer cinematic vignettes for typography contrast & depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* ── MAIN HERO CONTENT CONTAINER ─────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* Provenance Monoline */}
          <div className="hero-fade-in mb-6 inline-flex items-center gap-3 bg-black/60 border border-white/15 px-4 py-2 backdrop-blur-sm">
            <span className="h-[2px] w-6 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/90">
              Est. 1964 · Alcester, South Dakota · UK Specification
            </span>
          </div>

          {/* Primary Statement */}
          <h1
            className="hero-fade-in font-barlow-condensed font-black uppercase italic tracking-tight text-white leading-[0.88] mb-8 drop-shadow-lg"
            style={{ fontSize: 'clamp(3.5rem, 7.5vw, 7.5rem)' }}
          >
            INDUSTRIAL<br />
            CLEANING.<br />
            <span className="text-alkota-orange">BUILT TO</span><br />
            OUTLAST.
          </h1>

          {/* Supporting Statement */}
          <p
            className="hero-fade-in font-inter text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-normal drop-shadow"
          >
            Six decades of American heavy industrial engineering. Cold-rolled steel chassis, slow-turning ceramic triplex plunger pumps, and continuous-wound Schedule 80 seamless heating coils. Built for operations where cleaning failure is not an option.
          </p>

          {/* Dual CTAs */}
          <div className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-9 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl shadow-alkota-orange/20"
            >
              <span>Explore the Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dealers/demo-request"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline"
            >
              <span>Book On-Site Demo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM PROOF RIBBON ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 pt-8 border-t border-white/15">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 font-ibm-plex-mono">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-black/60 border border-white/20 flex items-center justify-center text-alkota-orange shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-white font-bold text-xs uppercase block">7-Year Warranty</span>
              <span className="text-[9px] text-[#aaa] uppercase tracking-wider block">Schedule 80 Heating Coil</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-black/60 border border-white/20 flex items-center justify-center text-alkota-orange shrink-0">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <span className="text-white font-bold text-xs uppercase block">Up to 140°C Vapour</span>
              <span className="text-[9px] text-[#aaa] uppercase tracking-wider block">Thermal Steam Breakdown</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-black/60 border border-white/20 flex items-center justify-center text-alkota-orange shrink-0">
              <Gauge className="h-4 w-4" />
            </div>
            <div>
              <span className="text-white font-bold text-xs uppercase block">Slow-Turning Ceramic</span>
              <span className="text-[9px] text-[#aaa] uppercase tracking-wider block">Low-RPM Triplex Plungers</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-black/60 border border-white/20 flex items-center justify-center text-alkota-orange shrink-0">
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <span className="text-white font-bold text-xs uppercase block">Open Architecture</span>
              <span className="text-[9px] text-[#aaa] uppercase tracking-wider block">Zero Captive Lockouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
