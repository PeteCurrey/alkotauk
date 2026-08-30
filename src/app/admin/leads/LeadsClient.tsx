'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Inbox, Phone, Mail, MapPin, Building2, Flame, 
  Droplets, CheckCircle2, Clock, Filter, ArrowRight, 
  UserCheck, ShieldCheck, Search, ChevronRight, ExternalLink
} from 'lucide-react';

export interface LeadItem {
  id: string;
  lead_type: string;
  created_at: string;
  routed_via?: string;
  customer_name: string;
  customer_company?: string;
  customer_email: string;
  customer_phone?: string;
  customer_postcode?: string;
  product_name?: string;
  product_category?: string;
  message?: string;
  application_notes?: string;
  dealer?: any;
  status: string;
  _sourceType: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New Lead', bg: 'bg-[#FF6900]/10', text: 'text-[#FF6900]', dot: 'bg-[#FF6900]' },
  read: { label: 'Reviewing', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { label: 'Contacted', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  responded: { label: 'In Dialogue', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  won: { label: 'Converted', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  closed: { label: 'Archived', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export default function LeadsClient({ initialLeads }: { initialLeads: LeadItem[] }) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [activeType, setActiveType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [activeLead, setActiveLead] = useState<LeadItem | null>(initialLeads[0] || null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = leads.filter(lead => {
    const matchesType = activeType === 'all' || 
      (activeType === 'contact' && (lead.lead_type === 'contact' || lead.lead_type === 'general' || lead.lead_type === 'contact_page')) ||
      (activeType === 'demo' && (lead.lead_type === 'demo' || lead.lead_type === 'demo-request')) ||
      (activeType === 'dealer' && lead._sourceType === 'dealer_lead');

    const matchesSearch = !search ||
      lead.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.customer_company?.toLowerCase().includes(search.toLowerCase()) ||
      lead.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.message?.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const countNew = leads.filter(l => l.status === 'new').length;
  const countDemo = leads.filter(l => l.lead_type === 'demo' || l.lead_type === 'demo-request').length;
  const countContact = leads.filter(l => l.lead_type === 'contact' || l.lead_type === 'general' || l.lead_type === 'contact_page').length;
  const countDealer = leads.filter(l => l._sourceType === 'dealer_lead').length;

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/admin/enquiries/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        if (activeLead && activeLead.id === leadId) {
          setActiveLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Commercial Leads & Contact Inquiries
          </h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            Real-time inbound submissions from /contact, demo trial bookings, and dealer routing
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF6900]">New Leads</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-black text-[#0F172A]">{countNew}</p>
            {countNew > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF6900] text-white text-[10px] font-extrabold">
                Awaiting Review
              </span>
            )}
          </div>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Unprocessed inquiries</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Contact Forms</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{countContact}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Website contact submissions</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Trial Demonstrations</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{countDemo}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">On-site plant trial requests</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Total Leads Pipeline</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{leads.length}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Direct inquiries + dealer referrals</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Leads', count: leads.length },
            { id: 'contact', label: 'Contact Forms', count: countContact },
            { id: 'demo', label: 'Demonstrations', count: countDemo },
            { id: 'dealer', label: 'Dealer Routed', count: countDealer },
          ].map(tab => {
            const isSelected = activeType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveType(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#111] text-white shadow-sm font-bold' 
                    : 'bg-[#F6F7F9] text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#475569]'
                }`}>
                  {tab.count}
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
            placeholder="Search leads by name, email, company, subject..."
            className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-full text-[#0F172A] pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#FF6900] transition-colors placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Leads Table & Detail Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[650px]">
              <thead>
                <tr className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Lead / Contact</th>
                  <th className="px-5 py-3.5">Channel / Subject</th>
                  <th className="px-5 py-3.5">Received</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F5] text-xs font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-[#64748B]">
                      <Inbox className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
                      No leads found matching current filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map(lead => {
                    const st = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                    const isSelected = activeLead?.id === lead.id;

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setActiveLead(lead)}
                        className={`hover:bg-[#F8F9FB] transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#F6F7F9]' : ''
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-extrabold text-[#0F172A]">{lead.customer_name}</p>
                          {lead.customer_company && (
                            <p className="text-[11px] text-[#64748B] font-normal">{lead.customer_company}</p>
                          )}
                          <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">{lead.customer_email}</p>
                        </td>
                        <td className="px-5 py-4 max-w-[200px]">
                          <span className="px-2 py-0.5 rounded-full bg-[#F1F3F7] text-[10px] font-bold text-[#475569] uppercase">
                            {lead.lead_type || 'Contact'}
                          </span>
                          <p className="text-xs text-[#0F172A] font-semibold truncate mt-1">
                            {lead.product_name || 'Website Inquiry'}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-[#64748B] font-mono text-[11px]">
                          {new Date(lead.created_at).toLocaleDateString('en-GB')}
                          <p className="text-[10px] text-[#94A3B8]">
                            {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLead(lead);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8] text-xs font-bold text-[#334155] hover:bg-[#111] hover:text-white transition-all"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Lead Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {activeLead ? (
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#FF6900]">Lead Dossier</p>
                  <h3 className="text-base font-extrabold text-[#0F172A]">{activeLead.customer_name}</h3>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  {new Date(activeLead.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  Pipeline Stage
                </label>
                <select
                  value={activeLead.status}
                  disabled={updatingId === activeLead.id}
                  onChange={(e) => handleStatusChange(activeLead.id, e.target.value)}
                  className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-xl text-[#0F172A] px-3.5 py-2.5 text-xs font-bold focus:bg-white focus:border-[#FF6900] focus:outline-none"
                >
                  <option value="new">New Lead (Unprocessed)</option>
                  <option value="read">Under Review</option>
                  <option value="contacted">Contacted via Phone/Email</option>
                  <option value="responded">In Active Discussion</option>
                  <option value="won">Converted (Quote/Order Issued)</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>

              {/* Contact Credentials */}
              <div className="p-3.5 bg-[#F8F9FB] rounded-xl border border-[#F0F2F5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8] font-medium">Customer</span>
                  <span className="font-bold text-[#0F172A]">{activeLead.customer_name}</span>
                </div>
                {activeLead.customer_company && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8] font-medium">Company</span>
                    <span className="font-bold text-[#0F172A]">{activeLead.customer_company}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8] font-medium">Email</span>
                  <a href={`mailto:${activeLead.customer_email}`} className="font-bold text-[#FF6900] hover:underline truncate max-w-[180px]">
                    {activeLead.customer_email}
                  </a>
                </div>
                {activeLead.customer_phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8] font-medium">Phone</span>
                    <a href={`tel:${activeLead.customer_phone}`} className="font-bold text-[#0F172A] hover:text-[#FF6900]">
                      {activeLead.customer_phone}
                    </a>
                  </div>
                )}
                {activeLead.customer_postcode && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8] font-medium">Postcode</span>
                    <span className="font-bold text-[#0F172A]">{activeLead.customer_postcode}</span>
                  </div>
                )}
              </div>

              {/* Message / Details */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Submission Details
                </p>
                <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#F0F2F5] space-y-2 text-xs">
                  {activeLead.product_name && (
                    <p>
                      <strong className="text-[#0F172A]">Subject / Machine:</strong> {activeLead.product_name}
                    </p>
                  )}
                  {activeLead.message && (
                    <div>
                      <p className="text-[#94A3B8] font-bold mb-1">Message:</p>
                      <p className="text-[#334155] whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-[#E2E4E8]">
                        {activeLead.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 border-t border-[#F0F2F5] flex gap-2">
                <a
                  href={`mailto:${activeLead.customer_email}?subject=Re: Alkota UK — ${activeLead.product_name || 'Your Enquiry'}`}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Mail className="h-3.5 w-3.5" /> Email Customer
                </a>
                {activeLead.customer_phone && (
                  <a
                    href={`tel:${activeLead.customer_phone}`}
                    className="px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8] text-xs font-bold text-[#0F172A] hover:bg-[#111] hover:text-white transition-all flex items-center justify-center"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-xs text-[#64748B]">
              <Inbox className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
              Select a lead from the table to inspect details and respond.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
