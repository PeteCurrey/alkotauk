'use client';

import React, { useRef, useState, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export default function VideoBackground({
  src,
  poster = '/assets/hero-home-header.jpg',
  className = '',
  overlayClassName = 'bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30',
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay may be restricted by browser policy; fallback will remain visible
        setIsPlaying(false);
      });
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Poster Image (always loaded as base) */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Looping HTML5 Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Cinematic Film Overlay */}
      {overlayClassName && (
        <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
      )}

      {/* Foreground Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
