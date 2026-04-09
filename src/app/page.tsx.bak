'use client';

import { useEffect, useRef } from 'react';
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MachineCatalogue from "@/components/MachineCatalogue";

import IndustryGrid from "@/components/IndustryGrid";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal all sections on scroll
      const sections = gsap.utils.toArray('section');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="flex min-h-screen flex-col bg-alkota-black overflow-x-hidden">
      <Navigation />
      
      <Hero />
      
      <IndustryGrid />

      <MachineCatalogue />

      {/* TOOLS & SERIES STRIP */}
      <section className="bg-alkota-bg py-24 px-6 border-y border-alkota-iron relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Machine Match Card */}
            <a 
              href="/tools/machine-match"
              className="group flex flex-col justify-between bg-alkota-black border border-alkota-iron p-10 md:p-14 transition-all hover:border-alkota-orange"
            >
              <div>
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-6">
                  // Specification Engine
                </span>
                <h3 className="font-barlow-condensed text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4 group-hover:text-alkota-orange transition-colors">
                  Machine Match
                </h3>
                <p className="font-inter text-alkota-silver leading-relaxed max-w-sm">
                  8 questions. The right machine. Instant.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-3">
                <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-alkota-orange transition-colors">
                  Find Your Alkota
                </span>
                <motion.div 
                  initial={{ x: 0 }} 
                  whileHover={{ x: 5 }} 
                  className="w-8 h-[2px] bg-alkota-orange"
                />
              </div>
            </a>

            {/* Mess Quest Series Card */}
            <a 
              href="/mess-quest"
              className="group flex flex-col justify-between bg-alkota-steel border border-alkota-iron p-10 md:p-14 transition-all hover:border-alkota-orange relative overflow-hidden"
            >
              {/* Abstract diamond texture */}
              <div 
                className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none group-hover:opacity-10 transition-opacity"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
                  backgroundRepeat: 'repeat'
                }}
              />
              <div className="relative z-10">
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-6">
                  // THE ORIGINAL SERIES
                </span>
                <h3 className="font-barlow-condensed text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4 group-hover:text-alkota-orange transition-colors">
                  Mess Quest
                </h3>
                <p className="font-inter text-alkota-silver leading-relaxed max-w-sm">
                  Watch the series. Real jobs. Real machines.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-3 relative z-10">
                <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-alkota-orange transition-colors">
                  Watch Now
                </span>
                <motion.div 
                  initial={{ x: 0 }} 
                  whileHover={{ x: 5 }} 
                  className="w-8 h-[2px] bg-alkota-orange"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── THE PROOF SECTION ───────────────────────────────────── */}
      <section className="bg-alkota-bg py-40 px-6 border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex items-end justify-between border-b border-alkota-iron pb-12">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[2px] w-8 bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                  Why Alkota. Not the alternative.
                </span>
              </div>
              <h2 className="font-barlow-condensed text-6xl font-black uppercase italic tracking-tighter text-alkota-black md:text-8xl leading-[0.85]">
                // THE PROOF.
              </h2>
            </div>
            <a
              href="/about"
              className="hidden md:flex items-center gap-3 text-[10px] font-black text-alkota-silver hover:text-alkota-orange uppercase tracking-widest transition-colors"
            >
              Full Heritage Story →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              {
                stat: '½ mile',
                label: 'of Antarctic ice. Bored through by Alkota machines.',
                sub: 'Custom-built Alkota pressure washing systems were the centrepiece of the first-ever hot water drill to reach a subglacial Antarctic lake. 2013. University of Nebraska-Lincoln. A genuine scientific breakthrough.',
              },
              {
                stat: '7 years',
                label: 'Coil warranty. Industry standard: 1–2 years.',
                sub: 'The hydro-insulated Schedule 80 coil combined with the Soft Damping System. The engineering reason Alkota machines are still running at 15 and 20 years of daily industrial use.',
              },
              {
                stat: '150+',
                label: 'Years of combined engineering experience in the Alkota build team.',
                sub: 'Average employee tenure: 17 years. Some craftsmen have been building Alkota machines for over 40 years. When you have a problem, you speak to the people who designed it.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-12 flex flex-col group hover:bg-alkota-bg transition-colors">
                <p className="font-barlow-condensed text-8xl font-black italic text-alkota-orange leading-none mb-6 group-hover:scale-105 transition-transform origin-left">
                  {card.stat}
                </p>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black leading-tight mb-6">
                  {card.label}
                </h3>
                <p className="font-inter text-sm text-alkota-silver leading-relaxed flex-1">
                  {card.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Trust Section */}
      <section className="relative bg-alkota-black py-60 px-6 overflow-hidden border-t border-alkota-iron">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
           <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
             UK_SPEC
           </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 inline-flex h-20 w-px bg-alkota-orange mx-auto"
          />
          
          <h2 className="font-barlow-condensed text-6xl font-black text-white uppercase italic tracking-tighter sm:text-8xl lg:text-9xl mb-12 leading-[0.8]">
            THE PLATINUM STANDARD <br />
            <span className="text-alkota-orange stroke-text">IN INDUSTRIAL CLEANING.</span>
          </h2>

          <div className="mt-20 flex flex-wrap justify-center gap-x-16 gap-y-12">
            {[
              { label: 'RELIABILITY', value: 'ULTIMATE' },
              { label: 'DURABILITY', value: 'FORGED' },
              { label: 'LONGEVITY', value: '60+ YEARS' },
              { label: 'PRECISION', value: 'HANDCRAFTED' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.4em] mb-4">
                  {item.value}
                </span>
                <span className="font-barlow-condensed text-3xl font-black text-alkota-iron uppercase italic tracking-wider group-hover:text-white transition-colors duration-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </main>
  );
}
