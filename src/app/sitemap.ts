import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getLobbyArticles } from '@/lib/lobby';
import { getDealers } from '@/lib/dealers';
import { REAL_BUILDS } from '@/lib/trailers/real-builds-data';
import { TRAILER_APPLICATIONS } from '@/lib/trailers/applications-data';
import { getAllMessQuestEpisodes } from '@/lib/messQuestEpisodes';
import { getAllCaseStudies } from '@/lib/case-studies/data';
import { getRetailProducts, getChemicalApplications } from '@/lib/chemicals/service';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkota.co.uk';

  // 1. Fetch live machines from Supabase
  const { data: machines } = await supabaseAdmin
    .from('products')
    .select('slug, category, updated_at')
    .eq('active', true);

  const { data: industries } = await supabaseAdmin
    .from('industries')
    .select('slug, updated_at')
    .eq('active', true);

  const { data: applications } = await supabaseAdmin
    .from('applications')
    .select('slug, updated_at')
    .eq('active', true);

  // 2. Fetch live parts & brand partners from Supabase
  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('slug, updated_at')
    .eq('active', true)
    .limit(500);

  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('slug, updated_at')
    .eq('active', true);

  // 3. Fetch published wash plant projects
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

  // 4. Fetch dynamic Chemical Retail Products & Applications
  const chemicalProducts = await getRetailProducts();
  const chemicalApplications = await getChemicalApplications();

  // 5. Lobby and Dealers
  const lobbyArticles = await getLobbyArticles();
  const dealers = await getDealers({ onlyActive: true });

  // Map dynamic entities
  const machineUrls = (machines || []).map((m: any) => ({
    url: `${baseUrl}/machines/${m.category}/${m.slug}`,
    lastModified: new Date(m.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const chemicalProductUrls = chemicalProducts.map((p) => ({
    url: `${baseUrl}/chemicals/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const chemicalAppUrls = chemicalApplications.map((app) => ({
    url: `${baseUrl}/chemicals/applications/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const partsCategoryUrls = MASTER_TAXONOMY.map((cat) => ({
    url: `${baseUrl}/parts-attachments/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const partsBrandUrls = (brands || []).map((b: any) => ({
    url: `${baseUrl}/parts-attachments/brands/${b.slug}`,
    lastModified: new Date(b.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const partsProductUrls = (parts || []).map((part: any) => ({
    url: `${baseUrl}/parts-attachments/product/${part.slug}`,
    lastModified: new Date(part.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const lobbyPillars = [
    'good-clean-news',
    'knowledge',
    'workshop',
    'field-notes',
    'industries',
    'trade-desk',
    'inside-alkota',
  ];

  const lobbyPillarUrls = lobbyPillars.map((p) => ({
    url: `${baseUrl}/lobby/${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const lobbyUrls = [
    ...lobbyPillarUrls,
    ...lobbyArticles.map((a) => ({
      url: `${baseUrl}/lobby/${a.category_slug}/${a.slug}`,
      lastModified: new Date(a.published_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const dealerUrls = dealers.map((d) => ({
    url: `${baseUrl}/dealers/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = ['hot-water', 'cold-water', 'parts-washers', 'water-treatment'].map(cat => ({
    url: `${baseUrl}/machines/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const industryUrls = (industries || []).map((i: any) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(i.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const applicationUrls = (applications || []).map((app: any) => ({
    url: `${baseUrl}/applications/${app.slug}`,
    lastModified: new Date(app.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
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
    // ── CORE HUBS ─────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/machines`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/trailers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/wash-plant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/chemicals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/parts-attachments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/water-treatment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lobby`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bespoke`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // ── CHEMICALS SUB-PAGES ──────────────────────────────
    {
      url: `${baseUrl}/parts-attachments/chemicals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/chemicals/finder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/chemicals/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/chemicals/safety-data`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chemicals/selector`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chemicals/match`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── PARTS & ATTACHMENTS SUB-PAGES ────────────────────
    {
      url: `${baseUrl}/parts-attachments/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/parts-attachments/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/parts-attachments/finder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/parts-attachments/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/parts-attachments/machines`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/parts-attachments/enquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── SERVICE SUB-PAGES ─────────────────────────────────
    {
      url: `${baseUrl}/service/planned-maintenance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/service/repairs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/service/pump-repair`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/service/commissioning`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/machine-registration`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/contracts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/trailers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service/request`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── TRAILERS SUB-PAGES ────────────────────────────────
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
      url: `${baseUrl}/trailers/configure`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/trailers/payload-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── WASH PLANT SUB-PAGES ──────────────────────────────
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

    // ── ABOUT SUB-PAGES ───────────────────────────────────
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/alkota-uk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/heritage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/coil-technology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/craftsmanship`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/why-alkota`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── SUPPORT & KNOWLEDGE ───────────────────────────────
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/support/faqs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support/manuals`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support/glossary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/support/training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/support/warranty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support/replacement-parts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support/fault-finder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support/wash-plant-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── TOOLS & CALCULATORS ───────────────────────────────
    {
      url: `${baseUrl}/tools/machine-match`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/hire-vs-buy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/tco-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/configurator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/wash-bay-compliance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── RESOURCES & EDITORIAL GUIDES ──────────────────────
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/buying-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/coil-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/nozzles-explained`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/hot-water-vs-cold-water`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/total-cost-of-ownership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/financing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/hire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/rent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/downloads`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/resources/videos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/water-treatment/vacgd`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
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
      url: `${baseUrl}/dealers/find`,
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

    // ── DYNAMIC ARRAYS ────────────────────────────────────
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
    ...getAllMessQuestEpisodes().map((ep) => ({
      url: `${baseUrl}/mess-quest/${ep.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...getAllCaseStudies().map((cs) => ({
      url: `${baseUrl}/resources/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: cs.featured ? 0.95 : 0.85,
    })),
    ...baselineWashPlantSlugs,
    ...washPlantProjectUrls,
    ...categoryUrls,
    ...machineUrls,
    ...industryUrls,
    ...applicationUrls,
    ...chemicalProductUrls,
    ...chemicalAppUrls,
    ...partsCategoryUrls,
    ...partsBrandUrls,
    ...partsProductUrls,
    ...lobbyUrls,
    ...dealerUrls,
  ];
}
