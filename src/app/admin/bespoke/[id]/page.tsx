import { supabaseAdmin } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BespokeForm from '../BespokeForm';

export default async function EditBespokePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from('bespoke_builds').select('*').eq('id', id).single();
  if (!data) notFound();
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/bespoke" className="text-[#555] hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">{data.name}</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Editing {data.build_type} · {data.slug}</p>
        </div>
      </div>
      <BespokeForm initial={data} id={id} />
    </div>
  );
}
