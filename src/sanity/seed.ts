
const machines = [
  {
    _type: 'machine',
    name: '216X4',
    slug: { _type: 'slug', current: '216x4' },
    isEliteSeries: true,
    tagline: 'Compact Portable Hot Water',
    category: 'hot-water',
    specs: {
      flowRateGPM: 2,
      pressurePSI: 1600,
      powerSource: 'electric',
      heatingFuel: 'diesel-kerosene',
    },
  },
  {
    _type: 'machine',
    name: '420X4',
    slug: { _type: 'slug', current: '420x4' },
    tagline: 'Belt Drive 4-Wheel Design',
    category: 'hot-water',
    specs: {
      flowRateGPM: 3.6,
      pressurePSI: 2000,
      powerSource: 'electric',
    },
  },
  {
    _type: 'machine',
    name: '430XM4',
    slug: { _type: 'slug', current: '430xm4' },
    tagline: 'Full-Size Belt Drive',
    category: 'hot-water',
    specs: {
      flowRateGPM: 3.8,
      pressurePSI: 3000,
      powerSource: 'electric',
    },
  },
  {
    _type: 'machine',
    name: '4405XD4',
    slug: { _type: 'slug', current: '4405xd4' },
    tagline: 'Direct Drive Portable Gas',
    category: 'hot-water',
    specs: {
      flowRateGPM: 4,
      pressurePSI: 4000,
      powerSource: 'petrol',
    },
  },
  {
    _type: 'machine',
    name: '5355ENS',
    slug: { _type: 'slug', current: '5355ens' },
    tagline: 'Extra Narrow Gas/Diesel Engine Series',
    category: 'hot-water',
    specs: {
      flowRateGPM: 5,
      pressurePSI: 3500,
      powerSource: 'petrol',
    },
  },
  {
    _type: 'machine',
    name: '8405HNL',
    slug: { _type: 'slug', current: '8405hnl' },
    tagline: 'High-Volume Belt Drive',
    category: 'hot-water',
    specs: {
      flowRateGPM: 8,
      pressurePSI: 4000,
      powerSource: 'petrol',
    },
  },
];

const industries = [
  { _type: 'industry', name: 'Agriculture', slug: { _type: 'slug', current: 'agriculture' }, icon: 'Cloud' },
  { _type: 'industry', name: 'Oil & Gas', slug: { _type: 'slug', current: 'oil-gas' }, icon: 'Zap' },
  { _type: 'industry', name: 'Mining', slug: { _type: 'slug', current: 'mining' }, icon: 'Factory' },
  { _type: 'industry', name: 'Construction', slug: { _type: 'slug', current: 'construction' }, icon: 'Layout' },
  { _type: 'industry', name: 'Fleet', slug: { _type: 'slug', current: 'fleet' }, icon: 'Car' },
  { _type: 'industry', name: 'Manufacturing', slug: { _type: 'slug', current: 'manufacturing' }, icon: 'Box' },
  { _type: 'industry', name: 'Food Processing', slug: { _type: 'slug', current: 'food-processing' }, icon: 'Target' },
  { _type: 'industry', name: 'Waste Management', slug: { _type: 'slug', current: 'waste-management' }, icon: 'Trash2' },
];

const parts = [
  {
    _type: 'part',
    name: 'High-Pressure Hose (50ft)',
    slug: { _type: 'slug', current: 'high-pressure-hose-50ft' },
    sku: 'ACC-HOSE-50',
    price: 85.00,
    category: 'Accessories',
    description: 'Industrial grade 4000 PSI rated hose with quick-connect fittings.',
    specs: {
      length: '50ft',
      material: 'Steel Braided Rubber',
      maxPressure: '4000 PSI',
      maxTemp: '120°C'
    }
  },
  {
    _type: 'part',
    name: 'Turbo Nozzle (#4.0)',
    slug: { _type: 'slug', current: 'turbo-nozzle-40' },
    sku: 'NOZ-TURB-40',
    price: 65.00,
    category: 'Nozzles',
    description: 'High-impact rotating nozzle for stubborn grime removal. Increases cleaning efficiency by 50%.',
    specs: {
      orificeSize: '4.0',
      maxPressure: '5000 PSI',
      rotationSpeed: '3000 RPM'
    }
  },
  {
    _type: 'part',
    name: 'Industrial Degreaser (25L)',
    slug: { _type: 'slug', current: 'industrial-degreaser-25l' },
    sku: 'CHEM-DEG-25',
    price: 120.00,
    category: 'Chemicals',
    description: 'Heavy-duty alkaline degreaser for oil, grease, and carbon removal.',
    specs: {
      volume: '25 Litres',
      pH: '13.5 (Alkaline)',
      dilutionRatio: '1:50'
    }
  },
  {
    _type: 'part',
    name: 'Alkota Premium Pump Oil (1L)',
    slug: { _type: 'slug', current: 'pump-oil-1l' },
    sku: 'MAINT-OIL-1',
    price: 18.50,
    category: 'Maintenance',
    description: 'Specially formulated non-detergent oil for high-pressure pumps.',
    specs: {
      volume: '1 Litre',
      viscosity: 'SAE 30',
      type: 'Non-Detergent'
    }
  }
];

async function seed() {
  console.log('Seeding machines, industries, and parts...');
  
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'dummy' || !process.env.SANITY_TOKEN) {
    console.warn('\n⚠️  Sanity Project ID is not set or SANITY_TOKEN is missing. SKIPPING UPLOAD.\n');
    console.log('Machine data preview:', machines.map(m => m.name));
    console.log('Industry data preview:', industries.map(i => i.name));
    console.log('Part data preview:', parts.map(p => p.name));
    return;
  }

  // Actual seeding logic would go here using the client with token access
}

seed().catch(console.error);

export { machines, industries, parts };
