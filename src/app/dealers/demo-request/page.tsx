'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SafeImage from '@/components/ui/SafeImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle2, Loader2, Truck, ArrowRight, Phone, Clock } from 'lucide-react';

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
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── CHAPTER 01: IMMERSIVE DEMONSTRATION HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-between bg-[#0A0A0A] text-white px-6 sm:px-12 lg:px-24 pt-32 pb-16 overflow-hidden border-b border-[#222]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/assets/hot-water-gauge-hero.jpg"
            alt="Alkota On-Site Demonstration Vehicle"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
        </div>

        {/* Top Breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-2">
          <Breadcrumbs
            items={[
              { label: 'Dealers', href: '/dealers' },
              { label: 'Book On-Site Demonstration' },
            ]}
          />
        </div>

        {/* Hero Centrepiece */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 bg-alkota-orange rounded-full animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#AAA]">
                Field Performance Verification // UK Mobile Fleet
              </span>
            </div>

            <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.98] mb-6">
              Book An On-Site <br />
              <span className="text-alkota-orange italic font-normal">
                Machine Demonstration.
              </span>
            </h1>

            <p className="font-light text-lg sm:text-2xl text-[#CCC] leading-relaxed max-w-2xl mb-8">
              We bring the machine. You provide the problem. Experience Alkota heat, pressure, and steam on your own facility tackling your real-world contamination.
            </p>

            <div className="flex items-center gap-6 font-mono text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-alkota-orange" />
                Mobile Van Dispatch
              </span>
              <span>·</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-alkota-orange" />
                Zero Commercial Obligation
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Hero Metric Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#777] block mb-0.5">Availability</span>
            <span className="text-white font-light text-base">England, Scotland &amp; Wales</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#777] block mb-0.5">Fleet Coverage</span>
            <span className="text-white font-light text-base">18+ Demonstration Vans</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#777] block mb-0.5">Power Supply</span>
            <span className="text-white font-light text-base">Self-Powered &amp; 400V</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#777] block mb-0.5">Turnaround</span>
            <span className="text-white font-light text-base">Booked in 24–48 Hours</span>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: WHAT HAPPENS ON THE DAY (EDITORIAL 3-STEP STORY) ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto bg-[#FAF9F5] border-b border-[#E8E7E0]">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
            The Protocol
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight leading-tight mb-4">
            How an on-site Alkota trial works.
          </h2>
          <p className="text-base text-[#666] font-normal leading-relaxed">
            We do not run showroom presentations on clean floorboards. We test on your toughest vehicle chassis, heat exchanger, or wash pad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 border-t border-[#1A1A18] pt-10">
          <div>
            <span className="font-mono text-sm text-alkota-orange font-medium block mb-3">01 // WE BRING THE MACHINE</span>
            <h3 className="font-light text-lg text-alkota-black mb-2">Accredited Service Van Arrival</h3>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
              An authorised application engineer arrives with the specified Alkota machine, high-pressure hoses, nozzles, and chemical dosing systems ready for immediate deployment.
            </p>
          </div>

          <div>
            <span className="font-mono text-sm text-alkota-orange font-medium block mb-3">02 // YOUR SITE REQUIREMENTS</span>
            <h3 className="font-light text-lg text-alkota-black mb-2">Standard Water Supply</h3>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
              All you need to provide is a standard 3/4" water tap or IBC bowser and the equipment or surface you need cleaned. We provide all electrical generators or fuel if self-powered.
            </p>
          </div>

          <div>
            <span className="font-mono text-sm text-alkota-orange font-medium block mb-3">03 // COMPARATIVE BENCHMARK</span>
            <h3 className="font-light text-lg text-alkota-black mb-2">Side-by-Side Verification</h3>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
              We test speed, water consumption, and thermal grease removal directly against your existing equipment, proving the tangible operational difference on your premises.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03: INTEGRATED BOOKING FORM ── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
        <div className="mb-14 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
            Reservation Schedule
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl text-alkota-black tracking-tight leading-tight mb-4">
            Schedule Your On-Site Verification
          </h2>
          <p className="text-base text-[#666] font-normal max-w-2xl">
            Complete the operational details below. Your local authorised Alkota dealer will telephone you to confirm machine availability and schedule the van arrival.
          </p>
        </div>

        {status === 'success' && routedResult ? (
          <div className="bg-white border-2 border-alkota-orange p-8 sm:p-14 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-alkota-orange/10 flex items-center justify-center text-alkota-orange shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-alkota-orange font-medium uppercase tracking-widest">
                  DEMONSTRATION SCHEDULE LOGGED
                </span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase text-alkota-black">
                  Routed to Your Local Specialist
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#555] mb-8 leading-relaxed font-normal">
              Thank you, <strong>{formData.customer_name}</strong>. Your on-site demonstration enquiry has been routed directly to your authorised regional technical centre:
            </p>

            <div className="bg-[#FAF9F5] border border-[#E8E7E0] p-6 mb-8">
              <span className="font-mono text-[9px] font-medium uppercase text-alkota-orange tracking-widest block mb-2">
                ASSIGNED REGIONAL PARTNER
              </span>
              <h4 className="font-light text-2xl uppercase text-alkota-black mb-1">
                {routedResult.matchedDealer?.name}
              </h4>
              <p className="text-xs text-[#666] mb-4">
                {routedResult.matchedDealer?.town}, {routedResult.matchedDealer?.county}
              </p>
              <div className="flex items-center gap-2 font-mono text-xs font-medium text-alkota-black">
                <Phone className="h-4 w-4 text-alkota-orange" />
                <span>{routedResult.matchedDealer?.phone}</span>
              </div>
            </div>

            <p className="text-xs text-[#777] mb-8 font-normal">
              An application engineer will contact you by telephone within 1 working day to confirm water connection specifications and demonstration arrival time.
            </p>

            <Link
              href="/dealers"
              className="inline-flex items-center gap-2 bg-alkota-black text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
            >
              <span>Return to Dealer Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* GROUP 01: ABOUT YOU */}
            <div className="border-t border-[#1A1A18] pt-8">
              <div className="mb-6">
                <span className="font-mono text-xs text-alkota-orange font-medium block mb-1">01 // CONTACT IDENTITY</span>
                <h3 className="font-light text-xl text-alkota-black">Your Contact Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. David Richardson"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    COMPANY / FACILITY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_company}
                    onChange={(e) => setFormData({ ...formData, customer_company: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Apex Transport Logistics Ltd"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="david@apextransport.co.uk"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    TELEPHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="07700 900123 / 01246 000000"
                  />
                </div>
              </div>
            </div>

            {/* GROUP 02: LOCATION */}
            <div className="border-t border-[#E8E7E0] pt-8">
              <div className="mb-6">
                <span className="font-mono text-xs text-alkota-orange font-medium block mb-1">02 // SITE LOCATION</span>
                <h3 className="font-light text-xl text-alkota-black">Demonstration Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    FACILITY POSTCODE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_postcode}
                    onChange={(e) => setFormData({ ...formData, customer_postcode: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none uppercase"
                    placeholder="e.g. S42 5UY"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    TOWN / CITY *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_town}
                    onChange={(e) => setFormData({ ...formData, customer_town: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Chesterfield"
                  />
                </div>
              </div>
            </div>

            {/* GROUP 03: MACHINERY & APPLICATION */}
            <div className="border-t border-[#E8E7E0] pt-8">
              <div className="mb-6">
                <span className="font-mono text-xs text-alkota-orange font-medium block mb-1">03 // APPLICATION SCOPE</span>
                <h3 className="font-light text-xl text-alkota-black">Cleaning Target &amp; Machine Choice</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    PRIMARY MACHINE PLATFORM
                  </label>
                  <select
                    value={formData.product_category}
                    onChange={(e) => setFormData({ ...formData, product_category: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                  >
                    <option value="hot-water">Hot Water Pressure Washers (Up to 95°C)</option>
                    <option value="cold-water">High-Flow Industrial Cold Water</option>
                    <option value="steam">140°C Saturated Dry Vapour Steam</option>
                    <option value="parts-washers">Aqueous Rotary Parts Washers</option>
                    <option value="trailers">Bespoke Mobile Wash Trailers</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                    SPECIFIC MODEL (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.product_name}
                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Alkota 4305X4 or Leave Blank for Expert Match"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666] mb-2">
                  CONTAMINATION &amp; APPLICATION NOTES
                </label>
                <textarea
                  rows={3}
                  value={formData.application_notes}
                  onChange={(e) => setFormData({ ...formData, application_notes: e.target.value })}
                  className="w-full bg-white border border-[#D5D5D0] px-4 py-3.5 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none"
                  placeholder="Describe what you are cleaning (e.g. 20x tractor units with road film, heavy hydraulic oil on plant equipment, conveyor degreasing)..."
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="border-t border-[#1A1A18] pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-xs text-[#777] font-normal">
                Zero spam. Your details are used solely to coordinate the demonstration van arrival.
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-black text-white px-10 py-4 font-mono text-xs uppercase tracking-widest transition-all font-medium shadow-lg disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Routing Request...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Demonstration Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                An error occurred while submitting your demonstration request. Please check all fields or call 01246 000000 directly.
              </div>
            )}
          </form>
        )}
      </section>
    </div>
  );
}

export default function DemoRequestPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">Loading...</div>}>
        <DemoRequestInner />
      </Suspense>
      <Footer />
    </>
  );
}
