'use client';

import { useState, useEffect } from 'react';
import { Phone, Send } from 'lucide-react';

interface MaintenanceSettings {
  maintenance_message?: string;
  maintenance_phone?: string;
  maintenance_lead_capture?: string;
  maintenance_lead_heading?: string;
}

export default function MaintenancePage() {
  const [settings, setSettings] = useState<MaintenanceSettings>({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin bypass (they must have the JWT cookie — middleware lets them through)
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch('/api/admin/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'maintenance-lead',
        name, email, phone,
        subject: 'Maintenance mode lead capture',
      }),
    });
    setSubmitted(true);
    setSubmitting(false);
  }

  const showLeadCapture = settings.maintenance_lead_capture !== 'false';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="h-1 w-24 bg-[#FF6900] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="font-barlow-condensed text-[30vw] font-black uppercase italic text-white whitespace-nowrap">
          ALKOTA
        </span>
      </div>

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Logo */}
        <div className="mb-10">
          <p className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.5em] text-white">ALKOTA UK</p>
          <div className="h-px w-16 bg-[#FF6900] mx-auto mt-3" />
        </div>

        {/* Status eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-[#FF6900] animate-pulse" />
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.4em] text-[#FF6900]">
            // System Status
          </span>
        </div>

        <h1 className="font-barlow-condensed text-6xl font-black uppercase italic text-white leading-none mb-4">
          SCHEDULED<br />
          <span className="text-[#FF6900]">MAINTENANCE</span>
        </h1>

        <p className="font-inter text-[15px] text-[#888] leading-relaxed mb-10 max-w-md mx-auto">
          {settings.maintenance_message || 'The platform is currently undergoing scheduled upgrades to enhance performance and catalogue accuracy.'}
        </p>

        {/* Phone */}
        <a
          href={`tel:${settings.maintenance_phone || '+447912506738'}`}
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#333] bg-[#111] hover:border-[#FF6900] hover:bg-[#FF6900] transition-all group mb-10"
        >
          <Phone className="h-4 w-4 text-[#FF6900] group-hover:text-white" />
          <span className="font-barlow-condensed text-xl font-black italic text-white">
            {settings.maintenance_phone || '+447912506738'}
          </span>
        </a>

        {/* Lead Capture Form */}
        {showLeadCapture && !submitted && (
          <div className="border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-left mt-4">
            <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] mb-2">
              {settings.maintenance_lead_heading || 'Need immediate assistance?'}
            </p>
            <p className="font-inter text-[13px] text-[#666] mb-5">
              Leave your details and we&apos;ll be in touch as soon as we&apos;re back online.
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input
                value={name} onChange={e => setName(e.target.value)} required
                placeholder="Your name" type="text"
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
              />
              <input
                value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="Email address" type="email"
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
              />
              <input
                value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Phone (optional)" type="tel"
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
              />
              <button
                type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-3 bg-[#FF6900] text-white py-3.5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#e55f00] transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {submitting ? 'Sending...' : 'Keep me updated'}
              </button>
            </form>
          </div>
        )}

        {submitted && (
          <div className="border border-[#22C55E]/30 bg-[#22C55E]/5 p-5 mt-4">
            <p className="font-barlow-condensed text-xl font-black italic text-[#22C55E]">Received. We&apos;ll be in touch.</p>
            <p className="font-inter text-[13px] text-[#888] mt-1">Our team will contact you as soon as the site is back online.</p>
          </div>
        )}

        {/* Admin bypass link — only visible to admins who can see through maintenance */}
        <div className="mt-12">
          <a href="/admin" className="font-ibm-plex-mono text-[9px] text-[#222] hover:text-[#444] transition-colors uppercase tracking-widest">
            admin
          </a>
        </div>
      </div>
    </div>
  );
}
