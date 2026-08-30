import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Inbox, ArrowLeft, Clock, CheckCircle2, AlertTriangle, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPartsEnquiriesPage() {
  // Fetch parts enquiries from enquiries table
  const { data: dbEnquiries } = await supabaseAdmin
    .from('enquiries')
    .select('*')
    .or('type.eq.parts_enquiry,type.eq.parts_finder_unmatched')
    .order('created_at', { ascending: false });

  const enquiries = dbEnquiries || [];

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Parts Enquiries CRM</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Parts Finder Leads & Sourcing Desk Requests ({enquiries.length})
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Review customer part requests, serial number lookups, and convert technical inquiries into orders.
            </p>
          </div>
        </div>
      </div>

      {/* ── ENQUIRIES TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Date / Ref</th>
              <th className="py-3.5 px-4">Customer Details</th>
              <th className="py-3.5 px-4">Machine / Serial</th>
              <th className="py-3.5 px-4">Requested Parts / Issue</th>
              <th className="py-3.5 px-4">Urgency</th>
              <th className="py-3.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#94A3B8]">
                  No parts enquiries recorded yet. New requests from the Parts Finder and quote desks will appear here.
                </td>
              </tr>
            ) : (
              enquiries.map((enq: any) => (
                <tr key={enq.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">
                    {new Date(enq.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0F172A]">{enq.customer_name || enq.name || 'Anonymous Customer'}</div>
                    <div className="text-[11px] text-[#64748B]">{enq.email} · {enq.phone || 'No Phone'}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#334155]">
                    {enq.machine_model || 'Unspecified'}
                    {enq.serial_number && (
                      <span className="block text-[10px] text-[#64748B]">S/N: {enq.serial_number}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 max-w-sm truncate text-[#475569]">
                    {enq.notes || enq.message || 'Parts requested'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700">
                      {enq.urgency || 'Standard'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                      {enq.status || 'New'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
