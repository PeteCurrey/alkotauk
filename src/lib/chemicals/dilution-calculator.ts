export interface DilutionCalculationResult {
  chemicalVolumeLiters: number;
  chemicalVolumeMl: number;
  waterVolumeLiters: number;
  totalVolumeLiters: number;
  percentageStrength: number;
  ratioString: string;
  dosageAdvice: string;
}

export const COMMON_TANK_PRESETS = [
  { label: '1L Foam Lance Bottle', value: 1 },
  { label: '5L Hand Pressure Sprayer', value: 5 },
  { label: '25L Chemical Reservoir', value: 25 },
  { label: '100L Header / Float Tank', value: 100 },
  { label: '200L Parts Washer Sump', value: 200 },
  { label: '500L Trailer Water Tank', value: 500 },
  { label: '1000L IBC Tote', value: 1000 },
];

export const COMMON_DILUTION_RATIOS = [
  { ratio: '1:5', label: '1:5 (20%) — Extreme Fifth-Wheel Degreasing', part: 5 },
  { ratio: '1:10', label: '1:10 (10%) — Heavy Workshop Soak / Pre-Spray', part: 10 },
  { ratio: '1:20', label: '1:20 (5%) — Cold-Water Heavy Machinery Pre-Wash', part: 20 },
  { ratio: '1:40', label: '1:40 (2.5%) — Standard Heavy Fleet Wash', part: 40 },
  { ratio: '1:60', label: '1:60 (1.6%) — Hot-Water Fleet Washdown', part: 60 },
  { ratio: '1:80', label: '1:80 (1.25%) — Hot-Water Maintenance Washing', part: 80 },
  { ratio: '1:100', label: '1:100 (1.0%) — High-Volume Gantry Fleet Wash', part: 100 },
  { ratio: '1:120', label: '1:120 (0.83%) — Light Dust & Soil Rinse Cycle', part: 120 },
  { ratio: '1:1000', label: '1:1000 (0.1%) — Continuous Scale Stop Metering', part: 1000 },
];

export function calculateChemicalDosing(totalBatchLiters: number, dilutionPart: number): DilutionCalculationResult {
  if (totalBatchLiters <= 0 || dilutionPart <= 0) {
    return {
      chemicalVolumeLiters: 0,
      chemicalVolumeMl: 0,
      waterVolumeLiters: 0,
      totalVolumeLiters: 0,
      percentageStrength: 0,
      ratioString: '1:1',
      dosageAdvice: 'Invalid inputs provided.'
    };
  }

  // A 1:N ratio means 1 part chemical + N parts water = (N + 1) total parts
  // Or in pressure washing terminology, 1 part in N total solution volume.
  // Standard UK chemical engineering practice: chemical volume = totalBatch / (dilutionPart + 1)
  const totalParts = dilutionPart + 1;
  const chemicalVolumeLiters = totalBatchLiters / totalParts;
  const chemicalVolumeMl = chemicalVolumeLiters * 1000;
  const waterVolumeLiters = totalBatchLiters - chemicalVolumeLiters;
  const percentageStrength = (chemicalVolumeLiters / totalBatchLiters) * 100;

  return {
    chemicalVolumeLiters: Number(chemicalVolumeLiters.toFixed(2)),
    chemicalVolumeMl: Number(chemicalVolumeMl.toFixed(0)),
    waterVolumeLiters: Number(waterVolumeLiters.toFixed(2)),
    totalVolumeLiters: totalBatchLiters,
    percentageStrength: Number(percentageStrength.toFixed(2)),
    ratioString: `1:${dilutionPart}`,
    dosageAdvice: `Add ${chemicalVolumeMl >= 1000 ? `${(chemicalVolumeMl / 1000).toFixed(2)} Litres` : `${chemicalVolumeMl.toFixed(0)} ml`} of chemical concentrate to ${waterVolumeLiters.toFixed(2)} Litres of clean water.`
  };
}
