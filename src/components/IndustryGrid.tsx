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
    <section className="relative bg-[#0F0F0D] text-white overflow-hidden py-24 sm:py-32" aria-label="Industry Applications">
      {/* Dynamic Full-Bleed Background Photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.slug}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <img
              src={activeSector.image}
              alt={activeSector.name}
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.35) contrast(1.15)' }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-[#0F0F0D]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-white/15">
          <div>
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-3">
              Application Environments
            </span>
            <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-white leading-none">
              BUILT FOR YOUR INDUSTRY.
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-[#aaa] hover:text-alkota-orange transition-colors no-underline shrink-0"
          >
            <span>All Industry Sectors</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Sector Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 border-b border-white/10 scrollbar-none">
          {SECTORS.map((sector) => {
            const isActive = sector.slug === activeSlug;
            return (
              <button
                key={sector.slug}
                onClick={() => setActiveSlug(sector.slug)}
                className={`whitespace-nowrap px-4 py-2.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-alkota-orange text-white'
                    : 'bg-black/50 text-[#999] hover:text-white border border-white/10'
                }`}
              >
                {sector.name}
              </button>
            );
          })}
        </div>

        {/* Sector Information Canvas */}
        <div className="pt-12 sm:pt-16 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange block mb-2">
                Operational Scope // {activeSector.name}
              </span>
              <h3 className="font-inter text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                {activeSector.statement}
              </h3>

              {/* Key Applications List */}
              <div className="space-y-3 mb-8">
                {activeSector.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-ibm-plex-mono text-xs text-[#ddd]">
                    <span className="h-1.5 w-1.5 bg-alkota-orange" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/industries/${activeSector.slug}`}
                className="inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange hover:text-white transition-all no-underline group shadow-lg"
              >
                <span>View {activeSector.name} Solutions</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
