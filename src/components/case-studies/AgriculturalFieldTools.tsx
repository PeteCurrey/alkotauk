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
  Tractor,
} from 'lucide-react';

/* ── 01: AGRICULTURAL WATER & FLOW CALCULATOR ──────────────────────────────── */
export function AgriculturalWaterCalculator() {
  const [flowRate, setFlowRate] = useState(18); // L/min
  const [duration, setDuration] = useState(45); // minutes

  const totalVolume = flowRate * duration;
  const totalWeightKg = totalVolume;
  const totalWeightTonnes = (totalWeightKg / 1000).toFixed(2);

  // Buffer tank advice
  let tankAdvice = 'Can operate from standard agricultural mains supply with good flow.';
  if (totalVolume > 500) {
    tankAdvice = 'Recommended to use a 500L–1,000L baffled buffer tank to prevent pump cavitation during long continuous washdowns.';
  }
  if (flowRate >= 21) {
    tankAdvice = 'High-flow system requires a dedicated 1,000L+ buffer tank with high-flow float valve to maintain continuous trigger supply.';
  }

  return (
    <div className="bg-[#121212] text-white p-8 sm:p-12 border border-[#222] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Calculator className="h-4 w-4" />
        <span>Hydraulic Estimator // Flow × Time Equation</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-white mb-4">
        The Number That Gets Forgotten: Flow × Time
      </h3>
      <p className="text-sm sm:text-base text-[#AAA] leading-relaxed max-w-3xl mb-8 font-normal">
        Agricultural washdowns require substantial water volume to carry mud away from heavy machinery. Calculate your water requirement and payload impact for mobile or yard operations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Machine Flow Rate</span>
              <span className="font-mono text-[#FF6900] font-bold">{flowRate} Litres / Minute</span>
            </div>
            <input
              type="range"
              min="10"
              max="35"
              step="1"
              value={flowRate}
              onChange={(e) => setFlowRate(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#666] mt-1 font-mono">
              <span>10 L/min (Light)</span>
              <span>18–21 L/min (Standard Farm)</span>
              <span>30+ L/min (Dual Lance)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
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
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#666] mt-1 font-mono">
              <span>15 min (Quick rinse)</span>
              <span>45 min (Tractor + Implement)</span>
              <span>90 min (Combine clean)</span>
            </div>
          </div>
        </div>

        {/* Calculated Volume Box */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#AAA] block border-b border-white/10 pb-2">
            Estimated Water & Payload Demand
          </span>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Total Water Volume</span>
              <span className="font-extralight text-3xl text-white font-mono">{totalVolume.toLocaleString()} L</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Water Weight</span>
              <span className="font-extralight text-3xl text-[#FF6900] font-mono">{totalWeightTonnes} Tonnes</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <span className="text-[10px] uppercase tracking-wider text-[#FF6900] block mb-1">
              Infrastructure Consideration:
            </span>
            <p className="text-xs text-[#CCC] leading-snug">
              {tankAdvice}
            </p>
          </div>

          <p className="text-[10px] text-[#777] italic leading-tight pt-1">
            *Mathematical consumption at entered flow/time. Does not account for intermittent trigger-off periods.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 02: AGRICULTURAL SYSTEM SELECTOR ──────────────────────────────────────── */
export function AgriculturalSystemSelector() {
  const [targetMachinery, setTargetMachinery] = useState<'tractors' | 'combines' | 'livestock' | 'workshop'>('tractors');
  const [soilType, setSoilType] = useState<'mud' | 'grease' | 'manure'>('grease');
  const [mounting, setMounting] = useState<'washbay' | 'yard' | 'mobile'>('washbay');
  const [operators, setOperators] = useState<'single' | 'dual'>('single');

  let recommendation = {
    title: 'Alkota 4305XD4 Industrial Hot Water Skid',
    tagline: 'High-Output Heavy Plant & Tractor Cleaning Platform',
    description: 'Delivers continuous 90°C thermal water with Schedule 80 ASTM A53 seamless steel coil and 1,450 RPM ceramic triplex pump. Built for heavy grease, dried soil, and farm workshops.',
    primarySlug: 'alkota-4305xd4',
    categoryHref: '/machines/hot-water',
  };

  if (mounting === 'mobile') {
    recommendation = {
      title: 'Alkota Towable Agricultural Trailer Rig',
      tagline: 'Turnkey Mobile Platform with Onboard Water & Live Reels',
      description: 'Equipped with a 1,000L baffled water tank, diesel hot-water skid, and twin live hose reels. Clean machinery in remote fields, secondary yards, and client farms without mains connection.',
      primarySlug: 'alkota-trailer-single',
      categoryHref: '/trailers',
    };
  } else if (operators === 'dual') {
    recommendation = {
      title: 'Alkota High-Flow Multi-Operator Farm Rig',
      tagline: 'Dual-Lance High-Volume Washdown System',
      description: 'Delivers 30+ L/min hot water to drive two simultaneous cleaning wands, allowing two operators to wash combines, trailers, and tractors in half the time during peak harvest windows.',
      primarySlug: 'alkota-4305xd4',
      categoryHref: '/machines/hot-water',
    };
  } else if (soilType === 'mud' && targetMachinery === 'tractors') {
    recommendation = {
      title: 'Alkota High-Flow Cold Water Wash Skid',
      tagline: 'High-Volume Hydraulic Mud & Soil Displacement',
      description: 'Focuses 100% of input power into high volumetric water flow (21+ L/min) to blast and float compacted field clay out of tyre treads and chassis recesses with zero burner fuel cost.',
      primarySlug: 'alkota-420x4',
      categoryHref: '/machines/cold-water',
    };
  }

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] my-12 font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <SlidersHorizontal className="h-4 w-4" />
        <span>System Specification // Agricultural Selector</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Specify the System Around Your Farm
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Select your primary farm machinery and operational setup to identify the recommended cleaning architecture.
      </p>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            01 / Primary Machinery
          </span>
          <select
            value={targetMachinery}
            onChange={(e) => setTargetMachinery(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="tractors">Tractors & Loaders</option>
            <option value="combines">Combines & Harvesters</option>
            <option value="livestock">Livestock Housing & Yards</option>
            <option value="workshop">Farm Workshop & Implements</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            02 / Primary Contamination
          </span>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="grease">Grease, Oil & Hydraulics</option>
            <option value="mud">Heavy Compacted Field Mud</option>
            <option value="manure">Livestock Manure & Slurry</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            03 / Operating Location
          </span>
          <select
            value={mounting}
            onChange={(e) => setMounting(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="washbay">Fixed Farm Wash Bay</option>
            <option value="yard">Workshop Yard / Mobile</option>
            <option value="mobile">Dedicated Towable Trailer</option>
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

      {/* Recommended Output */}
      <div className="p-6 sm:p-8 bg-[#121212] text-white border border-[#222] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
            Recommended Farm Machine Architecture
          </span>
          <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
            {recommendation.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#CCC] max-w-2xl font-normal leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        <Link
          href={recommendation.categoryHref}
          className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shrink-0 shadow-lg"
        >
          <span>Explore Machine Specification</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── 03: AGRICULTURAL EDITORIAL FAQ ────────────────────────────────────────── */
export function AgriculturalEditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Should I use hot or cold water to clean tractors and farm machinery?',
      a: 'For loose field mud, clay, and general rinse washdown, high-flow cold water is completely adequate. However, around tractor axles, wheel hubs, hitch linkages, and hydraulic rams where grease and oil mix with soil, hot water (80°C–90°C) is essential. Hot water emulsifies hydrocarbons instantly, cutting cleaning time and eliminating the need for heavy chemical degreasers.',
    },
    {
      q: 'What flow rate is suitable for agricultural machinery?',
      a: 'For agricultural cleaning, volumetric flow rate is critical. We recommend a minimum of 18 to 21 Litres per Minute (L/min). While pressure breaks mud loose, high flow volume is required to carry heavy clay slurry, stones, and crop chaff away from complex chassis pockets and tyre treads.',
    },
    {
      q: 'Can pressure washing damage tractor radiators and cooling packs?',
      a: 'Yes. Blasting delicate aluminium cooling fins with high pressure at close range can easily bend fins flat or drive chaff deeper into the intercooler core, causing severe engine overheating during harvest. Radiators should be cleaned with reduced pressure, a wide fan nozzle, proper stand-off distance, or an Alkota steam/hot-water setting that melts sticky sap without mechanical fin distortion.',
    },
    {
      q: 'Can I pressure wash around bearings, seals, and electrical sensors?',
      a: 'Extreme high pressure should never be directed point-blank at rotary shaft seals, wheel bearings, PTO clutches, or electronic wiring harnesses. High-pressure jets can force water past rubber seals, washing out grease and causing premature bearing seizure. Always follow OEM tractor manufacturer washing guidance.',
    },
    {
      q: 'How much water does a farm pressure washer use?',
      a: 'An industrial farm washer operating at 18 L/min uses approximately 810 litres of water during a 45-minute continuous washdown. If your farmyard mains supply delivers less than this flow, an onboard or yard-based baffled buffer tank is required to prevent pump cavitation.',
    },
    {
      q: 'Do I need a buffer tank for agricultural pressure washing?',
      a: 'If your borehole or farm mains tap supplies less than the flow required by your pressure washer (e.g. supply is 12 L/min but machine demands 18 L/min), a 500L to 1,000L buffer tank with a low-pressure float valve is vital. The tank acts as a reservoir so your pump never runs dry.',
    },
    {
      q: 'Can one machine run two pressure-washing lances on a farm?',
      a: 'Yes, provided the machine is engineered with a high-flow pump (typically 30+ L/min), dual unloader manifold, and adequate heating coil capacity. Alkota builds multi-operator skids and bespoke trailer rigs that allow two operators to wash simultaneously during peak seasonal turnarounds.',
    },
    {
      q: 'Is a trailer pressure washer suitable for agricultural contractors?',
      a: 'A dedicated towable trailer carrying an industrial hot-water skid, 1,000L baffled water tank, engine/generator, and live hose reels gives agricultural contractors complete operational independence. Contractors can wash machinery directly at field edges, customer yards, or grain stores without relying on client water or power hookups.',
    },
    {
      q: 'How do I stop a farm pressure washer freezing in winter?',
      a: 'Water trapped inside pressure washer pumps and heating coils expands when frozen, cracking brass manifolds and steel pipes. In unheated farm workshops, machines should be housed in insulated plant rooms or winterised with an antifreeze recirculating bypass loop after use.',
    },
    {
      q: 'Does pressure washing disinfect farm machinery and livestock housing?',
      a: 'No. Pressure washing is a cleaning process that removes gross organic soil, mud, and manure. Disinfection is a separate chemical or thermal process that requires approved DEFRA agricultural disinfectants applied at the correct dilution and contact time to bare, pre-cleaned surfaces.',
    },
  ];

  return (
    <div className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <HelpCircle className="h-4 w-4" />
        <span>Farming Intelligence // Agricultural Frequently Asked Questions</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-8">
        Agricultural Equipment FAQ
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
