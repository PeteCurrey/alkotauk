'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, MapPin, Tag } from 'lucide-react';
import { MessQuestEpisode } from '@/lib/messQuestEpisodes';

interface EpisodeLibraryProps {
  episodes: MessQuestEpisode[];
}

export default function EpisodeLibrary({ episodes }: EpisodeLibraryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'AGRICULTURE', 'INFRASTRUCTURE', 'HEAVY EQUIPMENT'];

  const filteredEpisodes = selectedFilter === 'ALL'
    ? episodes
    : episodes.filter((ep) => ep.categoryFilter === selectedFilter);

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[#E0E0DC] pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#888] mr-4">
          FILTER BY SECTOR:
        </span>
        {categories.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                isActive
                  ? 'bg-alkota-orange text-white border-alkota-orange font-medium shadow-sm'
                  : 'bg-white text-[#555] border-[#E0E0DC] hover:border-alkota-orange hover:text-alkota-black'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Episode Grid (Asymmetric Editorial Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredEpisodes.map((ep, idx) => {
          const isPrimary = idx === 0;
          return (
            <div
              key={ep.id}
              className={`bg-white border border-[#E0E0DC] flex flex-col justify-between hover:border-alkota-orange transition-all duration-300 group shadow-sm overflow-hidden ${
                isPrimary && selectedFilter === 'ALL' ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] bg-[#141412] overflow-hidden">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-alkota-orange text-white px-2.5 py-1">
                      EPISODE {ep.id}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest bg-black/70 backdrop-blur-sm text-white/90 px-2 py-1 border border-white/20">
                      {ep.categoryFilter}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/80 font-mono">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      <span>{ep.location}</span>
                    </span>
                    {ep.duration && <span>{ep.duration}</span>}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3
                    className="font-light uppercase tracking-tight text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight mb-3"
                    style={{ fontSize: isPrimary ? 'clamp(1.5rem, 2.5vw, 2.2rem)' : '1.35rem' }}
                  >
                    {ep.title}
                  </h3>

                  <p className="text-sm text-[#666] leading-relaxed mb-6 font-normal">
                    {ep.shortDescription}
                  </p>

                  <div className="border-t border-[#EFEFEA] pt-4 text-xs text-[#777] space-y-1.5 font-normal">
                    <div className="flex items-center justify-between">
                      <span className="text-[#999] uppercase text-[10px] tracking-wider">PRIMARY CONTAMINANT:</span>
                      <span className="text-alkota-black font-medium text-right text-[11px] truncate max-w-[200px]">
                        {ep.editorialData.theJob.contaminationType.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={`/mess-quest/${ep.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F8F7F4] hover:bg-alkota-orange text-alkota-black hover:text-white px-5 py-3.5 text-xs uppercase tracking-widest transition-colors font-medium border border-[#E0E0DC] hover:border-alkota-orange no-underline"
                >
                  <span>Explore Case Study & Engineering</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
