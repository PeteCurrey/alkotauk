'use client';

import React from 'react';
import { Flame, Droplets, Wind, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WhyTechnologyProps {
  categorySlug: string;
}

export default function WhyTechnology({ categorySlug }: WhyTechnologyProps) {
  const content = {
    'hot-water': {
      title: 'Why Heat Changes the Equation',
      subtitle: 'Kinetic Pressure vs Thermal Emulsification',
      lead: 'Cold water under high pressure can blast loose soil and aggregate away, but it cannot dissolve petrochemical bonding. Hot water elevates the wash surface temperature beyond the melting point of grease (60°C–90°C), allowing thermal energy to do the heavy mechanical lifting.',
      advantages: [
        'Instantly melts heavy engine oil, hydraulic fluid, diesel soot, and road bitumen',
        'Cuts detergent and chemical consumption by up to 60%',
        'Accelerates operator wash cycles by 40–50% on commercial fleet and plant',
        'Dries faster on steel chassis, preventing post-wash moisture pooling and flash corrosion'
      ],
      idealFor: 'Fleet maintenance depots, heavy plant hire, agricultural machinery, oilfield services, and commercial wash bays.',
      notIdealFor: 'Light dust rinsing where heating fuel overheads are unnecessary (deploy Cold Water instead).'
    },
    'cold-water': {
      title: 'The Power of Pure Hydraulic Impingement',
      subtitle: 'Mass Flow Rate & High Kinetic Blast Force',
      lead: 'When the primary contamination consists of clay, topsoil, sand, sawdust, or biological matter, heat is often redundant. Cold water pressure washers focus 100% of their input power into continuous volumetric displacement and raw hydrostatic impact.',
      advantages: [
        'Maximum flow rates up to 38 L/min for high-volume mud displacement',
        'Zero heating fuel or electrical burner consumption overheads',
        'Compact, highly portable chassis configurations for mobile site work',
        'Continuous 24/7 duty cycle pumps engineered for intensive industrial rinse lines'
      ],
      idealFor: 'Construction plant washdown, aggregate quarries, agricultural yard rinsing, boat hulls, and timber processing.',
      notIdealFor: 'Heavy bonded engine grease, baked tar, or fuel residues (deploy Hot Water instead).'
    },
    'steam': {
      title: 'Precision Heat with Micro-Volume Water Delivery',
      subtitle: 'Latent Heat of Condensation at 140°C–165°C',
      lead: 'Dry saturated vapour steam delivers extraordinary thermal breakdown using a fraction of the water volume (2–6 L/min). As 140°C vapour contacts a cool surface, it releases 2,260 kJ/kg of latent heat without generating overspray, puddle flooding, or chemical fumes.',
      advantages: [
        'Deep thermal sanitisation killing bacteria, Listeria, and biofilms on contact',
        'Ultra-low water consumption eliminates indoor runoff and drainage flooding',
        'Safe around electrical enclosures, hydraulic valving, and delicate sensors',
        'Replaces solvent sink tanks and aggressive toxic degreasers'
      ],
      idealFor: 'Food & beverage conveyor hygiene, pharmaceutical processing, aerospace component cleaning, and automotive machine rebuild workshops.',
      notIdealFor: 'Bulk outdoor clay removal on tracked excavators (deploy High-Flow Cold Water or Hot Water).'
    }
  }[categorySlug] || {
    title: 'Industrial Cleaning Engineering',
    subtitle: 'Matching Technology to Contamination Physics',
    lead: 'Selecting the correct machine platform begins with understanding the physical properties of the surface and contaminant.',
    advantages: [
      'Engineered for continuous multi-shift operation',
      'Industrial triplex pumps and Schedule 80 heating coils',
      'Full UK compliance with trade effluent and safety standards'
    ],
    idealFor: 'Industrial, transport, agricultural, and processing facilities.',
    notIdealFor: 'Domestic light-duty applications.'
  };

  return (
    <section className="bg-white border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Lead */}
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-3">
              Operational Physics & Technology Selection
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-6">
              {content.title}
            </h2>
            <p className="font-normal text-base sm:text-lg text-[#555] leading-relaxed mb-8">
              {content.lead}
            </p>

            <div className="p-6 bg-[#FAFAF8] border border-[#E5E5E0]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A18] block mb-2 font-medium">
                Ideal Primary Applications:
              </span>
              <p className="text-xs sm:text-sm text-[#666] font-normal leading-relaxed mb-4">
                {content.idealFor}
              </p>
              <div className="pt-3 border-t border-[#EAEAE5] flex items-center justify-between text-xs font-mono">
                <span className="text-[#888]">Technology Guidance</span>
                <Link
                  href="/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown"
                  className="text-[#FF6900] hover:underline inline-flex items-center gap-1 no-underline"
                >
                  Read White Paper <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Key Advantages */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAFAF8] border border-[#E5E5E0] p-8 sm:p-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6900] block mb-6 font-medium">
                Key Engineering Advantages
              </span>

              <ul className="space-y-5">
                {content.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-[#FF6900] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#2A2A28] font-normal leading-relaxed">
                      {adv}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#EAEAE5] flex items-center gap-3">
                <XCircle className="h-4 w-4 text-[#999] shrink-0" />
                <span className="text-xs text-[#777] font-normal">
                  <strong className="font-medium text-[#444]">When not to specify:</strong> {content.notIdealFor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
