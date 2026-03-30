'use client';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
export default function PartRowActions({ part }: { part: any }) {
  const router = useRouter();
  async function remove() {
    if (!confirm('Deactivate this part?')) return;
    await fetch(`/api/admin/parts/${part.id}`, { method: 'DELETE' });
    router.refresh();
  }
  return (
    <div className="flex gap-2">
      <Link href={`/admin/parts/${part.id}/edit`} className="p-1.5 text-[#555] hover:text-white transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
      <button onClick={remove} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}
