import { MACHINES } from '@/lib/machines';

export const client = {
  fetch: async (query: string, params?: any): Promise<any> => {
    // This is now a pure TS static shim. Sanity packages have been removed.
    if (query.includes('_type == "siteSettings"')) return getMockSettings();
    
    if (query.includes('_type == "machine"')) {
      return MACHINES.map(m => ({
        _id: m.id,
        _type: 'machine',
        name: m.name,
        modelCode: m.id,
        tagline: m.description.split('.')[0],
        category: m.type,
        slug: { current: m.slug.split('/').pop() }, // Extract last part of slug for consistency
        series: { name: m.series },
        specs: m.specs,
        eliteFeatures: m.highlights,
        image: { asset: { url: `/assets/products/${m.id}.png` } }
      }));
    }

    if (query.includes('_type == "chemical"')) return [];
    if (query.includes('_type == "industry"')) return getMockIndustries();
    return [];
  },
  withConfig: () => client,
};

// Minimal image URL builder implementation to replace @sanity/image-url
export const urlFor = (source: any) => ({
  url: () => source?.asset?.url || '',
  width: (w: number) => ({ url: () => source?.asset?.url || '' }),
  height: (h: number) => ({ url: () => source?.asset?.url || '' }),
  fit: (f: string) => ({ url: () => source?.asset?.url || '' }),
});

export const safeFetch = async (query: string, fallback: any) => {
  try {
    const data = await client.fetch(query);
    return data || fallback;
  } catch {
    return fallback;
  }
};

export const getMockSettings = () => ({
  title: 'Alkota UK',
  seoGroup: {
    defaultDescription: 'Alkota UK Industrial Cleaning Systems — Handcrafted in South Dakota since 1964. Belt-drive belt, Schedule 80 coil, 7-year warranty. Pressure washers built to last.',
  },
  maintenanceGroup: {
    isMaintenanceMode: false,
    maintenanceMessage: 'The platform is currently undergoing scheduled upgrades.',
  },
  visualExperience: {
    enableSplashScreen: false,
  },
  bannerGroup: {
    showGlobalBanner: false,
  },
  contactInfo: {
    phone: '+447912506738',
    email: 'info@alkota.co.uk',
  }
});

export const getMockIndustries = () => [
  { 
    name: 'Agriculture', 
    title: 'Agriculture',
    slug: { current: 'agriculture' },
    icon: 'Leaf',
    description: 'Specialised cleaning for tractors, combines, and livestock housing. Keeping precision machinery in peak condition.'
  },
  { 
    name: 'Transport & Fleet', 
    title: 'Transport & Fleet',
    slug: { current: 'transport-fleet' },
    icon: 'Truck',
    description: 'Rapid turnaround for HGV fleets, distribution centres, and logistics hubs. Eliminating road film and corrosive salt.'
  },
  { 
    name: 'Food & Beverage', 
    title: 'Food & Beverage',
    slug: { current: 'food-beverage' },
    icon: 'Utensils',
    description: 'Food-safe cleaning solutions for production lines and kitchens. High-temperature steam for deep sanitization.'
  },
  { 
    name: 'Industrial & Manufacturing', 
    title: 'Industrial & Manufacturing',
    slug: { current: 'industrial' },
    icon: 'Factory',
    description: 'Heavy-duty equipment cleaning for factories and floor bays. Built for continuous use in the toughest environments.'
  },
  { 
    name: 'Maritime & Offshore', 
    title: 'Maritime & Offshore',
    slug: { current: 'maritime' },
    icon: 'Anchor',
    description: 'Salt-resistant machinery for docks, shipyards, and offshore platforms. Engineering that withstands coastal corrosion.'
  }
];
