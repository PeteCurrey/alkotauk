import React from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, FileText, PhoneCall, Shield } from 'lucide-react';
import { SERVICE_PLANS } from '@/lib/service/seed-data';

export const metadata = {
  title: 'Service Contracts & Fleet Maintenance | Alkota UK',
  description:
    'Tailored industrial service contracts for multi-machine estates, logistics wash bays, and manufacturing plants. Guaranteed response, planned PPM, and parts discounts.',
};

export default function ServiceContractsPage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/service" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Service
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Service Contracts</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Commercial Fleet Agreements
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Industrial Fleet Service &amp; Maintenance Contracts
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Tailored maintenance agreements configured around equipment criticality, operating hours, and multi-site logistics estates. Guaranteed response windows, scheduled PPM, and OEM parts discounts.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/service/request?type=planned_maintenance"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Request a Contract Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Speak to Fleet Manager
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE STRUCTURES ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
            // Contract Architecture
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight mb-4">
            Four Levels of Operational Cover
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            We reject generic bronze/silver/gold tiers. Our maintenance plans are structured around real industrial operational demands — from routine preventive servicing to 24/7 mission-critical manufacturing cover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICE_PLANS.map((plan) => (
            <div
              key={plan.id}
              id={plan.id}
              className="bg-white border border-[#E8E8E4] p-8 flex flex-col justify-between hover:border-alkota-orange hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="font-medium text-xl text-alkota-black tracking-tight">
                    {plan.title}
                  </h3>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2.5 py-1 border border-orange-200">
                    {plan.partsDiscount}
                  </span>
                </div>

                <p className="text-xs font-medium text-alkota-orange mb-3">
                  {plan.subtitle}
                </p>

                <p className="text-xs text-[#555] leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-4 text-xs text-[#666] mb-6">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-1">
                    Ideal Operating Environment:
                  </span>
                  <span>{plan.idealFor}</span>
                </div>

                <div className="border-t border-[#E8E8E4] pt-4 mb-6">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-3">
                    Contract Inclusions &amp; Features:
                  </span>
                  <ul className="text-xs text-[#555] space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#E8E8E4] pt-4">
                <div className="text-xs text-[#777] mb-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Response Target:</span>
                    <span className="font-medium text-alkota-black">{plan.responseTarget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reporting:</span>
                    <span className="font-medium text-alkota-black">{plan.reporting.slice(0, 35)}...</span>
                  </div>
                </div>

                <Link
                  href={`/service/request?type=planned_maintenance&plan=${plan.id}`}
                  className="w-full text-center block bg-alkota-black hover:bg-alkota-orange text-white py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Configure Agreement →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── MULTI-SITE & FLEET CAPABILITY ── */}
        <div className="bg-white border border-[#E8E8E4] p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Nationwide Logistics &amp; Estates
              </span>
              <h3 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight mb-4">
                One Agreement. Multiple Sites. Unified Reliability.
              </h3>
              <p className="text-xs text-[#555] leading-relaxed mb-4">
                For national fleet operators and facilities management companies managing multiple pressure washers, wash trailers, and wash bay installations across several depots, we offer unified master service agreements.
              </p>
              <ul className="text-xs text-[#555] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Centralised consolidated invoicing and fleet-wide reliability reporting.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated regional field engineers allocated to your specific depots.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Annual critical spares consignment audits for on-site parts stores.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E8E8E4] p-6 text-center">
              <Building2 className="w-10 h-10 text-alkota-orange mx-auto mb-3" />
              <h4 className="font-medium text-sm text-alkota-black mb-1">
                Custom Fleet Proposal
              </h4>
              <p className="text-xs text-[#666] mb-6">
                Tell us your machine inventory and site locations for a bespoke contract quotation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Request Fleet Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
