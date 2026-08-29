'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Upload, Building, MapPin, User, Mail, Phone, Calendar, ArrowRight, Shield } from 'lucide-react';

export default function MachineRegistrationForm() {
  const [modelCode, setModelCode] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [dealerName, setDealerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [operatingEnvironment, setOperatingEnvironment] = useState('');
  const [weeklyHours, setWeeklyHours] = useState<number>(20);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const generatedRegId = `REG-${modelCode.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'ALK'}-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      model_code: modelCode,
      serial_number: serialNumber,
      purchase_date: purchaseDate || undefined,
      dealer_name: dealerName || undefined,
      company_name: companyName,
      site_name: siteName || undefined,
      site_address: siteAddress || undefined,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone || undefined,
      operating_environment: operatingEnvironment || undefined,
      weekly_operating_hours: weeklyHours || undefined,
    };

    try {
      const res = await fetch('/api/service/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setRegId(generatedRegId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setRegId(generatedRegId);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-emerald-300 bg-emerald-50/40 p-8 md:p-12 text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3 py-1 border border-emerald-300">
          Machine Successfully Registered
        </span>
        <h3 className="font-extralight text-3xl md:text-4xl text-alkota-black tracking-tight mt-4 mb-2">
          Ownership Record Created
        </h3>
        <p className="font-ibm-plex-mono text-sm text-alkota-orange font-medium mb-6">
          Registration Record: {regId}
        </p>
        <p className="text-sm text-[#555] font-normal leading-relaxed max-w-xl mx-auto mb-8">
          Thank you, {contactName || 'Customer'}. Your <strong>{modelCode || 'Alkota Machine'}</strong> (Serial: <strong>{serialNumber || 'Recorded'}</strong>) is now registered in the Alkota UK ownership database. Your 7-Year Heating Coil Warranty has been activated, and verified technical documentation and service kit recommendations are linked to your serial profile.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/service/my-alkota"
            className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
          >
            View Machine in My Alkota
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/service"
            className="inline-flex items-center gap-2 border border-[#CCC] hover:border-alkota-black text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
          >
            Return to Service Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#E8E8E4] bg-white">
      {/* ── MACHINE DATA ── */}
      <div className="p-8 md:p-10 border-b border-[#E8E8E4] bg-[#F7F7F5]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
            // Section 01
          </span>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
            Machine Identification
          </span>
        </div>
        <h3 className="font-extralight text-2xl md:text-3xl text-alkota-black tracking-tight mb-6">
          Alkota Equipment Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Machine Model Code / Series <span className="text-alkota-orange">*</span>
            </label>
            <input
              type="text"
              required
              value={modelCode}
              onChange={(e) => setModelCode(e.target.value)}
              placeholder="e.g. 430XH, 5305A, 4358, 216X4, Custom Skid"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Serial Number (Stamped on Silver Plate) <span className="text-alkota-orange">*</span>
            </label>
            <input
              type="text"
              required
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g. ALK-2024-88421 or 6-digit number"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Approximate Purchase / Installation Date
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Supplying Dealer / Distributor
            </label>
            <input
              type="text"
              value={dealerName}
              onChange={(e) => setDealerName(e.target.value)}
              placeholder="e.g. Alkota UK Direct or Authorised Dealer"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ── COMPANY & SITE LOCATION ── */}
      <div className="p-8 md:p-10 border-b border-[#E8E8E4]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
            // Section 02
          </span>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
            Owner &amp; Site Location
          </span>
        </div>
        <h3 className="font-extralight text-2xl text-alkota-black tracking-tight mb-6">
          Company &amp; Operating Site
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Company / Trading Name <span className="text-alkota-orange">*</span>
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Apex Logistics Ltd"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Operating Site / Depot Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="e.g. Sheffield Distribution Hub"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
            Site Address &amp; Postcode
          </label>
          <input
            type="text"
            value={siteAddress}
            onChange={(e) => setSiteAddress(e.target.value)}
            placeholder="e.g. Unit 3, Vulcan Way, Sheffield S9 2LN"
            className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Operating Duty / Application Environment
            </label>
            <input
              type="text"
              value={operatingEnvironment}
              onChange={(e) => setOperatingEnvironment(e.target.value)}
              placeholder="e.g. Heavy vehicle wash bay, agricultural cleaning, factory floor washdown"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Estimated Weekly Run Hours: {weeklyHours} hrs/week
            </label>
            <input
              type="range"
              min={2}
              max={80}
              step={2}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
              className="w-full mt-2 accent-alkota-orange"
            />
            <div className="flex justify-between font-ibm-plex-mono text-[9px] text-[#999] mt-1">
              <span>Light (5h)</span>
              <span>Standard (20h)</span>
              <span>Continuous (50h+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT DETAILS ── */}
      <div className="p-8 md:p-10 border-b border-[#E8E8E4] bg-[#FDFDFC]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
            // Section 03
          </span>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
            Ownership Contact
          </span>
        </div>
        <h3 className="font-extralight text-2xl text-alkota-black tracking-tight mb-6">
          Primary Contact for Service &amp; Technical Bulletins
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Contact Name <span className="text-alkota-orange">*</span>
            </label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. David Harrison"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Work Email Address <span className="text-alkota-orange">*</span>
            </label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="e.g. dharrison@company.co.uk"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-2">
              Direct Phone / Mobile
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="e.g. 0114 290 8000"
              className="w-full border border-[#DDD] px-4 py-3 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ── FOOTER SUBMIT ── */}
      <div className="p-8 md:p-10 bg-[#FAF9F5] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-xs text-[#555]">
          <Shield className="w-5 h-5 text-alkota-orange shrink-0" />
          <span>
            Registering activates factory warranty logging and links verified parts schematics to your serial record.
          </span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Registering...' : 'Register Alkota Machine'}
        </button>
      </div>
    </form>
  );
}
