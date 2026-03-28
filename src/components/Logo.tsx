'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ 
  className = "h-8",
  isAnimated = false 
}: { 
  className?: string;
  isAnimated?: boolean;
}) {
  const transition = { duration: 1.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 360 151.81" 
      className={className}
      fill="currentColor"
    >
      {/* Alkota Lettering Paths */}
      <motion.g
        initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={isAnimated ? { delay: 0.5, duration: 1.5, ease: "easeOut" } : { duration: 0 }}
      >
        <path d="M48.8,111.9l-6.1-17.1H18.9l-6.1,17.1H0L24.8,42.5h11.9l24.7,69.4H48.8z M30.8,60.1l-8.9,25.1h17.9L30.8,60.1z"/>
        <path d="M72.2,42.5h12.5v59.3h28.1v10.1H72.2V42.5z"/>
        <path d="M149.7,77.2l20.4,34.7h-14.4l-15.6-27.4l-5.6,5.3v22.1h-12.5V42.5h12.5v32.1l20.3-32.1h14.2L149.7,77.2z"/>
        <path d="M211.9,113.6c-20.9,0-36.9-15.8-36.9-36.4c0-20.7,16-36.4,36.9-36.4c20.9,0,36.9,15.7,36.9,36.4C248.8,97.8,232.8,113.6,211.9,113.6z M211.9,51c-13.4,0-23.7,10.7-23.7,26.2s10.3,26.2,23.7,26.2c13.4,0,23.7-10.7,23.7-26.2S225.3,51,211.9,51z"/>
        <path d="M285.5,52.7v59.2h-12.5V52.7h-16.7V42.5h45.9v10.1L285.5,52.7z"/>
        <path d="M336.8,111.9l-6.1-17.1h-23.7l-6.1,17.1H288l24.8-69.4h11.9l24.7,69.4H336.8z M318.8,60.1l-8.9,25.1h17.9L318.8,60.1z"/>
      </motion.g>
      
      {/* Orange Underline */}
      <motion.rect 
        x="0" y="125" width="360" height="1.5" 
        fill="#FF6900" 
        initial={isAnimated ? { scaleX: 0, originX: 0 } : { scaleX: 1 }}
        animate={{ scaleX: 1 }}
        transition={isAnimated ? { delay: 1.2, duration: 2.2, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      />

      {/* UK Identifier */}
      <motion.text 
        x="0" y="148" 
        fontFamily="var(--font-barlow-condensed)" 
        fontWeight="900" fontSize="24" 
        letterSpacing="4" fill="currentColor"
        initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={isAnimated ? { delay: 2.8, duration: 1.2, ease: "easeOut" } : { duration: 0 }}
      >
        UK
      </motion.text>
    </motion.svg>
  );
}
