'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import {
  Zap, Droplets, Car, Factory, HardHat, Truck,
  Home, Settings, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

// ─── Step Definitions ──────────────────────────────────────────────────────

const STEPS = ['Water Type', 'Power Source', 'Application', 'Volume & Pressure', 'Your Results'];

interface ConfigState {
  waterType: 'hot' | 'cold' | null;
  powerSource: 'electric' | 'petrol' | 'diesel' | null;
  application: string | null;
  pressureRange: 'light' | 'medium' | 'heavy' | null;
  flowRange: 'low' | 'medium' | 'high' | null;
}

const APPLICATIONS = [
  { id: 'degreasing', label: 'Engine / Degreasing', icon: <Zap className="h-6 w-6" />, recommendsHot: true },
  { id: 'fleet', label: 'Vehicle Fleet Wash', icon: <Truck className="h-6 w-6" />, recommendsHot: false },
  { id: 'agriculture', label: 'Agricultural / Farm', icon: <HardHat className="h-6 w-6" />, recommendsHot: false },
  { id: 'food', label: 'Food Processing / Hygiene', icon: <Factory className="h-6 w-6" />, recommendsHot: true },
  { id: 'washbay', label: 'Dedicated Wash Bay', icon: <Home className="h-6 w-6" />, recommendsHot: true },
  { id: 'parts', label: 'Parts Cleaning', icon: <Settings className="h-6 w-6" />, recommendsHot: true },
  { id: 'construction', label: 'Construction / Plant', icon: <HardHat className="h-6 w-6" />, recommendsHot: false },
  { id: 'surface', label: 'Surface Preparation', icon: <Droplets className="h-6 w-6" />, recommendsHot: false },
  { id: 'hire', label: 'Mobile / Hire Work', icon: <Car className="h-6 w-6" />, recommendsHot: false },
];

// ─── Recommendation Engine ─────────────────────────────────────────────────

