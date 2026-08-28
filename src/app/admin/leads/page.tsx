import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Inbox, Phone, Mail, MapPin, Building2, Flame, Droplets, CheckCircle2, Clock, Filter, ArrowRight } from 'lucide-react';

export default async function AdminLeadsPage() {
  let leads: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('dealer_leads')
      .select(`
        *,
        dealer:dealers(name, slug, town, phone)
      `)
      .order('created_at', { ascending: false });

    if (data) leads = data;
  } catch (err) {
    console.error('Error fetching leads:', err);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Commercial Enquiries & Lead Pipeline
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {leads.length} routed machine quotes, demo bookings and service requests
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase font-bold">TOTAL LEADS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{leads.length}</h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E5FF] uppercase font-bold">DEMO REQUESTS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {leads.filter((l) => l.lead_type === 'demo').length}
          </h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FFD700] uppercase font-bold">FACTORY QUOTES</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {leads.filter((l) => l.lead_type === 'quote').length}
          </h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase font-bold">SERVICE CALLS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {leads.filter((l) => l.lead_type === 'service').length}
          </h3>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
          <Inbox className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Routed Leads Recorded Yet
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When prospective buyers request machine quotes or demonstrations via website contact forms, they are automatically logged and routed here.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {leads.map((lead) => (
            <div key={lead.id} className="p-6 hover:bg-[#111] transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-ibm-plex-mono text-[9px] bg-alkota-orange text-white px-2 py-0.5 uppercase font-bold">
                      {lead.lead_type?.toUpperCase() || 'QUOTE'}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                      {new Date(lead.created_at).toLocaleDateString('en-GB')} at {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-orange bg-alkota-orange/10 px-2 py-0.5 border border-alkota-orange/20">
                      Routed via {lead.routed_via?.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {lead.customer_name} {lead.customer_company ? `— ${lead.customer_company}` : ''}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-2 font-ibm-plex-mono text-xs text-[#aaa]">
                    <span>📞 {lead.customer_phone}</span>
                    <span>✉️ {lead.customer_email}</span>
                    <span>📍 {lead.customer_postcode}</span>
                  </div>
                </div>

                {/* Assigned Dealer Box */}
                <div className="bg-[#161616] border border-[#333] p-3 text-right shrink-0">
                  <span className="font-ibm-plex-mono text-[8px] text-alkota-orange uppercase font-bold block">
                    ASSIGNED DEALER
                  </span>
                  <p className="font-barlow-condensed text-lg font-bold uppercase text-white">
                    {lead.dealer?.name || 'Alkota UK National Hub'}
                  </p>
                  <p className="font-ibm-plex-mono text-[9px] text-[#777]">
                    {lead.dealer?.phone || '+44 7912 506738'}
                  </p>
                </div>
              </div>

              {/* Equipment Context & Notes */}
              {(lead.product_name || lead.product_category || lead.message || lead.application_notes) && (
                <div className="bg-[#121212] border border-[#222] p-4 text-xs font-ibm-plex-mono text-[#ccc] space-y-2 mt-3">
                  {lead.product_name && (
                    <p>
                      <strong className="text-[#888]">Equipment:</strong> <span className="text-white">{lead.product_name}</span> ({lead.product_category || 'Industrial'})
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
