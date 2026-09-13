/**
 * MachineSpecTable — full technical specification table.
 * Server component. Category-aware. Deduplicates extra_specs.
 * Never renders empty rows or placeholder zeros.
 */

import { Product } from '@/lib/products';
import {
  formatPressure,
  formatFlowRate,
  formatTemperature,
  formatMotorPower,
  formatElectrical,
  formatWeight,
  formatDimensions,
  formatBtu,
  formatFuelTank,
  formatFuelConsumption,
  formatCoilLength,
  dedupeExtraSpecs,
  categoryHasHeating,
  categoryHasPressure,
  categoryHasFlow,
  SpecValue,
} from '@/lib/spec-format';

// Labels that are already rendered in the top-level spec table — skip from extra_specs
const SKIP_EXTRA_LABELS = new Set([
  'phase', 'amp requirement', 'motor power', 'horsepower', 'pump type', 'pump style',
  'coil type', 'coil construction type', 'flow rate', 'pressure', 'operating pressure',
  'water flow', 'voltage', 'temperature', 'btu', 'btu rating', 'heating fuel', 'fuel source',
  'fuel consumption', 'fuel tank capacity', 'weight', 'dimensions',
]);

function Row({ label, value }: { label: string; value: SpecValue }) {
  if (!value.isSpecified) return null;
  return (
    <tr className="hover:bg-alkota-bg transition-colors">
      <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider w-[48%] align-top">
        {label}
      </td>
      <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">
        {value.display}
        {value.secondary && (
          <span className="font-inter text-sm font-normal text-alkota-smoke ml-2 not-italic">
            ({value.secondary})
          </span>
        )}
      </td>
    </tr>
  );
}

interface Props {
  machine: Product;
  modelCode: string;
}

export default function MachineSpecTable({ machine, modelCode }: Props) {
  const cat = machine.category;
  const hasPressure = categoryHasPressure(cat);
  const hasFlow = categoryHasFlow(cat);
  const hasHeating = categoryHasHeating(cat);

  // ── Left column rows ───────────────────────────────────────────────────────
  const leftRows: Array<{ label: string; value: SpecValue }> = [];

  if (hasPressure) leftRows.push({ label: 'Operating Pressure', value: formatPressure(machine, 'metric') });
  if (hasFlow) leftRows.push({ label: 'Water Flow Rate', value: formatFlowRate(machine, 'metric') });
  if (hasHeating) {
    leftRows.push({ label: 'Max Temperature', value: formatTemperature(machine, 'metric') });
    leftRows.push({ label: 'Thermal Output', value: formatBtu(machine) });
  }
  leftRows.push({ label: 'Electrical Supply', value: formatElectrical(machine) });
  leftRows.push({ label: 'Drive Unit', value: formatMotorPower(machine, 'metric') });
  if (machine.heating_fuel && hasHeating) {
    leftRows.push({
      label: 'Heating Fuel',
      value: { display: machine.heating_fuel, raw: machine.heating_fuel, isSpecified: true },
    });
  }
  if (machine.fuel_tank_capacity_gal && hasHeating) {
    leftRows.push({ label: 'Fuel Tank Capacity', value: formatFuelTank(machine, 'metric') });
  }
  if (machine.fuel_consumption_gph && hasHeating) {
    leftRows.push({ label: 'Fuel Consumption', value: formatFuelConsumption(machine, 'metric') });
  }

  // ── Right column rows ──────────────────────────────────────────────────────
  const rightRows: Array<{ label: string; value: SpecValue }> = [];

  rightRows.push({ label: 'Operating Weight', value: formatWeight(machine, 'metric') });
  rightRows.push({ label: 'Dimensions (L×W×H)', value: formatDimensions(machine, 'metric') });

  if (machine.mobility) {
    rightRows.push({
      label: 'Chassis / Mobility',
      value: { display: machine.mobility, raw: machine.mobility, isSpecified: true },
    });
  }
  if (machine.pump_type) {
    rightRows.push({
      label: 'Pump Architecture',
      value: { display: machine.pump_type.replace('|', ' · '), raw: machine.pump_type, isSpecified: true },
    });
  }
  if (machine.coil_type) {
    rightRows.push({
      label: 'Heating Coil System',
      value: { display: machine.coil_type, raw: machine.coil_type, isSpecified: true },
    });
  }
  if (machine.coil_length_ft) {
    rightRows.push({ label: 'Coil Pipe Length', value: formatCoilLength(machine, 'metric') });
  }
  if (machine.duty_application) {
    rightRows.push({
      label: 'Duty Rating',
      value: { display: machine.duty_application, raw: machine.duty_application, isSpecified: true },
    });
  }
  if (machine.certifications && machine.certifications.length > 0) {
    rightRows.push({
      label: 'Certifications',
      value: {
        display: machine.certifications.join(' · '),
        raw: machine.certifications.join(', '),
        isSpecified: true,
      },
    });
  }
  // Warranty
  rightRows.push({
    label: machine.coil_warranty_years ? 'Coil Warranty' : 'Equipment Warranty',
    value: {
      display: machine.coil_warranty_years
        ? `${machine.coil_warranty_years} Years (Hydro-Insulated)`
        : `${machine.warranty_years || 1} Year Parts & Labour`,
      raw: machine.coil_warranty_years || machine.warranty_years,
      isSpecified: true,
    },
  });

  // ── Deduplicated extra_specs (filter already-covered fields) ───────────────
  const cleanedExtra = dedupeExtraSpecs(machine.extra_specs || []).filter(
    (s) => !SKIP_EXTRA_LABELS.has(s.label.toLowerCase().trim())
  );

  const hasAnyLeft = leftRows.some((r) => r.value.isSpecified);
  const hasAnyRight = rightRows.some((r) => r.value.isSpecified);

  return (
    <>
      {/* ── Main dual-column spec table ─ */}
      {(hasAnyLeft || hasAnyRight) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
          <table className="w-full text-left border-collapse bg-white">
            <tbody className="divide-y divide-alkota-iron">
              {leftRows.map((row) => (
                <Row key={row.label} label={row.label} value={row.value} />
              ))}
            </tbody>
          </table>
          <table className="w-full text-left border-collapse bg-white">
            <tbody className="divide-y divide-alkota-iron">
              {rightRows.map((row) => (
                <Row key={row.label} label={row.label} value={row.value} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Extended manufacturer data from extra_specs ─ */}
      {cleanedExtra.length > 0 && (
        <div className="mt-8 bg-white border border-alkota-iron p-8">
          <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
            // MANUFACTURER DETAILED DATA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleanedExtra.map((s, idx) => (
              <div key={`${s.label}-${idx}`} className="border-b border-alkota-iron/60 pb-3">
                <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-silver uppercase tracking-wider block mb-1">
                  {s.label}
                </span>
                <span className="font-inter text-xs font-semibold text-alkota-black">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
