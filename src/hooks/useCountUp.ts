'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * useCountUp — animates a number from 0 to `target` when `trigger` is true.
 * Respects prefers-reduced-motion (shows final value immediately).
 */
export function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger, shouldReduceMotion]);

  return count;
}
