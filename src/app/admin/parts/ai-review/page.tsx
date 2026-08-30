import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Bot, 
  Layers,
  History,
  Check,
  X
} from 'lucide-react';
import AIReviewCardActions from './AIReviewCardActions';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ task?: string; status?: string }>;
}

export default async function AdminAIReviewQueuePage({ searchParams }: PageProps) {
  const { task, status } = await searchParams;

  let query = supabaseAdmin
    .from('ai_decision_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (task && task !== 'all') query = query.eq('task_type', task);
  if (status === 'approved') query = query.eq('human_approved', true);
  else if (status === 'pending') query = query.is('human_approved', null);

  const { data: dbDecisions } = await query;
  const decisions = (dbDecisions || []) as any[];

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">AI Catalogue Review Queue</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Auditable AI Decision Review & Confidence Queue
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl">
              Inspect all autonomous AI suggestions (category classification, brand recognition, duplicate matches, and attribute extraction) with explicit human-in-the-loop approval.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
            <Bot className="w-4 h-4 text-[#FF6900]" />
            <span>OpenAI GPT-4o-mini Intelligence</span>
          </div>
        </div>
      </div>

      {/* ── DECISIONS LIST ── */}
      <div className="space-y-4">
        {decisions.length === 0 ? (
          <div className="bg-white border border-[#E2E4E8] rounded-xl p-12 text-center text-[#94A3B8] space-y-3">
            <Sparkles className="w-8 h-8 text-[#FF6900] mx-auto" />
            <div className="font-bold text-[#0F172A]">No AI decisions pending review.</div>
            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              When supplier syncs run or products are classified, AI decisions will appear here with confidence scores and evidence reasoning.
            </p>
          </div>
        ) : (
          decisions.map((decision) => (
            <div
              key={decision.id}
              className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm hover:border-[#CBD5E1] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F3F7]">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase rounded">
                    {decision.task_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">
                    Model: {decision.model} · {new Date(decision.created_at).toLocaleString('en-GB')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded border text-xs font-mono font-bold ${
                      decision.confidence >= 0.95
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : decision.confidence >= 0.80
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {Math.round(decision.confidence * 100)}% Confidence
                  </span>

                  {decision.human_approved === true && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                      <CheckCircle2 className="w-3 h-3" />
                      Approved by Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-[#64748B] font-bold uppercase text-[10px] block mb-1">
                    Input Source Summary:
                  </span>
                  <p className="font-mono text-[#0F172A] bg-[#F8FAFC] p-3 rounded border border-[#E2E4E8]">
                    {decision.input_summary}
                  </p>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold uppercase text-[10px] block mb-1">
                    AI Output & Evidence:
                  </span>
                  <pre className="font-mono text-[#0F172A] bg-[#F8FAFC] p-3 rounded border border-[#E2E4E8] overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(decision.result, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Human Approval Action */}
              <AIReviewCardActions decisionId={decision.id} initialApproved={decision.human_approved} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
