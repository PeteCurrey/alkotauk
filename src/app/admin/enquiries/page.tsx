'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

const TYPES = ['all', 'quote', 'contact', 'trailer', 'industrial', 'industrial-brief', 'compliance', 'machine-match', 'chemical-selector', 'maintenance-lead', 'tco'];
const STATUSES = ['all', 'new', 'read', 'responded', 'closed'];

const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900', read: '#666', responded: '#3B82F6', closed: '#22C55E',
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (type !== 'all') params.set('type', type);
    if (search) params.set('search', search);
    setLoading(true);
    fetch(`/api/admin/enquiries?${params}`)
      .then((r) => r.json())
      .then((data) => { setEnquiries(Array.isArray(data) ? data : []); setLoading(false); });
  }, [status, type, search]);

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Enquiries</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// All form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Status filter */}
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
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

        {/* Type select */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#1A1A1A] border border-[#222] text-[#888] px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase"
        >
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
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
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Reference', 'Type', 'Name', 'Company', 'Email', 'Phone', 'Date', 'Status'].map((h) => (
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
            {!loading && enquiries.map((enq: any, i: number) => (
              <tr
                key={enq.id}
                style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}
                className="hover:bg-[#1A1A1A] transition-colors"
              >
                <td className="px-4 py-3">
                  <Link href={`/admin/enquiries/${enq.id}`} className="font-ibm-plex-mono text-[11px] text-[#FF6900] hover:underline">
                    {enq.reference || '—'}
                  </Link>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{enq.type}</td>
                <td className="px-4 py-3 font-inter text-[13px] text-white">{enq.name || '—'}</td>
                <td className="px-4 py-3 font-inter text-[13px] text-[#888]">{enq.company || '—'}</td>
                <td className="px-4 py-3 font-inter text-[13px] text-[#666]">{enq.email || '—'}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#666]">{enq.phone || '—'}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                  {new Date(enq.created_at).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase" style={{
                    color: STATUS_COLOURS[enq.status] || '#666',
                    border: `1px solid ${STATUS_COLOURS[enq.status] || '#333'}`,
                    background: `${STATUS_COLOURS[enq.status] || '#333'}18`,
                  }}>
                    {enq.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
