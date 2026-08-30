import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project: any = null;
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('project_name, case_study_sector, case_study_challenge')
      .eq('case_study_slug', slug)
      .single();
    if (data) project = data;
  } catch {
    // fallback
  }

  const title = project?.project_name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  const sector = project?.case_study_sector ? ` — ${project.case_study_sector}` : '';
  const desc = project?.case_study_challenge || `Turnkey industrial wash plant engineering and installation case study by Alkota UK.`;

  return {
    title: `${title}${sector} | Wash Plant Case Study | Alkota UK`,
    description: desc,
    openGraph: {
      title: `${title} | Alkota UK Wash Plant Case Study`,
      description: desc,
      url: `https://alkota.co.uk/wash-plant/projects/${slug}`,
    },
  };
}

export default async function WashPlantProjectPage({ params }: Props) {
  const { slug } = await params;

  let project: any = null;
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_projects')
      .select('*')
      .eq('case_study_slug', slug)
      .eq('published', true)
      .in('visibility', ['public', 'anonymised'])
      .single();
    if (data) project = data;
  } catch {
    // ignore
  }

  if (!project) {
    notFound();
  }

  const title = project.project_name || 'Industrial Wash Installation';
  const sector = project.case_study_sector || 'Industrial Wash Infrastructure';
  const challenge = project.case_study_challenge;
  const scope = project.case_study_scope;
  const architecture = project.case_study_architecture;
  const waterSolution = project.case_study_water_solution;
  const automation = project.case_study_automation;
  const throughput = project.case_study_throughput;
  const testimonial = project.client_testimonial_approved ? project.client_testimonial : null;

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-0 px-6 sm:px-12">
      <WashPlantSchema
        pageTitle={`${title} | Wash Plant Case Study | Alkota UK`}
        pageDescription={scope ? scope.substring(0, 160) : 'Industrial wash plant project case study.'}
        pageUrl={`https://alkota.co.uk/wash-plant/projects/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://alkota.co.uk' },
          { name: 'Wash Plant Infrastructure', url: 'https://alkota.co.uk/wash-plant' },
          { name: 'Case Studies', url: 'https://alkota.co.uk/wash-plant/projects' },
          { name: title, url: `https://alkota.co.uk/wash-plant/projects/${slug}` }
        ]}
      />
      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-5xl pt-10">
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
            {project.site_location && (
              <span className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-wider">
                📍 {project.site_location}
              </span>
            )}
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
            {title}
          </h1>

          {throughput && (
            <div className="inline-block bg-white border border-alkota-iron px-4 py-2 text-xs font-ibm-plex-mono text-alkota-orange mb-6">
              OPERATIONAL THROUGHPUT: {throughput}
            </div>
          )}
        </header>

        {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-8 mb-16">
          {/* Challenge & Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenge && (
              <div className="bg-white border border-alkota-iron p-8">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                  OPERATIONAL CHALLENGE
                </span>
                <p className="text-sm text-alkota-silver leading-relaxed">
                  {challenge}
                </p>
              </div>
            )}

            {scope && (
              <div className="bg-white border border-alkota-iron p-8">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3">
                  ENGINEERING SCOPE
                </span>
                <p className="text-sm text-alkota-black leading-relaxed">
                  {scope}
                </p>
              </div>
            )}
          </div>

          {/* Technical Architecture Matrix */}
          <div className="bg-white border border-alkota-iron p-8 sm:p-10 space-y-6">
            <h2 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black pb-4 border-b border-alkota-iron">
              System Specification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-ibm-plex-mono text-xs">
              {architecture && (
                <div className="space-y-2">
                  <span className="text-[9px] text-alkota-orange uppercase block">01 // ARCHITECTURE</span>
                  <p className="text-alkota-black font-medium">{architecture}</p>
                </div>
              )}

              {waterSolution && (
                <div className="space-y-2">
                  <span className="text-[9px] text-alkota-orange uppercase block">02 // WATER STRATEGY</span>
                  <p className="text-alkota-black font-medium">{waterSolution}</p>
                </div>
              )}

              {automation && (
                <div className="space-y-2">
                  <span className="text-[9px] text-alkota-orange uppercase block">03 // AUTOMATION & CONTROLS</span>
                  <p className="text-alkota-black font-medium">{automation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Testimonial if approved */}
          {testimonial && (
            <div className="bg-[#121212] text-white p-8 sm:p-10 border border-[#222]">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">
                CLIENT STATEMENT
              </span>
              <blockquote className="font-extralight text-xl sm:text-2xl leading-relaxed text-white">
                &ldquo;{testimonial}&rdquo;
              </blockquote>
              <span className="block font-ibm-plex-mono text-xs text-[#888] mt-4 uppercase tracking-wider">
                — {project.client_company || 'Verified Client Organisation'}
              </span>
            </div>
          )}
        </div>

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
        <section className="mb-24 bg-alkota-orange text-white p-8 sm:p-12">
          <div className="max-w-2xl space-y-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/80 block">
              START YOUR INSTALLATION
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              Planning a similar wash plant project?
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Use our pre-engineering scoping tool to structure your asset parameters, throughput demands, and site constraints before a site survey.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/wash-plant/architect"
                className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-colors"
              >
                <span>Launch Wash Plant Architect</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?enquiry=wash-plant-project"
                className="inline-flex items-center gap-2 border border-white text-white px-6 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-alkota-black transition-colors"
              >
                <span>Speak to Engineering</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
