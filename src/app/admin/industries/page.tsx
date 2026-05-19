import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Edit, Globe } from 'lucide-react';

const SEED_INDUSTRIES = [
  { slug: 'agriculture', name: 'Agriculture & Farming' },
  { slug: 'oil-gas', name: 'Oil & Gas' },
  { slug: 'fleet-transport', name: 'Fleet & Transport' },
  { slug: 'food-processing', name: 'Food Processing' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'plant-hire', name: 'Plant Hire' },
  { slug: 'local-authorities', name: 'Local Authorities / Councils' },
  { slug: 'marine', name: 'Marine' },
  { slug: 'waste-management', name: 'Waste Management' },
  { slug: 'mining', name: 'Mining' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'automotive', name: 'Automotive' },
];

export default async function IndustriesPage() {
  const { data } = await supabaseAdmin.from('industry_pages').select('id,slug,name,published,created_at').order('name');
  const dbPages = data ?? [];

  // Merge DB pages with seed list so all industries show even if not yet in DB
  const pageMap = new Map(dbPages.map((p: any) => [p.slug, p]));
  const industries = SEED_INDUSTRIES.map(s => ({ ...s, ...pageMap.get(s.slug), inDb: pageMap.has(s.slug) }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Industry Pages</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {dbPages.filter((p: any) => p.published).length} published · Programmatic SEO</p>
      </div>

      <div className="border border-[#222] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Industry', 'Slug', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {industries.map((ind: any, i: number) => (
              <tr key={ind.slug} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-[#444]" />
                    <span className="font-inter text-[13px] text-white font-medium">{ind.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">alkota.co.uk/industries/{ind.slug}</td>
                <td className="px-4 py-3">
                  {!ind.inDb ? (
                    <span className="font-ibm-plex-mono text-[9px] px-2 py-0.5 border text-[#444] border-[#222]">Not Created</span>
                  ) : ind.published ? (
                    <span className="font-ibm-plex-mono text-[9px] px-2 py-0.5 border text-green-400 border-green-900/50 bg-green-950/30">Published</span>
                  ) : (
                    <span className="font-ibm-plex-mono text-[9px] px-2 py-0.5 border text-[#555] border-[#222]">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={ind.inDb ? `/admin/industries/${ind.id}` : `/admin/industries/new?slug=${ind.slug}&name=${encodeURIComponent(ind.name)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all"
                  >
                    <Edit className="h-3 w-3" /> {ind.inDb ? 'Edit' : 'Create'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
