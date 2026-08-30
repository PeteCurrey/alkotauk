import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Inbox, Phone, Mail, MapPin, Building2, Flame, Droplets, CheckCircle2, Clock, Filter, ArrowRight, UserCheck } from 'lucide-react';

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
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Lead Management & Commercial Pipeline
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {combinedLeads.length} contact form submissions, demo requests, and dealer referrals
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest font-bold">TOTAL LEADS</p>
          <h3 className="font-barlow-condensed text-4xl font-black text-white mt-1">{combinedLeads.length}</h3>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E5FF] uppercase tracking-widest font-bold">DEMO REQUESTS</p>
          <h3 className="font-barlow-condensed text-4xl font-black text-white mt-1">{demoCount}</h3>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#FFD700] uppercase tracking-widest font-bold">GENERAL ENQUIRIES</p>
          <h3 className="font-barlow-condensed text-4xl font-black text-white mt-1">{contactCount}</h3>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase tracking-widest font-bold">TECHNICAL & SERVICE</p>
          <h3 className="font-barlow-condensed text-4xl font-black text-white mt-1">{technicalCount}</h3>
        </div>
      </div>

      {combinedLeads.length === 0 ? (
        <div className="border border-[#222] bg-[#0E0E0E] p-12 text-center">
          <Inbox className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Website Leads Recorded Yet
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When prospective buyers fill out contact forms or book demonstrations, they are automatically logged here.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0E0E0E] divide-y divide-[#1A1A1A]">
          {combinedLeads.map((lead) => (
            <div key={lead.id} className="p-6 hover:bg-[#141414] transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-ibm-plex-mono text-[9px] bg-alkota-orange text-white px-2 py-0.5 uppercase font-bold">
                      {lead.lead_type?.toUpperCase() || 'ENQUIRY'}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                      {new Date(lead.created_at).toLocaleDateString('en-GB')} at {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-orange bg-alkota-orange/10 px-2 py-0.5 border border-alkota-orange/20">
                      Via {lead.routed_via?.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {lead.customer_name} {lead.customer_company ? `— ${lead.customer_company}` : ''}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-2 font-ibm-plex-mono text-xs text-[#aaa]">
                    {lead.customer_phone && (
                      <a href={`tel:${lead.customer_phone}`} className="hover:text-white flex items-center gap-1">
                        <Phone className="h-3 w-3 text-[#FF6900]" /> {lead.customer_phone}
                      </a>
                    )}
                    {lead.customer_email && (
                      <a href={`mailto:${lead.customer_email}`} className="hover:text-white flex items-center gap-1">
                        <Mail className="h-3 w-3 text-[#FF6900]" /> {lead.customer_email}
                      </a>
                    )}
                    {lead.customer_postcode && <span>📍 {lead.customer_postcode}</span>}
                  </div>
                </div>

                {/* Assigned Dealer / Handling Hub Box */}
                <div className="bg-[#181818] border border-[#262626] p-3.5 text-right shrink-0">
                  <span className="font-ibm-plex-mono text-[8px] text-alkota-orange uppercase font-bold block">
                    ASSIGNED ROUTE
                  </span>
                  <p className="font-barlow-condensed text-lg font-bold uppercase text-white">
                    {lead.dealer?.name || 'Alkota UK Factory Hub'}
                  </p>
                  <p className="font-ibm-plex-mono text-[9px] text-[#777]">
                    {lead.dealer?.phone || '+44 7912 506738'}
                  </p>
                </div>
              </div>

              {/* Message & Context */}
              {(lead.product_name || lead.message || lead.application_notes) && (
                <div className="bg-[#121212] border border-[#222] p-4 text-xs font-ibm-plex-mono text-[#ccc] space-y-2 mt-3">
                  {lead.product_name && (
                    <p>
                      <strong className="text-[#888]">Subject / Focus:</strong> <span className="text-white">{lead.product_name}</span>
                    </p>
                  )}
                  {lead.application_notes && (
                    <p>
                      <strong className="text-[#888]">Application:</strong> {lead.application_notes}
                    </p>
                  )}
                  {lead.message && (
                    <p className="text-[#aaa] font-inter italic">
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

