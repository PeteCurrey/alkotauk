'use client';

import { useState } from 'react';
import { Check, X, CheckCircle2 } from 'lucide-react';

interface AIReviewCardActionsProps {
  decisionId: string;
  initialApproved?: boolean | null;
}

export default function AIReviewCardActions({ decisionId, initialApproved }: AIReviewCardActionsProps) {
  const [approved, setApproved] = useState<boolean | null>(initialApproved ?? null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (isApproved: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/ai/decisions/${decisionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ human_approved: isApproved, overridden: !isApproved }),
      });
      if (res.ok) {
        setApproved(isApproved);
      }
    } finally {
      setLoading(false);
    }
  };

  if (approved === true) {
    return (
      <div className="flex items-center gap-2 text-xs font-bold text-green-700 pt-2 border-t border-[#F1F3F7]">
        <CheckCircle2 className="w-4 h-4" />
        <span>Verified & Approved</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 pt-3 border-t border-[#F1F3F7]">
      <button
        type="button"
        onClick={() => handleAction(true)}
        disabled={loading}
        className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
      >
        <Check className="w-3.5 h-3.5" />
        Approve AI Decision
      </button>

      <button
        type="button"
        onClick={() => handleAction(false)}
        disabled={loading}
        className="px-4 py-2 bg-[#F1F3F7] hover:bg-red-50 text-[#64748B] hover:text-red-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
      >
        <X className="w-3.5 h-3.5" />
        Reject / Override
      </button>
    </div>
  );
}
