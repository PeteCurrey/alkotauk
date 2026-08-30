import { CaseStudyEvidence } from '@/lib/case-studies/types';
import { ShieldCheck, Quote, Camera, CheckCircle2 } from 'lucide-react';

interface Props {
  evidence?: CaseStudyEvidence;
  clientName?: string;
}

export default function CaseStudyEvidencePanel({ evidence, clientName }: Props) {
  if (!evidence) return null;

  const hasQuote = Boolean(evidence.clientQuote);
  const hasImages = Boolean(evidence.installationImages && evidence.installationImages.length > 0);
  const hasResults = Boolean(evidence.measuredResults && evidence.measuredResults.length > 0);

  // If completely empty of customer verification assets, do not render
  if (!hasQuote && !hasImages && !hasResults && !evidence.verificationNotes) {
    return null;
  }

  return (
    <section className="my-16 bg-white p-8 sm:p-12 border border-[#E8E8E4] font-normal">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-normal">
        <ShieldCheck className="h-4 w-4" />
        <span>Verified Customer Evidence & Project Record</span>
      </div>
      <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-6">
        {clientName ? `${clientName} Verification File` : 'Documented Installation Record'}
      </h3>

      {/* Optional Client Quote */}
      {hasQuote && (
        <div className="p-8 bg-[#F8F7F4] border-l-4 border-[#FF6900] mb-8">
          <Quote className="h-6 w-6 text-[#FF6900] mb-3 opacity-60" />
          <p className="text-base sm:text-lg text-alkota-black leading-relaxed italic mb-4">
            "{evidence.clientQuote}"
          </p>
          {evidence.clientQuoteAuthor && (
            <div className="text-xs uppercase tracking-wider text-[#666]">
              <span className="font-medium text-alkota-black">{evidence.clientQuoteAuthor}</span>
              {evidence.clientQuoteRole && <span> · {evidence.clientQuoteRole}</span>}
            </div>
          )}
        </div>
      )}

      {/* Optional Verified Installation Gallery */}
      {hasImages && (
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888] mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Installation Photography</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidence.installationImages?.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] bg-[#EFEFEA] overflow-hidden">
                <img
                  src={img}
                  alt={`${clientName || 'Customer'} Alkota installation ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Meta & Verification Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E8E8E4] text-xs">
        {evidence.projectLocation && (
          <div>
            <span className="text-[#888] uppercase tracking-wider block text-[10px]">Location</span>
            <span className="text-alkota-black font-normal">{evidence.projectLocation}</span>
          </div>
        )}
        {evidence.suppliedBy && (
          <div>
            <span className="text-[#888] uppercase tracking-wider block text-[10px]">Supplied & Supported By</span>
            <span className="text-alkota-black font-normal">{evidence.suppliedBy}</span>
          </div>
        )}
        {evidence.verificationNotes && (
          <div className="sm:col-span-2 text-[#777] italic pt-2">
            {evidence.verificationNotes}
          </div>
        )}
      </div>
    </section>
  );
}
