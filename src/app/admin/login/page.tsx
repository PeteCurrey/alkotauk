'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="flex justify-center mb-12">
          <Logo className="h-10 text-white" />
        </div>

        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6900]/10 border border-[#FF6900]/30 mb-6">
            <Lock className="h-5 w-5 text-[#FF6900]" />
          </div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white tracking-tight">
            Alkota UK Admin
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mt-2">
            // Restricted access — authorised personnel only
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
              autoComplete="email"
              placeholder="admin@alkota.co.uk"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••••"
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#FF6900] transition-colors focus:outline-none p-1"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
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
          Alkota UK • Secure Admin Portal
        </p>
      </div>
    </div>
  );
}
