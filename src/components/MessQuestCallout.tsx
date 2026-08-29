import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface MessQuestCalloutProps {
  /** 'inline' = full-width horizontal bar. 'panel' = slightly larger with more visual weight. */
  variant?: 'inline' | 'panel';
  className?: string;
}

/**
 * MessQuestCallout — a restrained contextual cross-link to the Mess Quest series.
 * Place on pages where seeing the equipment in action genuinely adds value.
 * Do NOT place this on every page mechanically.
 */
export default function MessQuestCallout({
  variant = 'inline',
  className = '',
}: MessQuestCalloutProps) {
  if (variant === 'panel') {
    return (
      <div className={`relative overflow-hidden bg-[#0A0A0A] ${className}`}>
        {/* Ambient background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.28) contrast(1.1)' }}
          >
            <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" aria-hidden="true" />
        </div>

        <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-12">
          <span className="text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-3">
            See It In The Field
          </span>
          <h3 className="font-light text-2xl sm:text-3xl uppercase text-white leading-tight mb-3">
            Alkota Equipment.<br />Extreme Real-World Tests.
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-md">
            Watch Alkota equipment tackle some of the toughest industrial cleaning challenges in the field — in the Mess Quest original series.
          </p>
          <Link
            href="/mess-quest"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-7 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors group"
          >
            <span>Watch Mess Quest</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  // Inline variant — a contained horizontal bar
  return (
    <div className={`border border-[#E0E0DC] bg-[#F8F7F4] px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-4">
        <span className="h-[2px] w-6 bg-alkota-orange mt-2.5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-alkota-orange mb-0.5">
            See It In The Field
          </p>
          <p className="text-sm text-alkota-black leading-snug">
            Watch Alkota equipment tackle extreme cleaning challenges in the{' '}
            <span className="text-alkota-black">Mess Quest</span> original series.
          </p>
        </div>
      </div>
      <Link
        href="/mess-quest"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-orange hover:text-alkota-black transition-colors shrink-0 group"
      >
        <span>Watch Mess Quest</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
