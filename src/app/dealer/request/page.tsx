'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2, User, Briefcase, Package, Map, Wrench,
  ChevronRight, ChevronLeft, CheckCircle2, ArrowRight,
  AlertCircle, Loader2,
} from 'lucide-react';

// ─── Step Configuration ──────────────────────────────────────
const STEPS = [
  { id: 1, key: 'company',      label: 'Company',      icon: Building2  },
  { id: 2, key: 'contact',      label: 'Contact',      icon: User        },
  { id: 3, key: 'business',     label: 'Business',     icon: Briefcase   },
  { id: 4, key: 'capabilities', label: 'Capabilities', icon: Wrench      },
  { id: 5, key: 'products',     label: 'Products',     icon: Package     },
  { id: 6, key: 'review',       label: 'Review',       icon: CheckCircle2 },
];

const INDUSTRIES = [
  'Agriculture & Farming', 'Automotive & Fleet', 'Commercial Vehicle',
  'Construction', 'Food & Beverage Processing', 'Industrial Manufacturing',
  'Logistics & Distribution', 'Mining & Quarrying', 'Municipal / Local Authority',
  'Offshore & Marine', 'Oil & Gas', 'Plant Hire', 'Waste Management', 'Other',
];

const PRODUCT_INTERESTS = [
  'Hot Water Pressure Washers', 'Cold Water Pressure Washers', 'Steam Cleaners',
  'Bespoke Trailer Rigs', 'Stationary / Cabinet Systems', 'Industrial Parts Washers',
  'Water Treatment & Recovery', 'Hydrus Chemicals', 'Genuine Parts & Accessories',
  'Service & Maintenance Contracts',
];

const REGIONS = [
  'East Midlands', 'East of England', 'Greater London', 'North East England',
  'North West England', 'Northern Ireland', 'Scotland', 'South East England',
  'South West England', 'Wales', 'West Midlands', 'Yorkshire & Humber',
];

type FormData = {
  // Company
  company_name: string; trading_name: string; company_reg: string;
  vat_number: string; website: string;
  address_line1: string; address_line2: string; town: string;
  county: string; postcode: string;
  // Contact
  contact_name: string; job_title: string; email: string;
  phone: string; mobile: string;
  // Business
  years_in_business: string; num_employees: string;
  business_type: string; estimated_annual_sales: string;
  current_brands_represented: string; current_pw_brands: string;
  annual_pressure_washer_units: string;
  // Capabilities
  workshop_facilities: boolean; mobile_service_capability: boolean;
  service_van_count: string; parts_service_capability: boolean;
  geographic_territory: string;
  // Products
  dealer_interests: string[]; industries_served: string[];
  additional_notes: string;
};

const INITIAL: FormData = {
  company_name: '', trading_name: '', company_reg: '', vat_number: '', website: '',
  address_line1: '', address_line2: '', town: '', county: '', postcode: '',
  contact_name: '', job_title: '', email: '', phone: '', mobile: '',
  years_in_business: '', num_employees: '', business_type: '', estimated_annual_sales: '',
  current_brands_represented: '', current_pw_brands: '', annual_pressure_washer_units: '',
  workshop_facilities: false, mobile_service_capability: false, service_van_count: '0',
  parts_service_capability: false, geographic_territory: '',
  dealer_interests: [], industries_served: [], additional_notes: '',
};

// ─── Field Components ────────────────────────────────────────
function Field({
  label, required, children, hint,
}: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
        {label}{required && <span className="text-alkota-orange ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-alkota-silver mt-1">{hint}</p>}
    </div>
  );
}

function Input({
  value, onChange, placeholder, type = 'text', required,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white border border-[#E8E8E4] px-4 py-2.5 text-sm text-alkota-black placeholder-alkota-iron outline-none focus:border-alkota-orange transition-colors"
    />
  );
}

function Checkbox({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`h-4 w-4 border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
          checked ? 'bg-alkota-orange border-alkota-orange' : 'border-[#E8E8E4] bg-white'
        }`}
      >
        {checked && <CheckCircle2 className="h-3 w-3 text-white" />}
      </div>
      <span className="text-sm text-alkota-black">{label}</span>
    </label>
  );
}

// ─── Steps ───────────────────────────────────────────────────

