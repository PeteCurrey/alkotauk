'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Truck, Droplets, Zap,
  Settings, Palette, User, ClipboardList, ChevronDown, ChevronUp,
  AlertTriangle, Info, Shield, Recycle, Package
} from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface BuildState {
  chassis: string;
  machine: string;
  tankSize: string;
  dualTank: boolean;
  autoFill: boolean;
  lowWaterShutoff: boolean;
  burnerFuel: string;
  fuelTankSize: string;
  generator: string;
  addOns: string[];
  bodyColour: string;
  customColour: string;
  jockeyWheel: boolean;
  mudguards: boolean;
  name: string;
  company: string;
  email: string;
  phone: string;
  siteName: string;
  notes: string;
  marketingConsent: boolean;
}

const defaultBuild: BuildState = {
  chassis: '',
  machine: '',
  tankSize: '',
  dualTank: false,
  autoFill: false,
  lowWaterShutoff: false,
  burnerFuel: 'diesel',
  fuelTankSize: '80',
  generator: 'none',
  addOns: [],
  bodyColour: '',
  customColour: '',
  jockeyWheel: true,
  mudguards: true,
  name: '',
  company: '',
  email: '',
  phone: '',
  siteName: '',
  notes: '',
  marketingConsent: false,
};

const STEPS = [
  { id: 1, label: 'Chassis', icon: Truck },
  { id: 2, label: 'Machine', icon: Settings },
  { id: 3, label: 'Water', icon: Droplets },
  { id: 4, label: 'Power', icon: Zap },
  { id: 5, label: 'Add-Ons', icon: Package },
  { id: 6, label: 'Bodywork', icon: Palette },
  { id: 7, label: 'Your Details', icon: User },
];

// ─── DATA ────────────────────────────────────────────────────────────────────

const CHASSIS_OPTIONS = [
  {
    value: 'single-compact',
    label: 'Single Axle — Compact',
    subtitle: 'Nimble, lightweight, easy to tow',
    specs: ['Up to 200 gal water capacity', 'GVW up to 3,500 lbs', 'Standard ball hitch'],
    bestFor: 'Agricultural, smallholding, contract cleaning (single operator)',
    maxTank: 200,
  },
  {
    value: 'single-extended',
    label: 'Single Axle — Extended',
    subtitle: 'More capacity, same manoeuvrability',
    specs: ['Up to 230 gal water capacity', 'Longer deck for equipment layout'],
    bestFor: 'Rural site, light fleet, contract operators with single machine',
    maxTank: 230,
  },
  {
    value: 'tandem-standard',
    label: 'Tandem Axle — Standard',
    subtitle: 'The workhorse. Built for daily serious use.',
    specs: ['Up to 330 gal water capacity', 'GVW 7,000 lbs', 'Electric brakes both axles', '168" × 72" deck'],
    bestFor: 'Fleet depots, large agricultural, multi-day site contracts',
    maxTank: 330,
  },
  {
    value: 'tandem-heavy',
    label: 'Tandem Axle — Heavy',
    subtitle: 'Maximum capacity. Full working platform.',
    specs: ['Up to 460 gal water capacity', 'Dual tank option', 'Full equipment deck'],
    bestFor: 'Industrial contract cleaning, municipal operations, closed-loop systems, multi-machine builds',
    maxTank: 460,
  },
];

const MACHINE_OPTIONS = [
  { value: 'hot-x4', label: 'Hot Water — Standard', machine: 'Alkota X4 Series (e.g. 420X4)', specs: ['4 GPM', '275 bar', 'Belt drive', 'Triplex pump', '7yr coil warranty'], bestFor: 'General agricultural, fleet, livestock, contract cleaning', type: 'hot', tandemHeavyOnly: false },
  { value: 'hot-high-flow', label: 'Hot Water — High Flow', machine: 'Alkota X4 Series (e.g. 520X4/530X4)', specs: ['5+ GPM', '275+ bar', 'Belt drive', 'Higher volume'], bestFor: 'Large fleet, bulk wash-down, agricultural co-ops', type: 'hot', tandemHeavyOnly: false },
  { value: 'hot-diesel-skid', label: 'Hot Water — Diesel Engine Skid', machine: 'Alkota Diesel Skid (e.g. 8307)', specs: ['Kohler diesel engine', '2kW generator', 'Hot water', 'No external power required'], bestFor: 'Remote sites with no power supply', type: 'hot', tandemHeavyOnly: false },
  { value: 'hot-gas-skid', label: 'Hot Water — Gas Engine Skid', machine: 'Alkota Gas Engine Skid (5405)', specs: ['5 GPM', '275 bar', 'Belt drive', '3kW on-board generator'], bestFor: 'Self-contained petrol/gas operation', type: 'hot', tandemHeavyOnly: false },
  { value: 'cold-bd', label: 'Cold Water', machine: 'Alkota BD Series', specs: ['Up to 5 GPM', 'Up to 207 bar', 'Electric or petrol options'], bestFor: 'Mud, soil, general dirt removal — lower operating cost', type: 'cold', tandemHeavyOnly: false },
  { value: 'dual-machine', label: 'Dual Machine Configuration', machine: 'Two Alkota skid units', specs: ['2 simultaneous operators', 'Automatic clutch & bypass', 'Load-matched pressure'], bestFor: 'Large agricultural contractors, multi-crew operations', type: 'hot', tandemHeavyOnly: true },
];

