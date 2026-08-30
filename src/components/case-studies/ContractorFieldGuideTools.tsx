'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Flame,
  Droplets,
  Truck,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';

/* ── 01: DOWNTIME EXPOSURE CALCULATOR ──────────────────────────────────────── */
export function ContractorDowntimeCalculator() {
  const [operators, setOperators] = useState(2);
  const [labourRate, setLabourRate] = useState(28); // £/hr
  const [billingRate, setBillingRate] = useState(95); // £/hr
  const [downtimeHours, setDowntimeHours] = useState(24); // hrs/year

  const idleLabourCost = operators * labourRate * downtimeHours;
  const lostBillingTurnover = billingRate * downtimeHours;
  const totalDowntimeExposure = idleLabourCost + lostBillingTurnover;

  return (
    <div className="bg-[#121212] text-white p-8 sm:p-12 border border-[#222] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Calculator className="h-4 w-4" />
        <span>Illustrative Commercial Model // Contractor Economics</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-white mb-4">
        What does downtime actually cost you?
      </h3>
      <p className="text-sm sm:text-base text-[#AAA] leading-relaxed max-w-3xl mb-8 font-normal">
        When a pressure washer fails during a booked commercial job, the financial impact extends far beyond the price of a replacement pump. Calculate your annual exposure from idle labour and lost billing capacity.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Interactive Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Crew Size (Operators on Shift)</span>
              <span className="font-mono text-[#FF6900] font-bold">{operators} {operators === 1 ? 'Person' : 'People'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={operators}
              onChange={(e) => setOperators(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Average Hourly Labour Cost per Operator</span>
              <span className="font-mono text-[#FF6900] font-bold">£{labourRate} / hr</span>
            </div>
            <input
              type="range"
              min="18"
              max="50"
              step="1"
              value={labourRate}
              onChange={(e) => setLabourRate(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Average Hourly Chargeable Client Rate</span>
              <span className="font-mono text-[#FF6900] font-bold">£{billingRate} / hr</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              step="5"
              value={billingRate}
              onChange={(e) => setBillingRate(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCC] mb-2">
              <span>Estimated Equipment Downtime per Year</span>
              <span className="font-mono text-[#FF6900] font-bold">{downtimeHours} Hours / Year</span>
            </div>
            <input
              type="range"
              min="4"
              max="100"
              step="2"
              value={downtimeHours}
              onChange={(e) => setDowntimeHours(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#222] h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Exposure Box */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#AAA] block border-b border-white/10 pb-2">
            Annual Financial Exposure
          </span>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#CCC]">
              <span>Idle Labour Exposure:</span>
              <span className="font-mono text-white font-medium">£{idleLabourCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#CCC]">
              <span>Lost Billing Capacity:</span>
              <span className="font-mono text-white font-medium">£{lostBillingTurnover.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <span className="text-[11px] uppercase tracking-wider text-[#FF6900] block mb-1">
              Total Estimated Downtime Risk
            </span>
            <span className="font-extralight text-4xl sm:text-5xl text-white block font-mono">
              £{totalDowntimeExposure.toLocaleString()}
            </span>
          </div>

          <p className="text-[10px] text-[#777] italic leading-tight pt-2">
            *Illustrative commercial model. Real contractor uptime depends on planned maintenance intervals and build metallurgy.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 02: CONTRACTOR SYSTEM SELECTOR ────────────────────────────────────────── */
export function ContractorSystemSelector() {
  const [cleaningTarget, setCleaningTarget] = useState<'general' | 'grease' | 'plant' | 'flat'>('flat');
  const [dutyFrequency, setDutyFrequency] = useState<'daily' | 'occasional'>('daily');
  const [mobility, setMobility] = useState<'trailer' | 'van' | 'static'>('trailer');
  const [operators, setOperators] = useState<'single' | 'dual'>('single');

  // Logic to determine recommendation
  let systemRecommendation = {
    title: 'Alkota Towable Hot-Water Trailer System',
    tagline: 'Turnkey Mobile Platform with Onboard Water & Live Reels',
    description: 'Designed for commercial contractors tackling expansive paving, plant yards, and chewing gum. Integrates baffled water storage with industrial hot-water power.',
    primarySlug: 'alkota-trailer-single',
    categoryHref: '/trailers',
  };

  if (cleaningTarget === 'grease' || cleaningTarget === 'plant') {
    if (operators === 'dual') {
      systemRecommendation = {
        title: 'Alkota High-Flow Dual-Lance Hot-Water Rig',
        tagline: 'High-Volume Thermal Degreasing Platform',
        description: 'Delivers 30+ L/min at 90°C to power two simultaneous lances or heavy rotary surface cleaners across fleet depots and industrial manufacturing footprints.',
        primarySlug: 'alkota-4305xd4',
        categoryHref: '/machines/hot-water',
      };
    } else {
      systemRecommendation = {
        title: 'Alkota 4305XD4 Heavy-Duty Hot Water Skid',
        tagline: 'Schedule 80 Industrial Degreasing System',
        description: 'Features low-RPM ceramic plunger pump, continuous Schedule 80 heating coil, and high-temperature thermal power to melt hydrocarbons effortlessly.',
        primarySlug: 'alkota-4305xd4',
        categoryHref: '/machines/hot-water',
      };
    }
  } else if (mobility === 'van') {
    systemRecommendation = {
      title: 'Alkota Compact Van-Mount Hot-Water Unit',
      tagline: 'Self-Contained Commercial Van Installation',
      description: 'Compact frame engineered for van payloads with front-accessible service points, external unloader, and high thermal efficiency.',
      primarySlug: 'alkota-420x4',
      categoryHref: '/machines/hot-water',
    };
  } else if (cleaningTarget === 'general' && dutyFrequency === 'occasional') {
    systemRecommendation = {
      title: 'Alkota Industrial Cold Water Wash Skid',
      tagline: 'High-Flow Hydraulic Rinsing & Mud Displacement',
      description: 'Focuses 100% of input horsepower into flow rate and hydraulic shear for mud and aggregate rinsing without burner fuel consumption.',
      primarySlug: 'alkota-420x4',
      categoryHref: '/machines/cold-water',
    };
  }

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] my-12 font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <SlidersHorizontal className="h-4 w-4" />
        <span>Interactive Specification // Contractor System Selector</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Specify the System Around Your Work
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Answer four basic operational questions to determine the optimal configuration for your commercial cleaning workflow.
      </p>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Q1: Target */}
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            01 / Primary Surface & Soil
          </span>
          <select
            value={cleaningTarget}
            onChange={(e) => setCleaningTarget(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="flat">Commercial Paving & Hardstanding</option>
            <option value="grease">Heavy Grease & Forecourts</option>
            <option value="plant">Heavy Plant & Mobile Fleets</option>
            <option value="general">General Mud & Rinse Washing</option>
          </select>
        </div>

        {/* Q2: Frequency */}
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            02 / Operating Duty
          </span>
          <select
            value={dutyFrequency}
            onChange={(e) => setDutyFrequency(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="daily">Daily Commercial Shifts (6–8 hrs)</option>
            <option value="occasional">Intermittent / Weekly Use</option>
          </select>
        </div>

        {/* Q3: Mobility */}
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            03 / Vehicle / Mounting
          </span>
          <select
            value={mobility}
            onChange={(e) => setMobility(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="trailer">Dedicated Towable Trailer</option>
            <option value="van">Commercial Van-Mounted Skid</option>
            <option value="static">Fixed Washroom / Workshop</option>
          </select>
        </div>

        {/* Q4: Operators */}
        <div className="p-4 bg-[#F8F7F4] border border-[#E8E8E4]">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block mb-2">
            04 / Simultaneous Users
          </span>
          <select
            value={operators}
            onChange={(e) => setOperators(e.target.value as any)}
            className="w-full bg-white border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
          >
            <option value="single">Single Lance Operator</option>
            <option value="dual">Dual Simultaneous Operators</option>
          </select>
        </div>
      </div>

      {/* Recommended Configuration Box */}
      <div className="p-6 sm:p-8 bg-[#121212] text-white border border-[#222] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
            Recommended Equipment Architecture
          </span>
          <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
            {systemRecommendation.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#CCC] max-w-2xl font-normal leading-relaxed">
            {systemRecommendation.description}
          </p>
        </div>

        <Link
          href={systemRecommendation.categoryHref}
          className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shrink-0 shadow-lg"
        >
          <span>Explore Recommended Configuration</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── 03: 12-POINT BUYING CHECKLIST ─────────────────────────────────────────── */
export function ContractorBuyingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const questions = [
    { id: 1, text: 'What substrate and contamination am I actually cleaning?' },
    { id: 2, text: 'Is the soil petroleum, animal fat, or grease requiring hot water (>80°C)?' },
    { id: 3, text: 'How many continuous hours per shift will the machine run?' },
    { id: 4, text: 'What is the available water supply flow (L/min) on typical customer sites?' },
    { id: 5, text: 'Do I need onboard baffled water storage (e.g. 500L–1,500L)?' },
    { id: 6, text: 'How far will operators work from the rig (requiring 30m–60m hose reels)?' },
    { id: 7, text: 'Do I need single-lance or dual-simultaneous operator capability?' },
    { id: 8, text: 'How will the machine be transported (van payload vs dedicated towable trailer)?' },
    { id: 9, text: 'What power or fuel source is available on remote client sites?' },
    { id: 10, text: 'How will wastewater and trade effluent be recovered and contained?' },
    { id: 11, text: 'Can routine wear items (valves, packings, fuel filters) be serviced in the field?' },
    { id: 12, text: 'Can I obtain genuine replacement parts with next-day UK dispatch?' },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] my-12 font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <CheckCircle2 className="h-4 w-4" />
        <span>Procurement Checklist // Professional Specifications</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Before you buy, ask these 12 questions.
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Review these twelve operational criteria before investing in commercial cleaning machinery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {questions.map((q) => (
          <div
            key={q.id}
            onClick={() => toggleCheck(q.id)}
            className={`p-4 border transition-all cursor-pointer flex items-start gap-3 ${
              checkedItems[q.id]
                ? 'bg-[#F8F7F4] border-[#FF6900]'
                : 'bg-white border-[#E8E8E4] hover:border-[#BBB]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                checkedItems[q.id]
                  ? 'bg-[#FF6900] border-[#FF6900] text-white'
                  : 'border-[#CCC] bg-white'
              }`}
            >
              {checkedItems[q.id] && <CheckCircle2 className="h-3.5 w-3.5" />}
            </div>
            <span className="text-xs sm:text-sm text-alkota-black font-normal leading-snug">
              <strong>{q.id < 10 ? `0${q.id}` : q.id}.</strong> {q.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 04: CONTRACTOR EDITORIAL FAQ ─────────────────────────────────────────── */
export function ContractorEditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do professional cleaners need a hot-water pressure washer?',
      a: 'If your work involves petroleum oils, vehicle traffic film, heavy grease, animal fats, or chewing gum, hot water is essential. Heat above 80°C liquefies hydrocarbons into water-soluble emulsions instantly, drastically reducing scrubbing time and chemical consumption. For pure mud, clay, and loose aggregate washdowns, a high-flow industrial cold-water washer is completely adequate.',
    },
    {
      q: 'What PSI does a professional pressure washer need?',
      a: 'Most professional contractors operate between 180 and 250 BAR (2,600 to 3,600 PSI). Excessive pressure above 250 BAR risks etching porous concrete, blowing out mortar joins, and stripping protective coatings. Cleaning productivity is governed by balancing pressure with high water flow (15 to 21+ L/min) and thermal heat.',
    },
    {
      q: 'Is flow rate more important than pressure?',
      a: 'In commercial exterior cleaning, flow rate (Litres per Minute) is frequently more important than extreme PSI. Pressure provides the initial shear force to break dirt free from the substrate, but high flow volume is what carries suspended solids and heavy slurry away from the surface into drains. Without sufficient flow, loosened dirt simply resettles.',
    },
    {
      q: 'How long can an industrial pressure washer run continuously?',
      a: 'Alkota industrial pressure washers are built for 100% continuous duty cycles. Equipped with low-RPM (1,450 RPM) ceramic plunger pumps and heavy-gauge Schedule 80 steel heating coils, they can run for full 8-to-10 hour contractor shifts without thermal cutout or pump packing overheating.',
    },
    {
      q: 'Should a cleaning contractor use a van-mounted or trailer pressure washer?',
      a: 'Van-mounted systems offer excellent security, weather protection, and urban manoeuvrability. However, water weight (1,000L = 1 tonne) heavily consumes van payload. Dedicated towable trailers allow contractors to carry 1,000L–1,500L of water, multiple live hose reels, and high-output hot-water skids without overloading the towing vehicle or tying up the van.',
    },
    {
      q: 'How large a water tank does a mobile pressure-washing business need?',
      a: 'For mobile contractors running a 15–18 L/min machine, a 500L to 1,000L rotationally-moulded baffled water tank acts as an essential buffer reservoir. If customer mains supply delivers only 10 L/min, the buffer tank prevents pump cavitation and allows continuous trigger operation for 40 to 60 minutes between refills.',
    },
    {
      q: 'Can two operators run from one pressure washer?',
      a: 'Yes, provided the machine is specifically engineered for multi-operator volume (typically 30+ L/min) with a dual-unloader manifold and adequate thermal burner wattage. Alkota builds high-flow skids and bespoke trailers engineered to support dual simultaneous lances or a rotary surface cleaner and detail lance together.',
    },
    {
      q: 'Why are industrial pressure washers more expensive than commercial washers?',
      a: 'Industrial machines use ASTM A53 Schedule 80 continuous seamless steel coils (versus thin Schedule 40 or copper coils), low-speed ceramic triplex plunger pumps (1,450 RPM vs 2,800+ RPM direct drive), open heavy-gauge steel chassis, and industrial burner assemblies. They are engineered to be rebuilt and serviced over 10+ years rather than discarded after 300 operating hours.',
    },
    {
      q: 'Can industrial pressure washers be repaired in the field?',
      a: 'Yes. Alkota machines eliminate fragile electronic printed circuit boards in favour of rugged electro-mechanical relays, external unloader valves, and standard BSP fittings. Seals, packings, fuel filters, and burner nozzles can be inspected and replaced with standard hand tools.',
    },
    {
      q: 'What accessories should a commercial pressure-washing contractor carry?',
      a: 'A professional contractor kit should include: stainless steel rotary flat surface cleaner (18"–24"), 30m–60m non-marking high-pressure hose on a live reel, insulated dual lances for pressure/chemical switching, turbo rotary nozzles for tough hard-surface grime, a chemical foam applicator, and a portable drain seal or vacuum recovery shroud.',
    },
  ];

  return (
    <div className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <HelpCircle className="h-4 w-4" />
        <span>Expert Knowledge // Contractor Frequently Asked Questions</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-8">
        Contractor Equipment FAQ
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
