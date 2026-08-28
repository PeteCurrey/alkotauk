'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Loader2, FileText, Phone } from 'lucide-react';

export default function WarrantyPage() {
  const [formData, setFormData] = useState({
    owner_name: '',
    company_name: '',
    email: '',
    phone: '',
    postcode: '',
    serial_number: '',
    model_number: '',
    purchased_from: '',
    purchase_date: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/dealers/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.owner_name,
          customer_company: formData.company_name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_postcode: formData.postcode,
          product_name: formData.model_number,
          lead_type: 'service',
          application_notes: `Warranty Registration — Serial: ${formData.serial_number}, Dealer: ${formData.purchased_from}, Date: ${formData.purchase_date}`,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Warranty submission error:', err);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-0 text-white flex flex-col justify-between">
      <Navigation />

      <div className="container mx-auto max-w-5xl px-6 flex-1 pb-24">
        <Breadcrumbs
          items={[
            { label: 'Support', href: '/support' },
            { label: 'Warranty & Registration' },
          ]}
        />

        <div className="mt-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
              FACTORY PROTECTION POLICY
            </span>
          </div>
          <h1 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.88] mb-4">
            7-YEAR COIL WARRANTY <br />
            <span className="text-alkota-orange">& REGISTRATION.</span>
          </h1>
          <p className="font-inter text-base sm:text-lg text-alkota-silver max-w-3xl leading-relaxed">
            Alkota Cleaning Systems carry the most respected warranty terms in industrial pressure washing — anchored by a genuine 7-year factory warranty on our patented hydro-insulated Schedule 80 heating coils.
          </p>
        </div>

        {/* Warranty Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 font-ibm-plex-mono text-xs">
          <div className="bg-[#141414] border border-alkota-orange p-6">
            <span className="text-alkota-orange font-bold uppercase block text-[9px] mb-2">PRIMARY DEFENSE</span>
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
              7 Years Heating Coil
            </h3>
            <p className="font-inter text-alkota-silver text-xs leading-relaxed">
              Full replacement coverage on Schedule 80 ASTM A53 heating coils against manufacturing rupture or weld failure.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6">
            <span className="text-[#888] font-bold uppercase block text-[9px] mb-2">HYDRAULIC CORE</span>
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
              5 Years Triplex Pump
            </h3>
            <p className="font-inter text-alkota-silver text-xs leading-relaxed">
              Industrial ceramic plunger triplex pumps covered by genuine General / Cat pump factory warranties.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6">
            <span className="text-[#888] font-bold uppercase block text-[9px] mb-2">DRIVE & CONTROLS</span>
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
              1 Year Motors & Burner
            </h3>
            <p className="font-inter text-alkota-silver text-xs leading-relaxed">
              Complete coverage on Wayne combustion burners, industrial electric motors, and chassis fabrication.
            </p>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-[#111] border border-[#333] p-8 sm:p-12 max-w-3xl mx-auto shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-alkota-orange mx-auto mb-4" />
              <h2 className="font-barlow-condensed text-3xl font-bold uppercase text-white mb-2">
                Machine Registered Successfully
              </h2>
              <p className="font-inter text-xs text-alkota-silver max-w-md mx-auto mb-6">
                Your Alkota machine (Serial: <strong>{formData.serial_number}</strong>) is now recorded in our central UK service registry. A confirmation copy has been dispatched to {formData.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="border-b border-[#222] pb-6 mb-8">
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange font-bold uppercase tracking-widest block mb-1">
                  ACTIVATE YOUR 7-YEAR PROTECTION
                </span>
                <h2 className="font-barlow-condensed text-3xl font-bold uppercase text-white">
                  Machine Registration Portal
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    OWNER / OPERATOR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.owner_name}
                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Michael Davies"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Davies Transport Ltd"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. michael@daviestransport.co.uk"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    TELEPHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. 07912 345678"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    MACHINE SERIAL NUMBER *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.serial_number}
                    onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="Found on data plate (e.g. AL-84920)"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    MACHINE MODEL NUMBER *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model_number}
                    onChange={(e) => setFormData({ ...formData, model_number: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. 420X4 or 311AX4"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    PURCHASED FROM (DEALER)
                  </label>
                  <input
                    type="text"
                    value={formData.purchased_from}
                    onChange={(e) => setFormData({ ...formData, purchased_from: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Peak Industrial Pressure Systems"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase text-[#888] mb-2">
                    INSTALLATION POSTCODE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] p-3 font-ibm-plex-mono text-xs text-white focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. S42 5UY"
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="mb-6 p-3 bg-red-900/30 border border-red-800 text-red-300 font-ibm-plex-mono text-xs">
                  Error submitting registration. Please verify required fields or call our central technical desk.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-alkota-orange text-white py-4 px-6 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Registering Warranty...</span>
                  </>
                ) : (
                  <>
                    <span>Register Machine Warranty</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
