'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { MESS_QUEST_EMBED_URL, MESS_QUEST_PLAYLIST_URL } from '@/lib/messQuestEpisodes';

interface MessQuestVideoPlayerProps {
  youtubeVideoId?: string;
  title?: string;
  thumbnail?: string;
  className?: string;
}

export default function MessQuestVideoPlayer({
  youtubeVideoId,
  title = 'Mess Quest — Alkota Industrial Cleaning Documentary Series',
  thumbnail,
  className = '',
}: MessQuestVideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = youtubeVideoId
    ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`
    : `${MESS_QUEST_EMBED_URL}&autoplay=1`;

  const externalUrl = youtubeVideoId
    ? `https://www.youtube.com/watch?v=${youtubeVideoId}`
    : MESS_QUEST_PLAYLIST_URL;

  return (
    <div className={`relative w-full ${className}`}>
      {/* 16:9 aspect container — holds dimensions before iframe loads, preventing CLS */}
      <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden border border-[#222]">
        {!isLoaded ? (
          /* Click-to-load facade — no YouTube cookies until user interacts */
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-alkota-orange text-left"
            aria-label={`Watch ${title} — click to load video player`}
          >
            {/* Background: use thumbnail if supplied, else ambient video */}
            {thumbnail ? (
              <div className="absolute inset-0 z-0">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.4) contrast(1.1)' }}
                  loading="lazy"
                />
              </div>
            ) : (
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
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

            {/* Play button & title */}
            <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
              <div className="relative flex items-center justify-center">
                {/* Pulsing ring */}
                <span
                  className="absolute h-24 w-24 rounded-full border border-white/20 animate-ping"
                  style={{ animationDuration: '2s' }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-alkota-orange group-hover:bg-white transition-colors duration-300 shadow-2xl">
                  <Play
                    className="h-8 w-8 text-white group-hover:text-alkota-black fill-current transition-colors duration-300 ml-1"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <p className="text-white text-xs uppercase tracking-[0.25em] mb-1 font-light">
                  {youtubeVideoId ? 'Play Official Episode' : 'Watch Mess Quest'}
                </p>
                <p className="text-white/60 text-[11px] uppercase tracking-widest max-w-lg truncate">
                  {title}
                </p>
              </div>
            </div>

            {/* Privacy notice */}
            <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/40 px-4" aria-hidden="true">
              Clicking loads privacy-enhanced YouTube stream (youtube-nocookie.com).
            </p>
          </button>
        ) : (
          /* Privacy-enhanced YouTube embed — only loads after user interaction */
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Below-player metadata bar */}
      <div className="mt-3.5 flex items-center justify-between text-[11px] text-[#777]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#888]">
          // Alkota Cleaning Systems · Authentic Footage
        </span>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 uppercase tracking-[0.18em] text-alkota-orange hover:text-white transition-colors"
          aria-label={`Open ${title} on YouTube (opens in a new tab)`}
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
