'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Check, Search, ShieldCheck, Download } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

interface MasterpieceProduct {
  id: string;
  partNumber: string;
  brand: string;
  name: string;
  tagline: string;
  promise: string;
  specs: { label: string; value: string }[];
  price: number;
  image: string;
  bgWatermark: string;
  category: string;
  inStock: boolean;
  material: string;
  origin: string;
}

const MASTERPIECE_EXHIBITS: MasterpieceProduct[] = [
  {
    id: 'exhibit-mosmatic-43',
    partNumber: 'MOS-DL-UHD-43',
    brand: 'MOSMATIC SWITZERLAND',
    name: 'DL-UHD 43 Flat Surface Cleaner (18")',
    tagline: 'ROTARY SURFACE PRECISION',
    promise: 'Blasts concrete yards, forecourts, and workshop bays streak-free at 2,000 RPM with zero overspray.',
    specs: [
      { label: 'DIAMETER', value: '430mm (18 Inch)' },
      { label: 'PRESSURE RATING', value: '275 Bar (4,000 PSI)' },
      { label: 'TEMPERATURE', value: '120°C Hot Water' },
      { label: 'ROTARY SPEED', value: '2,000 RPM Dual-Jet' },
    ],
    price: 445.00,
    image: '/assets/products/whirl-away-surface-cleaner.png',
    bgWatermark: 'MOSMATIC',
    category: 'surface-cleaners',
    inStock: true,
    material: '304 Welded Stainless Steel',
    origin: 'Necker, Switzerland',
  },
  {
    id: 'exhibit-coxreels-1125',
    partNumber: 'COX-1125-3-100',
    brand: 'COXREELS USA',
    name: '1125 Series All-Steel High-Pressure Reel',
    tagline: 'ALL-STEEL FLUID MANAGEMENT',
    promise: 'Keeps 30 metres of high-pressure wire-braided hose protected, tangle-free, and deployable in seconds.',
    specs: [
      { label: 'CAPACITY', value: '30m (100ft) 3/8" Hose' },
      { label: 'PRESSURE RATING', value: '300 Bar (4,350 PSI)' },
      { label: 'SWIVEL FITTING', value: 'CPC Brass Live Swivel' },
      { label: 'MOUNTING', value: 'Floor, Wall & Skid' },
    ],
    price: 285.00,
    image: '/assets/products/high-pressure-hose.png',
    bgWatermark: 'COXREELS',
    category: 'hoses',
    inStock: true,
    material: 'Heavy-Gauge CNC Steel A-Frame',
    origin: 'Tempe, Arizona, USA',
  },
  {
    id: 'exhibit-generalpump-ts2021',
    partNumber: 'ALK-PMP-001',
    brand: 'GENERAL PUMP / INTERPUMP',
    name: 'TS2021 Industrial Triplex Plunger Pump',
    tagline: 'THE BENCHMARK INDUSTRIAL PUMP',
    promise: 'Solid 99.8% alumina ceramic plungers and forged brass manifold engineered for continuous 24/7 duty.',
    specs: [
      { label: 'WATER FLOW', value: '15.0 L/min' },
      { label: 'PRESSURE RATING', value: '200 Bar (2,900 PSI)' },
      { label: 'PLUNGER CORE', value: 'Solid Ceramic Alumina' },
      { label: 'MANIFOLD', value: 'Forged High-Density Brass' },
    ],
    price: 645.00,
    image: '/assets/products/industrial-pump.png',
    bgWatermark: 'TRIPLEX',
    category: 'pumps',
    inStock: true,
    material: 'Forged Brass & Ceramic',
    origin: 'Reggio Emilia, Italy',
  },
  {
    id: 'exhibit-schedule80-coil',
    partNumber: 'ALK-COIL-4000',
    brand: 'ALKOTA OEM GENUINE',
    name: 'Schedule 80 Hydro-Insulated Heating Coil',
    tagline: 'CONTINUOUS THERMAL EFFICIENCY',
    promise: 'Cold-rolled Schedule 80 seamless steel pipe engineered to deliver instantaneous 140°C saturated steam.',
    specs: [
      { label: 'PIPE SCHEDULE', value: 'Schedule 80 Seamless' },
      { label: 'BURST RATING', value: 'Over 1,000 Bar Proof' },
      { label: 'INSULATION', value: 'Hydro-Insulated Ceramic' },
      { label: 'WARRANTY', value: '7-Year Boiler Coil Guarantee' },
    ],
    price: 890.00,
    image: '/assets/engineered-continuous-duty.jpg',
    bgWatermark: 'ALKOTA',
    category: 'coils',
    inStock: true,
    material: 'ASTM A53 Carbon Steel',
    origin: 'Alcester, South Dakota, USA',
  },
];

