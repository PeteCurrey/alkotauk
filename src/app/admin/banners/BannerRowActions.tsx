'use client';

import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function BannerRowActions({ banner }: { banner: any }) {
  const router = useRouter();

  async function deleteBanner() {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/admin/banners/${banner.id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/banners/${banner.id}/edit`} className="p-1.5 text-[#555] hover:text-white transition-colors">
        <Edit className="h-3.5 w-3.5" />
      </Link>
      <button onClick={deleteBanner} className="p-1.5 text-[#555] hover:text-red-400 transition-colors">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
