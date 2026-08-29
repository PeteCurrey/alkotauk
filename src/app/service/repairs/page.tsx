import React from 'react';
import Link from 'next/link';
import { Wrench, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, PhoneCall, Gauge, Flame, Zap } from 'lucide-react';
import TroubleshootingAccordion from '@/components/service/TroubleshootingAccordion';

export const metadata = {
  title: 'Breakdown & Reactive Repairs | Alkota UK',
  description:
    'Rapid industrial pressure washer breakdown diagnosis and on-site repair. Experienced field engineers, genuine replacement parts, and emergency machine down triage.',
};

export default function BreakdownRepairsPage() {
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
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Breakdown &amp; Repairs</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-800 text-red-400 font-ibm-plex-mono text-[10px] uppercase tracking-widest mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> Emergency Triage Desk Active
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Breakdown &amp; Reactive Repairs
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Fast diagnostic triage, mobile field engineering, and genuine OEM replacement parts to restore high-pressure cleaning plant to full operational duty.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/service/request?type=breakdown&urgency=machine_down"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Report Machine Down (Priority)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/service/request?type=breakdown&urgency=operating_with_fault"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Book Standard Repair
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRIAGE PROCESS ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
            // The Repair Workflow
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight mb-4">
            How We Handle Machine Breakdowns
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            Our goal is rapid resolution with zero guesswork. We follow a structured 4-step triage sequence to ensure the attending engineer arrives equipped with the exact parts for your serial number.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: '01',
              title: 'Remote Triage',
              desc: 'Our engineering desk reviews your symptoms, serial plate, and error codes to identify probable failure points before dispatch.',
            },
            {
              step: '02',
              title: 'Van-Stock Parts',
              desc: 'The engineer mobilises with verified OEM seals, unloader valves, burner components, and coils matched to your machine model.',
            },
            {
              step: '03',
              title: 'On-Site Diagnostic',
              desc: 'Comprehensive electrical, hydraulic, and combustion testing to pinpoint the root cause — not just symptoms.',
            },
            {
              step: '04',
              title: 'Commission Run',
              desc: 'Full 15-minute load test under working pressure with measured temperature, flow, and digital sign-off certificate.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-[#E8E8E4] p-6">
              <span className="font-ibm-plex-mono text-xs text-alkota-orange font-bold block mb-2">
                Step {item.step}
              </span>
              <h3 className="font-medium text-base text-alkota-black mb-2">{item.title}</h3>
              <p className="text-xs text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── COMMON FAULT CLASSIFICATIONS ── */}
        <div className="border border-[#E8E8E4] bg-white p-8 mb-16">
          <h3 className="font-extralight text-2xl text-alkota-black tracking-tight mb-6">
            Common Industrial Fault Classifications We Repair
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-alkota-orange pl-4">
              <div className="flex items-center gap-2 mb-1.5 text-alkota-black font-medium text-sm">
                <Gauge className="w-4 h-4 text-alkota-orange" />
                <span>Hydraulic &amp; Pump Faults</span>
              </div>
              <p className="text-xs text-[#666] leading-relaxed">
                Loss of pressure, severe pressure pulsing, cavitation, cracked plungers, blown packing seals, water in oil crankcase, unloader valve cycling.
              </p>
            </div>

            <div className="border-l-2 border-alkota-orange pl-4">
              <div className="flex items-center gap-2 mb-1.5 text-alkota-black font-medium text-sm">
                <Flame className="w-4 h-4 text-alkota-orange" />
                <span>Combustion &amp; Heating Coil</span>
              </div>
              <p className="text-xs text-[#666] leading-relaxed">
                Burner lockout, no spark, fuel pump failure, white/black smoke, failed flow switch, burst heating coil, temperature thermostat failure.
              </p>
            </div>

            <div className="border-l-2 border-alkota-orange pl-4">
              <div className="flex items-center gap-2 mb-1.5 text-alkota-black font-medium text-sm">
                <Zap className="w-4 h-4 text-alkota-orange" />
                <span>Electrical &amp; Control Gear</span>
              </div>
              <p className="text-xs text-[#666] leading-relaxed">
                Tripping main RCD/breakers, motor hum without rotation, failed start capacitor, thermal overload tripping, microswitch failure, time-delay relay faults.
              </p>
            </div>
          </div>
        </div>

        {/* ── SAFE TROUBLESHOOTING EMBED ── */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Operator Checks
            </span>
            <h3 className="font-extralight text-2xl text-alkota-black tracking-tight">
              Before Requesting an Emergency Callout
            </h3>
          </div>
          <TroubleshootingAccordion />
        </div>

        {/* Final CTA */}
        <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 text-center">
          <h3 className="font-extralight text-2xl text-alkota-black tracking-tight mb-2">
            Ready to log an urgent breakdown?
          </h3>
          <p className="text-xs text-[#666] max-w-lg mx-auto mb-6">
            Our engineering coordinators will review your machine specification and coordinate dispatch.
          </p>
          <Link
            href="/service/request?type=breakdown"
            className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-black text-white px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
          >
            Submit Breakdown Request
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
