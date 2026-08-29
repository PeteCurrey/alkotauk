import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Wrench, ShieldCheck, Clock, CheckCircle2, Flame, Droplets, Zap, Shield, HelpCircle, Phone } from 'lucide-react';
import { TRAILER_SERVICE_SCHEDULE, TRAILER_SERVICE_PLANS } from '@/lib/trailers/service-data';

export const metadata = {
  title: 'Trailer Service, PPM & Lifecycle Maintenance | Alkota UK',
  description: 'Planned preventative maintenance (PPM), annual IVA inspections, burner descaling, ceramic pump overhauls, and winterisation for Alkota mobile cleaning systems.'
};

export default function TrailerServicePage() {
  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="pt-36 pb-20 px-6 border-b border-alkota-iron bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Whole-Life Support
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight mb-6">
            THE BUILD IS<br />
            <span className="text-alkota-orange">DAY ONE.</span>
          </h1>

          <p className="text-alkota-silver text-lg max-w-3xl leading-relaxed font-light mb-8">
            An industrial mobile cleaning rig is a frontline revenue-generating asset. Alkota UK provides comprehensive lifecycle support — from scheduled on-site Planned Preventative Maintenance (PPM) and down-draft burner descaling to annual IVA trailer inspections and rapid UK genuine parts dispatch.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all"
            >
              <span>Book Trailer Service</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support/warranty"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              7-Year Coil Warranty
            </Link>
          </div>
        </div>
      </section>

      {/* Core Maintenance Disciplines (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              01 // Technical Disciplines
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight">
              SPECIALIST MOBILE RIG MAINTENANCE DISCIPLINES.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Flame,
                title: 'Burner & Coil Descaling',
                desc: 'Combustion efficiency analysis, electrode calibration, optical flame sensor replacement, and Schedule 80 hydro-coil chemical descaling.'
              },
              {
                icon: Droplets,
                title: 'High-Pressure Pump Overhauls',
                desc: 'Ceramic plunger inspection, high-pressure packing seal replacement, stainless check valve refurbishing, and unloader valve calibration.'
              },
              {
                icon: ShieldCheck,
                title: 'Trailer Running Gear & IVA',
                desc: 'Overrun hitch damper testing, brake shoe adjustments, wheel bearing repacking, lighting harness audits, and suspension health checks.'
              },
              {
                icon: Wrench,
                title: 'Winterisation & Frost Purge',
                desc: 'High-pressure glycol fluid purge, tank drainage, float valve descaling, and enclosure heating element testing before sub-zero winter temperatures.'
              }
            ].map(col => {
              const Icon = col.icon;
              return (
                <div key={col.title} className="bg-white border border-[#E0E0DC] p-6 shadow-sm hover:border-alkota-orange transition-colors">
                  <Icon className="h-7 w-7 text-alkota-orange mb-4" />
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">{col.title}</h3>
                  <p className="text-xs text-[#666] leading-relaxed font-light">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Schedule Table (Warm Neutral) */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              02 // Operating Protocols
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight">
              RECOMMENDED TRAILER SERVICE SCHEDULE.
            </h2>
          </div>

          <div className="space-y-4">
            {TRAILER_SERVICE_SCHEDULE.map(item => (
              <div key={item.title} className="border border-[#D5D5D0] bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-[#F0F0EC] pb-4">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase font-bold tracking-widest block">
                      {item.interval}
                    </span>
                    <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase px-2.5 py-1 border border-[#DDD] text-[#666] self-start md:self-auto font-medium">
                    {item.importance}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-[#555]">
                  {item.scope.map((task, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-alkota-orange font-bold">›</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Plans (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              03 // Commercial Care Packages
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-4">
              ALKOTA TRAILER PPM CONTRACTS.
            </h2>
            <p className="text-[#666] text-sm md:text-base font-light">
              Fixed-price annual service agreements delivering predictable maintenance costs, priority emergency response, and verified uptime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TRAILER_SERVICE_PLANS.map(plan => (
              <div key={plan.id} className="border border-[#E0E0DC] bg-white p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-bold block mb-1">
                    {plan.intervalSummary}
                  </span>
                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed font-light mb-6">
                    {plan.tagline}
                  </p>

                  <div className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5 text-xs text-[#444] font-light">
                        <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F0F0EC]">
                  <Link
                    href="/contact"
                    className="w-full bg-alkota-orange py-3 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all flex items-center justify-center gap-2"
                  >
                    Enquire for Service Contract <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Cinematic Dark) */}
      <section className="py-20 px-6 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Phone className="h-8 w-8 text-alkota-orange mx-auto mb-4" />
          <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
            NEED IMMEDIATE TRAILER TECHNICAL SUPPORT?
          </h3>
          <p className="text-alkota-silver text-sm leading-relaxed mb-6 font-light">
            Our UK engineering workshop carries over £250,000 in genuine Alkota replacement parts, ceramic plungers, burner coils, and high-pressure hose reels for next-day dispatch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-white hover:border-alkota-orange hover:text-alkota-orange transition-all"
          >
            Contact Technical Support Team →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
