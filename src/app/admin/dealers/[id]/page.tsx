import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  ArrowLeft,
  Building2,
  Users,
  ShieldCheck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import DealerAdminControls from './DealerAdminControls';

export const revalidate = 0;

export default async function AdminDealerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: dealer } = await supabaseAdmin
    .from('dealers')
    .select('*')
    .eq('id', id)
    .single();

  if (!dealer) {
    notFound();
  }

  const [usersRes, ordersRes, auditRes] = await Promise.all([
    supabaseAdmin.from('dealer_users').select('*').eq('dealer_id', id).order('created_at'),
    supabaseAdmin.from('orders').select('*').eq('dealer_id', id).order('created_at', { ascending: false }).limit(10),
    supabaseAdmin.from('dealer_audit_log').select('*').eq('dealer_id', id).order('created_at', { ascending: false }).limit(25),
  ]);

  const users = usersRes.data || [];
  const orders = ordersRes.data || [];
  const auditLogs = auditRes.data || [];

  const isSuspended = !!dealer.suspended_at || !dealer.portal_active;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/dealers"
              className="text-[#888] hover:text-white flex items-center gap-1 font-ibm-plex-mono text-[10px] uppercase transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Dealers</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-barlow-condensed text-4xl font-black uppercase text-white tracking-tight">
              {dealer.name}
            </h1>
            <span
              className={`font-ibm-plex-mono text-[9px] px-2.5 py-1 uppercase font-bold border ${
                isSuspended
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {isSuspended ? 'Portal Suspended' : 'Portal Active'}
            </span>
          </div>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            Tier: <strong className="text-alkota-orange">{(dealer.portal_tier || 'standard').toUpperCase()}</strong> · ID: {dealer.id}
          </p>
        </div>

        <Link
          href={`/dealers/${dealer.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 border border-[#333] px-4 py-2 text-xs font-ibm-plex-mono uppercase text-[#ccc] hover:text-white hover:border-alkota-orange transition-colors"
        >
          <span>Public Directory Page</span>
          <ExternalLink className="h-3 w-3 text-alkota-orange" />
        </Link>
      </div>

      {/* Suspension Alert */}
      {isSuspended && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 flex items-start gap-3 text-red-300 font-ibm-plex-mono text-xs">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase text-red-400">Account Suspended</p>
            <p className="mt-0.5 text-red-200/80">
              Reason: {dealer.suspension_reason || 'Administrative hold placed.'}
            </p>
          </div>
        </div>
      )}

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Org Commercial Overview */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Commercial &amp; Organisation Details
              </span>
              <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                Approved by {dealer.approved_by || 'Admin'}
              </span>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Portal Tier</span>
                <p className="text-alkota-orange font-bold mt-0.5 capitalize">{dealer.portal_tier || 'standard'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Credit Terms</span>
                <p className="text-white mt-0.5 uppercase">{(dealer.credit_terms || 'proforma').replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Credit Limit</span>
                <p className="text-white mt-0.5">{dealer.credit_limit ? `£${Number(dealer.credit_limit).toLocaleString()}` : 'None Set'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Account Manager</span>
                <p className="text-white mt-0.5">{dealer.account_manager || 'Unassigned'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Company Reg / VAT</span>
                <p className="text-[#ccc] mt-0.5">{dealer.company_reg || '—'} / {dealer.vat_number || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Mobile Service Vans</span>
                <p className="text-white mt-0.5">{dealer.mobile_service_vans || 1} Fleet</p>
              </div>
              <div className="sm:col-span-3 pt-2 border-t border-[#1A1A1A]">
                <span className="text-[9px] text-[#666] uppercase block">Address &amp; Contact</span>
                <p className="text-[#ccc] mt-0.5">
                  {[dealer.address_line1, dealer.town, dealer.postcode, dealer.phone, dealer.email].filter(Boolean).join(' · ')}
                </p>
              </div>
              {dealer.internal_notes && (
                <div className="sm:col-span-3 pt-2">
                  <span className="text-[9px] text-[#666] uppercase block">Internal Notes</span>
                  <p className="text-[#aaa] bg-[#141414] p-3 border border-[#222] text-[11px] mt-1">
                    {dealer.internal_notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dealer Users / Team Members */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Dealer User Accounts ({users.length})
              </span>
            </div>
            {users.length === 0 ? (
              <div className="p-8 text-center text-[#666] font-ibm-plex-mono text-xs">
                No user accounts provisioned yet.
              </div>
            ) : (
              <div className="divide-y divide-[#1A1A1A]">
                {users.map((u) => (
                  <div key={u.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-ibm-plex-mono text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">
                          {[u.first_name, u.last_name].filter(Boolean).join(' ') || u.email}
                        </span>
                        <span className="text-[9px] bg-alkota-orange/10 border border-alkota-orange/20 text-alkota-orange px-2 py-0.5 uppercase">
                          {u.role}
                        </span>
                        {!u.password_hash && u.invitation_token && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5">
                            Invite Pending
                          </span>
                        )}
                      </div>
                      <p className="text-[#888] text-[11px] mt-0.5">
                        {u.email} {u.phone ? `· ${u.phone}` : ''} {u.job_title ? `(${u.job_title})` : ''}
                      </p>
                    </div>
                    <div className="text-right text-[10px] text-[#666]">
                      {u.last_login_at ? (
                        <span>Last login: {new Date(u.last_login_at).toLocaleDateString('en-GB')}</span>
                      ) : (
                        <span>Invited: {new Date(u.invited_at || u.created_at).toLocaleDateString('en-GB')}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders History */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Dealer Orders ({orders.length})
              </span>
            </div>
            {orders.length === 0 ? (
              <div className="p-8 text-center text-[#666] font-ibm-plex-mono text-xs">
                No orders placed yet by this dealer.
              </div>
            ) : (
              <div className="divide-y divide-[#1A1A1A]">
                {orders.map((ord: any) => (
                  <div key={ord.id} className="p-4 flex items-center justify-between font-ibm-plex-mono text-xs">
                    <div>
                      <span className="font-bold text-white">{ord.order_number}</span>
                      <p className="text-[#888] text-[10px]">
                        {new Date(ord.created_at).toLocaleDateString('en-GB')} {ord.po_number ? `· PO: ${ord.po_number}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] uppercase px-2 py-0.5 bg-[#222] text-[#ccc]">
                        {ord.status}
                      </span>
                      <span className="text-alkota-orange font-bold">£{(ord.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Controls & Audit */}
        <div className="space-y-6">
          <DealerAdminControls dealerId={dealer.id} dealer={dealer} users={users} />

          {/* Audit Log */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-5 py-3 flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Dealer Audit Log
              </span>
              <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                Immutable
              </span>
            </div>
            <div className="p-4 space-y-3 font-ibm-plex-mono text-xs max-h-96 overflow-y-auto">
              {auditLogs.length > 0 ? (
                auditLogs.map((log: any) => (
                  <div key={log.id} className="border-l-2 border-alkota-orange pl-3 py-1 text-[11px]">
                    <div className="flex items-center justify-between text-[#777] text-[9px]">
                      <span className="uppercase text-alkota-orange">{log.action.replace(/_/g, ' ')}</span>
                      <span>{new Date(log.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                    <p className="text-white mt-0.5">By {log.actor_id || 'System'}</p>
                    {log.metadata && (
                      <p className="text-[#888] text-[9px] mt-0.5 truncate">
                        {JSON.stringify(log.metadata)}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-[#666] text-xs">
                  No audit events recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
