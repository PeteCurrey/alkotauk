'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import WashPlantSpecifierCta from '@/components/wash-plant/WashPlantSpecifierCta';
import {
  ArrowRight,
  Wrench,
  Clock,
  ShieldCheck,
  Activity,
  CheckCircle2,
  PhoneCall,
  AlertCircle,
  Cpu,
  Flame,
  Droplets,
  Zap,
  Send,
  FileText,
  ChevronRight,
  Upload
} from 'lucide-react';
import Link from 'next/link';

const SERVICE_CAPABILITIES = [
  { title: 'High-Pressure Triplex Pump Overhaul', desc: 'Precision workshop rebuilds of industrial ceramic plunger pumps, packing seals, check valves, manifolds, and unloader assemblies.' },
  { title: 'Burner & Thermal Combustion Systems', desc: 'Combustion analysis, electrode calibration, nozzle replacement, and safety interlock certification for natural gas, LPG, and diesel burners.' },
  { title: 'Electric Motors & VSD Inverter Drives', desc: 'Insulation resistance testing, bearing replacement, and inverter drive programming to prevent stator burnout and motor failure.' },
  { title: 'PLC Control & Sensor Diagnostics', desc: 'Programmable logic controller fault tracing, HMI recalibration, relay replacement, optical sensor alignment, and interlock testing.' },
  { title: 'Water Treatment & Filtration Systems', desc: 'Filter media replacement, vacuum blower overhauls, coalescing plate cleaning, separator servicing, and chemical dosing accuracy.' },
  { title: 'Pipework, Valving & Boom Arms', desc: 'Schedule 80 reticulation leak repairs, high-pressure swivel joint overhauls, pneumatic valve bench testing, and boom arm recertification.' },
  { title: 'Hose Reels, Guns & Lance Stations', desc: 'High-pressure hose inspection, swivel replacement, trigger gun overhaul, and lance/nozzle calibration across multi-bay installations.' },
  { title: 'Automated Drive & Conveyor Systems', desc: 'Conveyor chain tensioning, drive sprocket inspection, variable speed drive tuning, and mechanical limit switch certification.' },
  { title: 'Effluent Recovery & Drainage Systems', desc: 'Sump pump overhauls, level sensor recalibration, screw conveyor bearing replacement, and solids separator cleaning cycles.' },
  { title: 'Winterisation & Frost Protection', desc: 'Thermal tracing inspection, frost-stat servicing, purge valve testing, and anti-freeze additive management to prevent burst coils.' },
  { title: 'Site Commissioning & Re-commissioning', desc: 'Hydraulic balance verification, throughput performance testing, and full operational sign-off following major works or plant moves.' },
  { title: 'Third-Party Wash Plant Support', desc: 'Engineering servicing and parts support for industrial wash systems of any origin — we do not need to have built your plant.' },
];

const CONTRACT_TIERS = [
  {
    tier: 'Tier 01',
    name: 'Planned Preventative Maintenance',
    focus: 'Scheduled Servicing',
    description: 'Structured routine mechanical and electrical servicing to prevent wear-induced failure and maintain compliance.',
    features: [
      'Quarterly or semi-annual site visits',
      'Full 45-point mechanical, electrical, and thermal inspection',
      'Pump fluids, seals, and consumable filter changeouts',
      'Formal branded visit report and sign-off',
    ]
  },
  {
    tier: 'Tier 02',
    name: 'Planned + Priority Reactive',
    focus: 'Uptime Assurance',
    description: 'Scheduled preventative maintenance combined with priority technician dispatch for unscheduled breakdowns.',
    features: [
      'All standard PPM inclusions',
      'Defined SLA response target for critical faults',
      'Preferential labour and parts pricing',
      'Dedicated engineering technical hotline',
    ]
  },
  {
    tier: 'Tier 03',
    name: 'Managed Asset Support',
    focus: 'Total Plant Governance',
    description: 'Comprehensive lifecycle management including critical spares consignment and annual condition assessment.',
    features: [
      'Full PPM + unlimited priority breakdown callouts',
      'Site-consigned critical spares managed by Alkota',
      'Annual condition assessment and upgrade roadmap',
      'Dedicated senior application engineer account lead',
    ]
  },
  {
    tier: 'Tier 04',
    name: 'Critical Operations Cover',
    focus: 'Infrastructure Availability',
    description: 'Designed for 24/7 logistics hubs, rail depots, and mining operations where unplanned downtime carries severe operational penalty.',
    features: [
      'Extended emergency dispatch coverage',
      'N+1 standby equipment protocols (subject to site survey)',
      'Telemetry-ready condition monitoring architecture',
      'Quarterly water quality and trade effluent audits',
    ]
  },
];

