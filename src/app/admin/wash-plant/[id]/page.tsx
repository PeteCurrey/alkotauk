import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Factory, 
  ChevronLeft, 
  Layers, 
  Droplets, 
  Cpu, 
  Calendar, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText,
  Zap,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function AdminWashPlantProjectPage({ params }: Props) {
  const { id } = await params;

  let project: any = null;
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('*')
      .eq('id', id)
      .single();
    if (data) project = data;
  } catch (err) {
    console.error('Error fetching project record:', err);
  }

  if (!project) {
    return (
      <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
        <h2 className="font-barlow-condensed text-3xl font-bold uppercase text-white mb-2">
          Project Record Not Found
        </h2>
        <p className="font-inter text-xs text-[#666] mb-6">
          The requested project ID does not exist in the wash plant pipeline database.
        </p>
        <Link
          href="/admin/wash-plant"
          className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-widest"
        >
          <span>Return to Pipeline</span>
        </Link>
      </div>
    );
  }

  const rawData = project.architect_data || {};
  const step1 = rawData.step1 || {};
  const step2 = rawData.step2 || {};
  const step3 = rawData.step3 || {};
  const step4 = rawData.step4 || {};
  const step5 = rawData.step5 || {};
  const step6 = rawData.step6 || {};
  const step7 = rawData.step7 || {};
  const step8 = rawData.step8 || {};
  const step9 = rawData.step9 || {};

  return (
    <div className="space-y-8">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div>
        <Link
          href="/admin/wash-plant"
          className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono text-[#888] hover:text-[#FF6900] uppercase tracking-wider"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Wash Plant Pipeline</span>
        </Link>
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#222]">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2.5 py-0.5 uppercase font-bold">
              {project.reference}
            </span>
            <span className="font-ibm-plex-mono text-[10px] bg-[#222] text-[#ccc] px-2.5 py-0.5 uppercase border border-[#333]">
              STATUS: {project.status.toUpperCase()}
            </span>
            <span className="font-ibm-plex-mono text-[10px] text-[#666]">
              Logged: {new Date(project.created_at).toLocaleDateString('en-GB')}
            </span>
          </div>

          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            {project.project_name || 'Industrial Wash Project'}
          </h1>
          <p className="font-ibm-plex-mono text-sm text-[#aaa]">
            {project.client_company} — {project.client_name}
          </p>
        </div>

        {/* Handover & Conversion Action */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="text-right">
            <span className="font-ibm-plex-mono text-[8px] text-[#777] uppercase block">ESTIMATED VALUE</span>
            <span className="font-barlow-condensed text-3xl font-black text-[#FF6900]">
              {project.estimated_value_gbp ? `£${Number(project.estimated_value_gbp).toLocaleString('en-GB')}` : project.budget_band || 'TBD'}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#222] text-[#aaa] hover:text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest border border-[#333] transition-colors"
          >
            <Zap className="h-3.5 w-3.5 text-[#FF6900]" />
            <span>Convert to Managed Asset</span>
          </button>
        </div>
      </div>

      {/* ── CLIENT & SITE INFORMATION ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-ibm-plex-mono text-xs">
        <div className="bg-[#0E0E0E] border border-[#222] p-5 space-y-2">
          <span className="text-[9px] text-[#FF6900] uppercase font-bold block">CLIENT STAKEHOLDER</span>
          <p className="text-white text-sm font-bold">{project.client_name}</p>
          <p className="text-[#aaa]">{project.client_company}</p>
          <p className="text-[#888]">✉️ {project.client_email}</p>
          <p className="text-[#888]">📞 {project.client_phone}</p>
        </div>

        <div className="bg-[#0E0E0E] border border-[#222] p-5 space-y-2">
          <span className="text-[9px] text-[#00E5FF] uppercase font-bold block">SITE & LOCATION</span>
          <p className="text-white text-sm font-bold">{project.site_location || 'UK Facility'}</p>
          <p className="text-[#aaa]">Type: {project.site_type?.replace('_', ' ').toUpperCase() || 'EXISTING'}</p>
          <p className="text-[#888]">Procurement: {project.procurement_route?.replace('_', ' ').toUpperCase() || 'DIRECT'}</p>
          <p className="text-[#888]">Target: {project.target_date || 'Flexible'}</p>
        </div>

        <div className="bg-[#0E0E0E] border border-[#222] p-5 space-y-2">
          <span className="text-[9px] text-[#00E676] uppercase font-bold block">LIFECYCLE & SERVICE</span>
          <p className="text-white text-sm font-bold">Service Opportunity: {project.service_opportunity ? 'YES' : 'NO'}</p>
          <p className="text-[#aaa]">Requirements: {project.service_requirements?.length || 0} items selected</p>
          <p className="text-[#888]">Asset Handover ID: {project.converted_to_asset_id || 'Not Yet Commissioned'}</p>
        </div>
      </div>

      {/* ── ARCHITECT SCOPING DATA BREAKDOWN ──────────────────────────────── */}
      <div className="border border-[#222] bg-[#0E0E0E] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
            Architect Tool Scoping Payload
          </h3>
          <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">
            Captured via /wash-plant/architect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-ibm-plex-mono text-xs text-[#ccc]">
          {/* Step 1: Assets */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">01. ASSET TYPES & CLASSIFICATION</strong>
            <p className="text-white">
              {step1.asset_types?.length > 0 ? step1.asset_types.join(', ') : 'None specified'}
            </p>
            {step1.other && <p className="text-[#888]">Other: {step1.other}</p>}
          </div>

          {/* Step 2: Dimensions */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">02. GEOMETRY & ENVELOPE</strong>
            <p>Length: {step2.dimensions?.length_mm || 'N/A'} mm | Width: {step2.dimensions?.width_mm || 'N/A'} mm</p>
            <p>Height: {step2.dimensions?.height_mm || 'N/A'} mm | Weight: {step2.dimensions?.weight_kg || 'N/A'} kg</p>
            {step2.no_spray_zones && <p className="text-[#888]">No-spray: {step2.no_spray_zones}</p>}
          </div>

          {/* Step 3: Throughput */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">03. THROUGHPUT DEMAND</strong>
            <p>Rate: {step3.assets_per_hour || 'N/A'} units/hr | {step3.assets_per_shift || 'N/A'} units/shift</p>
            <p>Operation: {step3.operating_hours_per_day || 8} hrs/day, {step3.days_per_week || 5} days/week</p>
            <p>Target Cycle: {step3.target_cycle_minutes || 'N/A'} mins</p>
          </div>

          {/* Step 4: Contamination */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">04. CONTAMINATION PROFILE</strong>
            <p className="text-white">
              {step4.contamination?.length > 0 ? step4.contamination.join(', ') : 'Industrial grime'}
            </p>
          </div>

          {/* Step 5: Architecture */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">05. DESIRED ARCHITECTURE</strong>
            <p className="text-white uppercase">{step5.preference?.replace('_', ' ') || 'ADVISE ME'}</p>
          </div>

          {/* Step 6: Water */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">06. WATER & RECOVERY</strong>
            <p>Mains Water: {step6.mains_water || 'yes'} | Reuse Required: {step6.reuse_required || 'yes'}</p>
            <p>Discharge: {step6.discharge?.replace('_', ' ').toUpperCase() || 'FOUL SEWER'}</p>
          </div>

          {/* Step 7: Site & Civils */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">07. SITE & POWER UTILITIES</strong>
            <p>Environment: {step7.location?.replace('_', ' ').toUpperCase() || 'OUTDOOR'}</p>
            <p>3-Phase 400V: {step7.three_phase || 'yes'} | Heating Fuel: {step7.heating_fuel?.toUpperCase() || 'GAS'}</p>
          </div>

          {/* Step 9: Service */}
          <div className="bg-[#141414] border border-[#222] p-4 space-y-2">
            <strong className="text-[#FF6900] uppercase block">09. SERVICE & PPM REQUIREMENTS</strong>
            <p className="text-white">
              {step9.requirements?.length > 0 ? step9.requirements.join(', ') : 'Standard PPM'}
            </p>
          </div>
        </div>

        {rawData.notes && (
          <div className="bg-[#121212] border border-[#222] p-4 font-ibm-plex-mono text-xs text-[#aaa]">
            <strong className="text-white uppercase block mb-1">CLIENT NOTES:</strong>
            <p className="italic">"{rawData.notes}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
