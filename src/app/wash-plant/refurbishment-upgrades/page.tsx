import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import { 
  ArrowRight, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  Factory, 
  Cpu, 
  Droplets, 
  ShieldCheck, 
  Zap,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Refurbishment & Upgrades | Alkota UK',
  description: 'Life-extension engineering, brownfield retrofits, pump overhauls, PLC modernization, and water recycling additions for existing industrial wash plants across the UK.',
};

export default function WashPlantRefurbishmentPage() {
  const upgradeCapabilities = [
    { title: 'Pump Skid Modernization', desc: 'Replacing obsolete, undersized, or worn pump units with modern high-efficiency triplex ceramic plunger assemblies with soft-start VSD control.' },
    { title: 'PLC & Automation Migration', desc: 'Upgrading hard-wired relay panels or obsolete PLCs to modern Siemens / Mitsubishi architectures with touchscreen HMI and telemetry.' },
    { title: 'Water Recycling Retrofit', desc: 'Adding closed-loop media sand filtration and coalescing oil separation to convert direct-discharge wash bays into sustainable, compliant facilities.' },
    { title: 'High-Efficiency Thermal Coils', desc: 'Replacing scaled or inefficient heating coils with continuous Schedule 80 ASTM A53 assemblies and high-efficiency gas/diesel burners.' },
    { title: 'Automated Underbody Rigs', desc: 'Adding automated chassis and wheel wash spinner bars to existing manual wash bays to accelerate vehicle turnaround times.' },
    { title: 'Safety & Interlock Compliance', desc: 'Retrofitting Category 4 dual-channel E-stop loops, light curtains, and safety isolation valves to meet current UK EHS standards.' }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0">
      <WashPlantSchema
        pageTitle="Wash Plant Refurbishment & Upgrades | Alkota UK"
        pageDescription="Life-extension engineering, brownfield retrofits, pump overhauls, PLC modernization, and water recycling additions for existing industrial wash plants across the UK."
        pageUrl="https://alkota.co.uk/wash-plant/refurbishment-upgrades"
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Refurbishment & Upgrades' }
        ]} />

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // LIFE-EXTENSION & BROWNFIELD ENGINEERING
            </span>
          </div>

          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            Extend the life <br />
            <span className="text-alkota-orange">of the plant.</span>
          </h1>

          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            A £500k+ wash installation should not be scrapped simply because one subsystem is obsolete. Alkota brownfield engineering delivers targeted refurbishment, automation upgrades, and water treatment retrofits on live operational sites.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact?enquiry=wash-plant-refurbishment"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
            >
              <span>Request Plant Condition Survey</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/wash-plant/architect"
              className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-4 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
            >
              <span>Scope Upgrade in Architect</span>
            </Link>
          </div>
        </header>

        {/* ── BROWNFIELD METHODOLOGY ──────────────────────────────────────── */}
        <section className="mb-24 bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // BROWNFIELD ENGINEERING PROCESS
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-3">
              Phased Delivery on Live Operational Sites.
            </h2>
            <p className="text-xs text-alkota-silver leading-relaxed">
              We understand that halting operations for weeks is commercially unviable. Our engineers execute phased brownfield overhauls — preparing skids off-site and scheduling cutovers during planned downtime windows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-alkota-iron border border-alkota-iron font-ibm-plex-mono text-xs">
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">01</span>
              <span className="text-alkota-black uppercase">Site Condition Survey</span>
            </div>
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">02</span>
              <span className="text-alkota-black uppercase">Obsolescence Mapping</span>
            </div>
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">03</span>
              <span className="text-alkota-black uppercase">Upgrade CAD Design</span>
            </div>
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">04</span>
              <span className="text-alkota-black uppercase">Off-Site Pre-Build</span>
            </div>
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">05</span>
              <span className="text-alkota-black uppercase">Phased Installation</span>
            </div>
            <div className="bg-alkota-bg p-4 flex flex-col justify-between">
              <span className="text-alkota-orange text-lg block mb-1">06</span>
              <span className="text-alkota-black uppercase">Re-Commissioning & SAT</span>
            </div>
          </div>
        </section>

        {/* ── UPGRADE CAPABILITIES ────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // UPGRADE PATHWAYS
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
              Common Plant Modernizations.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upgradeCapabilities.map((upg, idx) => (
              <div key={idx} className="bg-white border border-alkota-iron p-6 hover:border-alkota-orange transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <h4 className="text-sm uppercase text-alkota-black font-normal">{upg.title}</h4>
                </div>
                <p className="text-xs text-alkota-silver leading-relaxed pl-6">
                  {upg.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMERCIAL LIFECYCLE LOOPS ───────────────────────────────────── */}
        <section className="mb-24 bg-alkota-black text-white p-10 sm:p-14">
          <div className="max-w-3xl mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // COMPLETE LIFECYCLE CONTINUITY
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-3">
              The CAPEX & Service Continuity Loop.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              Alkota manages the full lifecycle: from legacy plant audits through upgrade engineering, handover, and ongoing planned maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-ibm-plex-mono text-xs">
            <div className="bg-[#141414] border border-[#2A2A2A] p-6 space-y-3">
              <span className="text-alkota-orange uppercase block">SERVICE → UPGRADE PATHWAY</span>
              <p className="text-[#aaa]">01. Existing plant experiences repeated breakdown</p>
              <p className="text-[#aaa]">02. Alkota performs comprehensive condition report</p>
              <p className="text-[#aaa]">03. Targeted engineering upgrade replaces obsolete sub-systems</p>
              <p className="text-[#aaa]">04. Refurbished plant handed over into structured PPM agreement</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] p-6 space-y-3">
              <span className="text-alkota-orange uppercase block">CAPEX → LIFECYCLE PATHWAY</span>
              <p className="text-[#aaa]">01. Turnkey new wash plant designed and commissioned</p>
              <p className="text-[#aaa]">02. Asset register created in client portal</p>
              <p className="text-[#aaa]">03. Multi-year scheduled PPM & telemetry monitoring</p>
              <p className="text-[#aaa]">04. Planned component replacement roadmap prevents obsolescence</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
