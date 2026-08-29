import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Zap, 
  ChevronLeft, 
  Layers, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Wrench, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function AdminWashPlantAssetDetailPage({ params }: Props) {
  const { id } = await params;

  let asset: any = null;
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_assets')
      .select('*')
      .eq('id', id)
      .single();
    if (data) asset = data;
  } catch (err) {
    // fallback
  }

  if (!asset) {
    // Sample fallback data
    asset = {
      id,
      asset_reference: 'WP-001',
      client_name: 'David Morrison',
      client_company: 'National Logistics Hub Ltd',
      site_name: 'Warrington 4-Bay Fleet Depot',
      site_location: 'Warrington, WA1 1AA',
      contract_tier: 'managed_asset_support',
      commissioning_date: '2024-03-15',
      warranty_expiry: '2027-03-15',
      ppm_frequency: 'quarterly',
      next_ppm_date: '2026-09-15',
      sla_response_hours: 8,
      condition_rating: 'excellent',
      obsolescence_risk: 'low',
      replacement_forecast_year: 2036,
      telemetry_enabled: true
    };
  }

  return (
    <div className="space-y-8">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div>
        <Link
          href="/admin/wash-plant/assets"
          className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono text-[#888] hover:text-[#FF6900] uppercase tracking-wider"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Asset Register</span>
        </Link>
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#222]">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2.5 py-0.5 uppercase font-bold">
              {asset.asset_reference}
            </span>
            <span className="font-ibm-plex-mono text-[10px] bg-emerald-950/60 text-emerald-400 px-2.5 py-0.5 uppercase border border-emerald-700">
              TIER: {asset.contract_tier?.replace(/_/g, ' ').toUpperCase()}
            </span>
            {asset.telemetry_enabled && (
              <span className="font-ibm-plex-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 border border-[#00E5FF]/20">
                ⚡ TELEMETRY LINKED
              </span>
            )}
          </div>

          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            {asset.site_name}
          </h1>
          <p className="font-ibm-plex-mono text-sm text-[#aaa]">
            {asset.client_company} — {asset.site_location}
          </p>
        </div>

        <div className="text-right">
          <span className="font-ibm-plex-mono text-[8px] text-[#777] uppercase block">NEXT SCHEDULED PPM</span>
          <span className="font-barlow-condensed text-3xl font-black text-[#00E676]">{asset.next_ppm_date || 'Q3 2026'}</span>
        </div>
      </div>

      {/* ── CONTRACT & GOVERNANCE SUMMARY ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-ibm-plex-mono text-xs">
        <div className="bg-[#0E0E0E] border border-[#222] p-4 space-y-1">
          <span className="text-[9px] text-[#FF6900] uppercase font-bold block">COMMISSIONING</span>
          <p className="text-white font-bold">{asset.commissioning_date || '2024'}</p>
          <span className="text-[#777] text-[10px]">Warranty to: {asset.warranty_expiry || '2027'}</span>
        </div>

        <div className="bg-[#0E0E0E] border border-[#222] p-4 space-y-1">
          <span className="text-[9px] text-[#00E5FF] uppercase font-bold block">PPM SCHEDULE</span>
          <p className="text-white font-bold">{asset.ppm_frequency?.toUpperCase() || 'QUARTERLY'}</p>
          <span className="text-[#777] text-[10px]">SLA Response: {asset.sla_response_hours || 24}h target</span>
        </div>

        <div className="bg-[#0E0E0E] border border-[#222] p-4 space-y-1">
          <span className="text-[9px] text-[#00E676] uppercase font-bold block">CONDITION RATING</span>
          <p className="text-white font-bold uppercase">{asset.condition_rating || 'EXCELLENT'}</p>
          <span className="text-[#777] text-[10px]">Obsolescence: {asset.obsolescence_risk?.toUpperCase() || 'LOW'}</span>
        </div>

        <div className="bg-[#0E0E0E] border border-[#222] p-4 space-y-1">
          <span className="text-[9px] text-[#FFD700] uppercase font-bold block">LIFECYCLE FORECAST</span>
          <p className="text-white font-bold">{asset.replacement_forecast_year || 2036}</p>
          <span className="text-[#777] text-[10px]">10+ Year Design Life</span>
        </div>
      </div>

      {/* ── ASSET HIERARCHY TREE ─────────────────────────────────────────── */}
      <div className="border border-[#222] bg-[#0E0E0E] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
            Component Asset Hierarchy
          </h3>
          <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">
            Granular Maintenance Register
          </span>
        </div>

        <div className="bg-[#141414] border border-[#222] p-6 font-ibm-plex-mono text-xs text-[#aaa] space-y-3">
          <div className="text-white flex items-center gap-2 pb-2 border-b border-[#333]">
            <span className="text-alkota-orange">●</span>
            <strong className="text-white">{asset.asset_reference} // {asset.site_name}</strong>
          </div>
          <div className="pl-4 space-y-2 border-l border-[#333]">
            <div>
              <span className="text-[#00E5FF]">├── SYSTEM 01: HIGH PRESSURE DELIVERY</span>
              <div className="pl-6 text-[#888] space-y-1 mt-1">
                <p>├── Pump P-01: Alkota Industrial Ceramic Triplex 345 BAR [Condition: Excellent]</p>
                <p>├── Pump P-02: Alkota Standby Ceramic Triplex 345 BAR [Condition: Excellent]</p>
                <p>└── Heating B-01: Continuous-Wound Schedule 80 ASTM Coil [Coil Health: 98%]</p>
              </div>
            </div>
            <div>
              <span className="text-[#00E676]">├── SYSTEM 02: WATER TREATMENT & RECOVERY</span>
              <div className="pl-6 text-[#888] space-y-1 mt-1">
                <p>├── Vessel F-01: Alkota CSF-10 Deep Bed Media Sand Filter</p>
                <p>├── Separator S-01: Coalescing Plate Oil/Water Interceptor (&lt; 5 PPM)</p>
                <p>└── Tank TK-01: 5,000L Stainless Recycled Water Buffer Reservoir</p>
              </div>
            </div>
            <div>
              <span className="text-[#FFD700]">└── SYSTEM 03: AUTOMATION & ELECTRICAL</span>
              <div className="pl-6 text-[#888] space-y-1 mt-1">
                <p>├── Master PLC: Siemens S7-1200 with Ethernet Telemetry Gateway</p>
                <p>└── Drive VSD-01: Inverter Variable Speed Ramping Controller</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
