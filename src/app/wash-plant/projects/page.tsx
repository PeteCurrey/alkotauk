import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ArrowRight, ChevronRight } from 'lucide-react';
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

  // Only show database projects that are genuinely published and authorised.
  // If no verified projects exist yet, projectsToDisplay will be empty and the placeholder renders.
  const projectsToDisplay = dbProjects;

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0 px-6 sm:px-12">
      <WashPlantSchema
        pageTitle="Wash Plant Projects & Case Studies | Alkota UK"
        pageDescription="Explore Alkota UK industrial wash plant installations across fleet depots, access matting, heavy mining de-mucking, and manufacturing facilities."
        pageUrl="https://alkota.co.uk/wash-plant/projects"
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-7xl pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Project Case Studies' }
        ]} />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="my-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // PROJECT CASE STUDIES
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
        <section className="mb-24">
          {projectsToDisplay.length > 0 ? (
            <div className="space-y-8">
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
                          <p className="text-alkota-black">✓ Turnkey Mechanical &amp; Electrical</p>
                          <p className="text-alkota-black">✓ Effluent Managed to Consent</p>
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
            </div>
          ) : (
            /* No authorised case studies yet — dignified placeholder */
            <div className="bg-white border border-alkota-iron p-10 sm:p-16 shadow-sm">
              <div className="max-w-3xl space-y-6">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                  CASE STUDIES IN PREPARATION
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
                  Our project archive is compiled with client authorisation.
                </h2>
                <p className="text-sm text-alkota-silver leading-relaxed max-w-2xl">
                  Each wash plant installation we commission involves confidential operational and commercial data. We do not publish case studies without the express approval of the client organisation involved.
                </p>
                <p className="text-sm text-alkota-silver leading-relaxed max-w-2xl">
                  If you are appraising Alkota for a capital project, our engineering team can provide relevant installation references and technical background on a confidential basis.
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact?enquiry=wash-plant-project-references"
                    className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
                  >
                    <span>Request Project References</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/wash-plant/architect"
                    className="inline-flex items-center gap-3 border border-alkota-iron bg-white text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-alkota-orange transition-colors"
                  >
                    <span>Scope Your Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
