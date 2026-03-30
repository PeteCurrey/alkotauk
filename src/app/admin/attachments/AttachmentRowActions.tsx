'use client';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
export default function AttachmentRowActions({ attachment }: { attachment: any }) {
  const router = useRouter();
  async function remove() {
    if (!confirm('Deactivate this attachment?')) return;
    await fetch(`/api/admin/attachments/${attachment.id}`, { method: 'DELETE' });
    router.refresh();
  }
  return (
    <div className="flex gap-2">
      <Link href={`/admin/attachments/${attachment.id}/edit`} className="p-1.5 text-[#555] hover:text-white transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
      <button onClick={remove} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}
