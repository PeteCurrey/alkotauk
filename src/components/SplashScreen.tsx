'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface SplashScreenProps {
  title?: string;
  onComplete?: () => void;
}

export default function SplashScreen({ title = "Alkota UK", onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Extended duration for the slow, smooth sequence (~4s reveal + linger)
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Mark as seen for this session
      document.cookie = "alkota_splash_seen=true; path=/; SameSite=Lax";
      if (onComplete) onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-alkota-black"
        >
          {/* Logo Container */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ 
                scale: 1, 
                transition: { duration: 2, ease: "easeOut" }
              }}
              // Removed tagline and divider as requested
            >
              <Logo className="h-16 md:h-24 text-white" isAnimated={true} />
            </motion.div>
          </div>

          {/* Bottom attribution / series label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.4,
              transition: { delay: 1.2, duration: 0.8 }
            }}
            className="absolute bottom-12 font-barlow-condensed text-[10px] uppercase tracking-[0.3em] text-white"
          >
            Est. 1964 // Engineered for the Extreme
          </motion.div>

          {/* Background Ambient Pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.05, 0],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0 bg-gradient-to-b from-alkota-orange/20 to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
