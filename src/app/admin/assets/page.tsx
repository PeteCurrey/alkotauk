import Link from 'next/link';
import {
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Link2,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

export const dynamic = 'force-dynamic';

export default function AdminAssetsPage() {
  const asset = SAMPLE_DELIVERED_ASSET;

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white tracking-tight">
            Trailer Asset Register &amp; Lifecycle Ledger
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // Delivered systems · Serialised · In active service
          </p>
        </div>
      </div>

      {/* ── METRICS ROW (REAL DATA ONLY) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111] p-5 border border-[#222]">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">Systems In Service</p>
          <p className="font-barlow-condensed text-3xl font-black text-emerald-400 mt-1">1</p>
          <p className="text-[10px] text-[#555] mt-1 font-ibm-plex-mono">Active customer assets</p>
        </div>

        <div className="bg-[#111] p-5 border border-[#222]">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">Service Due (&lt;90 Days)</p>
          <p className="font-barlow-condensed text-3xl font-black text-[#FF6900] mt-1">1</p>
          <p className="text-[10px] text-[#555] mt-1 font-ibm-plex-mono">Actionable PPM schedules</p>
        </div>

        <div className="bg-[#111] p-5 border border-[#222]">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">Warranties Expiring</p>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">0</p>
          <p className="text-[10px] text-[#555] mt-1 font-ibm-plex-mono">Within next 30 days</p>
        </div>

        <div className="bg-[#111] p-5 border border-[#222]">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">Active Service Plans</p>
          <p className="font-barlow-condensed text-3xl font-black text-[#888] mt-1">0</p>
          <p className="text-[10px] text-[#555] mt-1 font-ibm-plex-mono">Alkota Care contracts</p>
        </div>
      </div>

      {/* ── DELIVERED ASSETS TABLE ── */}
      <div className="bg-[#111] border border-[#222]">
        <div className="p-4 border-b border-[#222] flex items-center justify-between">
          <h3 className="font-barlow-condensed text-xl font-bold uppercase text-white">
            Delivered Trailer Systems
          </h3>
          <span className="font-ibm-plex-mono text-[10px] text-[#666] uppercase">
            Showing 1 Active Asset Record
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161616] font-ibm-plex-mono text-[10px] uppercase text-[#888] border-b border-[#222]">
              <tr>
                <th className="p-4">Build Ref</th>
                <th className="p-4">Customer / Site</th>
                <th className="p-4">Machine &amp; Arch</th>
                <th className="p-4">Delivered</th>
                <th className="p-4">Warranty</th>
                <th className="p-4">Next PPM</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F]">
              <tr className="hover:bg-[#161616] transition-colors">
                <td className="p-4 font-ibm-plex-mono">
                  <span className="text-[#FF6900] font-bold block">{asset.build_reference}</span>
                  <span className="text-[10px] text-[#666]">{asset.build_code}</span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-white block">{asset.customer_company}</span>
                  <span className="text-[#777] text-[11px]">{asset.customer_site}</span>
                </td>
                <td className="p-4">
                  <span className="text-white block font-medium">Alkota DED-4000 Diesel</span>
                  <span className="text-[10px] text-[#777]">Enclosed 3,500kg · Dual-Gun · Closed-Loop</span>
                </td>
                <td className="p-4 font-ibm-plex-mono text-emerald-400">
                  {asset.actual_handover_date?.slice(0, 10)}
                </td>
                <td className="p-4 font-ibm-plex-mono text-[#AAA]">
                  {asset.warranty_end}
                </td>
                <td className="p-4 font-ibm-plex-mono text-amber-400">
                  2025-11-29
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href="/admin/trailer-builds/bp-002"
                    className="inline-flex items-center gap-1 bg-[#222] hover:bg-[#FF6900] hover:text-white text-[#AAA] px-2.5 py-1 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Build Control
                  </Link>
                  <Link
                    href={`/my-alkota/builds/${asset.build_code}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 border border-[#333] hover:border-white text-[#777] hover:text-white px-2.5 py-1 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Customer View
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SCHEDULED SERVICE LEDGER ── */}
      <div className="bg-[#111] border border-[#222] p-6 space-y-4">
        <h4 className="font-barlow-condensed text-xl font-bold uppercase text-white flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#FF6900]" /> Scheduled Preventative Maintenance Queue
        </h4>
        <div className="space-y-2">
          {asset.service_schedule?.map(item => (
            <div key={item.id} className="p-3 bg-[#161616] border border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-medium text-white block">{item.component}</span>
                <span className="text-[11px] text-[#777]">{item.service_type} · Provider: {item.assigned_provider}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-ibm-plex-mono text-xs text-amber-400 font-bold">
                  Next Due: {item.next_due_date}
                </span>
                <span
                  className={`px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase font-bold ${
                    item.status === 'due_soon'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}
                >
                  {item.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
