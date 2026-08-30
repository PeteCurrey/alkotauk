import { supabaseAdmin } from '@/lib/supabase/server';
import LeadsClient, { LeadItem } from './LeadsClient';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  let dealerLeads: any[] = [];
  let enquiries: any[] = [];

  // Use Promise.allSettled so one table failing doesn't block the other
  const results = await Promise.allSettled([
    supabaseAdmin
      .from('enquiries')
      .select('*')
      .not('type', 'in', '("quote","product-quote")')
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('dealer_leads')
      .select(`*, dealer:dealers(name, slug, town, phone)`)
      .order('created_at', { ascending: false }),
  ]);

  if (results[0].status === 'fulfilled' && results[0].value?.data) {
    enquiries = results[0].value.data;
  }

  if (results[1].status === 'fulfilled' && results[1].value?.data) {
    dealerLeads = results[1].value.data;
  }

  // Combine and sort all leads
  const combinedLeads: LeadItem[] = [
    ...enquiries.map((e: any) => ({
      id: e.id,
      lead_type: e.type || 'contact',
      created_at: e.created_at,
      routed_via: e.metadata?.source || 'website_form',
      customer_name: e.name || 'Anonymous Inquiry',
      customer_company: e.company || '',
      customer_email: e.email || '',
      customer_phone: e.phone || '',
      customer_postcode: e.metadata?.postcode || '',
      product_name: e.metadata?.product_name || e.subject || 'Website Inquiry',
      product_category: e.metadata?.category || '',
      message: e.message || '',
      application_notes: e.metadata?.application_notes || '',
      dealer: null,
      status: e.status || 'new',
      _sourceType: 'enquiry',
    })),
    ...dealerLeads.map((l: any) => ({
      id: l.id,
      lead_type: l.lead_type || 'demo',
      created_at: l.created_at,
      routed_via: l.routed_via || 'dealer_router',
      customer_name: l.customer_name || 'Dealer Referral',
      customer_company: l.customer_company || '',
      customer_email: l.customer_email || '',
      customer_phone: l.customer_phone || '',
      customer_postcode: l.customer_postcode || '',
      product_name: l.product_name || 'Machinery Demo',
      product_category: l.product_category || '',
      message: l.message || '',
      application_notes: l.application_notes || '',
      dealer: l.dealer || null,
      status: l.status || 'new',
      _sourceType: 'dealer_lead',
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return <LeadsClient initialLeads={combinedLeads} />;
}
