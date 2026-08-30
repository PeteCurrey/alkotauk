'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface BrandRowActionsProps {
  brand: {
    id: string;
    slug: string;
    name: string;
  };
}

export default function BrandRowActions({ brand }: BrandRowActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete brand partner "${brand.name}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/parts/brands/${brand.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete brand');
      }
    } catch {
      alert('Network error while deleting brand');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="p-1 text-[#666] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
        title="Delete Brand Partner"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
