/**
 * CategoryHeroGrid — category-aware hero metric grid for machine detail page.
 * Server component. Never renders 0, N/A, or — unless genuinely authoritative.
 * Adapts the up-to-4 displayed cells based on the machine's category and data.
 */

import { Product } from '@/lib/products';
import {
  formatPressure,
  formatFlowRate,
  formatTemperature,
  formatMotorPower,
  formatElectrical,
  formatBtu,
  formatWeight,
  categoryHasHeating,
  categoryHasPressure,
  categoryHasFlow,
  SpecValue,
} from '@/lib/spec-format';

interface HeroCell {
  label: string;
  value: string;
  secondary?: string;
  large?: boolean;
}

function resolveValue(sv: SpecValue): { value: string; secondary?: string } | null {
  if (!sv.isSpecified) return null;
  return { value: sv.display, secondary: sv.secondary };
}

function buildCells(machine: Product): HeroCell[] {
  const cells: HeroCell[] = [];
  const cat = machine.category;

  // ── Pressure washers & steam cleaners ─────────────────────────────────────
  if (categoryHasPressure(cat)) {
    const r = resolveValue(formatPressure(machine, 'metric'));
    if (r) cells.push({ label: 'Operating Pressure', ...r, large: true });
  }

  if (categoryHasFlow(cat)) {
    const r = resolveValue(formatFlowRate(machine, 'metric'));
    if (r) cells.push({ label: 'Water Flow Rate', ...r, large: true });
  }

  // Temperature for hot-water / steam (not heaters — they use BTU)
  if (categoryHasHeating(cat) && cat !== 'water-heater' && cat !== 'space-heater') {
    const sv = formatTemperature(machine, 'metric');
    if (sv.isSpecified && sv.raw !== 'ambient') {
      cells.push({ label: 'Max Water Temperature', value: sv.display, secondary: sv.secondary });
    }
  }

  // Drive unit for pressure washers
  if (categoryHasPressure(cat) || categoryHasFlow(cat)) {
    const r = resolveValue(formatMotorPower(machine, 'metric'));
    if (r) cells.push({ label: 'Drive Unit', ...r });
  }

  // ── Parts washers ──────────────────────────────────────────────────────────
  if (cat === 'parts-washer') {
    const btu = resolveValue(formatBtu(machine));
    if (btu) cells.push({ label: 'Heating Output', ...btu, large: true });

    const elec = resolveValue(formatElectrical(machine));
    if (elec) cells.push({ label: 'Electrical Supply', ...elec });

    if (machine.heating_fuel) cells.push({ label: 'Heating Fuel', value: machine.heating_fuel });

    const pwr = resolveValue(formatMotorPower(machine, 'metric'));
    if (pwr) cells.push({ label: 'Motor', ...pwr });
  }

  // ── Water heaters ──────────────────────────────────────────────────────────
  if (cat === 'water-heater') {
    const btu = resolveValue(formatBtu(machine));
    if (btu) cells.push({ label: 'Heat Output', ...btu, large: true });

    if (machine.heating_fuel) cells.push({ label: 'Fuel Type', value: machine.heating_fuel });

    const elec = resolveValue(formatElectrical(machine));
    if (elec) cells.push({ label: 'Electrical Supply', ...elec });

    const pwr = resolveValue(formatMotorPower(machine, 'metric'));
    if (pwr) cells.push({ label: 'Drive Unit', ...pwr });
  }

  // ── Space heaters ──────────────────────────────────────────────────────────
  if (cat === 'space-heater') {
    const btu = resolveValue(formatBtu(machine));
    if (btu) cells.push({ label: 'Heat Output', ...btu, large: true });

    if (machine.heating_fuel) cells.push({ label: 'Fuel Type', value: machine.heating_fuel });

    const pwr = resolveValue(formatMotorPower(machine, 'metric'));
    if (pwr) cells.push({ label: 'Drive Unit', ...pwr });
  }

  // ── Trailers ───────────────────────────────────────────────────────────────
  if (cat === 'trailer') {
    if (machine.mobility) cells.push({ label: 'Configuration', value: machine.mobility });
    if (machine.power_source) cells.push({ label: 'Power Source', value: machine.power_source });
    if (machine.heating_fuel) cells.push({ label: 'Heating Fuel', value: machine.heating_fuel });
    const wt = resolveValue(formatWeight(machine, 'metric'));
    if (wt) cells.push({ label: 'Gross Weight', ...wt });
  }

  // ── Water treatment ────────────────────────────────────────────────────────
  if (cat === 'water-treatment') {
    if (machine.power_source) cells.push({ label: 'Drive Unit', value: machine.power_source });
    const elec = resolveValue(formatElectrical(machine));
    if (elec) cells.push({ label: 'Electrical Supply', ...elec });
    if (machine.certifications && machine.certifications.length > 0) {
      cells.push({ label: 'Certifications', value: machine.certifications.join(' · ') });
    }
  }

  // Cap at 4 cells
  return cells.slice(0, 4);
}

interface Props {
  machine: Product;
}

export default function CategoryHeroGrid({ machine }: Props) {
  const cells = buildCells(machine);
  if (cells.length === 0) return null;

  return (
    <div className="mb-10 grid grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
      {cells.map((cell, i) => (
        <div key={i} className="bg-white p-5">
          <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-smoke block mb-1">
            {cell.label}
          </span>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className={`font-barlow-condensed font-black italic text-alkota-black leading-tight ${
                cell.large ? 'text-4xl' : 'text-xl'
              }`}
            >
              {cell.value}
            </span>
            {cell.secondary && (
              <span className="text-[10px] text-alkota-silver">
                ({cell.secondary})
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