export default function WashPlantServicePage() {
  const [enquiryType, setEnquiryType] = useState<'urgent' | 'planned' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Urgent breakdown form
  const [urgent, setUrgent] = useState({
    name: '', company: '', phone: '', email: '',
    siteLocation: '', manufacturer: '', plantType: '',
    faultDescription: '', isPlantDown: 'fully_down',
    photos: ''
  });

  // Planned / third-party enquiry form
  const [planned, setPlanned] = useState({
    name: '', company: '', phone: '', email: '',
    siteLocation: '', manufacturer: '', plantType: '',
    estimatedAge: '', existingServiceHistory: 'none',
    enquiryType: 'ppm_contract', notes: ''
  });

  const handleUrgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wash-plant-urgent-breakdown',
          priority: 'HIGH',
          source_page: '/wash-plant/service-maintenance',
          ...urgent
        })
      });
    } catch (e) { /* silent */ } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const handlePlannedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wash-plant-service-enquiry',
          source_page: '/wash-plant/service-maintenance',
          ...planned
        })
      });
    } catch (e) { /* silent */ } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0 px-6 sm:px-12">
      <WashPlantSchema
        pageTitle="Wash Plant Service & Maintenance | PPM & Reactive Repairs | Alkota UK"
        pageDescription="Planned preventative maintenance, emergency reactive repairs, pump overhauls, burner servicing, PLC diagnostics, and third-party wash plant support across the UK."
        pageUrl="https://alkota.co.uk/wash-plant/service-maintenance"
        breadcrumbs={[
          { name: 'Home', url: 'https://alkota.co.uk' },
          { name: 'Wash Plant Infrastructure', url: 'https://alkota.co.uk/wash-plant' },
          { name: 'Service & Maintenance', url: 'https://alkota.co.uk/wash-plant/service-maintenance' }
        ]}
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-7xl pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Service & Maintenance' }
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // LIFECYCLE SERVICE & SUPPORT
            </span>
          </div>
          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            The plant only creates value{' '}
            <span className="text-alkota-orange">when it runs.</span>
          </h1>
          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            An industrial wash plant is mission-critical operational infrastructure. Planned maintenance prevents failure. Rapid reactive response minimises downtime when it occurs. We support both — for plants we built and for installations we did not.
          </p>

          {/* ── EMERGENCY HOTLINE CTA ── */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="tel:01772822822"
              className="inline-flex items-center gap-3 bg-red-700 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-red-600 transition-colors shadow-md"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Plant Down? Call Emergency Line: 01772 822 822</span>
            </Link>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-3 border border-alkota-iron bg-white text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-alkota-orange transition-colors"
            >
              <span>Discuss Service Agreement</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        {/* ── THREE SERVICE PILLARS ─────────────────────────────────────────── */}
        <section className="mb-28 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-alkota-iron/40 border-y border-alkota-iron/40 py-12">
          <div className="md:pr-10 pb-8 md:pb-0">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">01 // CONTINUITY</span>
            <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black mb-3">
              Operational Availability
            </h3>
            <p className="text-sm text-alkota-silver leading-relaxed">
              Unplanned downtime halts vehicle flow, disrupts dispatch schedules, and accumulates fleet contamination. Scheduled PPM identifies wear before it causes catastrophic failure.
            </p>
          </div>
          <div className="md:px-10 py-8 md:py-0">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">02 // MASTERY</span>
            <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black mb-3">
              Technical Competence
            </h3>
            <p className="text-sm text-alkota-silver leading-relaxed">
              Factory-trained engineers carry specialised diagnostic instrumentation, calibrated combustion testers, genuine OEM pump spares, and pressure measurement equipment on every visit.
            </p>
          </div>
          <div className="md:pl-10 pt-8 md:pt-0">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">03 // AGNOSTIC</span>
            <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black mb-3">
              Multi-Brand Capability
            </h3>
            <p className="text-sm text-alkota-silver leading-relaxed">
              We do not need to have built your wash plant. Our engineering team routinely takes over maintenance and overhauls on third-party and legacy industrial wash installations of any origin.
            </p>
          </div>
        </section>

        {/* ── SERVICE CAPABILITIES ─────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // VERIFIED TECHNICAL CAPABILITIES
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
              What we service and overhaul.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 divide-y divide-alkota-iron/30">
            {SERVICE_CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="py-6 flex items-start gap-5">
                <span className="font-extralight text-2xl text-alkota-orange leading-none tabular-nums shrink-0 mt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-sm uppercase tracking-tight text-alkota-black font-medium mb-1.5">{cap.title}</h4>
                  <p className="text-sm text-alkota-silver leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTRACT TIERS ───────────────────────────────────────────────── */}
        <section className="mb-24 bg-alkota-black text-white p-10 sm:p-14">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // STRUCTURED CONTRACT MODELS
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              Service agreement architecture.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              We structure commercial maintenance agreements calibrated to your site criticality, operating profile, and internal maintenance capabilities. No generic Bronze/Silver/Gold tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-b border-white/10 py-10">
            {CONTRACT_TIERS.map((tier, idx) => (
              <div key={idx} className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                      {tier.tier}
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777] block">
                      {tier.focus}
                    </span>
                  </div>
                  <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-4 leading-tight">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#999] leading-relaxed mb-6">{tier.description}</p>
                  <div className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#ccc]">
                        <span className="text-alkota-orange shrink-0">—</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 text-[9px] font-ibm-plex-mono text-[#666] uppercase">
                  Engineered to site duty
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENQUIRY SECTION: URGENT vs PLANNED ───────────────────────────── */}
        <section id="enquiry" className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // SERVICE ENQUIRY
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black mb-4">
              How can we help?
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-wider">
              Urgent breakdown support and planned maintenance enquiries are handled differently.
            </p>
          </div>

          {!enquiryType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setEnquiryType('urgent')}
                className="p-10 bg-red-950 border border-red-800 text-left hover:border-red-600 transition-all group"
              >
                <AlertCircle className="h-8 w-8 text-red-400 mb-4" />
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-2 group-hover:text-red-300 transition-colors">
                  Urgent — Plant Down or Fault
                </h3>
                <p className="text-xs text-red-300/70 leading-relaxed mb-4">
                  My wash plant is down, running with a critical fault, or I need emergency reactive support.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase text-red-400 group-hover:text-red-300">
                  Report Emergency Breakdown <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </button>

              <button
                onClick={() => setEnquiryType('planned')}
                className="p-10 bg-white border border-alkota-iron text-left hover:border-alkota-orange transition-all group"
              >
                <Clock className="h-8 w-8 text-alkota-orange mb-4" />
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
                  Planned — PPM or Service Contract
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-4">
                  I want to establish a planned maintenance agreement, discuss a service contract, or enquire about third-party plant support.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase text-alkota-orange group-hover:text-alkota-black">
                  Discuss Service Agreement <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          )}

          {/* ── URGENT BREAKDOWN FORM ── */}
          {enquiryType === 'urgent' && !submitted && (
            <div className="bg-red-950 border border-red-800 p-8 sm:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-red-400 block mb-1">
                    // URGENT BREAKDOWN REPORT
                  </span>
                  <h3 className="font-extralight text-2xl uppercase tracking-tight text-white">
                    Emergency Service Request
                  </h3>
                </div>
                <button onClick={() => setEnquiryType(null)} className="text-xs text-red-300/70 hover:text-white font-ibm-plex-mono uppercase">
                  ← Back
                </button>
              </div>

              <div className="mb-6 p-4 bg-red-900/50 border border-red-700 flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-red-300 shrink-0" />
                <span className="text-xs text-red-200 font-ibm-plex-mono uppercase tracking-wider">
                  For immediate assistance, call: <strong className="text-white">01772 822 822</strong> — submit this form in parallel.
                </span>
              </div>

              <form onSubmit={handleUrgentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Your Name *</label>
                    <input required value={urgent.name} onChange={e => setUrgent({...urgent, name: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="e.g. David Morrison" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Company *</label>
                    <input required value={urgent.company} onChange={e => setUrgent({...urgent, company: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="e.g. National Logistics Ltd" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Phone (to call you back) *</label>
                    <input required type="tel" value={urgent.phone} onChange={e => setUrgent({...urgent, phone: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="+44 7700 000000" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Site Location / Postcode</label>
                    <input value={urgent.siteLocation} onChange={e => setUrgent({...urgent, siteLocation: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="e.g. Warrington Depot, WA1 1AA" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Wash Plant Manufacturer</label>
                    <input value={urgent.manufacturer} onChange={e => setUrgent({...urgent, manufacturer: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="e.g. Alkota, Istobal, WashTec, Unknown" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Plant Type / System Description</label>
                    <input value={urgent.plantType} onChange={e => setUrgent({...urgent, plantType: e.target.value})}
                      className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="e.g. 4-bay high-pressure reticulation" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Plant Status *</label>
                  <select required value={urgent.isPlantDown} onChange={e => setUrgent({...urgent, isPlantDown: e.target.value})}
                    className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white focus:border-red-400 outline-none uppercase">
                    <option value="fully_down">Plant Fully Down — No Operational Washing</option>
                    <option value="partial_down">Partial Failure — Some Bays Affected</option>
                    <option value="fault_running">Running with Critical Fault / Reduced Performance</option>
                    <option value="intermittent">Intermittent Fault — Unreliable Operation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-red-300 mb-1">Fault Description *</label>
                  <textarea required rows={3} value={urgent.faultDescription} onChange={e => setUrgent({...urgent, faultDescription: e.target.value})}
                    className="w-full p-3 text-xs bg-red-900/30 border border-red-700 text-white placeholder-red-500 focus:border-red-400 outline-none" placeholder="Describe the fault, any error codes, when it started, what you have already checked..." />
                </div>
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-red-500 transition-colors disabled:opacity-50">
                  <Send className="h-4 w-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Emergency Request'}</span>
                </button>
              </form>
            </div>
          )}

          {/* ── PLANNED SERVICE ENQUIRY FORM ── */}
          {enquiryType === 'planned' && !submitted && (
            <div className="bg-white border border-alkota-iron p-8 sm:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                    // PLANNED SERVICE ENQUIRY
                  </span>
                  <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black">
                    Service Contract or PPM Enquiry
                  </h3>
                </div>
                <button onClick={() => setEnquiryType(null)} className="text-xs text-alkota-silver hover:text-alkota-black font-ibm-plex-mono uppercase">
                  ← Back
                </button>
              </div>

              <form onSubmit={handlePlannedSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Your Name *</label>
                    <input required value={planned.name} onChange={e => setPlanned({...planned, name: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="e.g. David Morrison" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Company *</label>
                    <input required value={planned.company} onChange={e => setPlanned({...planned, company: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="e.g. National Logistics Ltd" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Phone *</label>
                    <input required type="tel" value={planned.phone} onChange={e => setPlanned({...planned, phone: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="+44 7700 000000" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Email *</label>
                    <input required type="email" value={planned.email} onChange={e => setPlanned({...planned, email: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="you@yourcompany.co.uk" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Site Location</label>
                    <input value={planned.siteLocation} onChange={e => setPlanned({...planned, siteLocation: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="e.g. Warrington Depot, WA1 1AA" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Wash Plant Manufacturer</label>
                    <input value={planned.manufacturer} onChange={e => setPlanned({...planned, manufacturer: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="e.g. Alkota, Istobal, Unknown" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Plant Type / Description</label>
                    <input value={planned.plantType} onChange={e => setPlanned({...planned, plantType: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="e.g. Multi-bay HGV wash with water recovery" />
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Estimated Plant Age</label>
                    <select value={planned.estimatedAge} onChange={e => setPlanned({...planned, estimatedAge: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase">
                      <option value="">Select Age Range</option>
                      <option value="0-2">Under 2 Years Old</option>
                      <option value="2-5">2–5 Years Old</option>
                      <option value="5-10">5–10 Years Old</option>
                      <option value="10-15">10–15 Years Old</option>
                      <option value="15+">15+ Years (Ageing Plant)</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Existing Service History</label>
                    <select value={planned.existingServiceHistory} onChange={e => setPlanned({...planned, existingServiceHistory: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase">
                      <option value="none">No Formal Service History</option>
                      <option value="in_house">In-House Maintenance Only</option>
                      <option value="other_provider">Maintained by Another Service Provider</option>
                      <option value="good_history">Good Service History Available</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Enquiry Type</label>
                    <select value={planned.enquiryType} onChange={e => setPlanned({...planned, enquiryType: e.target.value})}
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase">
                      <option value="ppm_contract">PPM / Planned Maintenance Contract</option>
                      <option value="managed_asset">Managed Asset Support Agreement</option>
                      <option value="one_off_service">One-Off Service Visit</option>
                      <option value="third_party_takeover">Third-Party Plant Takeover</option>
                      <option value="condition_assessment">Condition Assessment / Survey</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">Additional Notes</label>
                  <textarea rows={3} value={planned.notes} onChange={e => setPlanned({...planned, notes: e.target.value})}
                    className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none" placeholder="Any additional context about the plant, known issues, or specific service requirements..." />
                </div>
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors disabled:opacity-50">
                  <Send className="h-4 w-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Service Enquiry'}</span>
                </button>
              </form>
            </div>
          )}

          {submitted && (
            <div className="bg-white border border-alkota-iron p-12 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-alkota-orange mx-auto" />
              <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black">
                {enquiryType === 'urgent' ? 'Emergency Request Received' : 'Enquiry Received'}
              </h3>
              <p className="text-xs text-alkota-silver max-w-md mx-auto leading-relaxed">
                {enquiryType === 'urgent'
                  ? 'Our engineering team has been alerted. If the matter is critical, call 01772 822 822 immediately for fastest response.'
                  : 'Our service team will review your enquiry and contact you within one working day.'}
              </p>
            </div>
          )}
        </section>

        {/* ── SPECIFIER CTA ─────────────────────────────────────────────────── */}
        <section className="mb-20">
          <WashPlantSpecifierCta />
        </section>
      </div>

      <Footer />
    </main>
  );
}
