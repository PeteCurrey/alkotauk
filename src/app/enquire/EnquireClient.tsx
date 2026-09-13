'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';
import ContextBanner from '@/components/enquiry/ContextBanner';
import RequirementsSummary from '@/components/enquiry/RequirementsSummary';
import MachineContextSection, { ResolvedMachineContext } from '@/components/enquiry/MachineContextSection';
import { EnquirySource, MachineRole } from '@/lib/enquiries/schema';
import {
  trackEnquiryView,
  trackEnquiryStepComplete,
  trackEnquiryValidationError,
  trackEnquirySubmit,
  trackEnquirySuccess,
  trackEnquiryFailure,
} from '@/lib/analytics';
import { Product } from '@/lib/products';

export default function EnquireClient() {
  const searchParams = useSearchParams();

  // Raw incoming URL parameters
  const rawSource = searchParams.get('source') || searchParams.get('enquiry') || '';
  const machinesParam = searchParams.get('machines') || '';
  const modelsParam = searchParams.get('models') || searchParams.get('model') || '';
  const productParam = searchParams.get('product') || searchParams.get('machine') || '';

  // Structured requirements from selector
  const appParam = searchParams.get('app');
  const waterParam = searchParams.get('water');
  const pressParam = searchParams.get('press');
  const flowParam = searchParams.get('flow');
  const powerParam = searchParams.get('power');
  const voltParam = searchParams.get('volt');
  const phaseParam = searchParams.get('phase');
  const mobParam = searchParams.get('mob');
  const prefsParam = searchParams.get('prefs');

  // Map source to canonical EnquirySource
  const canonicalSource: EnquirySource = useMemo(() => {
    const s = rawSource.toUpperCase();
    if (s.includes('SELECTOR') || s === 'HELP-ME-CHOOSE') return 'MACHINE_SELECTOR';
    if (s.includes('COMPARE') || s.includes('COMPARISON')) return 'MACHINE_COMPARISON';
    if (s.includes('QUOTE') || s.includes('CONSULTATION') || s.includes('DETAIL') || productParam) {
      return 'MACHINE_DETAIL';
    }
    if (s.includes('PART')) return 'PARTS';
    if (s.includes('ATTACHMENT')) return 'ATTACHMENTS';
    if (s.includes('CHEMICAL')) return 'CHEMICALS';
    return 'GENERAL';
  }, [rawSource, productParam]);

  // Form input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [postcode, setPostcode] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'either'>('either');
  const [sitePower, setSitePower] = useState('not_sure');
  const [siteWater, setSiteWater] = useState('mains_standard');
  const [timeline, setTimeline] = useState('1_month');
  const [message, setMessage] = useState('');

  // UI state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState<string | null>(null);

  // Machine resolution state
  const [resolvedMachines, setResolvedMachines] = useState<ResolvedMachineContext[]>([]);
  const [isLoadingMachines, setIsLoadingMachines] = useState(false);

  // Parse structured requirements
  const structuredReqs = useMemo(() => {
    const r: Record<string, any> = {};
    if (appParam) r.application = appParam;
    if (waterParam) r.waterType = waterParam;
    if (pressParam) r.minPressureBar = Number(pressParam);
    if (flowParam) r.minFlowLpm = Number(flowParam);
    if (powerParam) r.powerSource = powerParam;
    if (voltParam) r.voltage = voltParam;
    if (phaseParam) r.phase = phaseParam;
    if (mobParam) r.mobility = mobParam;
    if (prefsParam) r.preferences = prefsParam.split(',').filter(Boolean);
    return r;
  }, [appParam, waterParam, pressParam, flowParam, powerParam, voltParam, phaseParam, mobParam, prefsParam]);

  // Resolve equipment previews from /api/machines/search
  useEffect(() => {
    const rawIdentifiers = [
      ...machinesParam.split(','),
      ...modelsParam.split(','),
      productParam,
    ]
      .map(s => s.trim())
      .filter(Boolean);

    if (rawIdentifiers.length === 0) return;

    setIsLoadingMachines(true);
    const searchUrl = `/api/machines/search?slugs=${encodeURIComponent(
      rawIdentifiers.join(',')
    )}&models=${encodeURIComponent(rawIdentifiers.join(','))}&limit=10`;

    fetch(searchUrl)
      .then(res => (res.ok ? res.json() : Promise.reject('Search error')))
      .then(data => {
        if (data.results && Array.isArray(data.results)) {
          const mapped: ResolvedMachineContext[] = data.results.map((p: Product, idx: number) => {
            let role: MachineRole = 'PRIMARY';
            if (canonicalSource === 'MACHINE_SELECTOR') role = 'SHORTLIST';
            if (canonicalSource === 'MACHINE_COMPARISON') role = 'COMPARISON';

            return {
              slug: p.slug,
              model_code: p.model_code,
              name: p.name,
              category: p.category,
              pressure_bar: p.pressure_bar,
              flow_rate_lpm: p.flow_rate_lpm,
              power_source: p.power_source,
              heating_fuel: p.heating_fuel,
              voltage: p.voltage,
              primary_image_url: p.primary_image_url,
              selection_status: canonicalSource === 'MACHINE_SELECTOR' ? 'STRONG_MATCH' : null,
              role,
              is_selected_focus: idx === 0,
            };
          });
          setResolvedMachines(mapped);
        }
      })
      .catch(err => {
        console.debug('Failed to fetch machine preview:', err);
      })
      .finally(() => {
        setIsLoadingMachines(false);
      });
  }, [machinesParam, modelsParam, productParam, canonicalSource]);

  // Fire view analytics once on mount
  useEffect(() => {
    trackEnquiryView({
      source: canonicalSource,
      machine_count: resolvedMachines.length,
      models: resolvedMachines.map(m => m.model_code),
    });
  }, [canonicalSource, resolvedMachines.length]);

  // Context-aware default message placeholders
  const contextualPlaceholder = useMemo(() => {
    switch (canonicalSource) {
      case 'MACHINE_SELECTOR':
        return 'Tell us about your site electrical supply, water throughput, or any specific operational requirements...';
      case 'MACHINE_COMPARISON':
        return 'Tell us about which machine best fits your duty cycle, or if you need advice on comparing pump components...';
      case 'MACHINE_DETAIL':
        return 'Tell us about your application, operating hours, delivery location, or trade-in requirements...';
      default:
        return 'Tell us about your cleaning challenge or equipment requirement...';
    }
  }, [canonicalSource]);

  // Validate form client-side before submission
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Full name is required.';
    }

    if (!email.trim()) {
      errors.email = 'Corporate email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (canonicalSource === 'MACHINE_COMPARISON' && resolvedMachines.length < 2) {
      errors.machines = 'A comparison enquiry requires at least two machines.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      trackEnquiryValidationError({
        source: canonicalSource,
        field: Object.keys(errors)[0],
        message: Object.values(errors)[0],
      });
      return false;
    }

    return true;
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    trackEnquirySubmit({
      source: canonicalSource,
      machine_count: resolvedMachines.length,
      has_requirements: Object.keys(structuredReqs).length > 0,
    });

    try {
      // Build canonical SubmitEnquiryPayload
      const payload = {
        customer: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          postcode: postcode.trim() || undefined,
          preferredContactMethod: preferredContact,
        },
        source: canonicalSource,
        machines: resolvedMachines.map((m, idx) => ({
          identifier: m.slug || m.model_code,
          role: m.role,
          displayOrder: idx,
        })),
        requirements: Object.keys(structuredReqs).length > 0 ? structuredReqs : undefined,
        siteReadiness: {
          sitePower: sitePower !== 'not_sure' ? sitePower : undefined,
          siteWater: siteWater,
          timeline: timeline,
        },
        subject:
          canonicalSource === 'MACHINE_DETAIL' && resolvedMachines[0]
            ? `Enquiry: Alkota ${resolvedMachines[0].model_code} (${resolvedMachines[0].name})`
            : canonicalSource === 'MACHINE_SELECTOR'
            ? 'Enquiry: Help Me Choose Selection Shortlist'
            : canonicalSource === 'MACHINE_COMPARISON'
            ? `Enquiry: Fleet Comparison (${resolvedMachines.map(m => m.model_code).join(', ')})`
            : 'Commercial Equipment Enquiry',
        message: message.trim() || undefined,
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const msg = data.message || 'We could not submit your enquiry. Please check your details and try again.';
        setErrorMessage(msg);
        setStatus('error');
        trackEnquiryFailure({
          source: canonicalSource,
          code: data.code || 'HTTP_ERROR',
        });
        return;
      }

      setReference(data.reference);
      setStatus('success');

      trackEnquirySuccess({
        reference: data.reference,
        source: canonicalSource,
        machine_count: resolvedMachines.length,
        models: resolvedMachines.map(m => m.model_code),
      });
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Network connection failure. Your details are preserved; please click Submit again.');
      setStatus('error');
      trackEnquiryFailure({
        source: canonicalSource,
        code: 'NETWORK_ERROR',
      });
    }
  };

  // SUCCESS VIEW
  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white border border-neutral-200 rounded-[2px] p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
            Reference: {reference}
          </span>

          <h1 className="font-sans text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Enquiry Received
          </h1>

          <p className="text-neutral-600 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Thank you, <span className="text-neutral-900 font-semibold">{name}</span>. Your enquiry has been routed directly to Alkota UK application engineers.
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-[2px] p-5 text-left max-w-md mx-auto mb-8 space-y-2">
            <h4 className="font-mono text-xs uppercase font-bold text-neutral-900 tracking-wider">
              What Happens Next?
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our engineering team will review your power availability, pump ratings, and site requirements to prepare formal UK specifications and pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setMessage('');
                setReference(null);
              }}
              className="w-full sm:w-auto px-6 py-3 border border-neutral-300 text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Submit Another Query
            </button>
            <Link
              href="/machines"
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Return to Machine Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE ENQUIRY FORM VIEW
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Top Breadcrumb / Return */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/machines"
          className="text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Return to Fleet Catalogue
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Commercial Desk
        </span>
      </div>

      {/* Main Title & Lead */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
          {canonicalSource === 'MACHINE_SELECTOR'
            ? 'Request Equipment Quotation'
            : canonicalSource === 'MACHINE_COMPARISON'
            ? 'Compare & Procure Machinery'
            : canonicalSource === 'MACHINE_DETAIL'
            ? 'Direct Factory Specification Request'
            : 'Commercial Equipment Enquiry'}
        </h1>
        <p className="text-neutral-600 text-sm md:text-base max-w-2xl leading-relaxed">
          Connect directly with Alkota UK application engineers. We evaluate your electrical supply, water throughput, and operating duty cycle before issuing formal proposals.
        </p>
      </div>

      {/* Context Banner */}
      <ContextBanner
        source={canonicalSource}
        machineCount={resolvedMachines.length}
        primaryModel={resolvedMachines[0]?.model_code}
        selectorParams={searchParams.toString()}
        comparisonParams={machinesParam ? `machines=${machinesParam}` : undefined}
      />

      {/* Stated Requirements Summary (if present from selector) */}
      {Object.keys(structuredReqs).length > 0 && (
        <div className="mb-8">
          <RequirementsSummary {...structuredReqs} />
        </div>
      )}

      {/* Authoritative Machine Context Preview */}
      {resolvedMachines.length > 0 && (
        <div className="mb-10">
          <MachineContextSection
            source={canonicalSource}
            machines={resolvedMachines}
            isLoading={isLoadingMachines}
          />
        </div>
      )}

      {/* Error alert banner */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-[2px] mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold mb-0.5">Submission issue</p>
            <p>{errorMessage || 'Please correct the highlighted fields and submit again.'}</p>
          </div>
        </div>
      )}

      {/* Main Progressive Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SECTION 1: Customer Contact Details */}
        <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-[2px] shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-neutral-100">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
              1
            </span>
            <h2 className="font-sans text-lg font-bold text-neutral-900">Your Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="enquiry-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Full Name <span className="text-alkota-orange">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }));
                }}
                placeholder="e.g. John Davies"
                className={`w-full px-3.5 py-2.5 bg-neutral-50 border text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors ${
                  fieldErrors.name ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-[11px] text-red-600 font-mono mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Corporate Email */}
            <div>
              <label htmlFor="enquiry-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Corporate Email <span className="text-alkota-orange">*</span>
              </label>
              <input
                id="enquiry-email"
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. j.davies@company.co.uk"
                className={`w-full px-3.5 py-2.5 bg-neutral-50 border text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors ${
                  fieldErrors.email ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-[11px] text-red-600 font-mono mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="enquiry-company" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Company / Organisation
              </label>
              <input
                id="enquiry-company"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Apex Transport Logistics Ltd"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="enquiry-phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Telephone Number
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 07700 900123"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              />
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="enquiry-postcode" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Site Postcode / Delivery Area
              </label>
              <input
                id="enquiry-postcode"
                type="text"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                placeholder="e.g. LE11 3NE"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['email', 'phone', 'either'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPreferredContact(method)}
                    className={`py-2 px-3 text-xs font-mono uppercase tracking-wider text-center rounded-[2px] border transition-all ${
                      preferredContact === method
                        ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Site Readiness & Deployment Context */}
        <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-[2px] shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-neutral-100">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
              2
            </span>
            <h2 className="font-sans text-lg font-bold text-neutral-900">Site Readiness & Timeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Site Power */}
            <div>
              <label htmlFor="enquiry-power" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Available Power Supply
              </label>
              <select
                id="enquiry-power"
                value={sitePower}
                onChange={e => setSitePower(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              >
                <option value="not_sure">Not Sure / Needs Survey</option>
                <option value="230v_single">230V Single Phase (Standard UK)</option>
                <option value="400v_three">400V Three Phase (Industrial)</option>
                <option value="110v_site">110V Site Supply (Transformer)</option>
                <option value="petrol_diesel">Standalone (Petrol / Diesel Engine)</option>
              </select>
            </div>

            {/* Water Supply */}
            <div>
              <label htmlFor="enquiry-water" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Water Inflow Available
              </label>
              <select
                id="enquiry-water"
                value={siteWater}
                onChange={e => setSiteWater(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              >
                <option value="mains_standard">Mains Water Supply</option>
                <option value="header_tank">Break / Header Tank Supply</option>
                <option value="bowser_onboard">Mobile Bowser / Road Tank</option>
                <option value="borehole_well">Borehole / Well Inflow</option>
              </select>
            </div>

            {/* Procurement Timeline */}
            <div>
              <label htmlFor="enquiry-timeline" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
                Procurement Timeline
              </label>
              <select
                id="enquiry-timeline"
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors"
              >
                <option value="immediate">Immediate (Next 1–2 Weeks)</option>
                <option value="1_month">Within 1 Month</option>
                <option value="1_3_months">1 to 3 Months</option>
                <option value="budgetary">Budgetary / Forward Planning</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: Contextual Message */}
        <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-[2px] shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-neutral-100">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
              3
            </span>
            <h2 className="font-sans text-lg font-bold text-neutral-900">Application Notes & Questions</h2>
          </div>

          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              id="enquiry-message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={contextualPlaceholder}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-sm text-neutral-900 rounded-[2px] focus:bg-white focus:outline-none focus:border-alkota-orange transition-colors resize-y leading-relaxed"
            />
            <p className="text-[11px] text-neutral-500 font-mono mt-1">
              Include any details about continuous operating hours, chemical usage, or delivery restrictions.
            </p>
          </div>
        </div>

        {/* SECTION 4: Review & Submit */}
        <div className="bg-neutral-900 text-white p-6 md:p-8 rounded-[2px] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-alkota-orange font-bold block">
                Engineering Review Summary
              </span>
              <p className="text-sm font-medium text-neutral-300">
                {name || 'Prospective Client'} · {company || 'Independent Operative'} · {email || 'Direct Consultation'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct UK Factory Authorised</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              By submitting, your requirements are dispatched directly to our technical desk for engineering suitability review.
            </p>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-3.5 bg-alkota-orange hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all rounded-[2px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
