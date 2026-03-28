'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/portal';
  const error = searchParams.get('error');

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);

    try {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setLocalError('Invalid email or password. Please try again.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setLocalError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-alkota-iron bg-alkota-steel/30 p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
          DEALER <span className="text-alkota-orange">PORTAL.</span>
        </h1>
        <p className="mt-2 text-sm text-alkota-silver font-bold uppercase tracking-widest">
          Authorized Access Only
        </p>
      </div>

      {(error || localError) && (
        <div className="mb-6 flex items-center gap-3 border border-alkota-orange/30 bg-alkota-orange/10 p-4 text-sm text-alkota-orange">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{localError || 'Authentication failed. Please check your credentials.'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-alkota-steel mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-alkota-iron" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-alkota-black border border-alkota-iron pl-10 pr-4 py-3 text-sm text-white focus:border-alkota-orange focus:outline-none transition-colors"
              placeholder="name@company.co.uk"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-alkota-steel mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-alkota-iron" />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-alkota-black border border-alkota-iron pl-10 pr-4 py-3 text-sm text-white focus:border-alkota-orange focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 bg-alkota-orange py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-alkota-orange-bright disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            'Log In to Portal'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-alkota-iron text-center">
        <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest">
          Forgotten your credentials?
        </p>
        <a href="mailto:support@alkota.co.uk" className="mt-1 block text-xs text-secondary hover:text-white transition-colors">
          Contact Dealer Support
        </a>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-md px-6">
        <Suspense fallback={
          <div className="border border-alkota-iron bg-alkota-steel/30 p-20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-alkota-orange" />
          </div>
        }>
          <LoginContent />
        </Suspense>

        {/* Demo Credentials Tip */}
        <div className="mt-8 rounded border border-alkota-orange/20 bg-alkota-orange/5 p-4">
           <p className="text-[10px] font-bold uppercase tracking-widest text-alkota-orange mb-2">Demo Credentials:</p>
           <p className="text-xs text-alkota-silver">Email: <span className="text-white">demo@alkota-dealer.co.uk</span></p>
           <p className="text-xs text-alkota-silver">Password: <span className="text-white">DealerPass1!</span></p>
        </div>
      </div>
    </main>
  );
}

