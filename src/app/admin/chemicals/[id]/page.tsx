import { supabaseAdmin } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ChemicalForm from '../ChemicalForm';
import { getChemicalBySlug, VERIFIED_CHEMICAL_PRODUCTS } from '@/lib/chemicals/seed-data';

export default async function EditChemicalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try ID lookup or slug lookup from DB
  let chemicalData: any = null;
  
  try {
    const { data } = await supabaseAdmin
      .from('chemicals')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();
    if (data) chemicalData = data;
  } catch (e) {
    // ignore
  }

  // Fallback to canonical seed data if DB record is not yet inserted
  if (!chemicalData) {
    const canonical = getChemicalBySlug(id) || VERIFIED_CHEMICAL_PRODUCTS.find(p => p.id === id);
    if (canonical) chemicalData = canonical;
  }

  if (!chemicalData) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/chemicals" className="text-[#666] hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            {chemicalData.name}
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mt-1">
            // Editing chemical record · {chemicalData.code || chemicalData.slug} · UK Status: {chemicalData.uk_status || 'published'}
          </p>
        </div>
      </div>
      <ChemicalForm initial={chemicalData} id={chemicalData.id} />
    </div>
  );
}
