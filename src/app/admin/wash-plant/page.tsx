import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Factory, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Droplets, 
  DollarSign, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminWashPlantPage() {
  let projects: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) projects = data;
  } catch (err) {
    console.error('Error fetching wash plant projects:', err);
  }

  // Calculate high-value pipeline metrics
  const totalPipelineValue = projects
    .filter(p => p.status !== 'lost')
    .reduce((acc, p) => acc + (Number(p.estimated_value_gbp) || 0), 0);

  const newEnquiriesCount = projects.filter(p => p.status === 'new_enquiry').length;
  const inDeliveryCount = projects.filter(p => ['awarded', 'engineering', 'installation', 'commissioning'].includes(p.status)).length;
  const serviceContractsCount = projects.filter(p => p.status === 'service_contract').length;

  const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    new_enquiry: { label: 'New Enquiry', bg: 'bg-cyan-950/60 border-cyan-700', text: 'text-cyan-400' },
    qualification: { label: 'Qualification', bg: 'bg-blue-950/60 border-blue-700', text: 'text-blue-400' },
    site_survey: { label: 'Site Survey', bg: 'bg-indigo-950/60 border-indigo-700', text: 'text-indigo-400' },
    concept_design: { label: 'Concept Design', bg: 'bg-purple-950/60 border-purple-700', text: 'text-purple-400' },
    budget_proposal: { label: 'Budget Proposal', bg: 'bg-violet-950/60 border-violet-700', text: 'text-violet-400' },
    tender: { label: 'Tender Active', bg: 'bg-amber-950/60 border-amber-700', text: 'text-amber-400' },
    detailed_design: { label: 'Detailed Design', bg: 'bg-yellow-950/60 border-yellow-700', text: 'text-yellow-400' },
    quotation: { label: 'Formal Quotation', bg: 'bg-orange-950/60 border-orange-700', text: 'text-orange-400' },
    negotiation: { label: 'Negotiation', bg: 'bg-orange-950/60 border-orange-600', text: 'text-orange-300' },
    awarded: { label: 'Project Awarded', bg: 'bg-emerald-950/60 border-emerald-700', text: 'text-emerald-400' },
    engineering: { label: 'Engineering / CAD', bg: 'bg-emerald-950/60 border-emerald-600', text: 'text-emerald-300' },
    installation: { label: 'Site Installation', bg: 'bg-teal-950/60 border-teal-600', text: 'text-teal-300' },
    commissioning: { label: 'Commissioning / SAT', bg: 'bg-teal-950/60 border-teal-500', text: 'text-teal-200' },
    service_contract: { label: 'Managed Lifecycle', bg: 'bg-green-950/60 border-green-500', text: 'text-green-300' },
    lost: { label: 'Lost / Closed', bg: 'bg-red-950/60 border-red-800', text: 'text-red-400' }
  };

  return (
    <div className="space-y-8">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Wash Plant Projects Pipeline
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {projects.length} capital installations (£100k–£1m+) & lifecycle accounts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wash-plant/architect"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#FF6900] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Launch Architect Tool</span>
          </Link>
        </div>
      </div>

      {/* ── METRIC CARDS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">TOTAL PIPELINE VALUE</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            £{(totalPipelineValue / 1000).toLocaleString('en-GB', { maximumFractionDigits: 0 })}k
          </h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">{projects.length} Total Projects</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E5FF] uppercase font-bold">NEW SCOPING BRIEFS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{newEnquiriesCount}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Awaiting Survey</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#00E676] uppercase font-bold">IN DELIVERY / SAT</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{inDeliveryCount}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Engineering to SAT</span>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#FFD700] uppercase font-bold">MANAGED ASSETS / PPM</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">{serviceContractsCount}</h3>
          <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">Recurring Lifecycle</span>
        </div>
      </div>

      {/* ── PROJECT PIPELINE LIST ────────────────────────────────────────── */}
      {projects.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
          <Factory className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Wash Plant Projects Recorded
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto mb-6">
            When clients complete the 9-step Wash Plant Architect tool or submit capital enquiries, projects appear here with full technical scoping data.
          </p>
          <Link
            href="/wash-plant/architect"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-[#e55f00]"
          >
            <span>Submit Test Scoping Brief</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {projects.map((project) => {
            const statusConfig = STATUS_CONFIG[project.status] || { label: project.status, bg: 'bg-[#222]', text: 'text-white' };
            const valueDisplay = project.estimated_value_gbp ? `£${Number(project.estimated_value_gbp).toLocaleString('en-GB')}` : project.budget_band || 'TBD';

            return (
              <div key={project.id} className="p-6 hover:bg-[#111] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20 font-bold">
                      {project.reference}
                    </span>
                    <span className={`font-ibm-plex-mono text-[9px] uppercase px-2 py-0.5 border ${statusConfig.bg} ${statusConfig.text}`}>
                      {statusConfig.label}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                      {new Date(project.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {project.project_name || 'Industrial Wash Project'}
                    <span className="text-[#888] font-normal text-lg ml-2">— {project.client_company || project.client_name}</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-ibm-plex-mono text-[#aaa]">
                    <span>📍 {project.site_location || 'UK Site'}</span>
                    <span>⚙️ {project.automation_level?.replace('_', ' ').toUpperCase() || 'BESPOKE'}</span>
                    <span>💧 {project.water_strategy?.includes('yes') ? 'CLOSED-LOOP RECYCLING' : 'DISCHARGE'}</span>
                  </div>
                </div>

                {/* Right Value & Link */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <span className="font-ibm-plex-mono text-[8px] text-[#777] uppercase block">ESTIMATED VALUE</span>
                    <span className="font-barlow-condensed text-2xl font-bold text-white">{valueDisplay}</span>
                  </div>

                  <Link
                    href={`/admin/wash-plant/${project.id}`}
                    className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6900] text-white px-4 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest border border-[#333] hover:border-[#FF6900] transition-all"
                  >
                    <span>View Record</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
