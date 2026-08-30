'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import WashPlantSpecifierCta from '@/components/wash-plant/WashPlantSpecifierCta';
import WashPlantCapabilityBadge from '@/components/wash-plant/WashPlantCapabilityBadge';
import {
  ArrowRight,
  RefreshCw,
  Layers,
  CheckCircle2,
  Factory,
  Cpu,
  Droplets,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  Wrench,
  Activity,
  Sliders,
  Send,
  ChevronRight,
  Flame,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const UPGRADE_CAPABILITIES = [
  { title: 'High-Pressure Pump Skid Modernization', desc: 'Replacing obsolete, worn, or low-efficiency pump assemblies with modern triplex ceramic plunger arrays with VSD soft-start control.' },
  { title: 'PLC & Automation Modernization', desc: 'Migrating failing relay panels or obsolete PLCs to modern Siemens / Mitsubishi architectures with intuitive touchscreen HMIs.' },
  { title: 'Variable Speed Drive (VSD) Integration', desc: 'Soft-starting motors, eliminating mechanical shock on pipework, and ramping pressure on demand to reduce energy consumption.' },
  { title: 'Closed-Loop Water Recycling Retrofit', desc: 'Adding media sand filtration and coalescing oil separation to convert direct-discharge wash bays into sustainable, EA-compliant facilities.' },
  { title: 'High-Efficiency Schedule 80 Thermal Coils', desc: 'Replacing scaled or burst coils with heavy ASTM A53 Schedule 80 continuous-wound assemblies and modulating gas/diesel burners.' },
  { title: 'Automated Underbody & Spinner Rigs', desc: 'Retrofitting automated chassis spray bars and rotating wheel spinners into manual bays to slash vehicle cycle times.' },
  { title: 'High-Pressure Swivel & Boom Arm Upgrades', desc: 'Replacing seized 360° booms with Grade 316 stainless steel assemblies and heavy-duty balanced drop lances.' },
  { title: 'Instrumentation & Sensor Upgrades', desc: 'Installing optical profiling, ultrasonic level sensors, digital pressure transducers, and flow totalizers.' },
  { title: 'Safety & Category 4 Interlock Overhauls', desc: 'Retrofitting dual-channel safety relay loops, light curtains, emergency stop buttons, and automated pressure relief systems.' },
  { title: 'Sump & Primary De-Silting Enhancements', desc: 'Installing automated solids screw augers and sediment baskets to reduce manual pit cleaning frequency by up to 80%.' },
  { title: 'Automated Chemical Dosing & Foaming', desc: 'Replacing manual detergent buckets with precision venturi or positive displacement chemical metering skids.' },
  { title: 'Telemetry & Cloud Diagnostic Enablement', desc: 'Fitting cellular/Ethernet IoT gateways to enable remote run-hour logging, cycle counting, and predictive fault alarms.' },
];

const UPGRADE_SEQUENCE = [
  { step: '01', title: 'Site Condition Survey', desc: 'Comprehensive mechanical, electrical, and hydraulic inspection of existing plant assets.' },
  { step: '02', title: 'Obsolescence & Risk Mapping', desc: 'Identifying unsupported PLCs, obsolete pump parts, and critical failure points.' },
  { step: '03', title: 'Feasibility & ROI Scoping', desc: 'Modelling the capital cost of targeted upgrades versus full plant replacement.' },
  { step: '04', title: 'Bespoke Upgrade Engineering', desc: 'CAD design of skid interfaces, electrical wiring diagrams, and pipe reticulation.' },
  { step: '05', title: 'Off-Site Skid Pre-Fabrication', desc: 'Assembling and pre-testing pump, heating, and control skids to minimise site downtime.' },
  { step: '06', title: 'Phased Site Installation', desc: 'Executing mechanical and electrical cutovers during scheduled operational shutdowns.' },
  { step: '07', title: 'Commissioning & New Baseline', desc: 'Performance tuning, safety sign-off, and logging the upgraded plant into a new digital asset register.' },
];

export default function WashPlantRefurbishmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    siteLocation: '',
    plantManufacturer: '',
    plantAgeYears: '',
    currentIssues: '',
    upgradeGoals: [] as string[],
    downtimeConstraint: 'weekend_only',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      upgradeGoals: prev.upgradeGoals.includes(goal)
        ? prev.upgradeGoals.filter(g => g !== goal)
        : [...prev.upgradeGoals, goal]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wash-plant-refurbishment-survey',
          source_page: '/wash-plant/refurbishment-upgrades',
          ...formData
        })
      });
    } catch (err) {
      console.warn('Refurbishment survey submit error:', err);
    } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0 px-6 sm:px-12">
      <WashPlantSchema
        pageTitle="Wash Plant Refurbishment & Upgrades | Alkota UK"
        pageDescription="Life-extension engineering, brownfield retrofits, pump overhauls, PLC modernization, and water recycling additions for existing industrial wash plants across the UK."
        pageUrl="https://alkota.co.uk/wash-plant/refurbishment-upgrades"
        breadcrumbs={[
          { name: 'Home', url: 'https://alkota.co.uk' },
          { name: 'Wash Plant Infrastructure', url: 'https://alkota.co.uk/wash-plant' },
          { name: 'Refurbishment & Upgrades', url: 'https://alkota.co.uk/wash-plant/refurbishment-upgrades' }
        ]}
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-7xl pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Refurbishment & Upgrades' }
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // BROWNFIELD ENGINEERING & LIFE EXTENSION
            </span>
          </div>

          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            Extend the life <br />
            <span className="text-alkota-orange">of the plant.</span>
          </h1>

          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            A £500k+ industrial wash installation should not be scrapped simply because individual pumps, burners, or PLCs are reaching end-of-life. Alkota brownfield engineering delivers targeted refurbishment, automation modernization, and water treatment retrofits on live operational sites.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#survey-request"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
            >
              <span>Request Plant Condition Survey</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/wash-plant/architect"
              className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-4 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
            >
              <span>Scope Upgrade in Architect</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* ── BROWNFIELD PHILOSOPHY ────────────────────────────────────────── */}
        <section className="mb-28 border-y border-alkota-iron/40 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                // LIVE SITE EXECUTION
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none">
                Phased delivery on live operational sites.
              </h2>
              <p className="text-sm text-alkota-silver leading-relaxed">
                Halting a fleet depot or mining wash bay for weeks is commercially impossible. We engineer upgrade packages with off-site pre-fabrication, factory testing, and planned shift cutovers to protect operational continuity.
              </p>
              <div className="pt-2">
                <WashPlantCapabilityBadge label="ENGINEERED TO APPLICATION" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-0 divide-y divide-alkota-iron/30">
              {[
                { n: '01', title: 'Off-Site Skid Fabrication', body: 'Pumps, thermal coils, and control cabinets are fully wired and hydrostatic pressure-tested at our facility before site arrival.' },
                { n: '02', title: 'Planned Cutover Windows', body: 'Mechanical and electrical tie-ins are scheduled during weekend or overnight operational downtime windows.' },
                { n: '03', title: 'Retain Sound Civils', body: 'We reuse existing concrete wash pads, sumps, and structural buildings while replacing only the worn mechanical plant.' },
                { n: '04', title: '60–75% CAPEX Savings', body: 'Targeted subsystem modernization delivers modern performance at a fraction of complete demolition and rebuild costs.' }
              ].map((item) => (
                <div key={item.n} className="py-6 flex items-start gap-6">
                  <span className="font-extralight text-3xl text-alkota-orange leading-none tabular-nums shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <h4 className="text-sm uppercase tracking-tight text-alkota-black font-medium mb-1.5">{item.title}</h4>
                    <p className="text-sm text-alkota-silver leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VERIFIED UPGRADE CAPABILITIES ────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // UPGRADE DIRECTORY
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
              Verified Refurbishment Categories.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 divide-y divide-alkota-iron/30 border-y border-alkota-iron/30">
            {UPGRADE_CAPABILITIES.map((cap, idx) => (
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

        {/* ── 7-STAGE UPGRADE SEQUENCE ─────────────────────────────────────── */}
        <section className="mb-24 bg-alkota-black text-white p-10 sm:p-14">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // METHODOLOGY
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              The Upgrade Process.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              From condition survey and obsolescence risk mapping through to phased delivery and commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 border-t border-white/10 pt-12">
            {UPGRADE_SEQUENCE.map((seq) => (
              <div key={seq.step}>
                <span className="font-extralight text-4xl text-alkota-orange block mb-3">{seq.step}</span>
                <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">{seq.title}</h4>
                <p className="text-xs text-[#999] leading-relaxed">{seq.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DUAL LIFECYCLE FLOWS ─────────────────────────────────────────── */}
        <section className="mb-28 border-t border-alkota-iron/40 pt-16">
          <div className="mb-12 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // TOTAL LIFECYCLE GOVERNANCE
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
              Service to CAPEX. And CAPEX to Service.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Flow 1: Service -> Refurbishment */}
            <div className="space-y-6">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block">
                Pathway A // Third-Party & Legacy Life Extension
              </span>
              <div className="space-y-3 divide-y divide-alkota-iron/20 font-ibm-plex-mono text-xs text-alkota-silver">
                <p className="pt-2">01. Existing wash plant suffers recurring faults or high running costs</p>
                <p className="pt-3">02. Alkota executes comprehensive Site Condition Survey</p>
                <p className="pt-3">03. Engineer identifies specific obsolete or failing subsystems</p>
                <p className="pt-3">04. Targeted Refurbishment / Upgrade proposal issued with ROI model</p>
                <p className="pt-3">05. Phased site installation and commissioning</p>
                <p className="pt-3">06. Plant re-baselined with new digital asset register & PPM contract</p>
              </div>
            </div>

            {/* Flow 2: CAPEX -> Asset Management */}
            <div className="space-y-6">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block">
                Pathway B // New Alkota Capital Infrastructure
              </span>
              <div className="space-y-3 divide-y divide-alkota-iron/20 font-ibm-plex-mono text-xs text-alkota-silver">
                <p className="pt-2">01. Turnkey design and engineering of new wash plant (£100k–£1m+)</p>
                <p className="pt-3">02. Site commissioning and formal Site Acceptance Testing (SAT)</p>
                <p className="pt-3">03. One-click conversion into Managed Asset in Alkota CRM</p>
                <p className="pt-3">04. Scheduled PPM programme and critical spares consignment</p>
                <p className="pt-3">05. Multi-year condition monitoring and obsolescence tracking</p>
                <p className="pt-3">06. Scheduled life-extension upgrades at year 7–10</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONDITION SURVEY REQUEST INTAKE FORM ─────────────────────────── */}
        <section id="survey-request" className="mb-24 bg-alkota-black text-white p-8 sm:p-14">
          <div className="max-w-3xl mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // ON-SITE TECHNICAL EVALUATION
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white mb-3">
              Request a Wash Plant Condition Survey.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              Our application engineers inspect existing wash bays, identify obsolete controls or failing pumps, evaluate water recycling potential, and provide a structured refurbishment roadmap.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Bradley"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Aggregate Haulage UK"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7700 900123"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="j.bradley@aggregatehaulage.co.uk"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Site Location / Postcode</label>
                  <input
                    type="text"
                    value={formData.siteLocation}
                    onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                    placeholder="e.g. Leeds Depot, LS10 1AA"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Existing Plant Manufacturer</label>
                  <input
                    type="text"
                    value={formData.plantManufacturer}
                    onChange={(e) => setFormData({ ...formData, plantManufacturer: e.target.value })}
                    placeholder="e.g. Istobal, WashTec, Alkota, Unknown"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Estimated Plant Age (Years)</label>
                  <input
                    type="text"
                    value={formData.plantAgeYears}
                    onChange={(e) => setFormData({ ...formData, plantAgeYears: e.target.value })}
                    placeholder="e.g. 8 years"
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">Downtime Constraint</label>
                  <select
                    value={formData.downtimeConstraint}
                    onChange={(e) => setFormData({ ...formData, downtimeConstraint: e.target.value })}
                    className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none uppercase"
                  >
                    <option value="weekend_only">Weekend / Night Shift Cutover Only</option>
                    <option value="single_bay_shutdown">Phased Single-Bay Shutdown Acceptable</option>
                    <option value="planned_shutdown">Planned Full Site Shutdown Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-2">
                  Upgrade Objectives (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Pump Skid Replacement',
                    'PLC / Controls Migration',
                    'Water Recycling Addition',
                    'Heating / Burner Upgrade',
                    'Underbody Rinse Addition',
                    'Automate Manual Wash Bay',
                    'Improve Energy / Water Efficiency',
                    'Telemetry & Monitoring'
                  ].map((goal) => {
                    const isSelected = formData.upgradeGoals.includes(goal);
                    return (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-2.5 text-left text-[11px] uppercase tracking-wide border transition-all ${
                          isSelected
                            ? 'bg-alkota-orange text-white border-alkota-orange'
                            : 'bg-[#181818] text-[#aaa] border-[#333] hover:border-[#666]'
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#ccc] mb-1">
                  Current Pain Points or Known Faults
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Unreliable control board, frequent pressure drops on bay 2, high water bills..."
                  className="w-full p-3 text-xs bg-[#181818] border border-[#333] text-white focus:border-alkota-orange outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Transmitting Survey Request...' : 'Submit Condition Survey Request'}</span>
              </button>
            </form>
          ) : (
            <div className="bg-[#181818] border border-[#333] p-12 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-alkota-orange mx-auto" />
              <h3 className="font-extralight text-2xl uppercase tracking-tight text-white">
                Condition Survey Request Received
              </h3>
              <p className="text-xs text-[#888] max-w-md mx-auto leading-relaxed">
                Our application engineering team will contact you within one working day to review your plant configuration and schedule a site survey visit.
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
