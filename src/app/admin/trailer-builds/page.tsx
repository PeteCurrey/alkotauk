import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Truck, Inbox, Droplets, Flame, ArrowRight, ShieldCheck, Clock, CheckCircle2, AlertTriangle, Eye, Sparkles, Plus, Scale } from 'lucide-react';
import {
  UK_CHASSIS_OPTIONS,
  TRAILER_MACHINE_OPTIONS,
  WATER_STORAGE_OPTIONS,
  calculateOpportunityScore,
  calculateCommercialValue,
} from '@/lib/trailers/configurator-data';

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

  // Calculate high-intent commercial metrics
  const scoredBuilds = builds.map(b => {
    const meta = b.metadata || {};
    const fullConfig = {
      ...meta,
      contact: {
        name: b.name,
        company: b.company,
        email: b.email,
        phone: b.phone,
        postcode: meta.postcode || '',
        timeline: meta.timeline || meta.contact?.timeline,
      },
    };
    const oppScore = calculateOpportunityScore(fullConfig);
    const commVal = calculateCommercialValue(meta);
    return { ...b, opportunityScore: oppScore, commercialValue: commVal };
  });

  const priorityCount = scoredBuilds.filter(b => b.opportunityScore.tier === 'priority').length;
  const activeCount = scoredBuilds.filter(b => b.opportunityScore.tier === 'active').length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Trailer Rig Builds & Commercial Opportunity Pipeline
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {builds.length} configured systems · {priorityCount} Priority Opportunities · {activeCount} Active Deals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/trailers/configure"
            target="_blank"
            className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Start Sales-Assisted Build
          </Link>
          <Link
            href="/trailers/compare"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white transition-colors"
          >
            <Scale className="h-3.5 w-3.5" /> Compare Matrix
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">TOTAL SAVED BUILDS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{builds.length}</h3>
          <p className="text-[10px] font-ibm-plex-mono text-[#666] mt-0.5">Canonical builds</p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-red-400 uppercase font-bold">PRIORITY OPPORTUNITIES</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{priorityCount}</h3>
          <p className="text-[10px] font-ibm-plex-mono text-[#666] mt-0.5">Score 80+ / Immediate</p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-yellow-400 uppercase font-bold">ACTIVE PIPELINE</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{activeCount}</h3>
          <p className="text-[10px] font-ibm-plex-mono text-[#666] mt-0.5">Score 60–79 / 1–3 Months</p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase font-bold">ENVIRONMENTAL RECOVERY</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {builds.filter((b) => b.metadata?.recovery_option_id && b.metadata.recovery_option_id !== 'recovery-none').length}
          </h3>
          <p className="text-[10px] font-ibm-plex-mono text-[#666] mt-0.5">VFS / Closed-Loop</p>
        </div>
      </div>

      {/* Build list */}
      {scoredBuilds.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
          <Truck className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Trailer Configurations Yet
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When prospective buyers save configurations or submit engineering review requests via the new /trailers/configure experience, they will appear here with full technical specifications and commercial scoring.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {scoredBuilds.map((build) => {
            const meta = build.metadata || {};
            const chassis = UK_CHASSIS_OPTIONS.find((c) => c.id === meta.chassis_id);
            const machine = TRAILER_MACHINE_OPTIONS.find((m) => m.id === meta.machine_id);
            const tank = WATER_STORAGE_OPTIONS.find((t) => t.id === meta.water_storage_id);
            const weights = meta.weights;
            const score = build.opportunityScore;
            const commVal = build.commercialValue;

            return (
              <div key={build.id} className="p-6 hover:bg-[#111] transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-ibm-plex-mono text-[10px] bg-[#FF6900] text-white px-2.5 py-0.5 uppercase font-bold tracking-widest">
                        {build.reference || 'AKT-CONFIG'}
                      </span>

                      {/* Opportunity Score Pill */}
                      <span className={`font-ibm-plex-mono text-[9px] px-2.5 py-0.5 uppercase font-bold tracking-wider border ${
                        score.tier === 'priority'
                          ? 'border-red-500/50 bg-red-950/40 text-red-400'
                          : score.tier === 'active'
                          ? 'border-yellow-500/50 bg-yellow-950/40 text-yellow-400'
                          : 'border-[#333] bg-[#1A1A1A] text-[#888]'
                      }`}>
                        OPPORTUNITY SCORE: {score.score}/100 ({score.tier.toUpperCase()})
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

                    {/* Contact & Commercial Context */}
                    <div className="flex flex-wrap items-center gap-4 font-ibm-plex-mono text-xs text-[#aaa] mb-3">
                      {build.phone && <span>📞 {build.phone}</span>}
                      {build.email && <span>✉️ {build.email}</span>}
                      {meta.operational_context?.target_budget && (
                        <span>💰 Budget: {meta.operational_context.target_budget}</span>
                      )}
                      {meta.operational_context?.purchase_driver && (
                        <span>🎯 Driver: {meta.operational_context.purchase_driver}</span>
                      )}
                    </div>

                    {/* Score Signal Explanation Breakdown */}
                    {score.signals.length > 0 && (
                      <div className="mb-3 bg-[#0B0B0B] border border-[#1A1A1A] p-2.5">
                        <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555] mb-1">
                          Commercial Intelligence Signals:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {score.signals.map((sig: string, idx: number) => (
                            <span key={idx} className="font-ibm-plex-mono text-[9px] text-alkota-grey border border-[#222] px-2 py-0.5">
                              {sig}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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
                          GUIDE VALUE
                        </span>
                        <span className="text-white font-medium">{commVal.guide_price_display}</span>
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
                        Manage Lead & Quoting →
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
