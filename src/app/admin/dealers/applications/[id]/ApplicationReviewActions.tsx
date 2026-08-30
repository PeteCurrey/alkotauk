'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  Copy,
  Check,
  Loader2,
  Shield,
  Send,
} from 'lucide-react';

interface Props {
  applicationId: string;
  currentStatus: string;
  convertedDealerId?: string | null;
  primaryUserEmail?: string;
  invitationToken?: string | null;
}

export default function ApplicationReviewActions({
  applicationId,
  currentStatus,
  convertedDealerId,
  primaryUserEmail,
  invitationToken,
}: Props) {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<'approve' | 'request_info' | 'reject' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [tier, setTier] = useState('standard');
  const [accountManager, setAccountManager] = useState('');
  const [creditTerms, setCreditTerms] = useState('proforma');
  const [creditLimit, setCreditLimit] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [moreInfoMessage, setMoreInfoMessage] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Resulting invitation URL after approve
  const [createdInviteUrl, setCreatedInviteUrl] = useState(
    invitationToken ? `${typeof window !== 'undefined' ? window.location.origin : ''}/dealer/invite/${invitationToken}` : ''
  );

  async function handleAction(action: 'approve' | 'request_info' | 'reject' | 'mark_under_review') {
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      let body: any = { action, reviewer: 'Alkota Admin' };

      if (action === 'approve') {
        body = {
          ...body,
          tier,
          account_manager: accountManager,
          credit_terms: creditTerms,
          credit_limit: creditLimit,
          admin_notes: adminNotes,
        };
      } else if (action === 'request_info') {
        if (!moreInfoMessage.trim()) {
          throw new Error('Please enter the information required from the applicant.');
        }
        body = { ...body, message: moreInfoMessage };
      } else if (action === 'reject') {
        if (!rejectionReason.trim()) {
          throw new Error('Please specify the reason for rejecting this application.');
        }
        body = { ...body, reason: rejectionReason };
      }

      const res = await fetch(`/api/admin/dealer-applications/${applicationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Action failed');
      }

      setSuccessMsg(data.message || 'Action completed successfully.');
      if (data.invitationUrl) {
        const fullUrl = `${window.location.origin}${data.invitationUrl}`;
        setCreatedInviteUrl(fullUrl);
      }

      setActiveModal(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const isApproved = currentStatus === 'approved';
  const isRejected = currentStatus === 'rejected';

  return (
    <div className="border border-[#222] bg-[#0E0E0E] p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-[#222] pb-3">
        <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
          Review &amp; Decision
        </span>
        <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase">
          Status: {currentStatus}
        </span>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-xs font-ibm-plex-mono flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 text-emerald-300 text-xs font-ibm-plex-mono flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Prominent Action Buttons */}
      {!isApproved && !isRejected && (
        <div className="space-y-2.5">
          <button
            onClick={() => setActiveModal('approve')}
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-ibm-plex-mono text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Approve Dealer &amp; Issue Invite</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveModal('request_info')}
              disabled={loading}
              className="py-2.5 px-3 border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-ibm-plex-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Request Info</span>
            </button>

            <button
              onClick={() => setActiveModal('reject')}
              disabled={loading}
              className="py-2.5 px-3 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-ibm-plex-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 transition-colors"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Reject</span>
            </button>
          </div>

          {currentStatus === 'pending' && (
            <button
              onClick={() => handleAction('mark_under_review')}
              disabled={loading}
              className="w-full py-2 border border-[#333] hover:border-[#555] text-[#888] hover:text-white font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-colors"
            >
              Mark as Under Review
            </button>
          )}
        </div>
      )}

      {/* Approved State: Invitation Link Display */}
      {isApproved && (
        <div className="bg-[#141414] border border-[#222] p-4 space-y-3 font-ibm-plex-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="h-4 w-4" />
            <span>Dealer Approved &amp; Active</span>
          </div>
          <p className="text-[11px] text-[#aaa]">
            Primary user invitation assigned to: <strong className="text-white">{primaryUserEmail}</strong>
          </p>

          {createdInviteUrl && (
            <div className="space-y-1.5 pt-2 border-t border-[#222]">
              <span className="text-[9px] uppercase text-[#777] block">Dealer Invitation Link</span>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  readOnly
                  value={createdInviteUrl}
                  className="bg-[#0A0A0A] border border-[#333] px-2.5 py-1.5 text-[10px] text-[#ccc] w-full font-ibm-plex-mono"
                />
                <button
                  onClick={() => copyToClipboard(createdInviteUrl)}
                  className="bg-alkota-orange text-white px-3 py-1.5 text-[10px] font-bold uppercase shrink-0 flex items-center gap-1 hover:bg-alkota-orange-hover transition-colors"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejected State */}
      {isRejected && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 font-ibm-plex-mono text-xs text-red-300">
          <div className="flex items-center gap-2 font-bold mb-1">
            <XCircle className="h-4 w-4" />
            <span>Application Rejected</span>
          </div>
          <p className="text-[11px] text-red-200/80">
            This application has been formally declined. No dealer organisation was created.
          </p>
        </div>
      )}

      {/* ─── MODAL: APPROVE DEALER ─────────────────────────────── */}
      {activeModal === 'approve' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-5 font-ibm-plex-mono text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-white uppercase text-sm">Approve Dealer Partnership</span>
              <button onClick={() => setActiveModal(null)} className="text-[#666] hover:text-white">✕</button>
            </div>

            <p className="text-[#aaa] text-xs font-inter leading-relaxed">
              Approving this application will create a new live Dealer Organisation in the Alkota UK system, provision the primary dealer account, and generate a secure activation link.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  Assigned Dealer Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-alkota-orange"
                >
                  <option value="standard">Standard Partner</option>
                  <option value="silver">Silver Partner</option>
                  <option value="gold">Gold Partner</option>
                  <option value="platinum">Platinum Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  Credit Terms
                </label>
                <select
                  value={creditTerms}
                  onChange={(e) => setCreditTerms(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-alkota-orange"
                >
                  <option value="proforma">Proforma / Pre-payment</option>
                  <option value="14_days">14 Days Net</option>
                  <option value="30_days">30 Days Net</option>
                  <option value="60_days">60 Days Net</option>
                  <option value="account">Approved Credit Account</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  Credit Limit (£) (Optional)
                </label>
                <input
                  type="number"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-alkota-orange"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  Assigned Alkota Account Manager (Optional)
                </label>
                <input
                  type="text"
                  value={accountManager}
                  onChange={(e) => setAccountManager(e.target.value)}
                  placeholder="e.g. David Harrison"
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-alkota-orange"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  Internal Approval Notes (Optional)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Internal notes regarding terms, territory boundaries, etc."
                  rows={3}
                  className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-alkota-orange resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-[#333] text-[#aaa] hover:text-white uppercase text-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('approve')}
                disabled={loading}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[10px] flex items-center gap-1.5"
              >
                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>Confirm &amp; Provision Dealer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: REQUEST MORE INFORMATION ─────────────────────── */}
      {activeModal === 'request_info' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-5 font-ibm-plex-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-purple-300 uppercase text-sm">Request More Information</span>
              <button onClick={() => setActiveModal(null)} className="text-[#666] hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                Explanation Message to Applicant
              </label>
              <textarea
                value={moreInfoMessage}
                onChange={(e) => setMoreInfoMessage(e.target.value)}
                placeholder="Specify the additional documents or clarifications required (e.g. proof of liability insurance, mobile fleet confirmation)..."
                rows={4}
                required
                className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-[#333] text-[#aaa] hover:text-white uppercase text-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('request_info')}
                disabled={loading}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase text-[10px] flex items-center gap-1.5"
              >
                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>Submit Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: REJECT APPLICATION ─────────────────────────── */}
      {activeModal === 'reject' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] w-full max-w-lg p-6 space-y-5 font-ibm-plex-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="font-bold text-red-400 uppercase text-sm">Reject Dealer Application</span>
              <button onClick={() => setActiveModal(null)} className="text-[#666] hover:text-white">✕</button>
            </div>

            <p className="text-[#aaa] text-xs font-inter leading-relaxed">
              This action will mark the application as rejected. Please provide an explicit reason for the record.
            </p>

            <div>
              <label className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Existing territory distributor conflict, insufficient service workshop facilities..."
                rows={4}
                required
                className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 text-white outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-[#333] text-[#aaa] hover:text-white uppercase text-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('reject')}
                disabled={loading}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-[10px] flex items-center gap-1.5"
              >
                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>Confirm Rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
