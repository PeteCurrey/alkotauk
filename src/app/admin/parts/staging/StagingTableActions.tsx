'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  AlertTriangle, 
  Merge, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

interface StagingTableActionsProps {
  items: any[];
  suppliers: { id: string; name: string; slug: string }[];
}

export default function StagingTableActions({ items, suppliers }: StagingTableActionsProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) setSelectedIds([]);
    else setSelectedIds(items.map(i => i.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/staging/${id}/approve`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`✓ Published item to live parts catalogue`);
        router.refresh();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Reject this staged product?')) return;
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/staging/${id}/reject`, { method: 'POST' });
      if (res.ok) {
        setFeedback(`✓ Marked as rejected`);
        router.refresh();
      }
    } finally {
      setProcessingId(null);
    }
  };

  const handleBulkAction = async (action: 'approve' | 'reject') => {
    if (selectedIds.length === 0) return;
    if (!confirm(`${action === 'approve' ? 'Approve and publish' : 'Reject'} ${selectedIds.length} selected items?`)) return;

    setBulkProcessing(true);
    try {
      const res = await fetch('/api/admin/staging/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ids: selectedIds }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`✓ Successfully processed ${data.processed} items.`);
        setSelectedIds([]);
        router.refresh();
      }
    } finally {
      setBulkProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── BULK ACTIONS STRIP ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-[#475569] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.length > 0 && selectedIds.length === items.length}
              onChange={toggleSelectAll}
              className="rounded border-[#CBD5E1] text-[#FF6900] focus:ring-0"
            />
            <span>Select All ({items.length})</span>
          </label>

          {selectedIds.length > 0 && (
            <span className="text-xs text-[#64748B] font-mono">
              ({selectedIds.length} selected)
            </span>
          )}
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleBulkAction('approve')}
              disabled={bulkProcessing}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              Bulk Approve & Publish
            </button>
            <button
              type="button"
              onClick={() => handleBulkAction('reject')}
              disabled={bulkProcessing}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <XCircle className="w-3.5 h-3.5" />
              Bulk Reject
            </button>
          </div>
        )}

        {feedback && (
          <span className="text-xs font-mono text-green-700 font-semibold">{feedback}</span>
        )}
      </div>

      {/* ── TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3.5 px-4">Supplier & SKU</th>
                <th className="py-3.5 px-4">Product Title</th>
                <th className="py-3.5 px-4">Cost Price</th>
                <th className="py-3.5 px-4">AI Suggested Category</th>
                <th className="py-3.5 px-4">AI Confidence</th>
                <th className="py-3.5 px-4">Duplicate Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F7]">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#94A3B8]">
                    No staged products in review queue. Use the Supplier Centre to sync new feeds.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  const isProcessing = processingId === item.id;
                  const confidence = item.ai_confidence ?? item.match_confidence ?? 0.85;

                  let confBadgeColor = 'bg-red-50 text-red-700 border-red-200';
                  if (confidence >= 0.95) confBadgeColor = 'bg-green-50 text-green-700 border-green-200';
                  else if (confidence >= 0.80) confBadgeColor = 'bg-amber-50 text-amber-700 border-amber-200';

                  return (
                    <tr key={item.id} className={`hover:bg-[#F8FAFC] transition-colors ${isSelected ? 'bg-amber-50/40' : ''}`}>
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                          className="rounded border-[#CBD5E1] text-[#FF6900] focus:ring-0"
                        />
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#0F172A] block">
                          {item.supplier_sku}
                        </span>
                        <span className="text-[11px] text-[#64748B]">
                          {item.supplier?.name || 'Wholesaler'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate">
                        <div className="font-medium text-[#1E293B]">{item.raw_title}</div>
                        {item.raw_brand && (
                          <span className="text-[10px] text-[#64748B] font-semibold">{item.raw_brand}</span>
                        )}
                        {(item.anomaly_flags || []).length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-red-600 font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            {item.anomaly_flags.join(', ')}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                        £{Number(item.cost_price).toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 bg-[#F1F3F7] rounded text-[11px] font-mono text-[#334155]">
                          {item.ai_category || item.suggested_category || item.raw_category || 'general'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${confBadgeColor}`}>
                          <Sparkles className="w-3 h-3" />
                          {Math.round(confidence * 100)}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {item.import_status === 'matched_duplicate' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                            <Merge className="w-3 h-3" />
                            Duplicate Candidate
                          </span>
                        ) : item.import_status === 'imported' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            Live in Catalogue
                          </span>
                        ) : item.import_status === 'rejected' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700">
                            <XCircle className="w-3 h-3" />
                            Rejected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                            New Product
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {item.import_status !== 'imported' && (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleApprove(item.id)}
                              disabled={isProcessing}
                              className="px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded text-[11px] font-bold transition-colors disabled:opacity-50"
                              title="Approve and promote to canonical catalogue"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(item.id)}
                              disabled={isProcessing}
                              className="p-1.5 bg-[#F1F3F7] hover:bg-red-50 text-[#64748B] hover:text-red-700 rounded transition-colors"
                              title="Reject staged product"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
