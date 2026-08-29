import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Truck, Inbox, Droplets, Flame, ArrowRight, ShieldCheck, Clock, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { UK_CHASSIS_OPTIONS, TRAILER_MACHINE_OPTIONS, WATER_STORAGE_OPTIONS } from '@/lib/trailers/configurator-data';

export const dynamic = 'force-dynamic';

export default async function AdminTrailerBuildsPage() {
  let builds: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('enquiries')
      .select('*')
      .eq('type', 'trailer-build')
      .order('created_at', { ascending: false });

    if (data) builds = data;
  } catch (err) {
    console.error('Error fetching trailer builds:', err);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Trailer Rig Builds & Engineering Pipeline
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {builds.length} configured mobile cleaning systems & high-intent quotation requests
          </p>
        </div>
        <Link
          href="/trailers/configure"
          target="_blank"
          className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors"
        >
          <Truck className="h-4 w-4" /> Open Public Configurator
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">TOTAL SAVED BUILDS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{builds.length}</h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E5FF] uppercase font-bold">OPEN DECK RIGS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {builds.filter((b) => b.metadata?.format === 'open-deck').length}
          </h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FFD700] uppercase font-bold">ENCLOSED PLANT ROOMS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {builds.filter((b) => b.metadata?.format === 'enclosed').length}
          </h3>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase font-bold">WITH WATER RECOVERY</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {builds.filter((b) => b.metadata?.recovery_option_id && b.metadata.recovery_option_id !== 'recovery-none').length}
          </h3>
        </div>
      </div>

      {/* Build list */}
      {builds.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
          <Truck className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Trailer Configurations Yet
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When prospective buyers save configurations or submit engineering review requests via the new /trailers/configure experience, they will appear here with full technical specifications.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {builds.map((build) => {
            const meta = build.metadata || {};
            const chassis = UK_CHASSIS_OPTIONS.find((c) => c.id === meta.chassis_id);
            const machine = TRAILER_MACHINE_OPTIONS.find((m) => m.id === meta.machine_id);
            const tank = WATER_STORAGE_OPTIONS.find((t) => t.id === meta.water_storage_id);
            const weights = meta.weights;

            return (
              <div key={build.id} className="p-6 hover:bg-[#111] transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2.5 py-0.5 uppercase font-bold tracking-widest">
                        {build.reference || 'AKT-CONFIG'}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#888] bg-[#1A1A1A] px-2 py-0.5 border border-[#333] uppercase">
                        {meta.format === 'open-deck' ? 'Open Deck' : 'Enclosed Mobile Plant Room'}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                        {new Date(build.created_at).toLocaleDateString('en-GB')} at{' '}
                        {new Date(build.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
                      {build.name || 'Anonymous Configuration'}
                      {build.company ? ` — ${build.company}` : ''}
                    </h3>

                    {/* Contact details */}
                    <div className="flex flex-wrap items-center gap-4 font-ibm-plex-mono text-xs text-[#aaa] mb-4">
                      {build.phone && <span>📞 {build.phone}</span>}
                      {build.email && <span>✉️ {build.email}</span>}
                      {meta.operational_context?.industry && (
                        <span>🏭 Sector: {meta.operational_context.industry}</span>
                      )}
                    </div>

                    {/* Config highlights grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#080808] border border-[#1C1C1C] p-3 text-xs">
                      <div>
                        <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] block">
                          CHASSIS
                        </span>
                        <span className="text-white font-medium">{chassis?.name || meta.chassis_id || 'Standard'}</span>
                      </div>
                      <div>
                        <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] block">
                          CLEANING MACHINE
                        </span>
                        <span className="text-[#FF6900] font-medium">{machine?.name || meta.machine_id || 'Alkota Skid'}</span>
                      </div>
                      <div>
                        <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] block">
                          WATER PAYLOAD
                        </span>
                        <span className="text-white font-medium">{tank ? `${tank.litres}L` : 'Mains Buffer'}</span>
                      </div>
                      <div>
                        <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] block">
                          OPERATORS
                        </span>
                        <span className="text-white font-medium">{meta.operator_count || 1} Operator(s)</span>
                      </div>
                    </div>

                    {/* Message or notes */}
                    {build.message && (
                      <p className="text-[#888] text-xs mt-3 italic bg-[#111] p-2 border-l-2 border-[#FF6900]">
                        "{build.message}"
                      </p>
                    )}
                  </div>

                  {/* Right actions & weights */}
                  <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#222] pt-4 lg:pt-0 lg:pl-6 space-y-4">
                    {weights && (
                      <div className="bg-[#080808] border border-[#1C1C1C] p-3 space-y-1 text-xs">
                        <div className="flex justify-between text-[#777]">
                          <span>Est. Dry Weight:</span>
                          <span className="text-white font-mono">{weights.estimated_dry_weight_kg} kg</span>
                        </div>
                        <div className="flex justify-between text-[#777]">
                          <span>Est. Wet Weight:</span>
                          <span className="text-[#FF6900] font-mono font-bold">{weights.estimated_wet_weight_kg} kg</span>
                        </div>
                        <div className="flex justify-between text-[#777]">
                          <span>Chassis MAM:</span>
                          <span className="text-white font-mono">{weights.chassis_mam_kg} kg</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-[#1C1C1C]">
                          <span className="text-[#555]">Margin:</span>
                          <span className={`font-mono ${weights.is_overweight ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                            {weights.payload_margin_kg >= 0 ? '+' : ''}{weights.payload_margin_kg} kg
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/trailers/build/${build.reference}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" /> View Public Build Sheet
                      </Link>
                      <Link
                        href={`/admin/enquiries/${build.id}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222] font-ibm-plex-mono text-[9px] uppercase text-white transition-all"
                      >
                        Manage Lead & Status →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
