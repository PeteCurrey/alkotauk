'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Logo className="h-10 text-white" />
        </div>

        <div className="mb-10 text-center">
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white tracking-tight">
            Alkota UK Admin
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mt-2">
            // Secure administrative access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@alkota.co.uk"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
            />
          </div>

          {error && (
            <div className="border border-red-900/50 bg-red-950/30 px-4 py-3">
              <p className="font-ibm-plex-mono text-[10px] text-red-400 uppercase tracking-wider">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6900] text-white py-4 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#e55f00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6"
          >
            {loading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>Sign In →</>
            )}
          </button>
        </form>

        <p className="text-center font-ibm-plex-mono text-[9px] text-[#444] uppercase tracking-widest mt-8">
          Alkota UK • Restricted Access
        </p>
      </div>
    </div>
  );
}
