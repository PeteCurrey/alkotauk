import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  STARTING_CONFIGURATIONS,
  UK_CHASSIS_OPTIONS,
  TRAILER_MACHINE_OPTIONS,
  WATER_STORAGE_OPTIONS,
  WATER_RECOVERY_OPTIONS,
  calculateTrailerWeights,
  calculateEndurance,
  calculateCommercialValue,
} from '@/lib/trailers/configurator-data';
import { ArrowRight, Scale, CheckCircle2, Droplets, Flame, Recycle, ShieldCheck, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Alkota Trailer Rigs & Specifications | Alkota UK',
  description: 'Side-by-side technical comparison of Alkota bespoke pressure washer trailers. Compare payload, water endurance, recovery, and guide build values.',
};

export default function TrailerComparePage() {
  // Compare 3 primary representative starting specifications
  const compareSpecs = [
    STARTING_CONFIGURATIONS[0], // Hot Water Contractor Open 1500kg
    STARTING_CONFIGURATIONS[1], // Dual Operator Fleet Open 2700kg
    STARTING_CONFIGURATIONS[2], // Enclosed Plant Room 2700kg
    STARTING_CONFIGURATIONS[3], // Closed Loop Recovery 3500kg
  ];

  return (
    <main className="bg-alkota-black min-h-screen text-white">
      <Navigation />

      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Technical Comparison Matrix
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            COMPARE ALKOTA<br />
            <span className="text-alkota-orange">TRAILER PLATFORMS</span>
          </h1>

          <p className="text-alkota-silver text-sm md:text-base font-light leading-relaxed">
            Evaluate open-deck versus enclosed architectures, payload capacities, continuous water endurance, and recovery tiers side-by-side to determine the optimal configuration for your operational requirements.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-alkota-iron bg-[#090909]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-alkota-iron bg-[#0D0D0D]">
                <th className="p-5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] w-1/5">
                  Specification Parameter
                </th>
                {compareSpecs.map(spec => (
                  <th key={spec.id} className="p-5 w-1/5 border-l border-alkota-iron">
                    {spec.badge && (
                      <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-widest text-alkota-orange border border-alkota-orange/40 bg-alkota-orange/10 px-2 py-0.5 inline-block mb-2">
                        {spec.badge}
                      </span>
                    )}
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase italic text-white">
                      {spec.name}
                    </h3>
                    <p className="font-ibm-plex-mono text-xs text-alkota-orange mt-1">
                      {spec.guide_price_display}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] font-inter text-xs">
              {/* Format */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Architecture
                </td>
                {compareSpecs.map(s => (
                  <td key={s.id} className="p-4 border-l border-alkota-iron text-white font-medium">
                    {s.format === 'open-deck' ? 'Open Deck System' : 'Enclosed Mobile Plant Room'}
                  </td>
                ))}
              </tr>

              {/* Chassis & MAM */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  UK Chassis & MAM
                </td>
                {compareSpecs.map(s => {
                  const ch = UK_CHASSIS_OPTIONS.find(c => c.id === s.chassis_id);
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-alkota-silver">
                      {ch?.name.split('—')[0].trim()} ({ch?.mam_kg.toLocaleString()}kg MAM)
                    </td>
                  );
                })}
              </tr>

              {/* Cleaning Skid */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Cleaning Machine
                </td>
                {compareSpecs.map(s => {
                  const m = TRAILER_MACHINE_OPTIONS.find(item => item.id === s.machine_id);
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-alkota-silver">
                      <p className="font-medium text-white">{m?.model_code}</p>
                      <p className="text-[11px] text-[#777] mt-0.5">{m?.pressure_bar} Bar · {m?.flow_lpm} LPM · {m?.max_temp_c}°C</p>
                    </td>
                  );
                })}
              </tr>

              {/* Operators */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Operator Capacity
                </td>
                {compareSpecs.map(s => (
                  <td key={s.id} className="p-4 border-l border-alkota-iron text-white font-medium">
                    {s.operator_count === 2 ? '2 Operators (Dual Gun)' : '1 Operator (Single Lance)'}
                  </td>
                ))}
              </tr>

              {/* Water Storage */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Water Reservoir
                </td>
                {compareSpecs.map(s => {
                  const t = WATER_STORAGE_OPTIONS.find(item => item.id === s.water_storage_id);
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-white font-medium">
                      {t?.litres.toLocaleString()} Litres (Baffled)
                    </td>
                  );
                })}
              </tr>

              {/* Endurance */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Water Endurance
                </td>
                {compareSpecs.map(s => {
                  const m = TRAILER_MACHINE_OPTIONS.find(item => item.id === s.machine_id);
                  const t = WATER_STORAGE_OPTIONS.find(item => item.id === s.water_storage_id);
                  const end = m && t ? calculateEndurance(t.litres, m.flow_lpm, s.operator_count) : null;
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-alkota-silver">
                      {end ? `~${end.typical_trigger_hours} hrs working session` : 'Continuous'}
                    </td>
                  );
                })}
              </tr>

              {/* Recovery */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Wastewater Recovery
                </td>
                {compareSpecs.map(s => {
                  const rec = WATER_RECOVERY_OPTIONS.find(item => item.id === s.recovery_option_id);
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-alkota-silver">
                      <span className={rec?.tier !== 'none' ? 'text-green-400 font-medium' : 'text-[#666]'}>
                        {rec?.name}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Mass & Payload */}
              <tr>
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] bg-[#0B0B0B]">
                  Mass & Payload Margin
                </td>
                {compareSpecs.map(s => {
                  const w = calculateTrailerWeights(s);
                  return (
                    <td key={s.id} className="p-4 border-l border-alkota-iron text-alkota-silver">
                      <p>Dry: <span className="text-white font-mono">{w.estimated_dry_weight_kg}kg</span></p>
                      <p>Wet: <span className="text-alkota-orange font-mono font-bold">{w.estimated_wet_weight_kg}kg</span></p>
                      <p className="text-green-400 font-mono text-[11px] mt-0.5">+{w.payload_margin_kg}kg reserve</p>
                    </td>
                  );
                })}
              </tr>

              {/* Action */}
              <tr className="bg-[#080808]">
                <td className="p-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
                  Customise Specification
                </td>
                {compareSpecs.map(s => (
                  <td key={s.id} className="p-4 border-l border-alkota-iron">
                    <Link
                      href={`/trailers/configure?start=${s.slug}`}
                      className="inline-flex items-center gap-2 bg-alkota-orange px-4 py-2.5 font-ibm-plex-mono text-[9px] uppercase font-bold tracking-widest text-white hover:bg-alkota-orange/90 transition-all group w-full justify-center"
                    >
                      <span>Customise</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0D0D0D] border border-alkota-iron p-6">
          <div>
            <h4 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white">
              Need a completely bespoke configuration?
            </h4>
            <p className="text-alkota-grey text-xs mt-1 font-light">
              Build your system from the ground up using our interactive 13-step configurator.
            </p>
          </div>
          <Link
            href="/trailers/configure"
            className="inline-flex items-center gap-2 border border-alkota-orange px-6 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-alkota-orange transition-all shrink-0"
          >
            Open Configurator From Scratch →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
