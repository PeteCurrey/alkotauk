import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import AttachmentRowActions from './AttachmentRowActions';
import { VERIFIED_ATTACHMENTS } from '@/lib/attachments/seed-data';

export default async function AttachmentsAdminPage() {
  const { data: dbItems } = await supabaseAdmin
    .from('attachments')
    .select('id,name,slug,category,compatible_machines,price,featured,active')
    .order('name');

  // Merge: seed-data items take precedence for technical QA display
  const seedItems = VERIFIED_ATTACHMENTS;

  // QA flags: items that need attention
  const noImage   = seedItems.filter((a) => !a.image_url);
  const noParts   = seedItems.filter((a) => !a.part_number);
  const noPrice   = seedItems.filter((a) => !a.price);
  const unverified = seedItems.filter((a) =>
    a.compatible_machines?.some((c) => c.status === 'technical_review')
  );

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Attachments & Accessories</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {dbItems?.length ?? 0} database items · {seedItems.length} seed-data items
          </p>
        </div>
        <Link
          href="/admin/attachments/new"
          className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Attachment
        </Link>
      </div>

      {/* Sub-nav */}
      <div className="flex gap-px border border-[#222] bg-[#222] mb-8 text-sm">
        {[
          { label: 'All Items', href: '/admin/attachments', active: true },
          { label: 'View Public Page', href: '/attachments', active: false },
          { label: 'Machine Compatibility QA', href: '#compat-qa', active: false }
        ].map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className={`px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors ${
              t.active ? 'bg-[#FF6900] text-white' : 'bg-[#111] text-[#555] hover:text-white'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* QA Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#222] bg-[#222] mb-8">
        {[
          { icon: <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" />, label: 'Missing Image',    count: noImage.length,   color: '#F59E0B' },
          { icon: <AlertTriangle className="h-3.5 w-3.5 text-[#3B82F6]" />, label: 'No Part Number',  count: noParts.length,   color: '#3B82F6' },
          { icon: <Info          className="h-3.5 w-3.5 text-[#888]" />,    label: 'No Price Set',    count: noPrice.length,   color: '#888' },
          { icon: <CheckCircle   className="h-3.5 w-3.5 text-[#F59E0B]" />, label: 'Verify Compat.',  count: unverified.length, color: '#F59E0B' }
        ].map((item) => (
          <div key={item.label} className="bg-[#111] px-5 py-5">
            <div className="flex items-center gap-2 mb-2">{item.icon}</div>
            <div className="font-extralight text-[28px] leading-none" style={{ color: item.count > 0 ? item.color : '#22C55E' }}>
              {item.count}
            </div>
            <div className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* ─── SEED DATA TABLE (Technical QA) ─── */}
      <div className="mb-8">
        <h2 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] mb-3">
          // SEED DATA — Technical product records
        </h2>
        <div className="border border-[#222]">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
                {['Name', 'Category', 'Part No.', 'Pressure', 'Temp', 'Compat.', 'Image', 'Price', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seedItems.map((a, i) => {
                const hasImage = !!a.image_url;
                const hasPrice = !!a.price;
                const hasPartNum = !!a.part_number;
                const compatIssues = a.compatible_machines?.filter(
                  (c) => c.status === 'technical_review' || c.status === 'not_compatible'
                ).length ?? 0;

                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                    <td className="px-4 py-3">
                      <Link href={`/attachments/${a.slug}`} target="_blank" className="font-inter text-[12px] text-white hover:text-[#FF6900] line-clamp-1">
                        {a.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 font-ibm-plex-mono text-[9px] uppercase text-[#888]">
                      {a.category.replace(/-/g, ' ')}
                    </td>
                    <td className="px-4 py-2 font-ibm-plex-mono text-[9px]" style={{ color: hasPartNum ? '#9A9A92' : '#F59E0B' }}>
                      {a.part_number ?? '⚠ None'}
                    </td>
                    <td className="px-4 py-2 font-ibm-plex-mono text-[9px] text-[#888]">
                      {a.ratings.pressure_max_bar ? `${a.ratings.pressure_max_bar} BAR` : '—'}
                    </td>
                    <td className="px-4 py-2 font-ibm-plex-mono text-[9px] text-[#888]">
                      {a.ratings.temperature_max_c ? `${a.ratings.temperature_max_c}°C` : '—'}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="font-ibm-plex-mono text-[9px] uppercase tracking-widest"
                        style={{ color: compatIssues > 0 ? '#F59E0B' : '#22C55E' }}
                      >
                        {compatIssues > 0 ? `${compatIssues} to verify` : `✓ ${a.compatible_machines?.length ?? 0} machines`}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="font-ibm-plex-mono text-[9px] uppercase tracking-widest"
                        style={{ color: hasImage ? '#22C55E' : '#F59E0B' }}
                      >
                        {hasImage ? '✓ Set' : '⚠ Missing'}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-ibm-plex-mono text-[12px]" style={{ color: hasPrice ? 'white' : '#555' }}>
                      {a.price ? `£${a.price}` : 'POA'}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="font-ibm-plex-mono text-[9px] uppercase tracking-widest"
                        style={{ color: a.active ? '#22C55E' : '#555' }}
                      >
                        {a.active ? 'Active' : 'Off'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── DATABASE TABLE ─── */}
      {dbItems && dbItems.length > 0 && (
        <div>
          <h2 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] mb-3">
            // DATABASE — Supabase attachment records
          </h2>
          <div className="border border-[#222]">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
                  {['Name', 'Category', 'Compatible Machines', 'Price', 'Featured', 'Active', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dbItems?.map((a: any, i: number) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                    <td className="px-4 py-3">
                      <Link href={`/admin/attachments/${a.id}/edit`} className="font-inter text-[13px] text-white hover:text-[#FF6900]">{a.name}</Link>
                    </td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">{a.category}</td>
                    <td className="px-4 py-3 font-inter text-[11px] text-[#666]">
                      {(a.compatible_machines || []).slice(0, 3).join(', ')}{(a.compatible_machines?.length || 0) > 3 ? '…' : ''}
                    </td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[12px] text-white">{a.price ? `£${a.price}` : 'POA'}</td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[10px]" style={{ color: a.featured ? '#FF6900' : '#444' }}>
                      {a.featured ? '★' : '—'}
                    </td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[10px]" style={{ color: a.active ? '#22C55E' : '#555' }}>
                      {a.active ? 'Active' : 'Off'}
                    </td>
                    <td className="px-4 py-3"><AttachmentRowActions attachment={a} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compatibility QA section */}
      {unverified.length > 0 && (
        <div id="compat-qa" className="mt-8">
          <h2 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#F59E0B] mb-3">
            // COMPATIBILITY QA — Items requiring verification
          </h2>
          <div className="border border-[#F59E0B22] bg-[#F59E0B08] p-5">
            <div className="space-y-2">
              {unverified.map((a) => {
                const issues = a.compatible_machines?.filter((c) => c.status === 'technical_review') ?? [];
                return (
                  <div key={a.id} className="border-b border-[#1A1A1A] pb-3 last:border-0">
                    <p className="font-ibm-plex-mono text-[10px] text-white mb-1">{a.name}</p>
                    {issues.map((c) => (
                      <p key={c.machine_slug} className="font-ibm-plex-mono text-[9px] text-[#888] ml-3">
                        ↳ {c.machine_name}: {c.notes ?? c.limitation_reason ?? 'Verify compatibility before publishing.'}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
