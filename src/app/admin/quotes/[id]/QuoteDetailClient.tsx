'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Phone, Mail, Building2, Calendar, FileText, 
  CheckCircle2, Clock, ExternalLink, Save, Trash2, Send
} from 'lucide-react';

export default function QuoteDetailClient({ initialQuote }: { initialQuote: any }) {
  const router = useRouter();
  const [quote, setQuote] = useState(initialQuote);
  const [status, setStatus] = useState(initialQuote.status || 'new');
  const [adminNotes, setAdminNotes] = useState(initialQuote.admin_notes || initialQuote.notes || '');
  const [followUpDate, setFollowUpDate] = useState(initialQuote.follow_up_date || '');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const productName = quote.metadata?.product_name || quote.subject?.replace('Quotation Request — ', '') || 'Alkota Machine';
  const productCategory = quote.metadata?.category || 'hot-water';
  const productId = quote.metadata?.product_id;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          admin_notes: adminNotes,
          notes: adminNotes,
          follow_up_date: followUpDate || null,
        }),
      });

      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setQuote(data);
      showToast('Quote record updated successfully');
    } catch (err: any) {
      showToast(err.message || 'Error updating quote');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 px-6 py-3 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/quotes" 
            className="h-10 w-10 rounded-full bg-white border border-[#E6E8EC] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Quote Request · {quote.reference || quote.id.slice(0, 8)}
            </h1>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">
              Received on {new Date(quote.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {new Date(quote.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] disabled:opacity-50 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Customer Telemetry</h3>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">{quote.name}</h2>
              {quote.company && <p className="text-xs text-[#64748B] font-medium mt-0.5">{quote.company}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0F2F5] text-xs">
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase font-bold">Email Address</span>
                <a href={`mailto:${quote.email}`} className="text-[#0F172A] font-semibold hover:text-[#FF6900] transition-colors break-all">
                  {quote.email}
                </a>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase font-bold">Phone Number</span>
                {quote.phone ? (
                  <a href={`tel:${quote.phone}`} className="text-[#0F172A] font-semibold hover:text-[#FF6900] transition-colors">
                    {quote.phone}
                  </a>
                ) : (
                  <span className="text-[#94A3B8]">Not provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Requested Equipment Card */}
          <div className="bg-white rounded-2xl border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Requested Machinery</h3>
            
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F6F7F9] border border-[#E6E8EC]">
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">{productName}</h4>
                <p className="text-xs text-[#64748B] capitalize mt-0.5">Category: {productCategory.replace('-', ' ')}</p>
              </div>
              {productId && (
                <Link
                  href={`/admin/products/${productId}`}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6E8EC] text-xs font-bold text-[#334155] hover:bg-[#111] hover:text-white transition-all shadow-sm shrink-0"
                >
                  View Product
                </Link>
              )}
            </div>

            {quote.message && (
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase font-bold mb-1.5">Customer Note / Requirements</span>
                <div className="p-4 bg-[#F8F9FB] rounded-2xl border border-[#F0F2F5] text-xs text-[#475569] leading-relaxed italic">
                  "{quote.message}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Processing & Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status & Pipeline Card */}
          <div className="bg-white rounded-2xl border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Quotation Pipeline</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">Quote Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
              >
                <option value="new">New / Unprocessed</option>
                <option value="quoted">Formal Quote Sent</option>
                <option value="in-progress">In Active Discussion</option>
                <option value="won">Won / Converted to Sale</option>
                <option value="lost">Lost</option>
                <option value="closed">Closed / Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">Follow-up Reminder Date</label>
              <input
                type="date"
                value={followUpDate ? followUpDate.slice(0, 10) : ''}
                onChange={e => setFollowUpDate(e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">Internal Commercial Notes</label>
              <textarea
                rows={5}
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                placeholder="Log internal discussion notes, custom quotes offered, warranty variations..."
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Quick Communication</h3>
            <a
              href={`mailto:${quote.email}?subject=Alkota UK Commercial Quote — ${encodeURIComponent(productName)}&body=Dear ${encodeURIComponent(quote.name || '')},%0D%0A%0D%0AThank you for your pricing inquiry regarding the Alkota ${encodeURIComponent(productName)}.%0D%0A%0D%0A`}
              className="w-full py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Mail className="h-4 w-4" /> Send Formal Email Response
            </a>
            {quote.phone && (
              <a
                href={`tel:${quote.phone}`}
                className="w-full py-2.5 rounded-full bg-white border border-[#E6E8EC] text-xs font-semibold text-[#334155] hover:bg-[#F8F9FA] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="h-4 w-4 text-[#FF6900]" /> Call Customer ({quote.phone})
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