const TANK_OPTIONS = [
  { value: '200', label: '200 gallons', litres: '(909 litres)', runtime: '~40 min at 4 GPM', desc: 'Compact site visits, regular refill access available', maxChassis: ['single-compact', 'single-extended', 'tandem-standard', 'tandem-heavy'] },
  { value: '230', label: '230 gallons', litres: '(1,045 litres)', runtime: '~48 min at 4 GPM', desc: 'Agricultural sites with on-farm supply', maxChassis: ['single-extended', 'tandem-standard', 'tandem-heavy'] },
  { value: '330', label: '330 gallons', litres: '(1,500 litres)', runtime: '~69 min at 4 GPM', desc: 'Fleet depots and contractor day runs', maxChassis: ['tandem-standard', 'tandem-heavy'] },
  { value: '460', label: '460 gallons', litres: '(2,091 litres)', runtime: '~96 min at 4 GPM', desc: 'Maximum on-board autonomy. Industrial and municipal.', maxChassis: ['tandem-heavy'] },
];

const ADDON_GROUPS = [
  {
    category: 'Hose & Reel',
    icon: Settings,
    items: [
      { value: 'hose-50', label: 'HP hose reel — 50 ft' },
      { value: 'hose-100', label: 'HP hose reel — 100 ft' },
      { value: 'hose-second', label: 'Second hose reel (dual operator)' },
      { value: 'fill-hose', label: 'Fill hose reel (tank refill at distance)' },
      { value: 'side-mount', label: 'Alternative reel position (end/side-mount — requires consultation)' },
    ],
  },
  {
    category: 'Chemical & Dosing',
    icon: Droplets,
    items: [
      { value: 'chem-rack', label: 'Chemical rack (5–25 L containers)' },
      { value: 'chem-tank', label: 'Dedicated on-board chemical tank' },
      { value: 'sand-hopper', label: 'Sand hopper (drain jetting & surface prep)' },
      { value: 'ball-valve', label: '3-way ball valve manifold' },
    ],
  },
  {
    category: 'Environmental & Compliance',
    icon: Recycle,
    items: [
      { value: 'vsf1', label: 'VSF-1 Vacuum Filtration System (wastewater recovery)' },
      { value: 'filtration', label: 'Three-stage water filtration for recovered water reuse' },
      { value: 'vacuum-hose', label: '50 ft vacuum recovery hose & reel' },
      { value: 'oil-sep', label: 'Oil/water separator (fleet wash bay compliance)' },
      { value: 'air-gap', label: 'Hydrant air gap fill (Water Regulations compliance)' },
    ],
  },
  {
    category: 'Safety & Utility',
    icon: Shield,
    items: [
      { value: 'clutch', label: 'Automatic clutch & bypass system' },
      { value: 'surge-brakes', label: 'Surge brakes' },
      { value: 'antifreeze', label: 'Antifreeze kit (winterising — recommended for UK outdoor storage)' },
      { value: 'amber-light', label: 'Rotating amber hazard light' },
      { value: 'spare-tyre', label: 'Spare tyre and mount' },
      { value: 'tool-box', label: 'Lockable tool storage box (underframe or end-panel)' },
      { value: 'ladder-rack', label: 'Ladder rack' },
    ],
  },
];

