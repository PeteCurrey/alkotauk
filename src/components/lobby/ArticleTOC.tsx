'use client';

import { useState, useEffect } from 'react';
import { ListFilter, ChevronRight } from 'lucide-react';

interface Props {
  headings: { id: string; text: string; level: number }[];
}

export default function ArticleTOC({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -60% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-28 border border-[#E5E5E0] bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EAEAEA] mb-3">
          <ListFilter className="h-3.5 w-3.5 text-[#FF6900]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A18]">
            In This Article
          </span>
        </div>

        <nav className="space-y-1 text-xs">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`group flex items-start gap-1.5 py-1.5 transition-colors no-underline leading-snug ${
                  h.level === 3 ? 'pl-3' : ''
                } ${
                  isActive
                    ? 'text-[#FF6900] font-medium'
                    : 'text-[#666] hover:text-[#1A1A18]'
                }`}
              >
                <ChevronRight
                  className={`h-3 w-3 shrink-0 mt-0.5 transition-transform ${
                    isActive
                      ? 'text-[#FF6900] translate-x-0.5'
                      : 'text-[#ccc] group-hover:text-[#888]'
                  }`}
                />
                <span className="line-clamp-2">{h.text}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
