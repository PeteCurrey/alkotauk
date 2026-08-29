'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  Wrench,
  Clock,
  Download,
  Calendar,
  AlertCircle,
  Building,
  Sparkles,
  Gauge,
  Thermometer,
  Droplets,
  Package,
  Truck
} from 'lucide-react';

import { SAMPLE_REGISTERED_MACHINE } from '@/lib/service/seed-data';


export default function MyAlkotaDashboardPage() {
  const { registration, reports } = SAMPLE_REGISTERED_MACHINE;

  return (
    <main className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-2.5 py-0.5 border border-[#333]">
                  Digital Asset Hub
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 border border-emerald-800">
                  Verified Ownership
                </span>
              </div>
              <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
                My Alkota Equipment Ledger
              </h1>
              <p className="text-xs sm:text-sm text-[#AAA]">
                Logged in as: <strong>{registration.company_name}</strong> · Site: {registration.site_name}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/service/request?type=planned_maintenance"
                className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
              >
                Book Service
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/service/machine-registration"
                className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Register Another Machine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASSET OVERVIEW CARD ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-white border border-[#E8E8E4] p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                  Model Reference
                </span>
                <span className="text-[#CCC]">·</span>
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider">
                  Hot Water Industrial Driveline
                </span>
              </div>
              <h2 className="font-light text-2xl sm:text-3xl text-alkota-black tracking-tight mb-4">
                Alkota 430XH Hot Water Pressure Washer
              </h2>
              <p className="text-xs text-[#666] leading-relaxed max-w-2xl mb-6">
                {registration.notes}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#F0EFEB] text-xs">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                    Serial Number
                  </span>
                  <span className="font-mono font-semibold text-alkota-black">
                    {registration.serial_number}
                  </span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                    Purchase Date
                  </span>
                  <span className="text-alkota-black">
                    {registration.purchase_date}
                  </span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                    Coil Warranty
                  </span>
                  <span className="text-emerald-700 font-medium">
                    Active (7-Year A53)
                  </span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                    Overall Condition
                  </span>
                  <span className="text-emerald-700 font-medium">
                    Good (Audited)
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF9F5] border border-[#E8E8E4] p-6 space-y-4">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
                  Next Planned Maintenance
                </span>
                <span className="font-medium text-base text-alkota-black block">
                  March 2025 (or at 1,000 hrs)
                </span>
                <span className="text-xs text-[#777]">
                  Annual PPM service &amp; V-packing renewal
                </span>
              </div>

              <div className="pt-3 border-t border-[#E8E8E4]">
                <Link
                  href="/service/request?type=planned_maintenance&model=430XH&serial=ALK-2024-88421"
                  className="w-full text-center block bg-alkota-black hover:bg-alkota-orange text-white py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Schedule Next Service →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICE HISTORY TIMELINE ── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // Service History
              </span>
              <h3 className="font-extralight text-2xl text-alkota-black tracking-tight">
                Chronological Engineering Visits &amp; Reports
              </h3>
            </div>
            <span className="font-ibm-plex-mono text-xs text-[#777]">
              {reports.length} Signed Visits on Record
            </span>
          </div>

          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white border border-[#E8E8E4] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-4 mb-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      {report.visit_type}
                    </span>
                    <h4 className="font-medium text-lg text-alkota-black">
                      Job Ref: {report.report_number}
                    </h4>
                  </div>
                  <div className="text-right sm:text-right text-xs">
                    <span className="font-ibm-plex-mono text-[#888] block">
                      Date: {report.visit_date}
                    </span>
                    <span className="text-alkota-black font-medium">
                      Engineer: {report.engineer_name}
                    </span>
                  </div>
                </div>

                {/* Measured Performance Readings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF9F5] border border-[#E8E8E4] mb-6 text-xs">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                      Hour Meter
                    </span>
                    <span className="font-medium text-alkota-black">{report.hours_reading} hrs</span>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                      Measured Pressure
                    </span>
                    <span className="font-medium text-alkota-black">{report.pressure_reading_bar} BAR</span>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                      Operating Temp
                    </span>
                    <span className="font-medium text-alkota-black">{report.temp_reading_c}°C</span>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                      Measured Flow
                    </span>
                    <span className="font-medium text-alkota-black">{report.flow_reading_lpm} L/min</span>
                  </div>
                </div>

                <div className="text-xs text-[#555] space-y-3 mb-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-1">
                      Work Carried Out:
                    </span>
                    <p className="leading-relaxed">{report.work_carried_out}</p>
                  </div>

                  {report.parts_used.length > 0 && (
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-1">
                        OEM Parts &amp; Consumables Fitted:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {report.parts_used.map((p, idx) => (
                          <span
                            key={idx}
                            className="font-ibm-plex-mono text-[10px] bg-white border border-[#DDD] px-2.5 py-1 text-[#444]"
                          >
                            {p.quantity}x {p.name} ({p.part_number})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {report.recommendations && (
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-1">
                        Engineer Recommendations:
                      </span>
                      <p className="italic text-[#777]">{report.recommendations}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0EFEB] text-xs">
                  <span className="text-[#888]">
                    Sign-off: <strong>{report.customer_signature_name}</strong> (Client Acceptance)
                  </span>
                  <button
                    onClick={() => alert(`Downloading signed PDF certificate for ${report.report_number}`)}
                    className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Service Certificate (PDF)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TECHNICAL DOCUMENTS & COMPATIBLE ATTACHMENTS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Documents */}
          <div className="bg-white border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-alkota-orange" />
              <h4 className="font-medium text-base text-alkota-black">
                Linked Documentation &amp; Schematics
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { title: '430XH Operator & Safety Manual', type: 'PDF (2.4 MB)' },
                { title: 'Triplex Pump Exploded Parts Schematic', type: 'PDF (1.8 MB)' },
                { title: 'Down-Draft Burner Wiring Diagram', type: 'PDF (840 KB)' },
                { title: '7-Year ASTM A53 Coil Warranty Certificate', type: 'PDF (420 KB)' }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E8E8E4] hover:border-alkota-orange transition-colors"
                >
                  <span className="font-medium text-[#444]">{doc.title}</span>
                  <span className="font-ibm-plex-mono text-[9px] text-[#999] uppercase">{doc.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-Order Recommended Service Kits & Attachments */}
          <div className="bg-white border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-alkota-orange" />
              <h4 className="font-medium text-base text-alkota-black">
                Matched Service Kits &amp; Accessories
              </h4>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#FAF9F5] border border-[#E8E8E4]">
                <div className="flex justify-between font-medium text-alkota-black mb-1">
                  <span>Annual 500-Hour Service Kit</span>
                  <span className="font-ibm-plex-mono">Ref: KIT-SRV-ANNUAL-430</span>
                </div>
                <p className="text-[#666] text-[11px] mb-2">
                  Includes ISO 68 pump oil, fuel filter cartridge, electrode gap gauge, and replacement O-rings.
                </p>
                <Link
                  href="/parts"
                  className="text-alkota-orange font-ibm-plex-mono text-[10px] uppercase tracking-wider hover:underline"
                >
                  View in Genuine Parts →
                </Link>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-[#E8E8E4]">
                <div className="flex justify-between font-medium text-alkota-black mb-1">
                  <span>Alkota 24" Surface Cleaner Attachment</span>
                  <span className="font-ibm-plex-mono">Ref: SC-24</span>
                </div>
                <p className="text-[#666] text-[11px] mb-2">
                  Verified compatible with 430XH working flow (15 L/min) and 210 BAR pressure.
                </p>
                <Link
                  href="/attachments/alkota-24-inch-commercial-surface-cleaner"
                  className="text-alkota-orange font-ibm-plex-mono text-[10px] uppercase tracking-wider hover:underline"
                >
                  View Attachment Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAILER SYSTEMS ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-5 h-5 text-alkota-orange" />
          <h3 className="font-medium text-xl text-alkota-black">Bespoke Trailer Systems</h3>
        </div>

        {/* In-Production Build */}
        <div className="bg-[#0A0A0A] text-white border border-[#222] p-6 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-2.5 py-0.5 border border-[#333]">
                  In Production
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] px-2.5 py-0.5 border border-[#333]">
                  ABP-2509-001
                </span>
              </div>
              <h4 className="font-light text-lg text-white mb-1">
                Enclosed Dual-Operator Recovery System
              </h4>
              <p className="text-xs text-[#888] mb-1">
                Build Code: <span className="font-ibm-plex-mono text-[#AAA]">AKT-MRPQ47-UK</span>
              </p>
              <p className="text-xs text-[#888]">
                Hargreaves Environmental Services Ltd · Bradford Depot
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Link
                href="/my-alkota/builds/AKT-MRPQ47-UK"
                className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
              >
                Track Your Build
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stage progress strip */}
          <div className="mt-4 pt-4 border-t border-[#222]">
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Production Progress</p>
            <div className="flex gap-1">
              {['complete','complete','complete','complete','complete','in_progress','not_started','not_started','not_started','not_started','not_started','not_started','not_started'].map((status, idx) => (
                <div
                  key={idx}
                  className="h-2 flex-1 rounded-sm"
                  style={{
                    background: status === 'complete' ? '#22c55e' : status === 'in_progress' ? '#FF6900' : '#1F1F1F'
                  }}
                />
              ))}
            </div>
            <p className="text-[10px] text-[#666] mt-1.5">Water & System Integration — In Progress</p>
          </div>
        </div>

        {/* Delivered Asset */}
        <div className="bg-white border border-[#E8E8E4] p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                  Delivered — In Service
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] px-2.5 py-0.5 border border-[#DDD]">
                  ABP-2508-002
                </span>
              </div>
              <h4 className="font-medium text-base text-alkota-black mb-1">
                Enclosed Dual-Operator Recovery System
              </h4>
              <p className="text-xs text-[#666] mb-1">
                Build Code: <span className="font-ibm-plex-mono">AKT-KXPR85-UK</span>
              </p>
              <p className="text-xs text-[#666]">Delivered 29 Aug 2025 · Warranty active</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Link
                href="/my-alkota/builds/AKT-KXPR85-UK"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
              >
                View Your System
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/my-alkota/builds/AKT-KXPR85-UK/service"
                className="inline-flex items-center gap-2 border border-[#DDD] hover:border-alkota-orange text-[#444] hover:text-alkota-orange px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

