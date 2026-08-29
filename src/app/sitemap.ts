import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getLobbyArticles } from '@/lib/lobby';
import { getDealers } from '@/lib/dealers';
import { REAL_BUILDS } from '@/lib/trailers/real-builds-data';
import { TRAILER_APPLICATIONS } from '@/lib/trailers/applications-data';
import { getAllMessQuestEpisodes } from '@/lib/messQuestEpisodes';

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

  // Fetch published wash plant projects
  let washPlantProjects: any[] = [];
  try {
    const { data: wpData } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('case_study_slug, updated_at')
      .eq('published', true)
      .in('visibility', ['public', 'anonymised'])
      .not('case_study_slug', 'is', null);
    if (wpData) washPlantProjects = wpData;
  } catch (err) {
    // fallback
  }

  const lobbyArticles = await getLobbyArticles();
  const dealers = await getDealers({ onlyActive: true });

  const machineUrls = (machines || []).map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(m.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const lobbyUrls = lobbyArticles.map((a) => ({
    url: `${baseUrl}/lobby/${a.category_slug}/${a.slug}`,
    lastModified: new Date(a.published_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const dealerUrls = dealers.map((d) => ({
    url: `${baseUrl}/dealers/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
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

  const washPlantProjectUrls = washPlantProjects.map((p: any) => ({
    url: `${baseUrl}/wash-plant/projects/${p.case_study_slug}`,
    lastModified: new Date(p.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Baseline verified editorial project URLs
  const baselineWashPlantSlugs = [
    'multi-bay-fleet-depot-warrington',
    'automated-rig-mat-washer-aberdeen',
    'heavy-plant-demucking-quarry-buxton'
  ].map(slug => ({
    url: `${baseUrl}/wash-plant/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/lobby`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dealers/demo-request`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dealers/become-a-dealer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
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
    {
      url: `${baseUrl}/trailers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/trailers/configure`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/open`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/enclosed`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/recovery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/multi-operator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/builds`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trailers/payload-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/service/trailers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...TRAILER_APPLICATIONS.map(app => ({
      url: `${baseUrl}/trailers/applications/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...REAL_BUILDS.map(build => ({
      url: `${baseUrl}/trailers/builds/${build.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    // Wash Plant Flagship Division
    {
      url: `${baseUrl}/wash-plant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/wash-plant/architect`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wash-plant/service-maintenance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wash-plant/asset-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wash-plant/refurbishment-upgrades`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wash-plant/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mess-quest`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...getAllMessQuestEpisodes().map((ep) => ({
      url: `${baseUrl}/mess-quest/${ep.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...baselineWashPlantSlugs,
    ...washPlantProjectUrls,
    ...categoryUrls,
    ...machineUrls,
    ...industryUrls,
    ...lobbyUrls,
    ...dealerUrls,
  ];
}
