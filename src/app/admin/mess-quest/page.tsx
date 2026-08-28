import Link from 'next/link';
import { messQuestEpisodes } from '@/lib/messQuestEpisodes';
import { Film, ExternalLink, Play, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminMessQuestPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Mess Quest Video Series CMS
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {messQuestEpisodes.length} authentic field challenges & video episodes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/mess-quest"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white transition-colors"
          >
            <span>View Public Hub</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#FF6900]" />
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">
            ORIGINAL SERIES
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {messQuestEpisodes.length} Episodes
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            All linked to official Alkota video assets
          </p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">
            FEATURED EPISODE
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1 truncate">
            {messQuestEpisodes[0]?.title}
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            Machine: {messQuestEpisodes[0]?.machine}
          </p>
        </div>
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">
            INTEGRATION
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            Homepage + Hub
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            Lightweight facades active (0 CWV penalty)
          </p>
        </div>
      </div>

      {/* Episodes Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
            Series Episodes
          </span>
          <span className="font-ibm-plex-mono text-[10px] text-[#666]">
            Structured Video Entities
          </span>
        </div>

        <div className="divide-y divide-[#1F1F1F]">
          {messQuestEpisodes.map((ep) => (
            <div key={ep.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111] transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-[#1C1C1C] border border-[#333] flex items-center justify-center text-[#FF6900] shrink-0 font-barlow-condensed font-black text-xl italic">
                  0{ep.id}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 uppercase font-bold">
                      {ep.industry}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                      {ep.duration} • {ep.location}
                    </span>
                  </div>
                  <h4 className="font-barlow-condensed text-xl font-bold uppercase text-white">
                    {ep.title}
                  </h4>
                  <p className="font-inter text-xs text-[#888] max-w-2xl mt-1">
                    {ep.subtitle}
                  </p>
                  <p className="font-ibm-plex-mono text-[10px] text-[#555] mt-2">
                    Machine: <span className="text-[#ccc]">{ep.machine}</span> ({ep.operatingSpec})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold text-[#aaa] hover:text-white transition-colors"
                >
                  <Play className="h-3 w-3 text-[#FF6900]" />
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
