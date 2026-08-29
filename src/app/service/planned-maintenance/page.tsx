import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Clock, Calendar, ArrowRight, Wrench, AlertCircle, FileText } from 'lucide-react';
import { PPM_SCHEDULES, SERVICE_PLANS } from '@/lib/service/seed-data';

export const metadata = {
  title: 'Planned Preventive Maintenance (PPM) | Alkota UK',
  description:
    'Structured planned maintenance schedules for Alkota hot water, cold water, and trailer cleaning systems. Condition audits, oil changes, burner tuning, and safety tests.',
};

export default function PlannedMaintenancePage() {
  const hotWaterSchedule = PPM_SCHEDULES['hot-water'];
  const coldWaterSchedule = PPM_SCHEDULES['cold-water'];
  const trailerSchedule = PPM_SCHEDULES['trailers'];

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
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Planned Maintenance</span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Planned Preventive Maintenance
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Scheduled, condition-based servicing engineered to eliminate unplanned downtime, maintain rated BAR output, and extend the operating life of your Alkota equipment.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/service/request?type=planned_maintenance"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Book Planned Service
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/service/contracts"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Explore Service Contracts
            </Link>
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY & INTERVALS ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
              // Maintenance Scheduling
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight mb-6">
              Hours-Driven or Calendar-Based Intervals
            </h2>
            <p className="text-sm text-[#555] leading-relaxed mb-4">
              Unlike domestic washers with no service path, industrial machines demand scheduled intervention based on duty cycle. We calibrate service triggers around either operating hours (recorded on machine hour meters) or calendar windows.
            </p>
            <p className="text-sm text-[#555] leading-relaxed">
              Every PPM visit is performed by a factory-trained technician using calibrated test instruments, genuine ISO 68 pump lubricant, and OEM service kits.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E8E8E4] p-6">
              <div className="w-10 h-10 bg-orange-50 text-alkota-orange flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-alkota-black mb-2">500-Hour Interval</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Pump oil change, filter replacements, burner electrode cleaning, and unloader bypass inspection. Recommended for high-use commercial wash bays.
              </p>
            </div>

            <div className="bg-white border border-[#E8E8E4] p-6">
              <div className="w-10 h-10 bg-orange-50 text-alkota-orange flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-alkota-black mb-2">Annual / 1000-Hour</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Comprehensive V-packing renewal, check valve audit, coil descaling check, safety burst disc test, and electrical load verification.
              </p>
            </div>
          </div>
        </div>

        {/* ── SCHEDULE INSPECTION TABS / ACCORDIONS ── */}
        <div className="border border-[#E8E8E4] bg-white p-8 mb-16">
          <div className="border-b border-[#E8E8E4] pb-6 mb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Standard Checklist
            </span>
            <h3 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
              Hot Water Machine Planned Maintenance Schedule
            </h3>
            <p className="text-xs text-[#777] mt-1">
              {hotWaterSchedule.notes}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E4] bg-[#F7F7F5] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                  <th className="p-3">Component Area</th>
                  <th className="p-3">Mandatory Task &amp; Inspection</th>
                  <th className="p-3">Required Standard</th>
                  <th className="p-3">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4] text-[#555]">
                {hotWaterSchedule.checklist_items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F5]">
                    <td className="p-3 font-medium text-alkota-black">{item.component}</td>
                    <td className="p-3">{item.task}</td>
                    <td className="p-3 text-[#444]">{item.standard}</td>
                    <td className="p-3 font-ibm-plex-mono text-[10px] uppercase text-alkota-orange">
                      {item.frequency.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Contract Bridge */}
        <div className="bg-[#111] text-white p-8 sm:p-12 border border-[#222]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-2">
                Contract Support
              </span>
              <h3 className="font-extralight text-2xl sm:text-3xl text-white tracking-tight mb-2">
                Manage multiple machines under a single service contract
              </h3>
              <p className="text-xs text-[#AAA] leading-relaxed max-w-xl">
                For fleet depots, food manufacturing facilities, and multi-site operators, our service agreements provide fixed budgeting, priority emergency dispatch, and digital compliance logs.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/service/contracts"
                className="w-full text-center bg-alkota-orange hover:bg-white hover:text-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                View Contract Tiers
              </Link>
              <Link
                href="/service/request?type=planned_maintenance"
                className="w-full text-center border border-[#444] hover:border-white text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Book Single Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
