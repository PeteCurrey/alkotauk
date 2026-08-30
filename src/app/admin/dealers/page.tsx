import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  Building2,
  ExternalLink,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDealersPage() {
  const [dealersRes, usersRes, applicationsRes] = await Promise.all([
    supabaseAdmin.from('dealers').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('dealer_users').select('id, dealer_id, active'),
    supabaseAdmin.from('dealer_applications').select('id, status'),
  ]);

  const dealers = dealersRes.data || [];
  const allUsers = usersRes.data || [];
  const allApps = applicationsRes.data || [];

  const metrics = {
    total: dealers.length,
    activePortal: dealers.filter((d) => d.portal_active && !d.suspended_at).length,
    suspended: dealers.filter((d) => !!d.suspended_at || (d.portal_active === false && d.status === 'inactive')).length,
    pendingApps: allApps.filter((a) => a.status === 'pending' || a.status === 'under_review').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase text-white tracking-tight">
            Dealer Operating Network
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {dealers.length} provisioned organisations &amp; authorised distribution hubs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dealers/applications"
            className="flex items-center gap-2 border border-alkota-orange/40 bg-alkota-orange/10 px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange hover:bg-alkota-orange hover:text-white transition-colors"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Applications ({metrics.pendingApps})</span>
          </Link>
          <Link
            href="/dealers"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white transition-colors"
          >
            <span>Live Locator</span>
            <ExternalLink className="h-3.5 w-3.5 text-alkota-orange" />
          </Link>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-ibm-plex-mono">
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="text-[9px] text-alkota-orange uppercase font-bold">TOTAL HUBS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {metrics.total}
          </h3>
          <p className="text-[10px] text-[#666] mt-1">Network organisations</p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="text-[9px] text-emerald-400 uppercase font-bold">PORTAL ACTIVE</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {metrics.activePortal}
          </h3>
          <p className="text-[10px] text-[#666] mt-1">Operating with portal login</p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="text-[9px] text-amber-400 uppercase font-bold">PENDING APPLICATIONS</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {metrics.pendingApps}
          </h3>
          <p className="text-[10px] text-[#666] mt-1">Awaiting approval</p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="text-[9px] text-red-400 uppercase font-bold">SUSPENDED / INACTIVE</p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {metrics.suspended}
          </h3>
          <p className="text-[10px] text-[#666] mt-1">Hold or decommissioned</p>
        </div>
      </div>

      {/* Dealers Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
            Authorised Dealerships &amp; Operating Accounts
          </span>
          <span className="font-ibm-plex-mono text-[10px] text-[#666]">
            {dealers.length} records
          </span>
        </div>

        <div className="divide-y divide-[#1A1A1A]">
          {dealers.map((dealer) => {
            const userCount = allUsers.filter((u) => u.dealer_id === dealer.id).length;
            const isSuspended = !!dealer.suspended_at;
            const portalActive = dealer.portal_active && !isSuspended;

            return (
              <div
                key={dealer.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#191919] border border-[#333] flex items-center justify-center text-alkota-orange shrink-0">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 uppercase font-bold border ${
                          isSuspended
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : portalActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-[#222] text-[#888] border-[#333]'
                        }`}
                      >
                        {isSuspended ? 'Suspended' : portalActive ? 'Portal Active' : 'Directory Only'}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase font-bold">
                        Tier: {dealer.portal_tier || dealer.tier || 'standard'}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                        {dealer.town}, {dealer.postcode}
                      </span>
                    </div>

                    <h4 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                      {dealer.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 mt-2 font-ibm-plex-mono text-[10px] text-[#888]">
                      <span>📞 {dealer.phone}</span>
                      <span>✉️ {dealer.email}</span>
                      <span>👥 {userCount} User{userCount === 1 ? '' : 's'}</span>
                      <span>💳 Terms: {(dealer.credit_terms || 'proforma').replace(/_/g, ' ')}</span>
                      {dealer.account_manager && <span>👔 AM: {dealer.account_manager}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/admin/dealers/${dealer.id}`}
                    className="flex items-center gap-1.5 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold tracking-widest transition-colors"
                  >
                    <span>Manage Hub</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/dealers/${dealer.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold text-[#aaa] hover:text-white transition-colors"
                  >
                    <span>Public</span>
                    <ExternalLink className="h-3 w-3 text-alkota-orange" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
