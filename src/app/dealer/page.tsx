import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Calendar,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Phone,
  Mail,
  TrendingUp,
  Package,
  Wrench,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'Dealer Partner Portal | Alkota UK',
  description: 'Authorised Alkota Dealer Portal for managing assigned leads, on-site demonstration requests, customer service records, and wholesale price sheets.',
};

export default function DealerPortalPage() {
  // Sample dealer session data for Peak Industrial Pressure Systems
  const activeDealer = {
    name: 'Peak Industrial Pressure Systems',
    tier: 'Authorised Platinum Partner',
    discount: '25% Standard Equipment / 30% Parts & Chemicals',
    manager: 'Richard Walker (Commercial Director)',
    territory: 'S, DE, NG, LE, DN Postcodes',
    leadsCount: 6,
    openDemos: 2,
  };

  const assignedLeads = [
    {
      id: 'lead-01',
      date: '28 Aug 2026',
      name: 'Marcus Bradley',
      company: 'Midlands Freight Logistics Ltd',
      postcode: 'DE21 6UZ (Derby)',
      type: 'On-Site Demonstration',
      product: 'Alkota 430XH Hot Water (210 BAR)',
      status: 'DEMO SCHEDULED',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'lead-02',
      date: '27 Aug 2026',
      name: 'Sarah Jenkins',
      company: 'Pennine Poultry Processing Ltd',
      postcode: 'SK17 6TT (Buxton)',
      type: 'Price Quotation',
      product: 'Alkota 5305A Cold Stationary + Foam Lance',
      status: 'QUOTE SENT',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 'lead-03',
      date: '25 Aug 2026',
      name: 'Gareth Evans',
      company: 'Apex Plant Hire',
      postcode: 'S42 5UY (Chesterfield)',
      type: 'Annual PPM Service & Pump Seal Kit',
      product: 'General Pump TS2021 Rebuild Kit',
      status: 'PARTS DISPATCHED',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
  ];

  return (
    <main className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-2.5 py-0.5 border border-[#333]">
                  Authorised Dealer Portal
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 border border-emerald-800">
                  {activeDealer.tier}
                </span>
              </div>
              <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
                {activeDealer.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#AAA]">
                Logged in as: <strong>{activeDealer.manager}</strong> · Assigned Territory: {activeDealer.territory}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dealers/demo-request"
                target="_blank"
                className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm font-medium"
              >
                <Calendar className="w-3.5 h-3.5" />
                Log Completed Demo
              </Link>
              <Link
                href="/dealers"
                target="_blank"
                className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Public Network View <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-[#E8E8E4] p-6">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
              Active Assigned Leads
            </span>
            <span className="text-3xl font-extralight text-alkota-black block mb-1">
              {activeDealer.leadsCount}
            </span>
            <span className="text-xs text-emerald-700 font-medium">+2 this week</span>
          </div>

          <div className="bg-white border border-[#E8E8E4] p-6">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
              Scheduled Demos
            </span>
            <span className="text-3xl font-extralight text-alkota-orange block mb-1">
              {activeDealer.openDemos}
            </span>
            <span className="text-xs text-[#777]">Next: Midlands Freight</span>
          </div>

          <div className="bg-white border border-[#E8E8E4] p-6">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
              Dealer Discount Tier
            </span>
            <span className="text-xl font-light text-alkota-black block mb-1">
              25% Equipment
            </span>
            <span className="text-xs text-[#777]">30% Parts &amp; Consumables</span>
          </div>

          <div className="bg-white border border-[#E8E8E4] p-6">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
              Territory Status
            </span>
            <span className="text-xl font-light text-emerald-700 block mb-1">
              Active / Protected
            </span>
            <span className="text-xs text-[#777]">5 Postcode Districts</span>
          </div>
        </div>

        {/* ── ASSIGNED LEADS & ENQUIRIES TABLE ── */}
        <div className="bg-white border border-[#E8E8E4] p-8 mb-12 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E8E8E4] pb-4 mb-6">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // Territory Pipeline
              </span>
              <h3 className="font-extralight text-2xl text-alkota-black tracking-tight">
                Assigned Territory Leads &amp; Demo Requests
              </h3>
            </div>
            <span className="font-ibm-plex-mono text-xs text-[#777]">
              Real-Time Alkota Lead Routing
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E4] bg-[#FAF9F5] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer &amp; Company</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Inquiry Type</th>
                  <th className="p-3">Machine / Part Required</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4] text-[#555]">
                {assignedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF9F5]">
                    <td className="p-3 font-ibm-plex-mono text-[#888]">{lead.date}</td>
                    <td className="p-3">
                      <span className="font-medium text-alkota-black block">{lead.name}</span>
                      <span className="text-[#777] text-[11px]">{lead.company}</span>
                    </td>
                    <td className="p-3 font-mono text-[11px]">{lead.postcode}</td>
                    <td className="p-3 font-medium text-alkota-black">{lead.type}</td>
                    <td className="p-3 text-alkota-orange">{lead.product}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 border text-[9px] font-ibm-plex-mono font-bold uppercase ${lead.statusColor}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => alert(`Opening lead dossier for ${lead.company}`)}
                        className="text-alkota-black hover:text-alkota-orange font-ibm-plex-mono text-[10px] uppercase tracking-wider font-medium underline"
                      >
                        Update Lead →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── DEALER RESOURCES & PRICING DOWNLOADS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Price Lists */}
          <div className="bg-white border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-alkota-orange" />
              <h4 className="font-medium text-base text-alkota-black">
                Wholesale Price Lists &amp; Order Forms
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { title: '2026 Machine Fleet Trade Price Sheet', type: 'PDF' },
                { title: 'Genuine Parts Wholesale Matrix', type: 'XLSX' },
                { title: 'Hydrus Chemical IBC & Drum Pricing', type: 'PDF' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E8E8E4] hover:border-alkota-orange transition-colors"
                >
                  <span className="font-medium text-[#444]">{doc.title}</span>
                  <button className="text-alkota-orange hover:underline font-ibm-plex-mono text-[9px] uppercase">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Manuals */}
          <div className="bg-white border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-alkota-orange" />
              <h4 className="font-medium text-base text-alkota-black">
                Dealer Technical Bulletins
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Down-Draft Burner Electrode Gap Spec', type: 'TB-2026-01' },
                { title: 'Triplex Pump Plunger Torque Specs', type: 'TB-2025-09' },
                { title: 'Unloader Valve Setting & Bypass Guide', type: 'TB-2025-04' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E8E8E4] hover:border-alkota-orange transition-colors"
                >
                  <span className="font-medium text-[#444]">{doc.title}</span>
                  <span className="font-ibm-plex-mono text-[9px] text-[#999]">{doc.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Training & Certification */}
          <div className="bg-white border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-alkota-orange" />
              <h4 className="font-medium text-base text-alkota-black">
                Technical Training Modules
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Hot Water Combustion Certification', status: 'Certified' },
                { title: 'Closed-Loop Water Treatment Setup', status: 'Available' },
                { title: 'Mobile Trailer Rig Pre-Delivery', status: 'Certified' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E8E8E4]"
                >
                  <span className="font-medium text-[#444]">{doc.title}</span>
                  <span className="font-ibm-plex-mono text-[9px] uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
