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
  Fuel,
  ShieldAlert,
  AlertOctagon,
} from 'lucide-react';

/* ── 01: OILFIELD WATER & FUEL LOGISTICS CALCULATOR ────────────────────────── */
export function OilfieldLogisticsCalculator() {
  const [flowRate, setFlowRate] = useState(21); // L/min
  const [dailyHours, setDailyHours] = useState(5); // hrs/day
  const [siteDays, setSiteDays] = useState(3); // days on site

  const dailyMinutes = dailyHours * 60;
  const totalWaterLitres = flowRate * dailyMinutes * siteDays;
  const totalWaterTonnes = (totalWaterLitres / 1000).toFixed(2);

  // Approximate burner diesel fuel consumption (typically ~6–9 L/hr during active firing)
  const estimatedFuelLitres = Math.round(dailyHours * 7.5 * siteDays);

  let logisticsAdvice = 'Standard mobile water bowser and onboard diesel fuel supply.';
  if (totalWaterLitres >= 5000) {
    logisticsAdvice = 'Requires dedicated daily bulk water tanker replenishment or connection to heavy site buffer reservoir.';
  }

  return (
    <div className="bg-[#121210] text-white p-8 sm:p-12 border border-[#2B2B24] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Calculator className="h-4 w-4" />
        <span>Remote Logistics Estimator // Water & Fuel Consumption</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-white mb-4">
        Water and Fuel Become Logistics Problems
      </h3>
      <p className="text-sm sm:text-base text-[#AAA] leading-relaxed max-w-3xl mb-8 font-normal">
        On remote drilling pads, pipeline spreads, and storage yards miles from mains infrastructure, calculate your total fluid requirements and payload impact.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Operating Flow Rate</span>
              <span className="font-mono text-[#FF6900] font-bold">{flowRate} Litres / Minute</span>
            </div>
            <input
              type="range"
              min="15"
              max="35"
              step="1"
              value={flowRate}
              onChange={(e) => setFlowRate(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Active Washing Hours per Day</span>
              <span className="font-mono text-[#FF6900] font-bold">{dailyHours} Hours / Day</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Duration on Remote Site</span>
              <span className="font-mono text-[#FF6900] font-bold">{siteDays} {siteDays === 1 ? 'Day' : 'Days'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={siteDays}
              onChange={(e) => setSiteDays(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Volume Box */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#AAA] block border-b border-white/10 pb-2">
            Project Fluid Requirements
          </span>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Total Water Mass</span>
              <span className="font-extralight text-3xl text-white font-mono">{totalWaterTonnes} T</span>
              <span className="text-[10px] text-[#777] block mt-0.5 font-mono">{totalWaterLitres.toLocaleString()} Litres</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Burner Fuel</span>
              <span className="font-extralight text-3xl text-[#FF6900] font-mono">~{estimatedFuelLitres} L</span>
              <span className="text-[10px] text-[#777] block mt-0.5 font-mono">Diesel (@ 7.5L/hr)</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <span className="text-[10px] uppercase tracking-wider text-[#FF6900] block mb-1">
              Field Storage Strategy:
            </span>
            <p className="text-xs text-[#CCC] leading-snug">
              {logisticsAdvice}
            </p>
          </div>

          <p className="text-[10px] text-[#777] italic leading-tight pt-1">
            *Illustrative calculation assuming continuous trigger pull. Actual field consumption depends on operator duty cycle and unloader bypass time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 02: OILFIELD SYSTEM SELECTOR ──────────────────────────────────────────── */
export function OilfieldSystemSelector() {
  const [applicationTarget, setApplicationTarget] = useState<'pipe' | 'mud' | 'valves' | 'plant'>('pipe');
  const [soilType, setSoilType] = useState<'crude' | 'paraffin' | 'mud'>('crude');
  const [mounting, setMounting] = useState<'trailer' | 'skid' | 'fixed'>('skid');
  const [operators, setOperators] = useState<'single' | 'dual'>('single');

  let recommendation = {
    title: 'Alkota 4305XD4 Extreme-Duty Hot Water Skid',
    tagline: 'High-Temperature Schedule 80 Heavy Hydrocarbon Rig',
    description: 'Delivers continuous 95°C water with high-pressure saturated steam capability (140°C), low-RPM ceramic plunger pump, and heavy continuous Schedule 80 coil for heavy crude, bitumen, and pipe dope.',
    primarySlug: 'alkota-4305xd4',
    categoryHref: '/machines/hot-water',
  };

  if (mounting === 'trailer') {
    recommendation = {
      title: 'Alkota Bespoke Remote Field Trailer Rig',
      tagline: 'Self-Contained Pipeline & Wellpad Platform',
      description: 'Integrates a heavy-duty diesel hot-water skid, 1,000L baffled water tank, engine drive, generator, and dual live heavy-duty hose reels for remote exploration and pipeline spreads.',
      primarySlug: 'alkota-trailer-single',
      categoryHref: '/trailers',
    };
  } else if (operators === 'dual') {
    recommendation = {
      title: 'Alkota High-Flow Multi-Operator Industrial Skid',
      tagline: 'High-Volume Dual-Lance Pipe Yard Platform',
      description: 'Delivers 30+ L/min at 90°C to power two simultaneous lances, speeding up drill string washdown, casing inspections, and mud tank turnarounds.',
      primarySlug: 'alkota-4305xd4',
      categoryHref: '/machines/hot-water',
    };
  } else if (soilType === 'paraffin') {
    recommendation = {
      title: 'Alkota Steam-Oil High-Temperature Steam Generator',
      tagline: '140°C Saturated Vapour Steam Platform',
      description: 'Engineered specifically for heavy paraffin wax, asphalt, and bitumen melting where dry thermal vapour reduces surface tension without excessive water volume.',
      primarySlug: 'alkota-steam-oil',
      categoryHref: '/machines/hot-water',
    };
  }

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] my-12 font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <SlidersHorizontal className="h-4 w-4" />
        <span>System Specification // Industrial Equipment Selector</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Specify the System Around the Contaminant
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Select your equipment type, primary hydrocarbon contamination, and field deployment environment.
      </p>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            01 / Target Equipment
          </span>
          <select
            value={applicationTarget}
            onChange={(e) => setApplicationTarget(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="pipe">Drill Pipe & Tubulars</option>
            <option value="mud">Mud Shakers & Tanks</option>
            <option value="valves">Wellhead Valves & BOPs</option>
            <option value="plant">Heavy Plant & Skids</option>
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
            <option value="crude">Heavy Crude & Bitumen</option>
            <option value="paraffin">Paraffin Wax & Pipe Dope</option>
            <option value="mud">Synthetic Drilling Mud</option>
          </select>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            03 / Mounting Format
          </span>
          <select
            value={mounting}
            onChange={(e) => setMounting(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="skid">Forklift / Crane Skid</option>
            <option value="trailer">Towable Remote Field Trailer</option>
            <option value="fixed">Fixed Workshop / Wash Bay</option>
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
      <div className="p-6 sm:p-8 bg-[#121210] text-white border border-[#2B2B24] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
            Recommended Industrial Architecture
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
          <span>Explore Equipment Configuration</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── 03: OILFIELD EDITORIAL FAQ ────────────────────────────────────────────── */
export function OilfieldEditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can pressure-washing equipment be used in classified hazardous areas?',
      a: 'Standard industrial pressure washers are NOT hazardous-area certified (e.g. ATEX Zone 0, 1, or 2) due to open electric motors, ignition systems, and diesel/oil combustion burners. Equipment must only be operated in non-classified safe zones or under strictly controlled site-specific Hot Work Permits issued by the responsible competent authority. Never operate standard machinery in potentially explosive atmospheres.',
    },
    {
      q: 'Why is hot water or steam necessary for oilfield cleaning?',
      a: 'Heavy crude oil, pipe dope, and paraffin waxes have high melting points and strong molecular surface adhesion. Cold water merely smears these viscous hydrocarbons into a wider oily film. Water heated to 85°C–95°C (or saturated steam at 140°C) liquefies the wax binders instantly, allowing high-pressure water flow to flush surfaces clean down to bare metal.',
    },
    {
      q: 'Can pressure washing remove synthetic drilling mud?',
      a: 'Yes, but drilling mud is not ordinary soil. It contains complex mixtures of barite weighting agents, bentonite clay, synthetic base oils, and polymers. Cleaning drilling mud requires a balanced combination of high water flow (18–25+ L/min) to carry heavy suspended solids, calibrated pressure, and hot water to break oil-wet polymer bonds.',
    },
    {
      q: 'What is a paraffin wax cleaning application?',
      a: 'Paraffin wax is a naturally occurring component of crude oil that precipitates and hardens inside production tubulars, valves, and manifold lines when temperature drops. Removing it requires thermal energy above the wax melting threshold (~65°C–80°C). Alkota hot-water and dry-steam units are specifically engineered to liquefy paraffin without relying on hazardous chlorinated solvents.',
    },
    {
      q: 'How much water does an oilfield pressure washer use on a remote site?',
      a: 'An industrial pressure washer operating at 21 L/min consumes approximately 1,260 litres of water per hour of continuous trigger time. Because remote pads rarely have mains water, operations typically deploy 1,000L to 3,000L baffled buffer bowsers to ensure reliable water supply.',
    },
    {
      q: 'Can an industrial pressure washer be trailer mounted for remote fields?',
      a: 'Yes. Alkota bespoke trailers integrate heavy-duty hot-water skids, rotationally moulded baffled water tanks (1,000L–1,500L), diesel engines/generators, and live heavy-duty hose reels. This creates a fully independent, mobile washdown station that travels across pipeline spreads and well sites.',
    },
    {
      q: 'What precautions are required when cleaning around electrical equipment on rigs?',
      a: 'High-pressure water jets should never be directed point-blank at electrical junction boxes, motor terminal enclosures, radar sensors, or emergency shut-down (ESD) panels. Even IP66/67 enclosures can suffer water ingress under 200+ BAR direct jets. Always follow OEM equipment guidelines and isolate power where required.',
    },
    {
      q: 'How should contaminated oilfield wash water be handled environmentally?',
      a: 'Wash water containing crude hydrocarbons, drilling polymers, or heavy degreasers must never be discharged into ground soil, local drainage channels, or surface waters. Operators must deploy vacuum recovery surface cleaners, impermeable drain bunds, and closed-loop oil-water separation systems to contain effluent for licensed waste transfer.',
    },
    {
      q: 'Why are Alkota Schedule 80 steel heating coils preferred in heavy industry?',
      a: 'Alkota Schedule 80 heating coils are manufactured from cold-rolled, heavy-wall ASTM A53 seamless steel pipe. Unlike thin-wall Schedule 40 or copper coils, Schedule 80 coils withstand extreme thermal cycling shock, hard well water scaling, and high operating pressures, backed by a 7-year guarantee.',
    },
    {
      q: 'Can two operators clean simultaneously from one oilfield skid?',
      a: 'Yes, provided the machine is engineered with a high-flow pump (30+ L/min), dual unloader manifold, and adequate thermal burner capacity. This allows two operators to work on opposite sides of a drill string or mud tank simultaneously, cutting turnaround time in half.',
    },
  ];

  return (
    <div className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <HelpCircle className="h-4 w-4" />
        <span>Industrial Technical Intelligence // Frequently Asked Questions</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-8">
        Oilfield Equipment FAQ
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
