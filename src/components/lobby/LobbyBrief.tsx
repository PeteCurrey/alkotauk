'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LobbyBrief() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#141416] text-white border-b border-[#222]">
      <div className="mx-auto max-w-4xl text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block font-light font-mono">
          Chapter 10 // Intelligence Dispatch
        </span>

        <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
          The Lobby Brief.
        </h2>

        <p className="text-sm sm:text-base text-[#aaa] max-w-xl mx-auto leading-relaxed font-normal">
          The weekly briefing on UK wash bay environmental regulations, Schedule 80 engineering research, biosecurity updates, and industrial cleaning innovations. Delivered to your inbox every Thursday.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500 text-emerald-300 px-6 py-4 text-xs font-mono">
            <CheckCircle2 className="h-4 w-4" />
            <span>You are subscribed to The Lobby Brief. Verification confirmed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your professional email..."
              required
              className="w-full bg-[#0D0D0E] border border-white/20 text-white placeholder-[#666] text-xs px-4 py-3.5 focus:outline-none focus:border-[#FF6900] font-normal"
            />
            <button
              type="submit"
              className="bg-[#FF6900] hover:bg-white hover:text-black text-white px-6 py-3.5 text-xs uppercase tracking-widest transition-all font-normal whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#666] font-mono">
          Zero marketing spam. Professional intelligence and technical analysis only. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
