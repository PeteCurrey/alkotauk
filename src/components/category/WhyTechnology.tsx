'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface WhyTechnologyProps {
  categorySlug: string;
}

export default function WhyTechnology({ categorySlug }: WhyTechnologyProps) {
  const content = {
    'hot-water': {
      title: 'Why Heat Changes the Equation',
      subtitle: 'Kinetic Pressure vs Thermal Emulsification',
      lead: 'Cold water under high hydrostatic pressure can blast loose soil and aggregate away, but it cannot dissolve petrochemical bonding. Hot water elevates the wash surface temperature beyond the melting point of grease (60°C–90°C), allowing thermal energy to do the heavy mechanical lifting.',
      advantages: [
        {
          num: '01',
          headline: 'Instant Petrochemical Breakdown',
          text: 'Rapidly melts bonded engine oil, hydraulic fluid, diesel soot, and road bitumen without requiring extreme abrasive pressure.'
        },
        {
          num: '02',
          headline: '60% Reduction in Chemistry',
          text: 'Thermal energy does the heavy surfactant work, substantially reducing annual chemical spend and trade effluent treatment costs.'
        },
        {
          num: '03',
          headline: 'Halved Operator Wash Cycles',
          text: 'Accelerates cleaning throughput on commercial haulage fleets and plant machinery by up to 50% per bay.'
        },
        {
          num: '04',
          headline: 'Zero Moisture Pooling',
          text: 'High-temperature wash surfaces dry almost instantly, preventing water entrapment and post-wash flash corrosion on steel chassis.'
        }
      ],
      idealFor: 'Commercial fleet haulage depots, heavy plant hire, agricultural machinery, oilfield services, and high-volume wash bays.',
      notIdealFor: 'Light dust or clay rinsing where fuel overhead is unnecessary (specify Cold Water instead).',
      whitepaperLink: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown'
    },
    'cold-water': {
      title: 'The Power of Pure Hydraulic Impingement',
      subtitle: 'Mass Flow Rate & High Kinetic Blast Force',
      lead: 'When contamination consists of clay, topsoil, sand, or biological matter, heat is often redundant. Cold water pressure washers focus 100% of their motor energy into continuous volumetric displacement and raw hydrostatic impact.',
      advantages: [
        {
          num: '01',
          headline: 'High-Volume Volumetric Displacement',
          text: 'Continuous flow rates up to 38 L/min efficiently float and flush dense clay and quarry aggregate from heavy tracked plant.'
        },
        {
          num: '02',
          headline: 'Zero Burner Fuel Overhead',
          text: 'Eliminates diesel, kerosene, or gas fuel infrastructure costs for sites requiring standard ambient washdown.'
        },
        {
          num: '03',
          headline: 'Continuous-Duty Duty Cycle',
          text: 'Low-RPM industrial triplex pumps engineered for round-the-clock shift operation in aggressive wash bay environments.'
        },
        {
          num: '04',
          headline: 'Maximum Site Portability',
          text: 'Lighter chassis architectures available with petrol or diesel drives for rapid deployment across remote civil sites.'
        }
      ],
      idealFor: 'Construction plant washdown, aggregate quarries, agricultural yard rinsing, boat hulls, and timber processing.',
      notIdealFor: 'Baked grease, bitumen, or petrochemical engine deposits (specify Hot Water instead).',
      whitepaperLink: '/lobby/application-science/flow-rate-vs-pressure-cleaning-mechanics'
    },
    'steam': {
      title: 'Precision Heat with Micro-Volume Water Delivery',
      subtitle: 'Latent Heat of Condensation at 140°C–165°C',
      lead: 'Dry saturated vapour steam delivers extraordinary thermal breakdown using a fraction of the water volume (2–6 L/min). As 140°C vapour contacts a cool surface, it releases 2,260 kJ/kg of latent heat without generating overspray, puddle flooding, or chemical fumes.',
      advantages: [
        {
          num: '01',
          headline: 'Deep Thermal Sanitisation',
          text: 'Kills bacteria, Listeria, and biofilms on contact, achieving verified hygienic decontamination across food production lines.'
        },
        {
          num: '02',
          headline: '80% Less Water Consumption',
          text: 'Micro-volume vapour delivery eliminates standing water, floor flooding, and excessive trade effluent drainage loads.'
        },
        {
          num: '03',
          headline: 'Safe Around Delicate Electronics',
          text: 'Allows precision degreasing around machine wiring looms, hydraulic valving, and optical sensors without moisture ingress.'
        },
        {
          num: '04',
          headline: 'Solvent Tank Replacement',
          text: 'Replaces dangerous VOC solvent sink tanks with non-toxic, closed-loop aqueous and dry vapour technology.'
        }
      ],
      idealFor: 'Food & beverage processing, pharmaceutical facilities, aerospace maintenance, and machine rebuild workshops.',
      notIdealFor: 'Heavy outdoor bulk mud displacement on tracked earthmoving plant (specify Cold or Hot Water).',
      whitepaperLink: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown'
    }
  }[categorySlug] || {
    title: 'Industrial Cleaning Engineering',
    subtitle: 'Matching Technology to Contamination Physics',
    lead: 'Selecting the correct machine platform begins with understanding the physical properties of the surface and contaminant.',
    advantages: [
      {
        num: '01',
        headline: 'Engineered for Heavy Duty',
        text: 'Continuous-rated industrial triplex pumps and Schedule 80 heating coils.'
      },
      {
        num: '02',
        headline: 'Full UK Compliance',
        text: 'Built to comply with UK trade effluent and environmental standards.'
      }
    ],
    idealFor: 'Industrial, transport, agricultural, and processing facilities.',
    notIdealFor: 'Domestic light-duty applications.',
    whitepaperLink: '/lobby'
  };

  return (
    <section className="bg-[#FAF9F5] border-b border-[#E8E7E0] py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Top Editorial Eyebrow & Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FF6900] block mb-3 font-medium">
            Operational Physics &amp; Technology Selection
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#1A1A18] leading-[1.02] mb-6">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed">
            {content.lead}
          </p>
        </div>

        {/* Asymmetric 7 / 5 Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 7 Cols: Numbered Proof Points without Box Containers */}
          <div className="lg:col-span-7">
            <div className="border-t border-[#E0DFD8] divide-y divide-[#EAE9E2]">
              {content.advantages.map((adv) => (
                <div key={adv.num} className="py-7 sm:py-8 flex items-start gap-6 sm:gap-8 group">
                  <span className="text-sm sm:text-base font-mono text-[#FF6900] tracking-wider shrink-0 mt-0.5 font-medium">
                    {adv.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-light text-[#1A1A18] mb-2 tracking-tight">
                      {adv.headline}
                    </h3>
                    <p className="text-sm text-[#666] leading-relaxed font-normal">
                      {adv.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Application Target Context */}
          <div className="lg:col-span-5 lg:pl-4 space-y-8">
            <div className="border-t border-[#1A1A18] pt-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1A1A18] block mb-3 font-medium">
                Primary Sector Deployment
              </span>
              <p className="text-sm text-[#444] font-normal leading-relaxed mb-6">
                {content.idealFor}
              </p>
            </div>

            <div className="border-t border-[#E0DFD8] pt-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888] block mb-2 font-medium">
                When Not to Specify
              </span>
              <p className="text-xs text-[#777] font-normal leading-relaxed">
                {content.notIdealFor}
              </p>
            </div>

            <div className="border-t border-[#E0DFD8] pt-6">
              <Link
                href={content.whitepaperLink}
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900] transition-colors no-underline font-medium"
              >
                <span>Read Technical White Paper in The Lobby</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF6900] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

