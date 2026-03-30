import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { MACHINES } from '@/lib/machines';

const isDummyConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'dummy' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Note: Using hardcoded ID as primary requested for configuration clarity
export const client = createClient({
  projectId: 'pa54q49w',
  dataset: 'production',
  apiVersion: '2024-03-29',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!source || isDummyConfig) {
      // Return a robust placeholder if in dummy mode
      return {
          url: () => "https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png",
          width: () => ({ height: () => ({ url: () => "https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png" }) })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
  }
  return builder.image(source);
}

// INTERCEPT FETCH TO PREVENT CRASHES IN DUMMY MODE
const originalFetch = client.fetch.bind(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
client.fetch = (async (query: string, params?: any, options?: any) => {
    if (isDummyConfig) {
        if (query.includes('_type == "siteSettings"')) return getMockSettings();
        if (query.includes('_type == "industry"')) {
            const industries = getMockIndustries();
            if (query.includes('[0]')) {
                const slug = params?.slug;
                return industries.find(i => i.slug.current === slug) || industries[0];
            }
            return industries;
        }
        if (query.includes('_type == "application"')) {
            const applications = getMockApplications();
            if (query.includes('[0]')) {
                const slug = params?.slug;
                return applications.find((a: any) => a.slug.current === slug) || applications[0];
            }
            return applications;
        }
        if (query.includes('_type == "machine"')) {
            const machines = getMockMachines();
            if (query.includes('[0]')) {
                const slug = params?.slug;
                return machines.find(m => m.slug === slug) || machines[0];
            }
            return machines;
        }
        if (query.includes('_type == "waterTreatmentSystem"')) {
            const systems = getMockWaterTreatment();
            if (query.includes('[0]')) {
                const slug = params?.slug;
                return systems.find(s => s.slug === slug) || systems[0];
            }
            return systems;
        }
        if (query.includes('_type == "partsWasher"')) {
            const washers = getMockPartsWashers();
            if (query.includes('[0]')) {
                const slug = params?.slug;
                return washers.find(w => w.slug === slug) || washers[0];
            }
            return washers;
        }
        return Array.isArray(params) ? [] : {};
    }
    return originalFetch(query, params, options);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// Robust fetcher that falls back to mock data if Sanity is misconfigured
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeFetch = async (query: string, mockData: any) => {
    if (isDummyConfig) {
        return mockData;
    }
    try {
        const data = await client.fetch(query);
        // If query looks like a single object fetch (e.g. [0]), handle it
        if (query.includes('[0]') || !Array.isArray(data)) {
            return data || mockData;
        }
        return data && data.length > 0 ? data : mockData;
    } catch (error) {
        console.error('Sanity fetch error, falling back to mock data:', error);
        return mockData;
    }
}

export const getMockSettings = () => ({
    title: 'Alkota UK',
    seoGroup: {
        defaultDescription: 'Alkota UK Industrial Cleaning Systems - The Platinum Standard in Pressure Washers.',
    },
    maintenanceGroup: {
        isMaintenanceMode: true,
        maintenanceTitle: 'System Maintenance',
        maintenanceMessage: 'The platform is currently undergoing scheduled upgrades to enhance performance and catalogue accuracy.',
        maintenanceVideoUrl: 'vFnvcx3vRUY',
        maintenancePhone: '+447912506738',
    },
    bannerGroup: {
        showGlobalBanner: false,
        bannerText: 'New Elite Series Now Available for Order',
        bannerType: 'info',
        bannerLink: '/machines/hot-water',
    },
    visualExperience: {
        enableSplashScreen: true,
        splashTitle: 'Alkota UK',
    },
    snipcartGroup: {
        snipcartApiKey: 'dummy-key',
    },
    contactInfo: {
        email: 'info@alkota.co.uk',
        phone: '01234 567890',
        address: 'Industrial Estate, UK',
    },
    hubspotGroup: {
        hubspotPortalId: '44882233', // Placeholder
        hubspotQuoteFormId: '557799', // Placeholder
    },
    stripeGroup: {
        stripeSecretKey: 'sk_test_placeholder',
    }
});

// Mock data generator for initial development
export const getMockMachines = () => {
  return MACHINES.map(m => ({
    _id: m.id,
    name: m.name,
    modelCode: m.id.toUpperCase(),
    slug: m.slug.split('/').pop() || m.id,
    tagline: m.description, // Mapping description as tagline
    category: m.type,
    categorySlug: m.type,
    series: m.series,
    isEliteSeries: m.series.includes('Elite'),
    eliteFeatures: m.highlights,
    heroImage: { asset: { url: 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png' } }, // Placeholder for mock
    specs: {
      flowRateGPM: parseFloat(m.specs.flowLPM || '0') / 3.785,
      flowRateLPM: parseFloat(m.specs.flowLPM || '0'),
      pressurePSI: parseFloat(m.specs.pressureBar || '0') * 14.5038,
      pressureBar: parseFloat(m.specs.pressureBar || '0'),
      powerSource: m.specs.powerSource,
      engineType: m.specs.engine,
      motorVoltage: m.specs.voltageOptions,
      coilWarrantyYears: parseInt(m.specs.coilWarranty) || 7,
    },
  }));
};

export const getMockWaterTreatment = () => {
  return [
    {
      _id: 'vfs-1',
      name: 'VFS-1',
      slug: 'vfs-1',
      systemType: 'vfs',
      tagline: 'Vacuum Filtration System for Wash-Bay Reuse',
      description: [{ _type: 'block', children: [{ _type: 'span', text: 'The VFS-1 is designed to recycle water for continuous washing operations, meeting all UK environmental standards.' }] }],
      specs: {
        flowRateLPM: 38,
        filtrationMicrons: '20',
        powerRequirements: '230V 1ph',
      },
      applicationAreas: ['Fleet Washing', 'Equipment Rental', 'Car Dealerships'],
    },
    {
      _id: 'evap-solator',
      name: 'Evaporator Solator',
      slug: 'evaporator-solator',
      systemType: 'evaporator',
      tagline: 'Zero Liquid Discharge Wastewater Solution',
      specs: {
        flowRateLPM: 1.5,
        powerRequirements: 'Gas or Propane',
      },
      applicationAreas: ['Metal Finishing', 'Ink/Paint Cleanup', 'Coolant Disposal'],
    },
  ];
};

export const getMockPartsWashers = () => {
  return [
    {
      _id: 'top-load-911',
      name: 'Model 911',
      slug: 'model-911',
      loadType: 'top-load',
      tagline: 'Compact Top-Loading Parts Washer',
      specs: {
        turntableDiameter: '26"',
        workHeight: '12"',
        weightCapacity: '250kg',
        tankCapacity: '50L',
        pumpPower: '1 HP',
      },
    },
    {
      _id: 'front-load-4000',
      name: 'Model 4000',
      slug: 'model-4000',
      loadType: 'front-load',
      tagline: 'Heavy Duty Front-Loading System',
      specs: {
        turntableDiameter: '42"',
        workHeight: '60"',
        weightCapacity: '1500kg',
        tankCapacity: '150L',
        pumpPower: '5 HP',
      },
    },
  ];
};

// Industries Mock Data
export const getMockIndustries = () => {
  return [
    { name: 'Agriculture', slug: { current: 'agriculture' }, icon: 'Cloud', description: 'Heavy-duty cleaning for farming and agricultural machinery.', image: '/assets/industries/agriculture.png' },
    { name: 'Oil & Gas', slug: { current: 'oil-gas' }, icon: 'Zap', description: 'Safe, powerful cleaning for hazardous environments.', image: '/assets/industries/oil-gas.png' },
    { name: 'Mining', slug: { current: 'mining' }, icon: 'Factory', description: 'Removing the toughest grime from heavy mining plant.', image: '/assets/industries/mining.png' },
    { name: 'Construction', slug: { current: 'construction' }, icon: 'Layout', description: 'On-site cleaning for civil engineering and plant hire.', image: '/assets/industries/construction.png' },
    { name: 'Fleet', slug: { current: 'fleet' }, icon: 'Car', description: 'Rapid, efficient washing systems for transport fleets.', image: '/assets/industries/fleet.png' },
    { name: 'Manufacturing', slug: { current: 'manufacturing' }, icon: 'Box', description: 'Hygiene and degreasing for production floors.', image: '/assets/industries/manufacturing.png' },
    { name: 'Food Processing', slug: { current: 'food-processing' }, icon: 'Target', description: 'Sanitation solutions for high-hygiene environments.', image: '/assets/industries/food-processing.png' },
    { name: 'Waste Management', slug: { current: 'waste-management' }, icon: 'Trash2', description: 'Deep cleaning for recycling and waste facilities.', image: '/assets/industries/waste-management.png' },
  ];
};


export function getMockApplications() {
    return [
      { name: 'Heavy Equipment', slug: { current: 'heavy-equipment' }, icon: 'HardHat', description: 'Tough dirt, mud, and grease on earthmovers.' },
      { name: 'Vehicle Washing', slug: { current: 'vehicle-washing' }, icon: 'Truck', description: 'Safe, efficient cleaning for fleets and autos.' },
      { name: 'Degreasing', slug: { current: 'degreasing' }, icon: 'Droplets', description: 'Eliminating stubborn industrial oils and fats.' },
      { name: 'Surface Preparation', slug: { current: 'surface-preparation' }, icon: 'Layers', description: 'Prepping surfaces for painting or treatment.' },
      { name: 'Wash Bay Setup', slug: { current: 'wash-bay-setup' }, icon: 'Home', description: 'Custom installations for dedicated wash bays.' },
      { name: 'Parts Cleaning', slug: { current: 'parts-cleaning' }, icon: 'Settings', description: 'Specialized cleaning for mechanical components.' },
      { name: 'Food Hygiene', slug: { current: 'food-hygiene' }, icon: 'ShieldCheck', description: 'Sanitation for food processing environments.' },
      { name: 'Graffiti Removal', slug: { current: 'graffiti-removal' }, icon: 'Eraser', description: 'Restoring surfaces without damaging sub-layers.' },
      { name: 'Drain Jetting', slug: { current: 'drain-jetting' }, icon: 'Activity', description: 'High-pressure sewer and drain unblocking.' },
      { name: 'Trenchless Pipe Repair', slug: { current: 'trenchless-pipe-repair' }, icon: 'GitMerge', description: 'Preparing pipes for relining operations.' },
      { name: 'De-Icing', slug: { current: 'de-icing' }, icon: 'Snowflake', description: 'Hot water systems for winter maintenance.' },
    ];
}