function getRecommendations(config: ConfigState) {
  const machines = [
    {
      name: '216X4',
      slug: '216x4',
      category: 'hot-water',
      waterType: 'hot',
      power: ['electric'],
      pressure: 1600,
      flow: 2.0,
      score: 0,
      tagline: 'Compact Hot Water Portable',
      bestFor: ['parts', 'food', 'vehicle'],
    },
    {
      name: '430XM4',
      slug: '430xm4',
      category: 'hot-water',
      waterType: 'hot',
      power: ['electric'],
      pressure: 3000,
      flow: 3.8,
      score: 0,
      tagline: 'Full-Size Belt Drive',
      bestFor: ['degreasing', 'washbay', 'fleet', 'agriculture'],
    },
    {
      name: '8405HNL',
      slug: '8405hnl',
      category: 'cold-water',
      waterType: 'cold',
      power: ['petrol', 'diesel'],
      pressure: 4000,
      flow: 8.0,
      score: 0,
      tagline: 'High-Volume Field Unit',
      bestFor: ['construction', 'agriculture', 'surface', 'hire'],
    },
  ];

  return machines
    .map(m => {
      let score = 0;
      if (config.waterType && m.waterType === config.waterType) score += 4;
      if (config.powerSource && m.power.includes(config.powerSource)) score += 3;
      if (config.application && m.bestFor.includes(config.application)) score += 3;
      if (config.pressureRange === 'light' && m.pressure <= 2000) score += 1;
      if (config.pressureRange === 'medium' && m.pressure > 2000 && m.pressure <= 3500) score += 1;
      if (config.pressureRange === 'heavy' && m.pressure > 3500) score += 1;
      if (config.flowRange === 'low' && m.flow <= 2.5) score += 1;
      if (config.flowRange === 'medium' && m.flow > 2.5 && m.flow <= 5) score += 1;
      if (config.flowRange === 'high' && m.flow > 5) score += 1;
      return { ...m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// ─── Option Button ─────────────────────────────────────────────────────────

function OptionCard({
  label, icon, selected, onClick, badge,
}: {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 border p-6 text-center transition-all focus:outline-none focus:ring-2 focus:ring-alkota-orange/50 focus:ring-offset-2 focus:ring-offset-alkota-black
        ${selected
          ? 'border-alkota-orange bg-alkota-orange/10 text-white'
          : 'border-alkota-iron bg-alkota-steel/30 text-alkota-silver hover:border-alkota-steel hover:text-white'
        }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-alkota-orange">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      {badge && (
        <span className="absolute left-3 top-3 bg-alkota-orange px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
          {badge}
        </span>
      )}
      {icon && <span className={selected ? 'text-alkota-orange' : 'text-alkota-steel group-hover:text-alkota-orange transition-colors'}>{icon}</span>}
      <span className="text-sm font-bold uppercase tracking-wide">{label}</span>
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function ConfiguratorPage() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<ConfigState>({
    waterType: null,
    powerSource: null,
    application: null,
    pressureRange: null,
    flowRange: null,
  });

  const set = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) =>
    setConfig(prev => ({ ...prev, [key]: value }));

  const canAdvance = () => {
    if (step === 0) return config.waterType !== null;
    if (step === 1) return config.powerSource !== null;
    if (step === 2) return config.application !== null;
    if (step === 3) return config.pressureRange !== null && config.flowRange !== null;
    return true;
  };

  const recommendations = getRecommendations(config);

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />

      <div className="container mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            MACHINE <span className="text-alkota-orange">CONFIGURATOR.</span>
          </h1>
          <p className="text-lg text-alkota-silver">
            Answer a few quick questions — we'll find the perfect Alkota for your job.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all
                  ${i < step ? 'bg-alkota-orange text-white' : i === step ? 'bg-alkota-orange text-white ring-4 ring-alkota-orange/30' : 'bg-alkota-iron text-alkota-steel'}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block h-px w-16 transition-all ${i < step ? 'bg-alkota-orange' : 'bg-alkota-iron'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-alkota-orange">
              Step {step + 1} / {STEPS.length} — {STEPS[step]}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-12 min-h-[300px]">

          {/* STEP 0: Water Type */}
          {step === 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-black uppercase italic text-white">Hot or Cold Water?</h2>
              <p className="mb-8 text-alkota-silver">Hot water cuts through grease, oil, and bacteria. Cold water is ideal for mud and debris.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <OptionCard
                  label="Hot Water"
                  icon={<Zap className="h-8 w-8" />}
                  selected={config.waterType === 'hot'}
                  onClick={() => set('waterType', 'hot')}
                  badge="Most Popular"
                />
                <OptionCard
                  label="Cold Water"
                  icon={<Droplets className="h-8 w-8" />}
                  selected={config.waterType === 'cold'}
                  onClick={() => set('waterType', 'cold')}
                />
              </div>
              {config.waterType === 'hot' && (
                <p className="mt-4 text-xs text-alkota-steel border-l-2 border-alkota-orange pl-4">
                  ✓ Good choice. Hot water is the proven solution for grease, food hygiene, and deep degreasing.
                </p>
              )}
            </div>
          )}

          {/* STEP 1: Power Source */}
          {step === 1 && (
            <div>
              <h2 className="mb-6 text-2xl font-black uppercase italic text-white">Power Source?</h2>
              <p className="mb-8 text-alkota-silver">Where will you primarily be using this machine?</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <OptionCard
                  label="Electric (3-Phase / Single)"
                  icon={<Zap className="h-8 w-8" />}
                  selected={config.powerSource === 'electric'}
                  onClick={() => set('powerSource', 'electric')}
                  badge="Quietest"
                />
                <OptionCard
                  label="Petrol Engine"
                  icon={<Car className="h-8 w-8" />}
                  selected={config.powerSource === 'petrol'}
                  onClick={() => set('powerSource', 'petrol')}
                />
                <OptionCard
                  label="Diesel Engine"
                  icon={<Truck className="h-8 w-8" />}
                  selected={config.powerSource === 'diesel'}
                  onClick={() => set('powerSource', 'diesel')}
                  badge="Most Durable"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Application */}
          {step === 2 && (
            <div>
              <h2 className="mb-6 text-2xl font-black uppercase italic text-white">Primary Application?</h2>
              <p className="mb-8 text-alkota-silver">What will you primarily be cleaning?</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {APPLICATIONS.map(app => (
                  <OptionCard
                    key={app.id}
                    label={app.label}
                    icon={app.icon}
                    selected={config.application === app.id}
                    onClick={() => set('application', app.id)}
                    badge={app.recommendsHot && config.waterType === 'cold' ? 'Better with Hot' : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Volume & Pressure */}
          {step === 3 && (
            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 text-xl font-black uppercase italic text-white">Cleaning Intensity?</h2>
                <p className="mb-6 text-sm text-alkota-silver">How stubborn is the dirt you're tackling?</p>
                <div className="space-y-3">
                  {[
                    { id: 'light', label: 'Light (dust, mud, general dirt)', psi: 'Up to 2000 PSI' },
                    { id: 'medium', label: 'Medium (road film, light grease)', psi: '2000–3500 PSI' },
                    { id: 'heavy', label: 'Heavy (concrete, heavy oil, scale)', psi: '3500+ PSI' },
                  ].map(opt => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      selected={config.pressureRange === opt.id as any}
                      onClick={() => set('pressureRange', opt.id as any)}
                      badge={opt.psi}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-black uppercase italic text-white">Volume / Speed?</h2>
                <p className="mb-6 text-sm text-alkota-silver">How quickly do you need to shift water?</p>
                <div className="space-y-3">
                  {[
                    { id: 'low', label: 'Low — Single operator, detail work', lpm: 'up to 10 LPM' },
                    { id: 'medium', label: 'Medium — Standard wash bay use', lpm: '10–20 LPM' },
                    { id: 'high', label: 'High — Industrial throughput / drain jetting', lpm: '20+ LPM' },
                  ].map(opt => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      selected={config.flowRange === opt.id as any}
                      onClick={() => set('flowRange', opt.id as any)}
                      badge={opt.lpm}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Results */}
          {step === 4 && (
            <div>
              <h2 className="mb-8 text-2xl font-black uppercase italic text-white">
                Your Platinum <span className="text-alkota-orange">Recommendations.</span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {recommendations.map((m, idx) => (
                  <div
                    key={m.slug}
                    className={`border p-6 flex flex-col ${idx === 0 ? 'border-alkota-orange bg-alkota-orange/5' : 'border-alkota-iron bg-alkota-steel/30'}`}
                  >
                    {idx === 0 && (
                      <span className="mb-4 inline-block bg-alkota-orange px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                        Best Match
                      </span>
                    )}
                    <h3 className="mb-1 text-2xl font-black uppercase italic tracking-tight text-white">
                      Alkota {m.name}
                    </h3>
                    <p className="mb-4 text-xs text-alkota-steel font-bold uppercase tracking-wider">{m.tagline}</p>
                    <div className="mb-6 grid grid-cols-2 gap-3 border-t border-alkota-iron pt-4">
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-alkota-steel">Pressure</span>
                        <span className="text-lg font-black text-white">{m.pressure.toLocaleString()}<span className="text-[10px] ml-0.5 text-alkota-orange">PSI</span></span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-alkota-steel">Flow</span>
                        <span className="text-lg font-black text-white">{m.flow}<span className="text-[10px] ml-0.5 text-alkota-orange">GPM</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <Link
                        href={`/machines/${m.category}/${m.slug}`}
                        className="block w-full bg-alkota-orange py-3 text-center text-xs font-black uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-colors"
                      >
                        View Machine
                      </Link>
                      <Link
                        href="/quote"
                        className="block w-full border border-alkota-iron py-3 text-center text-xs font-bold uppercase tracking-widest text-alkota-steel hover:border-alkota-steel hover:text-white transition-colors"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 border border-alkota-iron bg-alkota-steel/20 p-6 text-center">
                <p className="mb-4 text-sm text-alkota-silver">
                  Not quite right? Our specialists will build anything to any spec.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 border border-alkota-orange bg-alkota-orange/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-alkota-orange hover:bg-alkota-orange hover:text-white transition-colors"
                >
                  Request a Bespoke Build <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-alkota-iron pt-8">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 border border-alkota-iron px-6 py-3 text-xs font-bold uppercase tracking-widest text-alkota-steel transition-all hover:border-alkota-steel hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 bg-alkota-orange px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-alkota-orange-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => { setStep(0); setConfig({ waterType: null, powerSource: null, application: null, pressureRange: null, flowRange: null }); }}
              className="border border-alkota-iron px-6 py-3 text-xs font-bold uppercase tracking-widest text-alkota-steel transition-all hover:border-alkota-steel hover:text-white"
            >
              Start Over
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
