'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Camera,
  MessageSquare,
  Shield,
  Wrench,
  Package,
  ClipboardList,
  Scale,
  Zap,
  Droplets,
  ExternalLink,
  Plus,
  QrCode,
  Download,
  AlertCircle
} from 'lucide-react';
import {
  SAMPLE_BUILD_PROJECT,
  SAMPLE_DELIVERED_ASSET,
  ALL_BUILD_STAGES,
  FULL_HANDOVER_CHECKLIST,
  deriveChecklistForConfig,
} from '@/lib/trailers/build-project-data';
import type { BuildStageStatus } from '@/lib/trailers/types';

export default function AdminBuildControlCentrePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState('overview');
  // Use delivered asset if id matches bp-002, otherwise sample building project
  const project = resolvedParams?.id === 'bp-002' ? SAMPLE_DELIVERED_ASSET : SAMPLE_BUILD_PROJECT;
  const config = project.accepted_configuration;
  const applicableChecklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, config);

  const [verifiedWeight, setVerifiedWeight] = useState<string>(
    project.weights.verified_finished_weight_kg ? String(project.weights.verified_finished_weight_kg) : ''
  );
  const [weightSaved, setWeightSaved] = useState(false);

  const tabs = [
    { id: 'overview', label: '1. Overview', icon: Truck },
    { id: 'spec', label: '2. Final Specification', icon: ClipboardList },
    { id: 'engineering', label: '3. Engineering', icon: Wrench },
    { id: 'production', label: '4. Production Stages', icon: Clock },
    { id: 'components', label: '5. Components & Serials', icon: Package },
    { id: 'documents', label: '6. Documents', icon: FileText },
    { id: 'media', label: '7. Progress Media', icon: Camera },
    { id: 'updates', label: '8. Customer Updates', icon: MessageSquare },
    { id: 'approvals', label: '9. Customer Approvals', icon: Shield },
    { id: 'qa', label: '10. QA & Testing', icon: CheckCircle2 },
    { id: 'handover', label: '11. Handover Pack', icon: Scale },
    { id: 'asset', label: '12. Asset & Service', icon: Zap },
  ];

  return (
    <div className="min-h-screen text-white space-y-6 pb-20">
      {/* ── TOP BREADCRUMB & HEADER ── */}
      <div className="border-b border-[#222] pb-6">
        <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-3">
          <Link href="/admin/trailer-builds" className="hover:text-[#FF6900] flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Trailer Builds Pipeline
          </Link>
          <span>/</span>
          <span className="text-white">{project.build_reference}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
                {project.build_reference} · {project.customer_company}
              </h1>
              <span
                className={`px-2.5 py-0.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider ${
                  project.status === 'delivered'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : project.status === 'in_production'
                    ? 'bg-amber-950 text-[#FF6900] border border-amber-800'
                    : 'bg-[#222] text-[#AAA] border border-[#444]'
                }`}
              >
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <p className="font-ibm-plex-mono text-xs text-[#888]">
              Config Code: <strong className="text-white">{project.build_code}</strong> · Quote Ref:{' '}
              {project.quote_reference || 'N/A'} · Revision {project.accepted_revision}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/my-alkota/builds/${project.build_code}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-[#333] hover:border-[#FF6900] px-4 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-wider text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Customer View
            </Link>
            {project.qr_token && (
              <Link
                href={`/trailers/asset/${project.qr_token}`}
                target="_blank"
                className="inline-flex items-center gap-2 border border-[#333] hover:border-[#FF6900] px-4 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-wider text-[#AAA] hover:text-white transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" /> QR Landing
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT WITH STICKY TABS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Nav */}
        <div className="lg:col-span-3 sticky top-20 space-y-1 bg-[#111] p-3 border border-[#222]">
          <p className="px-3 py-2 font-ibm-plex-mono text-[9px] font-bold text-[#666] uppercase tracking-widest border-b border-[#222] mb-2">
            Build Control Modules
          </p>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 font-ibm-plex-mono text-xs tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#FF6900] border-l-2 border-[#FF6900] font-bold'
                    : 'text-[#888] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Panel */}
        <div className="lg:col-span-9 bg-[#111] border border-[#222] p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
                  Build Project Overview
                </h3>
                <p className="text-xs text-[#888]">
                  Canonical project record tracking fabrication, components, documentation, and customer handover.
                </p>
              </div>

              {/* Progress Bar Strip */}
              <div className="bg-[#161616] p-4 border border-[#262626]">
                <div className="flex justify-between items-center mb-2 font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                  <span>Operational Stages ({project.stages.filter(s => s.status === 'complete').length}/13 Complete)</span>
                  <span>Target Handover: {project.target_handover_date?.slice(0, 10) || 'TBD'}</span>
                </div>
                <div className="flex gap-1.5">
                  {project.stages.map((s, idx) => (
                    <div
                      key={idx}
                      title={`${s.internal_label}: ${s.status}`}
                      className={`h-3 flex-1 rounded-sm ${
                        s.status === 'complete'
                          ? 'bg-emerald-500'
                          : s.status === 'in_progress'
                          ? 'bg-[#FF6900] animate-pulse'
                          : s.status === 'blocked'
                          ? 'bg-rose-500'
                          : 'bg-[#262626]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#161616] p-4 border border-[#222]">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1">Customer / Org</p>
                  <p className="font-medium text-white text-sm">{project.customer_company}</p>
                  <p className="text-xs text-[#AAA]">{project.customer_name}</p>
                  <p className="text-xs text-[#777] font-ibm-plex-mono mt-1">{project.customer_email}</p>
                  <p className="text-xs text-[#777] font-ibm-plex-mono">{project.customer_phone}</p>
                </div>

                <div className="bg-[#161616] p-4 border border-[#222]">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1">Operating Site</p>
                  <p className="font-medium text-white text-sm">{project.customer_site || 'Not specified'}</p>
                  <p className="text-xs text-[#777] mt-2 font-ibm-plex-mono">Project Owner: {project.project_owner}</p>
                  <p className="text-xs text-[#777] font-ibm-plex-mono">Engineering: {project.engineering_owner}</p>
                </div>

                <div className="bg-[#161616] p-4 border border-[#222]">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1">Schedule & Dates</p>
                  <p className="text-xs text-[#AAA]">Confirmed: {project.order_confirmed_at.slice(0, 10)}</p>
                  <p className="text-xs text-[#AAA]">Target: {project.target_handover_date?.slice(0, 10) || 'TBD'}</p>
                  <p className="text-xs text-emerald-400 mt-1 font-ibm-plex-mono">
                    Actual Delivery: {project.actual_handover_date?.slice(0, 10) || 'Pending'}
                  </p>
                </div>
              </div>

              {/* Audit Log Snippet */}
              <div className="border-t border-[#222] pt-6">
                <h4 className="font-ibm-plex-mono text-xs uppercase tracking-wider text-[#AAA] mb-3">
                  Recent Audit Trail
                </h4>
                <div className="space-y-2">
                  {project.audit_log.map(log => (
                    <div key={log.id} className="text-xs flex items-start justify-between bg-[#161616] p-3 border border-[#222]">
                      <div>
                        <span className="text-white font-medium">{log.action}</span>
                        <span className="text-[#777] ml-2">by {log.performed_by}</span>
                      </div>
                      <span className="font-ibm-plex-mono text-[10px] text-[#666]">{log.performed_at.slice(0, 10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINAL SPECIFICATION */}
          {activeTab === 'spec' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-1">
                  Accepted Baseline Specification
                </h3>
                <p className="text-xs text-[#888]">
                  The final production configuration accepted at Revision {project.accepted_revision}.
                </p>
              </div>

              <div className="bg-[#161616] border border-[#222] p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Format & Chassis</span>
                    <span className="font-medium text-white">{config.format.toUpperCase()} · {config.chassis_id}</span>
                  </div>
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Primary Machine</span>
                    <span className="font-medium text-white">{config.machine_id} ({config.operator_count}-Gun Architecture)</span>
                  </div>
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Water Storage</span>
                    <span className="font-medium text-white">{config.water_storage_id}</span>
                  </div>
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Recovery & Treatment</span>
                    <span className="font-medium text-white">{config.recovery_option_id}</span>
                  </div>
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Power & Fuel</span>
                    <span className="font-medium text-white">{config.power_options.join(', ') || 'Standard Shore Power'}</span>
                  </div>
                  <div className="border-b border-[#222] pb-2">
                    <span className="font-ibm-plex-mono text-[#777] uppercase text-[10px] block">Hose Storage & Reels</span>
                    <span className="font-medium text-white">{config.hose_storage_options.join(', ') || 'None'}</span>
                  </div>
                </div>

                {project.final_engineering_notes && (
                  <div className="bg-[#1A1A1A] p-3 border-l-2 border-[#FF6900] text-xs text-[#BBB] mt-3">
                    <strong className="text-white block font-ibm-plex-mono text-[10px] uppercase mb-1">Approved Engineering Notes:</strong>
                    {project.final_engineering_notes}
                  </div>
                )}
              </div>

              {/* Weight Reconciliation */}
              <div className="bg-[#161616] border border-[#222] p-5">
                <h4 className="font-ibm-plex-mono text-xs uppercase tracking-wider text-[#AAA] mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#FF6900]" /> Weight Feedback Loop
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#111] border border-[#222]">
                    <span className="text-[#777] text-[10px] block uppercase font-ibm-plex-mono">Configurator Estimated Dry</span>
                    <span className="text-lg font-bold text-white font-ibm-plex-mono">{project.weights.estimated_dry_kg} kg</span>
                  </div>
                  <div className="p-3 bg-[#111] border border-[#222]">
                    <span className="text-[#777] text-[10px] block uppercase font-ibm-plex-mono">Configurator Estimated Wet</span>
                    <span className="text-lg font-bold text-amber-400 font-ibm-plex-mono">{project.weights.estimated_wet_kg} kg</span>
                  </div>
                  <div className="p-3 bg-[#111] border border-[#222]">
                    <span className="text-[#777] text-[10px] block uppercase font-ibm-plex-mono">Verified Finished Weight</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        value={verifiedWeight}
                        onChange={e => {
                          setVerifiedWeight(e.target.value);
                          setWeightSaved(false);
                        }}
                        placeholder="kg measured"
                        className="bg-[#1A1A1A] border border-[#333] px-2 py-1 text-white font-ibm-plex-mono text-sm w-28"
                      />
                      <button
                        onClick={() => setWeightSaved(true)}
                        className="px-3 py-1 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase font-bold hover:bg-[#e55f00]"
                      >
                        {weightSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                    {project.weights.verified_at && (
                      <span className="text-[10px] text-[#666] block mt-1">Verified: {project.weights.verified_at}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENGINEERING */}
          {activeTab === 'engineering' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Engineering Control</h3>
              <div className="bg-[#161616] p-5 border border-[#222] space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Engineering Release Status</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-ibm-plex-mono text-[10px] uppercase">
                    Released for Production
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Assigned Engineering Lead</span>
                  <span className="text-white font-medium">{project.engineering_owner}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Accepted Baseline Revision</span>
                  <span className="font-ibm-plex-mono text-[#FF6900]">Revision {project.accepted_revision}</span>
                </div>
                <p className="text-[#777] text-[11px] pt-2">
                  Historical customer revisions remain fully archived in the enquiries database. This active build
                  locks the configuration to prevent unintended drift during manufacturing.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTION STAGES */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-1">
                  Workshop Production Stages
                </h3>
                <p className="text-xs text-[#888]">
                  Update operational status per station. Stages map cleanly to the customer build timeline.
                </p>
              </div>

              <div className="space-y-3">
                {project.stages.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs transition-colors ${
                      stage.status === 'in_progress'
                        ? 'bg-[#181512] border-[#FF6900]'
                        : stage.status === 'complete'
                        ? 'bg-[#141814] border-emerald-900/50'
                        : 'bg-[#161616] border-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-ibm-plex-mono text-[10px] text-[#555] w-6">#{idx + 1}</span>
                      <div>
                        <h4 className="font-medium text-white text-sm">{stage.internal_label}</h4>
                        <p className="text-[11px] text-[#777]">
                          Customer Label: <em className="text-[#AAA] not-italic">{stage.customer_label}</em>
                        </p>
                        {stage.completed_at && (
                          <p className="text-[10px] text-emerald-400 font-ibm-plex-mono mt-0.5">
                            Completed: {stage.completed_at.slice(0, 10)} by {stage.technician || 'Lead Tech'}
                          </p>
                        )}
                        {stage.blocked_reason && (
                          <p className="text-[10px] text-rose-400 font-ibm-plex-mono mt-0.5">
                            [INTERNAL ONLY] Blocker: {stage.blocked_reason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 font-ibm-plex-mono text-[10px] uppercase font-bold ${
                          stage.status === 'complete'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : stage.status === 'in_progress'
                            ? 'bg-[#FF6900]/20 text-[#FF6900] border border-[#FF6900]/40'
                            : stage.status === 'blocked'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-[#222] text-[#666] border border-[#333]'
                        }`}
                      >
                        {stage.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMPONENTS & SERIALS */}
          {activeTab === 'components' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-1">
                    Component &amp; Serial Register
                  </h3>
                  <p className="text-xs text-[#888]">
                    Recorded component identities for warranty tracking, PPM schedules, and parts lookup.
                  </p>
                </div>
                <button
                  onClick={() => alert('Add Component Serial Dialog (Demo)')}
                  className="inline-flex items-center gap-1.5 bg-[#FF6900] px-3 py-1.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#e55f00]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Serial
                </button>
              </div>

              <div className="bg-[#161616] border border-[#222] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1F1F1F] font-ibm-plex-mono text-[10px] uppercase text-[#888] border-b border-[#2A2A2A]">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Make / Model</th>
                      <th className="p-3">Serial / VIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222]">
                    {project.component_serials.map(cs => (
                      <tr key={cs.id} className="hover:bg-[#1C1C1C]">
                        <td className="p-3 font-ibm-plex-mono text-[10px] uppercase text-[#FF6900]">{cs.category}</td>
                        <td className="p-3 font-medium text-white">{cs.description}</td>
                        <td className="p-3 text-[#AAA]">
                          {cs.make} {cs.model}
                        </td>
                        <td className="p-3 font-ibm-plex-mono text-emerald-400 font-bold">
                          {cs.vin || cs.serial_number || 'Pending Recording'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Controlled Documents</h3>
              <div className="space-y-3">
                {project.handover_documents.map(doc => (
                  <div key={doc.id} className="p-4 bg-[#161616] border border-[#222] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#FF6900]" />
                      <div>
                        <h4 className="font-medium text-white">{doc.title}</h4>
                        <p className="text-[10px] font-ibm-plex-mono text-[#777]">
                          {doc.revision} · Uploaded {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase ${
                          doc.customer_visible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-[#222] text-[#666]'
                        }`}
                      >
                        {doc.customer_visible ? 'Customer Visible' : 'Internal Only'}
                      </span>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#FF6900] hover:underline flex items-center gap-1 font-ibm-plex-mono text-[10px] uppercase"
                        >
                          <Download className="w-3 h-3" /> View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Progress Photography</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.media.map(item => (
                  <div key={item.id} className="bg-[#161616] border border-[#222] p-4 text-xs space-y-2">
                    <div className="aspect-video bg-[#0D0D0D] border border-[#222] flex items-center justify-center text-[#555] font-ibm-plex-mono text-[10px]">
                      [Photo: {item.filename}]
                    </div>
                    <p className="font-medium text-white">{item.caption || item.alt_text}</p>
                    <div className="flex justify-between items-center font-ibm-plex-mono text-[10px] text-[#777]">
                      <span className="text-[#FF6900] uppercase">{item.classification.replace('_', ' ')}</span>
                      <span>{item.uploaded_at.slice(0, 10)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CUSTOMER UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Customer-Safe Updates</h3>
              <div className="space-y-3">
                {project.updates.map(upd => (
                  <div key={upd.id} className="p-4 bg-[#161616] border border-[#222] text-xs space-y-1">
                    <div className="flex justify-between font-ibm-plex-mono text-[10px]">
                      <span className="text-[#FF6900] font-bold">{upd.date}</span>
                      {upd.is_milestone && (
                        <span className="bg-amber-950 text-amber-400 border border-amber-800 px-1.5 py-0.2 uppercase">
                          Milestone
                        </span>
                      )}
                    </div>
                    <p className="text-white">{upd.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Customer Sign-Offs &amp; Approvals</h3>
              <div className="space-y-3">
                {project.customer_approvals.map(app => (
                  <div key={app.id} className="p-4 bg-[#161616] border border-[#222] text-xs flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{app.title}</h4>
                      <p className="text-[10px] font-ibm-plex-mono text-[#777]">
                        Submitted {app.submitted_at.slice(0, 10)} · Version {app.version}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 font-ibm-plex-mono text-[10px] uppercase font-bold ${
                        app.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {app.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: QA & TESTING */}
          {activeTab === 'qa' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-1">
                  Configuration-Aware QA Checklist
                </h3>
                <p className="text-xs text-[#888]">
                  Derived from actual equipment: Enclosed ({config.format}), {config.operator_count}-Gun, Recovery (
                  {config.recovery_option_id}).
                </p>
              </div>

              <div className="space-y-2">
                {applicableChecklist.map(item => (
                  <div key={item.id} className="p-3 bg-[#161616] border border-[#222] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="px-1.5 py-0.5 bg-[#222] text-[#888] font-ibm-plex-mono text-[9px] uppercase">
                        {item.test_type}
                      </span>
                      <span className="text-white">{item.description}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 font-ibm-plex-mono text-[10px] uppercase ${
                        item.result === 'pass'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold'
                          : 'bg-[#222] text-[#666]'
                      }`}
                    >
                      {item.result || 'Pending Test'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: HANDOVER */}
          {activeTab === 'handover' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Handover &amp; Sign-Off</h3>
              <div className="bg-[#161616] p-5 border border-[#222] space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Handover Status</span>
                  <span
                    className={`px-2 py-0.5 font-ibm-plex-mono text-[10px] uppercase font-bold ${
                      project.handover_completed
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {project.handover_completed ? 'Handover Complete' : 'Pending Final Sign-Off'}
                  </span>
                </div>
                {project.handover_customer_representative && (
                  <div className="flex justify-between items-center border-b border-[#222] pb-3">
                    <span className="text-[#AAA]">Customer Representative</span>
                    <span className="text-white font-medium">{project.handover_customer_representative}</span>
                  </div>
                )}
                {project.handover_date && (
                  <div className="flex justify-between items-center border-b border-[#222] pb-3">
                    <span className="text-[#AAA]">Handover Date</span>
                    <span className="font-ibm-plex-mono text-emerald-400">{project.handover_date}</span>
                  </div>
                )}
                {project.training_completed && (
                  <div className="border-b border-[#222] pb-3">
                    <span className="text-[#AAA] block mb-1">Operator Training Notes</span>
                    <p className="text-[#CCC] bg-[#111] p-3 border border-[#222]">{project.training_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 12: ASSET & SERVICE */}
          {activeTab === 'asset' && (
            <div className="space-y-6">
              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">Delivered Asset &amp; PPM</h3>
              <div className="bg-[#161616] p-5 border border-[#222] space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Asset Record Status</span>
                  <span className="font-ibm-plex-mono text-emerald-400">
                    {project.asset_created ? 'Active In Service' : 'Pending Handover'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <span className="text-[#AAA]">Public-Safe QR Token</span>
                  <span className="font-ibm-plex-mono text-[#FF6900] font-bold">{project.qr_token || 'Unassigned'}</span>
                </div>
                {project.warranty_start && (
                  <div className="flex justify-between items-center border-b border-[#222] pb-3">
                    <span className="text-[#AAA]">Warranty Period</span>
                    <span className="font-ibm-plex-mono text-white">
                      {project.warranty_start} to {project.warranty_end}
                    </span>
                  </div>
                )}

                {project.service_schedule && project.service_schedule.length > 0 && (
                  <div className="pt-2">
                    <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777] block mb-2">
                      Active PPM Schedule
                    </span>
                    <div className="space-y-2">
                      {project.service_schedule.map(item => (
                        <div key={item.id} className="p-3 bg-[#111] border border-[#222] flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{item.component}</p>
                            <p className="text-[10px] text-[#777]">{item.service_type}</p>
                          </div>
                          <div className="text-right font-ibm-plex-mono text-[10px]">
                            <span className="text-amber-400 block font-bold">Due: {item.next_due_date}</span>
                            <span className="text-[#666] uppercase">{item.status.replace('_', ' ')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
