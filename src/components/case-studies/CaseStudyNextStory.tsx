import Link from 'next/link';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';

interface Props {
  nextSlug: string;
}

export default function CaseStudyNextStory({ nextSlug }: Props) {
  const nextStory = getCaseStudyBySlug(nextSlug) || getCaseStudyBySlug('antarctica-lake-whillans')!;

  return (
    <section className="bg-[#0D0D0B] text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-[#222] font-normal">
      <div className="mx-auto max-w-7xl w-full">
        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-white/15">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-normal">
            Next Field Story
          </span>
          <Link
            href="/resources/case-studies"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#AAA] hover:text-white transition-colors no-underline font-normal"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>View All Case Studies</span>
          </Link>
        </div>

        {/* Large Editorial Next Story Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-[#1A1A18] group">
            <img
              src={nextStory.heroImage}
              alt={nextStory.heroAlt}
              className="w-full h-full object-cover filter contrast-110 brightness-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
                {nextStory.eyebrow}
              </span>
              <h4 className="text-xl sm:text-2xl font-light uppercase tracking-tight text-white">
                {nextStory.title}
              </h4>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141412] p-8 sm:p-12 border border-white/10">
            <div>
              <div className="text-[11px] text-[#888] uppercase tracking-wider mb-3">
                Sector // {nextStory.sector}
              </div>
              <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight mb-4">
                {nextStory.headline}
              </h3>
              <p className="text-sm text-[#AAA] leading-relaxed font-normal mb-8">
                {nextStory.standfirst}
              </p>
            </div>

            <Link
              href={`/resources/case-studies/${nextStory.slug}`}
              className="inline-flex items-center justify-between w-full bg-[#FF6900] text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-normal no-underline group shadow-lg"
            >
              <span>Continue to Next Field Story</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
