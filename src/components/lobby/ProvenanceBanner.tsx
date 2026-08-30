import { ShieldCheck, History, Sparkles, ExternalLink } from 'lucide-react';
import { LobbyArticle } from '@/lib/lobby';

interface Props {
  article: LobbyArticle;
}

export default function ProvenanceBanner({ article }: Props) {
  const isAdapted = article.provenance_type === 'us_adapted';
  const isHeritage = article.provenance_type === 'archive_heritage';
  const isOriginal = article.provenance_type === 'uk_original' || !article.provenance_type;

  return (
    <div className="border border-[#E5E5E0] bg-[#F7F7F4] p-4 sm:p-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {isAdapted && <Sparkles className="h-4 w-4 text-[#FF6900]" />}
            {isHeritage && <History className="h-4 w-4 text-purple-600" />}
            {isOriginal && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1A18]">
                {isAdapted
                  ? 'UK Editorial Adaptation'
                  : isHeritage
                  ? 'Alkota Engineering Archive'
                  : 'UK Engineering Publication'}
              </span>
              {article.uk_reviewed_by && (
                <span className="hidden sm:inline bg-[#1A1A18] text-white text-[9px] font-mono px-2 py-0.5">
                  Verified UK Standard
                </span>
              )}
            </div>
            <p className="font-normal text-xs text-[#555] mt-1 leading-relaxed">
              {article.attribution_notice ||
                (isAdapted
                  ? 'Originally published by Alkota Cleaning Systems. Adapted for UK industrial operating environments, metric specifications, and environmental regulations.'
                  : isHeritage
                  ? 'Historical manufacturing and metallurgy archive from Alkota Cleaning Systems (Alcester, South Dakota).'
                  : 'Original engineering research published by Alkota UK technical applications team.')}
            </p>
            {article.uk_reviewed_by && (
              <p className="font-mono text-[10px] text-[#777] mt-1.5">
                Technical Reviewer: <span className="text-[#1A1A18] font-medium">{article.uk_reviewed_by}</span>
              </p>
            )}
          </div>
        </div>

        {article.original_source_url && (
          <a
            href={article.original_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#666] hover:text-[#FF6900] shrink-0 no-underline transition-colors border border-[#E0E0DC] bg-white px-2.5 py-1"
          >
            <span>Original Archive Source</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
