import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { BookOpen, FileText, Download, Filter, Search, FileCode, Shield } from 'lucide-react';
import { getDealerResources } from '@/lib/dealer-portal';
import type { DealerPortalTier } from '@/lib/types/dealer-portal';

export default async function DealerResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const tier = (user.tier as DealerPortalTier) || 'standard';
  const { category: selectedCategory, q: searchQuery } = await searchParams;

  const resources = await getDealerResources({
    tier,
    category: selectedCategory,
    search: searchQuery,
    limit: 50,
  });

  const categories = [
    { key: 'all', label: 'All Documents' },
    { key: 'manuals', label: 'Operator Manuals' },
    { key: 'product_specs', label: 'Specification Sheets' },
    { key: 'engineering', label: 'Technical Drawings' },
    { key: 'chemicals', label: 'Chemical & SDS' },
    { key: 'parts', label: 'Parts Diagrams' },
    { key: 'marketing', label: 'Marketing Assets' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Technical Documentation
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Resource Centre
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Download operator manuals, engineering schematics, SDS compliance sheets, and marketing brochures.
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 border-b border-[#E8E8E4] pb-3 overflow-x-auto text-xs">
        {categories.map((c) => {
          const isActive = (!selectedCategory && c.key === 'all') || selectedCategory === c.key;
          return (
            <a
              key={c.key}
              href={c.key === 'all' ? '/dealer/resources' : `/dealer/resources?category=${c.key}`}
              className={`px-3.5 py-1.5 whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-alkota-orange text-white'
                  : 'bg-white border border-[#E8E8E4] text-alkota-silver hover:text-alkota-black'
              }`}
            >
              {c.label}
            </a>
          );
        })}
      </div>

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <div className="bg-white border border-[#E8E8E4] p-16 text-center">
          <BookOpen className="h-10 w-10 text-alkota-iron mx-auto mb-3" />
          <h3 className="text-base font-light text-alkota-black mb-1">No Documents Available</h3>
          <p className="text-xs text-alkota-silver max-w-sm mx-auto">
            {selectedCategory
              ? `No documentation files currently match the selected filter.`
              : 'Technical documentation is being published to your dealer library.'}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="bg-white border border-[#E8E8E4] p-5 flex flex-col justify-between hover:border-alkota-orange transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-alkota-silver">
                    {res.category.replace('_', ' ')}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#FAF9F5] border border-[#E8E8E4] text-alkota-silver">
                    {res.document_type}
                  </span>
                </div>
                <h3 className="text-sm font-light text-alkota-black mb-1">{res.title}</h3>
                {res.product_name && (
                  <p className="text-xs text-alkota-orange mb-2">{res.product_name}</p>
                )}
                {res.version && (
                  <p className="text-[10px] text-alkota-silver">Version {res.version}</p>
                )}
              </div>

              <div className="pt-4 border-t border-[#E8E8E4] mt-4 flex items-center justify-between">
                <span className="text-[10px] text-alkota-silver">
                  {res.file_size_kb ? `${(res.file_size_kb / 1024).toFixed(1)} MB` : 'PDF'}
                </span>
                <a
                  href={res.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-alkota-orange hover:underline font-medium"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
