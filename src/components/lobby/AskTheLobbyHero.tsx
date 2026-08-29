'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Cpu,
  Flame,
  Copy,
  Check,
  RotateCcw,
  Layers,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_QUESTIONS = [
  'Can wash bay runoff enter a surface water drain?',
  'What is Schedule 80 coil construction and why does it resist thermal shock?',
  'What pressure and flow rate is needed for agricultural machinery?',
  'What are the Environment Agency requirements for Class 1 oil interceptors?',
  'When should I choose 140°C dry steam instead of 250 bar hot water?',
  'How does an automated aqueous parts washer eliminate VOC solvent waste?'
];

const PROMPT_CHIPS = [
  { label: 'Regulations', query: 'What are the UK Environment Agency rules for wash bay drainage?' },
  { label: 'Machine Selection', query: 'How do I choose between cold water, hot water, and steam pressure washers?' },
  { label: 'Coil Metallurgy', query: 'What is ASTM A53 Schedule 80 steel and why is it used in heating coils?' },
  { label: 'Wash Bay Design', query: 'What are the drainage and interceptor requirements for a commercial wash bay?' },
  { label: 'Steam vs Hot Water', query: 'What is the thermodynamic difference between 140°C steam and hot water?' },
  { label: 'Aqueous Parts Washers', query: 'How do aqueous parts washers comply with UK VOC and waste regulations?' }
];

interface AskSource {
  name: string;
  url: string;
}

interface RelatedArticle {
  title: string;
  href: string;
}

export default function AskTheLobbyHero() {
  const [question, setQuestion] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<AskSource[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [copied, setCopied] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  // Rotating placeholder cycle
  useEffect(() => {
    if (answer || loading) return;
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % SUGGESTED_QUESTIONS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [answer, loading]);

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = (customQuery || question).trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);
    setRelatedArticles([]);

    try {
      const res = await fetch('/api/lobby/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer.');
      }

      setAnswer(data.answer);
      setSources(data.sources || []);
      setRelatedArticles(data.relatedArticles || []);

      // Smooth scroll to answer
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An error occurred while contacting Ask The Lobby.');
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (queryText: string) => {
    setQuestion(queryText);
    handleSubmit(undefined, queryText);
  };

  const handleCopy = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnswer(null);
    setError(null);
    setQuestion('');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#111111] via-[#161616] to-[#FAFAF8] text-white pt-24 sm:pt-28 pb-20 px-6 sm:px-12 border-b border-[#E5E5E0] overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl w-full">
        {/* Editorial Masthead Top */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#FF6900] text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900] animate-pulse" />
            <span>Industrial Intelligence & Regulatory Platform</span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-5">
            The Lobby.
          </h1>

          <p className="font-normal text-base sm:text-lg text-[#ccc] leading-relaxed max-w-2xl mx-auto">
            Industry intelligence, engineering teardowns, and UK environmental compliance guidance for the professionals who specify, operate, and maintain industrial cleaning systems.
          </p>
        </div>

        {/* ── ASK THE LOBBY AI CENTREPIECE CARD ──────────────────────────── */}
        <div className="bg-[#1C1C1E] border border-white/15 p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-[#FF6900] text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-light uppercase tracking-wider text-white">
                  Ask The Lobby <span className="text-[#FF6900] font-mono text-xs normal-case tracking-normal ml-1.5">// Knowledge Assistant</span>
                </h2>
                <p className="text-[11px] text-[#888] font-normal">
                  Grounded in official UK regulations, British Standards, and Alkota engineering specs.
                </p>
              </div>
            </div>

            {answer && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#999] hover:text-white transition-colors uppercase tracking-wider font-mono bg-transparent border-none cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>New Query</span>
              </button>
            )}
          </div>

          {/* Search Form */}
          <form onSubmit={e => handleSubmit(e)} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={SUGGESTED_QUESTIONS[placeholderIdx]}
                disabled={loading}
                className="w-full bg-[#0D0D0E] border border-white/20 text-white placeholder-[#777] text-sm sm:text-base px-4 sm:px-5 py-4 pr-28 sm:pr-36 focus:outline-none focus:border-[#FF6900] transition-colors font-normal disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="absolute right-2 top-2 bottom-2 bg-[#FF6900] hover:bg-white hover:text-black text-white px-4 sm:px-6 text-xs uppercase tracking-widest transition-all font-normal flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline">Ask</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Prompt Suggestion Chips */}
          {!answer && !loading && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#777] mb-2.5">
                Suggested Technical Inquiries:
              </p>
              <div className="flex flex-wrap gap-2">
                {PROMPT_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChipClick(chip.query)}
                    className="text-xs bg-white/5 hover:bg-white/10 text-[#ccc] hover:text-white px-3 py-1.5 border border-white/10 transition-colors cursor-pointer text-left font-normal"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Animation */}
          {loading && (
            <div className="mt-6 py-8 text-center border-t border-white/10">
              <div className="inline-flex items-center gap-3 text-sm text-[#ccc] font-mono">
                <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-ping" />
                <span>Searching Lobby articles, UK environmental guidelines, and engineering databases...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ── EXPANDED ANSWER CANVAS ────────────────────────────────────── */}
          <AnimatePresence>
            {answer && (
              <motion.div
                ref={answerRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="mt-6 pt-6 border-t border-white/15"
              >
                {/* Answer Toolbar */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3" /> Verified Knowledge Response
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] text-[#aaa] hover:text-white transition-colors uppercase font-mono bg-transparent border-none cursor-pointer"
                  >
                    {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy Answer'}</span>
                  </button>
                </div>

                {/* Markdown Answer Body */}
                <div className="text-sm sm:text-base text-[#e5e5e5] leading-relaxed space-y-4 font-normal whitespace-pre-line">
                  {answer}
                </div>

                {/* Grounding Sources & Citations */}
                {sources.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#888] mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#FF6900]" /> Supporting Citations & Authoritative References:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target={src.url.startsWith('http') ? '_blank' : undefined}
                          rel={src.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 text-xs text-[#FF6900] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/10 no-underline font-normal"
                        >
                          <span>{src.name}</span>
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Lobby Deep Dives */}
                {relatedArticles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-normal">
                    <span className="text-[#888] uppercase font-mono text-[10px] tracking-wider">
                      Recommended Reading:
                    </span>
                    {relatedArticles.map((art, i) => (
                      <Link
                        key={i}
                        href={art.href}
                        className="text-white hover:text-[#FF6900] transition-colors underline underline-offset-4 decoration-[#FF6900]/50"
                      >
                        {art.title} →
                      </Link>
                    ))}
                  </div>
                )}

                {/* Regulatory Disclaimer */}
                <p className="mt-5 text-[10px] text-[#777] font-mono leading-normal border-t border-white/5 pt-3">
                  Disclaimer: AI responses are generated using published UK Environment Agency guidelines, British Standards, and Alkota technical literature. For legal verification or trade effluent consents, always consult your regional sewerage undertaker or a chartered environmental consultant.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
