'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFamily {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  statPrimary: string;
  statLabel: string;
}

const FAMILIES: ProductFamily[] = [
  {
    id: 'hot-water',
    slug: 'hot-water',
    name: 'Hot Water',
    subtitle: 'Schedule 80 Thermal Power',
    tagline: 'High-Temperature Grease & Bitumen Breakdown',
    description: 'Continuous-wound spiral Schedule 80 heating coils delivering water temperatures up to 95°C at pressures to 345 bar. The industry standard for heavy plant, fleet depots, and agricultural machinery.',
    image: '/assets/products/420x4.png',
    statPrimary: '95°C / 345 BAR',
    statLabel: 'Schedule 80 Seamless Coil',
  },
  {
    id: 'cold-water',
    slug: 'cold-water',
    name: 'Cold Water',
    subtitle: 'High Volume Plunger Power',
    tagline: 'Continuous Site Washdown & Debris Removal',
    description: 'Slow-turning ceramic triplex plunger pumps mounted on structural cold-rolled steel chassis. Powered by Honda, Vanguard petrol/diesel or TEFC electric motors for continuous multi-shift operation.',
    image: '/assets/products/4305xd4.png',
    statPrimary: '100 – 350 BAR',
    statLabel: 'Low-RPM Triplex Plungers',
  },
  {
    id: 'steam',
    slug: 'steam',
    name: 'Dry Steam',
    subtitle: '140°C Vapour Sanitisation',
    tagline: 'Biofilm Eradication & Food Hygiene Compliance',
    description: '140°C saturated dry vapour steam with ultra-low water consumption. Melts grease matrices and sanitises food production lines, breweries, and packaging facilities with minimal surface runoff.',
    image: '/assets/products/steam-oil.png',
    statPrimary: '140°C Vapour',
    statLabel: 'HACCP Hygiene Aligned',
  },
  {
    id: 'parts-washers',
    slug: 'parts-washers',
    name: 'Parts Washers',
    subtitle: 'Automated Aqueous Cleaning',
    tagline: 'Heated Cabinet Component Degreasing',
    description: 'Eliminate toxic solvent baths and VOC liabilities. Automated heated aqueous turntable washers with high-velocity 3D wash jets and integrated disc oil skimmers for batch component cleaning.',
    image: '/assets/products/stationary-gas-fired.png',
    statPrimary: '80°C Aqueous',
    statLabel: 'Zero VOC Emissions',
  },
  {
    id: 'trailers',
    slug: 'trailers',
    name: 'Mobile Trailers',
    subtitle: 'Highway-Certified Mobile Rigs',
    tagline: 'Self-Contained On-Board Wash Plants',
    description: 'Custom single and tandem-axle mobile wash plants with on-board baffled water storage up to 1,000 litres, dual-lance feeds, generator power, and spring-rewind stainless hose reels.',
    image: '/assets/products/trailer-single.png',
    statPrimary: '1,000L On-Board',
    statLabel: 'Highway-Tow Certified',
  },
];

export default function ProductUniverse() {
  const [activeTab, setActiveTab] = useState<string>(FAMILIES[0].id);
  const activeFamily = FAMILIES.find((f) => f.id === activeTab) || FAMILIES[0];

  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-28 sm:py-36 px-6 sm:px-12 overflow-hidden font-normal" aria-label="Alkota Product World">
      <div className="mx-auto max-w-7xl w-full">
        {/* Architectural Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
              The Product World
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none">
              Engineered by Category.
            </h2>
          </div>

          {/* Clean family tabs — No boxes, subtle text switcher */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 scrollbar-none font-normal">
            {FAMILIES.map((family) => {
              const isActive = family.id === activeTab;
              return (
                <button
                  key={family.id}
                  onClick={() => setActiveTab(family.id)}
                  className={`whitespace-nowrap pb-1.5 text-xs uppercase tracking-[0.18em] transition-all cursor-pointer border-b-2 font-normal ${
                    isActive
                      ? 'border-alkota-orange text-alkota-black'
                      : 'border-transparent text-[#999] hover:text-alkota-black'
                  }`}
                >
                  {family.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Product Showcase Canvas */}
        <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[520px]">
          {/* Machine Cutout — Enormous 60–70% scale floating in architectural space */}
          <div className="lg:col-span-7 flex items-center justify-center relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-center"
              >
                <img
                  src={activeFamily.image}
                  alt={`Alkota ${activeFamily.name}`}
                  className="w-full max-h-[520px] object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Narrative & Specification */}
          <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2 font-normal">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-xs uppercase tracking-widest text-alkota-orange block mb-2 font-light">
                  {activeFamily.subtitle}
                </span>
                <h3 className="font-light text-2xl sm:text-3xl text-alkota-black leading-tight mb-4">
                  {activeFamily.tagline}
                </h3>
                <p className="text-base text-[#666] leading-relaxed mb-8 font-normal">
                  {activeFamily.description}
                </p>

                {/* Key Spec */}
                <div className="mb-8 pt-4">
                  <span className="text-2xl sm:text-3xl font-extralight text-alkota-black block mb-1">
                    {activeFamily.statPrimary}
                  </span>
                  <span className="text-xs text-[#888] uppercase tracking-wider font-light">
                    {activeFamily.statLabel}
                  </span>
                </div>

                <div className="flex items-center gap-6 font-normal">
                  <Link
                    href={`/machines/${activeFamily.slug}`}
                    className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group shadow-lg font-normal"
                  >
                    <span>Explore {activeFamily.name} Range</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/machines"
                    className="text-xs uppercase tracking-widest text-[#777] hover:text-alkota-black transition-colors no-underline font-normal"
                  >
                    All Fleet
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