const BODY_COLOURS = [
  { value: 'alkota-orange', label: 'Alkota Orange', hex: '#F26522' },
  { value: 'black', label: 'Gloss Black', hex: '#1a1a1a' },
  { value: 'silver', label: 'Silver Grey', hex: '#9CA3AF' },
  { value: 'yellow', label: 'Plant Yellow', hex: '#EAB308' },
  { value: 'white', label: 'White', hex: '#F5F5F5' },
  { value: 'dark-green', label: 'Dark Green', hex: '#166534' },
  { value: 'custom', label: 'Custom RAL / Fleet Colour', hex: '' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'ALK-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function summariseBuild(b: BuildState): string[] {
  const lines: string[] = [];
  if (b.chassis) lines.push(`Chassis: ${CHASSIS_OPTIONS.find(c => c.value === b.chassis)?.label ?? b.chassis}`);
  if (b.machine) lines.push(`Machine: ${MACHINE_OPTIONS.find(m => m.value === b.machine)?.label ?? b.machine}`);
  if (b.tankSize) lines.push(`Tank: ${b.tankSize} gallons${b.dualTank ? ' (dual)' : ''}`);
  if (b.autoFill) lines.push('Auto-fill float valve');
  if (b.lowWaterShutoff) lines.push('Low water shutoff');
  if (b.burnerFuel && b.machine && !b.machine.includes('cold')) lines.push(`Burner: ${b.burnerFuel.toUpperCase()}`);
  if (b.fuelTankSize) lines.push(`Fuel tank: ${b.fuelTankSize}L`);
  if (b.generator !== 'none' && b.generator) lines.push(`Generator: ${b.generator}W`);
  if (b.addOns.length > 0) lines.push(`${b.addOns.length} add-on(s) selected`);
  if (b.bodyColour) lines.push(`Colour: ${BODY_COLOURS.find(c => c.value === b.bodyColour)?.label ?? b.bodyColour}`);
  return lines;
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function StepChassis({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 1 — Choose Your Chassis</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-10">Your trailer foundation. Select the axle configuration that suits your payload, tow vehicle, and access needs.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHASSIS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => update('chassis', opt.value)}
            className={`text-left p-6 border-2 rounded-sm transition-all ${build.chassis === opt.value ? 'border-alkota-orange bg-alkota-orange/10' : 'border-alkota-iron bg-alkota-steel/30 hover:border-alkota-steel'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-black uppercase tracking-tight text-base">{opt.label}</p>
                <p className="text-alkota-steel text-xs font-bold mt-1">{opt.subtitle}</p>
              </div>
              {build.chassis === opt.value && <CheckCircle2 className="h-5 w-5 text-alkota-orange flex-shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {opt.specs.map(s => <span key={s} className="text-[10px] font-bold uppercase tracking-wider border border-alkota-iron text-alkota-steel px-1.5 py-0.5">{s}</span>)}
            </div>
            <p className="text-xs text-alkota-silver"><span className="text-alkota-steel font-bold uppercase tracking-wider text-[10px]">Best for: </span>{opt.bestFor}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepMachine({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  const isTandemHeavy = build.chassis === 'tandem-heavy';
  const available = MACHINE_OPTIONS.filter(m => !m.tandemHeavyOnly || isTandemHeavy);
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 2 — Pressure Washer Unit</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-4">The engine of your trailer system. All units are skid-mounted with anti-vibration damping.</p>
      {isTandemHeavy && (
        <div className="mb-6 border border-alkota-gold/30 bg-alkota-gold/5 p-4 flex gap-3">
          <Info className="h-4 w-4 text-alkota-gold flex-shrink-0 mt-0.5" />
          <p className="text-alkota-gold text-xs font-bold">Tandem Heavy chassis selected — dual machine configuration is available below.</p>
        </div>
      )}
      <div className="space-y-3">
        {available.map(opt => (
          <button
            key={opt.value}
            onClick={() => update('machine', opt.value)}
            className={`w-full text-left px-6 py-5 border-2 rounded-sm transition-all flex items-start gap-4 ${build.machine === opt.value ? 'border-alkota-orange bg-alkota-orange/10' : 'border-alkota-iron bg-alkota-steel/30 hover:border-alkota-steel'}`}
          >
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <p className="text-white font-black uppercase tracking-tight text-sm">{opt.label}</p>
                {build.machine === opt.value && <CheckCircle2 className="h-5 w-5 text-alkota-orange flex-shrink-0 ml-2" />}
              </div>
              <p className="text-alkota-steel text-xs mb-3 font-medium">{opt.machine}</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {opt.specs.map(s => <span key={s} className="text-[10px] font-bold uppercase tracking-wider border border-alkota-iron text-alkota-steel px-1.5 py-0.5">{s}</span>)}
              </div>
              <p className="text-xs text-alkota-silver"><span className="text-alkota-steel font-bold uppercase tracking-wider text-[10px]">Best for: </span>{opt.bestFor}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepWater({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  const chassis = CHASSIS_OPTIONS.find(c => c.value === build.chassis);
  const maxTank = chassis?.maxTank ?? 460;
  const available = TANK_OPTIONS.filter(t => parseInt(t.value) <= maxTank);
  const isTandemHeavy = build.chassis === 'tandem-heavy';

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 3 — Water Storage</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-8">How much clean water do you need on board before you need to refill?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {available.map(opt => (
          <button
            key={opt.value}
            onClick={() => update('tankSize', opt.value)}
            className={`text-left p-6 border-2 rounded-sm transition-all ${build.tankSize === opt.value ? 'border-alkota-orange bg-alkota-orange/10' : 'border-alkota-iron bg-alkota-steel/30 hover:border-alkota-steel'}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-black text-xl mb-0.5">{opt.label}</p>
                <p className="text-alkota-steel text-xs font-bold">{opt.litres}</p>
              </div>
              {build.tankSize === opt.value && <CheckCircle2 className="h-5 w-5 text-alkota-orange" />}
            </div>
            <p className="text-alkota-orange text-xs font-bold mt-3 mb-1">{opt.runtime}</p>
            <p className="text-alkota-silver text-xs">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isTandemHeavy && (
          <ToggleRow
            label="Split dual tank configuration"
            desc="Separate fresh water and recovered/grey water tanks. Required for closed-loop wash systems."
            value={build.dualTank}
            onChange={v => update('dualTank', v)}
            badge="Tandem Heavy only"
          />
        )}
        <ToggleRow
          label="Auto-fill float valve"
          desc="Connects to a mains supply hose. Tank fills automatically and cuts off when full."
          value={build.autoFill}
          onChange={v => update('autoFill', v)}
        />
        <ToggleRow
          label="Low water shutoff protection"
          desc="Shuts the machine down before the tank runs dry. Protects the pump from cavitation damage."
          value={build.lowWaterShutoff}
          onChange={v => update('lowWaterShutoff', v)}
        />
      </div>
    </div>
  );
}

function StepPower({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  const isCold = build.machine === 'cold-bd';
  const isEngineSelf = build.machine === 'hot-diesel-skid' || build.machine === 'hot-gas-skid';

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 4 — Power & Fuel</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-6">How will your trailer system be powered on site?</p>

      {isEngineSelf && (
        <div className="mb-6 border border-alkota-gold/30 bg-alkota-gold/5 p-4 flex gap-3">
          <Info className="h-4 w-4 text-alkota-gold flex-shrink-0 mt-0.5" />
          <p className="text-alkota-gold text-xs font-bold">Your selected machine is self-contained. Power source is pre-configured. You can still add a generator for accessories.</p>
        </div>
      )}

      {!isCold && !isEngineSelf && (
        <div className="mb-8">
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4">Burner Fuel</h3>
          <div className="space-y-3">
            {[
              { value: 'diesel', label: 'Diesel', desc: 'Most common, widely available' },
              { value: 'lpg', label: 'LPG', desc: 'Cleaner burn, suitable for food-adjacent environments' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => update('burnerFuel', opt.value)}
                className={`w-full text-left px-5 py-4 border-2 flex items-center gap-3 transition-all ${build.burnerFuel === opt.value ? 'border-alkota-orange bg-alkota-orange/10' : 'border-alkota-iron bg-alkota-steel/30 hover:border-alkota-steel'}`}
              >
                <div className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${build.burnerFuel === opt.value ? 'border-alkota-orange' : 'border-alkota-iron'}`}>
                  {build.burnerFuel === opt.value && <div className="h-2 w-2 rounded-full bg-alkota-orange" />}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{opt.label}</p>
                  <p className="text-alkota-steel text-xs">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4">On-Board Fuel Tank</h3>
        <div className="flex flex-wrap gap-3">
          {['50', '80', '100', 'custom'].map(size => (
            <button
              key={size}
              onClick={() => update('fuelTankSize', size)}
              className={`px-5 py-3 border-2 text-sm font-bold uppercase tracking-wider transition-all ${build.fuelTankSize === size ? 'border-alkota-orange bg-alkota-orange/10 text-white' : 'border-alkota-iron text-alkota-steel hover:border-alkota-steel hover:text-white'}`}
            >
              {size === 'custom' ? 'Custom' : `${size}L`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">On-Board Generator</h3>
        <p className="text-alkota-steel text-xs mb-4">Required if the trailer needs to power 110v/240v accessories — lighting, tools, chemical dosing pumps.</p>
        <div className="flex flex-wrap gap-3">
          {[{ v: 'none', l: 'None' }, { v: '3000', l: '3,000W' }, { v: '5000', l: '5,000W' }].map(g => (
            <button
              key={g.v}
              onClick={() => update('generator', g.v)}
              className={`px-5 py-3 border-2 text-sm font-bold uppercase tracking-wider transition-all ${build.generator === g.v ? 'border-alkota-orange bg-alkota-orange/10 text-white' : 'border-alkota-iron text-alkota-steel hover:border-alkota-steel hover:text-white'}`}
            >
              {g.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepAddOns({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  const toggle = (val: string) => {
    const current = build.addOns;
    update('addOns', current.includes(val) ? current.filter(v => v !== val) : [...current, val]);
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 5 — Add-Ons & Systems</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-8">Everything that makes your trailer exactly right for your job.</p>
      <div className="space-y-8">
        {ADDON_GROUPS.map(group => {
          const Icon = group.icon;
          return (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-alkota-iron">
                <Icon className="h-4 w-4 text-alkota-orange" />
                <h3 className="text-xs font-black uppercase tracking-widest text-alkota-steel">{group.category}</h3>
              </div>
              <div className="space-y-2">
                {group.items.map(item => {
                  const selected = build.addOns.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      onClick={() => toggle(item.value)}
                      className={`w-full text-left px-4 py-3 border flex items-center gap-3 transition-all ${selected ? 'border-alkota-orange bg-alkota-orange/10' : 'border-alkota-iron hover:border-alkota-steel'}`}
                    >
                      <div className={`h-5 w-5 border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected ? 'border-alkota-orange bg-alkota-orange' : 'border-alkota-iron'}`}>
                        {selected && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <span className={`text-sm ${selected ? 'text-white font-bold' : 'text-alkota-silver'}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepBodywork({ build, update }: { build: BuildState; update: (k: keyof BuildState, v: any) => void }) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 6 — Bodywork & Finish</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-8">Specify the paintwork and finishing details for your trailer.</p>

      <div className="mb-10">
        <h3 className="text-xs font-black uppercase tracking-widest text-alkota-steel mb-4">Frame & Body Colour</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {BODY_COLOURS.map(colour => (
            <button
              key={colour.value}
              onClick={() => update('bodyColour', colour.value)}
              className={`p-4 border-2 flex flex-col items-center gap-2 transition-all ${build.bodyColour === colour.value ? 'border-alkota-orange' : 'border-alkota-iron hover:border-alkota-steel'}`}
            >
              {colour.hex ? (
                <div
                  className="h-10 w-10 rounded-sm shadow-inner"
                  style={{ backgroundColor: colour.hex, border: '1px solid rgba(255,255,255,0.1)' }}
                />
              ) : (
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border border-alkota-iron">
                  <Palette className="h-5 w-5 text-alkota-steel" />
                </div>
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider text-alkota-steel text-center leading-tight">{colour.label}</span>
              {build.bodyColour === colour.value && <CheckCircle2 className="h-4 w-4 text-alkota-orange" />}
            </button>
          ))}
        </div>
        {build.bodyColour === 'custom' && (
          <input
            type="text"
            placeholder="RAL number or fleet colour code (e.g. RAL 5010, Pantone 286C)"
            value={build.customColour}
            onChange={e => update('customColour', e.target.value)}
            className="w-full bg-alkota-black border border-alkota-iron focus:border-alkota-orange text-white placeholder:text-alkota-iron px-4 py-3 text-sm transition-colors outline-none"
          />
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-alkota-steel mb-2">Standard Fittings</h3>
        <ToggleRow
          label="Jockey wheel"
          desc="Front-mounted jockey wheel for easy hitching and unhitching without a tow vehicle."
          value={build.jockeyWheel}
          onChange={v => update('jockeyWheel', v)}
        />
        <ToggleRow
          label="Mudguards"
          desc="Full mudguard set over all axles."
          value={build.mudguards}
          onChange={v => update('mudguards', v)}
        />
      </div>

      <div className="mt-8 border border-alkota-gold/30 bg-alkota-gold/5 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="h-4 w-4 text-alkota-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-alkota-gold text-xs font-black uppercase tracking-widest mb-1">Custom RAL & Fleet Colours</p>
            <p className="text-alkota-silver text-xs leading-relaxed">
              All Alkota trailers can be painted to your exact RAL or fleet colour specification. If you select custom colour, our team will confirm the colour reference and any surcharges during the consultation call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDetails({ build, update, onSubmit, submitted, refNum }: {
  build: BuildState;
  update: (k: keyof BuildState, v: any) => void;
  onSubmit: () => void;
  submitted: boolean;
  refNum: string;
}) {
  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="h-20 w-20 bg-alkota-orange/10 border-2 border-alkota-orange rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-10 w-10 text-alkota-orange" />
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tight text-white mb-4">Configuration Submitted</h2>
        <p className="text-alkota-silver text-lg mb-6">Your build reference number is:</p>
        <div className="inline-block border-2 border-alkota-orange bg-alkota-orange/10 px-8 py-4 mb-8">
          <p className="text-alkota-orange font-black text-2xl tracking-[0.2em]">{refNum}</p>
        </div>
        <p className="text-alkota-steel text-sm max-w-md mx-auto mb-10">
          Our build team will review your configuration and come back with a detailed spec sheet and indicative quote within 2 working days. Quote sent to: <span className="text-white font-bold">{build.email}</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/machines/trailers" className="border border-alkota-iron hover:border-alkota-steel text-white px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors">
            ← Back to Trailers
          </Link>
          <Link href="/" className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-2">Step 7 — Your Details</h2>
      <p className="text-alkota-steel text-sm uppercase tracking-widest font-bold mb-8">Almost there. Tell us who you are and where to send your quote.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Your name *" value={build.name} onChange={v => update('name', v)} placeholder="John Smith" required />
          <InputField label="Company name *" value={build.company} onChange={v => update('company', v)} placeholder="Smith Agricultural Ltd" required />
        </div>
        <InputField label="Email address *" type="email" value={build.email} onChange={v => update('email', v)} placeholder="john@smithagricultural.co.uk" required />
        <InputField label="Phone number *" type="tel" value={build.phone} onChange={v => update('phone', v)} placeholder="01234 567890" required />
        <InputField label="Site / operation name (optional)" value={build.siteName} onChange={v => update('siteName', v)} placeholder="Home Farm, Alcester" />
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-alkota-steel mb-2">Anything else we should know?</label>
          <textarea
            rows={4}
            value={build.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Tell us more about the job — access constraints, specific features, timeline..."
            className="w-full bg-alkota-black border border-alkota-iron focus:border-alkota-orange text-white placeholder:text-alkota-iron px-4 py-3 text-sm transition-colors outline-none resize-none"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => update('marketingConsent', !build.marketingConsent)}
            className={`h-5 w-5 border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${build.marketingConsent ? 'border-alkota-orange bg-alkota-orange' : 'border-alkota-iron'}`}
          >
            {build.marketingConsent && <CheckCircle2 className="h-3 w-3 text-white" />}
          </div>
          <span className="text-xs text-alkota-steel leading-relaxed">
            I'm happy to receive occasional product updates and news from Alkota UK. You can unsubscribe at any time.
          </span>
        </label>

        <button
          onClick={onSubmit}
          disabled={!build.name || !build.company || !build.email || !build.phone}
          className="w-full bg-alkota-orange hover:bg-alkota-orange-bright disabled:bg-alkota-iron disabled:text-alkota-steel text-white font-black uppercase tracking-widest text-sm px-8 py-5 transition-colors mt-4"
        >
          Submit Configuration Request →
        </button>
        <p className="text-alkota-iron text-[10px] text-center uppercase tracking-widest">
          No obligation. No payment. Our team will review and respond within 2 working days.
        </p>
      </div>
    </div>
  );
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────

function ToggleRow({ label, desc, value, onChange, badge }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void; badge?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5 border border-alkota-iron hover:border-alkota-steel transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-white font-bold text-sm">{label}</p>
          {badge && <span className="text-[9px] font-black uppercase tracking-widest text-alkota-gold border border-alkota-gold/40 px-1.5 py-0.5">{badge}</span>}
        </div>
        <p className="text-alkota-steel text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative flex-shrink-0 h-7 w-12 rounded-full transition-all duration-300 ${value ? 'bg-alkota-orange' : 'bg-alkota-iron'}`}
        aria-label={label}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text', required }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-alkota-steel mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-alkota-black border border-alkota-iron focus:border-alkota-orange text-white placeholder:text-alkota-iron px-4 py-3 text-sm transition-colors outline-none"
      />
    </div>
  );
}

// ─── SUMMARY PANEL ────────────────────────────────────────────────────────────

function SummaryPanel({ build, currentStep }: { build: BuildState; currentStep: number }) {
  const lines = summariseBuild(build);
  const chassis = CHASSIS_OPTIONS.find(c => c.value === build.chassis);
  const machine = MACHINE_OPTIONS.find(m => m.value === build.machine);

  return (
    <div className="sticky top-24 bg-alkota-steel border border-alkota-iron">
      <div className="p-6 border-b border-alkota-iron">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-alkota-orange mb-1">Your Build So Far</p>
        <p className="text-white font-black text-xl italic uppercase">Alkota Trailer System</p>
      </div>

      {lines.length === 0 ? (
        <div className="p-6 text-center">
          <ClipboardList className="h-8 w-8 text-alkota-iron mx-auto mb-3" />
          <p className="text-alkota-steel text-xs uppercase tracking-widest">Your selections will appear here</p>
        </div>
      ) : (
        <div className="p-6 space-y-3">
          {chassis && (
            <div className="pb-4 border-b border-alkota-iron">
              <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-1">Chassis</p>
              <p className="text-white font-bold text-sm">{chassis.label}</p>
              <p className="text-alkota-steel text-xs">{chassis.subtitle}</p>
            </div>
          )}
          {machine && (
            <div className="pb-4 border-b border-alkota-iron">
              <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-1">Machine</p>
              <p className="text-white font-bold text-sm">{machine.label}</p>
              <p className="text-alkota-steel text-xs">{machine.machine}</p>
            </div>
          )}
          {build.tankSize && (
            <div className="pb-4 border-b border-alkota-iron">
              <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-1">Water Storage</p>
              <p className="text-white font-bold text-sm">{build.tankSize} gallons{build.dualTank ? ' (dual tank)' : ''}</p>
              {build.autoFill && <p className="text-alkota-steel text-xs">Auto-fill valve included</p>}
              {build.lowWaterShutoff && <p className="text-alkota-steel text-xs">Low water shutoff included</p>}
            </div>
          )}
          {build.addOns.length > 0 && (
            <div className="pb-4 border-b border-alkota-iron">
              <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-2">Add-Ons</p>
              <p className="text-alkota-orange text-xs font-bold">{build.addOns.length} selected</p>
            </div>
          )}
          {build.bodyColour && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-1">Colour</p>
              <div className="flex items-center gap-2">
                {BODY_COLOURS.find(c => c.value === build.bodyColour)?.hex && (
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: BODY_COLOURS.find(c => c.value === build.bodyColour)?.hex }} />
                )}
                <p className="text-white font-bold text-sm">
                  {build.customColour || BODY_COLOURS.find(c => c.value === build.bodyColour)?.label}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6 border-t border-alkota-iron bg-alkota-black/30">
        <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-3">Step {currentStep} of 7</p>
        <div className="flex gap-1">
          {STEPS.map(s => (
            <div key={s.id} className={`h-1 flex-1 rounded-full transition-all ${s.id < currentStep ? 'bg-alkota-orange' : s.id === currentStep ? 'bg-alkota-orange/60' : 'bg-alkota-iron'}`} />
          ))}
        </div>
        <p className="text-alkota-steel text-[10px] mt-3 leading-relaxed">
          All prices are bespoke. We'll review your configuration and send a detailed quote within 2 working days.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN CONFIGURATOR ────────────────────────────────────────────────────────

export default function TrailerConfiguratorPage() {
  const [step, setStep] = useState(1);
  const [build, setBuild] = useState<BuildState>(defaultBuild);
  const [submitted, setSubmitted] = useState(false);
  const [refNum] = useState(generateRef);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // Read ?base= param to pre-select chassis
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const base = params.get('base');
    if (base) {
      // Map model number to chassis value
      if (base === '20171') setBuild(prev => ({ ...prev, chassis: 'single-compact', tankSize: '200' }));
      else if (base === '20151') setBuild(prev => ({ ...prev, chassis: 'single-extended', tankSize: '230' }));
      else if (base === '20152') setBuild(prev => ({ ...prev, chassis: 'tandem-standard', tankSize: '330' }));
      else if (base === '20152C' || base === '20152K') setBuild(prev => ({ ...prev, chassis: 'tandem-heavy', tankSize: '460' }));
    }
  }, []);

  const update = (key: keyof BuildState, value: any) => {
    setBuild(prev => ({ ...prev, [key]: value }));
  };

  const canAdvance = () => {
    if (step === 1) return !!build.chassis;
    if (step === 2) return !!build.machine;
    if (step === 3) return !!build.tankSize;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const StepIcon = STEPS[step - 1]?.icon ?? Settings;

  return (
    <main className="min-h-screen bg-alkota-black pt-24 pb-20">

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-alkota-black/95 border-b border-alkota-iron pt-16">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = s.id === step;
              const isDone = s.id < step;
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all ${isDone ? 'bg-alkota-orange border-alkota-orange' : isActive ? 'border-alkota-orange bg-alkota-orange/20' : 'border-alkota-iron bg-alkota-black'}`}>
                      {isDone ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Icon className={`h-3 w-3 ${isActive ? 'text-alkota-orange' : 'text-alkota-iron'}`} />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest mt-1 hidden sm:block ${isActive ? 'text-white' : isDone ? 'text-alkota-orange' : 'text-alkota-iron'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px flex-1 mx-2 transition-all ${isDone ? 'bg-alkota-orange' : 'bg-alkota-iron'}`} style={{ width: '2rem' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Step content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && <StepChassis build={build} update={update} />}
                {step === 2 && <StepMachine build={build} update={update} />}
                {step === 3 && <StepWater build={build} update={update} />}
                {step === 4 && <StepPower build={build} update={update} />}
                {step === 5 && <StepAddOns build={build} update={update} />}
                {step === 6 && <StepBodywork build={build} update={update} />}
                {step === 7 && (
                  <StepDetails
                    build={build}
                    update={update}
                    onSubmit={handleSubmit}
                    submitted={submitted}
                    refNum={refNum}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {!submitted && (
              <div className="flex items-center justify-between pt-10 mt-10 border-t border-alkota-iron">
                <button
                  onClick={() => { setStep(s => Math.max(1, s - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-alkota-steel hover:text-white disabled:opacity-30 font-bold uppercase text-sm tracking-widest transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>

                {step < 7 && (
                  <button
                    onClick={() => { setStep(s => Math.min(7, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={!canAdvance()}
                    className="flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-bright disabled:bg-alkota-iron disabled:text-alkota-steel text-white px-8 py-4 font-black uppercase tracking-widest text-sm transition-all"
                  >
                    {step === 6 ? 'Your Details' : `Next: ${STEPS[step]?.label}`} <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Summary (desktop) */}
          <div className="lg:col-span-2 hidden lg:block">
            <SummaryPanel build={build} currentStep={step} />
          </div>
        </div>
      </div>

      {/* Mobile summary drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <button
          onClick={() => setSummaryOpen(o => !o)}
          className="w-full bg-alkota-steel border-t border-alkota-iron px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="h-4 w-4 text-alkota-orange" />
            <span className="text-white font-black text-sm uppercase tracking-widest">Your Build</span>
            {summariseBuild(build).length > 0 && (
              <span className="h-5 w-5 bg-alkota-orange rounded-full text-white text-[10px] font-black flex items-center justify-center">
                {summariseBuild(build).length}
              </span>
            )}
          </div>
          {summaryOpen ? <ChevronDown className="h-4 w-4 text-alkota-steel" /> : <ChevronUp className="h-4 w-4 text-alkota-steel" />}
        </button>
        <AnimatePresence>
          {summaryOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-alkota-steel border-t border-alkota-iron max-h-64 overflow-y-auto"
            >
              <div className="p-6">
                {summariseBuild(build).length === 0 ? (
                  <p className="text-alkota-steel text-xs text-center uppercase tracking-widest">No selections yet</p>
                ) : (
                  <ul className="space-y-2">
                    {summariseBuild(build).map((line, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-alkota-silver">
                        <CheckCircle2 className="h-3 w-3 text-alkota-orange flex-shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
