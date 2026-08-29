import { CaseStudySpecification } from '@/lib/case-studies/types';
import { Sliders, CheckCircle2 } from 'lucide-react';

interface Props {
  specifications: CaseStudySpecification[];
  title?: string;
  subtitle?: string;
}

export default function CaseStudySpecifications({
  specifications,
  title = 'Technical Specifications & Parameters',
  subtitle = 'Operational engineering data recorded for this field deployment',
}: Props) {
  if (!specifications || specifications.length === 0) return null;

  return (
    <section className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-3 mb-2">
        <Sliders className="h-4 w-4 text-[#FF6900]" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-normal">
          Verified Field Metrics
        </span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#666] mb-8 max-w-2xl">
        {subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 bg-[#F8F7F4] border border-[#E8E8E4]"
          >
            <span className="text-[11px] uppercase tracking-wider text-[#888] font-normal mb-1">
              {spec.label}
            </span>
            <span className="text-sm sm:text-base text-alkota-black font-normal">
              {spec.value}
            </span>
            {spec.context && (
              <span className="text-[11px] text-[#666] mt-1 italic">
                {spec.context}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
