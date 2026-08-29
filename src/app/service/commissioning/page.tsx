import React from 'react';
import Link from 'next/link';
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Users, Droplets, Zap } from 'lucide-react';

export const metadata = {
  title: 'Site Commissioning & Operational Handover | Alkota UK',
  description:
    'Professional on-site commissioning for stationary skids, mobile wash trailers, water treatment systems, and industrial wash plants. Utility verification, burner setup, and operator training.',
};

export default function CommissioningPage() {
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
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Site Commissioning</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Installation &amp; Handover
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Site Commissioning &amp; Operational Handover
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Ensuring stationary skids, mobile trailer rigs, water treatment recycling systems, and custom wash plants are correctly installed, calibrated, safety-tested, and handed over with full operator training.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/service/request?type=commissioning"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Book Site Commissioning
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/service/machine-registration"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Register Installed Asset
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMISSIONING SCOPE ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
              // First-Day Excellence
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight mb-6">
              Why Professional Commissioning Matters
            </h2>
            <p className="text-sm text-[#555] leading-relaxed mb-4">
              Industrial pressure washing plant operates at extreme hydraulic pressures (up to 350 BAR) and intense thermal loads (95°C water / 150°C wet steam). An undersized water feed, phase rotation error, or restricted fuel supply will cause immediate component damage on day one.
            </p>
            <p className="text-sm text-[#555] leading-relaxed">
              Our commissioning engineers systematically verify site infrastructure, perform combustion analysis, set unloader thresholds, and certify the installation for the Alkota 7-Year Coil Warranty.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {[
              {
                icon: Droplets,
                title: 'Water Supply Flow & Pressure Audit',
                desc: 'Static and dynamic flow measurement (L/min) to ensure the supply exceeds machine rating by minimum 1.5x to prevent pump cavitation.',
              },
              {
                icon: Zap,
                title: 'Electrical Supply & Phase Verification',
                desc: 'Voltage drop under load, 3-phase motor rotation, earthing loop impedance, and circuit breaker discrimination checks.',
              },
              {
                icon: Flame,
                title: 'Down-Draft Burner & Combustion Setup',
                desc: 'Fuel pump pressure calibration, electrode gap verification, air damper adjustment, and flue gas temperature testing.',
              },
              {
                icon: Users,
                title: 'Operator Training & Safety Briefing',
                desc: 'Direct instruction on daily pre-checks, correct trigger gun handling, chemical dosing, and emergency shutdown procedures.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-[#E8E8E4] p-5 flex items-start gap-4">
                  <div className="w-9 h-9 bg-orange-50 text-alkota-orange flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-alkota-black mb-1">{item.title}</h4>
                    <p className="text-xs text-[#666] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── THE HANDOVER PACKAGE ── */}
        <div className="border border-[#E8E8E4] bg-white p-8 sm:p-12 mb-16">
          <div className="border-b border-[#E8E8E4] pb-6 mb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Documentation Deliverables
            </span>
            <h3 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
              The Alkota Handover Package
            </h3>
            <p className="text-xs text-[#666] mt-1">
              Every commissioned system is delivered with a complete digital and physical documentation set.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-6">
              <FileCheck className="w-6 h-6 text-alkota-orange mb-3" />
              <h4 className="font-medium text-sm text-alkota-black mb-2">Commissioning Certificate</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                Signed engineering record detailing measured pressure (BAR), water flow (LPM), flue temperature, motor current draw, and safety valve release points.
              </p>
            </div>

            <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-6">
              <ShieldCheck className="w-6 h-6 text-alkota-orange mb-3" />
              <h4 className="font-medium text-sm text-alkota-black mb-2">7-Year Warranty Certificate</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                Direct factory warranty registration for the Schedule 80 ASTM A53 heating coil and major driveline components linked to your machine serial number.
              </p>
            </div>

            <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-6">
              <Users className="w-6 h-6 text-alkota-orange mb-3" />
              <h4 className="font-medium text-sm text-alkota-black mb-2">Operator Care &amp; Service Plan</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                Laminated daily pre-check guidance card, recommended PPM interval schedule, and emergency engineering direct contact numbers.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="bg-[#111] text-white p-8 text-center border border-[#222]">
          <h3 className="font-extralight text-2xl text-white tracking-tight mb-2">
            Scheduling a new installation or site handover?
          </h3>
          <p className="text-xs text-[#AAA] max-w-lg mx-auto mb-6">
            Contact our project commissioning desk to arrange engineer attendance to align with your facility installation date.
          </p>
          <Link
            href="/service/request?type=commissioning"
            className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
          >
            Request Commissioning Engineer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
