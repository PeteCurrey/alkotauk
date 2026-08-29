'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, RefreshCw, Flame, Gauge, LifeBuoy } from 'lucide-react';

interface CapabilityDef {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  coveredItems: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  icon: React.ElementType;
  badge: string;
}

const CAPABILITIES: CapabilityDef[] = [
  {
    id: 'ppm',
    tabLabel: 'Planned Maintenance',
    title: 'Planned Preventive Maintenance (PPM)',
    subtitle: 'Condition-based and scheduled servicing to eliminate unexpected downtime.',
    description: 'A structured engineering schedule that inspects, services, tests, and tunes your Alkota equipment at calibrated intervals — before minor component wear develops into catastrophic failure.',
    coveredItems: [
      'ISO 68 pump oil renewal & plunger inspection',
      'V-packing, seal & check valve health audit',
      'Down-draft burner cleaning & electrode adjustment',
      'Schedule 80 ASTM A53 heating coil integrity test',
      'Unloader valve & pop-off safety relief calibration',
      'Comprehensive digital service certificate issued'
    ],
    primaryCta: { label: 'Explore Planned Maintenance', href: '/service/planned-maintenance' },
    secondaryCta: { label: 'Book PPM Service', href: '/service/request?type=planned_maintenance' },
    icon: ShieldCheck,
    badge: 'Uptime Maximisation'
  },
  {
    id: 'repairs',
    tabLabel: 'Breakdown & Repair',
    title: 'Rapid Reactive Breakdown & Repairs',
    subtitle: 'OEM-level diagnostics, mobile field engineers, and genuine factory parts.',
    description: 'When an industrial cleaning machine stops, operations stall. Our mobile field engineers carry dedicated diagnostic equipment and genuine Alkota replacement components to get your machine running to full factory performance.',
    coveredItems: [
      'Fast triage & mobile engineer dispatch across the UK',
      'Electrical fault diagnosis & motor starter troubleshooting',
      'Burner lockout, fuel pump & ignition transformer repair',
      'High-pressure leak rectification & unloader replacement',
      'Multi-brand industrial pressure washer support for mixed fleets',
      'Full post-repair commissioning run & safety checks'
    ],
    primaryCta: { label: 'Breakdown & Repair Details', href: '/service/repairs' },
    secondaryCta: { label: 'Report a Breakdown', href: '/service/request?type=breakdown' },
    icon: Wrench,
    badge: 'Priority Response'
  },
  {
    id: 'pump-repair',
    tabLabel: 'Pump Overhaul',
    title: 'High-Pressure Pump Overhaul & Teardown',
    subtitle: 'Rebuild the core pump rather than replacing the entire machine.',
    description: 'Industrial triplex plunger pumps are precision machines designed to be rebuilt multiple times. Our dedicated workshop carries out comprehensive teardowns, ceramic plunger alignment, manifold machining, and full 30-minute hydro-test certification.',
    coveredItems: [
      'General Pump, CAT Pumps, Comet & Interpump specialist service',
      'Complete workshop strip-down & micrometer assessment',
      'Ceramic plunger renewal & crankshaft bearing overhaul',
      'Manifold resurfacing & valve pocket re-seating',
      'Calibrated motor test-bench hydro run under full working pressure',
      'Signed Workshop Test Certificate & rebuild warranty'
    ],
    primaryCta: { label: 'Dedicated Pump Workshop', href: '/service/pump-repair' },
    secondaryCta: { label: 'Book Pump Overhaul', href: '/service/request?type=pump_repair' },
    icon: Gauge,
    badge: 'Precision Engineering'
  },
  {
    id: 'commissioning',
    tabLabel: 'Commissioning',
    title: 'Site Commissioning & Operational Handover',
    subtitle: 'Professional installation checks, utility verification, and operator training.',
    description: 'Critical for stationary skids, mobile trailers, water treatment units, and custom wash plants. We ensure electrical supplies, water supply flow, ventilation, and operator safety protocols are fully verified before initial live operation.',
    coveredItems: [
      'Water supply flow & static/dynamic pressure verification',
      '3-phase electrical supply, earthing & rotation check',
      'Fuel system purging, burner draft & combustion setup',
      'Operator briefing on daily pre-checks & shutdown procedures',
      'Handover pack including manuals, warranty registration & asset log',
      'Direct activation of Alkota 7-Year Coil Warranty'
    ],
    primaryCta: { label: 'Commissioning Protocol', href: '/service/commissioning' },
    secondaryCta: { label: 'Book Commissioning', href: '/service/request?type=commissioning' },
    icon: Flame,
    badge: 'First-Day Reliability'
  },
  {
    id: 'system-support',
    tabLabel: 'System Support',
    title: 'Trailers, Water Treatment & Wash Plants',
    subtitle: 'Lifecycle maintenance for integrated, bespoke, and multi-component systems.',
    description: 'Alkota builds complete cleaning ecosystems — not just standalone machines. Our service engineering covers closed-loop water treatment filtration, multi-operator trailer rigs, automated wheel-wash systems, and custom industrial installations.',
    coveredItems: [
      'Water recycling media replacement & filter bed renewal',
      'Trailer generator, hose reel & auxiliary engine servicing',
      'Vacuum recovery pump & oil-water separator maintenance',
      'Automated wash plant nozzle bar alignment & sensor checks',
      'Environmental Agency effluent compliance audit checks',
      'Integrated service agreements covering all system elements'
    ],
    primaryCta: { label: 'View Service Contracts', href: '/service/contracts' },
    secondaryCta: { label: 'Discuss System Service', href: '/service/request?type=technical_support' },
    icon: RefreshCw,
    badge: 'Complete Infrastructure'
  },
  {
    id: 'tech-support',
    tabLabel: 'Technical Support',
    title: 'Factory Technical Helpline & Engineering Advice',
    subtitle: 'Direct access to experienced industrial pressure washing engineers.',
    description: 'Have a technical question regarding nozzle sizing, water supply requirements, chemical dosing dilution, or unusual operating symptoms? Our UK engineering team provides authoritative, practical technical guidance.',
    coveredItems: [
      'Machine identification & historic serial lookup',
      'Parts supersession & obsolete component conversion advice',
      'Safe troubleshooting assistance & wiring schematic queries',
      'Chemical compatibility & foam lance setup guidance',
      'Water flow rate (L/min) vs pressure (BAR) calculations',
      'Assistance with documentation and operation manuals'
    ],
    primaryCta: { label: 'Contact Technical Support', href: '/service/request?type=technical_support' },
    secondaryCta: { label: 'Access Technical Library', href: '/parts' },
    icon: LifeBuoy,
    badge: 'Authoritative Advice'
  }
];