function StepCompany({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Registered Company Name" required>
          <Input value={data.company_name} onChange={(v) => set('company_name', v)} placeholder="Acme Cleaning Solutions Ltd" required />
        </Field>
        <Field label="Trading Name" hint="If different from registered name">
          <Input value={data.trading_name} onChange={(v) => set('trading_name', v)} placeholder="Optional" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company Registration Number" hint="Companies House number">
          <Input value={data.company_reg} onChange={(v) => set('company_reg', v)} placeholder="12345678" />
        </Field>
        <Field label="VAT Registration Number">
          <Input value={data.vat_number} onChange={(v) => set('vat_number', v)} placeholder="GB123456789" />
        </Field>
      </div>
      <Field label="Company Website">
        <Input value={data.website} onChange={(v) => set('website', v)} placeholder="https://www.yourcompany.co.uk" type="url" />
      </Field>
      <div className="pt-2 border-t border-[#E8E8E4]">
        <p className="text-[10px] uppercase tracking-widest text-alkota-silver mb-4">Registered Address</p>
        <div className="space-y-4">
          <Field label="Address Line 1" required>
            <Input value={data.address_line1} onChange={(v) => set('address_line1', v)} placeholder="Unit 4, Industrial Estate" required />
          </Field>
          <Field label="Address Line 2">
            <Input value={data.address_line2} onChange={(v) => set('address_line2', v)} placeholder="Optional" />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Town / City" required>
              <Input value={data.town} onChange={(v) => set('town', v)} placeholder="Sheffield" required />
            </Field>
            <Field label="County">
              <Input value={data.county} onChange={(v) => set('county', v)} placeholder="South Yorkshire" />
            </Field>
            <Field label="Postcode" required>
              <Input value={data.postcode} onChange={(v) => set('postcode', v)} placeholder="S1 2AB" required />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepContact({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Primary Contact Name" required>
          <Input value={data.contact_name} onChange={(v) => set('contact_name', v)} placeholder="James Hartley" required />
        </Field>
        <Field label="Job Title">
          <Input value={data.job_title} onChange={(v) => set('job_title', v)} placeholder="Managing Director" />
        </Field>
      </div>
      <Field label="Email Address" required hint="Your dealer portal invitation will be sent to this address">
        <Input value={data.email} onChange={(v) => set('email', v)} placeholder="james@yourcompany.co.uk" type="email" required />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Direct Telephone" required>
          <Input value={data.phone} onChange={(v) => set('phone', v)} placeholder="01234 567890" type="tel" required />
        </Field>
        <Field label="Mobile Number">
          <Input value={data.mobile} onChange={(v) => set('mobile', v)} placeholder="07700 900000" type="tel" />
        </Field>
      </div>
    </div>
  );
}

function StepBusiness({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Years Trading" required>
          <Input value={data.years_in_business} onChange={(v) => set('years_in_business', v)} placeholder="e.g. 12" type="number" required />
        </Field>
        <Field label="Number of Employees">
          <Input value={data.num_employees} onChange={(v) => set('num_employees', v)} placeholder="e.g. 18" type="number" />
        </Field>
        <Field label="Pressure Washers Sold / Year" hint="Approximate units">
          <Input value={data.annual_pressure_washer_units} onChange={(v) => set('annual_pressure_washer_units', v)} placeholder="e.g. 40" type="number" />
        </Field>
      </div>
      <Field label="Estimated Annual Turnover">
        <select
          value={data.estimated_annual_sales}
          onChange={(e) => set('estimated_annual_sales', e.target.value)}
          className="w-full bg-white border border-[#E8E8E4] px-4 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange transition-colors"
        >
          <option value="">Select range…</option>
          {['Under £250k', '£250k – £500k', '£500k – £1M', '£1M – £2.5M', '£2.5M – £5M', 'Over £5M'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </Field>
      <Field label="Current Brands Represented" hint="List the cleaning / pressure washing brands you currently stock or represent">
        <textarea
          value={data.current_brands_represented}
          onChange={(e) => set('current_brands_represented', e.target.value)}
          placeholder="E.g. Karcher, Nilfisk, Pressure-Pro…"
          rows={2}
          className="w-full bg-white border border-[#E8E8E4] px-4 py-2.5 text-sm text-alkota-black placeholder-alkota-iron outline-none focus:border-alkota-orange transition-colors resize-none"
        />
      </Field>
      <Field label="Industries You Currently Serve" hint="Select all that apply">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {INDUSTRIES.map((ind) => (
            <label key={ind} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.industries_served.includes(ind)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...data.industries_served, ind]
                    : data.industries_served.filter((i) => i !== ind);
                  set('industries_served', next);
                }}
                className="accent-alkota-orange"
              />
              <span className="text-xs text-alkota-black">{ind}</span>
            </label>
          ))}
        </div>
      </Field>
    </div>
  );
}

function StepCapabilities({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-widest text-alkota-silver">Service Capabilities</p>
        <Checkbox checked={data.workshop_facilities} onChange={(v) => set('workshop_facilities', v)} label="We have a dedicated workshop facility" />
        <Checkbox checked={data.mobile_service_capability} onChange={(v) => set('mobile_service_capability', v)} label="We have mobile service / on-site service capability" />
        <Checkbox checked={data.parts_service_capability} onChange={(v) => set('parts_service_capability', v)} label="We hold or are willing to hold a stock of service parts" />
      </div>

      {data.mobile_service_capability && (
        <Field label="Number of Mobile Service Vans" required>
          <Input value={data.service_van_count} onChange={(v) => set('service_van_count', v)} placeholder="e.g. 3" type="number" />
        </Field>
      )}

      <Field label="Proposed Territory" required hint="Which region(s) do you primarily operate in?">
        <select
          value={data.geographic_territory}
          onChange={(e) => set('geographic_territory', e.target.value)}
          className="w-full bg-white border border-[#E8E8E4] px-4 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange transition-colors"
          required
        >
          <option value="">Select your primary region…</option>
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>
    </div>
  );
}

function StepProducts({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Products & Services of Interest" hint="Select all that apply">
        <div className="grid sm:grid-cols-2 gap-2 mt-1">
          {PRODUCT_INTERESTS.map((pi) => (
            <label key={pi} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.dealer_interests.includes(pi)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...data.dealer_interests, pi]
                    : data.dealer_interests.filter((i) => i !== pi);
                  set('dealer_interests', next);
                }}
                className="accent-alkota-orange"
              />
              <span className="text-sm text-alkota-black">{pi}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Additional Information" hint="Anything else you'd like us to know about your business or application">
        <textarea
          value={data.additional_notes}
          onChange={(e) => set('additional_notes', e.target.value)}
          placeholder="Tell us about your business, any specific requirements, or why you'd like to become an Alkota dealer…"
          rows={5}
          className="w-full bg-white border border-[#E8E8E4] px-4 py-2.5 text-sm text-alkota-black placeholder-alkota-iron outline-none focus:border-alkota-orange transition-colors resize-none"
        />
      </Field>
    </div>
  );
}

function StepReview({ data }: { data: FormData }) {
  const sections = [
    { label: 'Company', items: [
      { k: 'Registered Name', v: data.company_name },
      { k: 'Trading Name', v: data.trading_name || '—' },
      { k: 'Company Reg', v: data.company_reg || '—' },
      { k: 'VAT Number', v: data.vat_number || '—' },
      { k: 'Address', v: [data.address_line1, data.town, data.postcode].filter(Boolean).join(', ') },
    ]},
    { label: 'Contact', items: [
      { k: 'Name', v: data.contact_name },
      { k: 'Job Title', v: data.job_title || '—' },
      { k: 'Email', v: data.email },
      { k: 'Telephone', v: data.phone },
    ]},
    { label: 'Business', items: [
      { k: 'Years Trading', v: data.years_in_business || '—' },
      { k: 'Employees', v: data.num_employees || '—' },
      { k: 'Turnover', v: data.estimated_annual_sales || '—' },
      { k: 'Territory', v: data.geographic_territory || '—' },
    ]},
    { label: 'Products of Interest', items: [
      { k: 'Selected', v: data.dealer_interests.length > 0 ? data.dealer_interests.join(', ') : '—' },
    ]},
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-[10px] uppercase tracking-widest text-alkota-orange mb-3">{section.label}</p>
          <div className="bg-[#FAF9F5] border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
            {section.items.map((item) => (
              <div key={item.k} className="px-4 py-2.5 flex gap-4">
                <span className="text-[10px] text-alkota-silver w-32 shrink-0">{item.k}</span>
                <span className="text-xs text-alkota-black">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-alkota-orange/5 border border-alkota-orange/20 px-4 py-4">
        <p className="text-xs text-alkota-black leading-relaxed">
          By submitting this application I confirm that the information provided is accurate and complete.
          I understand that submitting this form does not guarantee dealer status. Alkota UK reserves the
          right to approve, decline, or request further information regarding any application.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export default function DealerApplicationPage() {
  const [step, setStep]           = useState(1);
  const [data, setData]           = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]  = useState(false);
  const [reference, setReference]  = useState('');
  const [error, setError]          = useState('');

  function set(key: keyof FormData, value: any) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function canProceed(): boolean {
    if (step === 1) return !!(data.company_name && data.address_line1 && data.town && data.postcode);
    if (step === 2) return !!(data.contact_name && data.email && data.phone);
    if (step === 3) return !!(data.years_in_business);
    if (step === 4) return !!(data.geographic_territory);
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/dealer/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      setReference(json.reference);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // ── Confirmation ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAF9F5]">
        <div className="px-6 py-4 border-b border-[#E8E8E4] bg-white flex items-center justify-between">
          <Link href="/dealer" className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-alkota-black flex items-center justify-center">
              <span className="text-alkota-orange text-xs">A</span>
            </div>
            <span className="text-xs text-alkota-black">ALKOTA <span className="text-alkota-orange">UK</span></span>
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-6 py-16">
          <div className="w-full max-w-lg text-center">
            <div className="h-16 w-16 bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extralight text-alkota-black tracking-tight mb-3">
              Application Received
            </h1>
            <p className="text-sm text-alkota-silver leading-relaxed mb-6">
              Thank you for your interest in becoming an authorised Alkota UK dealer.
              Our commercial team will review your application and contact you within
              <strong className="text-alkota-black"> 5 working days</strong>.
            </p>
            <div className="bg-white border border-[#E8E8E4] px-6 py-4 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-alkota-silver mb-1">Application Reference</p>
              <p className="text-lg text-alkota-orange">{reference}</p>
              <p className="text-[11px] text-alkota-silver mt-1">Please quote this reference in any correspondence</p>
            </div>
            <p className="text-sm text-alkota-silver mb-6">
              A confirmation has been sent to <strong className="text-alkota-black">{data.email}</strong>
            </p>
            <Link
              href="/dealer"
              className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
            >
              Return to Dealer Portal <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-[#E8E8E4] bg-white flex items-center justify-between sticky top-0 z-10">
        <Link href="/dealer" className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-alkota-black flex items-center justify-center">
            <span className="text-alkota-orange text-xs">A</span>
          </div>
          <div>
            <span className="text-xs text-alkota-black">ALKOTA <span className="text-alkota-orange">UK</span></span>
            <p className="text-[10px] text-alkota-silver uppercase tracking-widest leading-none">Dealer Application</p>
          </div>
        </Link>
        <Link href="/dealer/login" className="text-[10px] uppercase tracking-widest text-alkota-silver hover:text-alkota-orange">
          Existing Dealer? Log In →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight mb-2">
            Dealer Partnership Application
          </h1>
          <p className="text-sm text-alkota-silver">
            Apply to join the Alkota UK authorised dealer network. All information is treated confidentially.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, idx) => {
            const isComplete = step > s.id;
            const isActive   = step === s.id;
            return (
              <div key={s.id} className="flex items-center shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-widest ${
                  isActive   ? 'text-alkota-orange border-b-2 border-alkota-orange' :
                  isComplete ? 'text-alkota-black' : 'text-alkota-iron'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange" />
                  ) : (
                    <s.icon className={`h-3.5 w-3.5 ${isActive ? 'text-alkota-orange' : 'text-alkota-iron'}`} />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.id}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-alkota-iron mx-1 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white border border-[#E8E8E4] p-6 sm:p-8 mb-6">
          <h2 className="text-base font-light text-alkota-black mb-1">
            {STEPS[step - 1].label}
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-alkota-silver mb-6">
            Step {step} of {STEPS.length}
          </p>

          {step === 1 && <StepCompany      data={data} set={set} />}
          {step === 2 && <StepContact      data={data} set={set} />}
          {step === 3 && <StepBusiness     data={data} set={set} />}
          {step === 4 && <StepCapabilities data={data} set={set} />}
          {step === 5 && <StepProducts     data={data} set={set} />}
          {step === 6 && <StepReview       data={data} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#E8E8E4] text-xs uppercase tracking-widest text-alkota-silver hover:text-alkota-black hover:border-alkota-black transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back
          </button>

          {step < STEPS.length ? (
            <button
              onClick={() => canProceed() && setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-7 py-2.5 text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              Continue <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-7 py-2.5 text-xs uppercase tracking-widest transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting…</>
              ) : (
                <>Submit Application <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
