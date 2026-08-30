'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface RequestPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id?: string;
    name: string;
    slug?: string;
    category?: string;
    series?: string;
    pressure_bar?: number | string;
    flow_rate_lpm?: number | string;
  };
}

export default function RequestPricingModal({ isOpen, onClose, product }: RequestPricingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    quantity: '1',
    timeline: 'immediate',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'request_pricing',
          enquiry: 'quote',
          product_id: product.id,
          product_name: product.name,
          category: product.category,
          subject: `Quotation Request — ${product.name}`,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error('Pricing request error:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 shadow-2xl text-white my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#777] hover:text-white hover:bg-[#222] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.25em] text-alkota-orange">
              DIRECT FACTORY QUOTATION
            </span>
          </div>

          <h3 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-white mb-2">
            Request Pricing · <span className="text-alkota-orange">{product.name}</span>
          </h3>

          <p className="font-inter text-xs text-[#AAA] mb-8 leading-relaxed">
            Receive official UK factory pricing, trade discounts, lead times, and power/pressure validation from Alkota engineers within 2 business hours.
          </p>

          {status === 'success' ? (
            <div className="py-12 text-center bg-emerald-950/30 border border-emerald-500/30 p-8">
              <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-2">
                Quotation Request Dispatched
              </h4>
              <p className="font-inter text-xs text-[#CCC] max-w-md mx-auto mb-6">
                Thank you. Your request for <strong className="text-white">{product.name}</strong> has been assigned to an Alkota UK technical specialist.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white text-black font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-inter text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. James Wilson"
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm placeholder:text-[#555]"
                  />
                </div>
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Business Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. james@contractors.co.uk"
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm placeholder:text-[#555]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Company / Trading Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Wilson Fleet Services Ltd"
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm placeholder:text-[#555]"
                  />
                </div>
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Telephone Number *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +44 (0) 7912 345678"
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm placeholder:text-[#555]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Quantity Required</label>
                  <select
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm"
                  >
                    <option value="1">1 Unit</option>
                    <option value="2-3">2–3 Units (Multi-Unit Fleet)</option>
                    <option value="4+">4+ Units (Bulk / Depot Deployment)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Purchase Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm"
                  >
                    <option value="immediate">Immediate (Ready to Buy)</option>
                    <option value="1_month">Within 30 Days</option>
                    <option value="budgetary">Budgetary / CapEx Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-1.5">Application Scope or Optional Upgrades</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Hose length needed, generator mounting, wash bay setup, trade-in..."
                  className="w-full bg-[#090909] border border-[#2A2A2A] p-3 text-white focus:border-alkota-orange focus:outline-none text-sm placeholder:text-[#555] resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-ibm-plex-mono flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Unable to dispatch quotation request. Please check your entries.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-4 bg-alkota-orange text-white py-4 font-ibm-plex-mono text-xs font-black uppercase tracking-[0.25em] hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Request Official Pricing</span>
                  </>
                )}
              </button>

              <div className="pt-3 flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#666]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-[#FF6900]" /> 7-Year Coil Warranty Standard
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#FF6900]" /> 2-Hour Response Time
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
