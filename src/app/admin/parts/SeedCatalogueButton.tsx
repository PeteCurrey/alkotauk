'use client';

import { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SeedCatalogueButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function seed() {
    if (!confirm('This will seed/sync all 13 Master Categories, Subcategories, 25+ Brands, 10 Applications, Machine Models, Suppliers, and 120+ Products into Supabase. Continue?')) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/admin/parts/seed-commerce', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setResult(`✓ Synced: ${data.summary?.parts || 0} Parts, ${data.summary?.masterCategories || 0} Categories, ${data.summary?.brands || 0} Brands`);
        router.refresh();
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {result && <span className="font-mono text-[10px] text-green-700 font-semibold">{result}</span>}
      <button
        type="button"
        onClick={seed}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
      >
        <Sparkles className={`h-3.5 w-3.5 text-[#FF6900] ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Seeding Platform...' : 'Seed Commerce Platform'}</span>
      </button>
    </div>
  );
}
