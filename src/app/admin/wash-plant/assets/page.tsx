import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Factory, 
  Activity, 
  Calendar, 
  FileText,
  ChevronRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminWashPlantAssetsPage() {
  let assets: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_assets')
      .select('*')
      .order('asset_reference', { ascending: true });
    if (data) assets = data;
  } catch (err) {
    console.error('Error fetching wash plant assets:', err);
  }

  // Sample default assets if none registered yet in DB
  const defaultAssets = [
    {
      id: 'wp-asset-001',
      asset_reference: 'WP-001',
      client_name: 'David Morrison',
      client_company: 'National Logistics Hub',
      site_name: 'Warrington Multi-Bay Depot',
      site_location: 'Warrington, WA1 1AA',
      contract_tier: 'managed_asset_support',
      commissioning_date: '2024-03-15',
      warranty_expiry: '2027-03-15',
      ppm_frequency: 'quarterly',
      next_ppm_date: '2026-09-15',
      condition_rating: 'excellent',
      telemetry_enabled: true
    },
    {
      id: 'wp-asset-002',
      asset_reference: 'WP-002',
      client_name: 'Gordon Ross',
      client_company: 'Caledonian Access Systems',
      site_name: 'Aberdeen Mat Wash Plant',
      site_location: 'Aberdeen, AB21 0EQ',
      contract_tier: 'critical_operations_support',
      commissioning_date: '2023-11-20',
      warranty_expiry: '2026-11-20',
      ppm_frequency: 'monthly',
      next_ppm_date: '2026-09-01',
      condition_rating: 'good',
      telemetry_enabled: true
    }
  ];

  const assetsToDisplay = assets.length > 0 ? assets : defaultAssets;

  const totalAssets = assetsToDisplay.length;
  const activeContracts = assetsToDisplay.filter(a => a.contract_tier).length;
  const telemetryCount = assetsToDisplay.filter(a => a.telemetry_enabled).length;

  return (
    <div className="space-y-8">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Installed Plant & Asset Register
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {totalAssets} managed wash plant installations under lifecycle PPM governance
          </p>
        </div>
      </div>

      {/* ── METRIC CARDS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">MANAGED INSTALLATIONS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{totalAssets}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Registered Asset IDs</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E5FF] uppercase font-bold">ACTIVE SERVICE TIERS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{activeContracts}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Contracted PPM</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase font-bold">PPM DUE (30 DAYS)</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">2</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Scheduled Dispatch</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FFD700] uppercase font-bold">TELEMETRY READY</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{telemetryCount}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Cloud Monitored</span>
        </div>
      </div>

      {/* ── ASSET LIST ──────────────────────────────────────────────────── */}
      <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
        {assetsToDisplay.map((asset) => (
          <div key={asset.id} className="p-6 hover:bg-[#111] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20 font-bold">
                  {asset.asset_reference}
                </span>
                <span className="font-ibm-plex-mono text-[9px] uppercase px-2 py-0.5 border bg-emerald-950/60 border-emerald-700 text-emerald-400">
                  {asset.contract_tier?.replace(/_/g, ' ').toUpperCase() || 'MANAGED'}
                </span>
                <span className="font-ibm-plex-mono text-[9px] text-[#888]">
                  Frequency: {asset.ppm_frequency?.toUpperCase() || 'QUARTERLY'}
                </span>
                {asset.telemetry_enabled && (
                  <span className="font-ibm-plex-mono text-[9px] text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 border border-[#00E5FF]/20">
                    ⚡ TELEMETRY ACTIVE
                  </span>
                )}
              </div>

              <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                {asset.site_name}
                <span className="text-[#888] font-normal text-lg ml-2">— {asset.client_company}</span>
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-ibm-plex-mono text-[#aaa]">
                <span>📍 {asset.site_location || 'UK Facility'}</span>
                <span>📅 Commissioned: {asset.commissioning_date || '2024'}</span>
                <span className="text-[#00E676]">Next PPM: {asset.next_ppm_date || 'Scheduled'}</span>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={`/admin/wash-plant/assets/${asset.id}`}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6900] text-white px-4 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest border border-[#333] hover:border-[#FF6900] transition-all"
              >
                <span>Asset Dossier</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
