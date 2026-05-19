import { supabaseAdmin } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import IndustryForm from '../IndustryForm';

export default async function EditIndustryPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ slug?: string; name?: string }>;
}) {
  const { id } = await params;
  const { slug, name } = await searchParams;

  // New page via "Create" from the list — id would be "new"
  if (id === 'new') {
    return (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/industries" className="text-[#555] hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">{name || 'New Industry Page'}</h1>
            <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Creating industry page · {slug}</p>
          </div>
        </div>
        <IndustryForm initial={{ slug: slug || '', name: name || '' }} />
      </div>
    );
  }

  const { data } = await supabaseAdmin.from('industry_pages').select('*').eq('id', id).single();
  if (!data) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/industries" className="text-[#555] hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">{data.name}</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Editing industry page · {data.slug}</p>
        </div>
      </div>
      <IndustryForm initial={data} id={id} />
    </div>
  );
}
