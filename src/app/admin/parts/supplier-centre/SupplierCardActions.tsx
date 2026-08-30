'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefreshCw, Play, Settings, Check, AlertCircle } from 'lucide-react';

interface SupplierCardActionsProps {
  supplier: {
    id: string;
    slug: string;
    name: string;
    integration_method?: string;
  };
}

export default function SupplierCardActions({ supplier }: SupplierCardActionsProps) {
  const router = useRouter();
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/suppliers/${supplier.id}/test`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.testResult?.success) {
        setMessage({ type: 'success', text: data.testResult.message });
      } else {
        const errorMsg = data.testResult?.missingRequirements?.join(', ') || data.testResult?.message || data.error || 'Test failed';
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setTesting(false);
    }
  };

  const handleTriggerSync = async () => {
    if (!confirm(`Trigger live ingestion sync for ${supplier.name}?`)) return;
    setSyncing(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/suppliers/${supplier.id}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggerMethod: 'manual' }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `✓ Sync complete: ${data.stagedCount || 0} products staged.` });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: `Sync failed: ${data.error}` });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-3 pt-4 border-t border-[#E2E4E8]">
      {message && (
        <div
          className={`p-2.5 rounded text-xs font-mono flex items-start gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <Check className="w-3.5 h-3.5 shrink-0 text-green-600 mt-0.5" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600 mt-0.5" />}
          <span className="leading-snug">{message.text}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleTestConnection}
          disabled={testing}
          className="flex-1 py-2 px-3 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
          <span>{testing ? 'Testing...' : 'Test'}</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerSync}
          disabled={syncing}
          className="flex-1 py-2 px-3 bg-black hover:bg-[#222] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Play className={`w-3 h-3 text-[#FF6900] ${syncing ? 'animate-pulse' : ''}`} />
          <span>{syncing ? 'Syncing...' : 'Sync'}</span>
        </button>

        <Link
          href={`/admin/parts/supplier-centre/${supplier.slug}`}
          className="p-2 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] rounded-lg transition-colors"
          title="Configure Supplier Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
