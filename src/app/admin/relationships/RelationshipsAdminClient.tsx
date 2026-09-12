'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Filter, ShieldCheck, ChevronDown,
  AlertTriangle, CheckCircle2, Eye, EyeOff, Layers, Wrench, Droplets, Sliders
} from 'lucide-react';
import {
  RelationshipDomain, RelationshipStatus, RelationshipConfidence,
  CompatibilityType, GeneralRelationshipType
} from '@/lib/relationships/types';

const COMPATIBILITY_TYPES: { value: CompatibilityType; label: string }[] = [
  { value: 'MACHINE_PART', label: 'Machine → Part (Direct Fitment)' },
  { value: 'MACHINE_ATTACHMENT', label: 'Machine → Attachment (Operating Envelope)' },
  { value: 'MACHINE_CHEMICAL', label: 'Machine → Chemical (Approved Formulation)' },
  { value: 'MACHINE_ACCESSORY', label: 'Machine → Accessory (Factory Specification)' },
  { value: 'MACHINE_DOCUMENT', label: 'Machine → Document (Technical)' },
  { value: 'PART_MACHINE', label: 'Part → Machine (Reverse Fitment)' },
  { value: 'ATTACHMENT_MACHINE', label: 'Attachment → Machine (Reverse)' },
  { value: 'CHEMICAL_MACHINE', label: 'Chemical → Machine (Reverse)' },
  { value: 'SERVICE_KIT_MACHINE', label: 'Service Kit → Machine' },
];

const GENERAL_TYPES: { value: GeneralRelationshipType; label: string; group: string }[] = [
  // Discovery
  { value: 'RELATED_PRODUCT', label: 'Related Product', group: 'Discovery' },
  { value: 'SIMILAR_PRODUCT', label: 'Similar Product', group: 'Discovery' },
  { value: 'ALTERNATIVE_PRODUCT', label: 'Alternative Product', group: 'Discovery' },
  { value: 'RECOMMENDED_PRODUCT', label: 'Recommended Product', group: 'Discovery' },
  { value: 'RECOMMENDED_ALONGSIDE', label: 'Recommended Alongside', group: 'Discovery' },
  // Commercial
  { value: 'CROSS_SELL', label: 'Cross-Sell', group: 'Commercial' },
  { value: 'UPSELL', label: 'Upsell', group: 'Commercial' },
  { value: 'BUNDLE_COMPONENT', label: 'Bundle Component', group: 'Commercial' },
  { value: 'FREQUENTLY_PURCHASED_WITH', label: 'Frequently Purchased With', group: 'Commercial' },
  // Lifecycle
  { value: 'REPLACEMENT_FOR', label: 'Replacement For', group: 'Lifecycle' },
  { value: 'REPLACED_BY', label: 'Replaced By', group: 'Lifecycle' },
  { value: 'SUCCESSOR_TO', label: 'Successor To', group: 'Lifecycle' },
  { value: 'PREDECESSOR_TO', label: 'Predecessor To', group: 'Lifecycle' },
  { value: 'UPGRADE_FROM', label: 'Upgrade From', group: 'Lifecycle' },
  { value: 'UPGRADE_TO', label: 'Upgrade To', group: 'Lifecycle' },
  // Family
  { value: 'SAME_PRODUCT_FAMILY', label: 'Same Product Family', group: 'Family' },
  { value: 'SAME_SERIES', label: 'Same Series', group: 'Family' },
  { value: 'SAME_MANUFACTURER', label: 'Same Manufacturer', group: 'Family' },
  { value: 'SAME_APPLICATION', label: 'Same Application', group: 'Family' },
  // Supporting
  { value: 'RELATED_ACCESSORY', label: 'Related Accessory', group: 'Supporting' },
  { value: 'RELATED_SPARE', label: 'Related Spare', group: 'Supporting' },
  { value: 'RELATED_CONSUMABLE', label: 'Related Consumable', group: 'Supporting' },
  { value: 'RELATED_CHEMICAL', label: 'Related Chemical', group: 'Supporting' },
  { value: 'RELATED_DOCUMENT', label: 'Related Document', group: 'Supporting' },
  { value: 'RELATED_SERVICE_ITEM', label: 'Related Service Item', group: 'Supporting' },
];

