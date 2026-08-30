'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Search, Phone, Mail, Building2, MapPin, 
  CheckCircle2, Clock, ArrowRight, ExternalLink, Filter, MessageSquare, AlertCircle
} from 'lucide-react';

const STATUS_COLOURS: Record<string, { text: string; bg: string; border: string }> = {
  new: { text: '#FF6900', bg: '#FF690018', border: '#FF690040' },
  quoted: { text: '#3B82F6', bg: '#3B82F618', border: '#3B82F640' },
  'in-progress': { text: '#F59E0B', bg: '#F59E0B18', border: '#F59E0B40' },
  won: { text: '#22C55E', bg: '#22C55E18', border: '#22C55E40' },
  lost: { text: '#EF4444', bg: '#EF444418', border: '#EF444440' },
  closed: { text: '#888888', bg: '#88888818', border: '#88888840' },
};

export default function QuotesClient({ initialQuotes }: { initialQuotes: any[] }) {
  const [quotes, setQuotes] = useState<any[]>(initialQuotes);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = quotes.filter(q => {
    const matchesStatus = status === 'all' || q.status === status;
    const term = search.toLowerCase();
    const matchesSearch = !search ||
      q.name?.toLowerCase().includes(term) ||
      q.email?.toLowerCase().includes(term) ||
      q.company?.toLowerCase().includes(term) ||
      q.reference?.toLowerCase().includes(term) ||
      q.metadata?.product_name?.toLowerCase().includes(term) ||
      q.message?.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const countNew = quotes.filter(q => q.status === 'new').length;
  const countQuoted = quotes.filter(q => q.status === 'quoted' || q.status === 'in-progress').length;
  const countWon = quotes.filter(q => q.status === 'won').length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Quote Requests</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {quotes.length} product pricing & machine quotation submissions
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase tracking-widest font-bold">TOTAL REQUESTS</p>
          <p className="font-barlow-condensed text-4xl font-black text-white mt-1">{quotes.length}</p>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase tracking-widest font-bold">NEW / UNPROCESSED</p>
          <p className="font-barlow-condensed text-4xl font-black text-[#FF6900] mt-1">{countNew}</p>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#3B82F6] uppercase tracking-widest font-bold">QUOTED / IN DISCUSSION</p>
          <p className="font-barlow-condensed text-4xl font-black text-[#3B82F6] mt-1">{countQuoted}</p>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#22C55E] uppercase tracking-widest font-bold">WON / CONVERTED</p>
          <p className="font-barlow-condensed text-4xl font-black text-[#22C55E] mt-1">{countWon}</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-3 bg-[#141414] border border-[#222]">
        <div className="flex flex-wrap gap-1.5">
          {['all', 'new', 'quoted', 'in-progress', 'won', 'closed'].map(st => {
            const count = st === 'all' ? quotes.length : quotes.filter(q => q.status === st).length;
            const isSelected = status === st;
            return (
              <button
                key={st}
                onClick={() => setStatus(st)}
                className="px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-1.5"
                style={{
                  background: isSelected ? '#FF6900' : 'transparent',
                  color: isSelected ? '#fff' : '#777',
                  border: isSelected ? '1px solid #FF6900' : '1px solid transparent',
                }}
              >
                <span>{st === 'all' ? 'All Quotes' : st.replace('-', ' ')}</span>
                <span className={`text-[8px] px-1 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-[#222] text-[#666]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#555]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customer, machine, company, email..."
            className="w-full bg-[#0D0D0D] border border-[#262626] text-white pl-9 pr-4 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
          />
        </div>
      </div>

      {/* Quotes List / Table */}
      {filtered.length === 0 ? (
        <div className="border border-[#222] bg-[#0E0E0E] p-12 text-center">
          <FileText className="h-10 w-10 text-[#333] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">No Quote Requests Found</h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When website visitors click "Request Pricing" or submit machine quotation requests, they will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0E0E0E] divide-y divide-[#1A1A1A]">
          {filtered.map(q => {
            const stStyle = STATUS_COLOURS[q.status] || STATUS_COLOURS.new;
            const productName = q.metadata?.product_name || q.subject?.replace('Quotation Request — ', '') || 'Alkota Machine';
            const productCategory = q.metadata?.category || 'Industrial Spec';

            return (
              <div key={q.id} className="p-6 hover:bg-[#141414] transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-ibm-plex-mono text-[9px] px-2 py-0.5 uppercase font-bold"
                        style={{ color: stStyle.text, background: stStyle.bg, border: `1px solid ${stStyle.border}` }}
                      >
                        {q.status?.toUpperCase() || 'NEW'}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                        {q.reference || q.id.slice(0, 8)} · {new Date(q.created_at).toLocaleDateString('en-GB')} at {new Date(q.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                      {q.name} {q.company ? <span className="text-[#888]">({q.company})</span> : ''}
                    </h3>

                    {/* Machine Details */}
                    <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-[#181818] border border-[#2A2A2A]">
                      <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">Equipment Requested:</span>
                      <span className="font-barlow-condensed text-base font-black uppercase text-white">{productName}</span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#666]">({productCategory})</span>
                    </div>

                    {/* Contact details */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 font-ibm-plex-mono text-xs text-[#AAA]">
                      {q.phone && (
                        <a href={`tel:${q.phone}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
                          <Phone className="h-3 w-3 text-[#FF6900]" /> {q.phone}
                        </a>
                      )}
                      <a href={`mailto:${q.email}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
                        <Mail className="h-3 w-3 text-[#FF6900]" /> {q.email}
                      </a>
                    </div>

                    {/* Customer Message */}
                    {q.message && (
                      <div className="mt-3 p-3 bg-[#111] border border-[#222] font-inter text-xs text-[#CCC] italic">
                        "{q.message}"
                      </div>
                    )}
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <Link
                      href={`/admin/quotes/${q.id}`}
                      className="px-4 py-2 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest hover:bg-[#e55f00] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Manage Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={`mailto:${q.email}?subject=Alkota UK Quote — ${encodeURIComponent(productName)}&body=Dear ${encodeURIComponent(q.name || '')},%0D%0A%0D%0AThank you for requesting pricing on the ${encodeURIComponent(productName)}...`}
                      className="px-4 py-2 border border-[#333] text-[#AAA] font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:text-white hover:border-[#555] transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#FF6900]" /> Email Customer
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
