'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MachineMatchAndOwnership() {
  const shouldReduceMotion = useReducedMotion();

  const ownershipLinks = [
    { title: '7-Year Heating Coil Warranty', href: '/support/warranty' },
    { title: 'UK Technical Support & Spares', href: '/support' },
    { title: 'Open Component Architecture', href: '/support/replacement-parts' },
    { title: 'Authorised UK Dealer Network', href: '/dealers' },
  ];

  const fadeUp = (delay = 0, y = 20) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.8, delay, ease: INDUSTRIAL_EASE },
        };

  return (
    <div className="bg-[#F8F7F4] text-alkota-black font-normal">
      {/* Interactive Machine Match Prompt */}
      <section className="py-24 sm:py-32 px-6 sm:px-12" aria-label="Machine Match Tool">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl font-normal">
              <motion.span
                {...fadeUp(0)}
                className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light"
              >
                Interactive Selector Tool
              </motion.span>
              <motion.h2
                {...fadeUp(0.08)}
                className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4"
              >
                Not Sure Which Alkota Suits Your Application?
              </motion.h2>
              <motion.p
                {...fadeUp(0.16)}
                className="text-base text-[#666] leading-relaxed font-normal"
              >
                Answer four quick questions regarding power supply, water volume, contamination type, and duty cycle to receive a tailored equipment recommendation.
              </motion.p>
            </div>

            <motion.div
              {...fadeUp(0.2)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal"
            >
              <Link
                href="/tools/machine-match"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors no-underline group shadow-lg font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
              >
                <span>Launch Machine Match</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tools/configurator"
                className="inline-flex items-center justify-center gap-3 border border-alkota-black text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-black hover:text-white transition-all no-underline font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
              >
                <span>Build Configurator</span>
              </Link>
            </motion.div>
          </div>

          {/* Understated Ownership Navigation — Clean horizontal links */}
          <div className="mt-20 pt-10 border-t border-[#E0E0DC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-normal">
            {ownershipLinks.map((link, idx) => (
              <motion.div key={idx} {...fadeUp(idx * 0.08, 14)}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors no-underline"
                >
                  <span>{link.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Cinematic Brand Signature — Handcrafted to Perform. Engineered To Last */}
      <section className="relative bg-[#0C0C0A] overflow-hidden py-28 sm:py-36 px-6 sm:px-12 text-white font-normal min-h-[680px] flex flex-col justify-center">
        {/* Full-bleed heritage photography — positioned to keep the 60th Anniversary badge visible */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative h-full w-full animate-ambient-zoom">
            <Image
              src="/assets/alkota-60-heritage-vintage.jpg"
              alt="Alkota 60th Anniversary Heritage - Alcester South Dakota Industrial Cleaning Equipment"
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: '30% 40%',
                filter: 'brightness(0.62) contrast(1.05) sepia(0.06)'
              }}
            />
          </div>
          {/* Gentle dark overlay — preserves photographic texture while ensuring readability */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Directional gradient — darker in centre for text legibility, lighter to edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0A]/60 via-transparent to-[#0C0C0A]/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center font-normal my-auto">
          <motion.span
            {...fadeUp(0)}
            className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-light"
          >
            Est. 1964 · Alcester, South Dakota · UK Direct
          </motion.span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.1] mb-8">
            <motion.span {...fadeUp(0.08, 22)} className="block">
              Handcrafted to Perform.
            </motion.span>
            <motion.span {...fadeUp(0.18, 22)} className="block text-alkota-orange">
              Engineered To Last.
            </motion.span>
          </h2>
          <motion.p
            {...fadeUp(0.24)}
            className="text-[#ddd] leading-relaxed mb-12 font-normal text-base sm:text-lg max-w-xl mx-auto"
          >
            Specify your industrial cleaning setup with confidence. Connect directly with Alkota technical specialists for advice, on-site demonstrations, or custom rig design.
          </motion.p>
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 font-normal"
          >
            <Link
              href="/machines"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-9 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Explore Machine Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-colors no-underline font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Contact Alkota UK</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
