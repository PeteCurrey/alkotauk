'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Copy, CheckCircle, Calendar, User, Building2, Phone, Tag, FileText, ExternalLink } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'in-progress', 'quoted', 'won', 'lost', 'archived'];
const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900', 'in-progress': '#2563EB', quoted: '#7C3AED',
  won: '#16A34A', lost: '#DC2626', archived: '#9CA3AF',
  read: '#666', responded: '#3B82F6', closed: '#22C55E',
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={copy} className="ml-2 text-[#444] hover:text-[#FF6900] transition-colors">
      {copied ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function DetailRow({ label, value, copyable }: { label: string; value?: string | null; copyable?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-[#1A1A1A]">
      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] w-28 shrink-0 mt-0.5">{label}</span>
      <span className="font-inter text-[13px] text-white flex-1">{value}</span>
      {copyable && <CopyButton value={value} />}
    </div>
  );
}

export default function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    params.then(({ id: pid }) => {
      setId(pid);
      fetch(`/api/admin/enquiries/${pid}`)
        .then(r => r.json())
        .then(data => {
          setEnquiry(data);
          setStatus(data.status || 'new');
          setAssignedTo(data.assigned_to || '');
          setFollowUpDate(data.follow_up_date || '');
          setNotes(data.admin_notes || '');
          setLoading(false);
        });
    });
  }, [params]);

  const saveStatus = async (newStatus: string) => {
    setStatus(newStatus);
    await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const saveNotes = async () => {
    setSaving(true);
    await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_notes: notes, assigned_to: assignedTo, follow_up_date: followUpDate || null }),
    });
    setSaving(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">Loading enquiry...</div>;
  }

  if (!enquiry || enquiry.error) {
    return <div className="font-ibm-plex-mono text-[10px] text-red-400 uppercase tracking-widest">Enquiry not found</div>;
  }

  const name = enquiry.name || `${enquiry.first_name || ''} ${enquiry.last_name || ''}`.trim() || 'Unknown';
  const mailtoSubject = `Re: Your Alkota UK Enquiry — ${enquiry.reference || enquiry.id?.slice(0, 8)}`;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/enquiries" className="text-[#555] hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div className="flex-1">
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">{name}</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {enquiry.reference || enquiry.id?.slice(0, 8)} · {new Date(enquiry.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className="px-3 py-1 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest"
          style={{ background: `${STATUS_COLOURS[status]}20`, color: STATUS_COLOURS[status], border: `1px solid ${STATUS_COLOURS[status]}60` }}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <div className="border border-[#222] bg-[#0D0D0D] p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-[#FF6900]" />
              <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#FF6900]">Contact</p>
            </div>
            <DetailRow label="Name" value={name} copyable />
            <DetailRow label="Company" value={enquiry.company} copyable />
            <DetailRow label="Job Title" value={enquiry.job_title} />
            <DetailRow label="Email" value={enquiry.email} copyable />
            <DetailRow label="Phone" value={enquiry.phone} copyable />
          </div>

          {/* Enquiry Details */}
          <div className="border border-[#222] bg-[#0D0D0D] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-[#FF6900]" />
              <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#FF6900]">Enquiry Details</p>
            </div>
            <DetailRow label="Type" value={enquiry.type} />
            <DetailRow label="Product" value={enquiry.product_name} />
            <DetailRow label="Industry" value={enquiry.industry} />
            <DetailRow label="Quantity" value={enquiry.quantity?.toString()} />
            <DetailRow label="Budget" value={enquiry.budget_range} />
            <DetailRow label="Timeline" value={enquiry.timeline} />
            {enquiry.message && (
              <div className="mt-4 pt-4 border-t border-[#1A1A1A]">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-2">Message</p>
                <p className="font-inter text-[13px] text-[#aaa] leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
              </div>
            )}
          </div>

          {/* Machine Engineering Consultation Dossier */}
          {(enquiry.metadata?.machines?.length > 0 || enquiry.metadata?.revalidation_result) && (
            <div className="border border-[#FF6900]/50 bg-[#0D0D0D] p-6 space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2 py-0.5 uppercase font-bold tracking-wider">
                    {enquiry.metadata.machine_source === 'machine_selector' ? 'HELP ME CHOOSE SHORTLIST' :
                     enquiry.metadata.machine_source === 'machine_comparison' ? 'FLEET COMPARISON MATRIX' :
                     'MACHINE QUOTATION'}
                  </span>
                  <p className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white">
                    Engineering Consultation Dossier
                  </p>
                </div>

                {enquiry.metadata.revalidation_result && (
                  <span className={`font-ibm-plex-mono text-[9px] uppercase px-2 py-0.5 border ${
                    enquiry.metadata.revalidation_result.discrepancy_detected
                      ? 'bg-red-950/40 text-red-400 border-red-500/40'
                      : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {enquiry.metadata.revalidation_result.discrepancy_detected
                      ? '● CLIENT DISCREPANCY DETECTED'
                      : '✓ SERVER REVALIDATED'}
                  </span>
                )}
              </div>

              {/* Machine Cards */}
              {enquiry.metadata.machines && enquiry.metadata.machines.length > 0 && (
                <div>
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-3">
                    Evaluated Machinery ({enquiry.metadata.machines.length} Model{enquiry.metadata.machines.length > 1 ? 's' : ''}):
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {enquiry.metadata.machines.map((m: any, idx: number) => (
                      <div key={idx} className="bg-[#111] p-4 border border-[#222] space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-ibm-plex-mono text-sm font-bold text-[#FF6900]">
                              {m.model_code}
                            </span>
                            <p className="text-white text-xs font-semibold">{m.name}</p>
                            <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase">{m.category}</span>
                          </div>
                          {m.slug && (
                            <Link
                              href={`/machines/${m.category || 'all'}/${m.slug}`}
                              target="_blank"
                              className="text-[#666] hover:text-[#FF6900] transition-colors p-1"
                              title="View full specification sheet"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>

                        {/* Specs grid */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-b border-[#1A1A1A] py-2">
                          <div>
                            <span className="text-[#555] block">Pressure:</span>
                            <span className="text-white font-bold">{m.pressure_bar ? `${m.pressure_bar} BAR` : '—'}</span>
                          </div>
                          <div>
                            <span className="text-[#555] block">Flow Rate:</span>
                            <span className="text-white font-bold">{m.flow_rate_lpm ? `${m.flow_rate_lpm} LPM` : '—'}</span>
                          </div>
                          <div>
                            <span className="text-[#555] block">Power:</span>
                            <span className="text-[#AAA]">{m.power_source || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[#555] block">Heating:</span>
                            <span className="text-[#FF6900]">{m.heating_fuel || 'Cold / Ambient'}</span>
                          </div>
                          {m.voltage && (
                            <div className="col-span-2">
                              <span className="text-[#555] block">Electrical:</span>
                              <span className="text-[#AAA]">{m.voltage}{m.phase ? ` (${m.phase}-Phase)` : ''}</span>
                            </div>
                          )}
                        </div>

                        {/* Match status */}
                        {m.server_match_status && (
                          <div className="flex items-center justify-between text-[9px] font-mono">
                            <span className="text-[#666] uppercase">Server Status:</span>
                            <span className={`px-2 py-0.5 font-bold uppercase ${
                              m.server_match_status === 'STRONG_MATCH' ? 'text-emerald-400 bg-emerald-950/30' :
                              m.server_match_status === 'POSSIBLE_MATCH' ? 'text-amber-400 bg-amber-950/30' :
                              'text-red-400 bg-red-950/30'
                            }`}>
                              {m.server_match_status}
                            </span>
                          </div>
                        )}

                        {m.reasons && m.reasons.length > 0 && (
                          <div className="text-[10px] text-[#888] space-y-0.5">
                            <span className="text-[#555] font-mono text-[9px] uppercase block">Verified Capabilities:</span>
                            {m.reasons.slice(0, 3).map((r: string, rIdx: number) => (
                              <p key={rIdx} className="leading-tight">• {r}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stated Requirements Breakdown */}
              {(enquiry.metadata.requirements_summary || enquiry.metadata.structured_requirements) && (
                <div className="border-t border-[#222] pt-4">
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">
                    Customer's Stated Requirements:
                  </p>
                  {enquiry.metadata.requirements_summary ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#AAA] font-mono">
                      {enquiry.metadata.requirements_summary.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5 bg-[#141414] p-1.5 border border-[#1F1F1F]">
                          <span className="text-[#FF6900]">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}

              {/* Site Readiness (Power, Water, Postcode) */}
              {(enquiry.metadata.site_power || enquiry.metadata.site_water || enquiry.metadata.postcode) && (
                <div className="border-t border-[#222] pt-4 grid grid-cols-3 gap-3 text-xs font-mono">
                  {enquiry.metadata.site_power && (
                    <div className="bg-[#111] p-3 border border-[#222]">
                      <span className="text-[#666] text-[9px] uppercase block">Site Power</span>
                      <span className="text-white font-bold">{enquiry.metadata.site_power}</span>
                    </div>
                  )}
                  {enquiry.metadata.site_water && (
                    <div className="bg-[#111] p-3 border border-[#222]">
                      <span className="text-[#666] text-[9px] uppercase block">Water Supply</span>
                      <span className="text-white font-bold">{enquiry.metadata.site_water}</span>
                    </div>
                  )}
                  {enquiry.metadata.postcode && (
                    <div className="bg-[#111] p-3 border border-[#222]">
                      <span className="text-[#666] text-[9px] uppercase block">Site Postcode</span>
                      <span className="text-[#FF6900] font-bold">{enquiry.metadata.postcode}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Sales Engineer Checklist (Confirmation Items) */}
              {enquiry.metadata.confirmation_items && enquiry.metadata.confirmation_items.length > 0 && (
                <div className="bg-amber-950/20 border border-amber-500/30 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold text-xs">⚠</span>
                    <p className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-wider text-amber-400">
                      Sales Engineer Pre-Quotation Checklist
                    </p>
                  </div>
                  <ul className="space-y-1 text-xs font-mono text-amber-200/90 pl-4 list-disc">
                    {enquiry.metadata.confirmation_items.map((item: string, idx: number) => (
                      <li key={idx} className="leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Trailer Rig Build Metadata */}
          {enquiry.metadata?.build_code && (
            <div className="border border-[#FF6900]/40 bg-[#0D0D0D] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2 py-0.5 uppercase font-bold">
                    {enquiry.metadata.build_code}
                  </span>
                  <p className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-[#FF6900]">
                    Configured Trailer Specification
                  </p>
                </div>
                <Link
                  href={`/trailers/build/${enquiry.metadata.build_code}`}
                  target="_blank"
                  className="font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline uppercase tracking-widest"
                >
                  View Public Build Sheet →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Format</span>
                  <span className="text-white uppercase font-bold">{enquiry.metadata.format}</span>
                </div>
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Chassis</span>
                  <span className="text-white">{enquiry.metadata.chassis_id}</span>
                </div>
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Machine</span>
                  <span className="text-[#FF6900]">{enquiry.metadata.machine_id}</span>
                </div>
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Water Storage</span>
                  <span className="text-white">{enquiry.metadata.water_storage_id}</span>
                </div>
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Recovery System</span>
                  <span className="text-white">{enquiry.metadata.recovery_option_id}</span>
                </div>
                <div className="bg-[#111] p-3 border border-[#222]">
                  <span className="text-[#666] text-[9px] uppercase block">Operators</span>
                  <span className="text-white">{enquiry.metadata.operator_count} Operator(s)</span>
                </div>
              </div>

              {enquiry.metadata.weights && (
                <div className="border-t border-[#222] pt-3 grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#080808] p-2">
                    <span className="text-[8px] text-[#555] block uppercase">Est. Dry</span>
                    <span className="text-white font-bold">{enquiry.metadata.weights.estimated_dry_weight_kg}kg</span>
                  </div>
                  <div className="bg-[#080808] p-2">
                    <span className="text-[8px] text-[#555] block uppercase">Est. Wet</span>
                    <span className="text-[#FF6900] font-bold">{enquiry.metadata.weights.estimated_wet_weight_kg}kg</span>
                  </div>
                  <div className="bg-[#080808] p-2">
                    <span className="text-[8px] text-[#555] block uppercase">MAM Limit</span>
                    <span className="text-white font-bold">{enquiry.metadata.weights.chassis_mam_kg}kg</span>
                  </div>
                  <div className="bg-[#080808] p-2">
                    <span className="text-[8px] text-[#555] block uppercase">Margin</span>
                    <span className={enquiry.metadata.weights.is_overweight ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                      {enquiry.metadata.weights.payload_margin_kg}kg
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Source Tracking */}
          {(enquiry.source_page || enquiry.utm_source) && (
            <div className="border border-[#222] bg-[#0D0D0D] p-6">
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink className="h-4 w-4 text-[#555]" />
                <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#555]">Source Tracking</p>
              </div>
              <DetailRow label="Source Page" value={enquiry.source_page} />
              <DetailRow label="UTM Source" value={enquiry.utm_source} />
              <DetailRow label="UTM Medium" value={enquiry.utm_medium} />
              <DetailRow label="UTM Campaign" value={enquiry.utm_campaign} />
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar / CRM Controls */}
        <div className="space-y-4">
          {/* Status */}
          <div className="border border-[#222] bg-[#0D0D0D] p-5">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#444] mb-3">Status</p>
            <div className="space-y-1.5">
              {STATUS_OPTIONS.map(s => (
                <button key={s} onClick={() => saveStatus(s)}
                  className="w-full text-left px-3 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all border"
                  style={{
                    background: status === s ? `${STATUS_COLOURS[s]}15` : 'transparent',
                    color: status === s ? STATUS_COLOURS[s] : '#555',
                    borderColor: status === s ? `${STATUS_COLOURS[s]}50` : '#1F1F1F',
                  }}>
                  {status === s && '● '}{s}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="border border-[#222] bg-[#0D0D0D] p-5">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#444] mb-3">Assignment</p>
            <div className="space-y-3">
              <div>
                <label className="block font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] mb-1.5">Assigned To</label>
                <input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} onBlur={saveNotes}
                  placeholder="e.g. Pete Currey"
                  className="w-full bg-[#111] border border-[#2A2A2A] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
              </div>
              <div>
                <label className="block font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] mb-1.5">Follow Up Date</label>
                <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} onBlur={saveNotes}
                  className="w-full bg-[#111] border border-[#2A2A2A] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="border border-[#222] bg-[#0D0D0D] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#444]">Admin Notes</p>
              {notesSaved && <span className="font-ibm-plex-mono text-[8px] text-green-500 uppercase">Saved ✓</span>}
            </div>
            <textarea rows={6} value={notes} onChange={e => setNotes(e.target.value)} onBlur={saveNotes}
              placeholder="Internal notes, follow-up actions..."
              className="w-full bg-[#111] border border-[#2A2A2A] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900] resize-none" />
          </div>

          {/* Quick Actions */}
          <div className="border border-[#222] bg-[#0D0D0D] p-5">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-widest text-[#444] mb-3">Quick Actions</p>
            <div className="space-y-2">
              <a href={`mailto:${enquiry.email}?subject=${encodeURIComponent(mailtoSubject)}`}
                className="flex items-center gap-2 w-full px-3 py-2.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#FF6900] transition-all">
                <Mail className="h-3.5 w-3.5" /> Reply via Email
              </a>
              <button onClick={() => saveStatus('won')}
                className="flex items-center gap-2 w-full px-3 py-2.5 border border-green-900/50 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-green-500 hover:bg-green-950/30 transition-all">
                <CheckCircle className="h-3.5 w-3.5" /> Mark as Won
              </button>
              <button onClick={() => saveStatus('archived')}
                className="flex items-center gap-2 w-full px-3 py-2.5 border border-[#222] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] hover:text-[#888] transition-all">
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
