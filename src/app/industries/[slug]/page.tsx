import { client } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import MachineCard from '@/components/MachineCard';
import { ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

interface IndustryDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  
  // Fetch real industry data from Sanity
  const industry = await client.fetch(`*[_type == "industry" && slug.current == $slug][0]`, { slug });

  // Fetch machines related to this industry (for now, fetching first 6 machines as fallback)
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
      <main className="min-h-screen bg-alkota-black pt-32 text-center text-white">
        <h1 className="text-4xl uppercase font-barlow-condensed italic font-black">Industry not found</h1>
        <Link href="/" className="mt-8 inline-block text-alkota-orange underline uppercase tracking-widest text-xs">Back to Home</Link>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": industry.name,
    "description": industry.description,
    "provider": {
      "@type": "Organization",
      "name": "Alkota UK",
      "url": "https://alkota.co.uk"
    },
    "areaServed": "United Kingdom"
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      
      {/* Background Watermark */}
      <div className="absolute top-40 right-0 pointer-events-none select-none opacity-[0.02] z-0">
        <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
          {industry.name.split(' ')[0]}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <Breadcrumbs items={[
          { label: 'Industries', href: '/' },
          { label: industry.name }
        ]} />

        {/* Hero Section */}
        <section className="mb-24 mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              Industry Technical Specification
            </span>
            <h1 className="mb-8 text-6xl font-black text-white md:text-8xl lg:text-9xl italic uppercase tracking-tighter leading-[0.8] font-barlow-condensed">
              {industry.name} <br />
              <span className="text-alkota-orange">SOLUTIONS.</span>
            </h1>
            <p className="mb-12 text-lg text-alkota-silver leading-relaxed uppercase tracking-wider max-w-xl font-inter">
              {industry.description} Alkota provides the industrial-grade power required for the most demanding cleaning tasks in the {industry.name} sector.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-y border-alkota-iron py-10">
              <div className="flex gap-4">
                <ShieldCheck className="h-6 w-6 text-alkota-orange shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Safety Certified</h4>
                  <p className="text-[8px] text-alkota-silver uppercase tracking-[0.2em] font-ibm-plex-mono">Built to UL-1776 Standards</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-alkota-orange shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Elite Power</h4>
                  <p className="text-[8px] text-alkota-silver uppercase tracking-[0.2em] font-ibm-plex-mono">Up to 40,000 cleaning units</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video overflow-hidden border border-alkota-iron bg-alkota-steel/50 lg:aspect-square group">
            <img 
              src={industry.image || "https://images.unsplash.com/photo-1541888941259-7727ebe1476e?q=80&w=2070&auto=format&fit=crop"} 
              alt={industry.name}
              className="h-full w-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
               <div className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
               <span className="font-ibm-plex-mono text-[8px] font-bold text-white uppercase tracking-widest leading-none">Sector Context // Verified</span>
            </div>
          </div>
        </section>

        {/* Featured Machines for this Industry */}
        <section className="mt-40">
          <div className="mb-12 flex items-end justify-between border-b border-alkota-iron pb-12">
            <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl">
              SECTOR <span className="text-alkota-orange">FLEET.</span>
            </h2>
            <Link href="/machines" className="text-[10px] font-black uppercase tracking-widest text-alkota-silver hover:text-white transition-colors">
              Full Inventory →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine: any, i: number) => (
              <MachineCard key={machine._id} machine={machine} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
