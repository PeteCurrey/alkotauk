'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Banner {
  id: string;
  message: string;
  link_text?: string;
  link_url?: string;
  style: 'info' | 'promo' | 'warning' | 'urgent';
  dismissible: boolean;
}

const STYLE_BACKGROUND: Record<string, string> = {
  info: '#1d4ed8',
  promo: '#FF6900',
  warning: '#b45309',
  urgent: '#b91c1c',
};

const DISMISSED_KEY = 'alkota-dismissed-banners';

function getDismissed(): string[] {
  try { return JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]'); } catch { return []; }
}
function dismiss(id: string) {
  const d = getDismissed();
  localStorage.setItem(DISMISSED_KEY, JSON.stringify([...d, id]));
}

export default function SiteBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDismissed(getDismissed());
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(data => {
        setBanners(data.banners || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const activeBanner = loaded ? banners.find(b => !dismissed.includes(b.id)) : null;

  if (!activeBanner) return null;

  function handleDismiss() {
    dismiss(activeBanner!.id);
    setDismissed(d => [...d, activeBanner!.id]);
  }

  const bg = STYLE_BACKGROUND[activeBanner.style] || STYLE_BACKGROUND.info;

  return (
    <div
      className="w-full py-2.5 px-4 flex items-center justify-center gap-4 text-white relative z-50"
      style={{ background: bg }}
    >
      <p className="font-inter text-[13px] font-medium">{activeBanner.message}</p>
      {activeBanner.link_text && activeBanner.link_url && (
        <Link
          href={activeBanner.link_url}
          className="flex items-center gap-1 font-ibm-plex-mono text-[11px] uppercase tracking-wider font-bold underline underline-offset-2 hover:opacity-80 transition-opacity shrink-0"
        >
          {activeBanner.link_text} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
      {activeBanner.dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
