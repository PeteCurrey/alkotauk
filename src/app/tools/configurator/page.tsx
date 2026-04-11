'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Zap, Droplets,
  Thermometer, Settings, Package, ArrowRight, Phone, FileText,
  Flame, Wind, Gauge, Layers, Wrench, Move, RotateCcw, ShieldCheck, Truck
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

// ─── DATA ───────────────────────────────────────────────────────────────────

const BASE_MACHINES = [
  {
    id: 'hot-water-elite',
    name: 'Hot Water Elite Series',
    subtitle: 'Maximum industrial power. Petroleum-fired coil.',
    category: 'hot-water',
    specs: 'Up to 40 BAR / 20 LPM',
    image: '/assets/products/420x4.png',
    tag: 'MOST POPULAR',
  },
  {
    id: 'hot-water-standard',
    name: 'Hot Water Standard',
    subtitle: 'Versatile electric or diesel. Core industrial range.',
    category: 'hot-water',
    specs: 'Up to 200 BAR / 15 LPM',
    image: '/assets/products/216ax4.png',
    tag: null,
  },
  {
    id: 'cold-water',
    name: 'Cold Water Challenger',
    subtitle: 'Portable, lightweight aluminium frame. Engine or electric.',
    category: 'cold-water',
    specs: 'Up to 250 BAR / 20 LPM',
    image: '/assets/products/4305xd4.png',
    tag: null,
  },
  {
    id: 'steam-cleaner',
    name: 'Steam Cleaner',
    subtitle: 'Dry vapour steam for hygiene-critical environments.',
    category: 'steam-cleaner',
    specs: '140°C / low water volume',
    image: '/assets/products/steam-oil.png',
    tag: null,
  },
];

const FLOW_RATES = [
  { id: '10lpm', label: '10 LPM', sublabel: '2.6 GPM — Light duty', icon: Droplets },
  { id: '15lpm', label: '15 LPM', sublabel: '4 GPM — Standard industrial', icon: Droplets },
  { id: '20lpm', label: '20 LPM', sublabel: '5.3 GPM — Heavy industrial', icon: Droplets },
  { id: '30lpm', label: '30 LPM', sublabel: '8 GPM — High-volume facility', icon: Droplets },
];

const PRESSURES = [
  { id: '100bar', label: '100 BAR', sublabel: '1450 PSI — General cleaning', icon: Gauge },
  { id: '150bar', label: '150 BAR', sublabel: '2175 PSI — Fleet & plant', icon: Gauge },
  { id: '200bar', label: '200 BAR', sublabel: '2900 PSI — Industrial standard', icon: Gauge },
  { id: '250bar', label: '250 BAR', sublabel: '3625 PSI — Heavy degreasing', icon: Gauge },
];

const POWER_SOURCES = [
  { id: 'electric-1ph', label: '240V Single Phase', sublabel: 'Standard UK socket supply', icon: Zap },
  { id: 'electric-3ph', label: '415V Three Phase', sublabel: 'Industrial facility supply', icon: Zap },
  { id: 'diesel', label: 'Diesel Engine', sublabel: 'Self-contained — no mains needed', icon: Flame },
  { id: 'petrol', label: 'Petrol Engine', sublabel: 'Portable & lightweight', icon: Flame },
  { id: 'lpg', label: 'LPG / Propane', sublabel: 'Gas-powered for indoor use', icon: Wind },
];

const HEATING_FUELS = [
  { id: 'diesel-kero', label: 'Diesel / Kerosene', sublabel: 'Most common UK fuel. Reliable coil heating.', icon: Flame },
  { id: 'lpg', label: 'LPG / Propane', sublabel: 'Indoor-safe. Tank-fed. Cleaner burn.', icon: Wind },
  { id: 'natural-gas', label: 'Natural Gas', sublabel: 'Plumbed-in facility heating.', icon: Wind },
  { id: 'electric-element', label: 'Electric Element', sublabel: 'No burner. Safe for food environments.', icon: Zap },
  { id: 'none', label: 'No Heating Required', sublabel: 'Cold water machine selected.', icon: Droplets },
];

