'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import WashPlantSpecifierCta from '@/components/wash-plant/WashPlantSpecifierCta';
import WashPlantCapabilityBadge from '@/components/wash-plant/WashPlantCapabilityBadge';
import {
  ArrowRight, CheckCircle2, Activity, Layers, ShieldCheck,
  Clock, Cpu, Zap, FileText, Send, BarChart3, Wrench, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const PPM_INSPECTION_SCOPE = [
  { area: 'High-Pressure Triplex Pumps', items: 'Crankcase oil analysis & changeout, ceramic plunger condition, packing seal integrity, manifold valve seating, unloader valve calibration, inlet/outlet check valves.' },
  { area: 'Thermal Heating Systems', items: 'Continuous Schedule 80 coil pressure-test & thickness estimation, burner combustion efficiency analysis, electrode gap calibration, heat exchanger scaling assessment, fuel filter changeout.' },
  { area: 'Electric Motors & Drives', items: 'Phase-to-earth insulation resistance, bearing vibration & temperature monitoring, drive belt condition & tensioning, VSD parameter audit, thermal imaging for hot spots.' },
  { area: 'Water Treatment & Recovery', items: 'Media sand bed differential pressure check, coalescing plate fouling assessment, vacuum blower seal integrity, chemical dosing pump accuracy, oil separator skimmer function test.' },
  { area: 'PLC & Safety Systems', items: 'Category 4 E-stop loop continuity verification, optical sensor cleaning & alignment, emergency valve manual actuation test, HMI and SCADA parameter review, fault log analysis.' },
  { area: 'Pipework, Valving & Booms', items: 'High-pressure swivel joint seals & torque, pneumatic solenoid response timing, non-return valve backflow test, anti-freeze trace heating continuity, boom arm balance and rotation.' },
  { area: 'Effluent & Drainage Systems', items: 'Sump pump operation & float switch, level sensor calibration, silt basket condition, trench grating integrity, drainage gradient verification.' },
  { area: 'Controls & Operator Interfaces', items: 'Touchscreen HMI condition, wash recipe verification, operator fob/remote signal test, bay indicator lights, alarm annunciator test.' },
];

const ASSET_HIERARCHY_LEVELS = [
  { level: '01', name: 'Plant', desc: 'The complete wash facility as a single managed infrastructure asset — e.g. "Warrington HGV Wash Plant".' },
  { level: '02', name: 'System', desc: 'Major functional systems within the plant — e.g. "High-Pressure Cleaning System", "Water Treatment System", "Control System".' },
  { level: '03', name: 'Subsystem', desc: 'Logical subsystems within each major system — e.g. "Triplex Pump Assembly", "Burner & Thermal Module", "Media Sand Filtration Unit".' },
  { level: '04', name: 'Asset', desc: 'Individual maintainable items with their own service records — e.g. "Pump No.1 (S/N 4491)", "Burner Unit", "Coalescing Separator".' },
  { level: '05', name: 'Component', desc: 'Specific components tracked for replacement within an asset — e.g. "Ceramic Plunger Set", "Coil Assembly", "VSD Drive Module".' },
];

const SPARES_CATEGORIES = [
  { component: 'Ceramic Plunger Set (per pump)', consequence: 'Production Halt', leadTime: '1–3 days standard', holding: 'Site-Consigned' },
  { component: 'High-Pressure Packing Seal Kit', consequence: 'Production Halt', leadTime: 'Same-day (Alkota hub)', holding: 'Alkota UK Hub' },
  { component: 'Manifold Check Valve Cartridges', consequence: 'Performance Loss', leadTime: '24–48 hours', holding: 'Alkota UK Hub' },
  { component: 'Unloader / Bypass Valve Assembly', consequence: 'Production Halt', leadTime: '1–5 days', holding: 'Site-Consigned' },
  { component: 'Burner Electrode Assembly', consequence: 'No Heat', leadTime: 'Same-day (Alkota hub)', holding: 'Alkota UK Hub' },
  { component: 'VSD Inverter Drive Module', consequence: 'Production Halt', leadTime: '3–10 days', holding: 'Project-Specific' },
  { component: 'Optical Sensor (vehicle detection)', consequence: 'Automation Disabled', leadTime: '2–5 days', holding: 'Alkota UK Hub' },
  { component: 'High-Pressure Swivel Joint', consequence: 'Bay Outage', leadTime: '1–3 days', holding: 'Site-Consigned' },
];

export default function WashPlantAssetManagementPage() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0 px-6 sm:px-12">
      <WashPlantSchema
        pageTitle="Wash Plant PPM & Asset Management | Alkota UK"
        pageDescription="Data-ready asset management for industrial wash plants. 5-level plant hierarchy, configurable PPM schedules, critical spares consignment, digital service records, and condition lifecycle governance."
        pageUrl="https://alkota.co.uk/wash-plant/asset-management"
        breadcrumbs={[
          { name: 'Home', url: 'https://alkota.co.uk' },
          { name: 'Wash Plant Infrastructure', url: 'https://alkota.co.uk/wash-plant' },
          { name: 'Asset Management & PPM', url: 'https://alkota.co.uk/wash-plant/asset-management' }
        ]}
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-7xl pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Asset Management & PPM' }
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // LIFECYCLE ASSET MANAGEMENT
            </span>
          </div>
          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            Know the condition of every asset.{' '}
            <span className="text-alkota-orange">Plan what comes next.</span>
          </h1>
          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            A wash plant is not a single asset — it is an operational system of interdependent mechanical, electrical, and water treatment equipment. We manage each element as a structured, data-driven asset hierarchy from commissioning through to refurbishment.
          </p>
          <div className="mt-4">
            <WashPlantCapabilityBadge label="DATA-READY" />
            <span className="ml-3 text-xs text-alkota-silver font-ibm-plex-mono uppercase tracking-wider">
              DATA-READY ASSET MANAGEMENT — manually maintained records, distinct from live telemetry
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact?enquiry=asset-management"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors">
              <span>Discuss Asset Management</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/wash-plant/service-maintenance"
              className="inline-flex items-center gap-3 border border-alkota-iron bg-white text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-alkota-orange transition-colors">
              <span>View Service & PPM</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* ── 5-LEVEL ASSET HIERARCHY ──────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // STRUCTURED ASSET ARCHITECTURE
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black mb-4">
              Five-level plant hierarchy.
            </h2>
            <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed max-w-2xl">
              Every managed wash plant is structured from the complete facility level down to individual replaceable components. This hierarchy drives targeted inspection schedules, structured service history, and obsolescence tracking at the appropriate level.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-alkota-iron hidden lg:block" />
            <div className="space-y-4">
              {ASSET_HIERARCHY_LEVELS.map((level, idx) => (
                <div key={idx} className="relative flex items-start gap-8">
                  <div className="relative z-10 bg-alkota-black text-alkota-orange w-16 h-16 flex items-center justify-center shrink-0 font-extralight text-2xl">
                    {level.level}
                  </div>
                  <div className="flex-1 bg-white border border-alkota-iron p-6 hover:border-alkota-orange transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black">
                        {level.name}
                      </h3>
                      {idx === 0 && <WashPlantCapabilityBadge label="VERIFIED ALKOTA BUILD" />}
                    </div>
                    <p className="text-xs text-alkota-silver leading-relaxed">{level.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 45-POINT PPM INSPECTION SCOPE ───────────────────────────────── */}
        <section className="mb-24 bg-alkota-black text-white p-10 sm:p-14">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // PLANNED PREVENTATIVE MAINTENANCE
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              45-Point Inspection Framework.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              Our PPM schedules are configured per asset, duty cycle, criticality rating, and OEM recommendation. The following represents the inspection architecture across a comprehensive wash plant installation. Not all elements apply to every plant — the schedule is engineered to your specific system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PPM_INSPECTION_SCOPE.map((section, idx) => (
              <div key={idx} className="bg-[#141414] border border-[#222] p-6 hover:border-alkota-orange transition-colors">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#222]">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm uppercase tracking-tight text-white">{section.area}</h4>
                </div>
                <p className="text-xs text-[#999] leading-relaxed">{section.items}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[11px] text-[#888]">
            <strong className="text-[#ccc] block mb-1">PPM Configuration Notice</strong>
            All PPM schedules are configured to the specific plant following a commissioning or site-survey review. Intervals are set by asset criticality, OEM recommendations, operating hours, and environmental duty. We do not publish a universal service interval for complex engineered systems.
          </div>
        </section>

        {/* ── CRITICAL SPARES STRATEGY ─────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // DOWNTIME MITIGATION
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black mb-4">
              Critical Spares Consignment Strategy.
            </h2>
            <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed max-w-2xl">
              For high-value wash infrastructure, component sourcing lead times are the primary driver of extended downtime. Alkota engineers review your system architecture and define a structured critical spares holding — site-held, Alkota hub-held, or a dual-consignment model.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px] divide-y divide-alkota-iron/30 border-y border-alkota-iron/30">
              <div className="grid grid-cols-12 text-[9px] font-ibm-plex-mono uppercase tracking-[0.25em] text-alkota-orange py-4">
                <span className="col-span-4">Component</span>
                <span className="col-span-3">Failure Consequence</span>
                <span className="col-span-3">Typical Lead Time</span>
                <span className="col-span-2 text-right">Holding Model</span>
              </div>
              {SPARES_CATEGORIES.map((spare, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 py-4 text-xs items-center">
                  <span className="col-span-4 text-alkota-black font-medium">{spare.component}</span>
                  <span className={`col-span-3 font-ibm-plex-mono text-[11px] ${
                    spare.consequence === 'Production Halt' ? 'text-red-600' : 'text-alkota-orange'
                  }`}>{spare.consequence}</span>
                  <span className="col-span-3 text-alkota-silver">{spare.leadTime}</span>
                  <span className="col-span-2 text-right text-alkota-black font-ibm-plex-mono text-[10px] uppercase">{spare.holding}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-alkota-bg border border-alkota-iron text-[10px] font-ibm-plex-mono text-alkota-silver">
            The above examples are illustrative of common critical spares categories. Actual spares packages are defined per asset model, duty profile, and commercial agreement. Lead times are indicative and subject to supplier availability.
          </div>
        </section>

        {/* ── DATA-READY APPROACH ──────────────────────────────────────────── */}
        <section className="mb-24 py-12 border-t border-alkota-iron/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <WashPlantCapabilityBadge label="DATA-READY" />
                <WashPlantCapabilityBadge label="REMOTE MONITORING CAPABLE" />
              </div>
              <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black leading-tight">
                Data-ready asset management.
              </h2>
              <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
                All Alkota-managed wash plant assets are maintained in a structured digital register — including asset hierarchy, service history, inspection readings, defect records, critical spares status, and lifecycle projections.
              </p>
              <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
                Where plants are configured with appropriate instrumentation gateways, this system architecture is <strong className="text-alkota-black font-normal">telemetry-capable</strong> — enabling run-hour tracking, fault-condition alerting, and performance trend analysis.
              </p>
              <div className="mt-2 p-4 bg-alkota-bg border border-alkota-iron text-[10px] font-ibm-plex-mono text-alkota-silver">
                <strong className="text-alkota-black block mb-1">Governance Notice</strong>
                Asset data in the Alkota platform is manually maintained from engineer visit records and client-supplied information. We clearly distinguish manually recorded data from live sensor telemetry. We do not present manual records as real-time operational data.
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-ibm-plex-mono text-xs">
              {[
                { icon: Layers, label: 'Asset Register', desc: '5-level plant hierarchy from facility to component' },
                { icon: Activity, label: 'Service History', desc: 'Complete chronological visit and repair records' },
                { icon: BarChart3, label: 'Condition Data', desc: 'Ratings, defect severity, and lifecycle projection' },
                { icon: Wrench, label: 'PPM Scheduling', desc: 'Configurable intervals by asset, duty, and OEM spec' },
                { icon: ShieldCheck, label: 'Critical Spares', desc: 'Structured spares register with stock status' },
                { icon: FileText, label: 'Service Reports', desc: 'Engineer reports, readings, defects, and sign-off' },
              ].map(({ icon: Icon, label, desc }, idx) => (
                <div key={idx} className="p-4 bg-alkota-bg border border-alkota-iron hover:border-alkota-orange transition-colors">
                  <Icon className="h-5 w-5 text-alkota-orange mb-2" />
                  <span className="text-alkota-black block uppercase tracking-tight">{label}</span>
                  <span className="text-[10px] text-alkota-silver">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPECIFIER CTA ─────────────────────────────────────────────────── */}
        <section className="mb-20">
          <WashPlantSpecifierCta />
        </section>
      </div>

      <Footer />
    </main>
  );
}
