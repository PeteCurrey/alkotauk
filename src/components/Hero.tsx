'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ChevronRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Entrance
      gsap.fromTo(
        '.hero-reveal',
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power4.out', 
          stagger: 0.15,
          delay: 0.3
        }
      );

      // Parallax effect on background
      gsap.to('.hero-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[850px] w-full overflow-hidden bg-alkota-bg"
    >
      {/* Cinematic Background */}
      <div className="hero-bg absolute inset-0 z-0 scale-110">
        <img
          src="https://alkota.com/wp-content/uploads/2026/01/home-header.jpg"
          alt="Alkota industrial pressure washers"
          className="h-full w-full object-cover opacity-30 grayscale-[0.8] contrast-125"
        />
        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-alkota-bg/90 via-transparent to-alkota-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-bg via-transparent to-alkota-bg/40" />
        
        {/* Technical Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255, 105, 0,0.1),rgba(0,0,0,0),rgba(255, 105, 0,0.1))] bg-[length:100%_4px,10px_100%]" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center max-w-7xl mx-auto pt-20">
        <div ref={textRef} className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 inline-flex items-center gap-4 border-l-4 border-alkota-orange bg-alkota-orange/5 py-3 px-6"
          >
            <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Industrial Heritage • Handcrafted USA • Premium UK Spec
            </span>
          </motion.div>

          <h1 className="hero-reveal mb-8 font-barlow-condensed text-[12vw] font-black uppercase italic leading-[0.75] tracking-tighter text-alkota-black md:text-[10vw] lg:text-[9vw]">
            BUILT FOR THE <br />
            <span className="text-transparent stroke-red">EXTREME</span>
          </h1>

          <p className="hero-reveal mb-14 max-w-2xl mx-auto font-inter text-sm md:text-base uppercase tracking-[0.2em] text-alkota-silver leading-relaxed">
            The world's most durable cleaning systems. <br />
            Forged in South Dakota. Perfected for the British Industrial sector.
          </p>

          <div className="hero-reveal flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/machines"
              className="group flex w-full sm:w-auto items-center justify-center gap-4 bg-alkota-orange px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-alkota-orange-hover active:scale-95"
            >
              The Catalogue
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link 
              href="/configurator"
              className="group flex w-full sm:w-auto items-center justify-center gap-4 border border-alkota-iron bg-alkota-black/5 backdrop-blur-sm px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-alkota-black transition-all hover:bg-alkota-black/10 active:scale-95"
            >
              Build Your Rig
            </Link>
          </div>
        </div>

        {/* Industrial Stats Overlay */}
        <div className="hero-reveal absolute bottom-0 left-0 right-0 border-t border-alkota-iron bg-white/40 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'COIL WARRANTY', value: '7', suffix: 'YEARS' },
              { label: 'MAX PRESSURE', value: '5000', suffix: 'PSI' },
              { label: 'UK SUPPORT', value: '24/7', suffix: 'TECH' },
              { label: 'HERITAGE', value: '60', suffix: 'YEARS' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center border-alkota-iron py-10 ${i !== 3 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-barlow-condensed text-5xl font-black italic tracking-tighter text-alkota-black">{stat.value}</span>
                  <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange">{stat.suffix}</span>
                </div>
                <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-alkota-smoke">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stroke-red {
          -webkit-text-stroke: 1.5px var(--color-alkota-orange);
          text-shadow: 0 0 30px rgba(255, 105, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
