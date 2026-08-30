'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Building2,
} from 'lucide-react';

export default function DealerInviteAcceptPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState('');

  // Form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    async function verifyToken() {
      try {
        const res = await fetch(`/api/dealer/invite?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Invalid invitation link');
        }
        setInviteData(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setPhone(data.phone || '');
      } catch (err: any) {
        setError(err.message || 'Unable to verify invitation link.');
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/dealer/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          first_name: firstName,
          last_name: lastName,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Activation failed');

      router.push('/dealer/login?activated=true');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during account setup.');
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-alkota-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-alkota-silver font-ibm-plex-mono">Verifying invitation credentials…</p>
        </div>
      </div>
    );
  }

  if (error && !inviteData) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col">
        <div className="px-6 py-4 border-b border-[#E8E8E4] bg-white">
          <Link href="/dealer" className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-alkota-black flex items-center justify-center">
              <span className="text-alkota-orange text-xs">A</span>
            </div>
            <span className="text-xs text-alkota-black">ALKOTA <span className="text-alkota-orange">UK</span></span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full bg-white border border-red-200 p-8 text-center space-y-4">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
            <h1 className="text-2xl font-extralight text-alkota-black">Invitation Invalid or Expired</h1>
            <p className="text-xs text-alkota-silver leading-relaxed">{error}</p>
            <Link
              href="/dealer/login"
              className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
            >
              Go to Dealer Login <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col">
      {/* Header */}
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
        <Link href="/dealer/login" className="text-[10px] uppercase tracking-widest text-alkota-silver hover:text-alkota-orange">
          Already Active? Log In →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Brand Welcome Banner */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-alkota-orange mb-2">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-[10px] uppercase tracking-widest font-ibm-plex-mono">
                Authorised Dealer Onboarding
              </span>
            </div>
            <h1 className="text-3xl font-extralight text-alkota-black tracking-tight mb-2">
              Activate Dealer Account
            </h1>
            <p className="text-xs text-alkota-silver">
              Welcome to Alkota UK. Set your credentials to access the operating portal for{' '}
              <strong className="text-alkota-black">{inviteData.companyName}</strong>.
            </p>
          </div>

          {/* Org details strip */}
          <div className="bg-white border border-[#E8E8E4] p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-alkota-black flex items-center justify-center text-alkota-orange">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-light text-alkota-black">{inviteData.companyName}</p>
                <p className="text-[10px] text-alkota-silver">{inviteData.email} · {inviteData.role.toUpperCase()}</p>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-widest bg-alkota-orange/10 text-alkota-orange border border-alkota-orange/30 px-2 py-0.5">
              {inviteData.tier} Tier
            </span>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* Setup Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E4] p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Stewart"
                  className="w-full bg-white border border-[#E8E8E4] px-3.5 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Smith"
                  className="w-full bg-white border border-[#E8E8E4] px-3.5 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                Contact Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01234 567890"
                className="w-full bg-white border border-[#E8E8E4] px-3.5 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange"
              />
            </div>

            <div className="pt-2 border-t border-[#E8E8E4] space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                  Create Password (min. 8 characters)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#E8E8E4] px-3.5 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-alkota-silver mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#E8E8E4] px-3.5 py-2.5 text-sm text-alkota-black outline-none focus:border-alkota-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-alkota-orange hover:bg-alkota-orange-hover text-white py-3 text-xs uppercase tracking-widest font-normal transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Activating Account…
                </>
              ) : (
                <>
                  Activate Account &amp; Access Portal
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
