'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import {
  ArrowRight, ArrowLeft, ChevronRight, CheckCircle2, Truck, Droplets,
  Zap, Settings, Palette, Users, Recycle, Package, Shield,
  AlertTriangle, Info, Building2, Tractor, Factory, Wind, MapPin,
  Flame, Copy, Check, Download, Send, X,
} from 'lucide-react';
import {
  UK_CHASSIS_OPTIONS,
  TRAILER_MACHINE_OPTIONS,
  WATER_STORAGE_OPTIONS,
  POWER_FUEL_OPTIONS,
  WATER_RECOVERY_OPTIONS,
  HOSE_STORAGE_OPTIONS,
  SITE_OPTIONS,
  FINISH_LIVERY_OPTIONS,
  APPLICATION_PRESETS,
  calculateTrailerWeights,
  calculateEndurance,
  assessTowVehicle,
  generateBuildCode,
  getDefaultConfiguration,
} from '@/lib/trailers/configurator-data';
import type { TrailerConfiguration, TrailerFormat, ConfigurationWeights } from '@/lib/trailers/types';

// ─── STEP DEFINITIONS ────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Operation', icon: Settings, desc: 'Your work context' },
  { id: 2, label: 'Format', icon: Truck, desc: 'Open deck or enclosed' },
  { id: 3, label: 'Chassis', icon: Truck, desc: 'Trailer size & MAM' },
  { id: 4, label: 'Machine', icon: Flame, desc: 'Alkota cleaning system' },
  { id: 5, label: 'Operators', icon: Users, desc: 'Single or dual gun' },
  { id: 6, label: 'Water', icon: Droplets, desc: 'Storage & endurance' },
  { id: 7, label: 'Power', icon: Zap, desc: 'Fuel & generator' },
  { id: 8, label: 'Recovery', icon: Recycle, desc: 'Wastewater treatment' },
  { id: 9, label: 'Hose & Storage', icon: Package, desc: 'Reels & vaults' },
  { id: 10, label: 'Site Options', icon: Shield, desc: 'Lighting & winterisation' },
  { id: 11, label: 'Finish', icon: Palette, desc: 'Livery & branding' },
  { id: 12, label: 'Weight Review', icon: Info, desc: 'Engineering validation' },
  { id: 13, label: 'Your Build', icon: CheckCircle2, desc: 'Summary & enquiry' },
];

// ─── PAYLOAD GAUGE ────────────────────────────────────────────────────────────

function PayloadGauge({ weights }: { weights: ConfigurationWeights }) {
  const pct = Math.min(weights.payload_utilization_pct, 110);
  const color =
    weights.weight_status === 'critical-overweight'
      ? '#EF4444'
      : weights.weight_status === 'warning'
      ? '#F59E0B'
      : '#FF6900';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">Payload / MAM</span>
        <span
          className="font-ibm-plex-mono text-[10px] font-bold"
          style={{ color }}
        >
          {weights.estimated_wet_weight_kg.toLocaleString()} / {weights.chassis_mam_kg.toLocaleString()} kg
        </span>
      </div>
      <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {weights.is_overweight && (
        <p className="text-red-400 text-[9px] font-ibm-plex-mono">
          ⚠ Configuration exceeds MAM by {Math.abs(weights.payload_margin_kg)}kg
        </p>
      )}
    </div>
  );
}

// ─── STEP CARD WRAPPER ────────────────────────────────────────────────────────

function StepCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-white leading-tight mb-1">
          {title}
        </h2>
        {subtitle && <p className="text-alkota-grey text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── OPTION TILE ──────────────────────────────────────────────────────────────

function OptionTile({
  selected, onClick, title, subtitle, badge, badgeColor, children, disabled,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left border p-4 transition-all duration-300 relative ${
        disabled
          ? 'opacity-40 cursor-not-allowed border-[#222]'
          : selected
          ? 'border-alkota-orange bg-alkota-orange/8 text-white'
          : 'border-alkota-iron hover:border-alkota-orange/40 text-alkota-grey hover:text-white'
      }`}
    >
      {badge && (
        <span
          className="absolute top-3 right-3 font-ibm-plex-mono text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border"
          style={{ color: badgeColor || '#FF6900', borderColor: `${badgeColor || '#FF6900'}40` }}
        >
          {badge}
        </span>
      )}
      <div className="pr-16">
        <p className="font-barlow-condensed text-lg font-bold uppercase italic leading-tight">{title}</p>
        {subtitle && <p className="text-[#777] text-xs mt-0.5 normal-case font-normal">{subtitle}</p>}
      </div>
      {children}
      {selected && (
        <CheckCircle2 className="absolute bottom-3 right-3 h-4 w-4 text-alkota-orange" />
      )}
    </button>
  );
}

// ─── MULTI-SELECT TILE ────────────────────────────────────────────────────────

function MultiSelectTile({
  selected, onClick, title, subtitle, weight,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  weight?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border p-4 transition-all duration-300 ${
        selected
          ? 'border-alkota-orange bg-alkota-orange/8 text-white'
          : 'border-alkota-iron hover:border-alkota-orange/30 text-alkota-grey'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 h-4 w-4 border shrink-0 flex items-center justify-center ${
            selected ? 'border-alkota-orange bg-alkota-orange' : 'border-[#444]'
          }`}
        >
          {selected && <Check className="h-2.5 w-2.5 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-barlow-condensed text-sm font-bold uppercase italic leading-tight text-white">{title}</p>
          {subtitle && <p className="text-[#777] text-[11px] mt-0.5 normal-case font-normal leading-snug">{subtitle}</p>}
        </div>
        {weight !== undefined && (
          <span className="font-ibm-plex-mono text-[9px] text-[#555] shrink-0">+{weight}kg</span>
        )}
      </div>
    </button>
  );
}

// ─── ENQUIRY FORM ─────────────────────────────────────────────────────────────

function EnquiryForm({
  buildCode,
  config,
  weights,
  onClose,
  onSuccess,
}: {
  buildCode: string;
  config: TrailerConfiguration;
  weights: ConfigurationWeights;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', postcode: '', expectedStart: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Please complete name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/trailers/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          build_code: buildCode,
          contact: { ...form },
          weights,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Submission failed');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'name', label: 'Full Name', placeholder: 'Your name', span: 2 },
          { key: 'company', label: 'Company', placeholder: 'Company name', span: 1 },
          { key: 'postcode', label: 'Postcode', placeholder: 'e.g. PR1 3JJ', span: 1 },
          { key: 'email', label: 'Email', placeholder: 'your@email.com', span: 1 },
          { key: 'phone', label: 'Phone', placeholder: '07...' , span: 1 },
          { key: 'expectedStart', label: 'Expected Start', placeholder: 'e.g. Q1 2026', span: 2 },
          { key: 'notes', label: 'Any Notes', placeholder: 'Site conditions, access, specific requirements...', span: 2 },
        ].map(({ key, label, placeholder, span }) => (
          <div key={key} className={span === 2 ? 'col-span-2' : 'col-span-1'}>
            <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-1.5">
              {label}
            </label>
            {key === 'notes' ? (
              <textarea
                value={form[key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                rows={3}
                className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange resize-none"
              />
            ) : (
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-xs font-ibm-plex-mono border border-red-900/40 bg-red-950/20 px-3 py-2">
          {error}
        </p>
      )}

      <p className="text-[#444] text-[11px] leading-relaxed">
        Your complete build specification (Build Code {buildCode}) will be attached to this enquiry automatically. Our engineering team will respond within 1–2 working days.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-alkota-iron py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] hover:text-white hover:border-[#444] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-alkota-orange py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? 'Sending...' : <><Send className="h-3 w-3" /> Send to Alkota Engineering</>}
        </button>
      </div>
    </form>
  );
}

// ─── MAIN CONFIGURATOR COMPONENT ─────────────────────────────────────────────

function TrailerConfiguratorInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<TrailerConfiguration>(getDefaultConfiguration());
  const [buildCode] = useState(generateBuildCode);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadCode, setLoadCode] = useState('');
  const [loadError, setLoadError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Operational context state
  const [opContext, setOpContext] = useState({
    industry: '',
    dirtType: '',
    runHours: '',
    requiresSteam: false,
    requiresRecovery: false,
  });
  const [towCapacity, setTowCapacity] = useState('');

  // Apply URL preset on mount
  useEffect(() => {
    const preset = searchParams.get('preset');
    const format = searchParams.get('format') as TrailerFormat | null;

    if (preset) {
      const found = APPLICATION_PRESETS.find(p => p.slug === preset);
      if (found) {
        setConfig(c => ({
          ...c,
          format: found.recommendedFormat,
          chassis_id: found.recommendedChassisId,
          machine_id: found.recommendedMachineId,
          water_storage_id: found.recommendedTankId,
          recovery_option_id: found.recommendedRecoveryId,
          operator_count: found.recommendedOperators,
          operational_context: { industry: found.industry },
        }));
        setStep(2);
        return;
      }
    }

    if (format === 'open-deck' || format === 'enclosed') {
      setConfig(c => ({
        ...c,
        format,
        chassis_id: format === 'enclosed' ? 'chassis-tandem-2700-enclosed' : 'chassis-tandem-2700-open',
      }));
      setStep(2);
    }
  }, [searchParams]);

  const weights = calculateTrailerWeights(config);
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === config.machine_id);
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === config.water_storage_id);
  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === config.chassis_id);
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === config.recovery_option_id);
  const endurance = machine && tank
    ? calculateEndurance(tank.litres, machine.flow_lpm, config.operator_count)
    : null;
  const towAssessment = assessTowVehicle(
    towCapacity ? parseInt(towCapacity) : undefined,
    weights.chassis_mam_kg
  );

  const updateConfig = useCallback((updates: Partial<TrailerConfiguration>) => {
    setConfig(c => ({ ...c, ...updates }));
  }, []);

  const togglePowerOption = (id: string) => {
    setConfig(c => ({
      ...c,
      power_options: c.power_options.includes(id)
        ? c.power_options.filter(p => p !== id)
        : [...c.power_options, id],
    }));
  };

  const toggleHoseOption = (id: string) => {
    setConfig(c => ({
      ...c,
      hose_storage_options: c.hose_storage_options.includes(id)
        ? c.hose_storage_options.filter(h => h !== id)
        : [...c.hose_storage_options, id],
    }));
  };

  const toggleSiteOption = (id: string) => {
    setConfig(c => ({
      ...c,
      site_options: c.site_options.includes(id)
        ? c.site_options.filter(s => s !== id)
        : [...c.site_options, id],
    }));
  };

  const copyBuildCode = () => {
    navigator.clipboard.writeText(buildCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveBuild = async () => {
    await fetch('/api/trailers/build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...config, build_code: buildCode, weights }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const loadBuild = async () => {
    if (!loadCode.trim()) return;
    setLoadError('');
    const res = await fetch(`/api/trailers/build?code=${encodeURIComponent(loadCode.trim())}`);
    if (!res.ok) {
      setLoadError('Build not found. Check the code and try again.');
      return;
    }
    const data = await res.json();
    setConfig({
      build_code: data.build_code,
      format: data.format,
      chassis_id: data.chassis_id,
      machine_id: data.machine_id,
      operator_count: data.operator_count,
      water_storage_id: data.water_storage_id,
      power_options: data.power_options || [],
      recovery_option_id: data.recovery_option_id,
      hose_storage_options: data.hose_storage_options || [],
      site_options: data.site_options || [],
      finish_livery_id: data.finish_livery_id,
      operational_context: data.operational_context,
    });
    setStep(1);
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/trailers/build/${buildCode}`
    : '';

  // Filtered chassis for selected format
  const availableChassis = UK_CHASSIS_OPTIONS.filter(c => c.format === config.format);

  // Filtered machines for selected format (dual op only if chassis supports it)
  const availableMachines = TRAILER_MACHINE_OPTIONS;

  // Finishes filtered by format
  const availableFinishes = FINISH_LIVERY_OPTIONS.filter(f => f.format === config.format);

  const canProceed = (() => {
    if (step === 3 && !config.chassis_id) return false;
    if (step === 4 && !config.machine_id) return false;
    if (step === 6 && !config.water_storage_id) return false;
    if (step === 8 && !config.recovery_option_id) return false;
    if (step === 11 && !config.finish_livery_id) return false;
    return true;
  })();

  const goNext = () => {
    if (step < 13 && canProceed) {
      setStep(s => s + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── STEP CONTENT ─────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      // ── STEP 1: OPERATION ───────────────────────────────────────────────────
      case 1:
        return (
          <StepCard title="Your Operation" subtitle="Tell us about the work. This helps us surface the most relevant options.">
            <div className="space-y-4">
              <div>
                <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-2">
                  Primary Industry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: 'fleet-logistics', l: 'Commercial Fleet / Haulage' },
                    { v: 'construction', l: 'Construction & Plant' },
                    { v: 'agriculture', l: 'Agriculture & Estates' },
                    { v: 'municipal', l: 'Municipal & Highways' },
                    { v: 'environmental', l: 'Environmental Specialist' },
                    { v: 'contract-cleaning', l: 'Contract Cleaning' },
                    { v: 'facilities', l: 'Facilities Management' },
                    { v: 'other', l: 'Other Industrial' },
                  ].map(({ v, l }) => (
                    <button
                      key={v}
                      onClick={() => setOpContext(c => ({ ...c, industry: v }))}
                      className={`text-left px-3 py-2.5 border text-xs font-medium transition-all duration-200 ${
                        opContext.industry === v
                          ? 'border-alkota-orange bg-alkota-orange/8 text-white'
                          : 'border-alkota-iron text-alkota-grey hover:border-alkota-orange/30'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-2">
                  Main Type of Contamination
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Oil & Grease', 'Mud & Dirt', 'Road Film & Grime', 'Bitumen & Tar', 'Chewing Gum / Graffiti', 'Food & Organic', 'Salt & Mineral Deposits', 'Mixed / General'].map(d => (
                    <button
                      key={d}
                      onClick={() => setOpContext(c => ({ ...c, dirtType: d }))}
                      className={`text-left px-3 py-2.5 border text-xs font-medium transition-all duration-200 ${
                        opContext.dirtType === d
                          ? 'border-alkota-orange bg-alkota-orange/8 text-white'
                          : 'border-alkota-iron text-alkota-grey hover:border-alkota-orange/30'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-2">
                    Need Steam (150°C+)?
                  </label>
                  <div className="flex gap-2">
                    {[{ v: false, l: 'No' }, { v: true, l: 'Yes' }].map(({ v, l }) => (
                      <button
                        key={l}
                        onClick={() => setOpContext(c => ({ ...c, requiresSteam: v }))}
                        className={`flex-1 py-2.5 border text-xs font-bold uppercase tracking-widest transition-all ${
                          opContext.requiresSteam === v
                            ? 'border-alkota-orange bg-alkota-orange/8 text-alkota-orange'
                            : 'border-alkota-iron text-[#666] hover:border-alkota-orange/30'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-2">
                    Need Wastewater Recovery?
                  </label>
                  <div className="flex gap-2">
                    {[{ v: false, l: 'No' }, { v: true, l: 'Yes' }].map(({ v, l }) => (
                      <button
                        key={l}
                        onClick={() => setOpContext(c => ({ ...c, requiresRecovery: v }))}
                        className={`flex-1 py-2.5 border text-xs font-bold uppercase tracking-widest transition-all ${
                          opContext.requiresRecovery === v
                            ? 'border-alkota-orange bg-alkota-orange/8 text-alkota-orange'
                            : 'border-alkota-iron text-[#666] hover:border-alkota-orange/30'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application presets */}
              <div className="pt-4 border-t border-alkota-iron">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-3">
                  Or start from a curated application preset:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {APPLICATION_PRESETS.map(preset => (
                    <button
                      key={preset.slug}
                      onClick={() => {
                        setConfig(c => ({
                          ...c,
                          format: preset.recommendedFormat,
                          chassis_id: preset.recommendedChassisId,
                          machine_id: preset.recommendedMachineId,
                          water_storage_id: preset.recommendedTankId,
                          recovery_option_id: preset.recommendedRecoveryId,
                          operator_count: preset.recommendedOperators,
                          operational_context: { industry: preset.industry },
                        }));
                        setOpContext(c => ({ ...c, industry: preset.industry }));
                        setStep(2);
                      }}
                      className="w-full text-left border border-alkota-iron bg-[#111] px-4 py-3 hover:border-alkota-orange/40 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-barlow-condensed text-sm font-bold uppercase italic text-white">{preset.title}</p>
                          <p className="text-[#666] text-xs mt-0.5">{preset.tagline}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[#444] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 2: FORMAT ──────────────────────────────────────────────────────
      case 2:
        return (
          <StepCard title="Trailer Format" subtitle="The fundamental architecture of your mobile cleaning system.">
            <div className="space-y-4">
              {(['open-deck', 'enclosed'] as TrailerFormat[]).map(fmt => {
                const isOpen = fmt === 'open-deck';
                return (
                  <OptionTile
                    key={fmt}
                    selected={config.format === fmt}
                    onClick={() => {
                      const defaultChassis = isOpen ? 'chassis-tandem-2700-open' : 'chassis-tandem-2700-enclosed';
                      const defaultFinish = isOpen ? 'finish-open-galvanised' : 'finish-enclosed-white-clean';
                      updateConfig({ format: fmt, chassis_id: defaultChassis, finish_livery_id: defaultFinish });
                    }}
                    title={isOpen ? 'Open Deck System' : 'Enclosed Mobile Plant Room'}
                    subtitle={isOpen
                      ? 'Maximum equipment access. Flexible deck layout. Multi-operator friendly.'
                      : 'Weatherproof. High-security. Professional fleet presence. Internal plant room.'}
                  >
                    <div className="mt-3 pt-3 border-t border-[#1A1A1A]">
                      <div className="grid grid-cols-3 gap-x-4 text-xs text-[#666]">
                        {(isOpen
                          ? ['Full 360° access', 'Lower tare weight', 'Rapid deployment']
                          : ['All-weather operation', 'Secure & lockable', 'Corporate livery']
                        ).map(pt => (
                          <span key={pt} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-alkota-orange shrink-0" />
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </OptionTile>
                );
              })}

              <div className="border border-alkota-iron bg-[#0D0D0D] p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                  <p className="text-alkota-grey text-xs leading-relaxed">
                    Open Deck systems work well for access, flexibility, and lower unladen weight. Enclosed Plant Rooms suit weatherproofing, security, branding, and integrated water recovery. You can explore both before deciding.
                  </p>
                </div>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 3: CHASSIS ─────────────────────────────────────────────────────
      case 3:
        return (
          <StepCard title="Chassis & Size" subtitle="All UK Type Approved. Select the trailer frame that matches your payload and towing envelope.">
            <div className="space-y-3">
              {availableChassis.map(ch => (
                <OptionTile
                  key={ch.id}
                  selected={config.chassis_id === ch.id}
                  onClick={() => updateConfig({ chassis_id: ch.id })}
                  title={ch.name}
                  subtitle={`MAM ${ch.mam_kg.toLocaleString()}kg · Deck ${Math.round(ch.deck_length_mm / 10)}cm × ${Math.round(ch.deck_width_mm / 10)}cm · Max ${ch.max_tank_litres.toLocaleString()}L water`}
                >
                  <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                    <p className="text-[#666] text-[11px] leading-relaxed">{ch.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ch.suitable_for.slice(0, 3).map(sf => (
                        <span key={sf} className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] border border-[#222] px-2 py-0.5">
                          {sf}
                        </span>
                      ))}
                    </div>
                  </div>
                </OptionTile>
              ))}

              <div className="border border-alkota-iron p-4 mt-2">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-3">Quick Tow Vehicle Check</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={towCapacity}
                    onChange={e => setTowCapacity(e.target.value)}
                    placeholder="Braked towing capacity (kg)"
                    className="flex-1 bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
                  />
                </div>
                {towCapacity && (
                  <p className={`mt-2 text-xs font-ibm-plex-mono ${towAssessment.is_compatible ? 'text-green-400' : 'text-red-400'}`}>
                    {towAssessment.is_compatible ? '✓' : '⚠'} {towAssessment.status_message}
                  </p>
                )}
                <p className="text-[#444] text-[10px] mt-2 leading-relaxed">
                  Check your V5C logbook or manufacturer spec. This is indicative only — the final tow vehicle suitability must be confirmed before order.
                </p>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 4: MACHINE ─────────────────────────────────────────────────────
      case 4:
        return (
          <StepCard title="Alkota Cleaning Machine" subtitle="Select the heart of your mobile cleaning system. All machines are UK-supplied Alkota equipment.">
            <div className="space-y-3">
              {availableMachines.map(m => {
                const machineWeightOk = (weights.chassis_tare_kg + m.dry_weight_kg) < (chassis?.mam_kg || 9999);
                const isRecommended = opContext.requiresSteam
                  ? m.category === 'steam'
                  : opContext.dirtType?.includes('Oil') || opContext.dirtType?.includes('Grease')
                  ? m.category === 'hot-water'
                  : false;

                return (
                  <OptionTile
                    key={m.id}
                    selected={config.machine_id === m.id}
                    onClick={() => updateConfig({ machine_id: m.id })}
                    title={m.name}
                    subtitle={`${m.pressure_bar} Bar · ${m.flow_lpm} LPM · ${m.max_temp_c}°C · ${m.dry_weight_kg}kg`}
                    badge={isRecommended ? 'RECOMMENDED' : undefined}
                  >
                    <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                      <p className="text-[#666] text-[11px] leading-relaxed mb-2">{m.description}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                        <span className="text-[#555]">Engine: <span className="text-[#888]">{m.engine_details.split(' ').slice(0, 4).join(' ')}</span></span>
                        <span className="text-[#555]">Dual Gun: <span className="text-[#888]">{m.dual_gun_capable ? 'Yes' : 'Not standard'}</span></span>
                      </div>
                      {!machineWeightOk && (
                        <p className="text-yellow-500 text-[10px] mt-2 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Machine weight may limit water payload on this chassis
                        </p>
                      )}
                    </div>
                  </OptionTile>
                );
              })}
            </div>
          </StepCard>
        );

      // ── STEP 5: OPERATORS ───────────────────────────────────────────────────
      case 5:
        return (
          <StepCard title="Operator Configuration" subtitle="How many operators will wash simultaneously from this single rig?">
            <div className="space-y-3">
              <OptionTile
                selected={config.operator_count === 1}
                onClick={() => updateConfig({ operator_count: 1 })}
                title="Single Operator"
                subtitle="Full machine output to one high-pressure lance. Maximum cutting power."
              />
              <OptionTile
                selected={config.operator_count === 2}
                onClick={() => updateConfig({ operator_count: 2 })}
                title="Dual Operator — Split Manifold"
                subtitle="Machine output split to two lances. Both operators work simultaneously from one machine."
                badge={machine?.dual_gun_capable ? 'SUPPORTED' : 'ENGINEERING REVIEW'}
                badgeColor={machine?.dual_gun_capable ? '#22C55E' : '#F59E0B'}
              >
                {!machine?.dual_gun_capable && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                    <p className="text-yellow-500/80 text-[11px] flex items-start gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      The selected machine is not rated for dual-gun output as standard. Alkota engineering will review compatibility before confirming this configuration.
                    </p>
                  </div>
                )}
              </OptionTile>

              {endurance && (
                <div className="border border-alkota-iron bg-[#0D0D0D] p-5">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-3">
                    Live Water Endurance Preview
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-barlow-condensed text-3xl font-black text-white">
                        {endurance.continuous_minutes}<span className="text-alkota-orange text-xl"> min</span>
                      </div>
                      <div className="font-ibm-plex-mono text-[9px] text-[#555] uppercase mt-1">Continuous trigger-on</div>
                    </div>
                    <div>
                      <div className="font-barlow-condensed text-3xl font-black text-white">
                        ~{endurance.typical_trigger_hours}<span className="text-alkota-orange text-xl"> hrs</span>
                      </div>
                      <div className="font-ibm-plex-mono text-[9px] text-[#555] uppercase mt-1">Typical working session</div>
                    </div>
                  </div>
                  <p className="text-[#444] text-[10px] mt-3 leading-relaxed">
                    Based on {tank?.litres}L tank at {machine?.flow_lpm} LPM with {config.operator_count === 2 ? '2 operators' : '1 operator'}. Actual duration varies with trigger time, refill cycles, and operating conditions.
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 6: WATER ───────────────────────────────────────────────────────
      case 6:
        return (
          <StepCard title="Water Storage" subtitle="Select onboard water capacity. All tanks are baffled for safe road transport.">
            <div className="space-y-3">
              {WATER_STORAGE_OPTIONS.filter(t => t.litres <= (chassis?.max_tank_litres || 2000)).map(t => {
                const waterMass = t.litres;
                const totalWithWater = weights.estimated_dry_weight_kg + waterMass - (tank?.litres || 0) - (tank?.hardware_weight_kg || 0) + t.litres + t.hardware_weight_kg;
                const willOverload = totalWithWater > (chassis?.mam_kg || 9999);

                return (
                  <OptionTile
                    key={t.id}
                    selected={config.water_storage_id === t.id}
                    onClick={() => !willOverload && updateConfig({ water_storage_id: t.id })}
                    title={t.litres === 0 ? 'Mains Fed — No Onboard Tank' : `${t.litres.toLocaleString()} Litres — ${t.litres.toLocaleString()}kg water mass`}
                    subtitle={t.litres === 0 ? 'CAT 5 air gap break tank only. Maximum payload for tools.' : `${t.gallons_uk} UK gal · ${t.material} · Hardware weight: ${t.hardware_weight_kg}kg`}
                    badge={willOverload ? 'EXCEEDS MAM' : undefined}
                    badgeColor={willOverload ? '#EF4444' : undefined}
                    disabled={willOverload}
                  >
                    <p className="text-[#666] text-[11px] mt-2">{t.description}</p>
                  </OptionTile>
                );
              })}

              {endurance && tank && tank.litres > 0 && machine && (
                <div className="border border-alkota-orange/30 bg-alkota-orange/5 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-4 w-4 text-alkota-orange" />
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">Water Endurance</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-barlow-condensed text-2xl font-black text-white">~{endurance.typical_trigger_hours} hrs</span>
                    <span className="text-alkota-grey text-xs">typical working session from full tank</span>
                  </div>
                  <p className="text-[#555] text-[10px] mt-1">
                    ({endurance.continuous_minutes} min continuous at {machine.flow_lpm} LPM)
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 7: POWER & FUEL ────────────────────────────────────────────────
      case 7:
        return (
          <StepCard title="Power & Fuel" subtitle="Select the power systems for your rig. Multiple options can be combined.">
            <div className="space-y-2">
              {POWER_FUEL_OPTIONS.filter(p => p.compatible_formats.includes(config.format)).map(p => (
                <MultiSelectTile
                  key={p.id}
                  selected={config.power_options.includes(p.id)}
                  onClick={() => togglePowerOption(p.id)}
                  title={p.name}
                  subtitle={p.description}
                  weight={p.weight_kg}
                />
              ))}
              <div className="border border-alkota-iron bg-[#0D0D0D] p-4 mt-2">
                <p className="text-[#555] text-[11px] leading-relaxed">
                  <span className="text-alkota-orange font-bold">Note: </span>
                  The 12V DC engine charging system is standard on all Alkota petrol or diesel machines. You only need a generator if running auxiliary 230V equipment such as vacuum recovery, workshop power tools, or dedicated scene lighting.
                </p>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 8: WATER RECOVERY ──────────────────────────────────────────────
      case 8:
        return (
          <StepCard title="Water Recovery & Treatment" subtitle="Environmental compliance and closed-loop water reuse. Critically important for urban, marine, and sensitive site operations.">
            <div className="space-y-3">
              {WATER_RECOVERY_OPTIONS.filter(r => {
                if (r.tier === 'closed-loop-recycle' && config.format !== 'enclosed') return false;
                return true;
              }).map(r => {
                const recoveryWeightOk = (weights.estimated_wet_weight_kg + r.weight_kg - (recovery?.weight_kg || 0)) <= (chassis?.mam_kg || 9999);
                return (
                  <OptionTile
                    key={r.id}
                    selected={config.recovery_option_id === r.id}
                    onClick={() => updateConfig({ recovery_option_id: r.id })}
                    title={r.name}
                    subtitle={r.tier === 'none' ? 'Standard discharge — requires approved site drainage' : `${r.weight_kg}kg · ${r.environmental_standard}`}
                    badge={
                      opContext.requiresRecovery && r.tier !== 'none' ? 'RECOMMENDED' :
                      r.tier === 'closed-loop-recycle' ? 'HALO SYSTEM' : undefined
                    }
                  >
                    {r.tier !== 'none' && (
                      <div className="mt-2 pt-2 border-t border-[#1A1A1A]">
                        <p className="text-[#666] text-[11px] leading-relaxed">{r.description}</p>
                        {r.filtration_stages && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {r.filtration_stages.map(s => (
                              <span key={s} className="font-ibm-plex-mono text-[8px] text-[#555] border border-[#222] px-2 py-0.5">{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </OptionTile>
                );
              })}

              {recovery?.tier !== 'none' && (
                <div className="border border-alkota-orange/20 bg-alkota-orange/5 p-4">
                  <p className="text-alkota-grey text-xs leading-relaxed">
                    Recovery integration connects to the <Link href="/water-treatment" className="text-alkota-orange underline">Alkota Water Treatment</Link> technology platform. For complex site assessments and Trade Effluent consent guidance, speak to the Alkota engineering team.
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 9: HOSE & STORAGE ──────────────────────────────────────────────
      case 9:
        return (
          <StepCard title="Hose Reels & Storage" subtitle="Select the hose management and tool storage configuration. Multiple items can be combined.">
            <div className="space-y-2">
              {HOSE_STORAGE_OPTIONS.map(h => (
                <MultiSelectTile
                  key={h.id}
                  selected={config.hose_storage_options.includes(h.id)}
                  onClick={() => toggleHoseOption(h.id)}
                  title={h.name}
                  subtitle={h.description}
                  weight={h.weight_kg}
                />
              ))}
            </div>
          </StepCard>
        );

      // ── STEP 10: SITE OPTIONS ───────────────────────────────────────────────
      case 10:
        return (
          <StepCard title="Site & Work Options" subtitle="Additional operational equipment. Select all that apply to your working conditions.">
            <div className="space-y-2">
              {SITE_OPTIONS.map(s => (
                <MultiSelectTile
                  key={s.id}
                  selected={config.site_options.includes(s.id)}
                  onClick={() => toggleSiteOption(s.id)}
                  title={s.name}
                  subtitle={s.description}
                  weight={s.weight_kg}
                />
              ))}
            </div>
          </StepCard>
        );

      // ── STEP 11: FINISH & LIVERY ────────────────────────────────────────────
      case 11:
        return (
          <StepCard title="Finish & Corporate Branding" subtitle="Select the chassis finish and livery specification for your Alkota trailer.">
            <div className="space-y-3">
              {availableFinishes.map(f => (
                <OptionTile
                  key={f.id}
                  selected={config.finish_livery_id === f.id}
                  onClick={() => updateConfig({ finish_livery_id: f.id })}
                  title={f.name}
                  subtitle={f.description}
                  badge={f.tier === 'full-wrap' ? 'QUOTED SEPARATELY' : undefined}
                >
                  {f.color_hex && (
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="h-4 w-4 border border-[#333] inline-block shrink-0"
                        style={{ background: f.color_hex }}
                      />
                      <span className="text-[#666] text-[11px]">{f.color_name}</span>
                    </div>
                  )}
                </OptionTile>
              ))}

              {config.format === 'enclosed' && (
                <div className="border border-alkota-iron bg-[#0D0D0D] p-4">
                  <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-2">
                    Company Name for Livery (optional)
                  </label>
                  <input
                    type="text"
                    value={config.company_name_livery || ''}
                    onChange={e => updateConfig({ company_name_livery: e.target.value })}
                    placeholder="e.g. Acme Cleaning Ltd"
                    className="w-full bg-[#111] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
                  />
                  <p className="text-[#444] text-[10px] mt-2">
                    Final artwork, logo placement, and livery design are confirmed through the Alkota team following engineering review.
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 12: WEIGHT REVIEW ──────────────────────────────────────────────
      case 12:
        return (
          <StepCard title="Engineering Weight Review" subtitle="Live preliminary weight calculation based on your configuration. This is the foundation of your engineering discussion.">
            <div className="space-y-3">
              {[
                { label: 'Chassis Tare Weight', value: weights.chassis_tare_kg },
                { label: 'Alkota Machine (Dry)', value: weights.machine_dry_kg },
                { label: 'Water Tank Hardware', value: weights.water_tank_hardware_kg },
                { label: 'Max Water Mass (Full)', value: weights.water_mass_kg },
                { label: 'Power Systems', value: weights.power_options_kg },
                { label: 'Recovery Equipment', value: weights.recovery_equipment_kg },
                { label: 'Hose & Storage', value: weights.hose_storage_kg },
                { label: 'Site Options', value: weights.site_options_kg },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <span className="text-alkota-grey text-xs">{label}</span>
                  <span className="font-ibm-plex-mono text-xs text-white">{value.toLocaleString()} kg</span>
                </div>
              ))}

              <div className="border border-alkota-iron mt-2 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Estimated Dry Build</span>
                  <span className="font-ibm-plex-mono font-bold text-sm text-alkota-orange">{weights.estimated_dry_weight_kg.toLocaleString()} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Estimated Wet Build (Full Tank)</span>
                  <span className="font-ibm-plex-mono font-bold text-sm text-alkota-orange">{weights.estimated_wet_weight_kg.toLocaleString()} kg</span>
                </div>
                <div className="border-t border-alkota-iron pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Chassis MAM</span>
                    <span className="font-ibm-plex-mono font-bold text-sm text-white">{weights.chassis_mam_kg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666]">Payload Margin</span>
                    <span
                      className="font-ibm-plex-mono font-bold text-sm"
                      style={{ color: weights.is_overweight ? '#EF4444' : weights.weight_status === 'warning' ? '#F59E0B' : '#22C55E' }}
                    >
                      {weights.payload_margin_kg >= 0 ? '+' : ''}{weights.payload_margin_kg.toLocaleString()} kg
                    </span>
                  </div>
                </div>
              </div>

              {weights.is_overweight && (
                <div className="border border-red-900/50 bg-red-950/20 p-4">
                  <p className="text-red-400 text-xs font-ibm-plex-mono flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    This configuration exceeds the chassis Maximum Authorised Mass. To resolve: choose a larger chassis (e.g. 3,500kg Tandem), reduce the water tank size, or remove heavy options.
                  </p>
                </div>
              )}

              {weights.weight_status === 'warning' && !weights.is_overweight && (
                <div className="border border-yellow-900/50 bg-yellow-950/20 p-4">
                  <p className="text-yellow-400 text-xs font-ibm-plex-mono flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    Configuration is within {100 - weights.payload_utilization_pct}% of MAM. This leaves limited margin. Alkota engineering will review axle load distribution before finalising.
                  </p>
                </div>
              )}

              <div className="border border-[#1C1C1C] bg-[#0A0A0A] p-4">
                <p className="text-[#444] text-[11px] leading-relaxed">
                  <strong className="text-[#666]">Preliminary Configuration — Not a Production Specification.</strong>{' '}
                  All weights are calculated estimates. Final verified weights, axle load distribution, and road compliance are confirmed during Alkota Engineering Review. Weight data is subject to component-level variation and final build sign-off.
                </p>
              </div>

              {towCapacity && (
                <div className={`border p-3 text-xs font-ibm-plex-mono ${towAssessment.is_compatible ? 'border-green-900/50 text-green-400' : 'border-red-900/50 text-red-400'}`}>
                  {towAssessment.is_compatible ? '✓' : '⚠'} {towAssessment.status_message}
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 13: BUILD SUMMARY ──────────────────────────────────────────────
      case 13: {
        const finishOption = FINISH_LIVERY_OPTIONS.find(f => f.id === config.finish_livery_id);

        return (
          <div>
            {enquirySuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-3">
                  Build Sent to Alkota Engineering
                </h2>
                <p className="text-alkota-grey text-base max-w-md mx-auto mb-6">
                  Your build specification for {buildCode} has been sent to the Alkota UK engineering team. We will respond within 1–2 working days.
                </p>
                <p className="font-ibm-plex-mono text-sm text-alkota-orange">Build Code: {buildCode}</p>
              </div>
            ) : (
              <StepCard title="Your Alkota Build" subtitle="Preliminary engineering configuration summary.">
                {/* Build code hero */}
                <div className="border border-alkota-orange bg-alkota-orange/5 p-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Build Code</p>
                    <p className="font-ibm-plex-mono text-xl font-bold text-alkota-orange tracking-widest">{buildCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyBuildCode}
                      className="flex items-center gap-1.5 border border-alkota-iron px-3 py-1.5 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#666] hover:text-white hover:border-[#444] transition-all"
                    >
                      {copied ? <><Check className="h-3 w-3 text-green-400" />Copied</> : <><Copy className="h-3 w-3" />Copy</>}
                    </button>
                    <button
                      onClick={saveBuild}
                      className="flex items-center gap-1.5 border border-alkota-orange/50 px-3 py-1.5 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:bg-alkota-orange/10 transition-all"
                    >
                      {saved ? 'Saved ✓' : 'Save Build'}
                    </button>
                  </div>
                </div>

                {/* Config summary */}
                <div className="space-y-2 mb-6">
                  {[
                    { label: 'Format', value: config.format === 'open-deck' ? 'Open Deck System' : 'Enclosed Mobile Plant Room' },
                    { label: 'Chassis', value: chassis?.name || '—' },
                    { label: 'Machine', value: machine?.name || '—' },
                    { label: 'Output', value: machine ? `${machine.pressure_bar} Bar · ${machine.flow_lpm} LPM · ${machine.max_temp_c}°C` : '—' },
                    { label: 'Operators', value: `${config.operator_count} operator${config.operator_count > 1 ? 's' : ''}` },
                    { label: 'Water Storage', value: tank ? (tank.litres === 0 ? 'Mains-Fed Only' : `${tank.litres.toLocaleString()} Litres`) : '—' },
                    { label: 'Water Endurance', value: endurance && endurance.continuous_minutes > 0 ? `~${endurance.typical_trigger_hours} hrs working session` : 'Mains-fed — continuous' },
                    { label: 'Recovery', value: recovery?.name || '—' },
                    { label: 'Finish', value: finishOption?.name || '—' },
                    { label: 'Estimated Dry', value: `${weights.estimated_dry_weight_kg.toLocaleString()} kg` },
                    { label: 'Estimated Wet (Full)', value: `${weights.estimated_wet_weight_kg.toLocaleString()} kg` },
                    { label: 'Chassis MAM', value: `${weights.chassis_mam_kg.toLocaleString()} kg` },
                    { label: 'Payload Margin', value: `${weights.payload_margin_kg >= 0 ? '+' : ''}${weights.payload_margin_kg.toLocaleString()} kg` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between border-b border-[#1A1A1A] pb-2 gap-4">
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] shrink-0 w-28">{label}</span>
                      <span className="text-alkota-silver text-xs text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Share */}
                <div className="border border-alkota-iron bg-[#0D0D0D] p-4 mb-4">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Share This Build</p>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-[#111] border border-[#1A1A1A] text-[#666] px-3 py-2 font-inter text-[11px] focus:outline-none"
                    />
                    <button
                      onClick={() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className="border border-alkota-iron px-3 py-2 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#666] hover:text-white transition-all shrink-0"
                    >
                      {copied ? 'Copied' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {weights.is_overweight && (
                  <div className="border border-red-900/50 bg-red-950/20 p-4 mb-4">
                    <p className="text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      This configuration exceeds the chassis MAM. Please go back and adjust the water storage or chassis before requesting an engineering review.
                    </p>
                  </div>
                )}

                {/* Enquiry CTA */}
                {!showEnquiry ? (
                  <button
                    onClick={() => setShowEnquiry(true)}
                    disabled={weights.is_overweight}
                    className="w-full bg-alkota-orange py-4 font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send to Alkota Engineering
                  </button>
                ) : (
                  <div className="border border-alkota-iron p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-barlow-condensed text-lg font-bold uppercase italic text-white">Engineering Review Request</h4>
                      <button onClick={() => setShowEnquiry(false)} className="text-[#555] hover:text-white transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <EnquiryForm
                      buildCode={buildCode}
                      config={config}
                      weights={weights}
                      onClose={() => setShowEnquiry(false)}
                      onSuccess={() => { setShowEnquiry(false); setEnquirySuccess(true); }}
                    />
                  </div>
                )}
              </StepCard>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <main className="bg-alkota-black min-h-screen">
      <Navigation />

      {/* ─── CONFIGURATOR MASTHEAD ──────────────────────────────────────────── */}
      <div className="border-b border-alkota-iron bg-alkota-black pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/trailers" className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs mb-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Alkota Trailers
            </Link>
            <h1 className="font-barlow-condensed text-2xl font-black uppercase italic text-white">
              Build Your Alkota
            </h1>
          </div>

          {/* Load build */}
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              value={loadCode}
              onChange={e => setLoadCode(e.target.value.toUpperCase())}
              placeholder="Load build code (AKT-XXXXXX-UK)"
              className="bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2 font-ibm-plex-mono text-[11px] w-56 focus:outline-none focus:border-alkota-orange uppercase"
            />
            <button
              onClick={loadBuild}
              className="border border-alkota-iron px-3 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] hover:text-white hover:border-[#444] transition-all"
            >
              Load
            </button>
            {loadError && <p className="text-red-400 text-[10px] font-ibm-plex-mono">{loadError}</p>}
          </div>
        </div>

        {/* Step rail */}
        <div className="border-t border-alkota-iron overflow-x-auto">
          <div className="flex max-w-7xl mx-auto px-6">
            {STEPS.map((s, i) => {
              const isActive = step === s.id;
              const isDone = step > s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => isDone && setStep(s.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all text-left shrink-0 ${
                    isActive
                      ? 'border-alkota-orange text-white'
                      : isDone
                      ? 'border-transparent text-alkota-grey hover:text-white cursor-pointer'
                      : 'border-transparent text-[#333] cursor-default'
                  }`}
                >
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black font-ibm-plex-mono shrink-0 ${
                    isActive ? 'bg-alkota-orange text-white' :
                    isDone ? 'bg-[#1C1C1C] text-alkota-orange' :
                    'bg-[#111] text-[#333]'
                  }`}>
                    {isDone ? '✓' : s.id}
                  </span>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest whitespace-nowrap hidden sm:block">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONFIGURATOR LAYOUT ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: Visual Preview */}
        <div className="lg:col-span-7 lg:sticky lg:top-8">
          <div className="relative bg-[#090909] border border-alkota-iron aspect-[4/3] overflow-hidden">
            {/* Machine name badge */}
            {machine && (
              <div className="absolute top-4 left-4 z-20 bg-alkota-black/90 border border-alkota-iron px-3 py-1.5 backdrop-blur-sm">
                <p className="font-ibm-plex-mono text-[8px] text-alkota-orange uppercase tracking-widest">Selected Machine</p>
                <p className="font-barlow-condensed text-sm font-bold uppercase italic text-white">{machine.model_code}</p>
              </div>
            )}

            {/* Format badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.3em] text-alkota-orange border border-alkota-orange px-2.5 py-1 bg-alkota-black/80">
                {config.format === 'open-deck' ? 'Open Deck' : 'Enclosed Plant Room'}
              </span>
            </div>

            {/* Main rig visual */}
            <img
              src={machine?.image_url || '/assets/products/trailer-single.png'}
              alt="Alkota Trailer Configuration Preview"
              className="w-full h-full object-contain p-8"
            />

            {/* Water level indicator */}
            {tank && tank.litres > 0 && (
              <div className="absolute bottom-4 left-4 z-20 bg-alkota-black/90 border border-alkota-iron px-3 py-2 backdrop-blur-sm">
                <p className="font-ibm-plex-mono text-[7px] text-[#555] uppercase tracking-widest mb-0.5">Water Storage</p>
                <div className="flex items-center gap-2">
                  <Droplets className="h-3.5 w-3.5 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">{tank.litres.toLocaleString()} L</span>
                  <span className="text-[#555] text-[10px]">/ {tank.litres.toLocaleString()} kg</span>
                </div>
              </div>
            )}

            {/* Recovery indicator */}
            {recovery && recovery.tier !== 'none' && (
              <div className="absolute bottom-4 right-4 z-20 bg-alkota-black/90 border border-green-900/60 px-3 py-2 backdrop-blur-sm">
                <p className="font-ibm-plex-mono text-[7px] text-green-400 uppercase tracking-widest mb-0.5">Recovery</p>
                <div className="flex items-center gap-2">
                  <Recycle className="h-3.5 w-3.5 text-green-400" />
                  <span className="font-ibm-plex-mono text-[10px] text-green-400 font-bold">Active</span>
                </div>
              </div>
            )}

            {/* Dark overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Sticky build summary bar */}
          <div className="mt-4 border border-alkota-iron bg-[#0A0A0A] p-4 space-y-3">
            <PayloadGauge weights={weights} />

            <div className="grid grid-cols-3 gap-4 text-center pt-1 border-t border-[#1A1A1A]">
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Dry Build</p>
                <p className="font-barlow-condensed text-lg font-black text-white">{weights.estimated_dry_weight_kg.toLocaleString()} <span className="text-xs text-[#555]">kg</span></p>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Wet Build</p>
                <p className="font-barlow-condensed text-lg font-black text-white">{weights.estimated_wet_weight_kg.toLocaleString()} <span className="text-xs text-[#555]">kg</span></p>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Endurance</p>
                <p className="font-barlow-condensed text-lg font-black text-alkota-orange">
                  {endurance && endurance.continuous_minutes > 0 ? `~${endurance.typical_trigger_hours}h` : '∞'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Configuration Controls */}
        <div className="lg:col-span-5" ref={scrollRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {step < 13 && (
            <div className="mt-8 flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 border border-alkota-iron px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] hover:text-white hover:border-[#444] transition-all"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              )}
              <button
                onClick={goNext}
                disabled={!canProceed}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                  canProceed
                    ? 'bg-alkota-orange text-white hover:bg-alkota-orange/90'
                    : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
                }`}
              >
                {step === 12 ? 'Review My Build' : 'Continue'}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Step indicator */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444]">
              Step {step} of {STEPS.length}
            </span>
            <div className="flex gap-1">
              {STEPS.map(s => (
                <div
                  key={s.id}
                  className={`h-0.5 w-4 transition-all duration-300 ${
                    step >= s.id ? 'bg-alkota-orange' : 'bg-[#1A1A1A]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TrailerConfiguratorPage() {
  return (
    <div className="bg-alkota-black min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-alkota-black text-white font-ibm-plex-mono text-xs uppercase tracking-widest">
          Loading Alkota Trailer Configurator...
        </div>
      }>
        <TrailerConfiguratorInner />
      </Suspense>
    </div>
  );
}
