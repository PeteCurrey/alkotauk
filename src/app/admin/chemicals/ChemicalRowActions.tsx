'use client';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ChemicalRowActions({ chemical }: { chemical: any }) {
  const router = useRouter();
  async function remove() {
    if (!confirm('Deactivate this chemical?')) return;
    await fetch(`/api/admin/chemicals/${chemical.id}`, { method: 'DELETE' });
    router.refresh();
  }
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/chemicals/${chemical.id}/edit`} className="p-1.5 text-[#555] hover:text-white transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
      <button onClick={remove} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}
