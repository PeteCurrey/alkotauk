import { MetadataRoute } from 'next';
import { client, getMockMachines } from '@/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkota.co.uk';

  // Fetch dynamic slugs from Sanity first
  let machines = [];
  try {
    machines = (await client.fetch(`*[_type == "machine"]{ "slug": slug.current, "category": category->slug.current }`)) || [];
  } catch (e) {
    // console.warn("Sitemap: Sanity fetch failed, falling back to mock data");
  }

  // Ensure we have a massive catalogue even if Sanity is empty
  if (machines.length === 0) {
    const mockMachines = getMockMachines();
    machines = mockMachines.map((m: any) => ({
      slug: m.slug || m.id,
      category: m.type || 'hot-water'
    }));
  }

  const machineEntries = machines.map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    '',
    '/machines',
    '/machines/hot-water',
    '/machines/cold-water',
    '/machines/wash-plants',
    '/machines/parts-washers',
    '/bespoke',
    '/chemicals',
    '/chemicals/degreasers',
    '/chemicals/auto-truck-wash',
    '/chemicals/aluminum-brightener',
    '/chemicals/industrial',
    '/chemicals/food-processing',
    '/chemicals/masonry-asphalt',
    '/chemicals/parts-washer',
    '/chemicals/residential',
    '/chemicals/additives',
    '/chemicals/coatings',
    '/chemicals/aviation',
    '/chemicals/transportation',
    '/water-treatment',
    '/configurator',
    '/about',
    '/support',
    '/industrial',
    '/industrial/mat-wash-plants',
    '/industrial/containerised',
    '/industrial/wash-installations',
    '/industrial/brief',
    '/mess-quest',
    '/chemicals/selector',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [
    ...staticRoutes,
    ...machineEntries,
  ];
}
