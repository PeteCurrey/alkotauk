'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * ReadingProgress — hairline 2px #FF6900 scroll-progress bar fixed to the top edge
 * for long-form technical articles, case studies, and engineering specifications.
 */
export default function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-alkota-orange origin-left z-[60] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
