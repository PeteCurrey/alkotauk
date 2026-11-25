'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Product } from '@/lib/products';
import { formatPressure, formatFlowRate, formatTemperature, categoryHasHeating, categoryHasPressure, categoryHasFlow } from '@/lib/spec-format';
import { useUnitPreference } from '@/context/UnitPreferenceContext';
import UnitTogglePill from './UnitTogglePill';

interface StickyQuickSpecBarProps {
  machine: Product;
  modelCode: string;
  enquiryHref: string;
}

export default function StickyQuickSpecBar({
  machine,
  modelCode,
  enquiryHref,
}: StickyQuickSpecBarProps) {
  const [visible, setVisible] = useState(false);
  const { unit } = useUnitPreference();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 520);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pressure = categoryHasPressure(machine.category)
    ? formatPressure(machine, unit)
    : null;
  const flow = categoryHasFlow(machine.category)
    ? formatFlowRate(machine, unit)
    : null;
  const temp =
    categoryHasHeating(machine.category) &&
    machine.category !== 'water-heater' &&
    machine.category !== 'space-heater'
      ? formatTemperature(machine, unit)
      : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: -24, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-[60px] left-0 right-0 z-30 bg-[#121210]/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-12 py-2.5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Alkota <span className="text-alkota-orange">{modelCode}</span>
              </span>

              <div className="hidden md:flex items-center gap-4 text-xs font-mono text-white/75">
                {pressure?.isSpecified && <span>{pressure.display}</span>}
                {flow?.isSpecified && (
                  <>
                    <span className="text-white/25">·</span>
                    <span>{flow.display}</span>
                  </>
                )}
                {temp?.isSpecified && temp.raw !== 'ambient' && (
                  <>
                    <span className="text-white/25">·</span>
                    <span>{temp.display}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden sm:block">
                <UnitTogglePill dark compact />
              </div>
              <Link
                href={enquiryHref}
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-white hover:text-black transition-colors rounded-[4px] no-underline btn-tactile"
              >
                <span>Request Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
