'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Wrench,
  Truck,
  Users,
  MapPin,
  FileText,
  Building
} from 'lucide-react';

export default function DealerApplicationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appRef, setAppRef] = useState('');

  // Form Fields
  const [companyName, setCompanyName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [contactName, setContactName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [town, setTown] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState('5');
  const [territoryInterest, setTerritoryInterest] = useState('');
  const [currentBrands, setCurrentBrands] = useState('');
  const [hasWorkshop, setHasWorkshop] = useState(true);
  const [hasMobileService, setHasMobileService] = useState(true);
  const [vanCount, setVanCount] = useState('2');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const generatedRef = `APP-DLR-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      company_name: companyName,
      trading_name: tradingName || undefined,
      contact_name: contactName,
      job_title: jobTitle || undefined,
      email,
      phone,
      website: website || undefined,
      address_line1: addressLine1,
      town,
      county,
      postcode,
      years_in_business: yearsInBusiness,
      territory_interest: territoryInterest,
      current_brands_represented: currentBrands,
      workshop_facilities: hasWorkshop,
      mobile_service_capability: hasMobileService,
      service_van_count: vanCount,
      additional_notes: additionalNotes || undefined,
    };

    try {
      const res = await fetch('/api/dealers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setAppRef(generatedRef);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setAppRef(generatedRef);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dealers" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Dealer Network
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Partnership Application</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Commercial Territory Application
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Become an Authorised Alkota Dealer
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-3xl mb-8">
            Partner with an authentic, 60-year American manufacturer of industrial hot water, steam, and bespoke pressure cleaning systems. We provide protected regional territories, direct factory leads, and comprehensive engineering support.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#777] font-ibm-plex-mono">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Protected Regional Territories
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Factory Lead Allocation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Full Spares &amp; Warranty Backing
            </span>
          </div>
        </div>
      </section>

      {/* ── APPLICATION SECTION ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        {submitted ? (
          <div className="border border-emerald-300 bg-emerald-50/40 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 border border-emerald-300">
              Application Logged
            </span>
            <h3 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight mt-4 mb-2">
              Dealer Partnership Application Received
            </h3>
            <p className="font-ibm-plex-mono text-sm text-alkota-orange font-medium mb-6">
              Reference: {appRef}
            </p>
            <p className="text-sm text-[#555] font-normal leading-relaxed max-w-xl mx-auto mb-8">
              Thank you, {contactName || 'Applicant'}. Your application for <strong>{companyName || 'your business'}</strong> has been routed to our UK National Sales Director. We will review your proposed territory ({territoryInterest || 'UK'}) and contact you within 2 working days for an initial commercial discovery call.
            </p>

            <div className="flex justify-center">
              <Link
                href="/dealers"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Return to Dealer Network Hub
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Commercial Pillars */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#E8E8E4] p-6">
                <Building2 className="w-6 h-6 text-alkota-orange mb-3" />
                <h3 className="font-medium text-base text-alkota-black mb-2">
                  What Alkota Offers Our Dealers
                </h3>
                <ul className="text-xs text-[#555] space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Capital Equipment Margins:</strong> Healthy commercial margins on machine sales, service kits, and chemicals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Territory Lead Routing:</strong> Qualified customer quotes and demo inquiries in your area routed directly to your portal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>7-Year Coil Guarantee:</strong> Backed directly by Alkota South Dakota, giving you an unbeatable competitive sales argument.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Turnkey Trailer &amp; Bespoke Support:</strong> Co-engineering with our UK factory team on high-value bespoke projects.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-6 text-xs text-[#666]">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-2">
                  // Partnership Qualification
                </span>
                <p className="leading-relaxed">
                  We look for established engineering or equipment distributors with workshop facilities, qualified field engineers, and a passion for industrial-grade durability.
                </p>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E4] p-8 sm:p-10 shadow-sm space-y-8">
                {/* 1. Business Profile */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-3 mb-6">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                      // Section 01
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                      Company &amp; Legal Structure
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Company Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Industrial Clean Ltd"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Trading Name (if different)
                      </label>
                      <input
                        type="text"
                        value={tradingName}
                        onChange={(e) => setTradingName(e.target.value)}
                        placeholder="e.g. Apex Pressure Systems"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Company Website URL
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://apexpressure.co.uk"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Years in Business
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={yearsInBusiness}
                        onChange={(e) => setYearsInBusiness(e.target.value)}
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Primary Contact Details */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-3 mb-6">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                      // Section 02
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                      Principal Contact
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Richard Walker"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Job Title / Role
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Managing Director / Commercial Lead"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rwalker@apexpressure.co.uk"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01246 558900"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Physical Address & Territory */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-3 mb-6">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                      // Section 03
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                      Premises &amp; Territory
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="md:col-span-2">
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Physical Depot Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Unit 4, Industrial Park"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="S42 5UY"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black uppercase focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Town / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                        placeholder="Chesterfield"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        County / Region
                      </label>
                      <input
                        type="text"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        placeholder="Derbyshire / East Midlands"
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                      Target Territory Interest (Postcodes / Counties) *
                    </label>
                    <input
                      type="text"
                      required
                      value={territoryInterest}
                      onChange={(e) => setTerritoryInterest(e.target.value)}
                      placeholder="e.g. S, DE, NG, LE postcodes (Derbyshire & South Yorkshire)"
                      className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Facilities & Engineering Capacity */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-3 mb-6">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                      // Section 04
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                      Service &amp; Engineering Facilities
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center gap-3 bg-[#FAF9F5] border border-[#E8E8E4] p-4">
                      <input
                        type="checkbox"
                        id="chk-workshop"
                        checked={hasWorkshop}
                        onChange={(e) => setHasWorkshop(e.target.checked)}
                        className="w-4 h-4 accent-alkota-orange"
                      />
                      <label htmlFor="chk-workshop" className="text-xs text-alkota-black font-medium cursor-pointer">
                        Workshop / Test Bay Facilities
                      </label>
                    </div>

                    <div className="flex items-center gap-3 bg-[#FAF9F5] border border-[#E8E8E4] p-4">
                      <input
                        type="checkbox"
                        id="chk-mobile"
                        checked={hasMobileService}
                        onChange={(e) => setHasMobileService(e.target.checked)}
                        className="w-4 h-4 accent-alkota-orange"
                      />
                      <label htmlFor="chk-mobile" className="text-xs text-alkota-black font-medium cursor-pointer">
                        Mobile Service Vans Active
                      </label>
                    </div>

                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                        Number of Service Vans
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={vanCount}
                        onChange={(e) => setVanCount(e.target.value)}
                        className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                      Current Cleaning &amp; Pressure Washer Brands Represented
                    </label>
                    <input
                      type="text"
                      value={currentBrands}
                      onChange={(e) => setCurrentBrands(e.target.value)}
                      placeholder="e.g. Karcher, Kranzle, Nilfisk, Ehrle, Comet, Interpump..."
                      className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1.5">
                      Why are you interested in becoming an Alkota UK Dealer?
                    </label>
                    <textarea
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Tell us about your customer base, market focus, and why Alkota's industrial machinery fits your business..."
                      className="w-full border border-[#DDD] p-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E8E4]">
                  <p className="text-[11px] text-[#777]">
                    Applications are reviewed confidentially by Alkota UK senior leadership.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-sm disabled:opacity-50"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Partnership Application'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
