import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Target, Zap } from 'lucide-react';

export default function MachineMatchBanner() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F8F8F7] border-b border-[#D8D8D6]">
      <div className="mx-auto max-w-7xl">
        <div className="bg-alkota-black text-white p-10 sm:p-16 lg:p-20 border border-[#2B2B2B] relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-alkota-orange/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-4 w-4 text-alkota-orange" />
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                  INTERACTIVE APPLICATION MATCHING // 8 QUESTIONS
                </span>
              </div>

              <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.88] mb-6">
                NOT SURE WHICH ALKOTA? <br />
                <span className="text-alkota-orange">TELL US ABOUT THE WORK.</span>
              </h2>

              <p className="font-inter text-base sm:text-lg text-[#aaa] max-w-2xl leading-relaxed mb-8">
                Input your operational challenge — pressure, water temperature, power availability, duty cycle, and contamination type. Our matching engine will identify the exact machine family and specification engineered for your application.
              </p>

              <div className="flex flex-wrap items-center gap-6 font-ibm-plex-mono text-xs text-[#888]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span className="text-white">8 Quick Steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span className="text-white">Instant Thermodynamic Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span className="text-white">No Obligation Engineering Spec</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Link
                href="/tools/machine-match"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-10 py-5 font-ibm-plex-mono text-xs font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all shadow-xl no-underline group w-full sm:w-auto text-center"
              >
                <span>Launch Machine Match</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase tracking-widest mt-3">
                // TAKES UNDER 90 SECONDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
