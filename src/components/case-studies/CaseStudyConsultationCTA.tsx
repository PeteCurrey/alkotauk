import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface Props {
  eyebrow?: string;
  headline?: string;
  description?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export default function CaseStudyConsultationCTA({
  eyebrow = 'CONSULTATIVE SPECIFICATION',
  headline = 'Apply These Engineering Principles to Your Facility.',
  description = 'Every industrial cleaning requirement has distinct water temperature, hydraulic flow, and chemical dynamics. Speak with an Alkota UK technical specialist to specify the right system for your operating environment.',
  primaryCTA,
  secondaryCTA = { label: 'Contact UK Engineering Team', href: '/contact' },
}: Props) {
  return (
    <section className="my-16 bg-[#121212] text-white p-8 sm:p-14 border border-[#222] font-normal">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-3 font-normal font-mono">
          {eyebrow}
        </span>
        <h3 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
          {headline}
        </h3>
        <p className="text-sm sm:text-base text-[#CCC] leading-relaxed font-normal mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={primaryCTA.href}
            className="inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shadow-lg"
          >
            <span>{primaryCTA.label}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#FF6900]" />
              <span>{secondaryCTA.label}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
