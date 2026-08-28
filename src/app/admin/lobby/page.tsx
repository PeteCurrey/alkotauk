import Link from 'next/link';
import { getLobbyArticles, getLobbyCategories, LobbyArticle } from '@/lib/lobby';
import { Plus, Edit, ExternalLink, CheckCircle2, XCircle, FileText, Sparkles } from 'lucide-react';

export default async function AdminLobbyPage() {
  const [articles, categories] = await Promise.all([
    getLobbyArticles(),
    getLobbyCategories(),
  ]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            The Lobby CMS
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {articles.length} research paper{articles.length !== 1 ? 's' : ''} & briefings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/lobby"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white transition-colors"
          >
            <span>Live Hub</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#FF6900]" />
          </Link>
        </div>
      </div>

      {/* Categories breakdown cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category_slug === cat.slug).length;
          return (
            <div key={cat.slug} className="border border-[#222] bg-[#0E0E0E] p-4">
              <p className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase font-bold">
                {cat.badge_label || cat.name}
              </p>
              <h3 className="font-barlow-condensed text-2xl font-black text-white mt-1">
                {cat.name}
              </h3>
              <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-2">
                {count} Published
              </p>
            </div>
          );
        })}
      </div>

      {/* Articles Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
            All Research Papers
          </span>
          <span className="font-ibm-plex-mono text-[9px] text-[#666]">
            Showing {articles.length} total
          </span>
        </div>

        <div className="divide-y divide-[#1A1A1A]">
          {articles.map((article) => (
            <div
              key={article.id}
              className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111] transition-colors"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5">
                    {article.category?.name || article.category_slug}
                  </span>
                  {article.is_featured && (
                    <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> Featured Lead
                    </span>
                  )}
                  <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                    {article.reading_time_mins} min read
                  </span>
                </div>

                <h3 className="font-barlow-condensed text-xl font-bold text-white leading-tight">
                  {article.title}
                </h3>
                <p className="font-inter text-xs text-[#777] line-clamp-1 mt-1">
                  {article.excerpt}
                </p>
                <p className="font-ibm-plex-mono text-[9px] text-[#555] mt-2">
                  By {article.author?.name || 'Alkota Engineer'} • Slug:{' '}
                  <code className="text-[#888]">/lobby/{article.category_slug}/{article.slug}</code>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/lobby/${article.category_slug}/${article.slug}`}
                  target="_blank"
                  className="flex items-center gap-1.5 border border-[#333] px-3 py-1.5 font-ibm-plex-mono text-[9px] font-bold uppercase tracking-wider text-[#ccc] hover:border-[#FF6900] hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 text-[#FF6900]" />
                  <span>View</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
