'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Printer,
  AlertCircle,
  Info,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// ── STORAGE KEY ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'wp_architect_draft_v2';

// ── FORM STATE ───────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  // Step 1 — Application
  applications: [] as string[],
  applicationDescription: '',

  // Step 2 — Asset Envelope
  assetLength: '',
  assetWidth: '',
  assetHeight: '',
  assetWeight: '',
  assetGeometry: [] as string[],
  assetMovement: '',

  // Step 3 — Contamination Profile
  contaminationTypes: [] as string[],
  contaminationLevel: '',
  contaminationNotes: '',

  // Step 4 — Throughput & Duty
  assetsPerDay: '',
  operatingHours: '',
  shiftsPerDay: '',
  operatingDays: '',
  cycleTimeTarget: '',
  projectDriver: [] as string[],

  // Step 5 — Cleaning Approach
  automationPreference: '',
  processRequirements: [] as string[],

  // Step 6 — Water
  waterSupply: '',
  waterCollection: '',
  waterStrategy: '',
  drawingsExist: '',

  // Step 7 — Site & Infrastructure
  sitePostcode: '',
  siteIndoorOutdoor: '',
  siteNewExisting: '',
  siteFootprint: '',
  electricalSupply: '',
  heatingFuel: '',
  drainageType: '',
  frostRisk: '',
  siteRestrictions: '',
  // Brownfield branch
  hasBrownfieldPlant: '',
  existingManufacturer: '',
  existingAge: '',
  existingProblems: '',
  existingRetainReplace: '',
  refurbishmentInterest: '',

  // Step 8 — Project & Procurement
  projectStage: '',
  procurementRoute: '',
  targetTiming: '',

  // Step 9 — Budget & Lifecycle
  budgetBand: '',
  lifecycleRequirements: [] as string[],

  // Contact (shown after brief generation)
  contactName: '',
  contactCompany: '',
  contactJobTitle: '',
  contactEmail: '',
  contactPhone: '',
  contactPreference: '',
  consentMarketing: false,
};

type FormData = typeof EMPTY_FORM;

// ── STEP LABELS ───────────────────────────────────────────────────────────────
const STEP_LABELS = [
  'Application',
  'Asset Envelope',
  'Contamination Profile',
  'Throughput & Duty',
  'Cleaning Approach',
  'Water',
  'Site & Infrastructure',
  'Project & Procurement',
  'Budget & Lifecycle',
];

