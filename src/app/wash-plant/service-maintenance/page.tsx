import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  PhoneCall, 
  AlertCircle, 
  Cpu, 
  Flame, 
  Droplets, 
  Zap 
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Service & Maintenance | PPM & Repairs | Alkota UK',
  description: 'Planned preventative maintenance, emergency reactive callouts, high-pressure pump overhauls, burner servicing and third-party plant support for industrial wash plants across the UK.',
};

export default function WashPlantServicePage() {
  const serviceCapabilities = [
    { title: 'Planned Preventative Maintenance', desc: 'Configurable periodic mechanical, electrical, and hydraulic inspection cycles calibrated to operating hours and duty.' },
    { title: 'Emergency Reactive Callout', desc: 'Rapid on-site diagnostic and emergency repair response for mission-critical wash facilities experiencing unplanned downtime.' },
    { title: 'High-Pressure Pump Overhaul', desc: 'Precision workshop rebuilds of industrial triplex ceramic plunger pumps, packing seals, check valves, and crankshaft assemblies.' },
    { title: 'Burner & Thermal Combustion', desc: 'Combustion analysis, electrode calibration, nozzle replacement, and safety interlock certification for natural gas, LPG, and diesel burners.' },
    { title: 'Electric Motors & VSD Drives', desc: 'Insulation resistance testing, bearing replacement, and inverter drive programming to prevent sudden motor stator burnout.' },
    { title: 'PLC & Control Diagnostics', desc: 'Programmable logic controller fault tracing, sensor recalibration, relay replacement, and HMI interface troubleshooting.' },
    { title: 'Water Treatment & Filtration', desc: 'Filter media replacement, vacuum blower overhauls, coalescing separator cleaning, and closed-loop water balance testing.' },
    { title: 'Pipework, Valving & Booms', desc: 'Schedule 80 reticulation leak repair, high-pressure swivel joint overhauls, pneumatic valve testing, and boom arm alignment.' },
    { title: 'Winterisation & Frost Defense', desc: 'Automated thermal tracing inspection, purge valve servicing, and winter standby protection to prevent burst coils and frost damage.' },
    { title: 'Third-Party Wash Plant Support', desc: 'Engineering servicing and parts support for industrial wash systems not originally supplied by Alkota UK.' }
  ];

  const contractTiers = [
    {
      tier: 'Tier 01',
      name: 'Planned Preventative Maintenance (PPM)',
      focus: 'Scheduled Servicing',
      description: 'Structured routine mechanical and electrical servicing to prevent wear-induced failure and maintain manufacturer warranty compliance.',
      features: [
        'Quarterly or semi-annual comprehensive site visits',
        'Full 45-point mechanical, electrical, and thermal inspection',
        'Pump fluid, seal, and consumable filter changeouts',
        'Formal branded visit report and compliance sign-off'
      ]
    },
    {
      tier: 'Tier 02',
      name: 'Planned + Priority Reactive',
      focus: 'Uptime Assurance',
      description: 'Combines scheduled preventative maintenance with guaranteed priority technician dispatch for unscheduled breakdowns.',
      features: [
        'All standard PPM inspection and servicing inclusions',
        'Defined SLA response target for critical breakdowns',
        'Preferential labour and replacement parts rates',
        'Dedicated telephone engineering technical hotline'
      ]
    },
    {
      tier: 'Tier 03',
      name: 'Managed Asset Support',
      focus: 'Total Plant Governance',
      description: 'Comprehensive lifecycle management including on-site critical spares consignment, telemetry monitoring, and condition reporting.',
      features: [
        'Scheduled PPM + unlimited priority breakdown callouts',
        'Site-consigned critical spares holding managed by Alkota',
        'Annual condition assessment and life-extension roadmap',
        'Dedicated senior application engineer account lead'
      ]
    },
    {
      tier: 'Tier 04',
      name: 'Critical Operations 24/7',
      focus: 'Zero-Downtime Infrastructure',
      description: 'Engineered for high-volume 24/7 logistics hubs, rail depots, and mining operations where any unplanned downtime carries severe penalty.',
      features: [
        '24/7 emergency dispatch coverage window',
        'N+1 redundant standby equipment protocols',
        'Real-time automated telemetry fault alerts',
        'Quarterly water quality & trade effluent audits'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-32 pb-0">
      <Navigation />

      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Service & Maintenance' }
        ]} />

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // LIFECYCLE SERVICE & SUPPORT DIVISION
            </span>
          </div>

          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            The plant only creates value <br />
            <span className="text-alkota-orange">when it runs.</span>
          </h1>

          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            A high-throughput wash plant is mission-critical operational infrastructure. We engineer servicing, planned maintenance, and rapid repair agreements that protect uptime, reduce total lifecycle cost, and extend asset longevity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact?enquiry=wash-plant-service"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
            >
              <span>Discuss Service Agreement</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="tel:01772822822"
              className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-4 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-alkota-orange" />
              <span>Emergency Hotline: 01772 822 822</span>
            </Link>
          </div>
        </header>

        {/* ── THREE SERVICE PILLARS ───────────────────────────────────────── */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-alkota-iron p-8 shadow-sm">
            <Activity className="h-8 w-8 text-alkota-orange mb-4" />
            <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
              Maximum Availability
            </h3>
            <p className="text-xs text-alkota-silver leading-relaxed">
              Unplanned downtime halts vehicle flow, disrupts dispatch schedules, and accumulates fleet contamination. Our scheduled PPM models identify component wear before it causes catastrophic failure.
            </p>
          </div>

          <div className="bg-white border border-alkota-iron p-8 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-alkota-orange mb-4" />
            <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
              Technical Competence
            </h3>
            <p className="text-xs text-alkota-silver leading-relaxed">
              Our factory-trained technicians carry specialized diagnostic instrumentation, calibrated combustion testers, genuine OEM pump spares, and pressure measurement manifolds on every visit.
            </p>
          </div>

          <div className="bg-white border border-alkota-iron p-8 shadow-sm">
            <Wrench className="h-8 w-8 text-alkota-orange mb-4" />
            <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
              Multi-Brand Capability
            </h3>
            <p className="text-xs text-alkota-silver leading-relaxed">
              We don't need to have built your wash plant to keep it running. Our engineering team routinely takes over maintenance and overhauls on third-party and legacy industrial wash installations.
            </p>
          </div>
        </section>

        {/* ── SERVICE CAPABILITIES GRID ───────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // TECHNICAL CAPABILITIES
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
              What we service and overhaul.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceCapabilities.map((cap, idx) => (
              <div key={idx} className="bg-white border border-alkota-iron p-6 hover:border-alkota-orange transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <h4 className="text-sm uppercase text-alkota-black font-normal">{cap.title}</h4>
                </div>
                <p className="text-xs text-alkota-silver leading-relaxed pl-6">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICE CONTRACT TIERS ──────────────────────────────────────── */}
        <section className="mb-24 bg-alkota-black text-white p-10 sm:p-14">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // STRUCTURED CONTRACT TIERS
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              Service Agreement Architecture.
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              We do not sell generic Bronze/Silver/Gold marketing packages. We structure rigorous commercial agreements calibrated to your site criticality, operating hours, and internal maintenance capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractTiers.map((tier, idx) => (
              <div key={idx} className="bg-[#141414] border border-[#2A2A2A] p-8 flex flex-col justify-between hover:border-alkota-orange transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#222]">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                      {tier.tier} // {tier.focus}
                    </span>
                  </div>
                  <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-3">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#999] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#ccc]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222] text-[10px] font-ibm-plex-mono text-[#666] uppercase">
                  Schedules configured per site survey
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CRITICAL SPARES STRATEGY ────────────────────────────────────── */}
        <section className="mb-24 bg-white border border-alkota-iron p-10 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                // DOWNTIME MITIGATION
              </span>
              <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                Critical Spares Consignment Strategy.
              </h3>
              <p className="text-xs text-alkota-silver leading-relaxed">
                For high-value wash infrastructure, component sourcing lead times represent the primary driver of extended downtime. Alkota engineers evaluate your system architecture to assemble a site-consigned or UK-hub-held critical spares package — including ceramic plungers, seal kits, check valves, optical sensors, burner electrodes, and VSD spares.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/contact?enquiry=critical-spares"
                className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                <span>Request Spares Audit →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
