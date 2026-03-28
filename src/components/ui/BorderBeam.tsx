'use client';

import { motion } from 'framer-motion';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export default function BorderBeam({
  className = "",
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#ff0000",
  colorTo = "#af0000",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]
      
      /* Masking to show only the border area */
      [mask-clip:padding-box,border-box] 
      [mask-composite:intersect] 
      [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]

      ${className}`}
    >
      <motion.div
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        className="absolute inset-0 aspect-square h-[calc(var(--size)*1px)] w-[calc(var(--size)*1px)] [offset-anchor:calc(var(--size)*50%)_50%] [offset-path:rect(0_100%_100%_0_round_calc(var(--size)*1px))]"
        style={{
          background: `linear-gradient(to right, var(--color-from), var(--color-to), transparent)`,
        }}
      />
    </div>
  );
}
