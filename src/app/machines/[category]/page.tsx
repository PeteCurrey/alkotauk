'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMockMachines } from '@/sanity/client';
import MachineCard from '@/components/MachineCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function MachineCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const machines = getMockMachines().filter(m => m.category === categorySlug);
  const categoryName = categorySlug.replace('-', ' ');

  // Series Descriptions from requested brief
  const seriesInfo: Record<string, { label: string; desc: string }> = {
    "AX4 Series — Compact Electric": {
      label: "AX4 Series — Compact Electric",
      desc: "The most space-efficient electric hot water machine Alkota makes. Belt-driven triplex pump. 115V or 230V. Designed for schools, wash bays, workshops and warehouses where space is tight and mains power is the only option. The 216AX4 is ETL certified to UL-1776."
    },
    "X4 Series — The Industry Standard": {
      label: "X4 Series — The Industry Standard",
      desc: "Alkota's most popular hot water series. Belt-driven triplex pump at reduced RPM — cooler, quieter, longer-lived than direct drive. Four-wheel design. The 420X4 is the best-selling industrial hot water machine in the market."
    },
    "XD4 Series — Gas Engine Direct Drive": {
      label: "XD4 Series — Gas Engine Direct Drive",
      desc: "Honda-powered. No mains supply needed. Direct drive design for compact portability. 6 models from 3 GPM to 4 GPM at up to 4,000 PSI. The go-anywhere hot water machine."
    },
    "GED Series — Extra Narrow Frame": {
      label: "GED Series — Extra Narrow Frame",
      desc: "The highest-volume portable gas engine hot water machines Alkota makes. Up to 9.5 GPM. Belt-driven for sustained all-day operation. Available as portable or stationary, and as 12V or 115V skid configurations for trailer and van mounting."
    },
    "Gas Fired Series — Mains Gas & LPG": {
      label: "Gas Fired Series — Mains Gas & LPG",
      desc: "Electric motor driven with natural gas or LPG burner. No diesel on site. Available as portable or stationary. The 4301 NG/LP is the standard model. Stationary Gas Fired Series covers 2.1 GPM to 10 GPM for large permanent wash bay installations."
    },
    "DED Series — Diesel Engine Drive": {
      label: "DED Series — Diesel Engine Drive",
      desc: "Single fuel diesel. Engine and burner both run on diesel. The professional's choice for remote sites, fuel card operations, and anywhere single-fuel simplicity matters."
    },
    "BD Industrial Series": {
      label: "BD Industrial Series",
      desc: "Self-contained cabinet design. Controls enclosed and protected. Electric drive. Zero emissions at point of use. Five models from 2 GPM / 110 BAR to 5 GPM / 207 BAR."
    },
    "S Series — Hot Water Ready": {
      label: "S Series — Hot Water Ready",
      desc: "Unique in the cold water range — the S and SH Series accept incoming hot water up to 180°F / 82°C. If you have an in-house boiler, hot water heater, or steam generator, the S Series delivers hot water cleaning performance at cold water machine cost. Belt driven, quiet, low vibration."
    },
    "Wash Cannon — High Volume": {
      label: "Wash Cannon — High Volume",
      desc: "When you need to move water fast. The Wash Cannon is a high-volume, low-pressure system for large-scale industrial cleaning — livestock buildings, large agricultural concrete yards, municipal applications. 21 to 25 GPM through a heavy-duty diaphragm pump that handles solids up to 3/32 inch. No filtration or water treatment system required. Gas engine or electric."
    },
    "Challenger Series — Portable Gas": {
      label: "Challenger Series — Portable Gas",
      desc: "Lightweight aluminium frame. Honda engine. Solid flat-free tyres. No power supply needed. The mobile cold water machine for outdoor work where mains power isn't available."
    },
    "Jetter Series": {
      label: "Jetter Series",
      desc: "Specialist drain jetting and pipe cleaning. Available in 115V electric and gas engine configurations. For drainage contractors, water companies, highways maintenance and agricultural drainage applications."
    }
  };

  // Group machines by series
  const groupedMachines = machines.reduce((acc, m) => {
    const series = m.series || "Other Models";
    if (!acc[series]) acc[series] = [];
    acc[series].push(m);
    return acc;
  }, {} as Record<string, any[]>);

  // Wash Bay Cabinet Series Data for Table (Section 2)
  const washBayModels = [
    { model: '216B', flow: '2 GPM / 7.6L', pressure: '1600 PSI / 110B', power: '115V/1PH' },
    { model: '311B', flow: '3 GPM / 11.4L', pressure: '1100 PSI / 76B', power: '115V/1PH' },
    { model: '420B', flow: '3.8 GPM/14.4L', pressure: '2000 PSI / 138B', power: '230V/1PH' },
    { model: '430B', flow: '3.8 GPM/14.4L', pressure: '3000 PSI / 207B', power: '230V/1PH' },
    { model: '520B', flow: '5 GPM / 18.9L', pressure: '2000 PSI / 138B', power: '230V/1PH' },
    { model: '530B', flow: '5 GPM / 18.9L', pressure: '3000 PSI / 207B', power: '230V/3PH' },
    { model: '835B', flow: '8 GPM / 30.3L', pressure: '3500 PSI / 241B', power: '230V/3PH' },
    { model: '1030B', flow: '10 GPM/ 37.9L', pressure: '3000 PSI / 207B', power: '230V/3PH' },
  ];

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.05] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            {categorySlug.split('-')[0]}
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Machines', href: '/machines' },
            { label: categoryName }
          ]} />
          
          <header className="mb-24 mt-12 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Specification
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              {categoryName} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">EQUIPMENT.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              {categorySlug === 'hot-water' && "Alkota hot water machines have eliminated grease, oil and biological contamination for industrial operators since 1964."}
              {categorySlug === 'cold-water' && "Industrial cold water pressure washers for mud, soil, caked debris and general wash-down. Tough by design."}
              {categorySlug === 'parts-washers' && "Aqueous hot water parts washers using biodegradable detergents. No solvents. No aerosols. Load the parts, set the timer, return when clean."}
              {!['hot-water', 'cold-water', 'parts-washers'].includes(categorySlug) && `Premium ${categoryName} systems engineered for maximum efficiency and durability.`}
            </motion.p>
          </header>

          <div className="space-y-40 pb-40">
            {Object.entries(groupedMachines).map(([series, machineList]) => (
              <section key={series} id={series.toLowerCase().replace(/\s+/g, '-').split('—')[0].trim()}>
                <div className="mb-12 max-w-4xl">
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-6">
                    {seriesInfo[series]?.label || series}
                  </h2>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-widest max-w-3xl">
                    {seriesInfo[series]?.desc || ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                  {machineList.map((machine, i) => (
                    <MachineCard key={machine._id} machine={machine} index={i} />
                  ))}
                </div>
              </section>
            ))}

            {/* Special Section: Cold Water Wash Bay B Series Spec Table */}
            {categorySlug === 'cold-water' && (
              <section id="wash-bay-series">
                <div className="mb-12 max-w-4xl">
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-6">
                    Wash Bay Series — Fixed Installation
                  </h2>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-widest max-w-4xl">
                    The Wash Bay Cabinet Series is Alkota's fixed-installation cold water range — built for permanent wash bay environments. Self-contained enclosed cabinet. Stable welded frame. Belt-driven triplex pump. ETL certified to UL-1776. 
                    <br /><br />
                    Sixteen models covering 2 GPM to 10 GPM. Auto start/stop available. The professional's choice for fleet depots, food processing, and agricultural buildings.
                  </p>
                </div>
                
                <div className="overflow-x-auto border border-alkota-iron">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-alkota-black text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest">
                      <tr>
                        <th className="p-6 border-r border-white/10">Model</th>
                        <th className="p-6 border-r border-white/10">Flow Rate</th>
                        <th className="p-6 border-r border-white/10">Pressure</th>
                        <th className="p-6">Power Source</th>
                      </tr>
                    </thead>
                    <tbody className="font-barlow-condensed text-xl font-bold text-alkota-black">
                      {washBayModels.map((row, i) => (
                        <tr key={i} className="border-t border-alkota-iron hover:bg-alkota-bg transition-colors">
                          <td className="p-6 border-r border-alkota-iron italic">{row.model}</td>
                          <td className="p-6 border-r border-alkota-iron">{row.flow}</td>
                          <td className="p-6 border-r border-alkota-iron">{row.pressure}</td>
                          <td className="p-6">{row.power}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-alkota-black p-12">
                   <div>
                      <h4 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-2">Need a different specification?</h4>
                      <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-widest">Additional models and voltages are available on request to perfectly match your facility.</p>
                   </div>
                   <Link 
                     href="/contact?enquiry=wash-bay"
                     className="bg-alkota-orange px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-alkota-black transition-all flex items-center gap-4"
                   >
                      Specify your wash bay requirements <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              </section>
            )}

            {machines.length === 0 && (
              <div className="py-40 text-center border border-alkota-iron bg-white">
                <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em]">Products coming soon. Contact us for availability.</p>
                <Link href="/contact" className="mt-8 inline-block text-[11px] font-black uppercase tracking-widest text-alkota-orange hover:text-white transition-colors">Contact us →</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
