import Link from 'next/link';
import { ArrowRight, FileText, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  className?: string;
}

export default function WashPlantSpecifierCta({ className = '' }: Props) {
  return (
    <section className={`bg-alkota-black text-white p-8 sm:p-14 border border-[#222] shadow-xl ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] text-alkota-orange">
              // SPECIFICATION & CONSULTANT ENGAGEMENT
            </span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
            Preparing a capital project or formal tender?
          </h2>

          <p className="text-xs sm:text-sm text-alkota-steel leading-relaxed max-w-2xl">
            We work directly with Engineering Directors, Operations Managers, M&E Consultants, and Principal Contractors. We provide hydraulic sizing calculations, process flow diagrams, trade effluent advice, and CAD interfaces.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 font-ibm-plex-mono text-[11px] text-[#aaa]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
              <span>Turnkey M&E & Civils Scoping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
              <span>BS EN 858 & Trade Effluent Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
              <span>Budget Sizing & Feasibility Surveys</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
              <span>Formal Tender & Framework Responses</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
          <Link
            href="/wash-plant/architect"
            className="inline-flex items-center justify-between w-full bg-alkota-orange text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            <span>Launch Scoping Tool</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact?enquiry=wash-plant-spec"
            className="inline-flex items-center justify-between w-full border border-white/20 bg-white/5 text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-colors"
          >
            <span>Request Consultation</span>
            <Compass className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
