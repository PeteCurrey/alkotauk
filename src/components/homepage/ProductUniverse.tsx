'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFamily {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

const FAMILIES: ProductFamily[] = [
  {
    id: 'hot-water',
    slug: 'hot-water',
    name: 'Hot Water',
    subtitle: 'Schedule 80 Thermal Power',
    tagline: 'High-Temperature Grease & Oil Breakdown',
    description: 'Schedule 80 continuous-wound spiral heating coils delivering water temperatures up to 95°C at pressures to 345 bar. The industry benchmark for fleet wash bays, agricultural plant, and industrial manufacturing.',
    image: '/assets/products/420x4.png',
    specs: [
      { label: 'Max Pressure', value: 'Up to 345 BAR' },
      { label: 'Flow Rate', value: 'Up to 38 L/MIN' },
      { label: 'Coil Rating', value: 'Schedule 80 ASTM A53' },
      { label: 'Coil Warranty', value: '7-Year Guarantee' },
    ],
  },
  {
    id: 'cold-water',
    slug: 'cold-water',
    name: 'Cold Water',
    subtitle: 'High Volume Plunger Power',
    tagline: 'Continuous Site Washdown & Debris Removal',
    description: 'Slow-turning ceramic triplex plunger pumps mounted on welded structural steel frames. Powered by Honda, Kohler, Vanguard petrol/diesel or TEFC electric motors for continuous multi-hour shifts.',
    image: '/assets/products/4305xd4.png',
    specs: [
      { label: 'Pressure Range', value: '100 – 350 BAR' },
      { label: 'Drive Formats', value: 'Electric / Petrol / Diesel' },
      { label: 'Frame Build', value: 'Cold-Rolled Welded Steel' },
      { label: 'Duty Cycle', value: 'Continuous Industrial' },
    ],
  },
  {
    id: 'steam',
    slug: 'steam',
    name: 'Dry Steam',
    subtitle: '140°C Vapour Sanitisation',
    tagline: 'Biofilm Elimination & Food Grade Hygiene',
    description: '140°C saturated dry vapour steam with ultra-low water consumption. Melts grease matrices and sanitises food production zones, breweries, and packaging lines with minimal surface runoff.',
    image: '/assets/products/steam-oil.png',
    specs: [
      { label: 'Steam Temp', value: 'Up to 140°C Vapour' },
      { label: 'Operating Mode', value: 'Dry Vapour & Wet Steam' },
      { label: 'Hygiene Grade', value: 'HACCP Zone Aligned' },
      { label: 'Water Usage', value: 'Ultra-Low Volume' },
    ],
  },
  {
    id: 'parts-washers',
    slug: 'parts-washers',
    name: 'Parts Washers',
    subtitle: 'Automated Aqueous Cleaning',
    tagline: 'Heated Cabinet Component Degreasing',
    description: 'Eliminate toxic solvent baths and VOC liabilities. Automated heated aqueous turntable washers with high-velocity 3D wash jets and integrated disc oil skimmers for batch component cleaning.',
    image: '/assets/products/stationary-gas-fired.png',
    specs: [
      { label: 'Operating Temp', value: 'Up to 80°C Heated' },
      { label: 'Turntable Drive', value: 'Gear-Driven Rotary' },
      { label: 'Oil Management', value: 'Disc Oil Skimmer' },
      { label: 'Emissions', value: 'Zero VOC / Aqueous' },
    ],
  },
  {
    id: 'trailers',
    slug: 'trailers',
    name: 'Mobile Trailers',
    subtitle: 'Highway-Certified Mobile Rigs',
    tagline: 'Self-Contained On-Board Wash Plants',
    description: 'Custom single and tandem-axle mobile wash plants with on-board baffled water tanks up to 1,000 litres, dual-lance feeds, generator power, and spring-rewind stainless hose reels.',
    image: '/assets/products/trailer-single.png',
    specs: [
      { label: 'Water Storage', value: 'Up to 1,000 Litres' },
      { label: 'Chassis Type', value: 'Highway-Tow / Skid' },
      { label: 'Hose Storage', value: 'Spring-Rewind Stainless' },
      { label: 'Customisation', value: 'Bespoke to Spec' },
    ],
  },
];

export default function ProductUniverse() {
  const [activeTab, setActiveTab] = useState<string>(FAMILIES[0].id);
  const activeFamily = FAMILIES.find((f) => f.id === activeTab) || FAMILIES[0];

  return (
    <section className="bg-[#141412] text-white py-24 sm:py-32 overflow-hidden" aria-label="Product Families Universe">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-3">
              Equipment Range
            </span>
            <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-white leading-none">
              ENGINEERED BY CATEGORY.
            </h2>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-[#aaa] hover:text-alkota-orange transition-colors no-underline shrink-0"
          >
            <span>Complete Machine Index</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal Category Selector */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-6 border-b border-white/10 scrollbar-none">
          {FAMILIES.map((family) => {
            const isActive = family.id === activeTab;
            return (
              <button
                key={family.id}
                onClick={() => setActiveTab(family.id)}
                className={`whitespace-nowrap px-5 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.18em] transition-all cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-alkota-orange text-white bg-white/5'
                    : 'border-transparent text-[#888] hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                {family.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 sm:pt-16 min-h-[520px]">
          {/* Left Column: Family Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange block mb-2">
                  {activeFamily.subtitle}
                </span>
                <h3 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-white leading-tight mb-4">
                  {activeFamily.tagline}
                </h3>
                <p className="font-inter text-[#aaa] text-sm sm:text-base leading-relaxed mb-8 font-normal">
                  {activeFamily.description}
                </p>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-white/10 mb-8 font-ibm-plex-mono text-xs">
                  {activeFamily.specs.map((spec, idx) => (
                    <div key={idx}>
                      <span className="text-[9px] text-[#777] uppercase block mb-0.5">{spec.label}</span>
                      <span className="font-bold text-white text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/machines/${activeFamily.slug}`}
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-7 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-lg"
                >
                  <span>Explore {activeFamily.name} Series</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Machine Visual */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[350px] sm:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={activeFamily.image}
                  alt={`Alkota ${activeFamily.name}`}
                  className="w-full max-w-lg lg:max-w-xl max-h-[440px] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
