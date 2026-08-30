'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Search, Phone, Mail, Building2, MapPin, 
  CheckCircle2, Clock, ArrowRight, ExternalLink, Filter, MessageSquare, AlertCircle
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New Request', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  quoted: { label: 'Quoted', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  won: { label: 'Won / Converted', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  lost: { label: 'Lost', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  closed: { label: 'Closed', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Quote Requests</h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            {quotes.length} product pricing inquiries and commercial quote submissions
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Total Inquiries</p>
          <p className="text-3xl font-extrabold text-[#0F172A] mt-2">{quotes.length}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">All time portal submissions</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">New / Unprocessed</p>
          <p className="text-3xl font-extrabold text-[#FF6900] mt-2">{countNew}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Awaiting sales team response</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Active Discussions</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{countQuoted}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Quoted or spec in review</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Won / Converted</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{countWon}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Completed machinery orders</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-[20px] border border-[#E6E8EC] p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap gap-1.5">
          {['all', 'new', 'quoted', 'in-progress', 'won', 'closed'].map(st => {
            const count = st === 'all' ? quotes.length : quotes.filter(q => q.status === st).length;
            const isSelected = status === st;
            return (
              <button
                key={st}
                onClick={() => setStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#111] text-white shadow-sm' 
                    : 'bg-[#F6F7F9] text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <span>{st === 'all' ? 'All Quotes' : st.replace('-', ' ')}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#475569]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customer, machine, company, email..."
            className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-full text-[#0F172A] pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#FF6900] transition-colors placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Quotes Cards List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-16 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <FileText className="h-10 w-10 text-[#CBD5E1] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">No Quote Requests Found</h3>
          <p className="text-xs text-[#64748B] max-w-md mx-auto">
            When website visitors click "Request Pricing" or submit machinery quotation requests, they will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(q => {
            const stConfig = STATUS_CONFIG[q.status] || STATUS_CONFIG.new;
            const productName = q.metadata?.product_name || q.subject?.replace('Quotation Request — ', '') || 'Alkota Machine';
            const productCategory = q.metadata?.category || 'Industrial Spec';

            return (
              <div 
                key={q.id} 
                className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#CBD5E1] transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${stConfig.bg} ${stConfig.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${stConfig.dot}`} />
                        {stConfig.label}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-mono">
                        {q.reference || q.id.slice(0, 8)} · {new Date(q.created_at).toLocaleDateString('en-GB')} at {new Date(q.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A]">
                      {q.name} {q.company ? <span className="text-[#64748B] font-normal">({q.company})</span> : ''}
                    </h3>

                    {/* Machine Details Pill */}
                    <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F6F7F9] border border-[#E6E8EC] rounded-full">
                      <span className="text-[11px] font-bold text-[#FF6900] uppercase">Equipment:</span>
                      <span className="text-xs font-bold text-[#0F172A]">{productName}</span>
                      <span className="text-[11px] text-[#64748B] capitalize">({productCategory.replace('-', ' ')})</span>
                    </div>

                    {/* Contact telemetry */}
                    <div className="flex flex-wrap items-center gap-4 mt-3.5 text-xs text-[#64748B]">
                      {q.phone && (
                        <a href={`tel:${q.phone}`} className="hover:text-[#FF6900] flex items-center gap-1.5 transition-colors font-medium">
                          <Phone className="h-3.5 w-3.5 text-[#FF6900]" /> {q.phone}
                        </a>
                      )}
                      <a href={`mailto:${q.email}`} className="hover:text-[#FF6900] flex items-center gap-1.5 transition-colors font-medium">
                        <Mail className="h-3.5 w-3.5 text-[#FF6900]" /> {q.email}
                      </a>
                    </div>

                    {/* Customer Message */}
                    {q.message && (
                      <div className="mt-3.5 p-3.5 bg-[#F8F9FB] rounded-2xl border border-[#F0F2F5] text-xs text-[#475569] italic">
                        "{q.message}"
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                    <Link
                      href={`/admin/quotes/${q.id}`}
                      className="px-5 py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Manage Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={`mailto:${q.email}?subject=Alkota UK Quote — ${encodeURIComponent(productName)}&body=Dear ${encodeURIComponent(q.name || '')},%0D%0A%0D%0AThank you for requesting pricing on the ${encodeURIComponent(productName)}...`}
                      className="px-5 py-2.5 rounded-full bg-white border border-[#E6E8EC] text-xs font-semibold text-[#334155] hover:bg-[#F8F9FA] transition-colors flex items-center justify-center gap-2 shadow-sm"
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

