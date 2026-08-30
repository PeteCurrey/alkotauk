'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-[#EBECEF] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[32px] border border-[#E2E4E8] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        {/* Emblem & Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#FF6900] text-white flex items-center justify-center font-black text-xl shadow-md mb-4">
            A
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Alkota Studio
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Commercial equipment control and store management suite
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2 pl-1">
              Operator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@alkota.co.uk"
              className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-full text-[#0F172A] px-5 py-3 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#FF6900] transition-colors placeholder:text-[#94A3B8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2 pl-1">
              Access Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-full text-[#0F172A] px-5 py-3 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#FF6900] transition-colors pr-12 placeholder:text-[#94A3B8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors focus:outline-none p-1"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6900] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#e55f00] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-md shadow-orange-500/20"
          >
            {loading ? (
              <span className="animate-pulse">Authorizing Session...</span>
            ) : (
              <>Sign In to Studio →</>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-[#94A3B8] font-medium mt-8">
          Alkota UK • Authorised Commercial Personnel Only
        </p>
      </div>
    </div>
  );
}
