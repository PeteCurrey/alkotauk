import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Download, Image as ImageIcon, FileText, Share2, Printer } from 'lucide-react';

export default async function MarketingHub() {
  const session = await auth();
  if (!session) redirect('/portal/login');

  const assets = [
    { title: 'Full Fleet Catalogue 2024', type: 'PDF', size: '12MB', category: 'Catalogues' },
    { title: 'Alkota UK Brand Guidelines', type: 'PDF', size: '4.5MB', category: 'Branding' },
    { title: 'High-Res Logo Pack (Vector)', type: 'ZIP', size: '22MB', category: 'Logos' },
    { title: 'Elite Series Social Media Kit', type: 'ZIP', size: '115MB', category: 'Social' },
    { title: 'Machine Spec Sheets (All Models)', type: 'PDF', size: '8MB', category: 'Technical' },
    { title: 'Approved Dealer Window Decals', type: 'AI/PDF', size: '15MB', category: 'Signage' },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 border-b border-alkota-iron pb-12">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            MARKETING <span className="text-alkota-orange">HUB.</span>
          </h1>
          <p className="mt-4 text-xl text-alkota-silver max-w-2xl italic leading-relaxed">
            Access high-resolution assets, official brochures, and promotional materials to help grow your Alkota sales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.title} className="group border border-alkota-iron bg-alkota-steel/20 p-8 hover:border-alkota-orange transition-all">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-alkota-orange/10 text-alkota-orange">
                  {asset.category === 'Catalogues' && <FileText className="h-6 w-6" />}
                  {asset.category === 'Branding' && <Printer className="h-6 w-6" />}
                  {asset.category === 'Logos' && <ImageIcon className="h-6 w-6" />}
                  {asset.category === 'Social' && <Share2 className="h-6 w-6" />}
                  {!['Catalogues', 'Branding', 'Logos', 'Social'].includes(asset.category) && <Download className="h-6 w-6" />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-alkota-steel">
                  {asset.type} | {asset.size}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white group-hover:text-alkota-orange transition-colors">
                {asset.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-alkota-silver mb-6">
                Category: {asset.category}
              </p>
              <button className="flex w-full items-center justify-center gap-2 border border-alkota-iron py-3 text-[10px] font-black uppercase tracking-widest text-alkota-steel hover:bg-alkota-orange hover:text-white transition-all">
                Download Now <Download className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Request Section */}
        <div className="mt-16 border border-alkota-orange/20 bg-alkota-orange/5 p-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-black uppercase italic text-white italic tracking-tight">Need something bespoke?</h2>
          <p className="text-alkota-silver mb-8 leading-relaxed">
            Dedicated design support is available for showroom signage, vehicle livery, or custom marketing campaigns. Contact our media team for professional assistance.
          </p>
          <a href="mailto:media@alkota.co.uk" className="inline-block bg-alkota-orange px-10 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-all">
            Request Design Support
          </a>
        </div>
      </div>
    </main>
  );
}
