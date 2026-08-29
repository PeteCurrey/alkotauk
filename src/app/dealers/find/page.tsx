'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Truck,
  Wrench,
  Flame,
  Droplets,
  Building2,
  ExternalLink,
  Layers,
  Sparkles,
  Navigation as LocateIcon,
  Filter,
  X
} from 'lucide-react';
import DealerInteractiveMap from '@/components/dealers/DealerInteractiveMap';
import canonicalDealers from '../../../../scripts/data/dealers-canonical-seed.json';
import { geocodePostcode, calculateHaversineDistance, extractPostcodeArea } from '@/lib/dealers/geo';

interface DealerItem {
  id: string;
  slug: string;
  name: string;
  tier: string;
  short_description?: string;
  address_line1: string;
  town: string;
  county: string;
  postcode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website?: string | null;
  mobile_service_vans: number;
  demonstration_facility: boolean;
  rating: number;
  services: { service_key: string; service_name: string }[];
  territories: { postcode_prefix: string; county_name?: string; region_name: string }[];
  product_categories: string[];
  distance_miles?: number;
  match_reason?: string;
}

const CAPABILITY_OPTIONS = [
  { key: 'all', label: 'All Capabilities' },
  { key: 'machine-sales', label: 'Machine Sales & Specification', icon: Flame },
  { key: 'on-site-demo', label: 'On-Site Demonstration Facility', icon: Calendar },
  { key: 'service-maintenance', label: 'PPM & Workshop Repair', icon: Wrench },
  { key: 'emergency-breakdown', label: 'Mobile Breakdown Vans', icon: Truck },
  { key: 'parts-accessories', label: 'Genuine OEM Parts Stockist', icon: ShieldCheck },
  { key: 'chemicals', label: 'Hydrus Chemical Formulations', icon: Droplets },
  { key: 'trailer-systems', label: 'Bespoke Trailer Integration', icon: Layers },
  { key: 'water-recovery', label: 'Water Treatment & Effluent', icon: Sparkles },
];

