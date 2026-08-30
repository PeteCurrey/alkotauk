'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Droplets,
  Flame,
  Truck,
  Wrench,
  SlidersHorizontal,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Anchor,
  Shield,
  Gauge,
} from 'lucide-react';

/* ── 01: MARINE WATER LOGISTICS & HOSE FRICTION ESTIMATOR ─────────────────── */
export function MarineWaterLogisticsCalculator() {
  const [flowRate, setFlowRate] = useState(20); // L/min
  const [hoseLength, setHoseLength] = useState(50); // metres
  const [duration, setDuration] = useState(60); // minutes

  const totalVolume = flowRate * duration;
  const totalWeightTonnes = (totalVolume / 1000).toFixed(2);

  // Pressure drop approximation on standard 3/8" hose at given flow
  // Approximate empirical formula: deltaP ≈ hoseLength * (flowRate / 18)^1.8 * 0.35
  const pressureDropBar = Math.round(hoseLength * Math.pow(flowRate / 18, 1.8) * 0.38);

  let recommendation = 'Standard dockside potable water supply with 3/8" high-pressure hose.';
  if (hoseLength >= 60 || flowRate >= 21) {
    recommendation = 'Consider upgrading to a 1/2" ID high-flow smooth-bore hose to prevent excessive quayside pressure loss.';
  }
  if (totalVolume >= 1000) {
    recommendation += ' An onboard 1,000L baffled buffer tank is advised if quay water flow is limited.';
  }

  return (
    <div className="bg-[#0B131E] text-white p-8 sm:p-12 border border-[#1E2D3D] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Calculator className="h-4 w-4" />
        <span>Marine Hydraulic Logistics // Flow & Friction Estimator</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-white mb-4">
        A Mobile Marine System Needs a Water Plan
      </h3>
      <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-3xl mb-8 font-normal">
        From quayside hose runs across pontoons to vessel deck washdowns, calculate freshwater demand, total mass, and quayside friction losses.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-[#CBD5E1] mb-2">
              <span>Freshwater Flow Rate</span>
              <span className="font-mono text-[#FF6900] font-bold">{flowRate} Litres / Minute</span>
            </div>
            <input
              type="range"
              min="12"
              max="35"
              step="1"
              value={flowRate}
              onChange={(e) => setFlowRate(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#1E293B] h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B] mt-1 font-mono">
              <span>12 L/min (Light)</span>
              <span>20 L/min (Standard Marine)</span>
              <span>30+ L/min (Dual Operator)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CBD5E1] mb-2">
              <span>Quayside / Deck Hose Distance</span>
              <span className="font-mono text-[#FF6900] font-bold">{hoseLength} Metres</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={hoseLength}
              onChange={(e) => setHoseLength(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#1E293B] h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B] mt-1 font-mono">
              <span>20m (Pontoon)</span>
              <span>50m (Harbour Quay)</span>
              <span>100m (Dry Dock Run)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CBD5E1] mb-2">
              <span>Continuous Trigger Duration</span>
              <span className="font-mono text-[#FF6900] font-bold">{duration} Minutes</span>
            </div>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#1E293B] h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Volume Box */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] block border-b border-white/10 pb-2">
            Estimated Marine Water Logistics
          </span>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">Total Freshwater</span>
              <span className="font-extralight text-3xl text-white font-mono">{totalVolume.toLocaleString()} L</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">Water Mass</span>
              <span className="font-extralight text-3xl text-[#FF6900] font-mono">{totalWeightTonnes} T</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-[#94A3B8]">Est. Hose Friction Drop (3/8&quot;):</span>
              <span className="font-mono text-white font-bold">~{pressureDropBar} BAR</span>
            </div>
            <p className="text-[11px] text-[#CBD5E1] leading-snug pt-1">
              {recommendation}
            </p>
          </div>

          <p className="text-[10px] text-[#64748B] italic leading-tight pt-1">
            *Illustrative calculation based on theoretical continuous trigger pull and smooth-bore hydraulic friction tables.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 02: MARINE SYSTEM SELECTOR ────────────────────────────────────────────── */
export function MarineSystemSelector() {
  const [cleaningTarget, setCleaningTarget] = useState<'vessel' | 'machinery' | 'fish' | 'shipyard'>('vessel');
  const [soilProfile, setSoilProfile] = useState<'salt' | 'oil' | 'biofouling'>('salt');
  const [mounting, setMounting] = useState<'trailer' | 'dockside' | 'fixed'>('trailer');
  const [operators, setOperators] = useState<'single' | 'dual'>('single');

  let recommendation = {
    title: 'Alkota 4305XD4 Marine-Specified Hot Water Skid',
    tagline: 'Stainless Wrap Commercial Marine Platform',
    description: 'Features a Schedule 80 ASTM A53 continuous steel heating coil, stainless steel outer casing wrap, low-RPM ceramic plunger pump, and high-temperature thermal power to emulsify marine grease and fish fats.',
    primarySlug: 'alkota-4305xd4',
    categoryHref: '/machines/hot-water',
  };

  if (mounting === 'trailer') {
    recommendation = {
      title: 'Alkota Towable Marine Trailer Rig',
      tagline: 'Self-Contained Quayside Washdown Platform',
      description: 'Equipped with a 1,000L baffled water tank, diesel hot-water skid with stainless steel wraps, engine drive, and dual live stainless hose reels for long pontoon deployments.',
      primarySlug: 'alkota-trailer-single',
      categoryHref: '/trailers',
    };
  } else if (operators === 'dual') {
    recommendation = {
      title: 'Alkota High-Flow Multi-Operator Shipyard Rig',
      tagline: 'High-Volume Dual-Lance Maritime Platform',
      description: 'Delivers 30+ L/min at 90°C to power two simultaneous lances, enabling fast turnaround of commercial vessel hulls, decks, and dry dock machinery between tides.',
      primarySlug: 'alkota-4305xd4',
      categoryHref: '/machines/hot-water',
    };
  } else if (soilProfile === 'salt' && cleaningTarget === 'vessel') {
    recommendation = {
      title: 'Alkota High-Flow Marine Cold Water Washer',
      tagline: 'High-Volume Freshwater Salt Rinse System',
      description: 'Focuses 100% of input power into high volumetric freshwater flow (21+ L/min) to dissolve and flush soluble crystalline salt deposits out of tight superstructure crevices.',
      primarySlug: 'alkota-420x4',
      categoryHref: '/machines/cold-water',
    };
  }

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] my-12 font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <SlidersHorizontal className="h-4 w-4" />
        <span>System Specification // Marine Equipment Selector</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Specify the System Around the Maritime Task
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Select your vessel type, primary marine contaminant, and quayside configuration to determine the appropriate system architecture.
      </p>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            01 / Primary Application
          </span>
          <select
            value={cleaningTarget}
            onChange={(e) => setCleaningTarget(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="vessel">Commercial Vessel & Hull</option>
            <option value="fish">Fishing Deck & Fish Hold</option>
            <option value="machinery">Deck Winches & Cranes</option>
            <option value="shipyard">Shipyard & Dry Dock</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            02 / Primary Contamination
          </span>
          <select
            value={soilProfile}
            onChange={(e) => setSoilProfile(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="salt">Seawater Salt & Spray Crust</option>
            <option value="oil">Winch Grease & Heavy Fuel Oil</option>
            <option value="biofouling">Marine Algae & Biofouling</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            03 / Location & Mounting
          </span>
          <select
            value={mounting}
            onChange={(e) => setMounting(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="trailer">Towable Marine Trailer Rig</option>
            <option value="dockside">Dockside / Quayside Mobile</option>
            <option value="fixed">Fixed Workshop / Shipyard Skid</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            04 / Operator Capacity
          </span>
          <select
            value={operators}
            onChange={(e) => setOperators(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="single">Single Lance Operator</option>
            <option value="dual">Dual Simultaneous Lances</option>
          </select>
        </div>
      </div>

      {/* Recommended Output Box */}
      <div className="p-6 sm:p-8 bg-[#0B131E] text-white border border-[#1E2D3D] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
            Recommended Marine Architecture
          </span>
          <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
            {recommendation.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl font-normal leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        <Link
          href={recommendation.categoryHref}
          className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shrink-0 shadow-lg"
        >
          <span>Explore Marine Configuration</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── 03: MARINE EDITORIAL FAQ ──────────────────────────────────────────────── */
export function MarineEditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Should I use fresh water to rinse salt from marine equipment?',
      a: 'Yes, fresh water is essential for salt washdown. Salt (sodium chloride) is highly water-soluble; using fresh water dissolves and floats crystalline salt deposits away. Washing with seawater merely adds more ionic salt back onto the steel substrate, accelerating galvanic corrosion once dried.',
    },
    {
      q: 'Can pressure washing damage boat hulls and marine coatings?',
      a: 'Yes, if excessive pressure is applied at close range. Extreme high pressure (>250 BAR) directed at soft antifouling paint, gelcoat surfaces, sacrificial anodes, or elastomeric seam caulking can strip protective coatings or fracture fiberglass matrix. Marine washdowns require calibrated pressure, wide fan spray angles, and proper stand-off distances.',
    },
    {
      q: 'Is hot water necessary for marine cleaning?',
      a: 'For pure salt and seawater rinsing, high-flow cold fresh water is completely effective. However, for winch cables, crane slewing rings, deck hydraulic powerpacks, diesel soot, and fish oils, hot water (80°C–90°C) is necessary. Thermal energy liquefies heavy grease and animal fats without demanding excessive solvent degreasers.',
    },
    {
      q: 'What pressure washer is suitable for commercial fishing vessels?',
      a: 'Commercial fishing boats require high-flow (18–21+ L/min) hot-water units equipped with corrosion-resistant stainless steel coil wraps, forged brass pump heads, and heavy Schedule 80 steel heating coils. When landing catch, high water flow and heat are vital to strip fish slime and sanitise decks quickly between tides.',
    },
    {
      q: 'How do I clean heavy grease from deck winches and marine machinery?',
      a: 'Apply a targeted marine degreaser with calibrated dwell time, followed by Alkota 85°C hot water at 180–200 BAR using a 25° fan nozzle. Heat breaks the petroleum binder, allowing the water stream to flush grease into containment sumps without point-blank seal blasting.',
    },
    {
      q: 'How much water does a marine pressure washer use?',
      a: 'A standard industrial marine unit running at 20 L/min consumes approximately 1,200 litres of fresh water per hour of continuous trigger time. On quaysides with limited mains capacity, a 1,000L baffled buffer tank prevents pump cavitation.',
    },
    {
      q: 'Can a trailer pressure washer be used dockside?',
      a: 'Yes. Dedicated towable trailers carrying an industrial hot-water skid, 1,000L baffled water tank, engine/generator, and live stainless steel hose reels are ideal for quayside contractors servicing multiple boats, pontoons, and shipyard hardstanding.',
    },
    {
      q: 'How should marine wash water be handled environmentally?',
      a: 'Wash water containing petroleum oils, toxic antifouling paint chips, or heavy chemical degreasers must not be discharged directly into the sea or stormwater drains. Operators must use vacuum recovery surface cleaners, inflatable bunds, or shipyard interceptor drainage systems to recover and dispose of trade effluent legally.',
    },
    {
      q: 'Does pressure washing prevent marine corrosion?',
      a: 'No. Pressure washing is a cleaning process that removes soluble salts and abrasive grime, eliminating one catalyst for corrosion. Full corrosion control requires an integrated maintenance regime including sacrificial anodes, protective marine coatings, barrier greases, and scheduled mechanical inspections.',
    },
    {
      q: 'What equipment should a marine cleaning contractor carry?',
      a: 'A marine cleaning contractor kit should include: 50m–80m non-marking high-pressure hose on live stainless reels, rotary flat surface cleaners with vacuum recovery ports, dual lances for instant pressure/chemical switching, turbo nozzles for hard concrete slipways, and portable drain containment berms.',
    },
  ];

  return (
    <div className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <HelpCircle className="h-4 w-4" />
        <span>Marine Technical Intelligence // Frequently Asked Questions</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-8">
        Marine Equipment FAQ
      </h3>

      <div className="space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-[#E8E8E4] transition-colors overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 bg-[#F8F7F4] hover:bg-white flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-light text-base sm:text-lg uppercase tracking-tight text-alkota-black">
                  {item.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#FF6900] shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#888] shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="p-5 sm:p-6 bg-white border-t border-[#E8E8E4] text-xs sm:text-sm text-[#555] leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
