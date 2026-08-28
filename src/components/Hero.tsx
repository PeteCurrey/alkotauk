'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, ChevronRight, Shield, Cpu, Flame, Gauge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean, weighted entrance animation
      gsap.fromTo(
        '.hero-content-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.1,
        }
      );

      // Subtle depth parallax
      gsap.to('.hero-image-plate', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8F8F7] to-[#EDEDEB] pt-32 pb-12 px-6 sm:px-12 border-b border-[#D8D8D6]"
    >
      {/* Background Architectural Grid & Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E3_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E3_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 flex flex-col justify-center">
        {/* Monospace Heritage Tagline */}
        <div className="hero-content-reveal mb-6 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-black">
            SINCE 1964 • HANDCRAFTED IN SOUTH DAKOTA, USA • UK SPECIFICATION
          </span>
        </div>

        {/* Hero Title & Primary Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <h1 className="hero-content-reveal font-barlow-condensed text-6xl sm:text-8xl lg:text-[7.5rem] font-black uppercase italic leading-[0.85] tracking-tight text-alkota-black">
              INDUSTRIAL CLEANING <br />
              <span className="text-alkota-orange">EQUIPMENT.</span> <br />
              <span className="text-alkota-black/90">BUILT DIFFERENTLY.</span>
            </h1>

            <p className="hero-content-reveal mt-8 max-w-2xl font-inter text-base sm:text-lg text-[#555] leading-relaxed font-normal">
              Six decades of American heavy industrial engineering. Built from Schedule 80 seamless steel, slow-turning ceramic triplex pumps, and cold-rolled frames for organisations where downtime is not an option.
            </p>

            {/* Restrained Dual CTAs */}
            <div className="hero-content-reveal mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-3 bg-alkota-black text-white px-9 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange hover:shadow-lg hover:shadow-alkota-orange/20 no-underline group"
              >
                <span>Explore Machines</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/tools/configurator"
                className="inline-flex items-center justify-center gap-3 border border-[#333] bg-white text-alkota-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] transition-all hover:border-alkota-orange hover:text-alkota-orange no-underline"
              >
                <span>Build Your System</span>
              </Link>
            </div>
          </div>

          {/* Hero Hardware Feature Card */}
          <div className="lg:col-span-4 hero-content-reveal">
            <div className="hero-image-plate relative bg-white border border-[#D5D5D3] p-8 shadow-2xl shadow-black/5 hover:border-alkota-orange transition-colors">
              <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4 mb-6">
                <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-alkota-orange">
                  // HERO SPECIFICATION
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#777] font-bold">
                  HOT WATER ELITE
                </span>
              </div>

              {/* Machine cutout plate */}
              <div className="relative aspect-[4/3] w-full mb-6 bg-[#F5F5F3] overflow-hidden flex items-center justify-center p-4">
                <img
                  src="/assets/products/420x4.png"
                  alt="Alkota Hot Water Pressure Washer 420X4"
                  className="h-full w-full object-contain filter drop-shadow-xl"
                />
              </div>

              <div className="space-y-3 font-ibm-plex-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-[#F0F0EE] pb-2">
                  <span className="text-[#888]">OPERATING PRESSURE</span>
                  <span className="font-bold text-alkota-black">Up to 345 BAR</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#F0F0EE] pb-2">
                  <span className="text-[#888]">HEATING COIL</span>
                  <span className="font-bold text-alkota-orange">Schedule 80 ASTM A53</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#888]">COIL WARRANTY</span>
                  <span className="font-bold text-alkota-black">7-Year Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metric Ribbon */}
      <div className="relative z-10 mx-auto max-w-7xl w-full pt-12 border-t border-[#D5D5D3] mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-alkota-black font-ibm-plex-mono">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-alkota-orange shrink-0" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#777]">WARRANTY</p>
              <p className="font-bold text-xs uppercase">7-Year Coil Standard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-alkota-orange shrink-0" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#777]">METALLURGY</p>
              <p className="font-bold text-xs uppercase">Schedule 80 Steel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Flame className="h-5 w-5 text-alkota-orange shrink-0" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#777]">TEMPERATURE</p>
              <p className="font-bold text-xs uppercase">Up to 140°C Vapour Steam</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-alkota-orange shrink-0" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#777]">SERVICEABILITY</p>
              <p className="font-bold text-xs uppercase">Non-Proprietary Parts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
