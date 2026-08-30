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
    <div className="max-w-5xl pb-32">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest bg-green-950 text-green-300 border border-green-700 shadow-2xl">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/quotes" className="text-[#666] hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
              Quote Request · {quote.reference || quote.id.slice(0, 8)}
            </h1>
          </div>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mt-1">
            // Received on {new Date(quote.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {new Date(quote.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Card */}
          <div className="border border-[#222] bg-[#141414] p-6">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900] mb-4">// CUSTOMER DETAILS</p>
            <h3 className="font-barlow-condensed text-3xl font-bold uppercase text-white mb-1">{quote.name}</h3>
            {quote.company && <p className="font-inter text-sm text-[#AAA] mb-4">{quote.company}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#222] font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[#666] block text-[9px] uppercase">Corporate Email</span>
                <a href={`mailto:${quote.email}`} className="text-white hover:text-[#FF6900] transition-colors break-all">
                  {quote.email}
                </a>
              </div>
              <div>
                <span className="text-[#666] block text-[9px] uppercase">Telephone Number</span>
                {quote.phone ? (
                  <a href={`tel:${quote.phone}`} className="text-white hover:text-[#FF6900] transition-colors">
                    {quote.phone}
                  </a>
                ) : (
                  <span className="text-[#555]">Not provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Equipment Requested Card */}
          <div className="border border-[#222] bg-[#141414] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// EQUIPMENT SPECIFIED</p>
              <span className="font-ibm-plex-mono text-[9px] px-2 py-0.5 bg-[#1F1F1F] text-[#AAA] uppercase">
                {productCategory}
              </span>
            </div>

            <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-3">
              {productName}
            </h3>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#222]">
              <Link
                href={`/machines/${productCategory}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> View on Storefront
              </Link>
            </div>
          </div>

          {/* Customer Message & Application */}
          <div className="border border-[#222] bg-[#141414] p-6">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900] mb-3">// APPLICATION REQUIREMENTS</p>
            {quote.message ? (
              <p className="font-inter text-sm text-[#CCC] leading-relaxed whitespace-pre-wrap bg-[#0D0D0D] border border-[#222] p-4">
                {quote.message}
              </p>
            ) : (
              <p className="font-inter text-xs text-[#666] italic">No additional message provided.</p>
            )}
          </div>
        </div>

        {/* Right Column: Workflow & Admin Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status & Management Card */}
          <div className="border border-[#222] bg-[#141414] p-6">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900] mb-4">// WORKFLOW STATUS</p>

            <div className="space-y-4">
              <div>
                <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">Quote Pipeline Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
                >
                  <option value="new">New / Unprocessed</option>
                  <option value="quoted">Quoted (Formal Proposal Sent)</option>
                  <option value="in-progress">In Discussion / Follow-Up</option>
                  <option value="won">Won / Converted into Order</option>
                  <option value="lost">Lost / Cancelled</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">Follow-up Target Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={e => setFollowUpDate(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
                />
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">Internal Engineering Notes</label>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                  placeholder="Record pump choice, power supply verification, delivery location, quotation amount..."
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#FF6900] text-white py-3 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest hover:bg-[#e55f00] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Update Quote Record'}
              </button>
            </div>
          </div>

          {/* Quick Outreach Card */}
          <div className="border border-[#222] bg-[#141414] p-6">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900] mb-4">// DIRECT OUTREACH</p>
            <div className="space-y-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest">
              <a
                href={`mailto:${quote.email}?subject=Alkota UK Factory Quote — ${encodeURIComponent(productName)}&body=Dear ${encodeURIComponent(quote.name || '')},%0D%0A%0D%0AThank you for contacting Alkota UK regarding the ${encodeURIComponent(productName)}.%0D%0A%0D%0APlease find our factory quotation details attached below...`}
                className="w-full p-3 bg-white text-black font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 block text-center"
              >
                <Send className="h-3.5 w-3.5" /> Launch Email Client
              </a>
              {quote.phone && (
                <a
                  href={`tel:${quote.phone}`}
                  className="w-full p-3 border border-[#333] text-white hover:border-[#FF6900] hover:text-[#FF6900] transition-colors flex items-center justify-center gap-2 block text-center"
                >
                  <Phone className="h-3.5 w-3.5" /> Direct Telephone Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
