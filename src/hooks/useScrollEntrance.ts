'use client';

import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * useScrollEntrance — returns a ref and animation state for a scroll-triggered entrance.
 * Uses IntersectionObserver (fires once) + respects prefers-reduced-motion.
 */
export function useScrollEntrance(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, shouldReduceMotion]);

  return { ref, isVisible, shouldReduceMotion };
}
