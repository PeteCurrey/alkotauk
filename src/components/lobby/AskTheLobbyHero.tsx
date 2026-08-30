'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_QUESTIONS = [
  'Ask about industrial cleaning, equipment selection, water treatment, regulations or technical applications...',
  'Can wash bay runoff enter a surface water drain?',
  'What is Schedule 80 coil construction and why does it resist thermal shock?',
  'When should I choose 140°C dry steam instead of 250 bar hot water?',
  'How do aqueous parts washers comply with UK VOC and waste regulations?',
  'What are the Environment Agency requirements for Class 1 oil interceptors?'
];

const PROMPT_CHIPS = [
  { label: 'Hot water or cold water?', query: 'How do I choose between cold water, hot water, and steam pressure washers?' },
  { label: 'What does Schedule 80 mean?', query: 'What is ASTM A53 Schedule 80 seamless steel tubing and why is it used in Alkota coils?' },
  { label: 'Can wash water enter a surface drain?', query: 'Can commercial vehicle wash bay runoff enter a surface water drain under UK regulations?' },
  { label: 'Which Alkota suits fleet washing?', query: 'Which Alkota pressure washer model is best suited for heavy haulage fleet washing?' },
  { label: 'How does water recovery work?', query: 'How do closed-loop wash water recycling systems and oil interceptors work in a commercial wash bay?' }
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
  const [mode, setMode] = useState<'quick' | 'deep'>('quick');
  const answerRef = useRef<HTMLDivElement>(null);

  // Rotating placeholder cycle
  useEffect(() => {
    if (answer || loading) return;
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % SUGGESTED_QUESTIONS.length);
    }, 5000);
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
    <section id="ask-the-lobby" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* ── FULL-SCREEN HERO BACKGROUND IMAGE (APPROVED — PRESERVED) ───────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/lobby/lobby-hero-craftsman.jpg"
          alt="Alkota craftsman at the workshop — The Lobby industrial intelligence platform"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Multi-layer overlay: dark at top for header legibility, balanced for white card contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
      </div>

      {/* ── MASTHEAD — top-centre branding ────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-28 sm:pt-32 px-6 sm:px-12 text-center">
        {/* Editorial badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[#FF6900] text-[11px] font-mono uppercase tracking-[0.25em] mb-4 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900] animate-pulse" />
          <span>Industrial Intelligence &amp; Regulatory Platform</span>
        </div>

        <h1 className="font-extralight text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.92] mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          The Lobby.
        </h1>

        <p className="font-normal text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          Industry intelligence, engineering teardowns, and UK environmental compliance guidance for the professionals who specify, operate, and maintain industrial cleaning systems.
        </p>
      </div>

      {/* ── ASK THE LOBBY WHITE PANEL — prominent focal point ─────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-10 sm:pb-14 pt-4">
        <div className="mx-auto max-w-3xl">
          {/* WHITE PANEL */}
          <div className="bg-white text-[#1A1A18] shadow-2xl border border-black/10 rounded-xl p-5 sm:p-7 transition-all overflow-hidden">
            {/* Input Form Row */}
            <form onSubmit={e => handleSubmit(e)}>
              <div className="flex items-center gap-3.5 mb-4">
                <Search className="h-5 w-5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder={SUGGESTED_QUESTIONS[placeholderIdx]}
                  disabled={loading}
                  aria-label="Ask about industrial cleaning, regulations or engineering specs"
                  className="w-full bg-transparent text-[#1A1A18] placeholder-neutral-400 text-sm sm:text-base font-normal focus:outline-none border-none p-0 selection:bg-[#FF6900] selection:text-white disabled:opacity-50"
                />
              </div>

              {/* Lower Utility Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3.5 border-t border-neutral-100 text-xs gap-3">
                {/* Left: Mode Tabs */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setMode('quick')}
                    className={`pb-1 text-xs uppercase tracking-wider font-normal transition-colors cursor-pointer border-none bg-transparent ${
                      mode === 'quick'
                        ? 'text-[#FF6900] border-b-2 border-[#FF6900] font-medium'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Quick Ask
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('deep')}
                    className={`pb-1 text-xs uppercase tracking-wider font-normal transition-colors cursor-pointer border-none bg-transparent flex items-center gap-1.5 ${
                      mode === 'deep'
                        ? 'text-[#FF6900] border-b-2 border-[#FF6900] font-medium'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Deep Research</span>
                  </button>
                </div>

                {/* Right: Submit Button & Shortcut */}
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="hidden md:inline text-[11px] font-mono text-neutral-400">
                    Enter ↵ to submit
                  </span>
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-[#FF6900] hover:text-white text-neutral-800 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium rounded-md transition-all cursor-pointer border border-neutral-200 hover:border-[#FF6900] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="inline-block h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Ask The Lobby</span>
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Loading State */}
            {loading && (
              <div className="mt-5 py-6 text-center border-t border-neutral-100 bg-neutral-50 rounded-lg p-4">
                <div className="inline-flex items-center gap-3 text-xs text-neutral-600 font-mono">
                  <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-ping" />
                  <span>Searching Lobby intelligence, British Standards &amp; Alkota technical archives...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* ── EXPANDED ANSWER CANVAS ────────────────────────────────────── */}
            <AnimatePresence>
              {answer && (
                <motion.div
                  ref={answerRef}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 pt-5 border-t border-neutral-200 bg-neutral-50/70 rounded-lg p-5"
                >
                  {/* Answer Toolbar */}
                  <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-neutral-200/80">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified Knowledge Response
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-black transition-colors uppercase font-mono bg-transparent border-none cursor-pointer"
                      >
                        {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-black transition-colors uppercase font-mono bg-transparent border-none cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Markdown Answer Body */}
                  <div className="text-sm text-neutral-800 leading-relaxed space-y-3 font-normal whitespace-pre-line">
                    {answer}
                  </div>

                  {/* Grounding Sources & Citations */}
                  {sources.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-neutral-200">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#FF6900]" /> Authoritative References:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target={src.url.startsWith('http') ? '_blank' : undefined}
                            rel={src.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-[#FF6900] transition-colors bg-white px-2.5 py-1 border border-neutral-200 no-underline font-normal shadow-2xs"
                          >
                            <span>{src.name}</span>
                            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Lobby Articles */}
                  {relatedArticles.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-3 text-xs font-normal">
                      <span className="text-neutral-500 uppercase font-mono text-[10px] tracking-wider">
                        Deep Dive:
                      </span>
                      {relatedArticles.map((art, i) => (
                        <Link
                          key={i}
                          href={art.href}
                          className="text-neutral-900 hover:text-[#FF6900] transition-colors underline underline-offset-4"
                        >
                          {art.title} →
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Trust / Regulatory Disclaimer */}
                  <p className="mt-4 text-[10px] text-neutral-400 font-mono leading-normal border-t border-neutral-200 pt-2.5">
                    Grounded in official UK Environment Agency rules, British Standards (BS EN 858), and Alkota engineering literature.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── PROMPT SUGGESTION PILLS BENEATH WHITE PANEL ─────────────────── */}
          {!answer && !loading && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 mr-1">
                Ask about:
              </span>
              {PROMPT_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip.query)}
                  className="text-xs bg-black/50 hover:bg-black/80 text-white/80 hover:text-white px-3 py-1.5 border border-white/20 hover:border-white/50 rounded-full transition-all cursor-pointer font-normal backdrop-blur-sm"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Scroll Indicator */}
          {!answer && (
            <div className="mt-5 flex justify-center">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1 text-white/30"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest">Explore editorial dispatches</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
