'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, Package, AlertTriangle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const URGENCY_OPTIONS = [
  { value: 'emergency_breakdown', label: 'Emergency Breakdown — Machine Down', colour: 'text-red-400' },
  { value: 'urgent',             label: 'Urgent — Within 24 Hours',           colour: 'text-amber-400' },
  { value: 'standard',           label: 'Standard — 2–5 Working Days',         colour: 'text-white' },
  { value: 'planned_maintenance',label: 'Planned Maintenance Order',           colour: 'text-[#AAA]' },
];

export default function EnquiryFormClient() {
  const searchParams = useSearchParams();
  const prefillPart = searchParams.get('part') || '';

  const [form, setForm] = useState({
    customer_name: '',
    company: '',
    email: '',
    phone: '',
    postcode: '',
    machine_model: '',
    serial_number: '',
    urgency: 'standard',
    notes: '',
    parts_text: prefillPart ? `Part Number: ${prefillPart}\nQuantity: 1` : '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'parts_enquiry',
          ...form,
          requested_parts: [{ part_number: prefillPart || 'ENQUIRY', name: form.parts_text, quantity: 1 }],
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const d = await res.json();
        setErrorMsg(d.error || 'Submission failed. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  const inputClass = 'w-full bg-[#F5F5F2] border border-[#E0E0DA] text-alkota-black px-4 py-3 text-sm focus:outline-none focus:border-alkota-orange transition-colors';
  const labelClass = 'block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5';

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-6" />
          <h2 className="font-extralight text-3xl text-alkota-black mb-4">Enquiry Received</h2>
          <p className="text-[#666] text-sm leading-relaxed mb-8">
            Thank you. Our parts team will review your enquiry and respond within 24 hours with availability and pricing.
          </p>
          <Link
            href="/parts-attachments"
            className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Parts Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      <div className="mb-10">
        <Link
          href="/parts-attachments"
          className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Parts Catalogue
        </Link>
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
          // Parts Enquiry
        </span>
        <h1 className="font-extralight text-4xl lg:text-5xl text-alkota-black tracking-tight mb-4">
          Parts Request &amp; Enquiry
        </h1>
        <p className="text-[#666] text-base leading-relaxed max-w-2xl">
          Complete the form below and our parts team will confirm availability and pricing within one working day. For emergency breakdowns, call us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-8">
          <form onSubmit={submit} className="space-y-6">
            {/* Contact */}
            <div className="border border-[#E8E8E4] bg-white p-8">
              <h3 className="font-light text-lg text-alkota-black mb-6 pb-4 border-b border-[#E8E8E4]">
                Your Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input required value={form.customer_name} onChange={e => set('customer_name', e.target.value)} className={inputClass} placeholder="John Smith" />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input value={form.company} onChange={e => set('company', e.target.value)} className={inputClass} placeholder="ABC Cleaning Ltd" />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} placeholder="john@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputClass} placeholder="+44 7700 000000" />
                </div>
                <div>
                  <label className={labelClass}>Postcode</label>
                  <input value={form.postcode} onChange={e => set('postcode', e.target.value)} className={inputClass} placeholder="SW1A 1AA" />
                </div>
              </div>
            </div>

            {/* Machine */}
            <div className="border border-[#E8E8E4] bg-white p-8">
              <h3 className="font-light text-lg text-alkota-black mb-6 pb-4 border-b border-[#E8E8E4]">
                Machine Information <span className="text-[#AAA] font-normal text-sm">(if known)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Machine Model</label>
                  <input value={form.machine_model} onChange={e => set('machine_model', e.target.value)} className={inputClass} placeholder="e.g. Alkota 430XH4" />
                </div>
                <div>
                  <label className={labelClass}>Serial Number</label>
                  <input value={form.serial_number} onChange={e => set('serial_number', e.target.value)} className={inputClass} placeholder="e.g. 2019-430-12345" />
                </div>
              </div>
            </div>

            {/* Parts */}
            <div className="border border-[#E8E8E4] bg-white p-8">
              <h3 className="font-light text-lg text-alkota-black mb-6 pb-4 border-b border-[#E8E8E4]">
                Parts Required
              </h3>
              <div className="mb-4">
                <label className={labelClass}>Urgency *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {URGENCY_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer border border-[#E8E8E4] hover:border-alkota-orange p-3 transition-colors">
                      <input
                        type="radio"
                        name="urgency"
                        value={opt.value}
                        checked={form.urgency === opt.value}
                        onChange={() => set('urgency', opt.value)}
                        className="accent-alkota-orange"
                      />
                      <span className="text-sm text-alkota-black">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Parts List — part numbers, names, quantities *</label>
                <textarea
                  required
                  value={form.parts_text}
                  onChange={e => set('parts_text', e.target.value)}
                  rows={6}
                  className={inputClass + ' resize-y'}
                  placeholder={'Part Number: ALK-PMP-001, Qty: 1\nPart Number: MOS-SC-001, Qty: 2\nOr describe what you need...'}
                />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  rows={3}
                  className={inputClass + ' resize-y'}
                  placeholder="Any additional context, fault descriptions, or special requirements..."
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-sm">{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-alkota-black text-white px-10 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all disabled:opacity-60"
            >
              {status === 'sending' ? 'Submitting...' : 'Submit Parts Enquiry'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-alkota-black text-white p-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
              // Emergency Breakdown
            </span>
            <h3 className="font-light text-xl text-white mb-3">Machine down?</h3>
            <p className="text-[#AAA] text-sm leading-relaxed mb-6">
              Call our parts desk direct. We carry extensive OEM stock and can arrange same-day despatch for emergency breakdowns.
            </p>
            <a
              href="tel:+441234567890"
              className="flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-white hover:text-alkota-black transition-colors"
            >
              Call Parts Desk
            </a>
          </div>

          <div className="border border-[#E8E8E4] bg-white p-6">
            <Package className="w-6 h-6 text-alkota-orange mb-3" />
            <h4 className="font-light text-base text-alkota-black mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-[#666]">
              {[
                'We receive and review your enquiry',
                'Parts team confirms availability',
                'Quote provided within 24 hours',
                'Order placed & despatched',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange mt-0.5 shrink-0">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
