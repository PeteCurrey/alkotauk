'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import AccentLine from '../ui/AccentLine';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MessQuestFeature() {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const fadeUp = (delay = 0, y = 24) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.85, delay, ease: INDUSTRIAL_EASE },
        };

  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen w-full bg-[#0A0A08] text-white flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 overflow-hidden font-normal"
      aria-label="Mess Quest Documentary Series"
    >
      {/* Full-bleed ambient video background using mess-quest.mp4 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/videos/mess-quest-poster.jpg"
          aria-hidden="true"
          className="h-full w-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.62) contrast(1.1)' }}
        >
          <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
        </video>
        {/* Directional gradient: darker behind text for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-[#0A0A08]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div {...fadeUp(0, 16)} className="flex items-center gap-3 mb-5">
            <AccentLine widthClass="w-6" />
            <span className="text-xs uppercase tracking-[0.28em] text-alkota-orange font-mono">
              Alkota Original Series // Proof of Capability
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.1, 32)}
            className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.92] mb-6"
          >
            Welcome to<br />
            <span className="text-alkota-orange">Mess Quest.</span>
          </motion.h2>

          {/* Pull Statement */}
          <motion.p
            {...fadeUp(0.18, 20)}
            className="font-light text-xl sm:text-2xl text-white/90 leading-tight mb-4"
          >
            &ldquo;The dirtiest jobs. The toughest cleaning systems.&rdquo;
          </motion.p>

          {/* Body Copy */}
          <motion.p
            {...fadeUp(0.24, 20)}
            className="text-base sm:text-lg text-[#CCC] leading-relaxed mb-10 max-w-xl font-normal"
          >
            Some cleaning jobs have to be seen to be believed. Follow Alkota into the industrial environments where heat, flow, pressure and engineering really matter.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.97 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.75, delay: 0.3, ease: INDUSTRIAL_EASE },
                })}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal"
          >
            <Link
              href="/mess-quest"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-2xl font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
              <span>Watch Mess Quest</span>
            </Link>

            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline group font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>See the Equipment</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
