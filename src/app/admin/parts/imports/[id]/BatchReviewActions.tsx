'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Layers, AlertCircle, RefreshCw } from 'lucide-react';

interface BatchReviewActionsProps {
  batchId: string;
  stagedId?: string;
  matchedPartId?: string | null;
  mode: 'single' | 'batch_new';
  supplierName: string;
}

export default function BatchReviewActions({
  batchId,
  stagedId,
  matchedPartId,
  mode,
  supplierName,
}: BatchReviewActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleApproveBatchNew = async () => {
    if (!confirm(`Approve and promote all validated new products from ${supplierName} to live catalogue?`)) {
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/parts/staging/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_batch_new', batch_id: batchId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to batch approve');
      setStatus(`✓ Approved ${data.approved_count} products`);
      router.refresh();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleAction = async (action: 'approve' | 'merge' | 'reject') => {
    if (!stagedId) return;
    setLoading(true);
    try {
      const payload: any = { action, staged_id: stagedId, batch_id: batchId };
      if (action === 'merge' && matchedPartId) {
        payload.target_part_id = matchedPartId;
      }

      const res = await fetch('/api/admin/parts/staging/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Action ${action} failed`);
      router.refresh();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'batch_new') {
    return (
      <div className="flex items-center gap-3">
        {status && <span className="text-xs font-mono text-emerald-600 font-bold">{status}</span>}
        <button
          onClick={handleApproveBatchNew}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <Check className="w-3.5 h-3.5" />
          {loading ? 'Approving...' : 'Approve All Valid New Products'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={() => handleSingleAction('approve')}
        disabled={loading}
        title="Approve & Promote to Catalogue"
        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
      >
        Approve
      </button>

      {matchedPartId && (
        <button
          onClick={() => handleSingleAction('merge')}
          disabled={loading}
          title="Merge with Existing Canonical Part"
          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          Merge
        </button>
      )}

      <button
        onClick={() => handleSingleAction('reject')}
        disabled={loading}
        title="Reject Staged Record"
        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
