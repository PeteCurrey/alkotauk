'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import {
  ArrowRight, ArrowLeft, ChevronRight, CheckCircle2, Truck, Droplets,
  Zap, Settings, Palette, Users, Recycle, Package, Shield,
  AlertTriangle, Info, Flame, Copy, Check, Download, Send, X,
  Printer, RefreshCw, HelpCircle, Scale, Sparkles, FileText, PoundSterling
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
  STARTING_CONFIGURATIONS,
  APPLICATION_PRESETS,
  calculateTrailerWeights,
  calculateEndurance,
  assessTowVehicle,
  generateBuildCode,
  getDefaultConfiguration,
  validateTrailerConfiguration,
  reconcileTrailerConfiguration,
  calculateCommercialValue,
  calculateOpportunityScore,
  CONFIGURATOR_SCHEMA_VERSION,
} from '@/lib/trailers/configurator-data';
import type {
  TrailerConfiguration,
  TrailerFormat,
  ConfigurationWeights,
  ConfigurationValidationResult,
  ValidationIssue,
  StartingConfiguration,
} from '@/lib/trailers/types';

// ─── STEP DEFINITIONS ────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Start / Operation', icon: Settings, desc: 'Proven spec or scratch' },
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
  { id: 13, label: 'Your Build', icon: CheckCircle2, desc: 'Summary & quotation' },
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
        <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
          Payload / MAM ({weights.confidence_status === 'verified' ? 'Verified Data' : 'Estimated Data'})
        </span>
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
        <p className="text-red-400 text-[9px] font-ibm-plex-mono font-bold">
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
        {subtitle && <p className="text-alkota-grey text-sm font-light">{subtitle}</p>}
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
          ? 'opacity-40 cursor-not-allowed border-[#222] bg-[#0A0A0A]'
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

// ─── ENQUIRY & QUOTATION FORM ────────────────────────────────────────────────

