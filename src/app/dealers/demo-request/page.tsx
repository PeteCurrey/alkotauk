'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle2, Loader2, Truck, ShieldCheck, Flame, Droplets, ArrowRight, MapPin, Phone } from 'lucide-react';

function DemoRequestInner() {
  const searchParams = useSearchParams();
  const dealerParam = searchParams.get('dealer') || '';
  const machineParam = searchParams.get('machine') || '';

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_company: '',
    customer_email: '',
    customer_phone: '',
    customer_postcode: '',
    customer_town: '',
    product_category: 'hot-water',
    product_name: machineParam,
    application_notes: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [routedResult, setRoutedResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/dealers/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lead_type: 'demo',
          dealer_slug: dealerParam || undefined,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRoutedResult(data);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Demo request error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <Breadcrumbs
        items={[
          { label: 'Dealers', href: '/dealers' },
          { label: 'Book On-Site Demonstration' },
        ]}
      />

      <div className="mt-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
            FIELD PERFORMANCE VERIFICATION
          </span>
        </div>
        <h1 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-4">
          BOOK AN ON-SITE <br />
          <span className="text-alkota-orange">MACHINE DEMONSTRATION.</span>
        </h1>
        <p className="font-inter text-base text-[#555] leading-relaxed max-w-2xl">
          Experience Alkota heat, pressure, and steam on your own site, tackling your real-world contamination. Our regional authorised service vans bring machines directly to your yard or facility.
        </p>
      </div>

      {status === 'success' && routedResult ? (
        <div className="bg-white border-2 border-alkota-orange p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-alkota-orange/10 flex items-center justify-center text-alkota-orange">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-bold uppercase tracking-widest">
                DEMONSTRATION REQUEST LOGGED
              </span>
              <h2 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-alkota-black">
                Routing to Your Local Specialist
              </h2>
            </div>
          </div>

          <p className="font-inter text-sm text-[#555] mb-8 leading-relaxed">
            Thank you, <strong>{formData.customer_name}</strong>. Your on-site demonstration enquiry has been routed directly to your authorised regional technical centre:
          </p>

          <div className="bg-[#F8F8F7] border border-[#D5D5D3] p-6 mb-8">
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase text-alkota-orange tracking-widest block mb-2">
              ASSIGNED ALKOTA PARTNER
            </span>
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
              {routedResult.matchedDealer?.name}
            </h3>
            <p className="font-inter text-xs text-[#666] mb-4">
              {routedResult.matchedDealer?.town}, {routedResult.matchedDealer?.county}
            </p>
            <div className="flex items-center gap-2 font-ibm-plex-mono text-xs font-bold text-alkota-black">
              <Phone className="h-4 w-4 text-alkota-orange" />
              <span>{routedResult.matchedDealer?.phone}</span>
            </div>
          </div>

          <p className="font-inter text-xs text-[#777] mb-8">
            An application engineer will contact you by telephone within 1 working day to confirm machine availability, water connection, and demonstration schedule.
          </p>

          <Link
            href="/dealers"
            className="inline-flex items-center gap-2 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors"
          >
            <span>Return to Dealer Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#D5D5D3] p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                YOUR FULL NAME *
              </label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. David Richardson"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                COMPANY / TRADING NAME
              </label>
              <input
                type="text"
                value={formData.customer_company}
                onChange={(e) => setFormData({ ...formData, customer_company: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. Richardson Haulage Ltd"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. david@richardsonhaulage.co.uk"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                TELEPHONE NUMBER *
              </label>
              <input
                type="tel"
                required
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. 07912 345678"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                SITE POSTCODE (FOR DEMO VAN DISPATCH) *
              </label>
              <input
                type="text"
                required
                value={formData.customer_postcode}
                onChange={(e) => setFormData({ ...formData, customer_postcode: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. S42 5UY or M17 1JT"
              />
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                TOWN / LOCATION
              </label>
              <input
                type="text"
                value={formData.customer_town}
                onChange={(e) => setFormData({ ...formData, customer_town: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. Chesterfield"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-[#EAEAEA] pt-6">
            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                EQUIPMENT TYPE TO TEST
              </label>
              <select
                value={formData.product_category}
                onChange={(e) => setFormData({ ...formData, product_category: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
              >
                <option value="hot-water">Hot Water High-Pressure Systems</option>
                <option value="cold-water">Cold Water Industrial Washers</option>
                <option value="steam">Dry Vapour Steam Cleaners</option>
                <option value="trailer">Mobile Highway Wash Trailers</option>
                <option value="parts-washer">Aqueous Automatic Parts Washers</option>
                <option value="water-treatment">Closed-Loop Water Recovery & Filtration</option>
              </select>
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
                SPECIFIC MODEL (OPTIONAL)
              </label>
              <input
                type="text"
                value={formData.product_name}
                onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                placeholder="e.g. 420X4, 311AX4, AL3040"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">
              DESCRIBE THE CLEANING CHALLENGE / SOILING TYPE
            </label>
            <textarea
              rows={4}
              value={formData.application_notes}
              onChange={(e) => setFormData({ ...formData, application_notes: e.target.value })}
              className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-4 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
              placeholder="e.g. Heavy dried clay and diesel grease on excavator tracks; food-grade grease in processing tanks; oil removal from transport trailers..."
            />
          </div>

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-ibm-plex-mono text-xs">
              Unable to submit demonstration request. Please verify your contact details or call our central technical desk on +44 7912 506738.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-alkota-orange text-white py-5 px-8 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Routing to Nearest Authorised Van...</span>
              </>
            ) : (
              <>
                <span>Submit Demonstration Request</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function DemoRequestPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F7] text-alkota-black flex flex-col justify-between">
      <Navigation />
      <Suspense fallback={<div className="min-h-screen pt-40 text-center text-xs font-ibm-plex-mono">Loading...</div>}>
        <DemoRequestInner />
      </Suspense>
      <Footer />
    </main>
  );
}
