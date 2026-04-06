import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Inbox, FileText, FlaskConical, Megaphone, Lock, ArrowRight, Plus } from 'lucide-react';

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const results = await Promise.all([
    supabaseAdmin.from('enquiries').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin.from('enquiries').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabaseAdmin.from('enquiries').select('*', { count: 'exact', head: true }).eq('type', 'trailer'),
    supabaseAdmin.from('enquiries').select('*', { count: 'exact', head: true }).in('type', ['industrial', 'industrial-brief']),
    supabaseAdmin.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
    supabaseAdmin.from('chemicals').select('*', { count: 'exact', head: true }).eq('active', true),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('active', true),
    supabaseAdmin.from('banners').select('*', { count: 'exact', head: true }).eq('active', true),
    supabaseAdmin.from('enquiries').select('id,reference,type,name,company,created_at,status').order('created_at', { ascending: false }).limit(10),
    supabaseAdmin.from('site_settings').select('value').eq('key', 'maintenance_mode').maybeSingle(),
    supabaseAdmin.from('banners').select('message').eq('active', true).limit(1).maybeSingle(),
  ]);

  const [
    totalEnquiries,
    newEnquiries,
    monthEnquiries,
    trailerEnquiries,
    industrialEnquiries,
    blogPublished,
    activeChemicals,
    partsCount,
    activeBanners,
    enquiriesRecent,
    maintenanceSetting,
    activeBannerData,
  ] = results;

  return {
    totalEnquiries: totalEnquiries?.count ?? 0,
    newEnquiries: newEnquiries?.count ?? 0,
    monthEnquiries: monthEnquiries?.count ?? 0,
    trailerEnquiries: trailerEnquiries?.count ?? 0,
    industrialEnquiries: industrialEnquiries?.count ?? 0,
    blogPublished: blogPublished?.count ?? 0,
    activeChemicals: activeChemicals?.count ?? 0,
    partsCount: partsCount?.count ?? 0,
    activeBanners: activeBanners?.count ?? 0,
    enquiriesRecent: enquiriesRecent?.data ?? [],
    maintenanceActive: maintenanceSetting?.data?.value === 'true',
    activeBannerMessage: activeBannerData?.data?.message ?? null,
  };
}

const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900',
  read: '#666',
  responded: '#3B82F6',
  closed: '#22C55E',
};

function StatCard({ label, value, sub, href, colour = '#FF6900', icon: Icon }: {
  label: string; value: string | number; sub?: string; href?: string; colour?: string; icon?: React.ElementType;
}) {
  const content = (
    <div className="p-6 rounded-none border border-[#222] bg-[#141414] hover:border-[#333] transition-colors">
      {Icon && <Icon className="h-5 w-5 mb-4" style={{ color: colour }} />}
      <p className="font-barlow-condensed text-4xl font-black italic" style={{ color: colour }}>{value}</p>
      <p className="font-inter text-[13px] text-white font-semibold mt-1">{label}</p>
      {sub && <p className="font-inter text-[11px] text-[#555] mt-1">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Overview</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
          // {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Row 1 — Enquiries */}
      <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">Enquiries</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="New Enquiries" value={stats.newEnquiries} sub="Unread" href="/admin/enquiries?status=new" icon={Inbox} />
        <StatCard label="This Month" value={stats.monthEnquiries} sub="Total received" href="/admin/enquiries" />
        <StatCard label="Trailer Configs" value={stats.trailerEnquiries} sub="Submitted" href="/admin/enquiries?type=trailer" />
        <StatCard label="Industrial Briefs" value={stats.industrialEnquiries} sub="Submitted" href="/admin/enquiries?type=industrial" />
      </div>

      {/* Row 2 — Content */}
      <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">Content</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Posts Published" value={stats.blogPublished} href="/admin/blog" icon={FileText} />
        <StatCard label="Active Chemicals" value={stats.activeChemicals} href="/admin/chemicals" icon={FlaskConical} />
        <StatCard label="Parts Listed" value={stats.partsCount} href="/admin/parts" />
        <StatCard label="Active Banners" value={stats.activeBanners} href="/admin/banners" icon={Megaphone} />
      </div>

      {/* Row 3 — Site Status */}
      <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">Site Status</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
        {/* Maintenance Mode */}
        <div className="p-6 border border-[#222] bg-[#141414]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#666]" />
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Maintenance Mode</span>
            </div>
            <Link href="/admin/maintenance" className="font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline">Manage →</Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full animate-pulse" style={{ background: stats.maintenanceActive ? '#EF4444' : '#22C55E' }} />
            <span className="font-barlow-condensed text-2xl font-black italic" style={{ color: stats.maintenanceActive ? '#EF4444' : '#22C55E' }}>
              {stats.maintenanceActive ? 'MAINTENANCE ACTIVE' : 'SITE LIVE'}
            </span>
          </div>
        </div>

        {/* Active Banner */}
        <div className="p-6 border border-[#222] bg-[#141414]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-[#666]" />
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Active Banner</span>
            </div>
            <Link href="/admin/banners" className="font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline">Manage →</Link>
          </div>
          <p className="font-inter text-[14px] text-white">
            {stats.activeBannerMessage ?? <span className="text-[#555] italic">No active banner</span>}
          </p>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-white">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="border border-[#222] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
                {['Reference', 'Type', 'Name', 'Company', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.enquiriesRecent.map((enq: any, i: number) => (
                <tr
                  key={enq.id}
                  style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}
                  className="hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries/${enq.id}`} className="font-ibm-plex-mono text-[11px] text-[#FF6900] hover:underline">
                      {enq.reference || '—'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{enq.type}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-white">{enq.name || '—'}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#888]">{enq.company || '—'}</td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                    {new Date(enq.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase tracking-wider" style={{
                      color: STATUS_COLOURS[enq.status] || '#666',
                      border: `1px solid ${STATUS_COLOURS[enq.status] || '#333'}`,
                      background: `${STATUS_COLOURS[enq.status] || '#333'}15`,
                    }}>
                      {enq.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.enquiriesRecent.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                    No enquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ New Blog Post', href: '/admin/blog/new' },
            { label: '+ New Chemical', href: '/admin/chemicals/new' },
            { label: '+ New Part', href: '/admin/parts/new' },
            { label: '+ New Banner', href: '/admin/banners/new' },
            { label: '⚙ Maintenance Mode', href: '/admin/maintenance' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-5 py-2.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#FF6900] hover:text-[#FF6900] transition-all"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