const MOUNTING_OPTIONS = [
  { id: 'portable', label: 'Portable Unit', sublabel: 'Wheeled trolley. Self-contained.', icon: Move },
  { id: 'skid', label: 'Skid Mounted', sublabel: 'Fixed-base for van / truck loading.', icon: Layers },
  { id: 'trailer', label: 'Trailer Mounted', sublabel: 'Purpose-built tow-behind rig.', icon: Truck },
  { id: 'wan-pack', label: 'Van Pack', sublabel: 'Compact in-van installation.', icon: Package },
  { id: 'fixed-install', label: 'Fixed Wall Install', sublabel: 'Permanent wash bay mounting.', icon: Settings },
];

const BESPOKE_OPTIONS = [
  { id: 'hose-reel', label: '50m Hose Reel', sublabel: 'Spring-return stainless hose reel', icon: RotateCcw, price: '+ POA' },
  { id: 'auto-start', label: 'Auto Start / Stop', sublabel: 'Pressure-sensing automatic operation', icon: Zap, price: '+ POA' },
  { id: 'twin-lance', label: 'Twin Lance Outlet', sublabel: 'Simultaneous dual-operator feed', icon: Wrench, price: '+ POA' },
  { id: 'chem-injector', label: 'Chemical Injection System', sublabel: 'Downstream proportional dosing unit', icon: Droplets, price: '+ POA' },
  { id: 'scale-stop', label: 'Scale Stop Dosing', sublabel: 'Inline anti-scale chemical treatment', icon: ShieldCheck, price: '+ POA' },
  { id: 'hot-cold-switch', label: 'Hot/Cold Toggle', sublabel: 'Switchable heating bypass valve', icon: Thermometer, price: '+ POA' },
  { id: 'frost-protect', label: 'Frost Protection Kit', sublabel: 'Glycol-purge system for outdoor storage', icon: Wind, price: '+ POA' },
  { id: 'atex', label: 'ATEX Zone Rating', sublabel: 'For explosive atmosphere environments', icon: ShieldCheck, price: '+ POA' },
  { id: 'food-safe', label: 'Food-Safe Certification', sublabel: 'Materials & detergents HACCP-ready', icon: CheckCircle2, price: '+ POA' },
  { id: 'lance-storage', label: 'Lance & Gun Storage', sublabel: 'Integrated stainless bracket mount', icon: Package, price: '+ POA' },
  { id: 'hour-meter', label: 'Hour Meter', sublabel: 'Digital service interval tracking', icon: Settings, price: '+ POA' },
  { id: 'remote-panel', label: 'Remote Control Panel', sublabel: 'Weatherproof remote start station', icon: Zap, price: '+ POA' },
];

