'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndustrySector {
  slug: string;
  name: string;
  image: string;
  statement: string;
  applications: string[];
}

const SECTORS: IndustrySector[] = [
  {
    slug: 'agriculture',
    name: 'Agriculture',
    image: '/assets/industries/agriculture.png',
    statement: 'Continuous-duty cleaning for combines, grain stores, livestock housing, and slurry systems.',
    applications: ['Harvesters & Tractors', 'Livestock Sanitisation', 'Slurry & Fertilizer Removal'],
  },
  {
    slug: 'transport-fleet',
    name: 'Transport & Fleet',
    image: '/assets/industries/fleet.png',
    statement: 'High-throughput wash bays for haulage fleets, bus depots, and municipal logistics networks.',
    applications: ['Chassis Washdown', 'Traffic Film & Road Salt', 'Automated Wheel Cleaning'],
  },
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    image: '/assets/industries/food-processing.png',
    statement: '140°C saturated dry vapour steam and hot water for hygiene zones and food production lines.',
    applications: ['Conveyor Degreasing', 'Biofilm & Mold Eradication', 'HACCP Zone Sanitisation'],
  },
  {
    slug: 'industrial',
    name: 'Manufacturing',
    image: '/assets/industries/manufacturing.png',
    statement: 'Heavy component degreasing, press tool maintenance, and automated parts washing.',
    applications: ['Tool & Die Degreasing', 'Machining Swarf Removal', 'Aqueous Turntable Washing'],
  },
  {
    slug: 'construction',
    name: 'Construction',
    image: '/assets/industries/construction.png',
    statement: 'High-pressure mud, concrete slurry, and site debris removal for plant hire and earthmoving machinery.',
    applications: ['Track & Bucket Descaling', 'Concrete Batch Plants', 'Mobile Site Washdown'],
  },
  {
    slug: 'waste-management',
    name: 'Waste & Recycling',
    image: '/assets/industries/waste-management.png',
    statement: 'Extreme-duty sanitisation for refuse collection vehicles, compactor bays, and recycling plants.',
    applications: ['Refuse Vehicle Disinfection', 'Hopper & Bin Degreasing', 'Depot Odour Control'],
  },
  {
    slug: 'mining',
    name: 'Mining & Quarrying',
    image: '/assets/industries/mining.png',
    statement: 'High-flow heavy descaling for screening plant, crushers, aggregate conveyors, and quarry loaders.',
    applications: ['Crusher & Screen Washing', 'Heavy Hauler Undercarriage', 'Aggregate Plant Maintenance'],
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    image: '/assets/industries/oil-gas.png',
    statement: 'Corrosion-resistant hot water and steam systems for subsea equipment and exploration facilities.',
    applications: ['Heavy Crude Breakdown', 'Exploration Rig Decking', 'Corrosion Management'],
  },
];

export default function IndustryGrid() {
  const [activeSlug, setActiveSlug] = useState<string>(SECTORS[0].slug);
  const activeSector = SECTORS.find((s) => s.slug === activeSlug) || SECTORS[0];

  return (
    <section className="relative min-h-[700px] w-full bg-[#0F0F0D] text-white flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 font-normal overflow-hidden" aria-label="Real World Applications">
      {/* Dynamic Full-Bleed Environment Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.slug}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img
              src={activeSector.image}
              alt={activeSector.name}
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.38) contrast(1.15)' }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-[#0F0F0D]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
              Real-World Applications
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              Built for Your Industry.
            </h2>
          </div>

          {/* Understated Category Selector — Clean text tabs without boxes */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none font-normal">
            {SECTORS.map((sector) => {
              const isActive = sector.slug === activeSlug;
              return (
                <button
                  key={sector.slug}
                  onClick={() => setActiveSlug(sector.slug)}
                  className={`whitespace-nowrap pb-1.5 text-xs uppercase tracking-[0.16em] transition-all cursor-pointer border-b-2 font-normal ${
                    isActive
                      ? 'border-alkota-orange text-white'
                      : 'border-transparent text-[#888] hover:text-white'
                  }`}
                >
                  {sector.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector Information Canvas */}
        <div className="pt-8 max-w-2xl font-normal">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-light text-2xl sm:text-3xl text-white leading-tight mb-6">
                {activeSector.statement}
              </h3>

              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-xs text-[#ccc] font-normal">
                {activeSector.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 font-normal">
                <Link
                  href={`/industries/${activeSector.slug}`}
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange hover:text-white transition-all no-underline group shadow-lg font-normal"
                >
                  <span>Explore {activeSector.name} Solutions</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/industries"
                  className="text-xs uppercase tracking-widest text-[#aaa] hover:text-white transition-colors no-underline font-normal"
                >
                  All Sectors
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
