'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Wrench,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
  Truck,
  Send
} from 'lucide-react';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

export default function RequestServicePage({
  params,
}: {
  params: Promise<{ 'build-code': string }>;
}) {
  const resolvedParams = use(params);
  const buildCode = resolvedParams['build-code'];
  const asset = SAMPLE_DELIVERED_ASSET;

  const [submitted, setSubmitted] = useState(false);
  const [serviceType, setServiceType] = useState('planned_maintenance');
  const [urgency, setUrgency] = useState('routine');
  const [symptoms, setSymptoms] = useState('');
  const [siteLocation, setSiteLocation] = useState(asset.customer_site || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      <Navigation />

      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-3">
            <Link href={`/my-alkota/builds/${buildCode}`} className="hover:text-alkota-orange flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to System Record
            </Link>
            <span>/</span>
            <span className="text-white">Request Service</span>
          </div>

          <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
            Request Service Visit
          </h1>
          <p className="text-xs sm:text-sm text-[#AAA]">
            Direct service booking for your bespoke Alkota trailer rig. System details are pre-loaded.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 py-12 space-y-8">
        {/* Pre-Populated Asset Identity Box */}
        <div className="bg-[#141414] text-white border border-[#262626] p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Equipment Pre-Identified
              </span>
            </div>
            <span className="font-ibm-plex-mono text-xs text-[#888]">{asset.build_reference}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#AAA]">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] block">Client Org</span>
              <span className="text-white font-medium">{asset.customer_company}</span>
            </div>
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] block">Primary Machine</span>
              <span className="text-white font-medium">Alkota DED-4000 (AK-DED-2025-0044)</span>
            </div>
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] block">Warranty Status</span>
              <span className="text-emerald-400 font-medium">Active (Expires {asset.warranty_end})</span>
            </div>
          </div>
        </div>

        {/* Submission State */}
        {submitted ? (
          <div className="bg-white border border-emerald-300 p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-2xl text-alkota-black">Service Request Logged</h3>
            <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto leading-relaxed">
              Your service request for <strong>{asset.build_reference}</strong> has been received by Alkota UK dispatch. A field engineer will confirm the visit window.
            </p>
            <div className="pt-4">
              <Link
                href={`/my-alkota/builds/${buildCode}`}
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-wider font-bold"
              >
                Return to Build Record
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E4] p-8 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                  Service Request Type
                </label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-alkota-black text-xs font-medium focus:border-alkota-orange outline-none"
                >
                  <option value="planned_maintenance">Planned Preventative Maintenance (PPM)</option>
                  <option value="breakdown">Emergency Breakdown / Machine Down</option>
                  <option value="pump_repair">Pump &amp; Burner Inspection</option>
                  <option value="technical_support">Technical Engineer Site Audit</option>
                </select>
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                  Operational Urgency
                </label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-alkota-black text-xs font-medium focus:border-alkota-orange outline-none"
                >
                  <option value="routine">Routine (Next Available Window)</option>
                  <option value="operating_with_fault">Operating with Fault (Within 48h)</option>
                  <option value="machine_down">Critical Machine Down (Priority Dispatch)</option>
                  <option value="planned_shutdown">Planned Site Shutdown Window</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                Operating Site Location
              </label>
              <input
                type="text"
                value={siteLocation}
                onChange={e => setSiteLocation(e.target.value)}
                placeholder="e.g. Coventry Vehicle Depot, West Midlands"
                className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-alkota-black text-xs font-medium focus:border-alkota-orange outline-none"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                Description of Requirement / Symptoms *
              </label>
              <textarea
                required
                rows={4}
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                placeholder="Describe current operating symptoms, run hours reading, or requested service checks..."
                className="w-full bg-[#FAF9F5] border border-[#DDD] p-3 text-alkota-black text-xs leading-relaxed focus:border-alkota-orange outline-none"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[11px] text-[#888]">
                Alkota engineering records and schematics will be automatically referenced.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest font-bold transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Submit Service Request
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