const STEPS = [
  { id: 'machine', title: 'Base Machine', subtitle: 'Choose your machine type' },
  { id: 'flow', title: 'Flow Rate', subtitle: 'How much water output?' },
  { id: 'pressure', title: 'Pressure', subtitle: 'How hard does it need to wash?' },
  { id: 'power', title: 'Power Source', subtitle: 'How is the machine powered?' },
  { id: 'heating', title: 'Heating Method', subtitle: 'How is the water heated?' },
  { id: 'mounting', title: 'Mounting Type', subtitle: 'How will the machine be deployed?' },
  { id: 'options', title: 'Bespoke Options', subtitle: 'Customise your build' },
  { id: 'summary', title: 'Your Specification', subtitle: 'Review & request your quote' },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function ConfiguratorPage() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Record<string, any>>({
    machine: null,
    flow: null,
    pressure: null,
    power: null,
    heating: null,
    mounting: null,
    options: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNotes, setContactNotes] = useState('');

  const select = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleOption = (id: string) => {
    setConfig(prev => {
      const current = prev.options as string[];
      return {
        ...prev,
        options: current.includes(id) ? current.filter(o => o !== id) : [...current, id],
      };
    });
  };

  const canAdvance = () => {
    const currentStepId = STEPS[step].id;
    if (currentStepId === 'options') return true; // optional
    if (currentStepId === 'summary') return false;
    return !!config[currentStepId];
  };

  const getMachineName = () => BASE_MACHINES.find(m => m.id === config.machine)?.name ?? '—';
  const getFlowLabel = () => FLOW_RATES.find(f => f.id === config.flow)?.label ?? '—';
  const getPressureLabel = () => PRESSURES.find(p => p.id === config.pressure)?.label ?? '—';
  const getPowerLabel = () => POWER_SOURCES.find(p => p.id === config.power)?.label ?? '—';
  const getHeatingLabel = () => HEATING_FUELS.find(h => h.id === config.heating)?.label ?? '—';
  const getMountingLabel = () => MOUNTING_OPTIONS.find(m => m.id === config.mounting)?.label ?? '—';
  const getOptionLabels = () =>
    (config.options as string[]).map(id => BESPOKE_OPTIONS.find(o => o.id === id)?.label ?? id);

  const handleSubmit = async () => {
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-alkota-bg overflow-x-hidden">
      <Navigation />

      {/* Header */}
      <div className="pt-32 pb-0 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between border-b border-alkota-iron pb-10">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // ALKOTA BUILD SYSTEM
              </span>
            </div>
            <h1 className="font-barlow-condensed text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-alkota-black md:text-9xl">
              MACHINE<br />
              <span className="text-alkota-orange">CONFIGURATOR.</span>
            </h1>
          </div>
          <div className="hidden lg:block text-right max-w-xs">
            <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest leading-relaxed">
              Specify every aspect of your Alkota machine. Our engineering team will review your build and provide a formal quotation within 1 working day.
            </p>
          </div>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-40">
            {/* Left: Step Nav */}
            <div className="lg:col-span-3">
              <div className="sticky top-32">
                <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-silver mb-6">
                  Build Progress
                </p>
                <div className="space-y-1">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => i < step ? setStep(i) : undefined}
                      className={`w-full text-left flex items-center gap-4 px-4 py-3 transition-all ${
                        i === step
                          ? 'bg-alkota-black text-white'
                          : i < step
                          ? 'text-alkota-orange cursor-pointer hover:bg-alkota-steel/30'
                          : 'text-alkota-silver opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className={`h-5 w-5 shrink-0 flex items-center justify-center text-[9px] font-black border ${
                        i === step ? 'border-alkota-orange bg-alkota-orange text-white'
                        : i < step ? 'border-alkota-orange text-alkota-orange bg-transparent'
                        : 'border-alkota-iron text-alkota-silver'
                      }`}>
                        {i < step ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                      </div>
                      <div>
                        <p className="font-barlow-condensed text-sm font-black uppercase italic leading-none">{s.title}</p>
                        <p className="font-ibm-plex-mono text-[8px] uppercase tracking-wider opacity-60 mt-0.5">{s.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Live summary sidebar */}
                {step > 0 && (
                  <div className="mt-10 border border-alkota-iron p-6 bg-white">
                    <p className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-[0.3em] text-alkota-silver mb-4">Current Build</p>
                    <div className="space-y-3">
                      {config.machine && <SummaryRow label="Machine" value={getMachineName()} />}
                      {config.flow && <SummaryRow label="Flow" value={getFlowLabel()} />}
                      {config.pressure && <SummaryRow label="Pressure" value={getPressureLabel()} />}
                      {config.power && <SummaryRow label="Power" value={getPowerLabel()} />}
                      {config.heating && <SummaryRow label="Heating" value={getHeatingLabel()} />}
                      {config.mounting && <SummaryRow label="Mount" value={getMountingLabel()} />}
                      {(config.options as string[]).length > 0 && (
                        <SummaryRow label="Options" value={`${(config.options as string[]).length} selected`} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Step Content */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* STEP 0: Base Machine */}
                  {step === 0 && (
                    <StepWrapper title="Select Your Base Machine" subtitle="This forms the foundation of your bespoke build.">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
                        {BASE_MACHINES.map(machine => (
                          <button
                            key={machine.id}
                            onClick={() => select('machine', machine.id)}
                            className={`relative bg-white p-8 text-left flex flex-col transition-all group hover:bg-alkota-bg ${
                              config.machine === machine.id ? 'ring-2 ring-inset ring-alkota-orange bg-alkota-bg' : ''
                            }`}
                          >
                            {machine.tag && (
                              <span className="absolute top-4 right-4 text-[8px] font-black bg-alkota-orange text-white px-3 py-1 uppercase tracking-wider">
                                {machine.tag}
                              </span>
                            )}
                            <div className="aspect-[16/9] overflow-hidden mb-6 bg-alkota-bg">
                              <img
                                src={machine.image}
                                alt={machine.name}
                                className={`h-full w-full object-contain transition-all duration-700 ${
                                  config.machine === machine.id ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'
                                }`}
                              />
                            </div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic leading-none">
                                {machine.name}
                              </h3>
                              {config.machine === machine.id && (
                                <CheckCircle2 className="h-5 w-5 text-alkota-orange shrink-0 ml-2" />
                              )}
                            </div>
                            <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest mb-4 leading-relaxed">
                              {machine.subtitle}
                            </p>
                            <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest font-black">
                              {machine.specs}
                            </span>
                          </button>
                        ))}
                      </div>
                    </StepWrapper>
                  )}

                  {/* STEP 1: Flow Rate */}
                  {step === 1 && (
                    <StepWrapper title="Flow Rate" subtitle="Higher flow means faster coverage but higher water consumption.">
                      <OptionGrid
                        items={FLOW_RATES}
                        selected={config.flow}
                        onSelect={v => select('flow', v)}
                      />
                    </StepWrapper>
                  )}

                  {/* STEP 2: Pressure */}
                  {step === 2 && (
                    <StepWrapper title="Operating Pressure" subtitle="Higher pressure cuts through harder contamination but requires more robust pumps.">
                      <OptionGrid
                        items={PRESSURES}
                        selected={config.pressure}
                        onSelect={v => select('pressure', v)}
                      />
                    </StepWrapper>
                  )}

                  {/* STEP 3: Power */}
                  {step === 3 && (
                    <StepWrapper title="Power Source" subtitle="Electric motors offer lower running cost. Engine-driven units are self-contained.">
                      <OptionGrid
                        items={POWER_SOURCES}
                        selected={config.power}
                        onSelect={v => select('power', v)}
                      />
                    </StepWrapper>
                  )}

                  {/* STEP 4: Heating */}
                  {step === 4 && (
                    <StepWrapper title="Heating Fuel" subtitle="Alkota steel coils are compatible with diesel, LPG, natural gas, and electric heating elements.">
                      <OptionGrid
                        items={HEATING_FUELS}
                        selected={config.heating}
                        onSelect={v => select('heating', v)}
                      />
                      <div className="mt-8 bg-alkota-black p-6 border-l-4 border-alkota-orange">
                        <p className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest leading-relaxed">
                          All Alkota hot water coils carry a standard 7-year warranty. The coil is the most critical component of a hot water machine — Alkota's are welded from schedule 80 A53 steel and pressure-tested before dispatch.
                        </p>
                      </div>
                    </StepWrapper>
                  )}

                  {/* STEP 5: Mounting */}
                  {step === 5 && (
                    <StepWrapper title="Mounting & Deployment" subtitle="How and where will this machine operate?">
                      <OptionGrid
                        items={MOUNTING_OPTIONS}
                        selected={config.mounting}
                        onSelect={v => select('mounting', v)}
                      />
                    </StepWrapper>
                  )}

                  {/* STEP 6: Bespoke Options */}
                  {step === 6 && (
                    <StepWrapper title="Bespoke Options" subtitle="Select any additions to your build. All options priced on application.">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
                        {BESPOKE_OPTIONS.map(opt => {
                          const isSelected = (config.options as string[]).includes(opt.id);
                          const Icon = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => toggleOption(opt.id)}
                              className={`bg-white p-6 text-left flex flex-col transition-all hover:bg-alkota-bg ${
                                isSelected ? 'ring-2 ring-inset ring-alkota-orange bg-alkota-bg' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <Icon className={`h-6 w-6 ${isSelected ? 'text-alkota-orange' : 'text-alkota-iron'}`} />
                                {isSelected && <CheckCircle2 className="h-4 w-4 text-alkota-orange" />}
                              </div>
                              <p className="font-barlow-condensed text-lg font-black text-alkota-black uppercase italic mb-1">{opt.label}</p>
                              <p className="font-inter text-[8px] text-alkota-silver uppercase tracking-widest leading-relaxed flex-1">{opt.sublabel}</p>
                              <span className="mt-4 font-ibm-plex-mono text-[8px] text-alkota-orange uppercase tracking-widest font-black">{opt.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </StepWrapper>
                  )}

                  {/* STEP 7: Summary */}
                  {step === 7 && (
                    <StepWrapper title="Your Machine Specification" subtitle="Review your build configuration below, then request your formal quotation.">
                      {/* Spec Sheet */}
                      <div className="border border-alkota-iron bg-white mb-12">
                        <div className="bg-alkota-black p-8 border-b border-alkota-iron">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-8 bg-alkota-orange" />
                            <span className="font-ibm-plex-mono text-[8px] font-black text-alkota-orange uppercase tracking-[0.3em]">
                              Alkota UK // Build Specification
                            </span>
                          </div>
                          <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                            {getMachineName()}
                          </h2>
                          <p className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest mt-2">
                            Bespoke Configuration — {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-alkota-iron border-b border-alkota-iron">
                          <SpecCell label="Flow Rate" value={getFlowLabel()} />
                          <SpecCell label="Pressure" value={getPressureLabel()} />
                          <SpecCell label="Power Source" value={getPowerLabel()} />
                          <SpecCell label="Heating Fuel" value={getHeatingLabel()} />
                          <SpecCell label="Mounting" value={getMountingLabel()} />
                          <SpecCell label="Bespoke Options" value={`${(config.options as string[]).length} additions`} />
                        </div>

                        {(config.options as string[]).length > 0 && (
                          <div className="p-8 border-b border-alkota-iron">
                            <p className="font-ibm-plex-mono text-[9px] font-black text-alkota-silver uppercase tracking-[0.3em] mb-4">
                              Bespoke Additions Selected
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {getOptionLabels().map((label, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                                  <span className="font-barlow-condensed text-base font-black text-alkota-black uppercase italic">{label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contact Form */}
                        <div className="p-8">
                          <p className="font-ibm-plex-mono text-[9px] font-black text-alkota-silver uppercase tracking-[0.3em] mb-6">
                            Submit Your Quote Request
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mb-2">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}
                                className="w-full border border-alkota-iron bg-alkota-bg px-4 py-3 text-sm text-alkota-black focus:border-alkota-black focus:outline-none transition-colors font-inter"
                                placeholder="e.g. John Smith"
                              />
                            </div>
                            <div>
                              <label className="block font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mb-2">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                                className="w-full border border-alkota-iron bg-alkota-bg px-4 py-3 text-sm text-alkota-black focus:border-alkota-black focus:outline-none transition-colors font-inter"
                                placeholder="e.g. john@company.co.uk"
                              />
                            </div>
                            <div>
                              <label className="block font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                value={contactPhone}
                                onChange={e => setContactPhone(e.target.value)}
                                className="w-full border border-alkota-iron bg-alkota-bg px-4 py-3 text-sm text-alkota-black focus:border-alkota-black focus:outline-none transition-colors font-inter"
                                placeholder="e.g. 01234 567890"
                              />
                            </div>
                            <div>
                              <label className="block font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mb-2">
                                Additional Notes
                              </label>
                              <textarea
                                value={contactNotes}
                                onChange={e => setContactNotes(e.target.value)}
                                rows={1}
                                className="w-full border border-alkota-iron bg-alkota-bg px-4 py-3 text-sm text-alkota-black focus:border-alkota-black focus:outline-none transition-colors font-inter resize-none"
                                placeholder="Any specific operational requirements..."
                              />
                            </div>
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={!contactName || !contactEmail}
                            className="w-full mt-4 bg-alkota-orange disabled:bg-alkota-iron disabled:text-alkota-silver text-white p-5 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[11px] transition-all hover:bg-alkota-black group"
                          >
                            Submit Bespoke Build Request
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                          </button>

                          <div className="mt-6 flex items-start gap-4 bg-alkota-bg border border-alkota-iron p-4">
                            <Phone className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                            <p className="font-ibm-plex-mono text-[8px] text-alkota-silver uppercase tracking-widest leading-relaxed">
                              Prefer to talk through your spec? Call our engineering team on{' '}
                              <a href="tel:+447912506738" className="text-alkota-orange font-black">+44 7912 506738</a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => { setStep(0); setConfig({ machine: null, flow: null, pressure: null, power: null, heating: null, mounting: null, options: [] }); }}
                        className="flex items-center gap-2 text-[9px] font-black text-alkota-silver hover:text-alkota-orange uppercase tracking-widest transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" /> Start New Configuration
                      </button>
                    </StepWrapper>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {step < 7 && (
                <div className="mt-12 flex items-center justify-between border-t border-alkota-iron pt-8">
                  <button
                    onClick={() => setStep(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-alkota-silver hover:text-alkota-black transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-silver uppercase tracking-widest">
                      {step + 1} / {STEPS.length}
                    </span>
                    <div className="h-1 w-48 bg-alkota-iron overflow-hidden">
                      <motion.div
                        className="h-full bg-alkota-orange"
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={!canAdvance()}
                    className="flex items-center gap-3 bg-alkota-black disabled:bg-alkota-iron disabled:text-alkota-silver text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-alkota-orange group"
                  >
                    {step === 6 ? 'Review Build' : 'Continue'}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-40 text-center max-w-3xl mx-auto pb-60"
          >
            <div className="h-20 w-20 mx-auto bg-alkota-orange flex items-center justify-center mb-12">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-barlow-condensed text-7xl font-black text-alkota-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              BUILD SUBMITTED.
            </h2>
            <p className="font-inter text-lg text-alkota-silver uppercase tracking-wider leading-relaxed mb-12 max-w-xl mx-auto">
              Your bespoke machine specification has been received. Our engineering team will review and respond within 1 working day with a formal quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-3 bg-alkota-black text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-alkota-orange transition-all"
              >
                Browse All Machines <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => { setSubmitted(false); setStep(0); setConfig({ machine: null, flow: null, pressure: null, power: null, heating: null, mounting: null, options: [] }); }}
                className="inline-flex items-center justify-center gap-3 border border-alkota-iron text-alkota-black px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:border-alkota-orange transition-all"
              >
                <RotateCcw className="h-4 w-4" /> New Configuration
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-10">
        <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-2">
          {title}
        </h2>
        <p className="font-inter text-sm text-alkota-silver uppercase tracking-widest">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function OptionGrid({ items, selected, onSelect }: { items: any[]; selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
      {items.map(item => {
        const Icon = item.icon;
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`bg-white p-8 text-left flex items-start gap-6 group transition-all hover:bg-alkota-bg ${
              isSelected ? 'ring-2 ring-inset ring-alkota-orange bg-alkota-bg' : ''
            }`}
          >
            <div className={`h-12 w-12 shrink-0 flex items-center justify-center border transition-all ${
              isSelected ? 'border-alkota-orange bg-alkota-orange text-white' : 'border-alkota-iron text-alkota-iron group-hover:border-alkota-black'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-barlow-condensed text-3xl font-black uppercase italic leading-none ${
                  isSelected ? 'text-alkota-orange' : 'text-alkota-black group-hover:text-alkota-orange'
                } transition-colors`}>
                  {item.label}
                </h4>
                {isSelected && <CheckCircle2 className="h-5 w-5 text-alkota-orange shrink-0" />}
              </div>
              <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest leading-relaxed">{item.sublabel}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-alkota-iron pb-2 last:border-none last:pb-0">
      <span className="font-ibm-plex-mono text-[7px] font-black uppercase tracking-widest text-alkota-silver">{label}</span>
      <span className="font-barlow-condensed text-sm font-black text-alkota-black uppercase italic text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-6">
      <p className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mb-2">{label}</p>
      <p className="font-barlow-condensed text-2xl font-black text-alkota-black uppercase italic">{value}</p>
    </div>
  );
}
