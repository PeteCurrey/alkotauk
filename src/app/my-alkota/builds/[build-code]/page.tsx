'use client';

import { use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Wrench,
  Download,
  Calendar,
  Sparkles,
  Phone,
  Package,
  Droplets,
  Flame,
  Scale,
  ExternalLink,
  ChevronRight,
  QrCode
} from 'lucide-react';
import {
  SAMPLE_BUILD_PROJECT,
  SAMPLE_DELIVERED_ASSET,
  ALL_BUILD_STAGES,
} from '@/lib/trailers/build-project-data';

export default function CustomerBuildTrackerPage({
  params,
}: {
  params: Promise<{ 'build-code': string }>;
}) {
  const resolvedParams = use(params);
  const buildCode = resolvedParams['build-code'];

  // Demo routing: AKT-KXPR85-UK or delivered matches SAMPLE_DELIVERED_ASSET, else SAMPLE_BUILD_PROJECT
  const project =
    buildCode === 'AKT-KXPR85-UK' || buildCode === 'bp-002'
      ? SAMPLE_DELIVERED_ASSET
      : SAMPLE_BUILD_PROJECT;

  const isDelivered = project.status === 'delivered';
  const config = project.accepted_configuration;

  return (
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      <Navigation />

      {/* ── HERO BANNER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-2.5 py-0.5 border border-[#333]">
                  {isDelivered ? 'Delivered Asset' : 'Alkota Build Tracker'}
                </span>
                <span
                  className={`font-ibm-plex-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 border ${
                    isDelivered
                      ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800'
                      : 'text-[#FF6900] bg-[#2A1505] border-[#FF6900]/40'
                  }`}
                >
                  {isDelivered ? 'In Active Service' : 'In Production'}
                </span>
              </div>

              <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
                {isDelivered ? 'Your Alkota Is Ready for Work.' : 'Your Alkota Is Being Built.'}
              </h1>

              <p className="text-xs sm:text-sm text-[#AAA]">
                System: <strong>{project.customer_company}</strong> · Build Ref: <span className="font-ibm-plex-mono text-[#DDD]">{project.build_reference}</span> · Code: <span className="font-ibm-plex-mono text-[#DDD]">{project.build_code}</span>
              </p>
            </div>

            {/* Target Handover or Warranty Status */}
            <div className="bg-[#141414] border border-[#262626] p-5 lg:min-w-[280px]">
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1">
                {isDelivered ? 'Warranty Expiry' : 'Estimated Target Handover'}
              </p>
              <p className="font-barlow-condensed text-2xl font-bold text-white">
                {isDelivered
                  ? project.warranty_end
                  : project.target_customer_visible && project.target_handover_date
                  ? project.target_handover_date.slice(0, 10)
                  : 'Engineering in Progress'}
              </p>
              <p className="text-[11px] text-[#777] mt-1">
                {isDelivered
                  ? 'Official 12-Month UK Warranty Active'
                  : 'Milestone notifications sent on key progress stages'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN BODY ── */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16 space-y-16">
        {/* ── IF NOT DELIVERED: SHOW PRODUCTION TIMELINE ── */}
        {!isDelivered && (
          <section className="space-y-8">
            <div className="border-b border-[#E8E8E4] pb-4">
              <h2 className="font-light text-2xl sm:text-3xl text-alkota-black tracking-tight">
                Production Timeline &amp; Milestones
              </h2>
              <p className="text-xs sm:text-sm text-[#666] mt-1">
                Real-time visibility through the 13 workshop manufacturing and quality assurance stages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Vertical Stepper */}
              <div className="lg:col-span-7 bg-white border border-[#E8E8E4] p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  {project.stages.map((stage, idx) => (
                    <div key={stage.id} className="flex items-start gap-4">
                      {/* Step marker */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-ibm-plex-mono text-xs font-bold transition-all ${
                            stage.status === 'complete'
                              ? 'bg-emerald-500 text-white'
                              : stage.status === 'in_progress'
                              ? 'bg-[#FF6900] text-white ring-4 ring-[#FF6900]/20 animate-pulse'
                              : 'bg-[#F0EFEB] text-[#999] border border-[#DDD]'
                          }`}
                        >
                          {stage.status === 'complete' ? '✓' : idx + 1}
                        </div>
                        {idx < project.stages.length - 1 && (
                          <div
                            className={`w-0.5 h-8 mt-1 ${
                              stage.status === 'complete' ? 'bg-emerald-500' : 'bg-[#E8E8E4]'
                            }`}
                          />
                        )}
                      </div>

                      {/* Stage info */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-medium text-sm ${
                              stage.status === 'in_progress'
                                ? 'text-alkota-black font-bold'
                                : stage.status === 'complete'
                                ? 'text-[#333]'
                                : 'text-[#888]'
                            }`}
                          >
                            {stage.customer_label}
                          </h4>
                          <span
                            className={`font-ibm-plex-mono text-[9px] uppercase px-2 py-0.5 ${
                              stage.status === 'complete'
                                ? 'text-emerald-700 bg-emerald-50'
                                : stage.status === 'in_progress'
                                ? 'text-[#FF6900] bg-[#FFF3EB] font-bold'
                                : 'text-[#999]'
                            }`}
                          >
                            {stage.status === 'in_progress'
                              ? 'CURRENT STAGE'
                              : stage.status === 'complete'
                              ? 'COMPLETED'
                              : 'UPCOMING'}
                          </span>
                        </div>
                        {stage.completed_at && (
                          <p className="font-ibm-plex-mono text-[10px] text-[#888] mt-0.5">
                            Passed: {stage.completed_at.slice(0, 10)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Updates & Media */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
                  <h3 className="font-medium text-base text-alkota-black flex items-center gap-2">
                    <Clock className="w-4 h-4 text-alkota-orange" /> Workshop Updates
                  </h3>
                  <div className="space-y-4">
                    {project.updates.map(upd => (
                      <div key={upd.id} className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-ibm-plex-mono text-[10px] text-[#777]">{upd.date}</span>
                          {upd.is_milestone && (
                            <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#FF6900] bg-[#FFF3EB] px-2 py-0.5 border border-[#FF6900]/20 font-bold">
                              Key Milestone
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#333] leading-relaxed">{upd.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Livery Approval Card */}
                {project.customer_approvals.length > 0 && (
                  <div className="bg-white border border-[#E8E8E4] p-6 space-y-3">
                    <h3 className="font-medium text-base text-alkota-black flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-alkota-orange" /> Design Sign-Off
                    </h3>
                    {project.customer_approvals.map(app => (
                      <div key={app.id} className="text-xs p-3 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
                        <div className="flex justify-between font-ibm-plex-mono text-[10px]">
                          <span>{app.title}</span>
                          <span className="text-amber-700 font-bold uppercase">{app.status.replace(/_/g, ' ')}</span>
                        </div>
                        <p className="text-[#666]">
                          Your fleet artwork proof has been prepared for review.
                        </p>
                        {app.document_url && (
                          <a
                            href={app.document_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-alkota-orange font-ibm-plex-mono text-[10px] uppercase font-bold hover:underline"
                          >
                            <Download className="w-3 h-3" /> View Livery Proof (PDF)
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── IF DELIVERED: SHOW ASSET OWNERSHIP PLATFORM ── */}
        {isDelivered && (
          <section className="space-y-12">
            {/* System Specification Card */}
            <div className="bg-white border border-[#E8E8E4] p-8 shadow-sm">
              <div className="border-b border-[#E8E8E4] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-light text-2xl text-alkota-black tracking-tight">
                    Installed System Architecture
                  </h2>
                  <p className="text-xs text-[#666]">
                    Permanent digital asset record for {project.customer_company}
                  </p>
                </div>
                <span className="font-ibm-plex-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 border border-emerald-200">
                  Verified Finished Mass: {project.weights.verified_finished_weight_kg} kg
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888] block">Primary Rig</span>
                  <p className="font-bold text-base text-alkota-black">Alkota DED-4000 Diesel</p>
                  <p className="text-[#666]">Dual-Gun 200 Bar @ 17 LPM High-Flow Skid</p>
                  <p className="font-ibm-plex-mono text-[10px] text-alkota-orange pt-1">
                    Serial: AK-DED-2025-0044
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888] block">Enclosure &amp; Chassis</span>
                  <p className="font-bold text-base text-alkota-black">3,500kg Tandem Plant Room</p>
                  <p className="text-[#666]">Insulated GRP Body · 1,000L Baffled Water Tank</p>
                  <p className="font-ibm-plex-mono text-[10px] text-emerald-700 pt-1">
                    VIN: [To be populated from Supabase asset record]
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888] block">Environmental Recovery</span>
                  <p className="font-bold text-base text-alkota-black">Closed-Loop Recirculation</p>
                  <p className="text-[#666]">5-Stage Hydro-Recycle VFS Treatment Module</p>
                  <p className="font-ibm-plex-mono text-[10px] text-[#777] pt-1">
                    Multi-stage filtration · Site discharge subject to consent
                  </p>
                </div>
              </div>
            </div>

            {/* PPM & Service Schedule */}
            <div className="bg-white border border-[#E8E8E4] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-medium text-lg text-alkota-black">
                    Planned Preventative Maintenance Schedule
                  </h3>
                  <p className="text-xs text-[#666]">
                    Manufacturer-prescribed intervals for optimal uptime and warranty validation.
                  </p>
                </div>
                <Link
                  href={`/my-alkota/builds/${buildCode}/service`}
                  className="bg-alkota-orange hover:bg-black text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
                >
                  Book Service Visit
                </Link>
              </div>

              <div className="space-y-3">
                {project.service_schedule?.map(item => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <p className="font-bold text-alkota-black">{item.component}</p>
                      <p className="text-[#666] text-[11px]">{item.service_type} · Provider: {item.assigned_provider}</p>
                    </div>
                    <div className="flex items-center gap-4 font-ibm-plex-mono">
                      <span className="text-[#444] font-bold">Next Due: {item.next_due_date}</span>
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase font-bold ${
                          item.status === 'due_soon'
                            ? 'text-amber-700 bg-amber-50 border border-amber-200'
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SHARED: DIGITAL HANDOVER PACK & DOCUMENTS ── */}
        <section className="bg-white border border-[#E8E8E4] p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E8E4] pb-4">
            <div>
              <h3 className="font-medium text-lg text-alkota-black">
                Controlled Technical Documentation &amp; Manuals
              </h3>
              <p className="text-xs text-[#666]">
                Authorised handover documentation pack for this build record.
              </p>
            </div>
            <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase">
              {project.handover_documents.filter(d => d.customer_visible).length} Verified Files
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {project.handover_documents
              .filter(d => d.customer_visible)
              .map(doc => (
                <div
                  key={doc.id}
                  className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] flex items-center justify-between hover:border-alkota-orange transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-alkota-orange shrink-0" />
                    <div>
                      <h4 className="font-medium text-alkota-black">{doc.title}</h4>
                      <p className="font-ibm-plex-mono text-[10px] text-[#888]">{doc.revision} · {doc.date}</p>
                    </div>
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-alkota-orange hover:underline font-ibm-plex-mono text-[10px] uppercase font-bold flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" /> View
                    </a>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* ── PERSISTENT ACTION CTAS ── */}
        <section className="bg-[#0A0A0A] text-white p-8 sm:p-12 border border-[#222] space-y-6">
          <div className="max-w-3xl">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
              Lifetime Support Platform
            </span>
            <h3 className="font-extralight text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-2">
              Need Help With This Specific Alkota System?
            </h3>
            <p className="text-xs text-[#AAA] leading-relaxed">
              Your build reference <span className="font-ibm-plex-mono text-white">{project.build_reference}</span> is permanently linked to our engineering and parts databases. One click routes your enquiry with full equipment specifications pre-attached.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={`/my-alkota/builds/${buildCode}/service`}
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-bold"
            >
              <Wrench className="w-3.5 h-3.5" /> Request Service Visit
            </Link>
            <Link
              href={`/my-alkota/builds/${buildCode}/parts`}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-white hover:text-black text-white border border-[#333] px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-bold"
            >
              <Package className="w-3.5 h-3.5" /> Request Matched Parts
            </Link>
            <Link
              href={`/my-alkota/builds/${buildCode}/support`}
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-[#DDD] hover:text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Technical Support &amp; Knowledge
            </Link>
          </div>
        </section>

        {/* ── FLEET REPLICATION (BUILD ANOTHER LIKE THIS) ── */}
        <section className="bg-white border border-[#E8E8E4] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
              Fleet Scaling &amp; Replication
            </span>
            <h4 className="font-medium text-base text-alkota-black mt-0.5">
              Build Another Rig Like This
            </h4>
            <p className="text-xs text-[#666]">
              Fork this exact specification into the current Alkota configurator for regional fleet expansion.
            </p>
          </div>
          <Link
            href="/trailers/configure?start=environmental-closed-loop"
            className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors shrink-0"
          >
            Fork to Configurator
            <ArrowRight className="w-3 h-3" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
