import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkota.co.uk';

  // Fetch live products for sitemap from Supabase
  const { data: machines } = await supabaseAdmin
    .from('products')
    .select('slug, category, updated_at')
    .eq('active', true);

  const { data: industries } = await supabaseAdmin
    .from('industries')
    .select('slug, updated_at')
    .eq('active', true);

  const machineUrls = (machines || []).map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(m.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = ['hot-water', 'cold-water', 'parts-washers', 'water-treatment'].map(cat => ({
    url: `${baseUrl}/machines/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const industryUrls = (industries || []).map((i: any) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(i.updated_at || new Date()),
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/water-treatment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/water-treatment/vacgd`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...categoryUrls,
    ...machineUrls,
    ...industryUrls,
  ];
}
