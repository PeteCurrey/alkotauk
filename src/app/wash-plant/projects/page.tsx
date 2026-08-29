import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ArrowRight, Factory, Building2, Droplets, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Projects & Case Studies | Alkota UK',
  description: 'Explore Alkota UK industrial wash plant installations across fleet depots, access matting, heavy mining de-mucking, and manufacturing facilities.',
};

export const dynamic = 'force-dynamic';

export default async function WashPlantProjectsPage() {
  let dbProjects: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('*')
      .eq('published', true)
      .in('visibility', ['public', 'anonymised'])
      .order('created_at', { ascending: false });
    if (data) dbProjects = data;
  } catch (err) {
    console.warn('Projects fetch warning:', err);
  }

  // Baseline verified editorial case studies
  const editorialProjects = [
    {
      slug: 'multi-bay-fleet-depot-warrington',
      title: '4-Bay Centralised Logistics Depot Installation',
      sector: 'Fleet & Logistics',
      challenge: 'High-frequency distribution hub requiring 60+ articulated HGVs cleaned daily within a 4-hour evening dispatch window without wash bay frost downtime.',
      scope: 'Central plant room with dual triplex ceramic pump skids (N+1 redundancy), 360° stainless steel overhead boom arms, automatic underbody rinse, and frost-protected thermal enclosures.',
      throughput: '60 HGVs per shift (under 4 mins/vehicle)',
      waterStrategy: 'Graded bay drainage with continuous coalescing oil interception.',
      automation: 'Semi-automated on-demand pressure delivery with remote bay fobs.',
      image: '/assets/industries/fleet.png'
    },
    {
      slug: 'automated-rig-mat-washer-aberdeen',
      title: 'Automated 360° Rig & Access Mat Wash Plant',
      sector: 'Groundworks & Energy',
      challenge: 'Extreme mud, clay, and hydrocarbon contamination on heavy timber and composite access mats causing slow turnaround and high fresh water consumption.',
      scope: 'Continuous variable-speed mechanical conveyor carrying mats through 20 rotating spray manifolds with dual 1,000,000 BTU water heaters, high-solids screw conveyor, and 100% closed-loop media filtration.',
      throughput: '45 mats per hour continuous',
      waterStrategy: '100% Closed-loop water recycling stripping hydrocarbons < 5 PPM.',
      automation: 'Fully automated conveyor drive with optical positioning interlocks.',
      image: '/assets/products/trailer-single.png'
    },
    {
      slug: 'heavy-plant-demucking-quarry-buxton',
      title: 'Heavy Plant De-Mucking & Chassis Wash Station',
      sector: 'Mining & Quarrying',
      challenge: 'Compacted limestone slurry encrusting tracked excavators and 40-tonne dumpers, requiring 4 hours of manual lance work per vehicle before servicing.',
      scope: 'High-volume 80 GPM industrial wash monitors (water cannons) with remote joystick operator consoles, heavy drive-over steel rumble grids, and deep settlement pit interception.',
      throughput: '15 minutes per 40-tonne dump truck (down from 4 hours)',
      waterStrategy: 'High-capacity settlement lagoons with automated mud-hopper evacuation.',
      automation: 'Remote joystick operator stations and sonar vehicle entry detection.',
      image: '/assets/industries/construction.png'
    }
  ];

  const projectsToDisplay = dbProjects.length > 0 ? dbProjects : editorialProjects;

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-32 pb-0">
      <Navigation />

      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Project Case Studies' }
        ]} />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // VERIFIED INDUSTRIAL INSTALLATIONS
            </span>
          </div>

          <h1 className="font-extralight text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9] mb-6">
            Wash plant <br />
            <span className="text-alkota-orange">case studies.</span>
          </h1>

          <p className="text-base sm:text-lg text-alkota-silver leading-relaxed max-w-2xl">
            Each installation represents a specific operational throughput challenge, engineering approach, and lifecycle solution. Explore selected UK case studies below.
          </p>

          <div className="mt-8">
            <Link
              href="/wash-plant/architect"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
            >
              <span>Scope Your Project Brief</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* ── PROJECTS GRID ───────────────────────────────────────────────── */}
        <section className="mb-24 space-y-8">
          {projectsToDisplay.map((project: any, idx: number) => {
            const slug = project.slug || project.case_study_slug || `project-${project.id || idx}`;
            const title = project.title || project.project_name || 'Industrial Wash Installation';
            const sector = project.sector || project.case_study_sector || 'Heavy Industry';
            const challenge = project.challenge || project.case_study_challenge || project.scope_summary || '';
            const scope = project.scope || project.case_study_scope || '';
            const throughput = project.throughput || project.case_study_throughput || '';

            return (
              <div
                key={slug}
                className="bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm hover:border-alkota-orange transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest">
                        {sector}
                      </span>
                      {throughput && (
                        <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider">
                          // Throughput: {throughput}
                        </span>
                      )}
                    </div>

                    <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black">
                      {title}
                    </h2>

                    {challenge && (
                      <div>
                        <strong className="font-ibm-plex-mono text-[10px] uppercase text-alkota-silver block mb-1">
                          Operational Challenge:
                        </strong>
                        <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
                          {challenge}
                        </p>
                      </div>
                    )}

                    {scope && (
                      <div>
                        <strong className="font-ibm-plex-mono text-[10px] uppercase text-alkota-silver block mb-1">
                          Engineering Solution:
                        </strong>
                        <p className="text-xs sm:text-sm text-alkota-black leading-relaxed">
                          {scope}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 bg-alkota-bg p-6 border border-alkota-iron/60 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-2 text-xs font-ibm-plex-mono">
                      <span className="text-[9px] text-alkota-orange uppercase block">PROJECT ATTRIBUTES</span>
                      <p className="text-alkota-black">✓ Turnkey Mechanical & Electrical</p>
                      <p className="text-alkota-black">✓ Trade Effluent Compliant</p>
                      <p className="text-alkota-black">✓ Multi-Year Scheduled PPM</p>
                    </div>

                    <Link
                      href={`/wash-plant/projects/${slug}`}
                      className="inline-flex items-center justify-between w-full bg-alkota-black text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <Footer />
    </main>
  );
}