export default function ArchitecturalShowroomGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const current = MASTERPIECE_EXHIBITS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MASTERPIECE_EXHIBITS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MASTERPIECE_EXHIBITS.length) % MASTERPIECE_EXHIBITS.length);
  };

  const handleOrder = () => {
    addItem({
      id: current.id,
      part_number: current.partNumber,
      name: current.name,
      price_each: current.price,
      quantity: 1,
      image: current.image,
      category: current.category,
    });
    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#EBEAE5] text-[#111110] font-sans overflow-hidden selection:bg-[#FF6900] selection:text-white">
      
      {/* ════════════════════════════════════════════════════════════════════════
          ARCHITECTURAL SHOWROOM CANVAS (THE EXHIBIT STAGE)
          Single continuous luxury environment inspired by the Dribbble watch benchmark
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        
        {/* Giant Watermark Typography (Spatial Depth Layer Behind Product) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.bgWatermark}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 0.055, scale: 1, y: 0 }}
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
              // EXHIBIT {String(currentIndex + 1).padStart(2, '0')} OF {String(MASTERPIECE_EXHIBITS.length).padStart(2, '0')}
            </span>
            <span className="font-ibm-plex-mono text-xs text-[#111110] uppercase tracking-widest font-semibold">
              {current.brand}
            </span>
          </div>

          {/* Quick Exhibit Switcher Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-[#DFDDD6] p-1 rounded-sm">
            {MASTERPIECE_EXHIBITS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#111110] text-white shadow-sm'
                    : 'text-[#666] hover:text-[#111110]'
                }`}
              >
                {item.partNumber.split('-')[0]} {item.partNumber.split('-')[1]}
              </button>
            ))}
          </div>

          <div className="text-right space-y-1">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] text-[#777] block font-medium">
              ORIGIN &amp; CRAFT
            </span>
            <span className="font-ibm-plex-mono text-xs text-[#111110]">
              {current.origin}
            </span>
          </div>
        </div>

        {/* ── MAIN SCULPTURAL PRODUCT EXHIBIT ── */}
        <div className="relative z-10 w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Spatial Coordinates: Tagline, Name & Narrative (4 Cols) */}
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
                  {current.promise}
                </p>

                {/* Material Pill */}
                <div className="pt-2">
                  <span className="font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-wider bg-[#DFDDD6] px-3 py-1.5 border border-[#D0CEC5]">
                    Engineered: {current.material}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Stage: Enormous Sculptural Product Presentation (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full flex items-center justify-center"
              >
                {/* Natural Ground Contact Floor Shadow */}
                <div className="absolute -bottom-8 inset-x-8 h-20 bg-black/20 blur-3xl rounded-full pointer-events-none" />

                <img
                  src={current.image}
                  alt={current.name}
                  className="relative z-10 w-full h-auto max-w-[580px] max-h-[500px] object-contain filter drop-shadow-[0_36px_56px_rgba(0,0,0,0.22)] select-none hover:scale-[1.03] transition-transform duration-700"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Spatial Coordinates: Engineering Specs & Purchase Action (3 Cols) */}
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
                    ENGINEERING PROFILE
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
                      UK TRADE PRICE
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
                      href={`/parts-attachments/product/${current.partNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="w-full py-3 border border-[#C5C3BB] hover:border-black text-[#111110] text-center font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors"
                    >
                      Technical Dossier →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ── BOTTOM GALLERY CONTROLS & DESPATCH STATUS ── */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#D8D6CE] pt-6 font-ibm-plex-mono text-xs">
          
          {/* Previous / Next Exhibit Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev Exhibit</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            >
              <span>Next Exhibit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#888] text-[10px] uppercase">
              {currentIndex + 1} / {MASTERPIECE_EXHIBITS.length}
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#777] text-[10px] uppercase tracking-wider">
            <span>Next-Day UK Mainland Delivery</span>
            <span>•</span>
            <span>Official Factory Warranties</span>
            <span>•</span>
            <a href="#catalogue" className="text-[#111110] hover:text-[#FF6900] transition-colors font-medium">
              Browse 500+ Part Catalogue ↓
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
