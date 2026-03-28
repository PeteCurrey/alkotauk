'use client';

import { useState } from 'react';
import { X, ArrowRight, Info, AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SiteBannerProps {
  text: string;
  link?: string;
  type?: 'info' | 'special' | 'alert';
}

export default function SiteBanner({ text, link, type = 'info' }: SiteBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !text) return null;

  const bgStyles = {
    info: "bg-alkota-black border-b border-white/10 text-white",
    special: "bg-alkota-orange border-b border-orange-600 text-white",
    alert: "bg-red-700 border-b border-red-900 text-white"
  };

  const Icon = {
    info: <Info className="h-4 w-4" />,
    special: <Sparkles className="h-4 w-4" />,
    alert: <AlertTriangle className="h-4 w-4" />
  }[type];

  const Content = () => (
    <div className="flex items-center justify-center gap-3 px-8 py-2.5">
      <span className="flex-shrink-0 opacity-80">{Icon}</span>
      <p className="font-barlow-condensed text-[11px] md:text-[13px] font-black uppercase tracking-widest leading-tight">
        {text}
      </p>
      {link && <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />}
    </div>
  );

  return (
    <div className={cn("relative z-[60] group transition-all duration-300", bgStyles[type])}>
      {link ? (
        <Link href={link} className="block hover:opacity-90">
          <Content />
        </Link>
      ) : (
        <Content />
      )}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/20 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className="h-3.5 w-3.5 opacity-60" />
      </button>
    </div>
  );
}
