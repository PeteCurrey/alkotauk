import Link from 'next/link';
import { getAllMessQuestEpisodes } from '@/lib/messQuestEpisodes';
import { Film, ExternalLink, Play, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminMessQuestPage() {
  const episodes = getAllMessQuestEpisodes();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-light text-3xl sm:text-4xl uppercase tracking-tight text-white">
            Mess Quest Video Series CMS
          </h1>
          <p className="font-mono text-[10px] text-[#888] uppercase tracking-widest mt-1">
            // {episodes.length} authentic field challenges & video case studies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/mess-quest"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#ccc] hover:text-white transition-colors"
          >
            <span>View Public Hub</span>
            <ExternalLink className="h-3.5 w-3.5 text-alkota-orange" />
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-mono text-[9px] text-alkota-orange uppercase font-medium">
            ORIGINAL SERIES
          </p>
          <h3 className="font-extralight text-3xl text-white mt-1">
            {episodes.length} Case Studies
          </h3>
          <p className="font-mono text-[10px] text-[#666] mt-1">
            All linked to official Alkota video assets
          </p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-mono text-[9px] text-alkota-orange uppercase font-medium">
            FEATURED EPISODE
          </p>
          <h3 className="font-extralight text-xl text-white mt-1 truncate">
            {episodes[0]?.title}
          </h3>
          <p className="font-mono text-[10px] text-[#666] mt-1">
            Sector: {episodes[0]?.categoryFilter}
          </p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-mono text-[9px] text-alkota-orange uppercase font-medium">
            INTEGRATION
          </p>
          <h3 className="font-extralight text-3xl text-white mt-1">
            Homepage + Hub + Dynamic Routes
          </h3>
          <p className="font-mono text-[10px] text-[#666] mt-1">
            Lightweight privacy facades (0 CWV penalty)
          </p>
        </div>
      </div>

      {/* Episodes Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">
            Series Episodes
          </span>
          <span className="font-mono text-[10px] text-[#666]">
            Structured Video Entities
          </span>
        </div>

        <div className="divide-y divide-[#1F1F1F]">
          {episodes.map((ep) => (
            <div key={ep.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111] transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-[#1C1C1C] border border-[#333] flex items-center justify-center text-alkota-orange shrink-0 font-mono text-base">
                  {ep.id}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] text-alkota-orange bg-alkota-orange/10 px-2 py-0.5 uppercase">
                      {ep.categoryFilter}
                    </span>
                    <span className="font-mono text-[9px] text-[#666]">
                      {ep.duration} • {ep.location}
                    </span>
                  </div>
                  <h4 className="font-light text-xl uppercase text-white">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-[#888] max-w-2xl mt-1">
                    {ep.shortDescription}
                  </p>
                  <p className="font-mono text-[10px] text-[#555] mt-2">
                    Contamination: <span className="text-[#ccc]">{ep.editorialData.theJob.contaminationType}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/mess-quest/${ep.slug}`}
                  target="_blank"
                  className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-mono text-[10px] uppercase text-[#aaa] hover:text-white transition-colors no-underline"
                >
                  <span>Public View</span>
                  <ExternalLink className="h-3 w-3 text-alkota-orange" />
                </Link>
                <a
                  href={ep.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-mono text-[10px] uppercase text-[#aaa] hover:text-white transition-colors no-underline"
                >
                  <Play className="h-3 w-3 text-alkota-orange" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
