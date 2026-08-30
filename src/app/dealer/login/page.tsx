'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dealer/dashboard';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    errorParam === 'CredentialsSignin' ? 'Invalid email or password. Please try again.' : ''
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email address and password.');
      return;
    }
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password. Please check your credentials and try again.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col">

      {/* Top bar */}
      <div className="px-6 py-4 border-b border-[#E8E8E4] bg-white flex items-center justify-between">
        <Link href="/dealer" className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-alkota-black flex items-center justify-center">
            <span className="text-alkota-orange text-xs">A</span>
          </div>
          <div>
            <span className="text-xs text-alkota-black">ALKOTA <span className="text-alkota-orange">UK</span></span>
            <p className="text-[10px] text-alkota-silver uppercase tracking-widest leading-none">Dealer Portal</p>
          </div>
        </Link>
        <Link
          href="/dealer/request"
          className="text-[10px] uppercase tracking-widest text-alkota-silver hover:text-alkota-orange transition-colors"
        >
          Apply for Dealership →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-10">
            <div className="h-12 w-12 bg-alkota-black flex items-center justify-center mb-6">
              <Lock className="h-5 w-5 text-alkota-orange" />
            </div>
            <h1 className="text-3xl font-extralight text-alkota-black tracking-tight mb-2">
              Dealer Login
            </h1>
            <p className="text-sm text-alkota-silver">
              Access your Alkota UK dealer account.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourcompany.co.uk"
                autoComplete="email"
                required
                className="w-full bg-white border border-[#E8E8E4] px-4 py-3 text-sm text-alkota-black placeholder-alkota-iron outline-none focus:border-alkota-orange transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] uppercase tracking-widest text-alkota-silver">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] text-alkota-silver hover:text-alkota-orange transition-colors"
                  onClick={() => {/* TODO: password reset flow */}}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your portal password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white border border-[#E8E8E4] px-4 py-3 pr-10 text-sm text-alkota-black placeholder-alkota-iron outline-none focus:border-alkota-orange transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-alkota-silver hover:text-alkota-black"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-alkota-orange hover:bg-alkota-orange-hover text-white py-3.5 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 border border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In to Dealer Portal
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E8E8E4]" />
            <span className="text-[10px] uppercase tracking-widest text-alkota-iron">or</span>
            <div className="flex-1 h-px bg-[#E8E8E4]" />
          </div>

          {/* New dealer CTA */}
          <div className="text-center">
            <p className="text-xs text-alkota-silver mb-3">Not yet an authorised dealer?</p>
            <Link
              href="/dealer/request"
              className="inline-flex items-center gap-2 border border-alkota-black text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black hover:text-white transition-colors"
            >
              Apply for Dealership <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Help */}
          <div className="mt-10 pt-6 border-t border-[#E8E8E4] text-center">
            <p className="text-xs text-alkota-silver mb-1">
              Having trouble logging in?
            </p>
            <a
              href="mailto:dealer@alkota.co.uk"
              className="text-xs text-alkota-orange hover:underline"
            >
              Contact dealer support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DealerLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-alkota-orange border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
