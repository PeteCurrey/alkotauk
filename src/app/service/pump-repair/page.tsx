import React from 'react';
import Link from 'next/link';
import { Gauge, CheckCircle2, ArrowRight, ShieldCheck, Wrench, Shield, RefreshCw, FileText } from 'lucide-react';
import { PUMP_MANUFACTURERS, PUMP_REPAIR_PROCESS_STEPS } from '@/lib/service/seed-data';

export const metadata = {
  title: 'High-Pressure Pump Repair & Overhaul | Alkota UK',
  description:
    'Dedicated precision workshop for industrial triplex plunger pump rebuilds. General Pump, CAT Pumps, Comet, and Interpump overhauls with calibrated 30-minute hydro testing.',
};

export default function PumpRepairPage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/service" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Service
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Pump Overhaul Workshop</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Specialist Engineering Facility
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Repair the pump. <br />
            <span className="text-alkota-orange font-normal italic">
              Not the whole machine.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Precision workshop strip-down, ultrasonic cleaning, manifold re-machining, and calibrated hydrostatic load testing for industrial triplex plunger pumps up to 350 BAR.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/service/request?type=pump_repair"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Send In a Pump for Overhaul
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/parts"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Order Pump Seal Kits
            </Link>
          </div>
        </div>
      </section>

      {/* ── WORKSHOP PROCESS ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
            // The Workshop Standard
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight mb-4">
            The 7-Stage Precision Overhaul Protocol
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            Every pump received at our central facility undergoes an uncompromising multi-stage strip-down and testing procedure before return.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {PUMP_REPAIR_PROCESS_STEPS.map((st) => (
            <div
              key={st.step}
              className="bg-white border border-[#E8E8E4] p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:border-alkota-orange transition-colors"
            >
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-ibm-plex-mono text-xl text-alkota-orange font-bold">
                  {st.step}
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999]">
                  Phase
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-medium text-base text-alkota-black tracking-tight">
                  {st.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-xs text-[#666] leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SUPPORTED MANUFACTURERS ── */}
        <div className="border border-[#E8E8E4] bg-white p-8 mb-16">
          <div className="border-b border-[#E8E8E4] pb-4 mb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Brand Capabilities
            </span>
            <h3 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
              Supported Industrial Pump Manufacturers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PUMP_MANUFACTURERS.map((mfg) => (
              <div key={mfg.name} className="border border-[#E8E8E4] bg-[#FAF9F5] p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-lg text-alkota-black">{mfg.name}</h4>
                  <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-wider bg-orange-50 px-2 py-0.5 border border-orange-200">
                    Turnaround: {mfg.leadTimeDays}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1.5">
                    Common Models Overhauled:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mfg.models.map((mod) => (
                      <span key={mod} className="font-ibm-plex-mono text-[10px] bg-white text-[#444] px-2 py-0.5 border border-[#DDD]">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="text-xs text-[#555] space-y-1.5 border-t border-[#E8E8E4] pt-3">
                  {mfg.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── SEND-IN VS ON-SITE EXCHANGE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-[#E8E8E4] p-8">
            <h4 className="font-medium text-lg text-alkota-black mb-3">
              Send-In Workshop Overhaul
            </h4>
            <p className="text-xs text-[#666] leading-relaxed mb-6">
              Courier or deliver your unmounted pump directly to our central engineering facility. We log the unit, strip and assess, issue a formal fixed-price overhaul quote, rebuild with genuine OEM packings, and test on our calibrated load rig before secure return shipment.
            </p>
            <Link
              href="/service/request?type=pump_repair"
              className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Book Workshop Send-In
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-[#E8E8E4] p-8">
            <h4 className="font-medium text-lg text-alkota-black mb-3">
              On-Site Pump Replacement &amp; Fitting
            </h4>
            <p className="text-xs text-[#666] leading-relaxed mb-6">
              Need zero downtime? An Alkota mobile field service engineer can attend your site with a pre-configured, tested replacement pump assembly, unbolt the failed unit, mount and align the replacement, and commission the machine under full load.
            </p>
            <Link
              href="/service/request?type=breakdown"
              className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Book On-Site Engineer
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
