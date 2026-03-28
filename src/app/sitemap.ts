import { MetadataRoute } from 'next';
import { client, getMockMachines } from '@/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkota.co.uk';

  // Fetch dynamic slugs from Sanity first
  let machines = [];
  try {
    machines = (await client.fetch(`*[_type == "machine"]{ "slug": slug.current, "category": category->slug.current }`)) || [];
  } catch (e) {
    console.warn("Sitemap: Sanity fetch failed, falling back to mock data");
  }

  // Ensure we have a massive catalogue even if Sanity is empty during migration
  if (machines.length === 0) {
    const mockMachines = getMockMachines();
    machines = mockMachines.map((m: any) => ({
      slug: m.slug || m._id,
      category: m.categorySlug || m.category?.toLowerCase().replace(' ', '-')
    }));
  }

  const industries = (await client.fetch(`*[_type == "industry"]{ "slug": slug.current }`).catch(() => [])) || [];
  const applications = (await client.fetch(`*[_type == "application"]{ "slug": slug.current }`).catch(() => [])) || [];
  const posts = (await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`).catch(() => [])) || [];

  const machineEntries = machines.map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const industryEntries = Array.isArray(industries) ? industries.map((ind: any) => ({
    url: `${baseUrl}/industries/${ind.slug?.current || ind.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) : [];

  const applicationEntries = Array.isArray(applications) ? applications.map((app: any) => ({
    url: `${baseUrl}/applications/${app.slug?.current || app.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) : [];

  const postEntries = Array.isArray(posts) ? posts.map((post: any) => ({
    url: `${baseUrl}/resources/blog/${post.slug?.current || post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  })) : [];

  const staticRoutes = [
    '',
    '/machines',
    '/water-treatment',
    '/parts-washers',
    '/industries',
    '/applications',
    '/configurator',
    '/shop',
    '/about',
    '/support',
    '/resources',
    '/contact',
    '/tools/machine-match',
    '/mess-quest',
    '/chemicals/selector',
    '/support/fault-finder',
    '/tools/wash-bay-compliance',
    '/tools/tco-calculator',
    '/tools/hire-vs-buy',
    '/compare',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [
    ...staticRoutes,
    ...machineEntries,
    ...industryEntries,
    ...applicationEntries,
    ...postEntries,
  ];
}
