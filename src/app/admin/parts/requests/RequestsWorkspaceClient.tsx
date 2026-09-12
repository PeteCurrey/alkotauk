'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Inbox, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  Layers, 
  FileText, 
  ExternalLink,
  Plus,
  Trash2,
  Save,
  Camera,
  BarChart3
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface PartRequestItem {
  id: string;
  customer_name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  postcode?: string | null;
  machine_model?: string | null;
  serial_number?: string | null;
  urgency: string;
  requested_parts: any[];
  photo_urls: string[];
  notes?: string | null;
  status: string;
  assigned_to?: string | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

interface RequestsWorkspaceProps {
  initialRequests: PartRequestItem[];
  analyticsData: {
    topQueries: { query: string; count: number }[];
    zeroResultQueries: { query: string; count: number }[];
    recentSearches: { query: string; results_count: number; created_at: string }[];
  };
}

export default function RequestsWorkspaceClient({
  initialRequests,
  analyticsData,
}: RequestsWorkspaceProps) {
  const [requests, setRequests] = useState<PartRequestItem[]>(initialRequests);
  const [selectedId, setSelectedId] = useState<string | null>(initialRequests[0]?.id || null);
  const [activeTab, setActiveTab] = useState<'requests' | 'analytics'>('requests');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Request detail states
  const selected = requests.find(r => r.id === selectedId) || null;
  const [statusVal, setStatusVal] = useState<string>(selected?.status || 'new');
  const [internalNotesVal, setInternalNotesVal] = useState<string>(selected?.internal_notes || '');
  const [saving, setSaving] = useState(false);

  // Catalogue Quick-Search within workspace
  const [partSearchQ, setPartSearchQ] = useState('');
  const [partSearchResults, setPartSearchResults] = useState<any[]>([]);
  const [searchingParts, setSearchingParts] = useState(false);

  // Update local states when selected request changes
  React.useEffect(() => {
    if (selected) {
      setStatusVal(selected.status || 'new');
      setInternalNotesVal(selected.internal_notes || '');
    }
  }, [selectedId]);

  async function handleStatusUpdate(newStatus: string) {
    if (!selected) return;
    setStatusVal(newStatus);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/parts/requests/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, internal_notes: internalNotesVal }),
      });
      if (res.ok) {
        const { request } = await res.json();
        setRequests(prev => prev.map(r => r.id === request.id ? request : r));
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveInternalNotes() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/parts/requests/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusVal, internal_notes: internalNotesVal }),
      });
      if (res.ok) {
        const { request } = await res.json();
        setRequests(prev => prev.map(r => r.id === request.id ? request : r));
        alert('Notes and status saved successfully.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleCatalogueSearch(q: string) {
    setPartSearchQ(q);
    if (!q.trim() || q.trim().length < 2) {
      setPartSearchResults([]);
      return;
    }
    setSearchingParts(true);
    try {
      const res = await fetch(`/api/parts/search?q=${encodeURIComponent(q.trim())}&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setPartSearchResults(data.parts || []);
      }
    } finally {
      setSearchingParts(false);
    }
  }

  async function handleAttachPart(part: any) {
    if (!selected) return;
    const currentParts = Array.isArray(selected.requested_parts) ? [...selected.requested_parts] : [];
    currentParts.push({
      part_id: part.id,
      part_number: part.part_number,
      name: part.name,
      price: part.price,
      superseded_by: part.superseded_by,
      attached_at: new Date().toISOString(),
    });

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/parts/requests/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requested_parts: currentParts, status: 'identified' }),
      });
      if (res.ok) {
        const { request } = await res.json();
        setRequests(prev => prev.map(r => r.id === request.id ? request : r));
        setStatusVal('identified');
      }
    } finally {
      setSaving(false);
    }
  }

  const filteredRequests = requests.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900]">Parts Catalogue</Link>
              <span>/</span>
              <span className="text-[#FF6900]">Part Identification Desk</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Workshop Triage & Part Identification Workspace ({requests.length})
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Review customer part requests, investigate machine model splits, attach verified parts, and generate quotes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'requests'
                  ? 'bg-[#111] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <Inbox className="w-4 h-4" />
              Triage Workspace
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-[#111] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Search Analytics
            </button>
          </div>
        </div>

        {/* Status Filters Strip */}
        {activeTab === 'requests' && (
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#F1F5F9] overflow-x-auto">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider shrink-0">Filter:</span>
            {[
              { id: 'all', label: 'All Requests' },
              { id: 'new', label: 'New' },
              { id: 'identifying', label: 'Investigating' },
              { id: 'need_more_info', label: 'Need More Info' },
              { id: 'identified', label: 'Identified' },
              { id: 'quoted', label: 'Quoted' },
              { id: 'resolved', label: 'Resolved' },
              { id: 'closed', label: 'Closed' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-[#FF6900] text-white font-bold'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {tab.label} ({requests.filter(r => tab.id === 'all' ? true : r.status === tab.id).length})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── WORKSPACE CONTENT ── */}
      {activeTab === 'requests' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── LEFT: REQUESTS LIST (5 COLS) ── */}
          <div className="lg:col-span-5 bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm divide-y divide-[#F1F5F9] max-h-[850px] overflow-y-auto">
            {filteredRequests.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#94A3B8]">
                No requests matching filter "{statusFilter}".
              </div>
            ) : (
              filteredRequests.map(req => {
                const isSelected = req.id === selectedId;
                return (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => setSelectedId(req.id)}
                    className={`w-full p-4 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FFF8F0] border-l-4 border-[#FF6900]'
                        : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[10px] text-[#64748B]">
                        PR-{req.id.slice(0, 8).toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          req.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          req.status === 'identified' ? 'bg-blue-100 text-blue-800' :
                          req.status === 'quoted' ? 'bg-purple-100 text-purple-800' :
                          req.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {req.status}
                        </span>
                        {req.photo_urls && req.photo_urls.length > 0 && (
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold flex items-center gap-0.5">
                            <Camera className="w-2.5 h-2.5" />
                            {req.photo_urls.length}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="font-bold text-xs text-[#0F172A] line-clamp-1">
                      {req.customer_name} {req.company ? `(${req.company})` : ''}
                    </div>

                    <div className="text-[11px] text-[#64748B] line-clamp-2 my-1">
                      {req.notes || 'No description provided.'}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#94A3B8] font-mono mt-1 pt-2 border-t border-[#F1F5F9]">
                      <span>Model: <strong className="text-[#475569]">{req.machine_model || 'Unknown'}</strong></span>
                      <span>{new Date(req.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* ── RIGHT: INSPECTOR & CATALOGUE MATCHER (7 COLS) ── */}
          <div className="lg:col-span-7 space-y-6">
            {selected ? (
              <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm space-y-6">
                {/* Reference & Customer Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
                  <div>
                    <span className="font-mono text-xs text-[#FF6900] font-bold">
                      PR-{selected.id.slice(0, 8).toUpperCase()}
                    </span>
                    <h2 className="text-lg font-bold text-[#0F172A] mt-0.5">
                      {selected.customer_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selected.email}</span>
                      {selected.phone && (
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selected.phone}</span>
                      )}
                      {selected.postcode && (
                        <span>Postcode: {selected.postcode}</span>
                      )}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-[#475569]">Status:</label>
                    <select
                      value={statusVal}
                      disabled={saving}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className="px-3 py-1.5 border border-[#CBD5E1] rounded-lg text-xs font-bold bg-[#F8FAFC] focus:outline-none focus:border-[#FF6900]"
                    >
                      <option value="new">New</option>
                      <option value="identifying">Investigating</option>
                      <option value="need_more_info">Need More Info</option>
                      <option value="identified">Identified</option>
                      <option value="quoted">Quoted</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Machine & Problem Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E4E8]">
                    <span className="text-[10px] uppercase font-mono text-[#64748B] font-bold block mb-1">
                      Machine Context
                    </span>
                    <div className="font-bold text-[#0F172A] text-sm">
                      {selected.machine_model || 'Model Not Specified'}
                    </div>
                    {selected.serial_number && (
                      <div className="text-[#64748B] font-mono mt-0.5">
                        Serial: {selected.serial_number}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E4E8]">
                    <span className="text-[10px] uppercase font-mono text-[#64748B] font-bold block mb-1">
                      Priority & Urgency
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-100 text-amber-800">
                      {selected.urgency}
                    </span>
                  </div>
                </div>

                {/* Customer Description */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                    Customer Problem Description & Diagnostic Attributes:
                  </label>
                  <div className="p-3.5 bg-[#FAF9F5] border border-[#E2E4E8] rounded-lg text-xs text-[#334155] leading-relaxed whitespace-pre-wrap">
                    {selected.notes || 'No extra notes submitted.'}
                  </div>
                </div>

                {/* Uploaded Photos Gallery */}
                {selected.photo_urls && selected.photo_urls.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#FF6900]" />
                      Uploaded Customer Photos ({selected.photo_urls.length}):
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {selected.photo_urls.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-24 h-24 rounded-lg overflow-hidden border border-[#CBD5E1] hover:border-[#FF6900] shadow-sm transition-all"
                        >
                          <img src={url} alt={`Evidence photo ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── ATTACHED / IDENTIFIED PARTS ── */}
                <div className="pt-4 border-t border-[#F1F5F9]">
                  <label className="block text-xs font-bold text-[#0F172A] mb-2">
                    Confirmed Identified Products:
                  </label>
                  {(!selected.requested_parts || selected.requested_parts.length === 0) ? (
                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E4E8] rounded-lg text-xs text-[#64748B] text-center">
                      No parts attached yet. Use the catalogue matcher below to attach confirmed products.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selected.requested_parts.map((p: any, idx: number) => (
                        <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-mono text-xs font-bold text-green-800">
                              {p.part_number}
                            </span>
                            <span className="text-green-950 font-medium ml-2">{p.name}</span>
                            {p.superseded_by && (
                              <span className="block text-[10px] text-amber-700 font-medium">
                                ⚠ Superseded by {p.superseded_by}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-[#0F172A]">
                              {p.price ? `£${Number(p.price).toFixed(2)}` : 'POA'}
                            </span>
                            <Link
                              href={`/parts-attachments/product/${p.part_number.toLowerCase()}`}
                              target="_blank"
                              className="text-green-700 hover:text-green-900"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── WORKSPACE CATALOGUE SEARCH & ATTACH ── */}
                <div className="pt-4 border-t border-[#F1F5F9] bg-[#FAF9F5] p-4 rounded-lg border border-[#E2E4E8]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF6900] font-bold block mb-1">
                    // Catalogue Search & Matcher
                  </span>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                    Search 2,560+ Parts & Spares to Attach:
                  </label>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                    <input
                      type="text"
                      value={partSearchQ}
                      onChange={(e) => handleCatalogueSearch(e.target.value)}
                      placeholder="Type part number, SKU, or keyword..."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded text-xs font-mono focus:outline-none focus:border-[#FF6900]"
                    />
                  </div>

                  {searchingParts && (
                    <div className="text-xs text-[#64748B] font-mono py-2">Searching...</div>
                  )}

                  {partSearchResults.length > 0 && (
                    <div className="divide-y divide-[#E2E4E8] bg-white border border-[#E2E4E8] rounded max-h-48 overflow-y-auto">
                      {partSearchResults.map((p) => (
                        <div key={p.id} className="p-2.5 flex items-center justify-between gap-3 text-xs hover:bg-[#F8FAFC]">
                          <div>
                            <span className="font-mono font-bold text-[#0F172A]">{p.part_number}</span>
                            <span className="text-[#64748B] ml-2 line-clamp-1">{p.name}</span>
                            <span className="font-mono text-[10px] text-[#94A3B8]">
                              {p.price ? `£${Number(p.price).toFixed(2)}` : 'POA'} · {p.in_stock ? 'In Stock' : 'Check Stock'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAttachPart(p)}
                            className="px-3 py-1 bg-[#111] hover:bg-[#FF6900] text-white text-[10px] font-mono uppercase font-bold rounded shrink-0 transition-colors"
                          >
                            Attach
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Internal Notes & Triage Log */}
                <div className="pt-4 border-t border-[#F1F5F9]">
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                    Internal Workshop Notes & Sourcing Log:
                  </label>
                  <textarea
                    rows={3}
                    value={internalNotesVal}
                    onChange={(e) => setInternalNotesVal(e.target.value)}
                    placeholder="Log technical notes, OEM manual page references, or customer call records..."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs focus:outline-none focus:border-[#FF6900]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleSaveInternalNotes}
                      className="px-4 py-1.5 bg-[#FF6900] hover:bg-black text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E2E4E8] rounded-xl p-12 text-center text-xs text-[#94A3B8]">
                Select a request from the list to begin technical identification.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── SEARCH ANALYTICS VIEW ── */
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Searched Queries */}
            <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                Most Searched Queries & Part Numbers
              </h3>
              <p className="text-xs text-[#64748B] mb-4">
                Feedback loop for catalogue data enrichment and popular spares.
              </p>
              <div className="divide-y divide-[#F1F5F9]">
                {analyticsData.topQueries.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#94A3B8]">No search queries recorded yet.</div>
                ) : (
                  analyticsData.topQueries.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-[#0F172A]">{item.query}</span>
                      <span className="font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">{item.count} searches</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Zero-Result Queries */}
            <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                Top Zero-Result Queries (Unmet Demand)
              </h3>
              <p className="text-xs text-[#64748B] mb-4">
                Searches that yielded 0 results — prime candidates for catalogue aliases and new supplier SKUs.
              </p>
              <div className="divide-y divide-[#F1F5F9]">
                {analyticsData.zeroResultQueries.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#94A3B8]">No zero-result searches recorded yet.</div>
                ) : (
                  analyticsData.zeroResultQueries.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-red-700">{item.query}</span>
                      <span className="font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.count} missed</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
