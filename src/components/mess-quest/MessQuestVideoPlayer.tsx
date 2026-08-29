'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { MESS_QUEST_EMBED_URL, MESS_QUEST_PLAYLIST_URL } from '@/lib/messQuestEpisodes';

interface MessQuestVideoPlayerProps {
  className?: string;
}

export default function MessQuestVideoPlayer({ className = '' }: MessQuestVideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {/* 16:9 aspect container — holds dimensions before iframe loads, preventing CLS */}
      <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden">
        {!isLoaded ? (
          /* Click-to-load facade — no YouTube cookies until user interacts */
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-alkota-orange"
            aria-label="Watch Mess Quest — click to load the video player"
          >
            {/* Ambient video background behind the facade */}
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.35) contrast(1.1)' }}
            >
              <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="relative flex items-center justify-center">
                {/* Pulsing ring */}
                <span
                  className="absolute h-24 w-24 rounded-full border border-white/20 animate-ping"
                  style={{ animationDuration: '2s' }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-alkota-orange group-hover:bg-white transition-colors duration-300 shadow-2xl">
                  <Play
                    className="h-8 w-8 text-white group-hover:text-alkota-black fill-current transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-white text-xs uppercase tracking-[0.25em] mb-1">
                  Watch Mess Quest
                </p>
                <p className="text-white/50 text-[11px] uppercase tracking-widest">
                  Official Alkota Series · Full Playlist
                </p>
              </div>
            </div>

            {/* Cookie notice */}
            <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/30 px-4" aria-hidden="true">
              Clicking loads the YouTube player (youtube-nocookie.com).
            </p>
          </button>
        ) : (
          /* Privacy-enhanced YouTube embed — only loads after user interaction */
          <iframe
            src={`${MESS_QUEST_EMBED_URL}&autoplay=1`}
            title="Mess Quest — Alkota Industrial Cleaning Documentary Series"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Below-player link */}
      <div className="mt-4 flex items-center justify-end">
        <a
          href={MESS_QUEST_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-alkota-orange hover:text-white transition-colors"
          aria-label="Open Mess Quest playlist on YouTube (opens in a new tab)"
        >
          <span>Open on YouTube</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