export default function ServiceCapabilityNavigator() {
  const [activeTab, setActiveTab] = useState<string>('ppm');
  const current = CAPABILITIES.find((c) => c.id === activeTab) || CAPABILITIES[0];
  const IconComponent = current.icon;

  return (
    <div className="border border-[#E8E8E4] bg-white">
      {/* Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b border-[#E8E8E4] bg-[#F7F7F5]">
        {CAPABILITIES.map((cap) => {
          const isActive = cap.id === activeTab;
          return (
            <button
              key={cap.id}
              onClick={() => setActiveTab(cap.id)}
              className={`p-4 md:p-5 text-left transition-all relative border-r border-b lg:border-b-0 border-[#E8E8E4] last:border-r-0 ${
                isActive
                  ? 'bg-white text-alkota-black'
                  : 'text-[#666] hover:bg-[#EFEFEA] hover:text-alkota-black'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-alkota-orange" />
              )}
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                // 0{CAPABILITIES.indexOf(cap) + 1}
              </span>
              <span className={`text-[13px] tracking-tight block ${isActive ? 'font-medium text-alkota-black' : 'font-normal'}`}>
                {cap.tabLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Description & Coverage */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2.5 py-1 border border-orange-200">
                {current.badge}
              </span>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999]">
                OEM Capability
              </span>
            </div>

            <h3 className="font-extralight text-3xl md:text-4xl text-alkota-black tracking-tight mb-3">
              {current.title}
            </h3>
            <p className="text-sm font-normal text-alkota-orange mb-6">
              {current.subtitle}
            </p>
            <p className="text-sm text-[#555] font-normal leading-relaxed mb-8">
              {current.description}
            </p>

            {/* Covered scope items */}
            <div className="border-t border-[#E8E8E4] pt-6 mb-8">
              <h4 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black mb-4">
                What is Covered &amp; Included:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {current.coveredItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#444]">
                    <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={current.primaryCta.href}
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                {current.primaryCta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {current.secondaryCta && (
                <Link
                  href={current.secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-[#CCC] hover:border-alkota-black text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  {current.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Visual Engineering Box */}
          <div className="lg:col-span-5 bg-[#F7F7F5] border border-[#E8E8E4] p-8">
            <div className="w-12 h-12 bg-white border border-[#E8E8E4] flex items-center justify-center text-alkota-orange mb-6">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="space-y-4 text-xs text-[#555]">
              <div className="border-b border-[#E8E8E4] pb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Service Delivery
                </span>
                <span className="text-alkota-black font-medium">
                  On-Site Nationwide or Alkota Central Workshop
                </span>
              </div>

              <div className="border-b border-[#E8E8E4] pb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Engineer Qualification
                </span>
                <span className="text-alkota-black font-medium">
                  Certified Industrial Pressure &amp; Combustion Engineers
                </span>
              </div>

              <div className="border-b border-[#E8E8E4] pb-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Documentation Supplied
                </span>
                <span className="text-alkota-black font-medium">
                  Digital Service Report, Measured Readings &amp; Safety Audit
                </span>
              </div>

              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Parts Guarantee
                </span>
                <span className="text-alkota-black font-medium">
                  100% Genuine OEM Alkota Replacement Components
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E8E4]">
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#777] mb-3">
                Need urgent technical assistance?
              </p>
              <Link
                href="/service/request?type=breakdown&urgency=machine_down"
                className="block text-center bg-white border border-red-200 hover:border-red-500 text-red-600 font-ibm-plex-mono text-xs uppercase tracking-widest py-2.5 transition-colors"
              >
                Report Critical Machine Down
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
