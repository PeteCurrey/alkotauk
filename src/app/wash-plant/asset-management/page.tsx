import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Activity, 
  Layers, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Clock,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant PPM & Asset Management | Alkota UK',
  description: 'Structured planned preventative maintenance (PPM) models, digital asset registers, critical spares management, and condition reporting for industrial wash plants across the UK.',
};

export default function WashPlantAssetManagementPage() {
  const ppmInspectionScope = [
    { area: 'High-Pressure Triplex Pumps', items: 'Crankcase oil analysis, ceramic plunger inspection, packing seal integrity, manifold valve seating, unloader valve calibration.' },
    { area: 'Thermal Heating Systems', items: 'Continuous Schedule 80 coil thickness check, burner combustion efficiency, electrode gap calibration, fuel filter changeout.' },
    { area: 'Electric Motors & Drives', items: 'Phase-to-earth insulation testing, bearing vibration monitoring, drive belt tensioning, inverter heat-sink de-dusting.' },
    { area: 'Water Treatment & Recovery', items: 'Media sand bed differential pressure, coalescing plate fouling assessment, vacuum blower seal integrity, chemical dosing accuracy.' },
    { area: 'PLC & Safety Systems', items: 'Category 4 E-stop loop verification, optical sensor alignment, emergency valve actuation test, firmware/logic diagnostic read.' },
    { area: 'Pipework, Valving & Booms', items: 'High-pressure swivel joint seals, pneumatic solenoid response, non-return valve backflow test, anti-freeze trace heating check.' }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-32 pb-0">
      <Navigation />

      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Asset Management & PPM' }
        ]} />

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // ASSET GOVERNANCE & LIFECYCLE MANAGEMENT
            </span>
          </div>

          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            PPM is not a visit. <br />
            <span className="text-alkota-orange">It is lifecycle governance.</span>
          </h1>

          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            Planned Preventative Maintenance (PPM) on high-value industrial cleaning infrastructure is a structured engineering programme. We track asset condition, schedule wear-based overhauls, maintain digital asset registers, and generate data to eliminate unplanned downtime.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact?enquiry=wash-plant-ppm"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
            >
              <span>Establish PPM Programme</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/wash-plant/architect"
              className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-4 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
            >
              <span>Scope New Plant with PPM</span>
            </Link>
          </div>
        </header>

        {/* ── PPM MODEL: FREQUENCY CONFIGURATION ─────────────────────────── */}
        <section className="mb-24 bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // TAILORED FREQUENCIES
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-3">
              Calibrated to Operating Hours and Criticality.
            </h2>
            <p className="text-xs text-alkota-silver leading-relaxed">
              We do not impose rigid generic intervals. PPM frequencies are configured around asset duty, throughput volume, water chemistry, environmental exposure, and manufacturer compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-ibm-plex-mono text-xs uppercase">
            <div className="p-4 bg-alkota-bg border border-alkota-iron">
              <span className="text-alkota-orange block mb-1">MONTHLY</span>
              <span className="text-alkota-black">24/7 Heavy Operations</span>
              <p className="text-[10px] text-alkota-silver normal-case mt-1">High-throughput rig mat washers and mining de-muck bays.</p>
            </div>
            <div className="p-4 bg-alkota-bg border border-alkota-iron">
              <span className="text-alkota-orange block mb-1">QUARTERLY</span>
              <span className="text-alkota-black">High-Duty Commercial</span>
              <p className="text-[10px] text-alkota-silver normal-case mt-1">Multi-bay logistics depots and bus wash facilities.</p>
            </div>
            <div className="p-4 bg-alkota-bg border border-alkota-iron">
              <span className="text-alkota-orange block mb-1">SIX-MONTHLY</span>
              <span className="text-alkota-black">Single-Shift Plants</span>
              <p className="text-[10px] text-alkota-silver normal-case mt-1">Standard industrial yards with moderate daily asset counts.</p>
            </div>
            <div className="p-4 bg-alkota-bg border border-alkota-iron">
              <span className="text-alkota-orange block mb-1">HOUR-BASED</span>
              <span className="text-alkota-black">Telemetry Metered</span>
              <p className="text-[10px] text-alkota-silver normal-case mt-1">Triggered precisely at 250, 500, and 1,000 run hours.</p>
            </div>
          </div>
        </section>

        {/* ── ASSET REGISTER HIERARCHY ────────────────────────────────────── */}
        <section className="mb-24 bg-[#0D0D0D] text-white p-10 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                // STRUCTURED ASSET REGISTERS
              </span>
              <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                Digital Asset Architecture.
              </h2>
              <p className="text-xs text-[#888] leading-relaxed">
                Every managed wash plant is structured into an engineering asset hierarchy: Plant → System → Subsystem → Asset → Component. This ensures service records, parts history, and warranty statuses are tracked at granular level.
              </p>
              <p className="text-xs text-[#888] leading-relaxed">
                This data structure enables seamless conversion from new project commissioning into active lifecycle management without manual re-entry.
              </p>
            </div>

            {/* Asset Tree Visual */}
            <div className="lg:col-span-6 bg-[#161616] border border-[#2A2A2A] p-6 font-ibm-plex-mono text-xs text-[#aaa] space-y-2">
              <div className="text-white flex items-center gap-2 pb-2 border-b border-[#333]">
                <span className="text-alkota-orange">●</span>
                <span>WASH PLANT WP-001 // Logistics Hub 4</span>
              </div>
              <div className="pl-4 space-y-1.5 border-l border-[#333]">
                <div className="text-alkota-steel">├── CLEANING SYSTEM (High Pressure)</div>
                <div className="pl-6 text-[#777]">├── Triplex Plunger Pump Skid P-01</div>
                <div className="pl-6 text-[#777]">├── Triplex Plunger Pump Skid P-02 (Standby)</div>
                <div className="pl-6 text-[#777]">└── Schedule 80 Thermal Coil Assembly B-01</div>
                <div className="text-alkota-steel">├── WATER TREATMENT & RECOVERY</div>
                <div className="pl-6 text-[#777]">├── Media Sand Filtration Vessel F-01</div>
                <div className="pl-6 text-[#777]">├── Coalescing Oil/Water Separator S-01</div>
                <div className="pl-6 text-[#777]">└── 5,000L Recycled Water Buffer Tank TK-01</div>
                <div className="text-alkota-steel">└── AUTOMATION & CONTROLS</div>
                <div className="pl-6 text-[#777]">├── Siemens S7-1200 Master PLC</div>
                <div className="pl-6 text-[#777]">└── Inverter Variable Speed Drive VSD-01</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 45-POINT PPM SCOPE ──────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // INSPECTION SCOPE
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
              What a planned visit covers.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ppmInspectionScope.map((scope, idx) => (
              <div key={idx} className="bg-white border border-alkota-iron p-6 hover:border-alkota-orange transition-colors">
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange block mb-2">
                  0{idx + 1} //
                </span>
                <h4 className="text-sm uppercase text-alkota-black font-normal mb-2">{scope.area}</h4>
                <p className="text-xs text-alkota-silver leading-relaxed">
                  {scope.items}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
