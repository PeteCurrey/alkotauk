import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldAlert, MapPin, Search, Phone, ArrowRight, Wrench, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Service, Repairs & PPM Maintenance | Alkota UK',
  description: 'Book a service or request emergency breakdown support for your Alkota pressure washer via our nationwide authorised dealer network.',
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-0 text-white flex flex-col justify-between">
      <Navigation />
      <div className="container mx-auto max-w-5xl px-6 flex-1 pb-24">
        <Breadcrumbs
          items={[
            { label: 'Support', href: '/support' },
            { label: 'Service & Maintenance' },
          ]}
        />

        <div className="mt-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
              NATIONWIDE FIELD SERVICE & BREAKDOWN
            </span>
          </div>
          <h1 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.88] mb-4">
            SERVICE & <span className="text-alkota-orange">MAINTENANCE.</span>
          </h1>
          <p className="font-inter text-base sm:text-lg text-alkota-silver max-w-3xl leading-relaxed">
            Every Alkota machine is backed by our network of factory-trained service engineers and mobile vans equipped with genuine Schedule 80 coils, pumps, and burner parts.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 mb-16">
          {/* Emergency Breakdown Card */}
          <div className="border border-alkota-orange bg-alkota-orange/10 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 bg-alkota-orange text-white flex items-center justify-center mb-6">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <span className="font-ibm-plex-mono text-[9px] text-alkota-orange font-bold uppercase tracking-widest block mb-1">
                CRITICAL DOWNTIME
              </span>
              <h3 className="font-barlow-condensed text-3xl font-black italic uppercase text-white mb-3">
                Emergency Breakdown
              </h3>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed mb-8">
                Rapid response dispatch for unexpected plant or machine failures affecting operational cleaning lines.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+447912506738"
                className="w-full bg-alkota-orange py-4 px-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 font-ibm-plex-mono no-underline"
              >
                <Phone className="h-4 w-4" />
                <span>Call Hotline: 07912 506738</span>
              </a>
              <Link
                href="/contact?enquiry=breakdown"
                className="w-full border border-white/20 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-white hover:border-alkota-orange hover:text-alkota-orange transition-colors flex items-center justify-center font-ibm-plex-mono no-underline"
              >
                <span>Log Breakdown Online</span>
              </Link>
            </div>
          </div>

          {/* Scheduled Maintenance Card */}
          <div className="border border-alkota-iron bg-alkota-steel/30 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 bg-white text-black flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="font-ibm-plex-mono text-[9px] text-alkota-silver font-bold uppercase tracking-widest block mb-1">
                REGIONAL CENTRES
              </span>
              <h3 className="font-barlow-condensed text-3xl font-black italic uppercase text-white mb-3">
                Local Service Agent
              </h3>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed mb-8">
                Locate your authorised local Alkota dealer for planned preventative maintenance (PPM), coil descaling, and routine pump rebuilds.
              </p>
            </div>
            <Link
              href="/dealers"
              className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 px-6 text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange hover:text-white transition-colors font-ibm-plex-mono no-underline"
            >
              <Search className="h-4 w-4" />
              <span>Dealer Locator & Map</span>
            </Link>
          </div>
        </div>

        {/* 3 Support Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-ibm-plex-mono text-xs border-t border-alkota-iron pt-12">
          <div className="p-4 bg-[#141414] border border-[#222]">
            <CheckCircle2 className="h-5 w-5 text-alkota-orange mb-2" />
            <p className="font-bold text-white uppercase mb-1">Non-Proprietary Spares</p>
            <p className="text-alkota-silver text-[11px] font-inter">
              Standard General, Cat, Wayne and AR components for simple, cost-effective maintenance.
            </p>
          </div>
          <div className="p-4 bg-[#141414] border border-[#222]">
            <CheckCircle2 className="h-5 w-5 text-alkota-orange mb-2" />
            <p className="font-bold text-white uppercase mb-1">Schedule 80 Re-Coil</p>
            <p className="text-alkota-silver text-[11px] font-inter">
              Replacement hydro-insulated coils stocked in our central UK warehouse for rapid swap-out.
            </p>
          </div>
          <div className="p-4 bg-[#141414] border border-[#222]">
            <CheckCircle2 className="h-5 w-5 text-alkota-orange mb-2" />
            <p className="font-bold text-white uppercase mb-1">PPM Service Contracts</p>
            <p className="text-alkota-silver text-[11px] font-inter">
              Quarterly and annual inspection contracts to satisfy factory warranty requirements.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
