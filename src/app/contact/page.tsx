'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Mail, Send, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Zap, Droplets, MapPin, Calendar } from 'lucide-react';
import MachineEnquiryContextCard, { ContextCardMachine } from '@/components/enquiry/MachineEnquiryContextCard';
import { trackMachineEnquiryStarted, trackMachineEnquirySubmitted } from '@/lib/analytics';
import { Product } from '@/lib/products';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const rawEnquiry = searchParams.get('enquiry') || searchParams.get('subject') || '';
  const machinesParam = searchParams.get('machines') || '';
  const modelsParam = searchParams.get('models') || searchParams.get('model') || '';
  const productParam = searchParams.get('product') || searchParams.get('machine') || '';
  const reqsParam = searchParams.get('reqs') || '';

  // Structured query params
  const appParam = searchParams.get('app');
  const waterParam = searchParams.get('water');
  const pressParam = searchParams.get('press');
  const flowParam = searchParams.get('flow');
  const powerParam = searchParams.get('power');
  const voltParam = searchParams.get('volt');
  const phaseParam = searchParams.get('phase');
  const mobParam = searchParams.get('mob');
  const prefsParam = searchParams.get('prefs');

  const [previewMachines, setPreviewMachines] = useState<ContextCardMachine[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [submissionReference, setSubmissionReference] = useState<string | null>(null);

  // Determine normalised source
  const source: 'selector' | 'compare' | 'quote' | 'service' | 'general' = useMemo(() => {
    if (rawEnquiry === 'selector' || rawEnquiry === 'help-me-choose') return 'selector';
    if (rawEnquiry === 'compare' || rawEnquiry === 'comparison') return 'compare';
    if (rawEnquiry === 'service') return 'service';
    if (rawEnquiry === 'quote' || rawEnquiry === 'consultation' || productParam || modelsParam) return 'quote';
    return 'general';
  }, [rawEnquiry, productParam, modelsParam]);

  // Parse requirements summary list
  const requirementsSummary = useMemo(() => {
    if (!reqsParam) return [];
    return reqsParam.split('|').map(s => s.trim()).filter(Boolean);
  }, [reqsParam]);

  // Fetch machine cards preview
  useEffect(() => {
    const idsToFetch = [
      ...machinesParam.split(','),
      ...modelsParam.split(','),
      productParam
    ].map(s => s.trim()).filter(Boolean);

    if (idsToFetch.length === 0) return;

    setLoadingPreview(true);
    const searchUrl = `/api/machines/search?slugs=${encodeURIComponent(idsToFetch.join(','))}&models=${encodeURIComponent(idsToFetch.join(','))}&limit=6`;

    fetch(searchUrl)
      .then(res => res.json())
      .then(data => {
        if (data.results && Array.isArray(data.results)) {
          const cards: ContextCardMachine[] = data.results.map((p: Product) => ({
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
          }));
          setPreviewMachines(cards);
        }
      })
      .catch(err => console.debug('Failed to fetch machine preview cards:', err))
      .finally(() => setLoadingPreview(false));
  }, [machinesParam, modelsParam, productParam]);

  // Initialise subject and message defaults
  let initialEnquiry = rawEnquiry;
  let initialMessage = '';

  const modelListText = modelsParam || machinesParam || productParam || '';

  if (source === 'selector') {
    initialEnquiry = `Selection Shortlist: ${modelListText || 'Help Me Choose Fleet'}`;
    const criteriaSection = requirementsSummary.length > 0
      ? `\n\nStated Operational Requirements:\n• ${requirementsSummary.join('\n• ')}`
      : '';
    initialMessage = `I used the Alkota Help Me Choose selection engine and shortlisted the following machinery:\n${modelListText}${criteriaSection}\n\nPlease provide formal UK quotation, power suitability verification, and delivery lead time.`;
  } else if (source === 'compare') {
    initialEnquiry = `Fleet Comparison: ${modelListText}`;
    initialMessage = `I am evaluating the following Alkota models: ${modelListText}.\n\nPlease provide an engineering comparison consultation, advice on power/fuel options, and a direct factory quotation.`;
  } else if (source === 'quote' && modelListText) {
    initialEnquiry = `Machine Quotation: ${modelListText}`;
    initialMessage = `Please provide factory quotation, technical specification verification, and lead time for Alkota model: ${modelListText}.`;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    postcode: '',
    sitePower: 'not_sure',
    siteWater: 'mains_standard',
    timeline: '1_month',
    enquiry: initialEnquiry,
    message: initialMessage,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (initialEnquiry) {
      setFormData(prev => ({
        ...prev,
        enquiry: initialEnquiry,
        message: prev.message || initialMessage,
      }));
    }
  }, [initialEnquiry, initialMessage]);

  // Track enquiry started event
  useEffect(() => {
    trackMachineEnquiryStarted({
      source,
      machine_count: previewMachines.length || (modelListText ? modelListText.split(',').length : 0),
      models: modelListText ? modelListText.split(',').map(s => s.trim()) : [],
      has_requirements: requirementsSummary.length > 0,
    });
  }, [source, previewMachines.length, modelListText, requirementsSummary.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const machineSlugs = previewMachines.map(m => m.slug).filter(Boolean);
      const machineModels = previewMachines.map(m => m.model_code).filter(Boolean);

      const structuredReqs: Record<string, any> = {};
      if (appParam) structuredReqs.application = appParam;
      if (waterParam) structuredReqs.waterType = waterParam;
      if (pressParam) structuredReqs.minPressureBar = Number(pressParam);
      if (flowParam) structuredReqs.minFlowLpm = Number(flowParam);
      if (powerParam) structuredReqs.powerSource = powerParam;
      if (voltParam) structuredReqs.voltage = voltParam;
      if (phaseParam) structuredReqs.phase = Number(phaseParam);
      if (mobParam) structuredReqs.mobility = mobParam;
      if (prefsParam) structuredReqs.preferences = prefsParam.split(',');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          postcode: formData.postcode,
          site_power: formData.sitePower,
          site_water: formData.siteWater,
          timeline: formData.timeline,
          enquiry: rawEnquiry || 'quote',
          source: source === 'selector' ? 'machine_selector' : source === 'compare' ? 'machine_comparison' : 'direct_machine',
          subject: formData.enquiry ? `Enquiry: ${formData.enquiry}` : 'General Machine Enquiry',
          message: formData.message,
          machines: machineSlugs.length > 0 ? machineSlugs : machinesParam || productParam,
          models: machineModels.length > 0 ? machineModels : modelsParam,
          reqs: reqsParam,
          requirements: Object.keys(structuredReqs).length > 0 ? structuredReqs : undefined,
          requirements_summary: requirementsSummary,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      const data = await res.json();
      setSubmissionReference(data.reference || 'ALKO-REF');
      setStatus('success');

      trackMachineEnquirySubmitted({
        reference: data.reference || 'ALKO-REF',
        source,
        machine_count: previewMachines.length,
        models: previewMachines.map(m => m.model_code),
        company_provided: Boolean(formData.company),
        phone_provided: Boolean(formData.phone),
      });

    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left: Contact Form & Previews */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8 bg-alkota-iron/20 border border-alkota-iron p-8 md:p-14 relative"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[2px] w-8 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.3em] text-alkota-orange">
            {source === 'selector' ? 'Engineered Shortlist' : source === 'compare' ? 'Comparison Enquiry' : 'Direct Acquisition'}
          </span>
        </div>

        <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
          {source === 'selector' ? 'Request Shortlist Quotation' : source === 'compare' ? 'Compare & Procure Machinery' : 'Send An Enquiry'}
        </h2>
        <p className="text-alkota-grey text-sm mb-8 max-w-2xl">
          Connect directly with Alkota UK application engineers. We evaluate your electrical supply, water throughput, and operating duty cycle before issuing formal quotations.
        </p>

        {/* Machine Context Preview Card */}
        <MachineEnquiryContextCard
          source={source}
          machines={previewMachines}
          requirementsSummary={requirementsSummary}
          selectorParams={searchParams.toString()}
          comparisonParams={machinesParam ? `machines=${machinesParam}` : undefined}
        />

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-950/40 border border-emerald-500/30 p-10 md:p-12 text-center"
          >
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
            <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              Reference: {submissionReference}
            </span>
            <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-3">
              Enquiry Successfully Dispatched
            </h3>
            <p className="text-emerald-300/80 text-sm max-w-lg mx-auto mb-6">
              Thank you. Your enquiry and engineering requirements have been routed directly to our UK application specialists at <span className="text-white font-bold">sales@alkota.co.uk</span>.
            </p>

            <div className="bg-emerald-900/30 border border-emerald-500/20 p-4 max-w-md mx-auto text-left mb-8 font-ibm-plex-mono text-xs text-emerald-200">
              <p className="font-bold text-white mb-1">What Happens Next?</p>
              <p className="leading-relaxed">
                An application engineer will review your power supply suitability, pump ratings, and application requirements, and issue your formal proposal within <span className="font-bold text-white">2 business hours</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    postcode: '',
                    sitePower: 'not_sure',
                    siteWater: 'mains_standard',
                    timeline: '1_month',
                    enquiry: '',
                    message: '',
                  });
                }}
                className="inline-flex items-center gap-2 bg-emerald-500 px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-wider text-alkota-black hover:bg-emerald-400 transition-colors"
              >
                <span>Send Another Message</span>
              </button>

              <a
                href="/machines"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-wider text-white transition-colors border border-white/20"
              >
                <span>Return To Fleet</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Henderson"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  Corporate Email *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. j.henderson@industrialplant.co.uk"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>
            </div>

            {/* Row 2: Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Henderson Haulage & Logistics"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  Telephone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +44 (0) 121 456 7890"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>
            </div>

            {/* Row 3: Installation Readiness & Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-alkota-iron/50">
              <div>
                <label className="flex items-center gap-1.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  <MapPin className="h-3 w-3 text-alkota-orange" />
                  <span>Site Postcode / Area</span>
                </label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                  placeholder="e.g. B1 1AA or Midlands"
                  className="w-full bg-alkota-black border border-alkota-iron p-3 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-xs placeholder:text-alkota-grey/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  <Zap className="h-3 w-3 text-alkota-orange" />
                  <span>Available Site Power</span>
                </label>
                <select
                  value={formData.sitePower}
                  onChange={e => setFormData({ ...formData, sitePower: e.target.value })}
                  className="w-full bg-alkota-black border border-alkota-iron p-3 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-xs"
                >
                  <option value="not_sure">Not Sure / Needs Survey</option>
                  <option value="230v_single">230V Single-Phase (13A/16A)</option>
                  <option value="400v_three">400V 3-Phase (Commando Socket)</option>
                  <option value="110v_site">110V Yellow Transformer (Site)</option>
                  <option value="petrol_diesel">Engine Driven (No Mains Power)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                  <Calendar className="h-3 w-3 text-alkota-orange" />
                  <span>Required Timeline</span>
                </label>
                <select
                  value={formData.timeline}
                  onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-alkota-black border border-alkota-iron p-3 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-xs"
                >
                  <option value="immediate">Immediate / Urgent (&lt;2 Weeks)</option>
                  <option value="1_month">Within 1 Month</option>
                  <option value="1_3_months">1–3 Months (Planning)</option>
                  <option value="budgetary">Budgetary / Feasibility Only</option>
                </select>
              </div>
            </div>

            {/* Row 4: Subject */}
            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                Enquiry Subject / Model Reference
              </label>
              <input
                type="text"
                value={formData.enquiry}
                onChange={e => setFormData({ ...formData, enquiry: e.target.value })}
                placeholder="e.g. Alkota 420X4 Quotation & Technical Review"
                className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
              />
            </div>

            {/* Row 5: Message */}
            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">
                Message & Application Requirements
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your cleaning environment, duty cycle (hours per day), water inlet capacity, or specific chemical/trailer requirements..."
                className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-950/40 border border-red-500/30 p-4 flex items-center gap-3 text-red-400 text-xs font-ibm-plex-mono">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>Unable to dispatch message. Please ensure your details are correct or email sales@alkota.co.uk directly.</span>
              </div>
            )}

            <button
              disabled={status === 'submitting'}
              type="submit"
              className="w-full bg-alkota-orange p-5 font-ibm-plex-mono text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer shadow-lg shadow-orange-600/20"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verifying & Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Technical Enquiry →</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Right: Technical Consultation Info */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4 space-y-6"
      >
        <div className="bg-alkota-steel p-8 border border-alkota-iron">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="h-6 w-6 text-alkota-orange" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white">Direct Engineering Desk</h3>
          </div>
          <p className="text-alkota-grey text-xs leading-relaxed mb-4">
            For urgent factory specifications, dealer stock checks, or bespoke trailer rig configurations:
          </p>
          <a href="mailto:sales@alkota.co.uk" className="font-ibm-plex-mono text-lg font-bold text-alkota-orange hover:underline block mb-4">
            sales@alkota.co.uk
          </a>
          <div className="border-t border-alkota-iron/60 pt-4 text-xs font-ibm-plex-mono text-alkota-silver">
            <p className="text-[11px] uppercase tracking-wider font-bold text-white mb-1">UK Headquarters</p>
            <p className="text-alkota-grey leading-relaxed">
              Alkota UK Industrial Cleaning Systems<br />
              Engineering & Distribution Centre<br />
              Monday – Friday: 08:00 – 17:30 GMT
            </p>
          </div>
        </div>

        <div className="bg-alkota-black border border-alkota-iron p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-5 w-5 text-alkota-orange" />
            <h4 className="font-barlow-condensed text-lg font-bold uppercase tracking-wider text-white">
              7-Year Coil Guarantee
            </h4>
          </div>
          <p className="text-alkota-grey text-xs leading-relaxed">
            Every Alkota hot water pressure washer features our signature Schedule 80 hydro-insulated heating coil, cold-wound and pressure-tested up to 500 BAR.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-alkota-bg pt-32 pb-24 overflow-x-hidden min-h-screen">
      <Navigation />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-10 right-0 pointer-events-none select-none opacity-[0.03] z-0">
          <span className="font-barlow-condensed text-[30vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            CONSULT
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Support', href: '/support' }, { label: 'Contact & Procurement' }]} />
          
          <div className="mt-12 mb-12">
            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-alkota-black leading-none mb-4">
              Procure & Specify
            </h1>
            <p className="font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-widest">
              Alkota Heavy Duty Industrial Fleet — Direct UK Factory Quotations & Technical Consultation
            </p>
          </div>

          <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-alkota-orange" /></div>}>
            <ContactFormInner />
          </Suspense>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
