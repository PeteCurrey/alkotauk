'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Check } from 'lucide-react';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';

interface ChemicalExhibit {
  id: string;
  masterCode: string;
  name: string;
  tagline: string;
  promise: string;
  problem: string;
  transformation: string;
  specs: { label: string; value: string }[];
  packSizes: string[];
  price: number;
  image: string;
  bgWatermark: string;
  slug: string;
}

const CHEMICAL_EXHIBITS: ChemicalExhibit[] = [
  {
    id: 'exhibit-roadforce',
    masterCode: 'TR-407',
    name: 'RoadForce Fleet Heavy TFR',
    tagline: 'TOUCHLESS TRAFFIC FILM REMOVAL',
    promise: 'Cuts through road film and diesel grime in one touchless pass without etching vehicle livery or polished aluminium.',
    problem: 'Static Road Film & Diesel Soot',
    transformation: 'Instant Hydrocarbon Emulsion into Clean Gloss Clearcoat',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota TR-407 Master' },
      { label: 'DILUTION RATIO', value: '1:50 to 1:100' },
      { label: 'HEATED REACTION', value: 'Accelerates at 50°C–90°C' },
      { label: 'SUBSTRATE SAFETY', value: 'Paint, Livery & Alloy Safe' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel', '1000L IBC'],
    price: 38.50,
    image: '/assets/industries/fleet.png',
    bgWatermark: 'ROADFORCE',
    slug: 'roadforce-fleet-heavy-tfr',
  },
  {
    id: 'exhibit-greasecut',
    masterCode: 'DE-703',
    name: 'GreaseCut Multi-Surface Workshop Degreaser',
    tagline: 'HIGH-POTENCY HYDROCARBON CRACKING',
    promise: 'Dissolves baked engine oil and chassis grease on contact, turning heavy sludge into a free-rinsing emulsion.',
    problem: 'Bitumen, Hydraulic Leaks & Gearbox Sludge',
    transformation: 'Thermal Saponification into Raw Clean Steel',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota DE-703 Master' },
      { label: 'DILUTION RATIO', value: '1:10 Heavy / 1:30 General' },
      { label: 'ALKALINITY', value: 'Non-Caustic Hydrocarbon Cracker' },
      { label: 'SURFACE COMPATIBILITY', value: 'Gearboxes, Excavators, Concrete' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel', '1000L IBC'],
    price: 29.50,
    image: '/assets/parts/parts-hero-workshop.jpg',
    bgWatermark: 'GREASECUT',
    slug: 'greasecut-multi-surface-workshop-degreaser',
  },
  {
    id: 'exhibit-alumarestore',
    masterCode: 'TS-602',
    name: 'AlumaRestore Aluminium Acid Brightener',
    tagline: 'DEOXIDATION & SURFACE RESTORATION',
    promise: 'Restores weathered aluminium fuel tanks, side guards, and tipper bodies to satin brilliance in under two minutes.',
    problem: 'Grey Chalking & White Rust Oxidation',
    transformation: 'Acid Deoxidation to Uniform Satin Finish',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota TS-602 Master' },
      { label: 'ACTIVE ACIDS', value: 'Phosphoric & Organic Blend' },
      { label: 'ACTION TIME', value: '1 to 2 Minutes Dwell' },
      { label: 'TARGET SUBSTRATES', value: 'Raw / Mill-Finish Aluminium' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel'],
    price: 46.00,
    image: '/assets/hot-water-gauge-hero.jpg',
    bgWatermark: 'ALUMARESTORE',
    slug: 'alumarestore-aluminium-acid-brightener',
  },
  {
    id: 'exhibit-scaleguard',
    masterCode: 'SD-927',
    name: 'ScaleGuard Water Softener & Coil Protector',
    tagline: 'PREVENTATIVE HEATING COIL CHELATION',
    promise: 'Binds hard water minerals before they precipitate into scale choke points, protecting your 7-year boiler warranty.',
    problem: 'Hard Water Limescale Choke Points',
    transformation: 'Mineral Chelation Inhibitor',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota SD-927 Master' },
      { label: 'DOSING RATE', value: '1:1000 Continuous Metering' },
      { label: 'HEAT TOLERANCE', value: 'Effective up to 150°C Steam' },
      { label: 'WARRANTY COMPLIANCE', value: 'Official Alkota Factory Care' },
    ],
    packSizes: ['5L Canister', '20L Drum'],
    price: 34.00,
    image: '/assets/engineered-continuous-duty.jpg',
    bgWatermark: 'SCALEGUARD',
    slug: 'scaleguard-water-softener-coil-protector',
  },
];

export default function ArchitecturalChemicalGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const current = CHEMICAL_EXHIBITS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CHEMICAL_EXHIBITS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CHEMICAL_EXHIBITS.length) % CHEMICAL_EXHIBITS.length);
  };

  const handleOrder = () => {
    addItem({
      id: current.id,
      part_number: `ALK-${current.masterCode}-20L`,
      name: `${current.name} (20L Drum)`,
      price_each: current.price,
      quantity: 1,
      image: current.image,
      category: 'chemical',
    });
    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#EBEAE5] text-[#111110] font-sans overflow-hidden selection:bg-[#FF6900] selection:text-white">
      
      {/* ── THE LUXURY CHEMICAL CAMPAIGN EXHIBIT ── */}
      <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        
        {/* Giant Spatial Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.bgWatermark}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 0.05, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] font-extrabold uppercase tracking-tighter text-[#111110] leading-none text-center"
            >
              {current.bgWatermark}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── TOP METADATA BAR ── */}
        <div className="relative z-20 flex items-start justify-between gap-6 border-b border-[#D8D6CE] pb-6">
          <div className="space-y-1">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] text-[#777] block font-medium">
              // FORMULATION {String(currentIndex + 1).padStart(2, '0')} OF {String(CHEMICAL_EXHIBITS.length).padStart(2, '0')}
            </span>
            <span className="font-ibm-plex-mono text-xs text-[#111110] uppercase tracking-widest font-semibold">
              MASTER FORMULA {current.masterCode}
            </span>
          </div>

          {/* Switcher Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-[#DFDDD6] p-1 rounded-sm">
            {CHEMICAL_EXHIBITS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#111110] text-white shadow-sm'
                    : 'text-[#666] hover:text-[#111110]'
                }`}
              >
                {item.bgWatermark}
              </button>
            ))}
          </div>

          <div className="text-right space-y-1">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] text-[#777] block font-medium">
              COMPLIANCE
            </span>
            <span className="font-ibm-plex-mono text-xs text-emerald-800 font-semibold">
              100% GB-CLP VERIFIED
            </span>
          </div>
        </div>

        {/* ── MAIN SCULPTURAL PRODUCT EXHIBIT ── */}
        <div className="relative z-10 w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Tagline, Name & Transformation Narrative (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6900] font-semibold block">
                    {current.tagline}
                  </span>
                  <h1 
                    className="font-extralight text-[#111110] tracking-tight uppercase leading-[0.88]"
                    style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)' }}
                  >
                    {current.name}
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed">
                  "{current.promise}"
                </p>

                {/* Pack Formats */}
                <div className="space-y-2 pt-2">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    AVAILABLE PACK FORMATS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.packSizes.map((p) => (
                      <span key={p} className="font-ibm-plex-mono text-[10px] text-[#444] px-2.5 py-1 bg-[#DFDDD6] border border-[#D0CEC5]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center: Hero Transformation Imagery (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.08, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full flex items-center justify-center"
              >
                {/* Natural Ambient Shadow */}
                <div className="absolute -bottom-8 inset-x-8 h-20 bg-black/20 blur-3xl rounded-full pointer-events-none" />

                <div className="relative w-full max-w-[560px] aspect-[4/3] overflow-hidden rounded-sm border border-[#D0CEC5] shadow-2xl bg-[#DFDDD6]">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover object-center filter saturate-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#FF6900] block mb-1">
                      TRANSFORMATION EVIDENCE
                    </span>
                    <span className="text-xs font-light text-white/90">
                      {current.transformation}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Technical Coordinates & Purchase Action (3 Cols) */}
          <div className="lg:col-span-3 space-y-8 order-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Clean Ruled Specification Coordinates */}
                <div className="space-y-3">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-[#777] font-semibold block">
                    FORMULATION PROFILE
                  </span>
                  <div className="divide-y divide-[#D8D6CE] border-y border-[#D8D6CE] text-xs font-ibm-plex-mono">
                    {current.specs.map((s, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between gap-2">
                        <span className="text-[#777] uppercase text-[10px]">{s.label}</span>
                        <span className="text-[#111110] font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Purchase Interaction */}
                <div className="space-y-4 pt-2">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block">
                      TRADE PRICE
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-ibm-plex-mono text-3xl sm:text-4xl text-[#111110] font-light">
                        £{current.price.toFixed(2)}
                      </span>
                      <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={handleOrder}
                      className="w-full bg-[#111110] hover:bg-[#FF6900] text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{added ? 'Added to Order ✓' : 'Add to Order'}</span>
                    </button>

                    <Link
                      href={`/chemicals/product/${current.slug}`}
                      className="w-full py-3 border border-[#C5C3BB] hover:border-black text-[#111110] text-center font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors"
                    >
                      Full Formulation Dossier →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ── BOTTOM GALLERY CONTROLS ── */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#D8D6CE] pt-6 font-ibm-plex-mono text-xs">
          
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev Formula</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            >
              <span>Next Formula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#888] text-[10px] uppercase">
              {currentIndex + 1} / {CHEMICAL_EXHIBITS.length}
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#777] text-[10px] uppercase tracking-wider">
            <span>GB-CLP Safety Certified</span>
            <span>•</span>
            <span>Bulk Pallets &amp; 1000L IBCs Available</span>
            <span>•</span>
            <a href="#catalogue" className="text-[#111110] hover:text-[#FF6900] transition-colors font-medium">
              Browse All Chemicals ↓
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
