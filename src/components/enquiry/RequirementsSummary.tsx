import React from 'react';
import { Check, ShieldAlert, Cpu } from 'lucide-react';

export interface StructuredRequirementsProps {
  application?: string;
  waterType?: string;
  minPressureBar?: number | null;
  minFlowLpm?: number | null;
  powerSource?: string;
  voltage?: string;
  phase?: string | number;
  mobility?: string;
  preferences?: string[];
  confirmationItems?: string[];
}

const APPLICATION_LABELS: Record<string, string> = {
  FLEET_VEHICLE_CLEANING: 'Fleet & Commercial Vehicle Cleaning',
  AGRICULTURAL_HEAVY_PLANT: 'Agricultural & Heavy Plant Degreasing',
  CONSTRUCTION_FACILITY_MAINTENANCE: 'Construction & Facilities Maintenance',
  FOOD_HYGIENE_PROCESSING: 'Food Production & Hygiene Processing',
  FACTORY_MANUFACTURING: 'Factory, Process & Manufacturing',
  OFFSHORE_MARINE_HARSH: 'Marine, Offshore & Harsh Environments',
  MUNICIPAL_PUBLIC_SECTOR: 'Municipal, Highways & Public Sector',
  WORKSHOP_PARTS_WASHING: 'Engineering & Workshop Parts Washing',
  WASTEWATER_REMEDIATION: 'Water Treatment & Wash-Bay Recovery',
};

const WATER_TYPE_LABELS: Record<string, string> = {
  hot: 'Hot Water & High Temperature',
  cold: 'Cold Water (Ambient)',
  steam: 'Dedicated High-Pressure Steam',
  aqueous_parts: 'Aqueous Detergent Solution',
  water_treatment: 'Clarified / Recovered Water',
};

const POWER_SOURCE_LABELS: Record<string, string> = {
  electric: 'Electric Motor Driven',
  petrol: 'Petrol Combustion Engine',
  diesel: 'Diesel Combustion Engine',
};

const VOLTAGE_LABELS: Record<string, string> = {
  '110v': '110V (Site Safe Transformer)',
  '230v': '230V Single-Phase Mains',
  '400v': '400V Three-Phase Industrial',
};

const MOBILITY_LABELS: Record<string, string> = {
  portable: '4-Wheel Portable Frame',
  skid: 'Stationary / Skid Installation',
  trailer: 'Road-Legal Highway Trailer',
};

const PREFERENCE_LABELS: Record<string, string> = {
  prefer_higher_pressure: 'Prioritise Higher Pressure',
  prefer_higher_flow: 'Prioritise Higher Flow Rate (Throughput)',
  prefer_compact: 'Compact / Small Footprint',
  prefer_fuel_efficiency: 'Fuel & Energy Efficiency',
  prefer_stainless_steel: 'Stainless Steel Frame / Coil',
};

export default function RequirementsSummary({
  application,
  waterType,
  minPressureBar,
  minFlowLpm,
  powerSource,
  voltage,
  phase,
  mobility,
  preferences,
  confirmationItems,
}: StructuredRequirementsProps) {
  const items: Array<{ label: string; value: string }> = [];

  if (application && APPLICATION_LABELS[application]) {
    items.push({ label: 'Application', value: APPLICATION_LABELS[application] });
  } else if (application) {
    items.push({ label: 'Application', value: application.replace(/_/g, ' ') });
  }

  if (waterType && WATER_TYPE_LABELS[waterType]) {
    items.push({ label: 'Thermal Duty', value: WATER_TYPE_LABELS[waterType] });
  }

  if (minPressureBar && minPressureBar > 0) {
    items.push({ label: 'Minimum Pressure', value: `${minPressureBar} BAR Continuous` });
  }

  if (minFlowLpm && minFlowLpm > 0) {
    items.push({ label: 'Minimum Flow Rate', value: `${minFlowLpm} L/min Continuous` });
  }

  if (powerSource && POWER_SOURCE_LABELS[powerSource]) {
    items.push({ label: 'Drive / Power', value: POWER_SOURCE_LABELS[powerSource] });
  }

  if (voltage && VOLTAGE_LABELS[voltage]) {
    const phaseSuffix = phase ? ` (${phase}-Phase)` : '';
    items.push({ label: 'Electrical Supply', value: `${VOLTAGE_LABELS[voltage]}${phaseSuffix}` });
  } else if (voltage) {
    items.push({ label: 'Electrical Supply', value: voltage });
  }

  if (mobility && MOBILITY_LABELS[mobility]) {
    items.push({ label: 'Mounting & Mobility', value: MOBILITY_LABELS[mobility] });
  }

  if (preferences && preferences.length > 0) {
    const prefStrings = preferences
      .map(p => PREFERENCE_LABELS[p] || p.replace(/_/g, ' '))
      .filter(Boolean);
    if (prefStrings.length > 0) {
      items.push({ label: 'Engineering Preferences', value: prefStrings.join(' · ') });
    }
  }

  if (items.length === 0 && (!confirmationItems || confirmationItems.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-[2px]">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-alkota-orange" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-800">
              Stated Operational Requirements
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <span className="text-alkota-orange mt-0.5 font-bold">✓</span>
                <div>
                  <span className="text-neutral-500 font-mono text-[11px] block">{item.label}</span>
                  <span className="text-neutral-900 font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worth Confirming / Site Readiness Items */}
      {confirmationItems && confirmationItems.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-[2px]">
          <div className="flex items-center gap-2 mb-2 text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold">
              Engineering Points Worth Confirming
            </h4>
          </div>
          <p className="text-xs text-neutral-600 mb-3">
            Our application engineers will review these site readiness factors during quotation:
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-800">
            {confirmationItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
