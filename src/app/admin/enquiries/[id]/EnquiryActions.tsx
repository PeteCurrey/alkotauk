'use client';

import { useState } from 'react';
import { Mail, CheckCircle, XCircle, Save } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'read', 'responded', 'closed'];
const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900', read: '#666', responded: '#3B82F6', closed: '#22C55E',
};

export default function EnquiryActions({ enquiry }: { enquiry: any }) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function update(patch: { status?: string; notes?: string }) {
    setSaving(true);
    await fetch(`/api/admin/enquiries/${enquiry.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await update({ status: newStatus });
  }

  const mailtoLink = `mailto:${enquiry.email}?subject=Re: ${enquiry.reference} — ${enquiry.subject || 'Your Enquiry'}&body=Dear ${enquiry.name},%0D%0A%0D%0AThank you for your enquiry (ref: ${enquiry.reference}).%0D%0A%0D%0A`;

  return (
    <div className="sticky top-20 space-y-4">
      {/* Status */}
      <div className="border border-[#222] bg-[#141414] p-5">
        <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-4">// Status</p>
        <div className="space-y-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className="w-full flex items-center justify-between px-4 py-2.5 border transition-all"
              style={{
                borderColor: status === s ? STATUS_COLOURS[s] : '#222',
                background: status === s ? `${STATUS_COLOURS[s]}15` : '#0D0D0D',
                color: status === s ? STATUS_COLOURS[s] : '#666',
              }}
            >
              <span className="font-ibm-plex-mono text-[11px] uppercase tracking-widest">{s}</span>
              {status === s && <CheckCircle className="h-4 w-4" />}
            </button>
          ))}
        </div>
        {saved && (
          <p className="font-ibm-plex-mono text-[9px] text-[#22C55E] uppercase tracking-widest mt-3 flex items-center gap-2">
            <CheckCircle className="h-3 w-3" /> Saved
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="border border-[#222] bg-[#141414] p-5">
        <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">// Internal Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes..."
          rows={5}
          className="w-full bg-[#0D0D0D] border border-[#222] text-white p-3 font-inter text-[13px] resize-none focus:outline-none focus:border-[#FF6900]"
        />
        <button
          onClick={() => update({ notes })}
          disabled={saving}
          className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#FF6900] transition-all"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>

      {/* Actions */}
      <div className="border border-[#222] bg-[#141414] p-5 space-y-2">
        <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-4">// Actions</p>

        {enquiry.email && (
          <a
            href={mailtoLink}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
          >
            <Mail className="h-4 w-4" /> Reply by Email
          </a>
        )}

        <button
          onClick={() => handleStatusChange('responded')}
          className="w-full flex items-center gap-3 px-4 py-3 border border-[#3B82F6]/40 text-[#3B82F6] font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#3B82F6]/10 transition-colors"
        >
          <CheckCircle className="h-4 w-4" /> Mark as Responded
        </button>

        <button
          onClick={() => handleStatusChange('closed')}
          className="w-full flex items-center gap-3 px-4 py-3 border border-[#22C55E]/40 text-[#22C55E] font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#22C55E]/10 transition-colors"
        >
          <XCircle className="h-4 w-4" /> Close Enquiry
        </button>
      </div>
    </div>
  );
}
