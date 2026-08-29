'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ 
  className = "h-9",
  isAnimated = false 
}: { 
  className?: string;
  isAnimated?: boolean;
}) {
  return (
    <motion.img
      src="/assets/alkota-flame-logo.png"
      alt="Alkota Cleaning Systems Inc."
      style={{ maxHeight: '40px', width: 'auto' }}
      className={`w-auto object-contain select-none ${className}`}
      initial={isAnimated ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

