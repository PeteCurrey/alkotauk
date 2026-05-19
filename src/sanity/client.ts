// Sanity has been removed from this project.
// All content is now managed via Supabase.
// This file is kept as a stub to prevent import errors during migration.

export const client = {
  fetch: async (query: string, params?: any) => {
    console.log('Sanity Client stub: fetching', query);
    return [];
  }
};

export const sanityClient = client;

export const safeFetch = async (query: string, params?: any) => {
  return [];
};

export const urlFor = (source: any) => {
  const builder = {
    width: () => builder,
    height: () => builder,
    url: () => '',
  };
  return builder;
};

export const getMockIndustries = async () => {
  return [
    {
      name: 'Oil & Gas',
      slug: { current: 'oil-gas' },
      icon: 'Droplet',
      description: 'Heavy duty pressure and steam cleaning for drilling rigs, offshore platforms, and pipelines.'
    },
    {
      name: 'Fleet & Transport',
      slug: { current: 'fleet-transport' },
      icon: 'Truck',
      description: 'Rapid, contactless road film and bug removal for HGVs, tankers, and commercial vehicle fleets.'
    },
    {
      name: 'Food Processing',
      slug: { current: 'food-processing' },
      icon: 'ChefHat',
      description: 'Aqueous parts washing and high-temperature steam sanitation compliant with FSA regulations.'
    },
    {
      name: 'Waste Management',
      slug: { current: 'waste-management' },
      icon: 'Trash2',
      description: 'Extreme heavy-duty cleaning and automated washing for garbage trucks, compactors, and skip bins.'
    },
    {
      name: 'Agriculture',
      slug: { current: 'agriculture' },
      icon: 'Wheat',
      description: 'Livestock housing washdowns, tractor cleaning, and crop spraying equipment maintenance.'
    },
    {
      name: 'Manufacturing & Plant',
      slug: { current: 'manufacturing' },
      icon: 'Factory',
      description: 'Component cleaning, workshop floor degreasing, and machinery washdown systems.'
    },
    {
      name: 'Mining & Heavy Plant',
      slug: { current: 'mining' },
      icon: 'Hammer',
      description: 'High-pressure mud and grime blast systems for earthmovers, haulers, and processing plants.'
    }
  ];
};

export default client;
