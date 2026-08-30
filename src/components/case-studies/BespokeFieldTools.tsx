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
  Layers,
  Compass,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';

/* ── 01: INTERACTIVE SYSTEM ANATOMY HOTSPOT INSPECTOR ─────────────────────── */
export function BespokeSystemAnatomy() {
  const [activeComponent, setActiveComponent] = useState<'chassis' | 'tank' | 'skid' | 'coil' | 'reels' | 'recovery'>('skid');

  const components = {
    chassis: {
      title: '01 / Road-Legal Galvanised Chassis',
      tagline: 'Structural Foundation & Axle Load Distribution',
      why: 'Carrying 1–2 tonnes of water and machinery at 60 mph requires torsional rigidity, low centre of gravity, and type-approved overrun braking.',
      does: 'Features AL-KO / Knott rubber-torsion axles, laser-cut subframes, integrated tie-down points, and full UK IVA road-legal homologation.',
      considered: 'Tongue weight (nose weight) must remain strictly within 75kg–120kg under both full and empty tank conditions.',
    },
    tank: {
      title: '02 / Baffled Poly Water Storage',
      tagline: 'Dynamic Surge Control & Mass Management',
      why: 'Free-surface liquid surge during braking or cornering can de-stabilise towing vehicles catastrophically.',
      does: 'Rotationally moulded heavy-wall UV-stabilised polyethylene tank with internal fluid baffles, anti-vortex sump, and low-level engine shutoff.',
      considered: '1,000 litres of water weighs exactly 1,000 kg. Sizing must be matched to operator duration and vehicle towing limits.',
    },
    skid: {
      title: '03 / Alkota Industrial Pressure Washer Skid',
      tagline: 'High-Output Hydraulic & Thermal Powerhouse',
      why: 'Contractors and heavy industry require continuous 100% duty cycle washing without thermal degradation.',
      does: 'Industrial diesel or petrol-driven triplex ceramic plunger pump delivering 150–350 BAR and 15–35+ L/min with vibration isolation mounts.',
      considered: '1,450 RPM slow-running pumps run cooler, pull water smoother, and last up to 5x longer than direct-drive 3,400 RPM consumer pumps.',
    },
    coil: {
      title: '04 / Schedule 80 ASTM A53 Heating Coil',
      tagline: 'Continuous 90°C Thermal Energy Generator',
      why: 'Heavy grease, wax, and bitumen require continuous 85°C–95°C water to break molecular surface tension.',
      does: 'Heavy-wall seamless cold-rolled steel pipe wound with precision air gaps, enclosed in stainless steel wraps with 12V / 240V high-efficiency diesel burners.',
      considered: 'Thermal expansion shock resistance backed by Alkota UK’s 7-year pro-rated coil guarantee.',
    },
    reels: {
      title: '05 / Live Stainless Steel Hose Reels',
      tagline: 'Deployment Ergonomics & Hose Protection',
      why: 'Dragging loose hoses across sharp curbs and oily yards causes premature burst failure and trip hazards.',
      does: 'Direct-plumbed live fluid swivels carrying 30m–60m high-pressure wash hose, inlet supply hose, and chemical feed with anti-snag roller guides.',
      considered: 'Reel mounting height and operator pull angles must match human ergonomic comfort to reduce lower-back strain.',
    },
    recovery: {
      title: '06 / Closed-Loop Vacuum Recovery System',
      tagline: 'Trade Effluent Containment & Environmental Compliance',
      why: 'Discharging dirty wash water containing oils, detergents, or heavy solids into stormwater drains violates UK environmental law.',
      does: 'Perimeter vacuum recovery shrouds connected to high-suction extraction motors, capturing 95%+ of surface runoff into onboard holding tanks.',
      considered: 'Multi-stage coalescing filtration allows wastewater recycling for initial rough washing or legal off-site disposal.',
    },
  };

  const selected = components[activeComponent];

  return (
    <div className="bg-[#0D0D0B] text-white p-8 sm:p-14 border border-[#222] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Compass className="h-4 w-4" />
        <span>Engineering Drawing // System Anatomy</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-white mb-4">
        The Pressure Washer is Only One Component
      </h3>
      <p className="text-sm sm:text-base text-[#AAA] leading-relaxed max-w-3xl mb-8 font-normal">
        Click a subsystem hotspot below to inspect why each element is engineered and how it integrates into the complete mobile wash platform.
      </p>

      {/* Hotspots Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {(Object.keys(components) as Array<keyof typeof components>).map((key) => {
          const isActive = activeComponent === key;
          return (
            <button
              key={key}
              onClick={() => setActiveComponent(key)}
              className={`p-3 text-left border transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-[#181816] text-[#CCC] border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`text-[10px] block uppercase font-mono mb-0.5 ${isActive ? 'text-[#FF6900]' : 'text-[#888]'}`}>
                Subsystem
              </span>
              <span className="text-xs uppercase tracking-tight block truncate font-medium">
                {components[key].title.split(' / ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inspector Detail Box */}
      <div className="bg-[#161614] border border-white/15 p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white">
            {selected.title}
          </h4>
          <span className="text-xs font-mono uppercase text-[#FF6900] tracking-wider">
            {selected.tagline}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 bg-black/40 border border-white/10">
            <strong className="text-white block uppercase font-mono text-xs mb-1.5 text-[#FF6900]">
              01 / Why It Exists
            </strong>
            <p className="text-[#CCC] leading-relaxed font-normal">
              {selected.why}
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-white/10">
            <strong className="text-white block uppercase font-mono text-xs mb-1.5 text-[#FF6900]">
              02 / What It Does
            </strong>
            <p className="text-[#CCC] leading-relaxed font-normal">
              {selected.does}
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 border-l-2 border-l-[#FF6900]">
            <strong className="text-white block uppercase font-mono text-xs mb-1.5 text-[#FF6900]">
              03 / Engineering Consideration
            </strong>
            <p className="text-[#CCC] leading-relaxed font-normal">
              {selected.considered}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 02: TRAILER PAYLOAD & WATER MASS DYNAMIC ESTIMATOR ───────────────────── */
export function BespokeTrailerPayloadCalculator() {
  const [tankSize, setTankSize] = useState<number>(1000); // Litres
  const [skidType, setSkidType] = useState<'single-hot' | 'dual-hot' | 'cold-highflow'>('single-hot');
  const [reelCount, setReelCount] = useState<number>(2);
  const [includeRecovery, setIncludeRecovery] = useState<boolean>(false);

  // Approximate tare masses (kg)
  const baseTrailerTare = tankSize > 1000 ? 550 : 380;
  const waterMassKg = tankSize;
  const tankTareKg = tankSize * 0.08; // Poly tank dry tare
  const skidMassKg = skidType === 'dual-hot' ? 420 : skidType === 'single-hot' ? 310 : 210;
  const reelsMassKg = reelCount * 35; // 35kg per stainless reel with 50m 2-wire hose
  const recoveryMassKg = includeRecovery ? 160 : 0;
  const toolsAndChemicalsKg = 90;

  const totalGrossWeightKg = Math.round(
    baseTrailerTare + waterMassKg + tankTareKg + skidMassKg + reelsMassKg + recoveryMassKg + toolsAndChemicalsKg
  );

  let chassisRecommendation = 'Single-Axle Type-Approved Chassis (1,800kg Max Gross Weight)';
  let licenceAdvice = 'Requires standard category B licence if combined vehicle + trailer is under 3.5T, otherwise category B+E.';
  if (totalGrossWeightKg > 1750) {
    chassisRecommendation = 'Tandem-Axle Heavy-Duty Chassis (2,700kg – 3,500kg Gross Weight)';
    licenceAdvice = 'Requires towing vehicle with 2.8T–3.5T towing capacity and category B+E driving entitlement.';
  }

  return (
    <div className="bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal my-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <Calculator className="h-4 w-4" />
        <span>Payload Engineering // Mass & Axle Estimator</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
        Water is Part of the Payload
      </h3>
      <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-3xl mb-8">
        Calculate your trailer’s gross operating weight (wet) and determine the recommended chassis axle rating.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-alkota-black mb-2">
              <span>Baffled Water Tank Capacity</span>
              <span className="font-mono text-[#FF6900] font-bold">{tankSize} Litres ({tankSize} kg Water)</span>
            </div>
            <input
              type="range"
              min="500"
              max="2000"
              step="250"
              value={tankSize}
              onChange={(e) => setTankSize(Number(e.target.value))}
              className="w-full accent-[#FF6900] bg-[#EFEFEA] h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#777] mt-1 font-mono">
              <span>500L (Compact)</span>
              <span>1,000L (Standard)</span>
              <span>2,000L (High Capacity)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-alkota-black block mb-1.5 font-medium">Pressure Washer Platform</span>
              <select
                value={skidType}
                onChange={(e) => setSkidType(e.target.value as any)}
                className="w-full bg-[#F8F7F4] border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
              >
                <option value="single-hot">Single Hot-Water Diesel Skid (~310 kg)</option>
                <option value="dual-hot">Twin-Operator Hot-Water Skid (~420 kg)</option>
                <option value="cold-highflow">High-Flow Cold-Water Skid (~210 kg)</option>
              </select>
            </div>

            <div>
              <span className="text-xs text-alkota-black block mb-1.5 font-medium">Live Stainless Hose Reels</span>
              <select
                value={reelCount}
                onChange={(e) => setReelCount(Number(e.target.value))}
                className="w-full bg-[#F8F7F4] border border-[#DDD] p-2.5 text-xs text-alkota-black focus:outline-none focus:border-[#FF6900]"
              >
                <option value="1">1 Reel (High Pressure 50m)</option>
                <option value="2">2 Reels (Wash + Water Supply)</option>
                <option value="3">3 Reels (Wash + Supply + Recovery)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-[#F8F7F4] border border-[#E8E8E4] flex items-center justify-between">
            <span className="text-xs text-alkota-black">Include Closed-Loop Vacuum Recovery Unit (+160 kg)</span>
            <input
              type="checkbox"
              checked={includeRecovery}
              onChange={(e) => setIncludeRecovery(e.target.checked)}
              className="h-4 w-4 accent-[#FF6900] cursor-pointer"
            />
          </div>
        </div>

        {/* Output Weight Box */}
        <div className="lg:col-span-5 bg-[#0D0D0B] text-white p-6 sm:p-8 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#AAA] block border-b border-white/10 pb-2">
            Calculated Operating Mass (Wet)
          </span>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Total Gross Mass</span>
              <span className="font-extralight text-3xl text-white font-mono">~{totalGrossWeightKg.toLocaleString()} kg</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#AAA] block">Water Payload</span>
              <span className="font-extralight text-3xl text-[#FF6900] font-mono">{(waterMassKg / 1000).toFixed(2)} T</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#FF6900] block">Chassis Recommendation:</span>
              <p className="text-xs text-[#CCC] font-medium leading-tight">{chassisRecommendation}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#AAA] block">Licensing Note:</span>
              <p className="text-[11px] text-[#999] leading-tight">{licenceAdvice}</p>
            </div>
          </div>

          <p className="text-[10px] text-[#666] italic leading-tight pt-1">
            *Illustrative engineering weight estimation. Actual payload verified via calibrated axle scales on completion.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 03: BESPOKE TRAILER EDITORIAL FAQ ─────────────────────────────────────── */
export function BespokeTrailerEditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can Alkota UK build a bespoke pressure washer trailer for my specific application?',
      a: 'Yes. Alkota UK designs, fabricates, and homologates complete turnkey mobile wash systems. We engineer the platform around your exact water capacity, pressure, flow rate, temperature, power generation, hose reel positions, and recovery requirements rather than selling standard pre-boxed trailers.',
    },
    {
      q: 'What equipment can be integrated into a bespoke pressure washing trailer?',
      a: 'A build can integrate: single or twin hot/cold pressure washing skids, rotationally moulded baffled water tanks (500L–2,000L), Kubota/Honda engines, auxiliary generators, 12V/240V diesel burners, live stainless steel hose reels, vacuum wastewater recovery units, chemical dosing injectors, lockable tool vaults, and perimeter LED work lighting.',
    },
    {
      q: 'How much water can a mobile trailer legally carry on UK roads?',
      a: 'Water capacity is limited by chassis gross vehicle weight rating (GVWR) and towing vehicle capacities. A single-axle 1,800kg trailer can comfortably carry a 500L–800L tank plus machinery. Larger tandem-axle 2,700kg–3,500kg trailers can carry 1,000L to 1,500L+ of water with dual machines while remaining fully road-legal.',
    },
    {
      q: 'Why are baffled water tanks essential for mobile pressure washing?',
      a: 'Unbaffled water tanks allow water to surge back and forth during braking, acceleration, and cornering, creating severe dynamic weight transfer that can jackknife towing vehicles. Alkota installs internal fluid-baffled tanks with low centres of gravity to ensure stable on-road handling at motorway speeds.',
    },
    {
      q: 'Can a trailer pressure washer support two operators simultaneously?',
      a: 'Yes. We engineer twin-operator trailers featuring high-flow pumps (30+ L/min) or two independent hot-water skids, dual unloader manifolds, and twin live hose reels. This allows two operators to work independently on opposite sides of a fleet or pavement without pressure drops.',
    },
    {
      q: 'Can an auxiliary generator or onboard engine power be included?',
      a: 'Yes. We integrate industrial diesel or petrol engines (e.g. Kubota, Vanguard, Honda) equipped with high-output alternators, electric starts, and auxiliary 240V/110V generators to power vacuum recovery units, chemical transfer pumps, and jobsite floodlights.',
    },
    {
      q: 'Can closed-loop wastewater recovery be incorporated into a trailer?',
      a: 'Yes. Alkota integrates high-suction vacuum extraction units and perimeter recovery surface cleaners that extract 95%+ of wash water directly into an onboard holding tank or multi-stage filtration system, satisfying Environment Agency regulations in urban and highway environments.',
    },
    {
      q: 'Are Alkota bespoke trailers road-legal in the UK?',
      a: 'Yes. Every Alkota mobile trailer is built on an AL-KO or Knott type-approved chassis with full Individual Vehicle Approval (IVA) or European Community Whole Vehicle Type Approval (ECWVTA) certification, fully compliant with DVSA road regulations.',
    },
    {
      q: 'How does Alkota UK approach serviceability on bespoke trailers?',
      a: 'We design every trailer with technician accessibility in mind: lockable gullwing doors, slide-out pump trays, easy-drain oil manifolds, accessible burner photocells, and external filter bowls so routine servicing takes minutes without stripping the trailer.',
    },
    {
      q: 'How long does a bespoke trailer build take from sign-off?',
      a: 'Build timescales depend on project complexity, component availability, custom chassis fabrication, and IVA test scheduling. Typically, bespoke builds progress from signed CAD specification to workshop testing and handover within 4 to 8 weeks.',
    },
  ];

  return (
    <div className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-mono">
        <HelpCircle className="h-4 w-4" />
        <span>Engineering Intelligence // Frequently Asked Questions</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-8">
        Bespoke Trailer Engineering FAQ
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
