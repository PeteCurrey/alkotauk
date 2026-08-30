import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChevronRight, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  getChemicalApplicationBySlug, 
  getRetailProducts,
  getChemicalApplications
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getChemicalApplicationBySlug(slug);
  if (!app) return { title: 'Chemical Application | Alkota UK' };

  return {
    title: `${app.name} Chemicals & Detergents | Alkota UK`,
    description: app.description || app.tagline,
  };
}

export default async function ChemicalApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getChemicalApplicationBySlug(slug);

  if (!app) {
    notFound();
  }

  // Get matching products for this application
  const products = await getRetailProducts({ applicationSlug: slug });
  const otherApps = (await getChemicalApplications()).filter(a => a.slug !== slug);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans pb-28">

      {/* ── EDITORIAL APPLICATION HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-5">
            <Link href="/chemicals" className="hover:text-alkota-orange transition-colors">
              Chemicals
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <Link href="/chemicals/applications" className="hover:text-white transition-colors">
              Applications
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-alkota-orange">{app.name}</span>
          </nav>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
            // Targeted Chemical System
          </span>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
            {app.name}
          </h1>
          <p className="text-lg text-alkota-orange font-light mb-3">
            {app.tagline}
          </p>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-normal leading-relaxed mb-8">
            {app.editorial_intro || app.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-ibm-plex-mono text-[#888]">
            <ShieldCheck className="w-4 h-4 text-alkota-orange" />
            <span>100% Genuine Alkota Formulations · GB-CLP Compliant</span>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS PRESENTATION ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-1">
              // Formulations for {app.name}
            </span>
            <h2 className="text-2xl font-light text-alkota-black tracking-tight">
              Recommended Cleaning &amp; Maintenance Chemistry ({products.length})
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E0DEDC]">
              {products.map((prod) => (
                <div key={prod.id} className="bg-[#FAF9F5]">
                  <ChemicalCard product={prod} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <p className="text-sm font-light text-[#666]">
                Formulations for this application are being catalogued.
              </p>
              <Link
                href="/chemicals/finder"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange"
              >
                Use Guided Chemical Finder →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── OTHER APPLICATION DISCOVERY ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white border-t border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#888] block">
            // Explore Other Industry Applications
          </span>
          <div className="flex flex-wrap gap-2.5">
            {otherApps.map((a) => (
              <Link
                key={a.slug}
                href={`/chemicals/applications/${a.slug}`}
                className="px-4 py-2 bg-[#FAF9F5] border border-[#E0DEDC] hover:border-alkota-orange text-xs font-light text-alkota-black transition-colors"
              >
                {a.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
