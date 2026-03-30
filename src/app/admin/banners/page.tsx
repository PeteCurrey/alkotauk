import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import BannerRowActions from './BannerRowActions';

const STYLE_COLOURS: Record<string, string> = {
  info: '#3B82F6', promo: '#FF6900', warning: '#F59E0B', urgent: '#EF4444',
};

function bannerStatus(banner: any): { label: string; colour: string } {
  if (!banner.active) return { label: 'Draft', colour: '#555' };
  const now = new Date();
  if (banner.start_date && new Date(banner.start_date) > now) return { label: 'Scheduled', colour: '#F59E0B' };
  if (banner.end_date && new Date(banner.end_date) < now) return { label: 'Expired', colour: '#555' };
  return { label: 'Active', colour: '#22C55E' };
}

export default async function BannersPage() {
  const { data: banners } = await supabaseAdmin.from('banners').select('*').order('created_at', { ascending: false });

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Banners</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Sitewide announcement strips</p>
        </div>
        <Link href="/admin/banners/new" className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> New Banner
        </Link>
      </div>

      <div className="border border-[#222]">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Message', 'Style', 'Status', 'Start', 'End', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {banners?.map((b: any, i: number) => {
              const status = bannerStatus(b);
              return (
                <tr key={b.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-inter text-[13px] text-white truncate">{b.message}</p>
                    {b.link_text && <p className="font-ibm-plex-mono text-[10px] text-[#555]">{b.link_text} → {b.link_url}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase" style={{
                      color: STYLE_COLOURS[b.style] || '#888',
                      border: `1px solid ${STYLE_COLOURS[b.style] || '#333'}`,
                    }}>{b.style}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-ibm-plex-mono text-[10px]" style={{ color: status.colour }}>{status.label}</span>
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                    {b.start_date ? new Date(b.start_date).toLocaleDateString('en-GB') : '—'}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                    {b.end_date ? new Date(b.end_date).toLocaleDateString('en-GB') : '—'}
                  </td>
                  <td className="px-4 py-3"><BannerRowActions banner={b} /></td>
                </tr>
              );
            })}
            {(!banners || banners.length === 0) && (
              <tr><td colSpan={6} className="px-4 py-12 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase">No banners yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
