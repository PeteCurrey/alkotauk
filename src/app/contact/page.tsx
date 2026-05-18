'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialEnquiry = searchParams.get('enquiry') || searchParams.get('machine') || searchParams.get('subject') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    enquiry: initialEnquiry,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (initialEnquiry) {
      setFormData(prev => ({ ...prev, enquiry: initialEnquiry }));
    }
  }, [initialEnquiry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_page',
          subject: formData.enquiry ? `Enquiry: ${formData.enquiry}` : 'General Web Enquiry'
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', enquiry: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left: Contact Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8 bg-alkota-iron/20 border border-alkota-iron p-8 md:p-14 relative"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="h-[2px] w-8 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.3em] text-alkota-orange">
            Direct Dispatch
          </span>
        </div>

        <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
          Send An Enquiry
        </h2>
        <p className="text-alkota-grey text-sm mb-12 max-w-2xl">
          Our specialized UK engineering team responds to all technical machinery, bespoke trailer, water treatment, and service inquiries within 2 hours during normal business operations.
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-950/40 border border-emerald-500/30 p-12 text-center"
          >
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
            <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-2">Enquiry Successfully Dispatched</h3>
            <p className="text-emerald-300/80 text-sm max-w-md mx-auto mb-8">
              Thank you. Your message has been routed directly to <span className="text-white font-bold">sales@alkota.co.uk</span> and our engineering advisory team.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-2 bg-emerald-500 px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-wider text-alkota-black hover:bg-emerald-400 transition-colors"
            >
              <span>Send Another Message</span>
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Arthur Shelby"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Corporate Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. arthur@shelbycompany.co.uk"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Shelby Company Ltd"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Telephone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +44 (0) 121 456 7890"
                  className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Enquiry Subject / Model Reference</label>
              <input
                type="text"
                value={formData.enquiry}
                onChange={e => setFormData({ ...formData, enquiry: e.target.value })}
                placeholder="e.g. Alkota 8-VFS-1 Series / Bespoke Wash Bay"
                className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-silver mb-2">Message & Application Requirements</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please provide details of your flow rate, pressure, heating, or environmental compliance requirements..."
                className="w-full bg-alkota-black border border-alkota-iron p-4 text-white font-medium focus:border-alkota-orange focus:outline-none transition-colors text-sm placeholder:text-alkota-grey/50"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-950/40 border border-red-500/30 p-4 flex items-center gap-3 text-red-400 text-xs font-ibm-plex-mono">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>Unable to dispatch message. Please ensure your details are correct or email sales@alkota.co.uk directly.</span>
              </div>
            )}

            <button
              disabled={status === 'submitting'}
              type="submit"
              className="w-full bg-alkota-orange p-5 font-ibm-plex-mono text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Transmit Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Right: Contact Info Cards */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4 space-y-6"
      >
        <div className="bg-alkota-steel p-8 border border-alkota-iron">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="h-6 w-6 text-alkota-orange" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white">Direct Email</h3>
          </div>
          <p className="text-alkota-grey text-xs leading-relaxed mb-4">For general sales, supplier queries, and quotation requests:</p>
          <a href="mailto:sales@alkota.co.uk" className="font-ibm-plex-mono text-lg font-bold text-alkota-orange hover:underline block">
            sales@alkota.co.uk
          </a>
        </div>

        <div className="bg-alkota-steel p-8 border border-alkota-iron">
          <div className="flex items-center gap-4 mb-4">
            <Phone className="h-6 w-6 text-alkota-orange" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white">Telephone Support</h3>
          </div>
          <p className="text-alkota-grey text-xs leading-relaxed mb-4">Connect with our UK technical advisory office during business hours:</p>
          <a href="tel:+4401214567890" className="font-ibm-plex-mono text-lg font-bold text-white hover:text-alkota-orange transition-colors block">
            +44 (0) 121 456 7890
          </a>
        </div>

        <div className="bg-alkota-steel p-8 border border-alkota-iron">
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="h-6 w-6 text-alkota-orange" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white">UK Distribution Centre</h3>
          </div>
          <p className="text-alkota-grey text-xs leading-relaxed">
            Alkota Cleaning Systems UK<br />
            Industrial Estate Parkway<br />
            Birmingham, B1 1AA<br />
            United Kingdom
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-alkota-bg pt-32 pb-24 overflow-x-hidden min-h-screen">
      <Navigation />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-10 right-0 pointer-events-none select-none opacity-[0.03] z-0">
          <span className="font-barlow-condensed text-[30vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            CONTACT
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Support', href: '/support' }, { label: 'Contact' }]} />
          
          <div className="mt-12 mb-16">
            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-alkota-black leading-none mb-4">
              Get In Touch
            </h1>
            <p className="font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-widest">
              Industrial Heavy Duty Cleaning Systems — UK Engineering Office
            </p>
          </div>

          <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-alkota-orange" /></div>}>
            <ContactFormInner />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
