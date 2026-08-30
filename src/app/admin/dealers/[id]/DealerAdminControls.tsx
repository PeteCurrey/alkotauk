'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

interface Props {
  dealerId: string;
  dealer: any;
  users: any[];
}

export default function DealerAdminControls({ dealerId, dealer, users }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals
  const [activeModal, setActiveModal] = useState<'suspend' | 'terms' | 'invite' | null>(null);

  // Suspend
  const [suspendReason, setSuspendReason] = useState('');

  // Terms
  const [portalTier, setPortalTier] = useState(dealer.portal_tier || 'standard');
  const [creditTerms, setCreditTerms] = useState(dealer.credit_terms || 'proforma');
  const [creditLimit, setCreditLimit] = useState(dealer.credit_limit ? String(dealer.credit_limit) : '');
  const [accountManager, setAccountManager] = useState(dealer.account_manager || '');
  const [internalNotes, setInternalNotes] = useState(dealer.internal_notes || '');

  // Invite User
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('sales');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');
  const [inviteJobTitle, setInviteJobTitle] = useState('');
  const [createdInviteLink, setCreatedInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleAction(action: string, payload: any = {}) {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/dealers/${dealerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');

      setSuccess(data.message || 'Operation succeeded.');
      if (data.invitationUrl) {
        setCreatedInviteLink(`${window.location.origin}${data.invitationUrl}`);
      } else {
        setActiveModal(null);
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const isSuspended = !!dealer.suspended_at || !dealer.portal_active;

  return (
    <div className="space-y-4 font-ibm-plex-mono text-xs">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 text-emerald-300">
          {success}
        </div>
      )}

      {/* Action Buttons Panel */}
      <div className="border border-[#222] bg-[#0E0E0E] p-5 space-y-3">
        <span className="font-bold text-white uppercase text-[10px] tracking-widest block border-b border-[#222] pb-2">
          Dealer Management Actions
        </span>

        <button
          onClick={() => setActiveModal('terms')}
          className="w-full py-2.5 px-3 bg-[#191919] hover:bg-[#252525] border border-[#333] text-white font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
        >
          <Shield className="h-3.5 w-3.5 text-alkota-orange" />
          <span>Update Tier &amp; Commercial Terms</span>
        </button>

        <button
          onClick={() => setActiveModal('invite')}
          className="w-full py-2.5 px-3 bg-[#191919] hover:bg-[#252525] border border-[#333] text-white font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
        >
          <UserPlus className="h-3.5 w-3.5 text-alkota-orange" />
          <span>Invite New Dealer User</span>
        </button>

        {isSuspended ? (
          <button
            onClick={() => handleAction('reactivate')}
            disabled={loading}
            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Reactivate Dealer Account</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveModal('suspend')}
            className="w-full py-2.5 px-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-300 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
            <span>Suspend Dealer Account</span>
          </button>
        )}
      </div>

      {/* ─── MODAL: UPDATE TERMS ──────────────────────────────── */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-4 font-ibm-plex-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-white uppercase">Update Terms &amp; Tier</span>
              <button onClick={() => setActiveModal(null)} className="text-[#666] hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase text-[#888] mb-1">Portal Partner Tier</label>
                <select
                  value={portalTier}
                  onChange={(e) => setPortalTier(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                >
                  <option value="standard">Standard Partner</option>
                  <option value="silver">Silver Partner</option>
                  <option value="gold">Gold Partner</option>
                  <option value="platinum">Platinum Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase text-[#888] mb-1">Credit Terms</label>
                <select
                  value={creditTerms}
                  onChange={(e) => setCreditTerms(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                >
                  <option value="proforma">Proforma</option>
                  <option value="14_days">14 Days</option>
                  <option value="30_days">30 Days</option>
                  <option value="60_days">60 Days</option>
                  <option value="account">Account</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase text-[#888] mb-1">Credit Limit (£)</label>
                <input
                  type="number"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase text-[#888] mb-1">Account Manager</label>
                <input
                  type="text"
                  value={accountManager}
                  onChange={(e) => setAccountManager(e.target.value)}
                  placeholder="e.g. David Harrison"
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase text-[#888] mb-1">Internal Notes</label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#222]">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[#888] hover:text-white uppercase text-[10px]">
                Cancel
              </button>
              <button
                onClick={() => handleAction('update_terms', { portal_tier: portalTier, credit_terms: creditTerms, credit_limit: creditLimit, account_manager: accountManager, internal_notes: internalNotes })}
                disabled={loading}
                className="px-5 py-2 bg-alkota-orange text-white font-bold uppercase text-[10px]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: SUSPEND ───────────────────────────────────── */}
      {activeModal === 'suspend' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-4 font-ibm-plex-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-red-400 uppercase">Suspend Dealer Portal Access</span>
              <button onClick={() => setActiveModal(null)} className="text-[#666] hover:text-white">✕</button>
            </div>

            <p className="text-[#aaa] font-inter text-xs leading-relaxed">
              Suspended dealers cannot log into the portal, place orders, or access restricted resources. Historical orders and records remain intact for admin audit.
            </p>

            <div>
              <label className="block text-[9px] uppercase text-[#888] mb-1">Reason for Suspension</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="e.g. Overdue credit account balance, territory reorganisation..."
                rows={3}
                required
                className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#222]">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[#888] hover:text-white uppercase text-[10px]">
                Cancel
              </button>
              <button
                onClick={() => handleAction('suspend', { reason: suspendReason })}
                disabled={loading || !suspendReason.trim()}
                className="px-5 py-2 bg-red-600 text-white font-bold uppercase text-[10px]"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: INVITE USER ───────────────────────────────── */}
      {activeModal === 'invite' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-4 font-ibm-plex-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-white uppercase">Invite Dealer User</span>
              <button onClick={() => { setActiveModal(null); setCreatedInviteLink(''); }} className="text-[#666] hover:text-white">✕</button>
            </div>

            {createdInviteLink ? (
              <div className="space-y-3 bg-[#191919] p-4 border border-[#333]">
                <p className="text-emerald-400 font-bold">User Invited Successfully</p>
                <p className="text-[#aaa] text-[11px]">Send this activation link to the user:</p>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    readOnly
                    value={createdInviteLink}
                    className="bg-[#0A0A0A] border border-[#444] px-2 py-1.5 text-[10px] text-white w-full"
                  />
                  <button
                    onClick={() => copyText(createdInviteLink)}
                    className="bg-alkota-orange text-white px-3 py-1.5 text-[10px] uppercase font-bold shrink-0"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-[#888] mb-1">First Name</label>
                    <input
                      type="text"
                      value={inviteFirstName}
                      onChange={(e) => setInviteFirstName(e.target.value)}
                      placeholder="Stewart"
                      className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#888] mb-1">Last Name</label>
                    <input
                      type="text"
                      value={inviteLastName}
                      onChange={(e) => setInviteLastName(e.target.value)}
                      placeholder="Smith"
                      className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase text-[#888] mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="stewart@dealer.co.uk"
                    required
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-[#888] mb-1">Role</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                    >
                      <option value="owner">Dealer Owner (Full Access)</option>
                      <option value="manager">Dealer Manager (Operational)</option>
                      <option value="sales">Sales (Pricing &amp; Catalog)</option>
                      <option value="parts">Parts (Ordering &amp; Stock)</option>
                      <option value="service">Service (Technical &amp; Manuals)</option>
                      <option value="accounts">Accounts (Invoices &amp; Orders)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#888] mb-1">Job Title</label>
                    <input
                      type="text"
                      value={inviteJobTitle}
                      onChange={(e) => setInviteJobTitle(e.target.value)}
                      placeholder="e.g. Service Tech"
                      className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#222]">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[#888] hover:text-white uppercase text-[10px]">
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAction('invite_user', { email: inviteEmail, role: inviteRole, first_name: inviteFirstName, last_name: inviteLastName, job_title: inviteJobTitle })}
                    disabled={loading || !inviteEmail.trim()}
                    className="px-5 py-2 bg-alkota-orange text-white font-bold uppercase text-[10px]"
                  >
                    Generate Invite
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
