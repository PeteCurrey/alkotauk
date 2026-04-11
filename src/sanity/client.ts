import { supabase } from '@/lib/supabase/client';

export const client = {
  fetch: async (query: string, params?: any): Promise<any> => {
    // ─── SITE SETTINGS ──────────────────────────────────────────────────
    if (query.includes('_type == "siteSettings"')) {
      const { data } = await supabase.from('site_settings').select('*');
      const settingsMap = (data || []).reduce((acc: any, s: any) => ({ ...acc, [s.key]: s.value }), {});
      
      const siteSettings = {
        _id: 'siteSettings',
        _type: 'siteSettings',
        title: settingsMap['site_name'] || 'Alkota UK',
        seoGroup: {
          defaultDescription: settingsMap['meta_description']
        },
        contactInfo: {
          phone: settingsMap['contact_phone'],
          email: settingsMap['contact_email']
        },
        aiChatGroup: {
          enabled: true,
          systemPrompt: settingsMap['ai_system_prompt'] || 'You are the Alkota UK Industrial Advisor.',
          systemInstructions: settingsMap['ai_system_prompt'],
          claudeApiKey: process.env.ANTHROPIC_API_KEY,
          teamMembers: [
            { name: 'Dave', role: 'Technical Specialist', avatar: null },
            { name: 'Sarah', role: 'Engineering Lead', avatar: null },
            { name: 'Pete', role: 'Product Advisor', avatar: null }
          ]
        }
      };

      if (query.includes('.aiChatGroup')) return siteSettings.aiChatGroup;
      return siteSettings;
    }

    // ─── MACHINES ─────────────────────────────────────────────────────
    if (query.includes('_type == "machine"')) {
      const { data } = await supabase
        .from('machines')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      return (data || []).map((m: any) => ({
        _id: m.id,
        _type: 'machine',
        name: m.name,
        modelCode: m.model_code,
        model_code: m.model_code, // Compatibility with MachineCard
        tagline: m.tagline,
        description: m.description,
        category: m.category,
        slug: { current: m.slug },
        series: m.series,
        is_elite_series: m.is_elite_series,
        psi: m.psi,
        gpm: m.gpm,
        specs: {
          pressureBar: (m.psi / 14.5).toFixed(0),
          flowLPM: (m.gpm * 3.785).toFixed(1),
          powerSource: m.voltage || m.engine,
          fuelType: m.burner_fuel,
          driveType: m.drive,
          weightKG: m.weight
        },
        eliteFeatures: m.features,
        image_url: m.image_url || '/assets/products/placeholder.png',
        heroImage: { asset: { url: m.image_url || '/assets/products/placeholder.png' } },
        image: { asset: { url: m.image_url || '/assets/products/placeholder.png' } }
      }));
    }

    // ─── INDUSTRIES ───────────────────────────────────────────────────
    if (query.includes('_type == "industry"')) {
        const { data } = await supabase
          .from('industries')
          .select('*')
          .order('sort_order', { ascending: true });
          
        const mapped = (data || []).map((i: any) => ({
            name: i.name,
            title: i.name,
            slug: { current: i.slug },
            icon: i.icon,
            description: i.description
        }));

        if (query.includes('[0]') || params?.slug) {
          const slug = params?.slug || (query.match(/slug\.current == "([^"]+)"/) || [])[1];
          if (slug) return mapped.find(i => i.slug.current === slug) || null;
          return mapped[0] || null;
        }
        return mapped;
    }

    // ─── APPLICATIONS ─────────────────────────────────────────────────
    if (query.includes('_type == "application"')) {
        const { data } = await supabase
          .from('applications')
          .select('*')
          .order('sort_order', { ascending: true });
          
        const mapped = (data || []).map((a: any) => ({
            name: a.name,
            slug: { current: a.slug },
            icon: a.icon,
            description: a.description
        }));

        if (query.includes('[0]') || params?.slug) {
          const slug = params?.slug || (query.match(/slug\.current == "([^"]+)"/) || [])[1];
          if (slug) return mapped.find(a => a.slug.current === slug) || null;
          return mapped[0] || null;
        }
        return mapped;
    }

    return [];
  },
  withConfig: () => client,
};

// Minimal image URL builder implementation to replace @sanity/image-url
export interface ImageBuilder {
  url: () => string;
  width: (w: number) => ImageBuilder;
  height: (h: number) => ImageBuilder;
  fit: (f: string) => ImageBuilder;
}

export const urlFor = (source: any): ImageBuilder => {
  const builder: ImageBuilder = {
    url: () => source?.asset?.url || '',
    width: (w: number) => builder,
    height: (h: number) => builder,
    fit: (f: string) => builder,
  };
  return builder;
};

export const safeFetch = async (query: string, fallback: any) => {
  try {
    const data = await client.fetch(query);
    return data || (await fallback);
  } catch {
    return await fallback;
  }
};

export const getMockIndustries = async () => {
    const { data } = await supabase.from('industries').select('*').order('sort_order', { ascending: true });
    return (data || []).map((i: any) => ({
        name: i.name,
        title: i.name,
        slug: { current: i.slug },
        icon: i.icon,
        description: i.description
    }));
};
