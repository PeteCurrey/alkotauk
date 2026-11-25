'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import AccentLine from '../ui/AccentLine';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SouthDakotaHeritage() {
  const shouldReduceMotion = useReducedMotion();
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.4 });

  const yearsCount = useCountUp(60, 1800, metricsInView);
  const depthCount = useCountUp(800, 2000, metricsInView);
  const uptimeCount = useCountUp(100, 1600, metricsInView);

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.8, delay, ease: INDUSTRIAL_EASE },
        };

  return (
    <section
      id="heritage"
      className="relative min-h-[720px] lg:min-h-[800px] w-full bg-[#0D0D0B] text-white flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 font-normal overflow-hidden"
      aria-label="Six Decades of South Dakota Build"
    >
      {/* Full-width authentic factory background of Alkota coil winder in Alcester, SD */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full animate-ambient-zoom">
          <Image
            src="/assets/south-dakota-craft-hero.jpg"
            alt="Alkota Handcrafted Manufacturing & Coil Winding in Alcester, South Dakota"
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.62) contrast(1.1)', transform: 'scaleX(-1) scale(1.05)' }}
          />
        </div>
        {/* Directional gradient: darker behind text on the left, revealing the craftsman and coils on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-transparent to-[#0D0D0B]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        <div className="max-w-2xl">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-4">
            <AccentLine widthClass="w-6" />
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange font-mono">
              Manufacturing Heritage · Est. 1964
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none mb-6"
          >
            Six Decades of<br />
            <span className="text-alkota-orange">South Dakota Build.</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.18)}
            className="text-base sm:text-lg text-[#ccc] leading-relaxed mb-6 font-normal"
          >
            Founded in 1964 in Alcester, South Dakota, Alkota has continuously hand-fabricated industrial high-pressure heating systems for the world’s most demanding environments.
          </motion.p>

          <motion.p
            {...fadeUp(0.24)}
            className="text-sm sm:text-base text-[#999] leading-relaxed mb-10 font-normal"
          >
            In 2013, custom-engineered Alkota hot-water heating systems were selected to power the clean-water drill reaching Subglacial Lake Whillans — 800 metres beneath the Antarctic Ice Sheet. Operating in continuous sub-zero conditions, Alkota delivered uninterrupted thermal performance.{' '}
            <Link
              href="/resources/case-studies/antarctica-lake-whillans"
              className="text-alkota-orange hover:underline font-normal inline-flex items-center gap-1 ml-1"
            >
              <span>Read the Antarctica Story →</span>
            </Link>
          </motion.p>

          {/* Proof Metrics */}
          <div
            ref={metricsRef}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-white/15 mb-10 max-w-lg font-normal"
          >
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block tabular-nums">
                {yearsCount}+
              </span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">
                Years Manufacturing
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-white block tabular-nums">
                {depthCount}m
              </span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">
                Antarctic Ice Depth
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-white block tabular-nums">
                {uptimeCount}%
              </span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">
                Mission Uptime
              </span>
            </div>
          </div>

          <motion.div {...fadeUp(0.3)}>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange hover:text-white transition-all no-underline group shadow-xl font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>The Alkota Story (1964 — Present)</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
