import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MachineMatchBanner() {
  return (
    <section className="bg-white border-t border-[#E0E0DE]" aria-label="Machine Match — Application Selector">
      <div className="flex flex-col lg:flex-row min-h-[50vh]">

        {/* Left — question prompt with large number */}
        <div className="w-full lg:w-[40%] bg-alkota-black px-8 sm:px-12 lg:px-16 py-16 flex flex-col justify-center">
          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-alkota-orange block mb-4">
            Application Matching
          </span>
          {/* Giant 8 as visual anchor */}
          <div className="font-barlow-condensed font-black text-alkota-orange select-none leading-none mb-2"
            style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}
            aria-hidden="true"
          >
            8
          </div>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mb-6">
            Questions to the right machine.
          </p>
        </div>

        {/* Right — prompt and CTA */}
        <div className="w-full lg:w-[60%] px-8 sm:px-12 lg:px-16 py-16 flex flex-col justify-center">
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}
          >
            NOT SURE<br />
            WHICH ALKOTA?
          </h2>
          <p className="font-inter text-[#555] leading-relaxed mb-8 font-normal"
            style={{ fontSize: '1rem', maxWidth: '44ch' }}
          >
            Tell us about your operational challenge — pressure requirement, water temperature, power supply, duty cycle, and contamination type. The matching engine identifies the exact machine family and specification for your application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/tools/machine-match"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-10 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-black transition-colors no-underline group"
            >
              <span>Begin Machine Match</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tools/configurator"
              className="inline-flex items-center gap-3 border border-[#999] text-alkota-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:border-alkota-black transition-colors no-underline"
            >
              Build Configurator
            </Link>
          </div>

          <p className="font-ibm-plex-mono text-[9px] text-[#aaa] uppercase tracking-widest mt-4">
            // Takes under 90 seconds · No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
