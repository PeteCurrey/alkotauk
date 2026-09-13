'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

const SOURCES = ['all', 'MACHINE_DETAIL', 'MACHINE_SELECTOR', 'MACHINE_COMPARISON', 'GENERAL', 'PARTS', 'CHEMICALS'];
const STATUSES = ['all', 'new', 'acknowledged', 'contacted', 'qualifying', 'quoting', 'won', 'lost', 'closed'];

const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900',
  acknowledged: '#F59E0B',
  contacted: '#3B82F6',
  qualifying: '#8B5CF6',
  quoting: '#EC4899',
  won: '#22C55E',
  lost: '#EF4444',
  closed: '#6B7280',
  read: '#666',
  responded: '#3B82F6',
  'in-progress': '#8B5CF6',
  archived: '#666',
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [status, setStatus] = useState('all');
  const [source, setSource] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (source !== 'all') params.set('source', source);
    if (search) params.set('search', search);
    setLoading(true);
    fetch(`/api/admin/enquiries?${params}`)
      .then((r) => r.json())
      .then((data) => { setEnquiries(Array.isArray(data) ? data : []); setLoading(false); });
  }, [status, source, search]);

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Commercial Enquiries</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Inbound customer & equipment enquiries</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Status filter */}
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-2.5 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
              style={{
                background: status === s ? '#FF6900' : '#1A1A1A',
                color: status === s ? '#fff' : '#666',
                border: '1px solid',
                borderColor: status === s ? '#FF6900' : '#222',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Source select */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="bg-[#1A1A1A] border border-[#222] text-[#888] px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase"
        >
          {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Search */}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#444]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, reference..."
            className="bg-[#1A1A1A] border border-[#222] text-white pl-9 pr-4 py-1.5 font-inter text-[13px] w-72 focus:outline-none focus:border-[#FF6900]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full text-sm min-w-[950px]">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Reference / Fleet', 'Source / Outcome', 'Customer', 'Company', 'Email', 'Phone', 'Date', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={8} className="px-4 py-12 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase">Loading...</td></tr>
            )}
            {!loading && enquiries.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase">No enquiries found</td></tr>
            )}
            {!loading && enquiries.map((enq: any, i: number) => {
              const machineModels: string[] = enq.enquiry_machines && enq.enquiry_machines.length > 0
                ? enq.enquiry_machines.map((m: any) => m.model_code_snapshot || m.machine_id)
                : enq.metadata?.machines && Array.isArray(enq.metadata.machines)
                ? enq.metadata.machines.map((m: any) => m.model_code || m.name)
                : [];

              const displaySource = enq.source || (
                enq.metadata?.machine_source === 'machine_selector' ? 'MACHINE_SELECTOR' :
                enq.metadata?.machine_source === 'machine_comparison' ? 'MACHINE_COMPARISON' :
                machineModels.length > 0 ? 'MACHINE_DETAIL' : enq.type || 'GENERAL'
              );

              return (
                <tr
                  key={enq.id}
                  style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}
                  className="hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries/${enq.id}`} className="font-ibm-plex-mono text-[11px] text-[#FF6900] hover:underline block font-bold">
                      {enq.reference || enq.id?.slice(0, 8) || '—'}
                    </Link>
                    {machineModels.length > 0 && (
                      <span className="font-ibm-plex-mono text-[9px] text-[#888] block truncate max-w-[150px]" title={machineModels.join(', ')}>
                        {machineModels.join(', ')}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase">
                    <div>
                      {displaySource === 'MACHINE_SELECTOR' ? (
                        <span className="text-[#FF6900] font-bold block">SELECTOR</span>
                      ) : displaySource === 'MACHINE_COMPARISON' ? (
                        <span className="text-blue-400 font-bold block">COMPARE</span>
                      ) : displaySource === 'MACHINE_DETAIL' ? (
                        <span className="text-emerald-400 font-bold block">MACHINE</span>
                      ) : (
                        <span className="text-[#888] block">{displaySource}</span>
                      )}

                      {enq.selection_outcome && (
                        <span className={`text-[8px] font-bold uppercase tracking-wider block ${
                          enq.selection_outcome === 'STRONG_MATCH' ? 'text-emerald-400' :
                          enq.selection_outcome === 'POSSIBLE_MATCH' ? 'text-amber-400' :
                          'text-neutral-500'
                        }`}>
                          {enq.selection_outcome.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-inter text-[13px] text-white">{enq.name || '—'}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#888]">{enq.company || '—'}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666]">{enq.email || '—'}</td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#666]">{enq.phone || '—'}</td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                    {new Date(enq.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase font-bold" style={{
                      color: STATUS_COLOURS[enq.status] || '#888',
                      border: `1px solid ${STATUS_COLOURS[enq.status] || '#333'}`,
                      background: `${STATUS_COLOURS[enq.status] || '#333'}18`,
                    }}>
                      {enq.status}
                    </span>
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
