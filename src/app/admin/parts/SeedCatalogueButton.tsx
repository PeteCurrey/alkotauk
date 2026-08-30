'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SeedCatalogueButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSeed = async () => {
    if (!confirm('This will upsert and sync the complete Parts & Attachments catalogue (Alkota OEM + Mosmatic + Cox Reels + Steel Eagle + Dual Pumps) into Supabase. Continue?')) {
      return;
    }

    setLoading(true);
    setStatusMessage('Seeding catalogue items into database...');
    setIsError(false);

    try {
      const res = await fetch('/api/admin/parts/seed-v2', {
        method: 'POST',
      });
      const data = await res.json();

      if (res.ok) {
        setStatusMessage(`Successfully seeded ${data.seeded || 0} components.`);
        setIsError(false);
        router.refresh();
      } else {
        setIsError(true);
        setStatusMessage(data.error || 'Seeding failed.');
      }
    } catch (err: any) {
      setIsError(true);
      setStatusMessage('Network error during seeding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {statusMessage && (
        <span className={`font-ibm-plex-mono text-[10px] flex items-center gap-1 ${isError ? 'text-red-400' : 'text-green-400'}`}>
          {isError ? <AlertCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
          {statusMessage}
        </span>
      )}

      <button
        type="button"
        onClick={handleSeed}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#333] text-[#CCC] hover:text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-alkota-orange transition-colors disabled:opacity-50 cursor-pointer"
        title="Sync full partner & OEM catalogue"
      >
        <RefreshCw className={`h-3 w-3 text-alkota-orange ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Seeding...' : 'Seed Catalogue'}</span>
      </button>
    </div>
  );
}
