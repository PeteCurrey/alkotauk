'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Flame, Droplets, Wind, RotateCw, Truck, Layers } from 'lucide-react';

interface ProductFamily {
  id: string;
  name: string;
  categorySlug: string;
  headline: string;
  statement: string;
  specs: { label: string; value: string }[];
  image: string;
  icon: any;
  accent: string;
}

const FAMILIES: ProductFamily[] = [
  {
    id: 'hot-water',
    name: 'Hot Water Pressure Washers',
    categorySlug: 'hot-water',
    headline: 'THERMAL POWER FOR HEAVY OIL & ROAD FILM.',
    statement: 'Engineered with Schedule 80 continuous-wound heating coils and high-output burners delivering water temperatures up to 95°C and pressures up to 345 bar.',
    specs: [
      { label: 'Max Pressure', value: '345 BAR (5,000 PSI)' },
      { label: 'Flow Rates', value: 'Up to 38 L/MIN' },
      { label: 'Coil Metallurgy', value: 'Schedule 80 Seamless' },
      { label: 'Warranty', value: '7-Year Coil Standard' },
    ],
    image: '/assets/products/420x4.png',
    icon: Flame,
    accent: '#FF6900',
  },
  {
    id: 'cold-water',
    name: 'Cold Water Industrial',
    categorySlug: 'cold-water',
    headline: 'UNCOMPROMISING WATER VOLUME FOR SITE CLEANING.',
    statement: 'Aircraft-grade aluminium and heavy-gauge steel frames housing industrial triplex plunger pumps driven by Honda, Kohler, Vanguard, or TEFC electric motors.',
    specs: [
      { label: 'Operating Range', value: '100 – 350 BAR' },
      { label: 'Drive Options', value: 'Electric / Petrol / Diesel' },
      { label: 'Frame Build', value: 'Welded Structural Steel' },
      { label: 'Duty Cycle', value: 'Continuous Industrial' },
    ],
    image: '/assets/products/4305xd4.png',
    icon: Droplets,
    accent: '#0EA5E9',
  },
  {
    id: 'steam',
    name: 'Dry Vapour Steam Cleaners',
    categorySlug: 'steam',
    headline: '140°C LATENT HEAT SANITISATION & DEGREASING.',
    statement: 'Low water volume, high-temperature saturated dry steam melts heavy grease matrices instantly without excessive surface runoff or chemical saturation.',
    specs: [
      { label: 'Steam Temperature', value: 'Up to 140°C Vapour' },
      { label: 'Operating Mode', value: 'Dry & Wet Steam' },
      { label: 'Ideal Environment', value: 'Food Processing / HACCP' },
      { label: 'Moisture Level', value: 'Ultra-Low Splatter' },
    ],
    image: '/assets/products/steam-oil.png',
    icon: Wind,
    accent: '#10B981',
  },
  {
    id: 'parts-washers',
    name: 'Aqueous Parts Washers',
    categorySlug: 'parts-washers',
    headline: 'AUTOMATED ROTARY COMPONENT DEGREASING.',
    statement: 'Eliminate solvent sink liabilities with heated alkaline aqueous turntable cabinet washers featuring high-velocity 3D wash jets and built-in disc oil skimmers.',
    specs: [
      { label: 'Wash Temp', value: 'Up to 80°C Heated' },
      { label: 'Turntable Drive', value: 'Heavy Gear-Driven' },
      { label: 'Oil Management', value: 'Integrated Disc Skimmer' },
      { label: 'Compliance', value: 'Zero VOC Emissions' },
    ],
    image: '/assets/products/stationary-gas-fired.png',
    icon: RotateCw,
    accent: '#F59E0B',
  },
  {
    id: 'trailers',
    name: 'Bespoke Trailer & Van Rigs',
    categorySlug: 'trailers',
    headline: 'TURNKEY SELF-CONTAINED MOBILE CLEANING.',
    statement: 'Custom-built single and tandem-axle mobile wash plants engineered with on-board baffled water tanks, hose reels, generator power, and dual-gun feeds.',
    specs: [
      { label: 'Water Capacity', value: 'Up to 1,000 Litres' },
      { label: 'Mounting', value: 'Road-Tow / Van / Skid' },
      { label: 'Hose Storage', value: 'Integrated Stainless Reels' },
      { label: 'Build Spec', value: 'Bespoke to Application' },
    ],
    image: '/assets/products/trailer-single.png',
    icon: Truck,
    accent: '#6366F1',
  },
  {
    id: 'water-treatment',
    name: 'Water Recycling & Treatment',
    categorySlug: 'water-treatment',
    headline: 'ENVIRONMENT AGENCY COMPLIANT WASH BAYS.',
    statement: 'Closed-loop hydro-cyclonic separation and biological filtration systems that treat and recycle wash effluent, drastically cutting water utility bills.',
    specs: [
      { label: 'Filtration Type', value: 'Multi-Stage Hydro-Cyclone' },
      { label: 'Water Recovery', value: 'Up to 90% Recycled' },
      { label: 'Drainage Status', value: 'Zero Trade Discharge' },
      { label: 'Compliance', value: 'PPG3 & BS EN 858 Aligned' },
    ],
    image: '/assets/products/ged-12v-skid.png',
    icon: Layers,
    accent: '#14B8A6',
  },
];