const CONFIDENCE_LABELS: Record<RelationshipConfidence, { label: string; colour: string }> = {
  VERIFIED:                 { label: 'Verified',                 colour: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  MANUFACTURER_SUPPORTED:   { label: 'Manufacturer Supported',   colour: 'text-blue-700 bg-blue-50 border-blue-200' },
  UK_ENGINEERING_VERIFIED:  { label: 'UK Engineering Verified',  colour: 'text-purple-700 bg-purple-50 border-purple-200' },
  REVIEW_REQUIRED:          { label: '⚠ Review Required',        colour: 'text-amber-700 bg-amber-50 border-amber-200' },
  NOT_COMPATIBLE:           { label: '✕ Not Compatible',         colour: 'text-red-700 bg-red-50 border-red-200' },
};

const STATUS_COLOURS: Record<RelationshipStatus, string> = {
  draft:    'text-slate-600 bg-slate-50 border-slate-200',
  review:   'text-amber-700 bg-amber-50 border-amber-200',
  verified: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  published: 'text-green-700 bg-green-50 border-green-200',
  rejected: 'text-red-700 bg-red-50 border-red-200',
  archived: 'text-slate-400 bg-slate-50 border-slate-200',
};

interface Relationship {
  id: string;
  source_id: string;
  source_type: string;
  target_id: string;
  target_type: string;
  relationship_domain: RelationshipDomain;
  relationship_type: string;
  status: RelationshipStatus;
  confidence: RelationshipConfidence;
  evidence?: string;
  source_document?: string;
  verified_by?: string;
  notes?: string;
  active: boolean;
  created_at?: string;
}

export default function RelationshipsAdminClient({ initialData }: { initialData: Relationship[] }) {
  const [data, setData] = useState<Relationship[]>(initialData);
  const [filterDomain, setFilterDomain] = useState<RelationshipDomain | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<RelationshipStatus | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQ, setSearchQ] = useState('');
  const [showForm, setShowForm] = useState(false);

  // ── NEW RELATIONSHIP FORM STATE ──
  const [form, setForm] = useState({
    source_id: '',
    source_type: 'machine',
    target_id: '',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY' as RelationshipDomain,
    relationship_type: 'MACHINE_PART',
    status: 'draft' as RelationshipStatus,
    confidence: 'VERIFIED' as RelationshipConfidence,
    evidence: '',
    source_url: '',
    source_document: '',
    verified_by: '',
    notes: '',
    active: true,
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const filteredData = data.filter(r => {
    if (filterDomain !== 'ALL' && r.relationship_domain !== filterDomain) return false;
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (filterType !== 'ALL' && r.relationship_type !== filterType) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return r.source_id.toLowerCase().includes(q) || r.target_id.toLowerCase().includes(q) || r.notes?.toLowerCase().includes(q);
    }
    return true;
  });

  const compatCount = data.filter(r => r.relationship_domain === 'COMPATIBILITY').length;
  const generalCount = data.filter(r => r.relationship_domain === 'GENERAL').length;
  const reviewCount = data.filter(r => r.confidence === 'REVIEW_REQUIRED' || r.status === 'review').length;
  const unpublishedCount = data.filter(r => r.status !== 'published' && r.status !== 'archived').length;

  async function saveRelationship() {
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/admin/relationships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setSaveError(d.error || 'Save failed');
      } else {
        const newRel = await res.json();
        setData(prev => [newRel, ...prev]);
        setShowForm(false);
        setForm(f => ({ ...f, source_id: '', target_id: '', evidence: '', notes: '', source_document: '' }));
      }
    } catch (e) {
      setSaveError('Network error — could not save relationship');
    }
    setSaving(false);
  }

  const inputClass = "w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-lg text-[#0F172A] px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6900] transition-colors";
  const labelClass = "block font-mono text-[9px] uppercase tracking-wider text-[#64748B] mb-1";

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin" className="hover:text-[#FF6900]">Admin</Link>
              <span>/</span>
              <span className="text-[#FF6900]">Product Relationships</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Product Relationship Studio
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-2xl">
              Manages <strong>two explicitly separate domains</strong>: engineering compatibility (what physically works with what) and general product relationships (commercial, discovery, and lifecycle links). These must never be conflated.
            </p>
          </div>
          <button
            onClick={() => setShowForm(s => !s)}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors rounded-lg"
          >
            <Plus className="h-4 w-4" />
            New Relationship
          </button>
        </div>

        {/* Domain Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            <ShieldCheck className="h-4 w-4 text-emerald-600 mb-1" />
            <div className="font-mono text-lg font-bold text-emerald-800">{compatCount}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-600">Compatibility</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <Sliders className="h-4 w-4 text-blue-600 mb-1" />
            <div className="font-mono text-lg font-bold text-blue-800">{generalCount}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-blue-600">General</div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 mb-1" />
            <div className="font-mono text-lg font-bold text-amber-800">{reviewCount}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-amber-600">Needs Review</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <EyeOff className="h-4 w-4 text-slate-500 mb-1" />
            <div className="font-mono text-lg font-bold text-slate-700">{unpublishedCount}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Unpublished</div>
          </div>
        </div>

        {/* Domain Separation Warning */}
        <div className="mt-4 flex items-start gap-3 bg-[#FFF8F0] border border-[#FFD9B3] rounded-lg p-4">
          <AlertTriangle className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-[10px] font-bold text-[#FF6900] uppercase tracking-wider">Engineering Integrity Safeguard</p>
            <p className="text-xs text-[#7A4B00] mt-0.5">
              <strong>COMPATIBILITY</strong> relationships are only ever shown to the public if status = <code>published</code> and confidence is <code>VERIFIED</code>, <code>MANUFACTURER_SUPPORTED</code>, or <code>UK_ENGINEERING_VERIFIED</code>.
              {' '}<strong>REVIEW_REQUIRED</strong> and <strong>NOT_COMPATIBLE</strong> are never publicly visible.
              General relationships are purely commercial/discovery — they do not imply compatibility.
            </p>
          </div>
        </div>
      </div>

      {/* ── NEW RELATIONSHIP FORM ── */}
      {showForm && (
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#0F172A] mb-5">New Product Relationship</h2>

          {saveError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg">
              {saveError}
            </div>
          )}

          {/* Domain Selection — First, Most Important */}
          <div className="mb-6">
            <label className={labelClass}>Relationship Domain *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, relationship_domain: 'COMPATIBILITY', relationship_type: 'MACHINE_PART', confidence: 'VERIFIED' }))}
                className={`flex items-start gap-3 p-4 border rounded-lg text-left transition-all ${form.relationship_domain === 'COMPATIBILITY' ? 'border-emerald-500 bg-emerald-50' : 'border-[#E2E4E8] hover:border-slate-300 bg-white'}`}
              >
                <ShieldCheck className={`h-5 w-5 mt-0.5 shrink-0 ${form.relationship_domain === 'COMPATIBILITY' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <span className="font-bold text-sm block text-[#0F172A]">Compatibility</span>
                  <span className="text-xs text-[#64748B]">Engineering claim: verified fitment, operating envelope. Requires evidence.</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, relationship_domain: 'GENERAL', relationship_type: 'RELATED_PRODUCT', confidence: 'VERIFIED' }))}
                className={`flex items-start gap-3 p-4 border rounded-lg text-left transition-all ${form.relationship_domain === 'GENERAL' ? 'border-blue-500 bg-blue-50' : 'border-[#E2E4E8] hover:border-slate-300 bg-white'}`}
              >
                <Sliders className={`h-5 w-5 mt-0.5 shrink-0 ${form.relationship_domain === 'GENERAL' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <span className="font-bold text-sm block text-[#0F172A]">General Relationship</span>
                  <span className="text-xs text-[#64748B]">Commercial or discovery link: alternatives, recommendations, lifecycle, family. Does NOT imply compatibility.</span>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Source & Target */}
            <div>
              <label className={labelClass}>Source Product ID / Slug *</label>
              <input value={form.source_id} onChange={e => setForm(f => ({ ...f, source_id: e.target.value }))} placeholder="e.g. alkota-420x4" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Source Product Type *</label>
              <select value={form.source_type} onChange={e => setForm(f => ({ ...f, source_type: e.target.value }))} className={inputClass}>
                {['machine', 'part', 'attachment', 'chemical', 'accessory', 'document', 'other'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Target Product ID / Slug *</label>
              <input value={form.target_id} onChange={e => setForm(f => ({ ...f, target_id: e.target.value }))} placeholder="e.g. general-pump-ts2021" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Target Product Type *</label>
              <select value={form.target_type} onChange={e => setForm(f => ({ ...f, target_type: e.target.value }))} className={inputClass}>
                {['machine', 'part', 'attachment', 'chemical', 'accessory', 'document', 'other'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Relationship Type — domain-aware */}
            <div className="md:col-span-2">
              <label className={labelClass}>Relationship Type *</label>
              {form.relationship_domain === 'COMPATIBILITY' ? (
                <select value={form.relationship_type} onChange={e => setForm(f => ({ ...f, relationship_type: e.target.value }))} className={inputClass}>
                  {COMPATIBILITY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              ) : (
                <select value={form.relationship_type} onChange={e => setForm(f => ({ ...f, relationship_type: e.target.value }))} className={inputClass}>
                  {['Discovery', 'Commercial', 'Lifecycle', 'Family', 'Supporting'].map(group => (
                    <optgroup key={group} label={group}>
                      {GENERAL_TYPES.filter(t => t.group === group).map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
            </div>

            {/* Compatibility-specific fields */}
            {form.relationship_domain === 'COMPATIBILITY' && (
              <>
                <div>
                  <label className={labelClass}>Confidence Level *</label>
                  <select value={form.confidence} onChange={e => setForm(f => ({ ...f, confidence: e.target.value as RelationshipConfidence }))} className={inputClass}>
                    <option value="VERIFIED">Verified (OEM Factory)</option>
                    <option value="MANUFACTURER_SUPPORTED">Manufacturer Supported</option>
                    <option value="UK_ENGINEERING_VERIFIED">UK Engineering Verified</option>
                    <option value="REVIEW_REQUIRED">Review Required (NOT published)</option>
                    <option value="NOT_COMPATIBLE">Not Compatible (internal record only)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Verified By</label>
                  <input value={form.verified_by} onChange={e => setForm(f => ({ ...f, verified_by: e.target.value }))} placeholder="e.g. Alkota UK Lead Engineer" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Evidence / Fitment Proof *</label>
                  <textarea value={form.evidence} onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))} rows={3} placeholder="Cite exact reference: manual title, section, specification rating, part drawing reference..." className={inputClass + ' resize-y'} />
                </div>
                <div>
                  <label className={labelClass}>Source Document Title</label>
                  <input value={form.source_document} onChange={e => setForm(f => ({ ...f, source_document: e.target.value }))} placeholder="e.g. Alkota X4 Series Technical Manual" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Source URL</label>
                  <input value={form.source_url} onChange={e => setForm(f => ({ ...f, source_url: e.target.value }))} placeholder="https://..." className={inputClass} />
                </div>
              </>
            )}

            {/* Status & Notes (both domains) */}
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as RelationshipStatus }))} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
                <option value="verified">Verified</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>{form.relationship_domain === 'COMPATIBILITY' ? 'Engineering Notes' : 'Editorial Notes / Reason'}</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} placeholder={form.relationship_domain === 'COMPATIBILITY' ? 'Technical restrictions, serial number ranges, adaptation notes...' : 'Why these products are linked, editorial context...'} className={inputClass + ' resize-y'} />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#E2E4E8]">
            <button
              onClick={saveRelationship}
              disabled={saving || !form.source_id || !form.target_id}
              className="px-6 py-2.5 bg-[#FF6900] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50 rounded-lg transition-colors"
            >
              {saving ? 'Saving…' : 'Save Relationship'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 border border-[#E2E4E8] text-[#64748B] font-mono text-xs uppercase tracking-widest hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              Cancel
            </button>
            {form.relationship_domain === 'COMPATIBILITY' && (
              <span className="text-xs text-amber-700 ml-auto">
                ⚠ Compatibility relationships will only go live if status = Published and confidence is Verified, Manufacturer Supported, or UK Engineering Verified.
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── FILTERS ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
        <Filter className="h-4 w-4 text-[#94A3B8] shrink-0" />

        <select value={filterDomain} onChange={e => setFilterDomain(e.target.value as any)} className="text-xs border border-[#E2E4E8] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#FF6900]">
          <option value="ALL">All Domains</option>
          <option value="COMPATIBILITY">Compatibility Only</option>
          <option value="GENERAL">General Only</option>
        </select>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="text-xs border border-[#E2E4E8] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#FF6900]">
          <option value="ALL">All Statuses</option>
          {(['draft', 'review', 'verified', 'published', 'rejected', 'archived'] as RelationshipStatus[]).map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Search by source/target ID or notes…"
          className="flex-1 min-w-[200px] text-xs border border-[#E2E4E8] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
        />

        <span className="ml-auto font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
          {filteredData.length} / {data.length} relationships
        </span>
      </div>

      {/* ── RELATIONSHIPS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Domain</th>
              <th className="py-3.5 px-4">Source → Target</th>
              <th className="py-3.5 px-4">Relationship Type</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Confidence</th>
              <th className="py-3.5 px-4">Public Visible</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-xs text-[#94A3B8] font-mono uppercase tracking-wider">
                  No relationships found matching filters
                </td>
              </tr>
            ) : filteredData.map(r => {
              const isCompatibility = r.relationship_domain === 'COMPATIBILITY';
              const isPubliclyVisible = r.status === 'published' && r.active && (
                !isCompatibility || ['VERIFIED', 'MANUFACTURER_SUPPORTED', 'UK_ENGINEERING_VERIFIED'].includes(r.confidence)
              );
              const domainConf = isCompatibility ? CONFIDENCE_LABELS[r.confidence] : null;

              return (
                <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${isCompatibility ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                      {isCompatibility ? <ShieldCheck className="h-3 w-3" /> : <Sliders className="h-3 w-3" />}
                      {r.relationship_domain}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-mono text-[#0F172A] font-semibold">{r.source_id}</span>
                      <span className="text-[#94A3B8] mx-1.5">→</span>
                      <span className="font-mono text-[#0F172A]">{r.target_id}</span>
                    </div>
                    <div className="text-[#94A3B8] text-[10px] mt-0.5">
                      {r.source_type} → {r.target_type}
                    </div>
                    {r.evidence && (
                      <div className="text-[10px] text-[#64748B] mt-1 truncate max-w-[280px]" title={r.evidence}>
                        📄 {r.evidence.substring(0, 60)}…
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-[#475569]">
                    {r.relationship_type.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${STATUS_COLOURS[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {isCompatibility && domainConf ? (
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${domainConf.colour}`}>
                        {domainConf.label}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8] text-[10px]">N/A (General)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {isPubliclyVisible ? (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Eye className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold">Live</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#94A3B8]">
                        <EyeOff className="h-3.5 w-3.5" />
                        <span className="text-[10px]">Hidden</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[10px] text-[#94A3B8] font-mono">{r.id.substring(0, 8)}…</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
