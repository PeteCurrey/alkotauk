'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface AccentLineProps {
  className?: string;
  widthClass?: string;
  delay?: number;
  immediate?: boolean;
}

/**
 * AccentLine — precision-drawn orange technical rule.
 * Animates width from 0 to target on entrance with industrial spring-out easing.
 */
export default function AccentLine({
  className = '',
  widthClass = 'w-6',
  delay = 0,
  immediate = false,
}: AccentLineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={`block h-[1.5px] ${widthClass} bg-alkota-orange ${className}`} />;
  }

  return (
    <motion.span
      className={`block h-[1.5px] ${widthClass} bg-alkota-orange origin-left ${className}`}
      initial={{ scaleX: 0 }}
      {...(immediate
        ? { animate: { scaleX: 1 } }
        : {
            whileInView: { scaleX: 1 },
            viewport: { once: true, amount: 0.5 },
          })}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