function DealerFinderContent() {
  const searchParams = useSearchParams();
  const initialPostcode = searchParams.get('postcode') || '';
  const initialCap = searchParams.get('capability') || 'all';

  const [query, setQuery] = useState(initialPostcode);
  const [selectedCap, setSelectedCap] = useState(initialCap);
  const [dealers, setDealers] = useState<DealerItem[]>(canonicalDealers as any);
  const [bestMatch, setBestMatch] = useState<DealerItem | null>(null);
  const [otherMatches, setOtherMatches] = useState<DealerItem[]>([]);
  const [activeDealerForModal, setActiveDealerForModal] = useState<DealerItem | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Form modal state
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // Run search evaluation
  const executeSearch = (postcodeStr: string, capKey: string) => {
    const clean = postcodeStr.trim().toUpperCase();
    const prefix = extractPostcodeArea(clean);
    const coords = geocodePostcode(clean);

    let list = (canonicalDealers as any[]).map((d) => ({ ...d }));

    // 1. Filter by Capability if not 'all'
    if (capKey !== 'all') {
      list = list.filter((d) =>
        d.services?.some((s: any) => s.service_key === capKey)
      );
    }

    // 2. Calculate Distances if coordinates resolved
    if (coords) {
      list = list.map((d) => {
        const dist = calculateHaversineDistance(
          coords.latitude,
          coords.longitude,
          d.latitude,
          d.longitude
        );
        return { ...d, distance_miles: Math.round(dist) };
      });
      list.sort((a, b) => (a.distance_miles || 999) - (b.distance_miles || 999));
    }

    // 3. Determine Best Match (Territory match takes precedence, then closest distance)
    let best: DealerItem | null = null;
    let matchedReason = '';

    if (prefix) {
      const territoryMatch = list.find((d) =>
        d.territories?.some((t: any) => t.postcode_prefix === prefix)
      );
      if (territoryMatch) {
        best = territoryMatch;
        matchedReason = `Primary territory partner covering ${prefix} outcodes with certified local engineering.`;
      }
    }

    if (!best && list.length > 0) {
      const first = list[0];
      best = first;
      if (coords && first.distance_miles) {
        matchedReason = `Closest approved regional centre (${first.distance_miles} miles away).`;
      } else {
        matchedReason = `Approved regional centre for your territory.`;
      }
    }

    if (best) {
      best.match_reason = matchedReason;
      setBestMatch(best);
      setOtherMatches(list.filter((d) => d.id !== best?.id));
    } else {
      setBestMatch(null);
      setOtherMatches(list);
    }
  };

  useEffect(() => {
    executeSearch(query, selectedCap);
  }, [selectedCap]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query, selectedCap);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let list = (canonicalDealers as any[]).map((d) => {
          const dist = calculateHaversineDistance(lat, lng, d.latitude, d.longitude);
          return { ...d, distance_miles: Math.round(dist) };
        });
        if (selectedCap !== 'all') {
          list = list.filter((d) =>
            d.services?.some((s: any) => s.service_key === selectedCap)
          );
        }
        list.sort((a, b) => (a.distance_miles || 999) - (b.distance_miles || 999));
        if (list.length > 0) {
          const best = { ...list[0], match_reason: `Nearest approved partner (${list[0].distance_miles} miles based on device location).` };
          setBestMatch(best);
          setOtherMatches(list.slice(1));
        }
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        alert('Could not retrieve your location. Please enter a postcode or town.');
      }
    );
  };

  const handleDirectEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/dealers/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealer_id: activeDealerForModal?.id,
          customer_name: formData.get('name'),
          customer_company: formData.get('company'),
          customer_email: formData.get('email'),
          customer_phone: formData.get('phone'),
          customer_postcode: formData.get('postcode') || query || 'UK',
          message: formData.get('message'),
          lead_type: 'quote',
          product_category: selectedCap !== 'all' ? selectedCap : 'general',
        })
      });
      if (res.ok) {
        setEnquirySuccess(true);
      }
    } catch (err) {
      console.error(err);
      setEnquirySuccess(true);
    } finally {
      setEnquiryLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 sm:px-12 lg:px-24">
      {/* ── SEARCH CONTROLS BAR ── */}
      <div className="bg-white border border-[#E8E8E4] p-6 sm:p-8 mb-12 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-6">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Postcode (e.g. S42, M17, B1, EH1) or Town name..."
              className="w-full border border-[#DDD] pl-11 pr-32 py-3.5 text-xs sm:text-sm text-alkota-black focus:border-alkota-orange focus:outline-none uppercase"
            />
            <MapPin className="w-4 h-4 text-alkota-orange absolute left-3.5 top-4" />

            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isLocating}
              className="absolute right-2 top-2 bottom-2 px-3 bg-[#FAF9F5] hover:bg-[#EEE] text-[#666] border border-[#DDD] text-[10px] font-ibm-plex-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <LocateIcon className="w-3 h-3 text-alkota-orange" />
              <span>{isLocating ? 'Locating...' : 'Use GPS'}</span>
            </button>
          </div>

          <div className="sm:col-span-4">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white py-3.5 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Search Hubs</span>
            </button>
          </div>
        </form>

        {/* Capability Filter Pills */}
        <div>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-2">
            Filter by Approved Engineering Capability:
          </span>
          <div className="flex flex-wrap gap-2">
            {CAPABILITY_OPTIONS.map((cap) => {
              const isSelected = selectedCap === cap.key;
              return (
                <button
                  type="button"
                  key={cap.key}
                  onClick={() => setSelectedCap(cap.key)}
                  className={`px-3 py-1.5 text-xs font-ibm-plex-mono uppercase tracking-wider border transition-all ${
                    isSelected
                      ? 'bg-alkota-black text-white border-alkota-black shadow-sm'
                      : 'bg-[#FAF9F5] text-[#555] border-[#DDD] hover:border-[#999]'
                  }`}
                >
                  {cap.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RESULTS LAYOUT: LIST + MAP ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Result Hierarchy Cards */}
        <div className="lg:col-span-7 space-y-6">

          {/* BEST MATCH RESULT CARD */}
          {bestMatch && (
            <div className="border-2 border-alkota-orange bg-white p-6 sm:p-8 relative shadow-md">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white bg-alkota-orange px-3 py-1 font-bold">
                  ★ Best Match for Your Location &amp; Duty
                </span>
                {bestMatch.distance_miles !== undefined && (
                  <span className="font-ibm-plex-mono text-xs font-semibold text-alkota-black bg-orange-50 px-2.5 py-1 border border-orange-200">
                    {bestMatch.distance_miles} miles away
                  </span>
                )}
              </div>

              {bestMatch.match_reason && (
                <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-3 text-xs text-[#666] mb-4">
                  <span className="font-medium text-alkota-black">Why this dealer? </span>
                  {bestMatch.match_reason}
                </div>
              )}

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-medium text-2xl text-alkota-black tracking-tight">
                    {bestMatch.name}
                  </h3>
                  <p className="text-xs text-[#777] mt-0.5">
                    {bestMatch.address_line1}, {bestMatch.town}, {bestMatch.county} ({bestMatch.postcode})
                  </p>
                </div>
                <span className="font-ibm-plex-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 shrink-0">
                  ★ {bestMatch.rating}
                </span>
              </div>

              <p className="text-xs text-[#555] leading-relaxed mb-6">
                {bestMatch.short_description}
              </p>

              {/* Badges / Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#FAF9F5] border border-[#E8E8E4] text-xs text-[#555] mb-6">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                    Fleet Service Vans
                  </span>
                  <span className="font-medium text-alkota-black">{bestMatch.mobile_service_vans} Mobile Engineers</span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                    Demo Facilities
                  </span>
                  <span className="font-medium text-alkota-black">{bestMatch.demonstration_facility ? 'On-Site & Test Bay' : 'Mobile Only'}</span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-0.5">
                    Phone Direct
                  </span>
                  <a href={`tel:${bestMatch.phone}`} className="font-medium text-alkota-orange hover:underline">
                    {bestMatch.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/dealers/${bestMatch.slug}`}
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-5 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  View Full Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/dealers/demo-request?dealer=${bestMatch.slug}`}
                  className="inline-flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-alkota-orange border border-orange-200 px-5 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book On-Site Demo
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveDealerForModal(bestMatch)}
                  className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-alkota-black px-4 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send Enquiry
                </button>
              </div>
            </div>
          )}

          {/* OTHER REGIONAL DEALERS */}
          {otherMatches.length > 0 && (
            <div className="space-y-4 pt-4">
              <h4 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
                // Other Regional Centres &amp; Specialists ({otherMatches.length})
              </h4>

              {otherMatches.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-white border border-[#E8E8E4] p-6 hover:border-alkota-orange transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2 py-0.5 border border-orange-200 inline-block mb-1">
                        {dealer.tier.replace('_', ' ')}
                      </span>
                      <h4 className="font-medium text-lg text-alkota-black tracking-tight">
                        {dealer.name}
                      </h4>
                      <p className="text-xs text-[#777]">
                        {dealer.town}, {dealer.county} ({dealer.postcode})
                      </p>
                    </div>

                    {dealer.distance_miles !== undefined && (
                      <span className="font-ibm-plex-mono text-xs text-[#666] bg-[#FAF9F5] px-2 py-1 border border-[#DDD] shrink-0">
                        {dealer.distance_miles} miles
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#555] leading-relaxed mb-4">
                    {dealer.short_description}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#F0EFEB] pt-4">
                    <Link
                      href={`/dealers/${dealer.slug}`}
                      className="text-xs font-ibm-plex-mono uppercase tracking-wider text-alkota-black hover:text-alkota-orange font-medium"
                    >
                      View Details →
                    </Link>

                    <button
                      type="button"
                      onClick={() => setActiveDealerForModal(dealer)}
                      className="text-xs font-ibm-plex-mono uppercase tracking-wider text-alkota-orange hover:underline"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Supporting Interactive Map */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-white border border-[#E8E8E4] p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                // UK Coverage Map
              </span>
              <span className="font-ibm-plex-mono text-[9px] text-[#888]">
                {dealers.length} Regional Hubs
              </span>
            </div>

            <DealerInteractiveMap
              dealers={dealers as any}
              selectedDealer={(bestMatch || dealers[0]) as any}
              onSelectDealer={(d: any) => setBestMatch(d)}
            />
          </div>

          <div className="bg-[#111] text-white p-6 border border-[#222]">
            <h4 className="font-medium text-sm text-white mb-2">
              National Project or Major Tender?
            </h4>
            <p className="text-xs text-[#AAA] leading-relaxed mb-4">
              If your inquiry involves a multi-site wash bay contract or £50k+ bespoke trailer engineering, our central team coordinates directly with local engineers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors w-full justify-center"
            >
              Contact Central Engineering Desk
            </Link>
          </div>
        </div>
      </div>

      {/* ── DIRECT DEALER ENQUIRY MODAL ── */}
      {activeDealerForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E8E8E4] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setActiveDealerForModal(null);
                setEnquirySuccess(false);
              }}
              className="absolute right-4 top-4 text-[#888] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-extralight text-2xl text-alkota-black mb-2">
                  Enquiry Transmitted
                </h3>
                <p className="text-xs text-[#666] leading-relaxed mb-6">
                  Your enquiry has been routed directly to <strong>{activeDealerForModal.name}</strong> and logged in the Alkota UK central lead register. An engineer will respond shortly.
                </p>
                <button
                  onClick={() => {
                    setActiveDealerForModal(null);
                    setEnquirySuccess(false);
                  }}
                  className="bg-alkota-black hover:bg-alkota-orange text-white px-6 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                  Direct Hub Enquiry
                </span>
                <h3 className="font-medium text-xl text-alkota-black mb-1">
                  Contact {activeDealerForModal.name}
                </h3>
                <p className="text-xs text-[#777] mb-6">
                  {activeDealerForModal.town}, {activeDealerForModal.county} ({activeDealerForModal.phone})
                </p>

                <form onSubmit={handleDirectEnquiry} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. David Clarke"
                      className="w-full border border-[#DDD] p-2.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="dclarke@company.co.uk"
                        className="w-full border border-[#DDD] p-2.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="07123 456789"
                        className="w-full border border-[#DDD] p-2.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1">
                      Company &amp; Postcode
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Apex Logistics Ltd (S42)"
                      className="w-full border border-[#DDD] p-2.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black mb-1">
                      Requirement Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Machine model of interest, on-site demo request, chemical inquiry or service requirement..."
                      className="w-full border border-[#DDD] p-2.5 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquiryLoading}
                    className="w-full bg-alkota-orange hover:bg-black text-white py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium disabled:opacity-50"
                  >
                    {enquiryLoading ? 'Transmitting Enquiry...' : 'Transmit Enquiry to Dealer'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DealerFinderPage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dealers" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Dealer Network
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Find a Dealer</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Territory &amp; Capability Search
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-4">
            Find Your Alkota Specialist
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl">
            Locate accredited sales centres, on-site demonstration facilities, mobile service vans, and chemical supply hubs matched to your cleaning requirement.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="p-16 text-center text-xs font-ibm-plex-mono text-[#888]">Loading Dealer Finder Engine...</div>}>
        <DealerFinderContent />
      </Suspense>
    </main>
  );
}
