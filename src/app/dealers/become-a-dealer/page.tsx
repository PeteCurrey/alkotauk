'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  ShieldCheck,
  Truck,
  Flame,
  Award,
  CheckCircle2,
  Users,
  Wrench,
  ArrowRight,
  Loader2,
  Building,
  TrendingUp,
} from 'lucide-react';

export default function BecomeADealerPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    trading_name: '',
    contact_name: '',
    job_title: '',
    email: '',
    phone: '',
    website: '',
    address_line1: '',
    town: '',
    county: '',
    postcode: '',
    years_in_business: '5',
    territory_interest: '',
    current_brands_represented: '',
    workshop_facilities: true,
    mobile_service_capability: true,
    service_van_count: '2',
    additional_notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/dealers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Dealer application error:', err);
      setStatus('error');
    }
  };

  const pillars = [
    {
      icon: Award,
      title: '7-Year Coil Warranty',
      desc: 'Offer your industrial clients the only hydro-insulated Schedule 80 heating coil with a 7-year factory warranty. A clear commercial differentiator.',
    },
    {
      icon: TrendingUp,
      title: 'Protected Territory',
      desc: 'Exclusive regional postcode allocation with direct lead forwarding from our national digital platform and marketing campaigns.',
    },
    {
      icon: Wrench,
      title: 'UK Spares & Training',
      desc: 'Immediate dispatch on genuine parts from our central UK warehouse, plus hands-on technical training for your service engineers.',
    },
    {
      icon: Users,
      title: 'Direct Factory Support',
      desc: 'Direct line to Alkota application engineers for bespoke trailer specifications, multi-bay wash plants, and water recovery designs.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-alkota-black flex flex-col justify-between pt-32">
      <Navigation />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 w-full pb-24">
        <Breadcrumbs
          items={[
            { label: 'Dealers', href: '/dealers' },
            { label: 'Become an Authorised Dealer' },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
              COMMERCIAL PARTNERSHIP OPPORTUNITY
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-barlow-condensed text-6xl sm:text-8xl font-black uppercase italic tracking-tight text-alkota-black leading-[0.85] mb-6">
              JOIN THE UK <br />
              <span className="text-alkota-orange">AUTHORISED DEALER NETWORK.</span>
            </h1>
            <p className="font-inter text-lg sm:text-xl text-[#555] leading-relaxed max-w-3xl">
              We are expanding our network of premier cleaning equipment distributors, agricultural machinery dealers, and industrial service centres across key UK territories.
            </p>
          </div>
        </section>

        {/* Value Proposition Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white border border-[#D5D5D3] p-8 shadow-sm">
                <div className="h-12 w-12 bg-alkota-black text-alkota-orange flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-3">
                  {p.title}
                </h3>
                <p className="font-inter text-xs text-[#666] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* Application Form */}
        <section className="max-w-4xl mx-auto bg-white border border-[#D5D5D3] p-8 sm:p-12 lg:p-16 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-alkota-orange/10 text-alkota-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic text-alkota-black mb-4">
                Application Received
              </h2>
              <p className="font-inter text-sm text-[#666] max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you for your interest in representing Alkota UK. Our Commercial Director will review your application and territory interest, and contact you within 2 business days.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-10 border-b border-[#EAEAEA] pb-6">
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-bold uppercase tracking-widest block mb-1">
                  DEALER QUALIFICATION FORM
                </span>
                <h2 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-alkota-black">
                  Commercial & Operational Profile
                </h2>
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    REGISTERED COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Apex Industrial Systems Ltd"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    TRADING NAME (IF DIFFERENT)
                  </label>
                  <input
                    type="text"
                    value={formData.trading_name}
                    onChange={(e) => setFormData({ ...formData, trading_name: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Apex Pressure Washers"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    PRIMARY CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Mark Stevens"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    JOB TITLE / ROLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.job_title}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Managing Director"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    BUSINESS EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. mark@apexwash.co.uk"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    DIRECT TELEPHONE *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. 0114 2345678"
                  />
                </div>
              </div>

              {/* Location & Territory */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-t border-[#EAEAEA] pt-6">
                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    HEAD OFFICE TOWN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.town}
                    onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Sheffield"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    COUNTY *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. South Yorkshire"
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    POSTCODE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. S9 2HR"
                  />
                </div>
              </div>

              {/* Operational Capabilities */}
              <div className="mb-8 border-t border-[#EAEAEA] pt-6">
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                  TARGET UK REGION / POSTCODE TERRITORY *
                </label>
                <input
                  type="text"
                  required
                  value={formData.territory_interest}
                  onChange={(e) => setFormData({ ...formData, territory_interest: e.target.value })}
                  className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                  placeholder="e.g. South Yorkshire (S), North Notts (NG), Derbyshire (DE)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    CURRENT BRANDS REPRESENTED
                  </label>
                  <input
                    type="text"
                    value={formData.current_brands_represented}
                    onChange={(e) => setFormData({ ...formData, current_brands_represented: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    placeholder="e.g. Kärcher, Kranzle, Nilfisk..."
                  />
                </div>

                <div>
                  <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                    NUMBER OF MOBILE SERVICE VANS
                  </label>
                  <select
                    value={formData.service_van_count}
                    onChange={(e) => setFormData({ ...formData, service_van_count: e.target.value })}
                    className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                  >
                    <option value="1">1 Van</option>
                    <option value="2">2 - 3 Vans</option>
                    <option value="4">4 - 6 Vans</option>
                    <option value="7+">7+ Dedicated Fleet Vans</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block font-ibm-plex-mono text-[10px] font-bold uppercase text-[#777] mb-2">
                  WORKSHOP FACILITIES & APPLICATION EXPERIENCE
                </label>
                <textarea
                  rows={4}
                  value={formData.additional_notes}
                  onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                  className="w-full bg-[#F8F8F7] border border-[#D5D5D3] p-4 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                  placeholder="Outline your existing customer base (agriculture, plant hire, fleet transport), workshop facilities, test bench, and commercial ambitions with Alkota..."
                />
              </div>

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-ibm-plex-mono text-xs">
                  Error submitting application. Please ensure all required fields are filled, or email director@alkota.co.uk directly.
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
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Dealership Application</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
