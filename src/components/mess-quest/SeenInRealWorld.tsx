import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import { getMessQuestEpisodeBySlug, getAllMessQuestEpisodes, MessQuestEpisode } from '@/lib/messQuestEpisodes';

interface SeenInRealWorldProps {
  episodeSlug?: string;
  category?: string;
  className?: string;
}

export default function SeenInRealWorld({
  episodeSlug,
  category,
  className = '',
}: SeenInRealWorldProps) {
  let episode: MessQuestEpisode | undefined;

  if (episodeSlug) {
    episode = getMessQuestEpisodeBySlug(episodeSlug);
  } else if (category) {
    const all = getAllMessQuestEpisodes();
    episode = all.find((ep) =>
      ep.editorialData.relatedProductCategories.some((c) => c.slug === category)
    ) || all[0];
  } else {
    episode = getAllMessQuestEpisodes()[0];
  }

  if (!episode) return null;

  return (
    <section className={`bg-[#0D0D0B] text-white py-16 sm:py-20 px-6 sm:px-12 border-y border-[#222] ${className}`} aria-label="Mess Quest Field Proof">
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Thumbnail / Video Stills Plate */}
          <div className="lg:col-span-5 relative aspect-[16/10] bg-black overflow-hidden border border-[#262626] group">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[9px] font-mono uppercase tracking-widest bg-alkota-orange text-white px-2.5 py-1">
                MESS QUEST // EP. {episode.id}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-mono">
              <span>{episode.location}</span>
              {episode.duration && <span>{episode.duration}</span>}
            </div>
          </div>

          {/* Editorial Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-alkota-orange text-xs font-mono uppercase tracking-[0.25em] mb-3">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Seen in the Real World // Field Proof</span>
              </div>

              <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight mb-3">
                {episode.title}
              </h3>

              <p className="text-sm sm:text-base text-[#AAA] leading-relaxed mb-6 font-light">
                See how extreme industrial cleaning challenges push professional Alkota equipment beyond ordinary pressure washing. {episode.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#888] mb-8 pb-4 border-b border-white/10">
                <span>SECTOR: <strong className="text-white font-normal">{episode.categoryFilter}</strong></span>
                <span>CONTAMINANT: <strong className="text-alkota-orange font-normal">{episode.editorialData.theJob.contaminationType.split(',')[0]}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/mess-quest/${episode.slug}`}
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline font-medium"
              >
                <span>Watch the Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mess-quest"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#AAA] hover:text-white transition-colors no-underline"
              >
                <span>View Full Mess Quest Archive →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
