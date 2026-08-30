import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Megaphone, Download, Image as ImageIcon, FileText, Layers } from 'lucide-react';

export default async function DealerMarketingPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const assets = [
    { title: 'Alkota UK Brand Guidelines & Vector Logos', type: 'Vector Assets (SVG/EPS/PNG)', size: '14.2 MB', category: 'Brand' },
    { title: '2026 Product Catalogue & Machine Spec Brochure', type: 'High-Res Print PDF', size: '28.5 MB', category: 'Brochure' },
    { title: 'Hydrus Chemical Range Product Summary Leaflet', type: 'Print PDF (A4)', size: '8.1 MB', category: 'Chemical' },
    { title: 'Industrial Hot Water Cleaners — High Res Photography Pack', type: 'ZIP (45 Images)', size: '142 MB', category: 'Imagery' },
    { title: 'Bespoke Trailer Rig Capabilities Presentation', type: 'PowerPoint Deck (PPTX)', size: '32.0 MB', category: 'Sales' },
    { title: 'Dealer Showroom Banner & POS Artwork Templates', type: 'Print Artwork (PDF)', size: '18.4 MB', category: 'POS' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E8E8E4] pb-5">
        <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
          Dealer Assets
        </span>
        <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
          Marketing &amp; Sales Hub
        </h1>
        <p className="text-xs text-alkota-silver mt-1">
          Download high-resolution Alkota brand assets, showroom literature, product photography and customer presentation decks.
        </p>
      </div>

      {/* Assets Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {assets.map((asset) => (
          <div key={asset.title} className="bg-white border border-[#E8E8E4] p-6 flex flex-col justify-between hover:border-alkota-orange transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[9px] uppercase tracking-widest text-alkota-orange">
                  {asset.category}
                </span>
                <span className="text-[10px] text-alkota-silver">{asset.size}</span>
              </div>
              <h3 className="text-base font-light text-alkota-black mb-1">{asset.title}</h3>
              <p className="text-xs text-alkota-silver mb-4">{asset.type}</p>
            </div>

            <div className="pt-4 border-t border-[#E8E8E4]">
              <button
                className="w-full inline-flex items-center justify-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white py-2.5 text-[10px] uppercase tracking-widest transition-colors"
                onClick={() => alert(`Downloading ${asset.title}`)}
              >
                <Download className="h-3 w-3" />
                <span>Download Asset Pack</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