// ── MULTI-SELECT BUTTON ───────────────────────────────────────────────────────
function MultiSelectButton({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-4 text-left text-xs uppercase tracking-wide border transition-all flex items-start justify-between gap-2 ${
        selected
          ? 'border-alkota-orange bg-alkota-orange/5 text-alkota-black'
          : 'border-alkota-iron hover:border-alkota-silver text-alkota-silver'
      }`}
    >
      <span className="leading-snug">{label}</span>
      <CheckCircle2
        className={`h-4 w-4 shrink-0 mt-0.5 transition-colors ${
          selected ? 'text-alkota-orange' : 'text-transparent'
        }`}
      />
    </button>
  );
}

// ── RADIO BUTTON ──────────────────────────────────────────────────────────────
function RadioButton({
  label,
  desc,
  selected,
  onSelect,
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full p-4 text-left border transition-all ${
        selected
          ? 'border-alkota-orange bg-alkota-orange/5'
          : 'border-alkota-iron hover:border-alkota-silver'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide font-normal text-alkota-black">
          {label}
        </span>
        <span
          className={`h-3 w-3 rounded-full border shrink-0 ${
            selected
              ? 'bg-alkota-orange border-alkota-orange'
              : 'border-alkota-silver'
          }`}
        />
      </div>
      {desc && (
        <p className="text-[11px] text-alkota-silver mt-1 leading-snug">{desc}</p>
      )}
    </button>
  );
}

// ── FIELD LABEL ───────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
      {children}
    </label>
  );
}

// ── TEXT INPUT ────────────────────────────────────────────────────────────────
function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
    />
  );
}

// ── SELECT ────────────────────────────────────────────────────────────────────
function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
    >
      <option value="">— Not known yet —</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ── NOT KNOWN NOTE ─────────────────────────────────────────────────────────────
function NotKnownNote() {
  return (
    <p className="text-[10px] font-ibm-plex-mono text-alkota-silver mt-0.5 flex items-center gap-1">
      <Info className="h-3 w-3 shrink-0" />
      Leave blank or select "Not known yet" — this becomes an Open Engineering Question.
    </p>
  );
}

// ── STEP HEADER ───────────────────────────────────────────────────────────────
function StepHeader({
  step,
  title,
  note,
}: {
  step: number;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-6">
      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
        STEP {String(step).padStart(2, '0')} // {STEP_LABELS[step - 1]}
      </span>
      <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
        {title}
      </h2>
      {note && (
        <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
          {note}
        </p>
      )}
    </div>
  );
}

// ── GENERATE BRIEF ────────────────────────────────────────────────────────────
function generateBrief(f: FormData) {
  const openQuestions: string[] = [];

  if (f.applications.length === 0) openQuestions.push('Asset application type not defined.');
  if (!f.assetLength && !f.assetWidth) openQuestions.push('Asset envelope dimensions not provided — required for wash bay clearance and gantry sizing.');
  if (f.contaminationTypes.length === 0) openQuestions.push('Contamination profile not defined — required for thermal and chemical specification.');
  if (!f.contaminationLevel) openQuestions.push('Contamination severity not indicated.');
  if (!f.assetsPerDay && !f.cycleTimeTarget) openQuestions.push('Throughput demand not defined — required for pump sizing, bay count and automation selection.');
  if (!f.automationPreference) openQuestions.push('Automation philosophy not selected.');
  if (!f.waterStrategy) openQuestions.push('Water management strategy not defined — required for civils and water treatment scope.');
  if (!f.waterSupply) openQuestions.push('Water supply availability not indicated.');
  if (!f.electricalSupply) openQuestions.push('Electrical supply specification not confirmed.');
  if (!f.heatingFuel) openQuestions.push('Water heating fuel preference not indicated.');
  if (!f.siteIndoorOutdoor) openQuestions.push('Indoor/outdoor installation environment not confirmed.');
  if (!f.budgetBand) openQuestions.push('Project budget scope not indicated.');
  if (!f.projectStage) openQuestions.push('Project stage not confirmed.');
  if (!f.targetTiming) openQuestions.push('Target commissioning timing not established.');

  return openQuestions;
}

// ── BRIEF DISPLAY PANEL ───────────────────────────────────────────────────────
function BriefPanel({
  f,
  reference,
  openQuestions,
}: {
  f: FormData;
  reference: string;
  openQuestions: string[];
}) {
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const row = (label: string, value: string) =>
    value ? (
      <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-1.5 border-b border-alkota-iron/40">
        <span className="text-alkota-silver shrink-0 w-48">{label}</span>
        <span className="text-alkota-black font-medium">{value}</span>
      </div>
    ) : null;

  return (
    <div id="printable-brief" className="space-y-6 font-ibm-plex-mono text-xs text-alkota-black">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b-2 border-alkota-black">
        <div>
          <h3 className="font-bold text-base uppercase">ALKOTA UK // WASH PLANT DIVISION</h3>
          <span className="text-[10px] text-alkota-silver uppercase tracking-widest">
            PRELIMINARY PROJECT SCOPING BRIEF
          </span>
        </div>
        <div className="text-right">
          <span className="text-alkota-orange font-bold text-sm block">{reference}</span>
          <span className="text-[10px] text-alkota-silver">{today}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-alkota-bg border border-alkota-iron p-4 text-[10px] text-alkota-silver leading-relaxed">
        <strong className="text-alkota-black uppercase block mb-1">PRELIMINARY PROJECT BRIEF — NOT FOR CONSTRUCTION</strong>
        This document is generated as an initial pre-engineering scoping record based on information provided at the time of completion.
        It does not constitute a formal quotation, guaranteed engineering design, compliance certification, or commercial proposal.
        Final specifications are issued following site survey and formal engineering review by Alkota UK.
      </div>

      {/* Application */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">01 — APPLICATION</strong>
        {row('Asset Types:', f.applications.join(', '))}
        {row('Additional Description:', f.applicationDescription)}
      </div>

      {/* Asset Envelope */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">02 — ASSET ENVELOPE</strong>
        {row('Length:', f.assetLength)}
        {row('Width:', f.assetWidth)}
        {row('Height:', f.assetHeight)}
        {row('Weight:', f.assetWeight)}
        {row('Special Geometry:', f.assetGeometry.join(', '))}
        {row('Movement Method:', f.assetMovement)}
      </div>

      {/* Contamination */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">03 — CONTAMINATION PROFILE</strong>
        {row('Contamination Types:', f.contaminationTypes.join(', '))}
        {row('Contamination Level:', f.contaminationLevel)}
        {row('Notes:', f.contaminationNotes)}
      </div>

      {/* Throughput */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">04 — THROUGHPUT & DUTY</strong>
        {row('Assets per Day:', f.assetsPerDay)}
        {row('Operating Hours:', f.operatingHours)}
        {row('Shifts per Day:', f.shiftsPerDay)}
        {row('Operating Days/Week:', f.operatingDays)}
        {row('Target Cycle Time:', f.cycleTimeTarget)}
        {row('Project Driver:', f.projectDriver.join(', '))}
      </div>

      {/* Cleaning Approach */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">05 — CLEANING APPROACH</strong>
        {row('Automation Preference:', f.automationPreference)}
        {row('Process Requirements:', f.processRequirements.join(', '))}
      </div>

      {/* Water */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">06 — WATER</strong>
        {row('Water Supply:', f.waterSupply)}
        {row('Collection:', f.waterCollection)}
        {row('Intended Strategy:', f.waterStrategy)}
        {row('Drawings / Consents:', f.drawingsExist)}
      </div>

      {/* Site */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">07 — SITE & INFRASTRUCTURE</strong>
        {row('Location / Postcode:', f.sitePostcode)}
        {row('Environment:', f.siteIndoorOutdoor)}
        {row('Site Type:', f.siteNewExisting)}
        {row('Footprint:', f.siteFootprint)}
        {row('Electrical Supply:', f.electricalSupply)}
        {row('Heating Fuel:', f.heatingFuel)}
        {row('Drainage:', f.drainageType)}
        {row('Frost Risk:', f.frostRisk)}
        {row('Site Restrictions:', f.siteRestrictions)}
        {f.hasBrownfieldPlant === 'yes' && (
          <>
            {row('Existing Plant Manufacturer:', f.existingManufacturer)}
            {row('Existing Plant Age:', f.existingAge)}
            {row('Current Problems:', f.existingProblems)}
            {row('Retain / Replace:', f.existingRetainReplace)}
            {row('Refurbishment Interest:', f.refurbishmentInterest)}
          </>
        )}
      </div>

      {/* Project & Procurement */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">08 — PROJECT & PROCUREMENT</strong>
        {row('Project Stage:', f.projectStage)}
        {row('Procurement Route:', f.procurementRoute)}
        {row('Target Timing:', f.targetTiming)}
      </div>

      {/* Budget & Lifecycle */}
      <div className="space-y-2">
        <strong className="text-alkota-black block mb-2 uppercase tracking-widest text-[10px]">09 — BUDGET & LIFECYCLE</strong>
        {row('Indicative Budget Band:', f.budgetBand)}
        {row('Lifecycle Requirements:', f.lifecycleRequirements.join(', '))}
      </div>

      {/* Open Engineering Questions */}
      {openQuestions.length > 0 && (
        <div className="border border-alkota-orange p-5 space-y-2 bg-alkota-orange/5">
          <strong className="text-alkota-orange uppercase tracking-widest text-[10px] block">
            OPEN ENGINEERING QUESTIONS — TO BE ESTABLISHED DURING ENGINEERING REVIEW
          </strong>
          {openQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-alkota-black">
              <AlertCircle className="h-3.5 w-3.5 text-alkota-orange shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function WashPlantArchitectPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [briefVisible, setBriefVisible] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [reference, setReference] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const TOTAL_STEPS = 9;

  // ── localStorage persistence ─────────────────────────────────────────────
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && saved.trim() !== '') {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            setFormData((prev) => ({ ...prev, ...parsed }));
          }
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch {
      /* ignore */
    }
  }, [formData]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const set = (key: keyof FormData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleArr = (key: keyof FormData, value: string) =>
    setFormData((prev) => {
      const arr = (prev[key] as string[]) || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((s) => s + 1);
    else setBriefVisible(true);
  };

  const handlePrev = () => {
    if (briefVisible) {
      setBriefVisible(false);
    } else if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    if (confirm('Clear all form data and start again?')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setFormData(EMPTY_FORM);
      setCurrentStep(1);
      setBriefVisible(false);
      setSubmitted(false);
      setReference('');
    }
  };

  const openQuestions = generateBrief(formData);
  const briefRef = `WP-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ref = reference || briefRef;
    try {
      const payload = {
        name: formData.contactName,
        company: formData.contactCompany,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        site_location: formData.sitePostcode,
        project_name: `${formData.contactCompany || 'Industrial'} Wash Plant Project`,
        architect_data: {
          step1: {
            applications: formData.applications,
            description: formData.applicationDescription,
          },
          step2: {
            length: formData.assetLength,
            width: formData.assetWidth,
            height: formData.assetHeight,
            weight: formData.assetWeight,
            geometry: formData.assetGeometry,
            movement: formData.assetMovement,
          },
          step3: {
            contamination_types: formData.contaminationTypes,
            level: formData.contaminationLevel,
            notes: formData.contaminationNotes,
          },
          step4: {
            assets_per_day: formData.assetsPerDay,
            operating_hours: formData.operatingHours,
            shifts: formData.shiftsPerDay,
            operating_days: formData.operatingDays,
            cycle_time: formData.cycleTimeTarget,
            project_driver: formData.projectDriver,
          },
          step5: {
            automation: formData.automationPreference,
            process_requirements: formData.processRequirements,
          },
          step6: {
            supply: formData.waterSupply,
            collection: formData.waterCollection,
            strategy: formData.waterStrategy,
            drawings_exist: formData.drawingsExist,
          },
          step7: {
            postcode: formData.sitePostcode,
            indoor_outdoor: formData.siteIndoorOutdoor,
            site_type: formData.siteNewExisting,
            footprint: formData.siteFootprint,
            electrical: formData.electricalSupply,
            heating_fuel: formData.heatingFuel,
            drainage: formData.drainageType,
            frost: formData.frostRisk,
            restrictions: formData.siteRestrictions,
            brownfield: formData.hasBrownfieldPlant === 'yes' ? {
              manufacturer: formData.existingManufacturer,
              age: formData.existingAge,
              problems: formData.existingProblems,
              retain_replace: formData.existingRetainReplace,
              refurb_interest: formData.refurbishmentInterest,
            } : null,
          },
          step8: {
            project_stage: formData.projectStage,
            procurement_route: formData.procurementRoute,
            target_timing: formData.targetTiming,
          },
          step9: {
            budget_band: formData.budgetBand,
            lifecycle: formData.lifecycleRequirements,
          },
          contact: {
            job_title: formData.contactJobTitle,
            contact_preference: formData.contactPreference,
          },
          open_questions: openQuestions,
          reference: ref,
        },
      };

      const res = await fetch('/api/wash-plant/submit-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setReference(data.reference || ref);
      setSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    } catch {
      setReference(ref);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = briefVisible ? 100 : Math.round((currentStep / TOTAL_STEPS) * 95);

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-brief, #printable-brief * { visibility: visible; }
          #printable-brief { position: fixed; inset: 0; padding: 40px; font-size: 10pt; }
          .no-print { display: none !important; }
        }
      `}</style>

      <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-24">
        <WashPlantSchema
          pageTitle="Wash Plant Architect | Pre-Engineering Project Scoping | Alkota UK"
          pageDescription="Define the process before we design the plant. Alkota UK's Wash Plant Architect is a structured pre-engineering scoping tool — capturing asset, contamination, throughput, water, site, and commercial parameters to compile a Preliminary Project Brief."
          pageUrl="https://alkota.co.uk/wash-plant/architect"
        />

        <Navigation />
        <WashPlantSubNav />

        <div className="mx-auto max-w-4xl px-6 pt-10">
          {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
          <div className="mt-8 mb-10 no-print">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
                // PRE-ENGINEERING PROJECT SCOPING
              </span>
            </div>
            <h1 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-tight">
              Define the process.<br />
              <span className="text-alkota-orange">Before we design the plant.</span>
            </h1>
            <p className="text-sm text-alkota-silver max-w-2xl mt-3 leading-relaxed">
              This is a preliminary project scoping tool — not a configurator, not a quotation calculator.
              Work through 9 engineering dimensions. We generate a Preliminary Project Brief.
              You decide whether to send it to Alkota.
            </p>
            <div className="mt-4 p-4 bg-white border border-alkota-iron text-xs font-ibm-plex-mono text-alkota-silver flex items-start gap-2">
              <Info className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
              <span>
                <strong className="text-alkota-black">PRELIMINARY PROJECT SCOPING</strong> — not a formal quotation, final engineering design, or guaranteed compliance statement.
                Select &ldquo;Not known yet&rdquo; on any field you cannot answer. These become identified Open Engineering Questions in your brief.
              </span>
            </div>
          </div>

          {/* ── PROGRESS BAR ────────────────────────────────────────────── */}
          {!submitted && (
            <div className="mb-8 bg-white border border-alkota-iron p-4 shadow-sm no-print">
              <div className="flex items-center justify-between text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-wider mb-2">
                <span className="text-alkota-black">
                  {briefVisible
                    ? 'Preliminary Project Brief'
                    : `Step ${currentStep} of ${TOTAL_STEPS}: ${STEP_LABELS[currentStep - 1]}`}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-alkota-orange font-normal">{progress}%</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-alkota-silver hover:text-alkota-black transition-colors text-[10px]"
                    title="Clear all data and restart"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              <div className="w-full bg-alkota-bg h-1.5 overflow-hidden">
                <div
                  className="bg-alkota-orange h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── FORM CONTAINER ──────────────────────────────────────────── */}
          <div className="bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm">
            {submitted ? (
              // ── CONFIRMATION ────────────────────────────────────────────
              <div className="space-y-8 py-6">
                <div className="text-center space-y-3 max-w-xl mx-auto no-print">
                  <div className="h-12 w-12 bg-alkota-orange/10 border border-alkota-orange text-alkota-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                    PROJECT BRIEF TRANSMITTED
                  </span>
                  <h2 className="font-extralight text-4xl uppercase tracking-tight text-alkota-black">
                    Project Reference {reference}
                  </h2>
                  <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
                    Your scoping brief has been routed to our UK engineering team. A project lead will review your
                    inputs and contact you directly.
                  </p>
                </div>

                <BriefPanel f={formData} reference={reference} openQuestions={openQuestions} />

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 no-print">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print / Save Brief as PDF</span>
                  </button>
                  <Link
                    href="/wash-plant"
                    className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
                  >
                    <span>Return to Wash Plant Division</span>
                  </Link>
                </div>
              </div>
            ) : briefVisible ? (
              // ── BRIEF + CONTACT CAPTURE ──────────────────────────────────
              <div className="space-y-8">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                    PRELIMINARY PROJECT BRIEF
                  </span>
                  <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                    Your scoping brief is ready.
                  </h2>
                  <p className="text-xs text-alkota-silver mt-2 leading-relaxed">
                    Review the brief below. Open Engineering Questions highlight areas requiring further definition during site survey and engineering review.
                    You can print this now, or send it to Alkota engineering for review.
                  </p>
                </div>

                <BriefPanel f={formData} reference={briefRef} openQuestions={openQuestions} />

                {/* Contact capture */}
                <div className="pt-6 border-t border-alkota-iron space-y-6 no-print">
                  <div>
                    <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
                      Would you like Alkota to review this project?
                    </h3>
                    <p className="text-xs text-alkota-silver leading-relaxed">
                      Provide your contact details and this brief is routed directly to our UK engineering team.
                      No sales calls without your permission. No data shared with third parties.
                    </p>
                    <p className="mt-2 font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-wider">
                      Your submission creates a private project record — it will never become a public case study
                      without your written authorisation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Full Name *</FieldLabel>
                        <TextInput
                          value={formData.contactName}
                          onChange={(v) => set('contactName', v)}
                          placeholder="e.g. David Morrison"
                        />
                      </div>
                      <div>
                        <FieldLabel>Company / Organisation *</FieldLabel>
                        <TextInput
                          value={formData.contactCompany}
                          onChange={(v) => set('contactCompany', v)}
                          placeholder="e.g. National Logistics Ltd"
                        />
                      </div>
                      <div>
                        <FieldLabel>Job Title</FieldLabel>
                        <TextInput
                          value={formData.contactJobTitle}
                          onChange={(v) => set('contactJobTitle', v)}
                          placeholder="e.g. Engineering Director"
                        />
                      </div>
                      <div>
                        <FieldLabel>Work Email *</FieldLabel>
                        <input
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={(e) => set('contactEmail', e.target.value)}
                          placeholder="d.morrison@company.co.uk"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <FieldLabel>Phone Number *</FieldLabel>
                        <input
                          type="tel"
                          required
                          value={formData.contactPhone}
                          onChange={(e) => set('contactPhone', e.target.value)}
                          placeholder="+44 7700 900123"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <FieldLabel>Preferred Contact Method</FieldLabel>
                        <Select
                          value={formData.contactPreference}
                          onChange={(v) => set('contactPreference', v)}
                          options={[
                            { value: 'email', label: 'Email' },
                            { value: 'phone', label: 'Phone Call' },
                            { value: 'teams', label: 'Teams / Video Call' },
                            { value: 'site_visit', label: 'Site Visit' },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consentMarketing}
                        onChange={(e) => set('consentMarketing', e.target.checked)}
                        className="mt-0.5 h-4 w-4 border-alkota-iron"
                      />
                      <label htmlFor="consent" className="text-[11px] text-alkota-silver leading-relaxed cursor-pointer">
                        I consent to Alkota UK contacting me about this project, and to receiving relevant engineering
                        updates. I understand my data is held securely and not shared with third parties.
                      </label>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-alkota-iron pt-6">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest text-alkota-black border border-alkota-iron hover:border-alkota-orange transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Back to Parameters</span>
                      </button>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-5 py-3 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
                        >
                          <Printer className="h-4 w-4" />
                          <span>Print Brief</span>
                        </button>
                        <button
                          type="submit"
                          disabled={submitting || !formData.contactName || !formData.contactEmail || !formData.contactPhone}
                          className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors disabled:opacity-50"
                        >
                          <Send className="h-4 w-4" />
                          <span>{submitting ? 'Transmitting...' : 'Send to Alkota Engineering'}</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              // ── STEP CONTENT ──────────────────────────────────────────────
              <div className="space-y-6">
                {/* ── STEP 1: APPLICATION ─────────────────────────────── */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={1}
                      title="What are we cleaning?"
                      note="Select all asset types relevant to this application. Multiple selection allowed."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Commercial Vehicles & HGVs',
                        'Logistics & Distribution Fleet',
                        'Buses & Passenger Coaches',
                        'Heavy Plant & Earthmoving',
                        'Quarry & Mining Equipment',
                        'Agricultural & Forestry Machinery',
                        'Rig Mats & Access Roadway Mats',
                        'Steel Sheet Piling & Trench Boxes',
                        'Rail Rolling Stock & Bogies',
                        'Industrial Components & Fabrications',
                        'Food & Beverage Process Equipment',
                        'Waste & Refuse Vehicles',
                        'Other / Specialist — describe below',
                      ].map((a) => (
                        <MultiSelectButton
                          key={a}
                          label={a}
                          selected={formData.applications.includes(a)}
                          onToggle={() => toggleArr('applications', a)}
                        />
                      ))}
                    </div>
                    <div>
                      <FieldLabel>Application Description (Optional)</FieldLabel>
                      <textarea
                        rows={3}
                        value={formData.applicationDescription}
                        onChange={(e) => set('applicationDescription', e.target.value)}
                        placeholder="Describe the specific asset, environment, or any unusual geometry not captured above..."
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 2: ASSET ENVELOPE ──────────────────────────── */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={2}
                      title="Asset envelope & geometry."
                      note="Provide maximum dimensions for the largest single asset to be cleaned."
                    />
                    <NotKnownNote />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Maximum Length (mm or description)</FieldLabel>
                        <TextInput
                          value={formData.assetLength}
                          onChange={(v) => set('assetLength', v)}
                          placeholder="e.g. 16,500mm (articulated HGV)"
                        />
                      </div>
                      <div>
                        <FieldLabel>Maximum Width (mm or description)</FieldLabel>
                        <TextInput
                          value={formData.assetWidth}
                          onChange={(v) => set('assetWidth', v)}
                          placeholder="e.g. 2,600mm"
                        />
                      </div>
                      <div>
                        <FieldLabel>Maximum Height (mm or description)</FieldLabel>
                        <TextInput
                          value={formData.assetHeight}
                          onChange={(v) => set('assetHeight', v)}
                          placeholder="e.g. 4,200mm"
                        />
                      </div>
                      <div>
                        <FieldLabel>Maximum Weight (kg or tonnes)</FieldLabel>
                        <TextInput
                          value={formData.assetWeight}
                          onChange={(v) => set('assetWeight', v)}
                          placeholder="e.g. 44,000kg / 44t"
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Special Geometry or Access Requirements</FieldLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {[
                          'Underside / underbody cleaning required',
                          'Internal cavity / vessel cleaning',
                          'Moving or rotating components',
                          'Sensitive electronics / sealed bearings to protect',
                          'Awkward / irregular shape',
                          'Oversize / abnormal load dimensions',
                        ].map((g) => (
                          <MultiSelectButton
                            key={g}
                            label={g}
                            selected={formData.assetGeometry.includes(g)}
                            onToggle={() => toggleArr('assetGeometry', g)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>How does the asset enter / exit the wash bay?</FieldLabel>
                      <Select
                        value={formData.assetMovement}
                        onChange={(v) => set('assetMovement', v)}
                        options={[
                          { value: 'self_propelled', label: 'Self-propelled (drives in)' },
                          { value: 'towed', label: 'Towed / pushed' },
                          { value: 'conveyor', label: 'Mechanical conveyor / roller' },
                          { value: 'crane_forklift', label: 'Crane or forklift handled' },
                          { value: 'manual_place', label: 'Manually placed / stationary' },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 3: CONTAMINATION PROFILE ───────────────────── */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={3}
                      title="Contamination profile."
                      note="Select primary soil types. This determines thermal heating, chemical treatment, and water treatment scope."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Heavy compacted mud & clay',
                        'Sand, gravel & aggregate',
                        'Petroleum oils, greases & lubricants',
                        'Diesel & hydrocarbon residues',
                        'Bitumen, tar & asphalt',
                        'Traffic film & road dust',
                        'Winter road salt & brine',
                        'Concrete & cement slurry',
                        'Organic & biological matter',
                        'Animal by-products',
                        'Food fats, oils & grease (FOG)',
                        'Chemical / polymer / paint residues',
                      ].map((c) => (
                        <MultiSelectButton
                          key={c}
                          label={c}
                          selected={formData.contaminationTypes.includes(c)}
                          onToggle={() => toggleArr('contaminationTypes', c)}
                        />
                      ))}
                    </div>

                    <div>
                      <FieldLabel>Contamination Severity</FieldLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        {[
                          { v: 'light', l: 'Light', d: 'Road dust, traffic film' },
                          { v: 'moderate', l: 'Moderate', d: 'Mixed mud & oils' },
                          { v: 'heavy', l: 'Heavy', d: 'Compacted clay, heavy grease' },
                          { v: 'severe', l: 'Severe / Specialist', d: 'Bitumen, slurry, chemicals' },
                        ].map(({ v, l, d }) => (
                          <RadioButton
                            key={v}
                            label={l}
                            desc={d}
                            selected={formData.contaminationLevel === v}
                            onSelect={() => set('contaminationLevel', v)}
                          />
                        ))}
                      </div>
                      <NotKnownNote />
                    </div>

                    <div>
                      <FieldLabel>Additional Contamination Notes</FieldLabel>
                      <textarea
                        rows={2}
                        value={formData.contaminationNotes}
                        onChange={(e) => set('contaminationNotes', e.target.value)}
                        placeholder="Any seasonal variation, regulated substances, or unusual contaminant history..."
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>

                    <div className="bg-alkota-bg border border-alkota-iron p-4 text-xs font-ibm-plex-mono text-alkota-silver flex items-start gap-2">
                      <Info className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                      <span>
                        Hydrocarbon or regulated contaminant profiles will flag water treatment review during engineering — discharge consent standards are determined by the receiving water body and local authority, not by this tool.
                      </span>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: THROUGHPUT & DUTY ────────────────────────── */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={4}
                      title="Throughput & operating duty."
                      note="Throughput demand determines automation level, bay count, pump sizing, and thermal capacity."
                    />
                    <NotKnownNote />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Approximate Assets per Day</FieldLabel>
                        <TextInput
                          value={formData.assetsPerDay}
                          onChange={(v) => set('assetsPerDay', v)}
                          placeholder="e.g. 60 HGVs / 200 mats"
                        />
                      </div>
                      <div>
                        <FieldLabel>Target Cycle Time per Asset</FieldLabel>
                        <TextInput
                          value={formData.cycleTimeTarget}
                          onChange={(v) => set('cycleTimeTarget', v)}
                          placeholder="e.g. 5 minutes per vehicle"
                        />
                      </div>
                      <div>
                        <FieldLabel>Operating Hours per Day</FieldLabel>
                        <Select
                          value={formData.operatingHours}
                          onChange={(v) => set('operatingHours', v)}
                          options={[
                            { value: 'intermittent', label: 'Intermittent (< 4 hours)' },
                            { value: 'single_8', label: 'Single shift (approx 8 hours)' },
                            { value: 'double_16', label: 'Double shift (approx 16 hours)' },
                            { value: 'continuous_24', label: 'Continuous 24-hour operation' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Shifts per Day</FieldLabel>
                        <Select
                          value={formData.shiftsPerDay}
                          onChange={(v) => set('shiftsPerDay', v)}
                          options={[
                            { value: '1', label: '1 shift' },
                            { value: '2', label: '2 shifts' },
                            { value: '3', label: '3 shifts' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Operating Days per Week</FieldLabel>
                        <Select
                          value={formData.operatingDays}
                          onChange={(v) => set('operatingDays', v)}
                          options={[
                            { value: '5', label: '5 days (Mon–Fri)' },
                            { value: '6', label: '6 days (Mon–Sat)' },
                            { value: '7', label: '7 days (24/7 operation)' },
                            { value: 'seasonal', label: 'Seasonal / variable' },
                          ]}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Primary Project Driver — what is this investment solving?</FieldLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {[
                          'New facility — no existing wash plant',
                          'Increase cleaning capacity',
                          'Replace failing or end-of-life plant',
                          'Reduce manual cleaning labour',
                          'Improve water management / reduce mains use',
                          'Operational reliability / reduce downtime',
                          'Statutory compliance (trade effluent, biosecurity)',
                          'Carbon / sustainability target',
                        ].map((d) => (
                          <MultiSelectButton
                            key={d}
                            label={d}
                            selected={formData.projectDriver.includes(d)}
                            onToggle={() => toggleArr('projectDriver', d)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 5: CLEANING APPROACH ───────────────────────── */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={5}
                      title="Cleaning approach & automation."
                      note="Indicate your preference or ask Alkota to recommend based on throughput and CAPEX parameters."
                    />
                    <div className="space-y-3">
                      {[
                        { v: 'manual', l: 'Manual operator bay', d: 'Centralised high-pressure plant feeding manual lances and 360° boom arms. Operator-intensive, flexible, lower CAPEX.' },
                        { v: 'assisted', l: 'Operator-assisted system', d: 'Fixed underbody/wheel wash automation with manual lance detail stations. Reduced operator effort on repetitive tasks.' },
                        { v: 'semi_auto', l: 'Semi-automated', d: 'Automated vehicle sensing and spray actuation with operator oversight. Reduced cycle times, moderate CAPEX.' },
                        { v: 'fully_auto', l: 'Fully automated drive-through', d: 'Optical/sonar triggered arches and underbody systems with minimal operator involvement. High throughput, higher CAPEX.' },
                        { v: 'conveyor', l: 'Automated conveyorised tunnel', d: 'Mechanical conveyor carrying assets through enclosed spray chambers. High throughput for repetitive planar assets.' },
                        { v: 'specialist', l: 'Specialist / robotic / bespoke', d: 'Non-standard geometry, hazardous environments, or novel application requiring custom engineering.' },
                        { v: 'recommend', l: 'Recommend — Alkota to advise', d: 'Let our application engineers evaluate throughput, CAPEX, and site parameters to recommend the appropriate architecture.' },
                      ].map(({ v, l, d }) => (
                        <RadioButton
                          key={v}
                          label={l}
                          desc={d}
                          selected={formData.automationPreference === v}
                          onSelect={() => set('automationPreference', v)}
                        />
                      ))}
                    </div>

                    <div>
                      <FieldLabel>Process elements to consider (multi-select)</FieldLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {[
                          'De-mucking / high-volume strip wash',
                          'High-pressure detailing',
                          'Hot water (thermal) wash',
                          'Steam cleaning',
                          'Chemical pre-soak or dosing',
                          'Underside / underbody wash',
                          'Wheel & tyre arch wash',
                          'Final rinse / spot-free rinse',
                          'Air drying or blow-off',
                          'Biosecurity disinfection',
                        ].map((p) => (
                          <MultiSelectButton
                            key={p}
                            label={p}
                            selected={formData.processRequirements.includes(p)}
                            onToggle={() => toggleArr('processRequirements', p)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 6: WATER ───────────────────────────────────── */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={6}
                      title="Water."
                      note="Water supply, collection, and intended management strategy. Select 'Not known yet' where applicable."
                    />
                    <div className="bg-alkota-bg border border-alkota-iron p-4 text-xs font-ibm-plex-mono text-alkota-silver flex items-start gap-2">
                      <Info className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                      <span>
                        Water strategy drives civil design, treatment scope, and running cost.
                        If not yet established, this becomes a key Open Engineering Question in your brief.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <FieldLabel>Water Supply</FieldLabel>
                        <Select
                          value={formData.waterSupply}
                          onChange={(v) => set('waterSupply', v)}
                          options={[
                            { value: 'mains_high', label: 'Mains water — high-flow supply' },
                            { value: 'mains_limited', label: 'Mains water — restricted / low flow' },
                            { value: 'borehole', label: 'Borehole or spring water' },
                            { value: 'harvested', label: 'Harvested rainwater' },
                            { value: 'existing_process', label: 'Existing process water source' },
                            { value: 'tanker', label: 'Tanker delivery only' },
                            { value: 'unknown', label: 'Not yet established' },
                          ]}
                        />
                      </div>

                      <div>
                        <FieldLabel>Water Collection on Site</FieldLabel>
                        <Select
                          value={formData.waterCollection}
                          onChange={(v) => set('waterCollection', v)}
                          options={[
                            { value: 'existing_bay', label: 'Existing bunded wash bay / sump' },
                            { value: 'interceptor', label: 'Existing oil interceptor' },
                            { value: 'channel_drain', label: 'Channel / trench drainage' },
                            { value: 'none', label: 'No collection — new installation required' },
                            { value: 'unknown', label: 'Not yet established' },
                          ]}
                        />
                      </div>

                      <div>
                        <FieldLabel>Intended Water Management Strategy</FieldLabel>
                        <Select
                          value={formData.waterStrategy}
                          onChange={(v) => set('waterStrategy', v)}
                          options={[
                            { value: 'single_pass', label: 'Single-pass — consented discharge' },
                            { value: 'partial_reclaim', label: 'Partial reclaim (primary clarification)' },
                            { value: 'high_reclaim', label: 'High reclaim — closed-loop aspiration' },
                            { value: 'zero_discharge', label: 'Zero liquid discharge' },
                            { value: 'effluent_sewer', label: 'Trade effluent to foul sewer' },
                            { value: 'not_established', label: 'Not yet established — advise' },
                          ]}
                        />
                      </div>

                      <div>
                        <FieldLabel>Existing Drainage Drawings or Consents?</FieldLabel>
                        <Select
                          value={formData.drawingsExist}
                          onChange={(v) => set('drawingsExist', v)}
                          options={[
                            { value: 'yes_both', label: 'Yes — drawings and consents available' },
                            { value: 'yes_drawings', label: 'Yes — drawings only' },
                            { value: 'yes_consent', label: 'Yes — trade effluent consent exists' },
                            { value: 'no', label: 'No — none available' },
                            { value: 'unknown', label: 'Not yet established' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 7: SITE & INFRASTRUCTURE ───────────────────── */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={7}
                      title="Site & infrastructure."
                      note="Physical site, utility constraints, and existing plant conditions."
                    />
                    <NotKnownNote />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Site Postcode / Location</FieldLabel>
                        <TextInput
                          value={formData.sitePostcode}
                          onChange={(v) => set('sitePostcode', v)}
                          placeholder="e.g. Warrington, WA1 or Aberdeen, AB21"
                        />
                      </div>
                      <div>
                        <FieldLabel>Indoor / Outdoor</FieldLabel>
                        <Select
                          value={formData.siteIndoorOutdoor}
                          onChange={(v) => set('siteIndoorOutdoor', v)}
                          options={[
                            { value: 'indoor_dedicated', label: 'Indoor — dedicated wash bay building' },
                            { value: 'indoor_shared', label: 'Indoor — shared maintenance building' },
                            { value: 'outdoor_canopy', label: 'Outdoor — covered canopy' },
                            { value: 'outdoor_open', label: 'Outdoor — open apron' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Site Type</FieldLabel>
                        <Select
                          value={formData.siteNewExisting}
                          onChange={(v) => set('siteNewExisting', v)}
                          options={[
                            { value: 'greenfield', label: 'New build / greenfield' },
                            { value: 'existing', label: 'Existing operational facility' },
                            { value: 'temporary', label: 'Temporary / demountable site' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Available Footprint (approx)</FieldLabel>
                        <TextInput
                          value={formData.siteFootprint}
                          onChange={(v) => set('siteFootprint', v)}
                          placeholder="e.g. 15m × 8m, or unconstrained"
                        />
                      </div>
                      <div>
                        <FieldLabel>Electrical Supply</FieldLabel>
                        <Select
                          value={formData.electricalSupply}
                          onChange={(v) => set('electricalSupply', v)}
                          options={[
                            { value: '3phase_400v', label: '3-phase 400V available' },
                            { value: 'single_230v', label: 'Single phase 230V only' },
                            { value: 'generator', label: 'Generator power only' },
                            { value: 'capacity_unknown', label: 'Supply available — capacity unknown' },
                            { value: 'unknown', label: 'Not yet confirmed' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Water Heating Fuel Preference</FieldLabel>
                        <Select
                          value={formData.heatingFuel}
                          onChange={(v) => set('heatingFuel', v)}
                          options={[
                            { value: 'natural_gas', label: 'Mains natural gas' },
                            { value: 'lpg', label: 'LPG / propane storage' },
                            { value: 'diesel_hvo', label: 'Diesel / red diesel / HVO' },
                            { value: 'electric', label: 'All-electric' },
                            { value: 'cold_only', label: 'Cold water only — no heating' },
                            { value: 'unknown', label: 'Not yet established' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Site Drainage Type</FieldLabel>
                        <Select
                          value={formData.drainageType}
                          onChange={(v) => set('drainageType', v)}
                          options={[
                            { value: 'foul_sewer', label: 'Connection to foul sewer' },
                            { value: 'surface_water', label: 'Surface water only' },
                            { value: 'combined', label: 'Combined sewer' },
                            { value: 'attenuation', label: 'Attenuation / soakaway' },
                            { value: 'unknown', label: 'Not yet confirmed' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Frost Risk</FieldLabel>
                        <Select
                          value={formData.frostRisk}
                          onChange={(v) => set('frostRisk', v)}
                          options={[
                            { value: 'high', label: 'High — outdoor exposed, northern UK' },
                            { value: 'moderate', label: 'Moderate — sheltered outdoor' },
                            { value: 'low', label: 'Low — indoor or southern UK' },
                            { value: 'unknown', label: 'Not yet assessed' },
                          ]}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Site Restrictions or Constraints</FieldLabel>
                      <textarea
                        rows={2}
                        value={formData.siteRestrictions}
                        onChange={(e) => set('siteRestrictions', e.target.value)}
                        placeholder="e.g. listed building, access restrictions, noise limits, planning conditions, overhead cables..."
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>

                    {/* ── BROWNFIELD BRANCH ──────────────────────────── */}
                    <div className="pt-4 border-t border-alkota-iron">
                      <FieldLabel>Is there an existing wash plant on this site?</FieldLabel>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                          { v: 'yes', l: 'Yes — existing plant' },
                          { v: 'no', l: 'No — new installation' },
                          { v: 'unknown', l: 'Not yet confirmed' },
                        ].map(({ v, l }) => (
                          <RadioButton
                            key={v}
                            label={l}
                            selected={formData.hasBrownfieldPlant === v}
                            onSelect={() => set('hasBrownfieldPlant', v)}
                          />
                        ))}
                      </div>
                    </div>

                    {formData.hasBrownfieldPlant === 'yes' && (
                      <div className="space-y-4 bg-alkota-bg border border-alkota-orange/30 p-6">
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                          BROWNFIELD — EXISTING PLANT INFORMATION
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <FieldLabel>Existing Plant Manufacturer / Type</FieldLabel>
                            <TextInput
                              value={formData.existingManufacturer}
                              onChange={(v) => set('existingManufacturer', v)}
                              placeholder="e.g. Karcher, Nilfisk, bespoke fabrication..."
                            />
                          </div>
                          <div>
                            <FieldLabel>Approximate Age of Existing Plant</FieldLabel>
                            <Select
                              value={formData.existingAge}
                              onChange={(v) => set('existingAge', v)}
                              options={[
                                { value: 'lt5', label: 'Less than 5 years' },
                                { value: '5_10', label: '5–10 years' },
                                { value: '10_15', label: '10–15 years' },
                                { value: 'gt15', label: 'More than 15 years' },
                                { value: 'unknown', label: 'Age unknown' },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <FieldLabel>Current Problems or Deficiencies</FieldLabel>
                          <textarea
                            rows={2}
                            value={formData.existingProblems}
                            onChange={(e) => set('existingProblems', e.target.value)}
                            placeholder="e.g. insufficient throughput, pump failures, no water recycling, poor chassis coverage, compliance issues..."
                            className="w-full p-3 text-xs bg-white border border-alkota-iron focus:border-alkota-orange outline-none"
                          />
                        </div>
                        <div>
                          <FieldLabel>Components to Retain vs Replace</FieldLabel>
                          <Select
                            value={formData.existingRetainReplace}
                            onChange={(v) => set('existingRetainReplace', v)}
                            options={[
                              { value: 'full_replace', label: 'Full replacement — nothing to retain' },
                              { value: 'partial', label: 'Partial — some components to retain (specify in notes)' },
                              { value: 'refurb', label: 'Refurbishment / upgrade of existing plant' },
                              { value: 'unknown', label: 'To be determined in site survey' },
                            ]}
                          />
                        </div>
                        <div>
                          <FieldLabel>Interest in Refurbishment / Upgrade Route?</FieldLabel>
                          <div className="grid grid-cols-3 gap-3 mt-2">
                            {[
                              { v: 'yes', l: 'Yes — interested' },
                              { v: 'no', l: 'No — full replacement' },
                              { v: 'advise', l: 'Advise us' },
                            ].map(({ v, l }) => (
                              <RadioButton
                                key={v}
                                label={l}
                                selected={formData.refurbishmentInterest === v}
                                onSelect={() => set('refurbishmentInterest', v)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 8: PROJECT & PROCUREMENT ────────────────────── */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={8}
                      title="Project & procurement."
                      note="Project stage and procurement route help us calibrate the appropriate level of engineering response."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <FieldLabel>Current Project Stage</FieldLabel>
                        <div className="space-y-2 mt-2">
                          {[
                            { v: 'early_feasibility', l: 'Early feasibility / scoping', d: 'Exploring options and budget order' },
                            { v: 'business_case', l: 'Business case / budget planning', d: 'Building investment approval' },
                            { v: 'specification', l: 'Specification stage', d: 'Defining scope for tender' },
                            { v: 'tender', l: 'Active tender', d: 'Actively receiving proposals' },
                            { v: 'approved', l: 'Budget approved — proceed', d: 'Ready to commission engineering' },
                            { v: 'replacement_urgent', l: 'Replacement — urgent', d: 'Existing plant failure or critical issue' },
                          ].map(({ v, l, d }) => (
                            <RadioButton
                              key={v}
                              label={l}
                              desc={d}
                              selected={formData.projectStage === v}
                              onSelect={() => set('projectStage', v)}
                            />
                          ))}
                        </div>
                        <NotKnownNote />
                      </div>

                      <div className="space-y-6">
                        <div>
                          <FieldLabel>Procurement Route</FieldLabel>
                          <Select
                            value={formData.procurementRoute}
                            onChange={(v) => set('procurementRoute', v)}
                            options={[
                              { value: 'direct_end_user', label: 'Direct — end user (no intermediary)' },
                              { value: 'consultant', label: 'Consultant / M&E specification' },
                              { value: 'main_contractor', label: 'Main contractor / EPC' },
                              { value: 'fm_framework', label: 'FM / framework agreement' },
                              { value: 'competitive_tender', label: 'Competitive formal tender' },
                              { value: 'not_established', label: 'Not yet established' },
                            ]}
                          />
                        </div>

                        <div>
                          <FieldLabel>Target Commissioning Timing</FieldLabel>
                          <Select
                            value={formData.targetTiming}
                            onChange={(v) => set('targetTiming', v)}
                            options={[
                              { value: 'lt3m', label: 'Within 3 months (urgent)' },
                              { value: '3_6m', label: '3–6 months' },
                              { value: '6_12m', label: '6–12 months' },
                              { value: '12_24m', label: '12–24 months' },
                              { value: 'gt24m', label: 'More than 24 months' },
                              { value: 'not_established', label: 'Not yet established' },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 9: BUDGET & LIFECYCLE ────────────────────────── */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <StepHeader
                      step={9}
                      title="Indicative budget & lifecycle requirements."
                      note="Budget bands are project scope indicators — not Alkota pricing. Lifecycle support requirements help us configure an appropriate post-commissioning proposal."
                    />
                    <div>
                      <FieldLabel>Indicative Budget Band</FieldLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {[
                          'Below £100k',
                          '£100k – £250k',
                          '£250k – £500k',
                          '£500k – £1m',
                          '£1m+',
                          'Not yet established',
                        ].map((band) => (
                          <button
                            type="button"
                            key={band}
                            onClick={() => set('budgetBand', band)}
                            className={`p-4 text-xs uppercase tracking-wide border transition-all text-center ${
                              formData.budgetBand === band
                                ? 'border-alkota-orange bg-alkota-orange text-white'
                                : 'border-alkota-iron hover:border-alkota-silver bg-alkota-bg text-alkota-black'
                            }`}
                          >
                            {band}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] font-ibm-plex-mono text-alkota-silver mt-2">
                        Budget bands help match engineering response depth. Final scope and pricing are established through engineering review.
                      </p>
                    </div>

                    <div>
                      <FieldLabel>Lifecycle Support Considerations</FieldLabel>
                      <p className="text-[11px] font-ibm-plex-mono text-alkota-silver mb-3">
                        Select areas relevant to your post-commissioning requirements.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Planned Preventative Maintenance (PPM)',
                          'Priority reactive callout / emergency cover',
                          'Critical spares site holding package',
                          'Operator & EHS training',
                          'Remote diagnostics & telemetry',
                          'Quarterly environmental / water quality audit',
                          'Multi-site asset management',
                          'Pump & burner overhaul cover',
                          'Lifecycle replacement forecasting',
                          'Refurbishment at end of design life',
                        ].map((r) => (
                          <MultiSelectButton
                            key={r}
                            label={r}
                            selected={formData.lifecycleRequirements.includes(r)}
                            onToggle={() => toggleArr('lifecycleRequirements', r)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-alkota-bg border border-alkota-iron p-5 font-ibm-plex-mono text-xs text-alkota-silver space-y-2">
                      <strong className="text-alkota-black block uppercase tracking-widest text-[10px]">WHAT HAPPENS NEXT</strong>
                      <p>When you click Continue, we compile your inputs into a <strong className="text-alkota-black">Preliminary Project Brief</strong>. Open Engineering Questions are automatically identified where inputs were incomplete or unknown.</p>
                      <p>You can review the brief, print it, and then decide whether to send it to Alkota. Your data is never published or shared without your explicit authorisation.</p>
                    </div>
                  </div>
                )}

                {/* ── NAVIGATION ───────────────────────────────────────── */}
                <div className="mt-8 pt-6 border-t border-alkota-iron flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest text-alkota-black border border-alkota-iron hover:border-alkota-orange disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-alkota-black text-white px-8 py-3.5 text-xs uppercase tracking-[0.25em] hover:bg-alkota-orange transition-colors"
                  >
                    <span>
                      {currentStep === TOTAL_STEPS
                        ? 'Generate Project Brief'
                        : `Continue to Step ${currentStep + 1}`}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── FOOTER NOTE ─────────────────────────────────────────────── */}
          {!submitted && (
            <div className="mt-8 text-center font-ibm-plex-mono text-[10px] text-alkota-silver no-print">
              <p>Your draft is automatically saved to this browser. Navigating away and returning will restore your progress.</p>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}
