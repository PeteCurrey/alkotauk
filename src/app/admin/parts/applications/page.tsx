import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Layers, Plus, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { COMPREHENSIVE_APPLICATIONS } from '@/lib/parts/seed-comprehensive';

export const revalidate = 0;

export default async function AdminApplicationsPage() {
  const { data: dbApps } = await supabaseAdmin
    .from('applications')
    .select('*')
    .order('sort_order');

  const apps = (dbApps && dbApps.length > 0) ? dbApps : COMPREHENSIVE_APPLICATIONS;

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Applications CMS</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Industrial Cleaning Applications & Editorial Landers
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Curate application-led discovery pages, recommended tooling packages, and technical buying guides.
            </p>
          </div>
        </div>
      </div>

      {/* ── APPLICATIONS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Application</th>
              <th className="py-3.5 px-4">Tagline</th>
              <th className="py-3.5 px-4">Recommended Specifications</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {apps.map((app: any) => (
              <tr key={app.slug} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                  {app.name}
                </td>
                <td className="py-3.5 px-4 text-[#475569] max-w-sm truncate">
                  {app.tagline}
                </td>
                <td className="py-3.5 px-4 font-mono text-xs text-[#64748B]">
                  {app.recommended_specs}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/parts-attachments/applications/${app.slug}`}
                    target="_blank"
                    className="text-xs text-[#FF6900] hover:underline font-medium"
                  >
                    View Lander →
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
