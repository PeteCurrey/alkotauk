import { client } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import MachineCard from '@/components/MachineCard';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SeenInRealWorld from '@/components/mess-quest/SeenInRealWorld';

interface IndustryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  
  const industry = await client.fetch(`*[_type == "industry" && slug.current == $slug][0]`, { slug });

  const machines = await client.fetch(`*[_type == "machine"][0...6] {
    _id,
    name,
    modelCode,
    "slug": slug.current,
    tagline,
    category,
    "series": series->name,
    "isEliteSeries": series->isEliteSeries,
    heroImage,
    specs
  }`);

  if (!industry) {
    return (
      <main className="min-h-screen bg-white pt-32 text-center text-[#1A1A18]">
        <h1 className="text-4xl uppercase font-light">Industry not found</h1>
        <Link href="/industries" className="mt-8 inline-block text-[#FF6900] underline uppercase tracking-widest text-xs">Back to Industries</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ─── 01. FULL-VIEWPORT HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex flex-col justify-between bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 pt-28 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-10" />
          <div 
            className="w-full h-full bg-cover bg-center opacity-35"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[
            { label: 'Industries', href: '/industries' },
            { label: industry.name }
          ]} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#FF6900] mb-4 font-medium">
              Industry Focus · UK Specification
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight uppercase tracking-tight text-white leading-[1.0] mb-6">
              {industry.name}
            </h1>
            <p className="text-base sm:text-xl text-[#CCC] leading-relaxed font-light max-w-2xl mb-8">
              {industry.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#machinery"
                className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-8 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline shadow-lg"
              >
                <span>View Recommended Machinery</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline backdrop-blur-sm"
              >
                <span>Consult an Engineer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. RECOMMENDED SYSTEMS (LIGHT) ───────────────────────────────── */}
      <section id="machinery" className="py-24 bg-[#FAFAF8] border-b border-[#E5E5E0] px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              RECOMMENDED PLATFORMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[#1A1A18] leading-tight">
              Machinery for {industry.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mt-3">
              Standard and bespoke cleaning systems engineered to satisfy the duty cycle and contamination requirements of this sector.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines?.map((machine: any) => (
              <MachineCard key={machine._id} machine={machine} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02B. SEEN IN THE REAL WORLD // MESS QUEST ─────────────────────── */}
      <SeenInRealWorld category={slug} />

      {/* ─── 03. ON-SITE TRIAL CTA (DARK) ──────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-20 px-6 sm:px-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              ON-SITE DEMONSTRATION
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
              Test on Your Facility
            </h2>
            <p className="text-sm text-[#AAA] max-w-xl font-light">
              We bring Alkota machinery directly to your depot or facility to test performance on your exact contamination.
            </p>
          </div>

          <Link
            href="/contact?enquiry=industry-demo"
            className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-8 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline shadow-lg shrink-0"
          >
            <span>Request Demonstration</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
