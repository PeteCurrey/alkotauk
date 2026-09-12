'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export default function PartsPagination({ currentPage, pageSize, totalCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = Math.min((currentPage - 1) * pageSize + 1, totalCount);
  const to = Math.min(currentPage * pageSize, totalCount);

  function go(page: number) {
    const params = new URLSearchParams(sp.toString());
    params.set('page', String(page));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  if (totalCount <= pageSize && totalPages <= 1) return null;

  // Build page number range: always show first, last, current ±2
  const pages: (number | '…')[] = [];
  const addPage = (n: number) => {
    if (n >= 1 && n <= totalPages) pages.push(n);
  };

  const windowPages = new Set<number>();
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    windowPages.add(i);
  }
  windowPages.add(1);
  windowPages.add(totalPages);

  const sorted = Array.from(windowPages).sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) pages.push('…');
    pages.push(sorted[i]);
  }

  const btnBase =
    'h-8 min-w-[32px] px-2 rounded-[4px] text-xs font-semibold transition-colors flex items-center justify-center';

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-[#E2E4E8] rounded-[6px] px-4 py-3 shadow-tactile-sm ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* Result range label */}
      <span className="text-[11px] text-[#64748B] shrink-0">
        Showing <span className="font-semibold text-[#0F172A]">{from.toLocaleString()}–{to.toLocaleString()}</span> of{' '}
        <span className="font-semibold text-[#0F172A]">{totalCount.toLocaleString()}</span> parts
      </span>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => go(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${btnBase} bg-[#F8FAFC] border border-[#E2E4E8] text-[#64748B] hover:bg-[#F1F3F7] disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-[#94A3B8] text-xs">…</span>
          ) : (
            <button
              key={p}
              onClick={() => go(p as number)}
              className={`${btnBase} ${
                p === currentPage
                  ? 'bg-[#0F172A] text-white border border-[#0F172A]'
                  : 'bg-[#F8FAFC] border border-[#E2E4E8] text-[#475569] hover:bg-[#F1F3F7] hover:text-[#0F172A]'
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => go(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} bg-[#F8FAFC] border border-[#E2E4E8] text-[#64748B] hover:bg-[#F1F3F7] disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
