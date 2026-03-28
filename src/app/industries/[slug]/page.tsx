'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import MachineCard from '@/components/MachineCard';
import { getMockIndustries, getMockMachines } from '@/sanity/client';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const industries = getMockIndustries();
  const industry = industries.find(i => i.slug.current === slug);
  const machines = getMockMachines(); // In real app, filter by industry reference

  if (!industry) {
    return (
      <main className="min-h-screen bg-alkota-black pt-32 text-center text-white">
        <h1 className="text-4xl">Industry not found</h1>
        <Link href="/industries" className="mt-8 inline-block text-alkota-orange underline">Back to all industries</Link>
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
    <main className="min-h-screen bg-alkota-black pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-6">
        <Breadcrumbs items={[
          { label: 'Industries', href: '/industries' },
          { label: industry.name }
        ]} />

        {/* Hero Section */}
        <section className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-alkota-orange"
            >
              Industry Specialist
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-5xl font-bold text-white md:text-7xl lg:text-8xl italic uppercase tracking-tighter"
            >
              {industry.name} <br />
              <span className="text-alkota-orange">SOLUTIONS.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-xl text-alkota-silver leading-relaxed max-w-xl"
            >
              {industry.description} Alkota provides the industrial-grade power required for the most demanding cleaning tasks in this sector.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-8 border-y border-alkota-iron py-8">
              <div className="flex gap-4">
                <ShieldCheck className="h-6 w-6 text-alkota-gold shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Safety Certified</h4>
                  <p className="text-[10px] text-alkota-steel uppercase">Built to EN Standards</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-alkota-gold shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Elite Power</h4>
                  <p className="text-[10px] text-alkota-steel uppercase">Up to 4000+ PSI</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video overflow-hidden border border-alkota-iron bg-alkota-steel/50 lg:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1541888941259-7727ebe1476e?q=80&w=2070&auto=format&fit=crop" 
              alt={industry.name}
              className="h-full w-full object-cover opacity-60 grayscale" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-transparent to-transparent" />
          </div>
        </section>

        {/* Featured Machines for this Industry */}
        <section>
          <div className="mb-12 flex items-end justify-between border-b border-alkota-iron pb-8">
            <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter">
              FEATURED <span className="text-alkota-orange">FLEET.</span>
            </h2>
            <Link href="/machines" className="text-xs font-bold uppercase tracking-widest text-alkota-steel hover:text-white">
              View All Machines
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine, i) => (
              <MachineCard key={machine._id} machine={machine} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
