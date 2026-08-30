import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  Gauge,
  Flame,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  Clock,
  Settings,
  FileText,
  LifeBuoy,
  Building2,
  Shield
} from 'lucide-react';
import ServiceCapabilityNavigator from '@/components/service/ServiceCapabilityNavigator';
import TroubleshootingAccordion from '@/components/service/TroubleshootingAccordion';
import { PUMP_MANUFACTURERS, PUMP_REPAIR_PROCESS_STEPS, SERVICE_PLANS } from '@/lib/service/seed-data';

export const metadata = {
  title: 'Service & Lifecycle Support | Alkota UK',
  description:
    'Industrial equipment deserves industrial support. Planned preventive maintenance, reactive breakdown repairs, high-pressure pump rebuilds, commissioning, and machine registration across the UK.',
};

export default function ServicePage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black">

      {/* ── CHAPTER 01: FULL-SCREEN SERVICE HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between bg-[#0A0A0A] text-white px-6 sm:px-12 lg:px-24 pt-32 pb-16 overflow-hidden border-b border-[#222]">
        {/* Background glow and subtle mechanical watermark */}
        <div
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 80% 30%, rgba(255,105,0,0.08) 0%, transparent 60%),
                              radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none font-extralight text-white opacity-[0.02] text-[18vw] leading-none"
          aria-hidden="true"
        >
          SERVICE
        </div>

        {/* Hero Top Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 bg-alkota-orange rounded-full animate-pulse" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#999]">
              Alkota UK // Lifecycle Engineering &amp; Field Support
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.05] max-w-5xl mb-8">
            Industrial equipment deserves{' '}
            <span className="text-alkota-orange font-normal italic">
              industrial support.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#AAA] font-normal leading-relaxed max-w-3xl mb-12">
            The purchase of an Alkota machine is not the end of our relationship — it is the beginning of the working life of the equipment. We provide nationwide planned maintenance, rapid breakdown repairs, precision pump rebuilds, and verified technical support.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/service/request"
              className="inline-flex items-center gap-3 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Book Service or Repair
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/service/machine-registration"
              className="inline-flex items-center gap-3 border border-[#444] hover:border-white text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all bg-[#141414]"
            >
              Register Your Alkota Machine
            </Link>

            <Link
              href="/service/request?type=breakdown&urgency=machine_down"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-ibm-plex-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Machine Down? Fast Triage →
            </Link>
          </div>
        </div>

        {/* Hero Bottom Metric Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-[#222] pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Field Coverage
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              Nationwide UK
            </span>
          </div>

          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Coil Guarantee
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              7-Year Warranty
            </span>
          </div>

          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Pump Workshop
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              Full Hydro-Test
            </span>
          </div>

          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Parts Stock
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              100% Genuine OEM
            </span>
          </div>
        </div>
      </section>


      {/* ── CHAPTER 02: OWNERSHIP DOESN'T END AT DELIVERY ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
              // The Complete Lifecycle
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight leading-tight">
              Built for a working life. Supported every day.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base text-[#555] font-normal leading-relaxed mb-6">
              Unlike consumer pressure washers designed as disposable commodities, an Alkota pressure washer is heavy industrial capital plant. With regular planned servicing and precision pump rebuilds, Alkota machines routinely operate for 10, 15, and 20+ years in continuous commercial service.
            </p>
            <p className="text-sm text-[#777] font-normal leading-relaxed">
              We structure our support around the entire operating lifecycle — ensuring you have direct access to certified engineers, original engineering schematics, matched service kits, and guaranteed factory parts.
            </p>
          </div>
        </div>

        {/* 6-Stage Lifecycle Flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border border-[#E8E8E4] bg-[#E8E8E4]">
          {[
            { step: '01', title: 'SPECIFY', desc: 'Flow, pressure & temperature matched to cleaning duty' },
            { step: '02', title: 'COMMISSION', desc: 'On-site utilities check, burner setup & operator briefing' },
            { step: '03', title: 'MAINTAIN', desc: 'Scheduled PPM intervals, oil changes & safety tests' },
            { step: '04', title: 'REPAIR', desc: 'Rapid field response with genuine OEM components' },
            { step: '05', title: 'REBUILD', desc: 'Precision workshop pump overhauls & hydro testing' },
            { step: '06', title: 'UPGRADE', desc: 'Attachments, foam systems & capacity extensions' },
          ].map((stage) => (
            <div key={stage.step} className="bg-white p-6 transition-all hover:bg-[#FAF9F5]">
              <span className="font-ibm-plex-mono text-xs text-alkota-orange font-bold block mb-2">
                {stage.step}
              </span>
              <h3 className="font-medium text-sm text-alkota-black tracking-tight mb-2">
                {stage.title}
              </h3>
              <p className="text-xs text-[#777] leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAPTER 02.5: PARTS & ATTACHMENTS CALLOUT ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0A0A0A] text-white border border-[#222] flex flex-col lg:flex-row items-stretch overflow-hidden shadow-xl">
            <div className="flex-1 p-10 lg:p-14">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // OEM Spares &amp; Attachments
              </span>
              <h2 className="font-extralight text-3xl lg:text-4xl text-white tracking-tight mb-4">
                Parts for every Alkota. Attachments for every application.
              </h2>
              <p className="text-[#AAA] text-sm leading-relaxed mb-8 max-w-xl font-normal">
                OEM-genuine pump components, Mosmatic rotary tooling, Cox Reels hose management, Steel Eagle surface cleaners, and Dual Pumps fluid power — all stocked, sourced, and despatched from the UK.
              </p>
              <Link
                href="/parts-attachments"
                className="inline-flex items-center gap-3 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
              >
                Browse Parts &amp; Attachments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:w-80 bg-[#141414] border-t lg:border-t-0 lg:border-l border-[#262626] flex items-center justify-center p-10">
              <div className="grid grid-cols-2 gap-4 text-center w-full">
                {[
                  { val: '500+', label: 'Components' },
                  { val: '5', label: 'Partner Brands' },
                  { val: 'OEM', label: 'Genuine Stock' },
                  { val: 'Next-Day', label: 'UK Despatch' },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-[#0D0D0D] border border-[#1F1F1F]">
                    <span className="block text-2xl font-extralight text-alkota-orange mb-1">{item.val}</span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03: SERVICE CAPABILITY NAVIGATOR ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#F0EFEB] border-y border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
              // Engineering Capabilities
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight mb-4">
              Explore Our Service Portfolio
            </h2>
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Select an area of engineering capability below to view service specifications, included multi-point checks, and direct booking pathways.
            </p>
          </div>

          <ServiceCapabilityNavigator />
        </div>
      </section>


      {/* ── CHAPTER 04: PLANNED MAINTENANCE (PPM) & CONTRACTS ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
              // Preventive Engineering
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight leading-tight mb-6">
              Planned Maintenance that protects your balance sheet.
            </h2>
            <p className="text-base text-[#555] font-normal leading-relaxed mb-6">
              Unplanned pressure washer failures halt fleet wash operations, stall production lines, and cause costly delays. Our Planned Preventive Maintenance (PPM) contracts establish structured service windows based on machine run hours or calendar duty.
            </p>
            <p className="text-sm text-[#777] font-normal leading-relaxed mb-8">
              Every PPM visit includes an exhaustive multi-point mechanical, hydraulic, and electrical audit, complete with burner tuning and digital safety certification.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/service/planned-maintenance"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                View PPM Schedules &amp; Checklist
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/service/contracts"
                className="inline-flex items-center gap-2 border border-[#CCC] hover:border-alkota-black text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Fleet Service Contracts
              </Link>
            </div>
          </div>

          {/* Service Plans Comparison Cards */}
          <div className="lg:col-span-6 space-y-4">
            {SERVICE_PLANS.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className="border border-[#E8E8E4] bg-white p-6 transition-all hover:border-alkota-orange hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-medium text-base text-alkota-black tracking-tight">
                    {plan.title}
                  </h3>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2 py-0.5 border border-orange-200">
                    {plan.partsDiscount}
                  </span>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-4">
                  {plan.description}
                </p>
                <div className="flex items-center justify-between text-xs text-[#888] pt-3 border-t border-[#F0EFEB]">
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-black">
                    Target: {plan.responseTarget}
                  </span>
                  <Link
                    href={`/service/contracts#${plan.id}`}
                    className="text-alkota-orange hover:underline font-ibm-plex-mono text-[10px] uppercase tracking-wider"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CHAPTER 05: DARK SECTION — PRECISION PUMP REBUILD WORKSHOP ── */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6 sm:px-12 lg:px-24 border-y border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333]">
                  Precision Overhaul
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                  Central Engineering Workshop
                </span>
              </div>

              <h2 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
                Repair the pump. <br />
                <span className="text-alkota-orange font-normal italic">
                  Not the entire machine.
                </span>
              </h2>

              <p className="text-base text-[#AAA] font-normal leading-relaxed mb-6">
                When an industrial triplex plunger pump drops pressure, we don't force you into a costly whole-machine replacement. Our dedicated pump workshop handles complete strip-downs, ultrasonic cleaning, manifold re-machining, and ceramic plunger replacement.
              </p>
              <p className="text-sm text-[#777] font-normal leading-relaxed mb-8">
                Every overhauled pump is hydrostatically tested on our calibrated 30-minute test bench under full working pressure before being returned with a signed Alkota Workshop Certificate.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/service/pump-repair"
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
                >
                  Explore Pump Repair Facility
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/service/request?type=pump_repair"
                  className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
                >
                  Send In a Pump
                </Link>
              </div>
            </div>

            {/* Supported Pump Manufacturers & Capabilities */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888] mb-4">
                Supported Industrial Pump Manufacturers:
              </h3>
              {PUMP_MANUFACTURERS.map((mfg) => (
                <div
                  key={mfg.name}
                  className="bg-[#141414] border border-[#222] p-5 hover:border-alkota-orange transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white tracking-tight">
                      {mfg.name}
                    </h4>
                    <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">
                      Lead Time: {mfg.leadTimeDays}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {mfg.models.map((mod) => (
                      <span
                        key={mod}
                        className="font-ibm-plex-mono text-[9px] bg-[#1F1F1F] text-[#BBB] px-2 py-0.5 border border-[#2A2A2A]"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                  <ul className="text-xs text-[#888] space-y-1">
                    {mfg.capabilities.slice(0, 2).map((cap, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-alkota-orange font-bold text-xs">·</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Step Precision Process Strip */}
          <div className="border-t border-[#222] pt-12">
            <h3 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange mb-6 text-center">
              // 7-Stage Workshop Overhaul Protocol
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {PUMP_REPAIR_PROCESS_STEPS.map((st) => (
                <div key={st.step} className="bg-[#111] border border-[#222] p-4 text-left">
                  <span className="font-ibm-plex-mono text-[11px] text-alkota-orange font-bold block mb-1">
                    {st.step}
                  </span>
                  <h4 className="text-xs font-medium text-white tracking-tight mb-1">
                    {st.title}
                  </h4>
                  <p className="text-[10px] text-[#777] leading-relaxed">
                    {st.description.slice(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── CHAPTER 06: MACHINE REGISTRATION & MY ALKOTA ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
              // Digital Ownership Platform
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight leading-tight mb-6">
              Register Your Alkota. Unlock Lifetime History.
            </h2>
            <p className="text-base text-[#555] font-normal leading-relaxed mb-6">
              When you register your machine's serial number, you create an official digital asset ledger in the Alkota UK system. This activates your factory warranty, links exact parts schematics, and generates digital service logs for every engineer visit.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Instant activation of the Alkota 7-Year Heating Coil Warranty',
                'Exact parts & exploded schematics filtered to your exact build serial',
                'Automated reminders when 500-hour / annual service intervals approach',
                'Downloadable digital service certificates and engineer sign-off reports',
                'Compatible attachment and chemical dilution recommendations'
              ].map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#444]">
                  <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/service/machine-registration"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Register Machine Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/service/my-alkota"
                className="inline-flex items-center gap-2 border border-[#CCC] hover:border-alkota-black text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Preview My Alkota Hub
              </Link>
            </div>
          </div>

          {/* Simulated Asset Card */}
          <div className="lg:col-span-6 bg-white border border-[#E8E8E4] p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-4 mb-6">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                  Asset Record
                </span>
                <h3 className="text-lg font-medium text-alkota-black">
                  Alkota 430XH Hot Water Pressure Washer
                </h3>
              </div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                Verified Asset
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#555] mb-6">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Serial Number
                </span>
                <span className="font-mono text-alkota-black font-semibold">
                  ALK-2024-88421
                </span>
              </div>
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Location Site
                </span>
                <span className="text-alkota-black">
                  Derby Central Hub (Bay 1)
                </span>
              </div>
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Asset Condition
                </span>
                <span className="text-emerald-600 font-medium">
                  Good (Audited Sept 2024)
                </span>
              </div>
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Coil Warranty
                </span>
                <span className="text-alkota-black">
                  Active (Valid to 2031)
                </span>
              </div>
            </div>

            <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-4 text-xs space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Last Engineer Visit:</span>
                <span className="font-medium text-alkota-black">20 Sept 2024 (500h PPM)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Service Engineer:</span>
                <span className="font-medium text-alkota-black">Gareth Evans (Senior Field Eng)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Tested Pressure / Temp:</span>
                <span className="font-medium text-alkota-black">210 BAR @ 92°C</span>
              </div>
            </div>

            <Link
              href="/service/my-alkota"
              className="w-full text-center block bg-[#F0EFEB] hover:bg-alkota-black hover:text-white text-alkota-black font-ibm-plex-mono text-xs uppercase tracking-widest py-3 transition-colors"
            >
              Open Full My Alkota Demo Record →
            </Link>
          </div>
        </div>
      </section>


      {/* ── CHAPTER 07: LEGACY ALKOTA SUPPORT & MULTI-BRAND ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#F0EFEB] border-y border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Heritage &amp; Long-Term Commitment
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight mb-4">
                Still working. Still supported.
              </h2>
              <p className="text-sm text-[#555] font-normal leading-relaxed mb-4">
                Do you own a 10- or 20-year-old Alkota machine? We maintain extensive historic build records, coil specifications, and replacement parts supersession data.
              </p>
              <p className="text-sm text-[#555] font-normal leading-relaxed">
                Even when an obsolete burner controller or valve is discontinued, our engineering team provides verified retrofit kits to keep your legacy Alkota unit in frontline industrial service.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white border border-[#E8E8E4] p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-alkota-orange" />
                <h3 className="font-medium text-sm text-alkota-black uppercase tracking-wider">
                  Mixed Fleets &amp; Multi-Brand Industrial Support
                </h3>
              </div>
              <p className="text-xs text-[#666] leading-relaxed mb-4">
                In addition to Alkota equipment, our mobile service engineers provide planned maintenance and pump repairs on selected third-party commercial high-pressure washers, stationary wash bays, and water treatment systems.
              </p>
              <div className="flex items-center gap-4 text-xs font-ibm-plex-mono text-[#888]">
                <span>✓ Factory Parts Stock</span>
                <span>✓ Mobile Diagnostic Kits</span>
                <span>✓ Flue-Gas Testing</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── CHAPTER 08: CONTROLLED TROUBLESHOOTING & EMERGENCY BOOKING ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
            // Technical Self-Triage
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight mb-4">
            Safe Operating Checks &amp; Diagnostics
          </h2>
          <p className="text-sm text-[#666] font-normal leading-relaxed">
            Review safe operator-level preliminary checks below before requesting an engineer. Do not attempt internal electrical or unloader disassembly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <TroubleshootingAccordion />
        </div>

        {/* Final CTA Banner */}
        <div className="border border-[#E8E8E4] bg-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="font-extralight text-3xl text-alkota-black tracking-tight mb-3">
            Need an engineer on site or workshop pump rebuild?
          </h3>
          <p className="text-sm text-[#666] max-w-xl mx-auto mb-8 leading-relaxed">
            Our unified service desk handles planned maintenance bookings, emergency breakdowns, pump send-ins, and site commissioning requests nationwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/service/request"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Book Service Request Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-alkota-black px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Speak to a Senior Engineer
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
