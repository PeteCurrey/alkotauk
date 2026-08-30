import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Inbox, Phone, Mail, MapPin, Building2, Flame, Droplets, CheckCircle2, Clock, Filter, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  let leads: any[] = [];
  let generalEnquiries: any[] = [];

  try {
    const [dealerLeadsRes, enquiriesRes] = await Promise.all([
      supabaseAdmin
        .from('dealer_leads')
        .select(`*, dealer:dealers(name, slug, town, phone)`)
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('enquiries')
        .select('*')
        .neq('type', 'quote')
        .order('created_at', { ascending: false })
    ]);

    if (dealerLeadsRes.data) leads = dealerLeadsRes.data;
    if (enquiriesRes.data) generalEnquiries = enquiriesRes.data;
  } catch (err) {
    console.error('Error fetching leads:', err);
  }

  // Combine and sort all leads
  const combinedLeads = [
    ...leads.map(l => ({ ...l, _sourceType: 'dealer_lead' })),
    ...generalEnquiries.map(e => ({
      id: e.id,
      lead_type: e.type || 'contact',
      created_at: e.created_at,
      routed_via: e.metadata?.source || 'website_form',
      customer_name: e.name,
      customer_company: e.company,
      customer_email: e.email,
      customer_phone: e.phone,
      customer_postcode: e.metadata?.postcode || '',
      product_name: e.metadata?.product_name || e.subject,
      product_category: e.metadata?.category || '',
      message: e.message,
      application_notes: e.metadata?.application_notes || '',
      dealer: null,
      status: e.status || 'new',
      _sourceType: 'enquiry',
    }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const demoCount = combinedLeads.filter(l => l.lead_type === 'demo' || l.lead_type === 'demo-request').length;
  const contactCount = combinedLeads.filter(l => l.lead_type === 'contact' || l.lead_type === 'general').length;
  const technicalCount = combinedLeads.filter(l => l.lead_type === 'industrial' || l.lead_type === 'compliance' || l.lead_type === 'service').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Commercial Leads & Inquiries
          </h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            {combinedLeads.length} contact form submissions, live demonstration requests, and dealer referrals
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Total Pipeline Leads</p>
          <p className="text-3xl font-extrabold text-[#0F172A] mt-2">{combinedLeads.length}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Direct inquiries & routed forms</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Live Demonstrations</p>
          <p className="text-3xl font-extrabold text-[#FF6900] mt-2">{demoCount}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">On-site plant trial bookings</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">General Inquiries</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{contactCount}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Contact form submissions</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Technical & Service</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{technicalCount}</p>
          <p className="text-[11px] text-[#94A3B8] font-medium mt-1">Service & maintenance support</p>
        </div>
      </div>

      {combinedLeads.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-16 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <Inbox className="h-10 w-10 text-[#CBD5E1] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">
            No Website Leads Recorded Yet
          </h3>
          <p className="text-xs text-[#64748B] max-w-md mx-auto">
            When prospective buyers fill out contact forms or book on-site demonstrations, they are automatically logged here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {combinedLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#CBD5E1] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF6900]/10 text-[#FF6900] uppercase">
                      {lead.lead_type?.replace('-', ' ') || 'ENQUIRY'}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">
                      {new Date(lead.created_at).toLocaleDateString('en-GB')} at {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F3F7] text-[#64748B]">
                      Via {lead.routed_via?.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A]">
                    {lead.customer_name} {lead.customer_company ? <span className="text-[#64748B] font-normal">— {lead.customer_company}</span> : ''}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#64748B]">
                    {lead.customer_phone && (
                      <a href={`tel:${lead.customer_phone}`} className="hover:text-[#FF6900] flex items-center gap-1.5 transition-colors font-medium">
                        <Phone className="h-3.5 w-3.5 text-[#FF6900]" /> {lead.customer_phone}
                      </a>
                    )}
                    {lead.customer_email && (
                      <a href={`mailto:${lead.customer_email}`} className="hover:text-[#FF6900] flex items-center gap-1.5 transition-colors font-medium">
                        <Mail className="h-3.5 w-3.5 text-[#FF6900]" /> {lead.customer_email}
                      </a>
                    )}
                    {lead.customer_postcode && (
                      <span className="flex items-center gap-1 font-medium text-[#475569]">
                        <MapPin className="h-3.5 w-3.5 text-[#94A3B8]" /> {lead.customer_postcode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Assigned Dealer / Handling Hub Box */}
                <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E6E8EC] text-right shrink-0 min-w-[200px]">
                  <span className="text-[10px] font-bold text-[#FF6900] uppercase tracking-wider block">
                    ASSIGNED ROUTE
                  </span>
                  <p className="text-sm font-bold text-[#0F172A] mt-0.5">
                    {lead.dealer?.name || 'Alkota UK Direct Hub'}
                  </p>
                  <p className="text-xs font-medium text-[#64748B] mt-0.5">
                    {lead.dealer?.phone || '+44 7912 506738'}
                  </p>
                </div>
              </div>

              {/* Message & Context */}
              {(lead.product_name || lead.message || lead.application_notes) && (
                <div className="bg-[#F8F9FB] rounded-2xl border border-[#F0F2F5] p-4 text-xs text-[#475569] space-y-2 mt-4">
                  {lead.product_name && (
                    <p>
                      <strong className="text-[#0F172A]">Subject / Machine:</strong> <span>{lead.product_name}</span>
                    </p>
                  )}
                  {lead.application_notes && (
                    <p>
                      <strong className="text-[#0F172A]">Application Notes:</strong> {lead.application_notes}
                    </p>
                  )}
                  {lead.message && (
                    <p className="text-[#64748B] italic">
                      "{lead.message}"
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


