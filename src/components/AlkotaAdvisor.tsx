'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Wrench, Shield, Circle, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What machine do I need for washing livestock trailers?",
  "What's the difference between hot and cold water machines?",
  "My machine is losing pressure — what should I check?",
  "Which chemical should I use on greasy workshop floors?",
];

const WELCOME_MESSAGE = "Hi, I'm the Alkota Technical Advisor. Tell me what you're cleaning and I'll point you to the right machine, chemical, or solution.";

export default function AlkotaAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasFirstLoad, setHasFirstLoad] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage] 
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to the network right now. Please try again or contact Alkota support directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[520px] overflow-hidden rounded-2xl border border-alkota-iron bg-alkota-black shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-alkota-steel p-6 border-b border-alkota-iron flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase italic tracking-tighter text-white">
                  Alkota Technical Advisor
                </h3>
                <p className="text-[10px] text-alkota-steel uppercase font-bold tracking-widest mt-1">
                  Expert Industrial Support
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-alkota-iron rounded-full transition-colors text-alkota-steel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-alkota-iron scrollbar-track-transparent"
            >
              {/* Initial Welcome */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-sm bg-alkota-orange flex-shrink-0 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                </div>
                <div className="bg-alkota-iron/30 rounded-2xl rounded-tl-none p-4 text-sm text-alkota-silver leading-relaxed">
                  {WELCOME_MESSAGE}
                </div>
              </div>

              {/* Suggested Prompts (only show if no user messages yet) */}
              {messages.length === 0 && (
                <div className="pl-11 space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-alkota-steel font-black mb-3">Quick Starts:</p>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="block w-full text-left p-2.5 rounded-lg border border-alkota-iron bg-alkota-steel/50 text-[10px] font-bold text-white uppercase hover:border-alkota-orange hover:bg-alkota-orange/10 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat History */}
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="h-8 w-8 rounded-sm bg-alkota-orange flex-shrink-0 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-sm bg-alkota-blue flex-shrink-0 flex items-center justify-center">
                        <Circle className="h-4 w-4 text-white fill-white" />
                    </div>
                  )}
                  <div className={`p-4 text-sm leading-relaxed max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-alkota-orange text-white rounded-2xl rounded-tr-none' 
                      : 'bg-alkota-iron/30 text-alkota-silver rounded-2xl rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-sm bg-alkota-orange flex-shrink-0 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-alkota-iron/30 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1.5 w-1.5 rounded-full bg-alkota-steel" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-alkota-steel" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-alkota-steel" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-alkota-steel border-t border-alkota-iron">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a technical question..."
                  className="flex-1 bg-alkota-black border border-alkota-iron rounded-lg py-2.5 px-4 text-xs font-bold text-white placeholder-alkota-steel focus:outline-none focus:border-alkota-orange transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-alkota-orange text-white hover:bg-alkota-orange-bright disabled:opacity-50 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-[8px] text-center text-alkota-steel font-black uppercase tracking-tighter mt-3 opacity-50">
                Powered by Alkota UK Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 rounded-full bg-black border border-alkota-iron px-6 py-4 text-white shadow-xl hover:bg-alkota-steel transition-all"
      >
        <span className="text-[10px] font-black uppercase italic tracking-widest">
            {isOpen ? 'Close Advisor' : 'Ask the Alkota Advisor'}
        </span>
        <div className="relative">
          <Wrench className={`h-4 w-4 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-[-45deg]'}`} />
          {!isOpen && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-alkota-orange rounded-full scale-150 blur-sm -z-10" 
            />
          )}
        </div>
      </motion.button>
    </div>
  );
}