export default function ProductUniverse() {
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0);
  const activeFamily = FAMILIES[activeFamilyIndex];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F8F8F7] border-b border-[#D8D8D6] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D8D6] pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                // THE ALKOTA PRODUCT UNIVERSE
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              BUILT FOR THE WORK.
            </h2>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors"
          >
            <span>View Full Machine Index (127 Models)</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Family Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {FAMILIES.map((family, idx) => {
            const isSelected = idx === activeFamilyIndex;
            const Icon = family.icon;
            return (
              <button
                key={family.id}
                onClick={() => setActiveFamilyIndex(idx)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-alkota-black shadow-md border-l-4 border-l-alkota-orange'
                    : 'bg-[#EDEDEB] border-[#DCDCDA] hover:bg-white text-[#777] hover:text-alkota-black'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-alkota-orange' : 'text-[#888]'}`} />
                  <span className="font-ibm-plex-mono text-[9px] font-bold text-[#888]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="font-barlow-condensed text-lg font-bold uppercase tracking-tight text-alkota-black leading-tight">
                  {family.name.split(' ')[0]} {family.name.split(' ')[1] || ''}
                </p>
              </button>
            );
          })}
        </div>

        {/* Featured Family Showcase Card (Hero Presentation) */}
        <div className="bg-white border border-[#D5D5D3] p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Engineering Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange mb-3 block">
                  CATEGORY {activeFamilyIndex + 1} OF 6 // {activeFamily.name.toUpperCase()}
                </span>
                <h3 className="font-barlow-condensed text-4xl sm:text-6xl font-black uppercase italic tracking-tight text-alkota-black leading-[0.9] mb-6">
                  {activeFamily.headline}
                </h3>
                <p className="font-inter text-base text-[#555] leading-relaxed mb-8">
                  {activeFamily.statement}
                </p>
              </div>

              {/* Glanceable Specs Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-[#EAEAEA] py-6 mb-8 font-ibm-plex-mono text-xs">
                {activeFamily.specs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <span className="text-[#888] text-[9px] block uppercase">{spec.label}</span>
                    <span className="font-bold text-alkota-black text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Direct Category Route CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/machines/${activeFamily.categorySlug}`}
                  className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange no-underline group"
                >
                  <span>Explore {activeFamily.name}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/tools/configurator"
                  className="inline-flex items-center gap-2 border border-[#333] px-6 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-black hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline"
                >
                  Configure Build
                </Link>
              </div>
            </div>

            {/* Right: Substantial Machine Cutout Visual */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#F5F5F3] to-[#EBEBE8] border border-[#E0E0DE] p-8 flex items-center justify-center overflow-hidden">
              <img
                src={activeFamily.image}
                alt={activeFamily.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 font-ibm-plex-mono text-[9px] text-[#999] uppercase tracking-widest">
                // HANDCRAFTED IN USA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
