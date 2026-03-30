import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alkota Technology | Hydro-Insulated Coil, 7-Year Warranty, Belt Drive Triplex',
  description: "The engineering behind Alkota's 7-year coil warranty. The hydro-insulated coil, Soft Damping System, belt-drive triplex pump and Wayne Combustion burner partnership explained.",
};

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-alkota-bg overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-40 px-6 border-b border-alkota-iron overflow-hidden bg-alkota-black">
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.02]">
          <span className="absolute top-0 right-0 font-barlow-condensed text-[45vw] font-black uppercase italic leading-none text-white">
            COIL
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE ALKOTA DIFFERENCE
            </span>
          </div>
          <h1 className="font-barlow-condensed text-7xl font-black uppercase italic leading-[0.82] tracking-tighter text-white md:text-[9rem] mb-12 max-w-5xl">
            THE COIL. THE PUMP.{' '}
            <span className="text-alkota-orange">THE WARRANTY NOBODY ELSE OFFERS.</span>
          </h1>
          <p className="font-inter text-xl text-alkota-silver uppercase tracking-wider leading-relaxed max-w-2xl">
            60 years of engineering distilled into three proprietary technologies. Here is why an Alkota machine outlasts everything else on a ten-year horizon.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: THE COIL ──────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE HYDRO-INSULATED COIL
            </span>
          </div>

          {/* Pull Quote */}
          <div className="bg-alkota-black border-l-8 border-alkota-orange p-12 mb-20">
            <blockquote className="font-barlow-condensed text-4xl font-black italic text-white uppercase leading-tight md:text-5xl max-w-4xl">
              "7-year warranty. Industry standard: 1 to 2 years.{' '}
              <span className="text-alkota-orange">This is not a marketing position. It is an engineering consequence.</span>"
            </blockquote>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron">
                {[
                  { label: 'Coil Material', value: 'Sch. 80 ASTM A53 Steel' },
                  { label: 'Warranty', value: '7 Years' },
                  { label: 'Industry Standard', value: '1–2 Years' },
                  { label: 'Outer Protection', value: 'Stainless Steel Wrapper' },
                  { label: 'Vibration', value: 'Soft Damping System' },
                  { label: 'Heat Management', value: 'Hydro-Insulated Wrap' },
                ].map((row) => (
                  <div key={row.label} className="bg-white flex">
                    <div className="w-1/2 border-r border-alkota-iron p-4 bg-alkota-bg">
                      <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-alkota-silver">{row.label}</span>
                    </div>
                    <div className="w-1/2 p-4">
                      <span className="font-barlow-condensed text-base font-black italic text-alkota-black uppercase">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="font-inter text-lg text-alkota-black leading-relaxed font-semibold">
                The heating coil is the heart of every hot water pressure washer. It is also the component that fails first in every machine that is not Alkota. Here is why.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                A standard hot water pressure washer coil sits exposed inside the combustion chamber. The outside of the coil faces the burner flame and combustion gases at temperatures that will eventually degrade the steel. The inside carries pressurised water at up to 4,000 PSI. The thermal cycling — heating to operating temperature, cooling, heating again — creates stress in the coil wall over time. Scale from hard water accelerates the process. The coil cracks. The machine is finished.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                Alkota's hydro-insulated coil changes this. A cold water wrap surrounds the outside of the Schedule 80 coil pipe. Incoming supply water flows through this outer wrap before entering the coil itself. This does two things simultaneously: it pre-heats the water entering the coil, improving efficiency; and it creates an insulating buffer between the coil and the combustion heat, reducing thermal stress dramatically.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                The coil itself is Schedule 80 high-test ASTM A53 steel — heavier walled than standard pressure washer pipe. The stainless steel wrapper protects the assembly from the outside environment. The Soft Damping System absorbs vibration from the engine and pump that would otherwise transmit into the coil and high-pressure components.
              </p>
              <p className="font-inter text-lg text-alkota-black leading-relaxed font-semibold">
                The result is a coil that we back with a 7-year warranty because we know it will still be running. When you find a machine still working after 15 or 20 years of daily industrial use, it is almost always an Alkota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE PUMP ──────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE BELT DRIVE TRIPLEX
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-barlow-condensed text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
                LOWER RPM.<br />
                <span className="text-alkota-orange">LONGER LIFE.</span>
              </h2>
              <p className="font-inter text-lg text-white leading-relaxed">
                The X4 Series — Alkota's most popular hot water range — uses a belt-driven triplex ceramic plunger pump running at a lower RPM than direct drive equivalents.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                This matters for three reasons. Lower RPM means less heat generated in the pump. Less heat means longer seal life, longer bearing life, longer pump life. The belt absorbs vibration between the motor and the pump — protecting both components from the shock loads that occur during trigger actuation and pressure cycling.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                The oil bath crankcase protects all moving parts from the wash environment. The ceramic plungers resist corrosion and wear from the pressurised water flow.
              </p>
              <p className="font-barlow-condensed text-2xl font-black italic text-alkota-orange uppercase tracking-tight">
                This is why Alkota users report machines still running at 10,000 hours. Direct drive machines at the same pressure ratings rarely last half that.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron">
                {[
                  { label: 'Drive Type', value: 'Belt Drive' },
                  { label: 'Pump Type', value: 'Triplex Plunger' },
                  { label: 'Plunger Material', value: 'Ceramic' },
                  { label: 'Crankcase', value: 'Oil Bath' },
                  { label: 'Reported Life', value: '10,000+ hours' },
                ].map((row) => (
                  <div key={row.label} className="bg-alkota-steel flex">
                    <div className="w-1/2 border-r border-alkota-iron p-4 bg-alkota-black">
                      <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-alkota-silver">{row.label}</span>
                    </div>
                    <div className="w-1/2 p-4">
                      <span className="font-barlow-condensed text-base font-black italic text-white uppercase">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE BURNER ────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // WAYNE COMBUSTION
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h2 className="font-barlow-condensed text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-alkota-black">
                THE BURNER BUILT<br />
                <span className="text-alkota-orange">BY TWO EXPERTS.</span>
              </h2>
              <p className="font-inter text-lg text-alkota-black leading-relaxed">
                The burner system in every Alkota oil-fired hot water machine is the result of a sustained engineering partnership with Wayne Combustion — America's leading combustion technology manufacturer.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                The Wayne-Alkota burner delivers automatic ignition, temperature control, and fuel efficiency that the competition cannot match. The fuel solenoid shuts off the burner the instant the trigger is released — no wasted fuel, no overheating of the coil during idle. The thermostat controls output temperature precisely.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                BTU ratings in the Alkota range run from 196,000 BTU (the 216X4) to 570,000 BTU (the 8405HNL). At the top end, that is the equivalent of running a medium-sized industrial heating system through a single, portable, 30-kilogram machine.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron self-start">
              {[
                { label: 'Partner', value: 'Wayne Combustion Systems' },
                { label: 'Ignition', value: 'Automatic' },
                { label: 'Fuel Control', value: 'Solenoid Shut-off' },
                { label: 'Min BTU', value: '196,000 BTU (216X4)' },
                { label: 'Max BTU', value: '570,000 BTU (8405HNL)' },
                { label: 'Temperature', value: 'Thermostat Controlled' },
              ].map((row) => (
                <div key={row.label} className="bg-white flex">
                  <div className="w-1/2 border-r border-alkota-iron p-4 bg-alkota-bg">
                    <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-alkota-silver">{row.label}</span>
                  </div>
                  <div className="w-1/2 p-4">
                    <span className="font-barlow-condensed text-base font-black italic text-alkota-black uppercase">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CETA ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-alkota-iron bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="bg-alkota-bg border border-alkota-iron p-12 flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="shrink-0">
              <p className="font-barlow-condensed text-5xl font-black italic text-alkota-orange uppercase leading-none">CETA</p>
              <p className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mt-1">Compliant</p>
            </div>
            <div className="h-px md:h-16 w-full md:w-px bg-alkota-iron shrink-0" />
            <p className="font-inter text-base text-alkota-silver leading-relaxed">
              All Alkota pressure washers are designed and tested to the standards of the Cleaning Equipment Trade Association (CETA) — the industry body governing commercial and industrial pressure washing equipment in North America. UK-supplied units are configured for CE and UKCA compliance where required.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-black border-t border-alkota-iron">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-barlow-condensed text-5xl font-black uppercase italic tracking-tighter text-white mb-3">
              SEE IT IN THE MACHINES.
            </h2>
            <p className="font-inter text-alkota-silver uppercase tracking-wider text-sm">
              Every hot water machine carries this technology as standard.
            </p>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-10 py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-alkota-black transition-all shrink-0"
          >
            View the Full Machine Range <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