function EnquiryForm({
  buildCode,
  config,
  weights,
  commercialValue,
  onClose,
  onSuccess,
}: {
  buildCode: string;
  config: TrailerConfiguration;
  weights: ConfigurationWeights;
  commercialValue: ReturnType<typeof calculateCommercialValue>;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    postcode: '',
    timeline: '1–3 Months',
    commercialIntent: 'request_quote' as 'engineering_review' | 'request_quote',
    targetBudget: '£25k–£50k',
    purchaseDriver: 'New Commercial Contract',
    replacingExisting: 'No',
    notes: '',
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.postcode) {
      setError('Please provide your full name, email, phone number, and UK postcode.');
      return;
    }
    if (!form.consent) {
      setError('Please confirm consent for Alkota UK to contact you regarding this specification.');
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
          contact: {
            name: form.name.trim(),
            company: form.company.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            postcode: form.postcode.trim(),
            timeline: form.timeline,
            commercial_intent: form.commercialIntent,
            notes: form.notes.trim(),
            marketing_consent: form.consent,
          },
          operational_context: {
            ...config.operational_context,
            target_budget: form.targetBudget,
            purchase_driver: form.purchaseDriver,
            replacing_existing: form.replacingExisting,
          },
          weights,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Submission failed');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Network error submitting enquiry. Your configuration is preserved. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Intent Selector */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#111] border border-alkota-iron mb-2">
        <button
          type="button"
          onClick={() => setForm(f => ({ ...f, commercialIntent: 'request_quote' }))}
          className={`py-2.5 px-3 text-left font-ibm-plex-mono text-[10px] uppercase font-bold tracking-wider transition-all ${
            form.commercialIntent === 'request_quote'
              ? 'bg-alkota-orange text-white'
              : 'text-[#888] hover:text-white'
          }`}
        >
          Request Formal Quote
        </button>
        <button
          type="button"
          onClick={() => setForm(f => ({ ...f, commercialIntent: 'engineering_review' }))}
          className={`py-2.5 px-3 text-left font-ibm-plex-mono text-[10px] uppercase font-bold tracking-wider transition-all ${
            form.commercialIntent === 'engineering_review'
              ? 'bg-alkota-orange text-white'
              : 'text-[#888] hover:text-white'
          }`}
        >
          Engineering Review Only
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="John Smith"
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          />
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Company / Business Name
          </label>
          <input
            type="text"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Acme Logistics Ltd"
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          />
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            UK Postcode *
          </label>
          <input
            type="text"
            required
            value={form.postcode}
            onChange={e => setForm(f => ({ ...f, postcode: e.target.value.toUpperCase() }))}
            placeholder="e.g. PR1 3JJ"
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange uppercase"
          />
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="john@example.co.uk"
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          />
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Telephone / Mobile *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="07123 456789"
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          />
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Estimated Project Timeline
          </label>
          <select
            value={form.timeline}
            onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          >
            <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
            <option value="1–3 Months">1–3 Months</option>
            <option value="3–6 Months">3–6 Months</option>
            <option value="6–12 Months">6–12 Months</option>
            <option value="Budget Planning / Researching">Budget Planning / Researching</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Indicative Budget Bracket (Optional)
          </label>
          <select
            value={form.targetBudget}
            onChange={e => setForm(f => ({ ...f, targetBudget: e.target.value }))}
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          >
            <option value="Under £25k">Under £25k</option>
            <option value="£25k–£50k">£25k–£50k</option>
            <option value="£50k–£100k">£50k–£100k</option>
            <option value="£100k+">£100k+</option>
            <option value="Need Guidance">Need Alkota Guidance</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            What is driving this project? (Optional)
          </label>
          <select
            value={form.purchaseDriver}
            onChange={e => setForm(f => ({ ...f, purchaseDriver: e.target.value }))}
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
          >
            <option value="New Commercial Contract">Winning / Servicing a New Commercial Contract</option>
            <option value="Replacing Existing Washer/Trailer">Replacing Existing Pressure Washer or Outdated Trailer</option>
            <option value="Expanding Fleet Capacity">Expanding Internal Fleet Washing Capacity</option>
            <option value="Environmental Runoff Compliance">Site Environmental Runoff & Trade Effluent Compliance</option>
            <option value="Adding Multi-Operator Capability">Adding Dual-Operator Rapid Deployment Capability</option>
            <option value="Other">Other Industrial / Municipal Requirement</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
            Specific Operational Requirements / Notes
          </label>
          <textarea
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Describe site conditions, towing vehicle make/model, water access, or special equipment integrations..."
            rows={3}
            className="w-full bg-[#0D0D0D] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange resize-none"
          />
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="enquiry-consent"
          checked={form.consent}
          onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
          className="mt-1 accent-[#FF6900]"
        />
        <label htmlFor="enquiry-consent" className="text-alkota-grey text-[11px] leading-relaxed cursor-pointer font-light">
          I consent to Alkota UK storing these details to review and quote this bespoke trailer specification. We will never share your details with third parties.
        </label>
      </div>

      {error && (
        <div className="border border-red-900/50 bg-red-950/30 p-3">
          <p className="text-red-400 text-xs font-ibm-plex-mono">{error}</p>
        </div>
      )}

      <p className="text-[#555] text-[11px] leading-relaxed font-light">
        Your complete 13-step configuration (Build Code <strong className="text-alkota-orange">{buildCode}</strong>) will be attached automatically. Our UK team will evaluate the specification and return an itemised formal proposal.
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
          {submitting ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Transmitting...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              {form.commercialIntent === 'request_quote' ? 'Submit for Quotation' : 'Submit Engineering Review'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── MAIN CONFIGURATOR CONTAINER ─────────────────────────────────────────────

function TrailerConfiguratorInner() {
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<TrailerConfiguration>(getDefaultConfiguration);
  const [buildCode, setBuildCode] = useState(config.build_code);
  const [previewMode, setPreviewMode] = useState<'exterior' | 'interior'>('exterior');
  const [reconcileNotice, setReconcileNotice] = useState<string | null>(null);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadCode, setLoadCode] = useState('');
  const [loadError, setLoadError] = useState('');
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Operational questionnaire context
  const [opContext, setOpContext] = useState({
    industry: 'fleet-logistics',
    dirtType: 'Oil & Grease',
    requiresSteam: false,
    requiresRecovery: false,
  });
  const [towCapacity, setTowCapacity] = useState('');

  // 1. Initial load & URL params handler
  useEffect(() => {
    const preset = searchParams.get('preset');
    const startSlug = searchParams.get('start');
    const rawFormat = searchParams.get('format');
    const recoveryParam = searchParams.get('recovery');
    const operatorsParam = searchParams.get('operators');
    const appParam = searchParams.get('app');
    const loadParam = searchParams.get('load');

    // Auto-load build if load parameter provided
    if (loadParam) {
      setLoadCode(loadParam.toUpperCase());
      fetch(`/api/trailers/build?code=${encodeURIComponent(loadParam.trim())}`)
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data) {
            setConfig({
              schema_version: data.schema_version || CONFIGURATOR_SCHEMA_VERSION,
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
            setBuildCode(data.build_code);
            setStep(12);
          }
        })
        .catch(() => {});
      return;
    }

    // Starting configuration match
    const activeSlug = startSlug || preset;
    if (activeSlug) {
      const starting = STARTING_CONFIGURATIONS.find(s => s.slug === activeSlug);
      if (starting) {
        setConfig(c => ({
          ...c,
          format: starting.format,
          chassis_id: starting.chassis_id,
          machine_id: starting.machine_id,
          water_storage_id: starting.water_storage_id,
          recovery_option_id: starting.recovery_option_id,
          operator_count: starting.operator_count,
          power_options: starting.power_options,
          hose_storage_options: starting.hose_storage_options,
          site_options: starting.site_options,
          finish_livery_id: starting.finish_livery_id,
          operational_context: { industry: starting.ideal_for[0] },
        }));
        setStep(2);
        return;
      }
    }

    // Dynamic parameter composite
    let newFormat: TrailerFormat = 'open-deck';
    if (rawFormat === 'enclosed') newFormat = 'enclosed';
    else if (rawFormat === 'open' || rawFormat === 'open-deck') newFormat = 'open-deck';

    let opCount: 1 | 2 = 1;
    if (operatorsParam === '2') opCount = 2;

    let recoveryId = 'recovery-none';
    if (recoveryParam === 'true' || recoveryParam === 'vfs') {
      recoveryId = 'recovery-vfs-filtration';
    } else if (recoveryParam === 'closed-loop') {
      recoveryId = 'recovery-closed-loop-recycle';
      newFormat = 'enclosed';
    } else if (recoveryParam === 'vacuum') {
      recoveryId = 'recovery-vacgd-blower';
    }

    let defaultChassis = newFormat === 'enclosed' ? 'chassis-tandem-2700-enclosed' : 'chassis-tandem-2700-open';
    if (recoveryId === 'recovery-closed-loop-recycle') {
      defaultChassis = 'chassis-tandem-3500-enclosed';
    }

    let defaultMachine = opCount === 2 ? 'machine-ged-12v-4305' : 'machine-ged-12v-311';

    if (rawFormat || recoveryParam || operatorsParam || appParam) {
      setConfig(c => ({
        ...c,
        format: newFormat,
        chassis_id: defaultChassis,
        machine_id: defaultMachine,
        operator_count: opCount,
        recovery_option_id: recoveryId,
        operational_context: appParam ? { industry: appParam } : c.operational_context,
      }));
      setStep(2);
    }
  }, [searchParams]);

  // Calculations & Validations
  const weights = calculateTrailerWeights(config);
  const validation = validateTrailerConfiguration(config);
  const commercialValue = calculateCommercialValue(config);
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

  // Update Config with Cascading Reconciler
  const updateConfig = useCallback((updates: Partial<TrailerConfiguration>) => {
    setConfig(current => {
      const merged = { ...current, ...updates };
      const { updatedConfig, changeNotice } = reconcileTrailerConfiguration(merged);
      if (changeNotice) {
        setReconcileNotice(changeNotice);
        setTimeout(() => setReconcileNotice(null), 5000);
      }
      return updatedConfig;
    });
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
      schema_version: data.schema_version || CONFIGURATOR_SCHEMA_VERSION,
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
    setBuildCode(data.build_code);
    setStep(12);
  };

  const loadStartingSpec = (starting: StartingConfiguration) => {
    setConfig(c => ({
      ...c,
      format: starting.format,
      chassis_id: starting.chassis_id,
      machine_id: starting.machine_id,
      water_storage_id: starting.water_storage_id,
      recovery_option_id: starting.recovery_option_id,
      operator_count: starting.operator_count,
      power_options: starting.power_options,
      hose_storage_options: starting.hose_storage_options,
      site_options: starting.site_options,
      finish_livery_id: starting.finish_livery_id,
      operational_context: { industry: starting.ideal_for[0] },
    }));
    setStep(2);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/trailers/build/${buildCode}`
    : '';

  // Filtered options
  const availableChassis = UK_CHASSIS_OPTIONS.filter(c => c.format === config.format);
  const availableMachines = TRAILER_MACHINE_OPTIONS;
  const availableFinishes = FINISH_LIVERY_OPTIONS.filter(f => f.format === config.format);

  const canProceed = (() => {
    if (step === 3 && !config.chassis_id) return false;
    if (step === 4 && !config.machine_id) return false;
    if (step === 6 && !config.water_storage_id) return false;
    if (step === 8 && !config.recovery_option_id) return false;
    if (step === 11 && !config.finish_livery_id) return false;
    if (step === 12 && !validation.isValid) return false;
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
      // ── STEP 1: START / OPERATION ───────────────────────────────────────────
      case 1:
        return (
          <StepCard
            title="How would you like to begin?"
            subtitle="Start with a proven Alkota engineering direction, or build from scratch around your specific operation."
          >
            <div className="space-y-6">
              {/* Starting Configurations Grid */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                    Option A: Start with a Proven Direction (Recommended)
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {STARTING_CONFIGURATIONS.map(starting => (
                    <button
                      key={starting.id}
                      onClick={() => loadStartingSpec(starting)}
                      className="w-full text-left border border-alkota-iron bg-[#0D0D0D] p-4 hover:border-alkota-orange transition-all duration-300 group relative"
                    >
                      {starting.badge && (
                        <span className="absolute top-3 right-3 font-ibm-plex-mono text-[8px] font-bold uppercase tracking-widest text-alkota-orange border border-alkota-orange/40 bg-alkota-orange/10 px-2 py-0.5">
                          {starting.badge}
                        </span>
                      )}
                      <div className="pr-20">
                        <h4 className="font-barlow-condensed text-xl font-bold uppercase italic text-white group-hover:text-alkota-orange transition-colors">
                          {starting.name}
                        </h4>
                        <p className="text-alkota-grey text-xs mt-1 leading-relaxed font-light">
                          {starting.tagline}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-2">
                        <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-bold">
                          Guide: {starting.guide_price_display}
                        </span>
                        <span className="inline-flex items-center gap-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] group-hover:text-white transition-colors">
                          Customise This Direction <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Build from Scratch Divider */}
              <div className="pt-4 border-t border-alkota-iron">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-4 w-4 text-[#777]" />
                  <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                    Option B: Build from Scratch
                  </span>
                </div>

                <div className="space-y-4 bg-[#0A0A0A] border border-alkota-iron p-4">
                  <div>
                    <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-2">
                      Select Your Primary Sector / Industry
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { v: 'fleet-logistics', l: 'Commercial Fleet / Haulage' },
                        { v: 'construction', l: 'Construction & Quarrying' },
                        { v: 'agriculture', l: 'Agriculture & Forestry' },
                        { v: 'municipal', l: 'Municipal & Highways' },
                        { v: 'environmental', l: 'Environmental Specialist' },
                        { v: 'contract-cleaning', l: 'Contract Cleaning' },
                        { v: 'facilities', l: 'Facilities Management' },
                        { v: 'other', l: 'Other Industrial' },
                      ].map(({ v, l }) => (
                        <button
                          key={v}
                          onClick={() => {
                            setOpContext(c => ({ ...c, industry: v }));
                            setStep(2);
                          }}
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
                </div>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 2: FORMAT ──────────────────────────────────────────────────────
      case 2:
        return (
          <StepCard title="Trailer Format" subtitle="Select open chassis access or enclosed mobile plant room.">
            <div className="space-y-4">
              {(['open-deck', 'enclosed'] as TrailerFormat[]).map(fmt => {
                const isOpen = fmt === 'open-deck';
                return (
                  <OptionTile
                    key={fmt}
                    selected={config.format === fmt}
                    onClick={() => {
                      updateConfig({ format: fmt });
                    }}
                    title={isOpen ? 'Open Deck System' : 'Enclosed Mobile Plant Room'}
                    subtitle={isOpen
                      ? 'Maximum equipment access, lighter unladen tare weight, rapid multi-angle hose deployment.'
                      : 'All-weather protection, high-security lockable roller doors, enclosed plant room acoustics, and corporate branding panels.'}
                  >
                    <div className="mt-3 pt-3 border-t border-[#1A1A1A]">
                      <div className="grid grid-cols-3 gap-x-4 text-xs text-[#666]">
                        {(isOpen
                          ? ['Full 360° access', 'Lower unladen tare', 'Rapid deployment']
                          : ['All-weather operation', 'High-security locking', 'Full corporate livery']
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
                  <p className="text-alkota-grey text-xs leading-relaxed font-light">
                    Open Deck systems are optimal for heavy quarry, plant, and agricultural washdown. Enclosed Plant Rooms are recommended for specialist contractors requiring secure urban storage, winter frost protection, and closed-loop filtration.
                  </p>
                </div>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 3: CHASSIS ─────────────────────────────────────────────────────
      case 3:
        return (
          <StepCard title="UK Approved Chassis & Size" subtitle="All frames are UK Small Series / IVA approved for legal towing up to 60mph.">
            <div className="space-y-3">
              {availableChassis.map(ch => (
                <OptionTile
                  key={ch.id}
                  selected={config.chassis_id === ch.id}
                  onClick={() => updateConfig({ chassis_id: ch.id })}
                  title={ch.name}
                  subtitle={`MAM: ${ch.mam_kg.toLocaleString()}kg · Tare: ${ch.tare_weight_kg}kg · Max Payload: ${ch.max_payload_kg.toLocaleString()}kg · Max Tank: ${ch.max_tank_litres.toLocaleString()}L`}
                >
                  <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                    <p className="text-[#666] text-[11px] leading-relaxed mb-2">{ch.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ch.suitable_for.map(sf => (
                        <span key={sf} className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] border border-[#222] px-2 py-0.5">
                          {sf}
                        </span>
                      ))}
                    </div>
                  </div>
                </OptionTile>
              ))}

              <div className="border border-alkota-iron bg-[#0D0D0D] p-4 mt-2">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Optional Tow Vehicle Towing Check</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={towCapacity}
                    onChange={e => setTowCapacity(e.target.value)}
                    placeholder="e.g. 3500 (Vehicle braked towing capacity in kg)"
                    className="flex-1 bg-[#111] border border-alkota-iron text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
                  />
                </div>
                {towCapacity && (
                  <p className={`mt-2 text-xs font-ibm-plex-mono ${towAssessment.is_compatible ? 'text-green-400' : 'text-red-400'}`}>
                    {towAssessment.is_compatible ? '✓' : '⚠'} {towAssessment.status_message}
                  </p>
                )}
                <p className="text-[#444] text-[10px] mt-2 leading-relaxed">
                  Preliminary assessment only. Vehicle manufacturer tow ratings and gross train weights (GTW) must be verified prior to road use.
                </p>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 4: MACHINE ─────────────────────────────────────────────────────
      case 4:
        return (
          <StepCard title="Alkota Cleaning Machine" subtitle="Continuous industrial-duty skids built in South Dakota and assembled to UK specification.">
            <div className="space-y-3">
              {availableMachines.map(m => {
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
                    subtitle={`${m.pressure_bar} Bar (${m.pressure_psi} PSI) · ${m.flow_lpm} LPM · Max ${m.max_temp_c}°C · Dry Mass: ${m.dry_weight_kg}kg`}
                    badge={isRecommended ? 'RECOMMENDED' : undefined}
                  >
                    <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                      <p className="text-[#666] text-[11px] leading-relaxed mb-2">{m.description}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                        <span className="text-[#555]">Engine: <span className="text-[#888]">{m.engine_details.split(' ').slice(0, 4).join(' ')}</span></span>
                        <span className="text-[#555]">Dual Gun: <span className="text-[#888]">{m.dual_gun_capable ? 'Supported (17+ LPM)' : 'Single Lance Only'}</span></span>
                      </div>
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
          <StepCard title="Operator Configuration" subtitle="Configure single-gun full hydraulic impact or twin-operator split manifold.">
            <div className="space-y-3">
              <OptionTile
                selected={config.operator_count === 1}
                onClick={() => updateConfig({ operator_count: 1 })}
                title="Single Operator (1 × Lance)"
                subtitle={`Full machine delivery (${machine?.flow_lpm} LPM @ ${machine?.pressure_bar} Bar) direct to a single trigger gun.`}
              />
              <OptionTile
                selected={config.operator_count === 2}
                onClick={() => updateConfig({ operator_count: 2 })}
                title="Dual Operator (2 × Simultaneous Lances)"
                subtitle={`Split manifold delivery (~${((machine?.flow_lpm || 17) / 2).toFixed(1)} LPM per operator) allowing two operators to wash simultaneously.`}
                badge={machine?.dual_gun_capable ? 'SUPPORTED' : 'REQUIRES HIGH-FLOW MACHINE'}
                badgeColor={machine?.dual_gun_capable ? '#22C55E' : '#EF4444'}
              >
                {!machine?.dual_gun_capable && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                    <p className="text-yellow-500/90 text-[11px] flex items-start gap-1.5 font-light">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-yellow-500" />
                      Current machine produces {machine?.flow_lpm} LPM. Dual-operator washing requires 17+ LPM. Selecting this will automatically adjust the machine to a high-output model.
                    </p>
                  </div>
                )}
              </OptionTile>

              {endurance && (
                <div className="border border-alkota-iron bg-[#0D0D0D] p-5">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-3">
                    Theoretical Continuous Water Endurance
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
                      <div className="font-ibm-plex-mono text-[9px] text-[#555] uppercase mt-1">Typical working session (60% trigger)</div>
                    </div>
                  </div>
                  <p className="text-[#444] text-[10px] mt-3 leading-relaxed font-light">
                    Formula: {tank?.litres}L Tank ÷ {machine?.flow_lpm} LPM total flow. Actual endurance varies with operator trigger behaviour and site refill access.
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 6: WATER ───────────────────────────────────────────────────────
      case 6:
        return (
          <StepCard title="Baffled Water Storage" subtitle="Select onboard water volume. All tanks feature internal anti-surge baffles for safe UK road braking.">
            <div className="space-y-3">
              {WATER_STORAGE_OPTIONS.map(t => {
                const isOverChassisLimit = t.litres > (chassis?.max_tank_litres || 2000);

                return (
                  <OptionTile
                    key={t.id}
                    disabled={isOverChassisLimit}
                    selected={config.water_storage_id === t.id}
                    onClick={() => updateConfig({ water_storage_id: t.id })}
                    title={t.tank_type}
                    subtitle={`${t.litres === 0 ? 'Direct site feed only' : `${t.litres.toLocaleString()} Litres (${t.litres}kg water mass)`} · Hardware: ${t.hardware_weight_kg}kg`}
                    badge={isOverChassisLimit ? `EXCEEDS ${chassis?.name.split('—')[0].trim()} CAPACITY` : undefined}
                    badgeColor="#EF4444"
                  >
                    <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                      <p className="text-[#666] text-[11px] leading-relaxed">{t.description}</p>
                    </div>
                  </OptionTile>
                );
              })}
            </div>
          </StepCard>
        );

      // ── STEP 7: POWER ───────────────────────────────────────────────────────
      case 7:
        return (
          <StepCard title="Power & Fuel Configuration" subtitle="Select primary electrical and burner fuel systems for off-grid operations.">
            <div className="space-y-3">
              {POWER_FUEL_OPTIONS.map(p => {
                const isEnclosedOnly = p.id === 'power-gen-10kw-3ph' && config.format === 'open-deck';
                return (
                  <MultiSelectTile
                    key={p.id}
                    selected={config.power_options.includes(p.id)}
                    onClick={() => !isEnclosedOnly && togglePowerOption(p.id)}
                    title={p.name}
                    subtitle={isEnclosedOnly ? 'Requires Enclosed Mobile Plant Room' : p.description}
                    weight={p.weight_kg}
                  />
                );
              })}
            </div>
          </StepCard>
        );

      // ── STEP 8: RECOVERY ────────────────────────────────────────────────────
      case 8:
        return (
          <StepCard title="Water Recovery & Treatment" subtitle="Environmental compliance systems for vacuum capture and closed-loop wash water recycling.">
            <div className="space-y-3">
              {WATER_RECOVERY_OPTIONS.map(r => {
                const isClosedLoopOpen = r.id === 'recovery-closed-loop-recycle' && config.format === 'open-deck';
                const isClosedLoopLightChassis = r.id === 'recovery-closed-loop-recycle' && (chassis?.mam_kg || 0) < 3500;
                const isDisabled = isClosedLoopOpen || isClosedLoopLightChassis;

                return (
                  <OptionTile
                    key={r.id}
                    disabled={isDisabled}
                    selected={config.recovery_option_id === r.id}
                    onClick={() => updateConfig({ recovery_option_id: r.id })}
                    title={r.name}
                    subtitle={r.description}
                    badge={
                      isClosedLoopOpen
                        ? 'REQUIRES ENCLOSED PLANT ROOM'
                        : isClosedLoopLightChassis
                        ? 'REQUIRES 3,500KG CHASSIS'
                        : undefined
                    }
                    badgeColor="#EF4444"
                  >
                    {r.tier !== 'none' && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#1A1A1A]">
                        <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-green-400 mb-1">
                          Environmental Standard: {r.environmental_standard}
                        </p>
                        {r.filtration_stages && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {r.filtration_stages.map(st => (
                              <span key={st} className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] border border-[#222] px-2 py-0.5">
                                {st}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </OptionTile>
                );
              })}
            </div>
          </StepCard>
        );

      // ── STEP 9: HOSE & STORAGE ──────────────────────────────────────────────
      case 9:
        return (
          <StepCard title="Hose Reels & Tool Storage" subtitle="Select hose deployment reels, tool vaults, and surface cleaner transit brackets.">
            <div className="space-y-3">
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

      // ── STEP 10: SITE & WINTERISATION ───────────────────────────────────────
      case 10:
        return (
          <StepCard title="Site, Safety & Winterisation" subtitle="Lighting masts, WRAS Category 5 air gap protection, and sub-zero anti-freeze purge manifolds.">
            <div className="space-y-3">
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
                    Company Name for Livery Graphics (Optional)
                  </label>
                  <input
                    type="text"
                    value={config.company_name_livery || ''}
                    onChange={e => updateConfig({ company_name_livery: e.target.value })}
                    placeholder="e.g. Acme Surface Solutions Ltd"
                    className="w-full bg-[#111] border border-alkota-iron text-white px-3 py-2.5 font-inter text-[13px] focus:outline-none focus:border-alkota-orange"
                  />
                  <p className="text-[#444] text-[10px] mt-2">
                    Final artwork scaling, vinyl placement, and vector logo approvals are completed directly with Alkota engineering before body fabrication.
                  </p>
                </div>
              )}
            </div>
          </StepCard>
        );

      // ── STEP 12: WEIGHT & ENGINEERING REVIEW ────────────────────────────────
      case 12:
        return (
          <StepCard title="Engineering Weight & Compatibility Review" subtitle="Live preliminary weight calculations and compliance validation before transmitting to engineering.">
            <div className="space-y-4">
              {/* Validation alerts */}
              {validation.hardErrors.length > 0 && (
                <div className="border border-red-900/60 bg-red-950/30 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-barlow-condensed text-base font-bold uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                    Engineering Hard Rule Violations ({validation.hardErrors.length})
                  </div>
                  {validation.hardErrors.map(err => (
                    <div key={err.code} className="text-xs text-red-300 font-light border-t border-red-900/40 pt-2 mt-1">
                      <p className="font-medium text-white mb-0.5">{err.message}</p>
                      <p className="text-red-400 font-ibm-plex-mono text-[10px]">Action: {err.resolution}</p>
                    </div>
                  ))}
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div className="border border-yellow-900/50 bg-yellow-950/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-barlow-condensed text-base font-bold uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />
                    Engineering Review Warnings ({validation.warnings.length})
                  </div>
                  {validation.warnings.map(w => (
                    <div key={w.code} className="text-xs text-yellow-200 font-light border-t border-yellow-900/30 pt-2 mt-1">
                      <p className="font-medium text-white mb-0.5">{w.message}</p>
                      <p className="text-yellow-400 font-ibm-plex-mono text-[10px]">Note: {w.resolution}</p>
                    </div>
                  ))}
                </div>
              )}

              {validation.recommendations.length > 0 && (
                <div className="border border-alkota-iron bg-[#0D0D0D] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-alkota-orange font-barlow-condensed text-base font-bold uppercase tracking-wider">
                    <Info className="h-4 w-4 text-alkota-orange shrink-0" />
                    Operational Recommendations
                  </div>
                  {validation.recommendations.map(rec => (
                    <div key={rec.code} className="text-xs text-alkota-grey font-light">
                      <p className="text-alkota-silver">{rec.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Weight Breakdown */}
              <div className="border border-alkota-iron bg-[#0A0A0A] p-5 space-y-2.5">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-3">
                  Mass Breakdown (1 Litre Water = 1.00 Kilogram)
                </p>
                {[
                  { label: 'Chassis Tare Weight', value: weights.chassis_tare_kg },
                  { label: 'Alkota Machine (Dry)', value: weights.machine_dry_kg },
                  { label: 'Water Tank Hardware', value: weights.water_tank_hardware_kg },
                  { label: 'Full Water Mass (1L = 1kg)', value: weights.water_mass_kg },
                  { label: 'Power & Fuel Options', value: weights.power_options_kg },
                  { label: 'Recovery & Filtration Equipment', value: weights.recovery_equipment_kg },
                  { label: 'Hose Reels & Tool Storage', value: weights.hose_storage_kg },
                  { label: 'Site & Winterisation Pack', value: weights.site_options_kg },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between border-b border-[#1A1A1A] pb-1.5">
                    <span className="text-alkota-grey text-xs font-light">{label}</span>
                    <span className="font-ibm-plex-mono text-xs text-white">{value.toLocaleString()} kg</span>
                  </div>
                ))}

                <div className="border-t border-alkota-iron pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Estimated Dry Build Mass</span>
                    <span className="font-ibm-plex-mono font-bold text-sm text-alkota-orange">{weights.estimated_dry_weight_kg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Estimated Wet Build Mass (Full Water)</span>
                    <span className="font-ibm-plex-mono font-bold text-sm text-alkota-orange">{weights.estimated_wet_weight_kg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]">
                    <span className="font-barlow-condensed text-sm font-bold uppercase text-white">Chassis Maximum Authorised Mass (MAM)</span>
                    <span className="font-ibm-plex-mono font-bold text-sm text-white">{weights.chassis_mam_kg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666]">Remaining Payload Margin</span>
                    <span
                      className="font-ibm-plex-mono font-bold text-sm"
                      style={{ color: weights.is_overweight ? '#EF4444' : weights.weight_status === 'warning' ? '#F59E0B' : '#22C55E' }}
                    >
                      {weights.payload_margin_kg >= 0 ? '+' : ''}{weights.payload_margin_kg.toLocaleString()} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Commercial Value Box */}
              <div className="border border-alkota-iron bg-[#0D0D0D] p-4 flex items-center justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block">
                    Estimated Guide Value
                  </span>
                  <span className="font-barlow-condensed text-2xl font-black text-white">
                    {commercialValue.guide_price_display}
                  </span>
                </div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] border border-[#222] px-2 py-1">
                  Excl. VAT
                </span>
              </div>
            </div>
          </StepCard>
        );

      // ── STEP 13: BUILD SUMMARY & SUBMISSION ─────────────────────────────────
      case 13: {
        const finishOption = FINISH_LIVERY_OPTIONS.find(f => f.id === config.finish_livery_id);

        return (
          <div>
            {enquirySuccess ? (
              <div className="border border-green-900/60 bg-green-950/20 p-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
                <h2 className="font-barlow-condensed text-4xl font-black uppercase italic text-white mb-2">
                  Build Sent to Alkota Engineering & Sales
                </h2>
                <p className="font-ibm-plex-mono text-sm text-alkota-orange mb-6">
                  Build Reference Code: <span className="font-bold">{buildCode}</span>
                </p>
                <p className="text-alkota-silver text-sm max-w-lg mx-auto mb-8 leading-relaxed font-light">
                  Your bespoke trailer configuration has been delivered directly to the Alkota UK commercial and technical team. Our engineers will review hydraulic sizing, payload margins, and power balances and provide a formal proposal.
                </p>

                <div className="border-t border-green-900/40 pt-6 max-w-md mx-auto text-left space-y-3">
                  <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-2">Next Steps in the Build Journey:</p>
                  {[
                    '1. Engineering review of axle weights and hydraulic manifold sizing',
                    '2. Confirmation of towing vehicle suitability & site power supply',
                    '3. CAD layout and component mounting review',
                    '4. Itemised formal commercial quotation and delivery lead time',
                  ].map(item => (
                    <p key={item} className="text-xs text-alkota-grey font-light">{item}</p>
                  ))}
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 border border-alkota-iron px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:border-alkota-orange transition-all"
                  >
                    <Printer className="h-4 w-4 text-alkota-orange" />
                    Print Specification
                  </button>
                  <Link
                    href="/trailers"
                    className="flex items-center gap-2 bg-alkota-orange px-6 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all"
                  >
                    Return to Trailers Hub
                  </Link>
                </div>
              </div>
            ) : (
              <StepCard title="Your Alkota Specification" subtitle="Review your complete preliminary build specification or transmit to Alkota Engineering for formal costing.">
                {/* Build code hero */}
                <div className="border border-alkota-orange bg-alkota-orange/5 p-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Build Reference Code</p>
                    <p className="font-ibm-plex-mono text-xl font-bold text-alkota-orange tracking-widest">{buildCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyBuildCode}
                      className="flex items-center gap-1.5 border border-alkota-iron px-3 py-1.5 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#666] hover:text-white hover:border-[#444] transition-all"
                    >
                      {copied ? <><Check className="h-3 w-3 text-green-400" />Copied</> : <><Copy className="h-3 w-3" />Copy Code</>}
                    </button>
                    <button
                      onClick={saveBuild}
                      className="flex items-center gap-1.5 border border-alkota-orange/50 px-3 py-1.5 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:bg-alkota-orange/10 transition-all"
                    >
                      {saved ? 'Saved ✓' : 'Save Build'}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 border border-alkota-iron px-3 py-1.5 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#666] hover:text-white transition-all"
                    >
                      <Printer className="h-3 w-3" />
                      Print
                    </button>
                  </div>
                </div>

                {/* Config summary table */}
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
                    { label: 'Estimated Dry Mass', value: `${weights.estimated_dry_weight_kg.toLocaleString()} kg` },
                    { label: 'Estimated Wet Mass', value: `${weights.estimated_wet_weight_kg.toLocaleString()} kg` },
                    { label: 'Chassis MAM', value: `${weights.chassis_mam_kg.toLocaleString()} kg` },
                    { label: 'Payload Margin', value: `${weights.payload_margin_kg >= 0 ? '+' : ''}${weights.payload_margin_kg.toLocaleString()} kg` },
                    { label: 'Guide Build Value', value: commercialValue.guide_price_display },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between border-b border-[#1A1A1A] pb-2 gap-4">
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] shrink-0 w-32">{label}</span>
                      <span className="text-alkota-silver text-xs text-right font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Share Link */}
                <div className="border border-alkota-iron bg-[#0D0D0D] p-4 mb-6">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Share This Read-Only Build</p>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-[#111] border border-[#1A1A1A] text-[#888] px-3 py-2 font-inter text-[11px] focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="border border-alkota-iron px-3 py-2 text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#666] hover:text-white transition-all shrink-0"
                    >
                      {copied ? 'Copied' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {/* Enquiry CTA */}
                {!showEnquiry ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowEnquiry(true)}
                      disabled={!validation.isValid}
                      className="w-full bg-alkota-orange py-4 font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                      Request Formal Quotation & Lead Time
                    </button>
                    <div className="flex justify-between items-center text-[10px] font-ibm-plex-mono text-[#666]">
                      <Link href="/trailers/compare" className="hover:text-alkota-orange transition-colors flex items-center gap-1">
                        <Scale className="h-3 w-3" /> Compare With Other Specs
                      </Link>
                      <span>No obligation preliminary quotation</span>
                    </div>
                  </div>
                ) : (
                  <div className="border border-alkota-iron bg-[#0A0A0A] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-barlow-condensed text-xl font-bold uppercase italic text-white">Commercial Proposal Request</h4>
                      <button onClick={() => setShowEnquiry(false)} className="text-[#555] hover:text-white transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <EnquiryForm
                      buildCode={buildCode}
                      config={config}
                      weights={weights}
                      commercialValue={commercialValue}
                      onClose={() => setShowEnquiry(false)}
                      onSuccess={() => {
                        setShowEnquiry(false);
                        setEnquirySuccess(true);
                      }}
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
    <main className="bg-alkota-black min-h-screen pb-24 lg:pb-12">
      <Navigation />

      {/* Reconcile notice toast */}
      <AnimatePresence>
        {reconcileNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1E1E1E] border border-alkota-orange text-white px-5 py-2.5 rounded shadow-2xl flex items-center gap-3 text-xs font-ibm-plex-mono"
          >
            <Info className="h-4 w-4 text-alkota-orange shrink-0" />
            <span>{reconcileNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CONFIGURATOR MASTHEAD ──────────────────────────────────────────── */}
      <div className="border-b border-alkota-iron bg-alkota-black pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/trailers" className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs mb-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Alkota Trailers Flagship
            </Link>
            <h1 className="font-barlow-condensed text-2xl md:text-3xl font-black uppercase italic text-white">
              Bespoke Trailer Rig Configurator
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
            {STEPS.map((s) => {
              const isActive = step === s.id;
              const isDone = step > s.id;
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
        <div className="lg:col-span-7 lg:sticky lg:top-8 space-y-4">
          <div className="relative bg-[#090909] border border-alkota-iron aspect-[4/3] overflow-hidden">
            {/* View Mode Toggle (for Enclosed format) */}
            {config.format === 'enclosed' && (
              <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-black/90 p-1 border border-[#333]">
                <button
                  type="button"
                  onClick={() => setPreviewMode('exterior')}
                  className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold transition-all ${
                    previewMode === 'exterior'
                      ? 'bg-alkota-orange text-white'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  Exterior Shell
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('interior')}
                  className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold transition-all ${
                    previewMode === 'interior'
                      ? 'bg-alkota-orange text-white'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  Interior Plant Room
                </button>
              </div>
            )}

            {/* Machine code badge */}
            {machine && (
              <div className={`absolute z-20 bg-alkota-black/90 border border-alkota-iron px-3 py-1.5 backdrop-blur-sm ${config.format === 'enclosed' ? 'top-14 left-4' : 'top-4 left-4'}`}>
                <p className="font-ibm-plex-mono text-[8px] text-alkota-orange uppercase tracking-widest">Selected Machine</p>
                <p className="font-barlow-condensed text-sm font-bold uppercase italic text-white">{machine.model_code}</p>
              </div>
            )}

            {/* Format badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.3em] text-alkota-orange border border-alkota-orange px-2.5 py-1 bg-alkota-black/80">
                {config.format === 'open-deck' ? 'Open Deck System' : previewMode === 'exterior' ? 'Enclosed Exterior' : 'Internal Plant Room'}
              </span>
            </div>

            {/* Main rig visual (Stable perspective) */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <img
                src={
                  config.format === 'enclosed' && previewMode === 'exterior'
                    ? '/assets/products/stationary-gas-fired.png'
                    : machine?.image_url || '/assets/products/trailer-single.png'
                }
                alt="Alkota Trailer Configuration Preview"
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Water level indicator */}
            {tank && tank.litres > 0 && (
              <div className="absolute bottom-4 left-4 z-20 bg-alkota-black/90 border border-alkota-iron px-3 py-2 backdrop-blur-sm">
                <p className="font-ibm-plex-mono text-[7px] text-[#555] uppercase tracking-widest mb-0.5">Water Reservoir</p>
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
                <p className="font-ibm-plex-mono text-[7px] text-green-400 uppercase tracking-widest mb-0.5">Water Recovery</p>
                <div className="flex items-center gap-2">
                  <Recycle className="h-3.5 w-3.5 text-green-400" />
                  <span className="font-ibm-plex-mono text-[10px] text-green-400 font-bold">Active</span>
                </div>
              </div>
            )}

            {/* Dark overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Sticky build summary bar */}
          <div className="mt-4 border border-alkota-iron bg-[#0A0A0A] p-4 space-y-3">
            <PayloadGauge weights={weights} />

            <div className="grid grid-cols-3 gap-4 text-center pt-1 border-t border-[#1A1A1A]">
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Dry Mass</p>
                <p className="font-barlow-condensed text-lg font-black text-white">{weights.estimated_dry_weight_kg.toLocaleString()} <span className="text-xs text-[#555]">kg</span></p>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Wet Mass</p>
                <p className="font-barlow-condensed text-lg font-black text-white">{weights.estimated_wet_weight_kg.toLocaleString()} <span className="text-xs text-[#555]">kg</span></p>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">Guide Value</p>
                <p className="font-barlow-condensed text-lg font-black text-alkota-orange">
                  {commercialValue.min_guide_price_gbp ? `£${Math.round(commercialValue.min_guide_price_gbp / 1000)}k+` : 'Review'}
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
                {step === 12 ? (validation.isValid ? 'Review My Specification' : 'Resolve Engineering Violations') : 'Continue'}
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

      {/* ─── MOBILE STICKY BOTTOM SUMMARY BAR ───────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/95 border-t border-alkota-iron p-3 backdrop-blur-md flex items-center justify-between">
        <div>
          <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-alkota-orange">
            {config.format === 'open-deck' ? 'Open Deck' : 'Enclosed'} · {tank?.litres || 0}L Water
          </p>
          <p className="font-barlow-condensed text-base font-bold text-white">
            {commercialValue.min_guide_price_gbp ? `£${Math.round(commercialValue.min_guide_price_gbp / 1000)}k+` : 'Guide Review'} <span className="text-xs text-[#666]">· {weights.estimated_wet_weight_kg}kg Wet</span>
          </p>
        </div>
        {step < 13 && (
          <button
            onClick={goNext}
            disabled={!canProceed}
            className="bg-alkota-orange px-4 py-2 text-[9px] font-ibm-plex-mono uppercase font-bold text-white disabled:opacity-40"
          >
            {step === 12 ? 'Review' : 'Next'} →
          </button>
        )}
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
