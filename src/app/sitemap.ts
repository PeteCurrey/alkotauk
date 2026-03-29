import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkota.co.uk';

  // Fetch all machines from Sanity
  const machines = await client.fetch(`*[_type == "machine"] {
    "slug": slug.current,
    category,
    _updatedAt
  }`);

  // Fetch all industries from Sanity
  const industries = await client.fetch(`*[_type == "industry"] {
    "slug": slug.current,
    _updatedAt
  }`);

  const machineUrls = machines.map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(m._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = ['hot-water', 'cold-water', 'parts-washers', 'water-treatment'].map(cat => ({
    url: `${baseUrl}/machines/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const industryUrls = industries.map((i: any) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(i._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/machines`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryUrls,
    ...machineUrls,
    ...industryUrls,
  ];
}
