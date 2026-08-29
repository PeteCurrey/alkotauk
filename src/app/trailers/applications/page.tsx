import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, Truck, Tractor, Factory, Building2, MapPin, Wind } from 'lucide-react';
import { TRAILER_APPLICATIONS } from '@/lib/trailers/applications-data';

export const metadata = {
  title: 'Alkota Trailer Applications & Sector Solutions | Alkota UK',
  description: 'Explore purpose-built mobile industrial cleaning systems engineered for commercial fleets, agriculture, construction plant, contract cleaning, municipal works, and critical utilities.'
};

const SECTOR_ICONS: Record<string, any> = {
  fleet: Truck,
  agriculture: Tractor,
  construction: Factory,
  'contract-cleaning': Building2,
  municipal: MapPin,
  utilities: Wind
};

export default function TrailerApplicationsPage() {
  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="pt-36 pb-20 px-6 border-b border-alkota-iron bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Application Engineering
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight mb-6">
            PURPOSE-BUILT FOR<br />
            <span className="text-alkota-orange">YOUR SPECIFIC INDUSTRY.</span>
          </h1>

          <p className="text-alkota-silver text-lg max-w-3xl leading-relaxed font-light mb-8">
            Different sectors face radically different operational realities. Haulage yards need twin-gun hot water speed. Municipalities need low-volume stone-safe steam. Quarries need brutal 4,000 PSI impact. Explore our dedicated application guides to see the ideal mobile rig architecture for your sector.
          </p>

          <Link
            href="/trailers/configure"
            className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all"
          >
            <span>Launch Rig Configurator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Applications Grid (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRAILER_APPLICATIONS.map(app => {
              const Icon = SECTOR_ICONS[app.slug] || Truck;
              return (
                <div
                  key={app.slug}
                  className="border border-[#E0E0DC] bg-white hover:border-alkota-orange transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm"
                >
                  <div className="relative h-48 bg-[#090909] overflow-hidden">
                    <img
                      src={app.heroImage}
                      alt={app.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-black/80 px-2.5 py-1 border border-alkota-orange/40">
                        {app.industryCategory}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-alkota-orange">
                        <Icon className="h-4 w-4" />
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest">{app.recommendedFormat === 'open-deck' ? 'Open Deck System' : 'Enclosed Plant Room'}</span>
                      </div>
                      <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-3 group-hover:text-alkota-orange transition-colors">
                        {app.title}
                      </h2>
                      <p className="text-xs text-[#666] leading-relaxed font-light mb-6">
                        {app.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F0F0EC] flex items-center justify-between">
                      <Link
                        href={`/trailers/applications/${app.slug}`}
                        className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange flex items-center gap-1 font-bold"
                      >
                        Read Engineering Guide <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/trailers/configure${app.deepLinkQuery}`}
                        className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
                      >
                        Configure Rig →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Whole-life value CTA (Cinematic Dark) */}
      <section className="py-20 px-6 bg-[#0A0A0A] text-white border-t border-alkota-iron text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
            DON’T SEE YOUR EXACT APPLICATION?
          </h3>
          <p className="text-alkota-silver text-sm leading-relaxed mb-6 font-light">
            Every Alkota trailer is engineered to order in our UK fabrication facility. Contact our engineering team with your site drawings and operational brief.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-white hover:border-alkota-orange hover:text-alkota-orange transition-all"
          >
            Submit Custom Industrial Brief →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
