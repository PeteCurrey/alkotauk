import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Truck, Plus, ArrowLeft, Wrench, CheckCircle2, Search } from 'lucide-react';
import { COMPREHENSIVE_MACHINE_MODELS, COMPREHENSIVE_MACHINE_FAMILIES } from '@/lib/parts/seed-comprehensive';

export const revalidate = 0;

export default async function AdminCompatibilityPage() {
  const { data: dbModels } = await supabaseAdmin
    .from('machine_models')
    .select('*')
    .order('sort_order');

  const models = (dbModels && dbModels.length > 0) ? dbModels : COMPREHENSIVE_MACHINE_MODELS;

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
              <span className="text-[#FF6900]">Machine Compatibility</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Machine Compatibility & Equipment Taxonomy
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Connect specific parts, service kits, and schematics to Alkota machine models and third-party platforms.
            </p>
          </div>
        </div>
      </div>

      {/* ── MODELS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Model Code</th>
              <th className="py-3.5 px-4">Model Name</th>
              <th className="py-3.5 px-4">Series / Family</th>
              <th className="py-3.5 px-4">Pressure & Flow</th>
              <th className="py-3.5 px-4">Power Source</th>
              <th className="py-3.5 px-4">Heating System</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {models.map((m: any) => (
              <tr key={m.slug} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                  {m.model_code}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#1E293B]">
                  {m.name}
                </td>
                <td className="py-3.5 px-4 text-[#64748B]">
                  {m.series || 'Alkota Standard'}
                </td>
                <td className="py-3.5 px-4 font-mono text-[#0F172A]">
                  {m.pressure_psi ? `${m.pressure_psi} PSI · ${m.flow_lpm} LPM` : 'Standard'}
                </td>
                <td className="py-3.5 px-4 text-[#475569]">
                  {m.power_source || 'Electric'}
                </td>
                <td className="py-3.5 px-4 text-[#64748B]">
                  {m.heating_type || 'Diesel Fired'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/parts-attachments/machines/alkota/${m.slug}`}
                    target="_blank"
                    className="text-xs text-[#FF6900] hover:underline font-medium"
                  >
                    View Spares →
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
