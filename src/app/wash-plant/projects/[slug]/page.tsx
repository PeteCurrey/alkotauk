import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ArrowRight, CheckCircle2, Factory, Droplets, Cpu, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Wash Plant Case Study | Alkota UK`,
    description: `Industrial wash plant installation case study by Alkota UK.`,
  };
}

export default async function WashPlantProjectPage({ params }: Props) {
  const { slug } = await params;

  // Check Supabase first
  let project: any = null;
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('*')
      .eq('case_study_slug', slug)
      .eq('published', true)
      .single();
    if (data) project = data;
  } catch (err) {
    // ignore
  }

  // Fallback editorial case studies if not in DB yet
  if (!project) {
    const editorialCases: Record<string, any> = {
      'multi-bay-fleet-depot-warrington': {
        title: '4-Bay Centralised Logistics Depot Installation',
        sector: 'Fleet & Logistics',
        client: 'Major UK Distribution Hub',
        location: 'North West, England',
        challenge: 'High-frequency distribution hub requiring 60+ articulated HGVs cleaned daily within a 4-hour evening dispatch window without wash bay frost downtime.',
        scope: 'Central plant room with dual triplex ceramic pump skids (N+1 redundancy), 360° stainless steel overhead boom arms, automatic underbody rinse, and frost-protected thermal enclosures.',
        architecture: 'Centralised Plant Room feeding 4 x Heavy-Duty Wash Bays with 360° Booms',
        waterSolution: 'Graded concrete bay drainage with continuous coalescing oil interception and sediment pit settlement.',
        automation: 'Semi-automated on-demand pressure delivery with remote operator bay fobs and automatic frost cycle protection.',
        throughput: '60 HGVs per 4-hour shift (< 4 mins/vehicle average)',
        serviceAgreement: 'Tier 02 Planned + Priority Reactive Maintenance with quarterly fluid and seal overhauls.',
        testimonial: 'The dual-pump N+1 plant room setup has completely eliminated vehicle wash downtime during our peak evening dispatch.'
      },
      'automated-rig-mat-washer-aberdeen': {
        title: 'Automated 360° Rig & Access Mat Wash Plant',
        sector: 'Groundworks & Energy',
        client: 'Access Matting & Shoring Contractor',
        location: 'Aberdeenshire, Scotland',
        challenge: 'Extreme mud, clay, and hydrocarbon contamination on heavy timber and composite access mats causing slow turnaround, excessive disposal costs, and high fresh water consumption.',
        scope: 'Continuous variable-speed mechanical conveyor carrying mats through 20 rotating spray manifolds with dual 1,000,000 BTU water heaters, high-solids screw conveyor, and 100% closed-loop media filtration.',
        architecture: 'Continuous Heavy-Duty Mechanical Conveyor Tunnel with 360° Synchronized Spray Arches',
        waterSolution: '100% Closed-loop water recycling featuring multi-stage media sand filtration and coalescing oil separation (< 5 PPM discharge target).',
        automation: 'Full PLC master control with variable-speed inverter conveyor drive and optical positioning interlocks.',
        throughput: '45 mats per hour continuous (stripping up to 300kg compacted soil per mat)',
        serviceAgreement: 'Managed Asset Support with site-consigned critical spares holding and monthly PPM visits.',
        testimonial: 'Closed-loop water recycling reduced our water tanker costs by over 80% while doubling daily mat turnaround volume.'
      },
      'heavy-plant-demucking-quarry-buxton': {
        title: 'Heavy Plant De-Mucking & Chassis Wash Station',
        sector: 'Mining & Quarrying',
        client: 'Aggregate & Mining Operator',
        location: 'Derbyshire, England',
        challenge: 'Compacted limestone slurry encrusting tracked excavators and 40-tonne dumpers, requiring 4 hours of manual lance work per vehicle before servicing.',
        scope: 'High-volume 80 GPM industrial wash monitors (water cannons) with remote joystick operator consoles, heavy drive-over steel rumble grids, and deep settlement pit interception.',
        architecture: 'Dual Remote Joystick Wash Monitors + High-Volume Sub-Chassis Flush Ramps',
        waterSolution: 'High-capacity settlement lagoons with automated mud-hopper evacuation and high-solids slurry recycling.',
        automation: 'Remote joystick operator stations and sonar vehicle entry detection.',
        throughput: '15 minutes per 40-tonne dump truck (down from 4 hours)',
        serviceAgreement: 'Quarterly Planned Preventative Maintenance and annual pump overhaul programme.',
        testimonial: 'The wash cannons have revolutionized our pre-inspection washdown, saving hours of operator fatigue in harsh weather.'
      }
    };

    project = editorialCases[slug] || null;
  }

  if (!project) {
    notFound();
  }

  const title = project.title || project.project_name;
  const sector = project.sector || project.case_study_sector || 'Industrial Wash Infrastructure';
  const challenge = project.challenge || project.case_study_challenge;
  const scope = project.scope || project.case_study_scope;
  const architecture = project.architecture || project.case_study_architecture;
  const waterSolution = project.waterSolution || project.case_study_water_solution;
  const automation = project.automation || project.case_study_automation;
  const throughput = project.throughput || project.case_study_throughput;
  const testimonial = project.testimonial || project.client_testimonial;

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-32 pb-0">
      <Navigation />

      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Case Studies', href: '/wash-plant/projects' },
          { label: title }
        ]} />

        {/* Back link */}
        <div className="mt-8 mb-6">
          <Link
            href="/wash-plant/projects"
            className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono text-alkota-silver hover:text-alkota-orange uppercase tracking-wider"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest">
              {sector}
            </span>
            {project.location && (
              <span className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-wider">
                📍 {project.location}
              </span>
            )}
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
            {title}
          </h1>

          {throughput && (
            <div className="p-4 bg-white border-l-4 border-alkota-orange mb-8 font-ibm-plex-mono text-xs text-alkota-black uppercase">
              <strong className="text-alkota-orange font-bold">OPERATIONAL THROUGHPUT: </strong>
              <span>{throughput}</span>
            </div>
          )}
        </header>

        {/* ── CASE STUDY DETAILS ──────────────────────────────────────────── */}
        <div className="space-y-8 mb-24">
          {/* Challenge & Scope */}
          <div className="bg-white border border-alkota-iron p-8 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                01 // OPERATIONAL CHALLENGE
              </span>
              <p className="text-sm text-alkota-silver leading-relaxed">
                {challenge}
              </p>
            </div>

            <div className="pt-6 border-t border-alkota-iron/60">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                02 // ENGINEERING SCOPE & SOLUTION
              </span>
              <p className="text-sm text-alkota-black leading-relaxed">
                {scope}
              </p>
            </div>
          </div>

          {/* Technical Architecture Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-ibm-plex-mono text-xs">
            {architecture && (
              <div className="bg-white border border-alkota-iron p-6 space-y-2">
                <span className="text-[9px] text-alkota-orange uppercase block">SYSTEM ARCHITECTURE</span>
                <p className="text-alkota-black leading-relaxed">{architecture}</p>
              </div>
            )}

            {waterSolution && (
              <div className="bg-white border border-alkota-iron p-6 space-y-2">
                <span className="text-[9px] text-alkota-orange uppercase block">WATER & EFFLUENT STRATEGY</span>
                <p className="text-alkota-black leading-relaxed">{waterSolution}</p>
              </div>
            )}

            {automation && (
              <div className="bg-white border border-alkota-iron p-6 space-y-2">
                <span className="text-[9px] text-alkota-orange uppercase block">AUTOMATION & CONTROLS</span>
                <p className="text-alkota-black leading-relaxed">{automation}</p>
              </div>
            )}

            {project.serviceAgreement && (
              <div className="bg-white border border-alkota-iron p-6 space-y-2">
                <span className="text-[9px] text-alkota-orange uppercase block">LIFECYCLE SERVICE AGREEMENT</span>
                <p className="text-alkota-black leading-relaxed">{project.serviceAgreement}</p>
              </div>
            )}
          </div>

          {/* Testimonial */}
          {testimonial && (
            <div className="bg-alkota-black text-white p-8 sm:p-10 border border-[#222]">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">
                CLIENT FEEDBACK
              </span>
              <blockquote className="text-base sm:text-lg font-extralight italic text-alkota-steel leading-relaxed mb-4">
                "{testimonial}"
              </blockquote>
              <span className="font-ibm-plex-mono text-xs text-[#888] uppercase tracking-wider block">
                — Operations Engineering Lead, {project.client || 'Client Site'}
              </span>
            </div>
          )}

          {/* Bottom Action Section */}
          <div className="bg-white border border-alkota-iron p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black">
                Have a similar wash requirement?
              </h3>
              <p className="text-xs text-alkota-silver leading-relaxed">
                Connect with our UK engineering team to scope your application.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/wash-plant/architect"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
              >
                <span>Launch Architect Tool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact?enquiry=case-study-consultation"
                className="inline-flex items-center gap-2 border border-alkota-iron bg-alkota-bg text-alkota-black px-6 py-3.5 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
              >
                <span>Request Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
