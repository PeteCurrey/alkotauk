import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import HubSpotForm from '@/components/HubSpotForm';
import { generateSeo } from '@/lib/seo';
import { 
  Droplets, 
  ShieldCheck, 
  Zap, 
  Phone,
  Settings,
  Trophy,
  ArrowRight,
  Thermometer,
  Gauge,
  Truck
} from "lucide-react";
import Breadcrumbs from '@/components/Breadcrumbs';
import { auth } from '@/auth';
import { calculateDealerPrice, formatCurrency } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

async function getMachine(slug: string) {
  return await client.fetch(`*[_type == "machine" && slug.current == $slug][0] {
    _id,
    name,
    tagline,
    description,
    heroImage,
    specs,
    ecommerce,
    category,
    "series": series->name,
    "isEliteSeries": series->isEliteSeries
  }`, { slug });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const machine = await getMachine(params.slug);
  if (!machine) return {};

  return generateSeo({
    title: `Alkota ${machine.name} | Industrial Specification`,
    description: machine.tagline || 'Industrial pressure washing equipment.',
    image: machine.heroImage ? urlFor(machine.heroImage).width(1200).height(630).url() : undefined,
  });
}

export default async function MachineDetailPage({ params }: { params: { category: string; slug: string } }) {
  const machine = await getMachine(params.slug);
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`).catch(() => null);
  const session = await auth();
  const user = session?.user as any;
  const isDealer = user?.role === 'dealer' || user?.role === 'admin';

  if (!machine) {
    notFound();
  }

  const dealerPrice = isDealer ? calculateDealerPrice(machine.ecommerce?.price || 5000, user.tier) : null;
  const hubspotPortalId = siteSettings?.hubspotGroup?.hubspotPortalId;
  const hubspotQuoteFormId = siteSettings?.hubspotGroup?.hubspotQuoteFormId;

  const imageUrl = machine.heroImage ? urlFor(machine.heroImage).url() : 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png';

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0 overflow-x-hidden relative">
      <Navigation />
      
      {/* Background Watermark */}
      <div className="absolute top-40 left-0 pointer-events-none select-none opacity-[0.05] z-0">
        <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
          {machine.name.split(' ')[0]}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <Breadcrumbs 
            items={[
              { label: 'Machines', href: '/machines' },
              { label: machine.category?.replace('-', ' ') || 'Industrial', href: `/machines/${machine.category}` },
              { label: machine.name }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visuals */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden border border-alkota-iron bg-white group">
                <img 
                  src={imageUrl} 
                  alt={machine.name}
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
                  <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.2em] text-alkota-black">Industrial specification // verified</span>
                </div>
            </div>

            {/* Feature Tags */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                  { label: 'COIL', value: `${machine.specs?.coilWarrantyYears || 7}YR WARRANTY`, icon: ShieldCheck },
                  { label: 'BUILD', value: 'FORGED STEEL', icon: Settings },
                  { label: 'ORIGIN', value: 'HANDCRAFTED USA', icon: Trophy },
                  { label: 'SPEC', value: 'UK CERTIFIED', icon: Zap },
              ].map((tag, i) => (
                <div key={i} className="border border-alkota-iron bg-white p-4 flex flex-col gap-2 shadow-sm">
                  <tag.icon className="h-4 w-4 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[8px] text-alkota-silver uppercase tracking-widest">{tag.label}</span>
                  <span className="font-barlow-condensed text-sm font-black text-alkota-black uppercase italic">{tag.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Specs & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                {machine.series || machine.category?.replace('-', ' ')}
              </span>
              {machine.isEliteSeries && (
                <div className="h-1 w-12 bg-alkota-iron" />
              )}
            </div>
            
            <h1 className="font-barlow-condensed mb-8 text-7xl font-black text-alkota-black md:text-8xl lg:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              {machine.name}
            </h1>
            
            <p className="font-inter mb-12 text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
              {machine.tagline}
            </p>

            {/* Price / Status */}
            <div className="mb-12 border-y border-alkota-iron py-8">
              {isDealer && machine.ecommerce?.price ? (
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-3">
                    <Trophy className="h-3 w-3" />
                    Exclusive {user.tier} Dealer Assets
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-barlow-condensed text-6xl font-black text-alkota-black italic">
                      {formatCurrency(dealerPrice || 0)}
                    </span>
                    <span className="font-ibm-plex-mono text-sm text-alkota-silver line-through">
                      RRP {formatCurrency(machine.ecommerce.price)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                   <div>
                     <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-widest mb-2">Build Availability</p>
                     <p className="font-barlow-condensed text-4xl font-black text-alkota-black uppercase italic">Current Build Status</p>
                   </div>
                   <div className="text-right">
                     <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-widest mb-2">Price Estimate</p>
                     <p className="font-barlow-condensed text-4xl font-black text-alkota-orange uppercase italic">Price on request</p>
                   </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <a 
                href="#quote"
                className="flex items-center justify-center gap-4 bg-alkota-orange p-6 text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-alkota-orange-hover transition-all group"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Deep Tech Specs Section */}
        <section className="mt-60">
          <div className="mb-24 flex items-center gap-8">
            <h2 className="font-barlow-condensed text-6xl font-black text-alkota-black uppercase italic tracking-tighter md:text-8xl">
              SPECIFICATIONS <span className="text-alkota-orange">.</span>
            </h2>
            <div className="flex-1 h-[2px] bg-alkota-iron/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              { label: 'WATER FLOW', value: `${machine.specs?.flowRateLPM || '15'} LPM`, unit: 'Liters Per Minute', icon: Droplets },
              { label: 'PRESSURE', value: `${machine.specs?.pressureBar || '200'} BAR`, unit: 'Operational Pressure', icon: Gauge },
              { label: 'TEMPERATURE', value: machine.category === 'hot-water' ? '98°C / 200°F' : 'Ambient', unit: 'Cleaning Temp', icon: Thermometer },
              { label: 'POWER', value: machine.specs?.powerSource || 'Industrial', unit: 'Primary Power', icon: Zap }
            ].map((spec, i) => (
              <div key={i} className="bg-white p-12 transition-all hover:bg-alkota-steel/40 group">
                <spec.icon className="h-8 w-8 text-alkota-orange mb-8 transition-transform group-hover:scale-110" />
                <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-silver uppercase tracking-[0.3em] block mb-4">{spec.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-barlow-condensed text-5xl font-black text-alkota-black italic">{spec.value}</span>
                </div>
                <p className="font-ibm-plex-mono text-[8px] text-alkota-silver uppercase tracking-widest mt-4">{spec.unit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Architecture */}
        <section id="quote" className="mt-60 py-40 border-t border-alkota-iron relative">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-alkota-orange/5 skew-x-12 transform translate-x-1/2" />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-alkota-orange" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">Acquisition Channel</span>
                </div>
                <h2 className="font-barlow-condensed text-7xl font-black text-alkota-black uppercase italic tracking-tighter leading-[0.8] mb-12">
                   REQUEST A <br />
                   <span className="text-alkota-orange [text-stroke:1.5px_rgba(0,0,0,0.1)]">QUOTE.</span>
                </h2>
                <div className="space-y-8 max-w-md">
                   <div className="flex gap-6 group">
                      <div className="h-12 w-12 shrink-0 border border-alkota-iron flex items-center justify-center text-alkota-orange group-hover:bg-alkota-orange group-hover:text-white transition-colors">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-barlow-condensed text-xl font-black text-alkota-black uppercase italic mb-1">Standard Delivery</h4>
                        <p className="font-inter text-xs text-alkota-silver uppercase tracking-wider">Fast-track delivery across the UK & Ireland from central stock.</p>
                      </div>
                   </div>
                   <div className="flex gap-6 group">
                      <div className="h-12 w-12 shrink-0 border border-alkota-iron flex items-center justify-center text-alkota-orange group-hover:bg-alkota-orange group-hover:text-white transition-colors">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-barlow-condensed text-xl font-black text-alkota-black uppercase italic mb-1">Technical Consultation</h4>
                        <p className="font-inter text-xs text-alkota-silver uppercase tracking-wider">Speak with an application engineer to verify your precise flow requirements.</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-white border border-alkota-iron p-1 px-1 shadow-2xl">
                <div className="bg-alkota-bg/40 p-12">
                   {hubspotPortalId && hubspotQuoteFormId ? (
                    <HubSpotForm 
                      portalId={hubspotPortalId} 
                      formId={hubspotQuoteFormId} 
                    />
                  ) : (
                    <div className="py-12 text-center">
                       <p className="text-alkota-silver uppercase tracking-widest text-[10px] mb-4">Live Quote System Pending</p>
                       <button className="bg-alkota-black text-white px-8 py-4 uppercase tracking-widest font-black text-[10px]">Call for Specifications</button>
                    </div>
                  )}
                </div>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
