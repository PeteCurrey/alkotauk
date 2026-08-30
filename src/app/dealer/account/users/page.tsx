import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, ArrowLeft, Shield, Mail, Phone, Clock, UserCheck } from 'lucide-react';
import { getDealerUsers, getDealerOrg } from '@/lib/dealer-portal';

export default async function DealerUsersManagementPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId = user.dealerId;

  const [dealer, users] = await Promise.all([
    dealerId ? getDealerOrg(dealerId) : null,
    dealerId ? getDealerUsers(dealerId) : [],
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dealer/account"
              className="text-xs text-alkota-silver hover:text-alkota-black flex items-center gap-1 uppercase tracking-widest"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Account</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Team &amp; User Accounts
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Authorised user profiles belonging to {dealer?.name || 'your organisation'}.
          </p>
        </div>
      </div>

      {/* Role explanation */}
      <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-4 text-xs text-alkota-silver space-y-1">
        <p className="text-alkota-black font-medium">Role Permissions Architecture:</p>
        <p>• <strong>Owner / Manager</strong>: Full access to ordering, tier pricing, team accounts and settings.</p>
        <p>• <strong>Sales / Parts</strong>: Catalogue access, parts lookups, purchasing and product documentation.</p>
        <p>• <strong>Service / Technical</strong>: Manuals, technical schematics, combustion guides and training certification.</p>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
        <div className="px-6 py-3 bg-[#FAF9F5] text-[10px] uppercase tracking-widest text-alkota-silver grid grid-cols-12 gap-4">
          <span className="col-span-4">Team Member</span>
          <span className="col-span-3">Role</span>
          <span className="col-span-3">Contact</span>
          <span className="col-span-2 text-right">Status</span>
        </div>

        {users.map((u) => {
          const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ') || u.email;
          const isPending = !u.password_hash && !!u.invitation_token;

          return (
            <div
              key={u.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center text-xs text-alkota-black hover:bg-[#FAF9F5] transition-colors"
            >
              <div className="col-span-4">
                <p className="font-light text-alkota-black text-sm">{fullName}</p>
                {u.job_title && <p className="text-[11px] text-alkota-silver">{u.job_title}</p>}
              </div>

              <div className="col-span-3">
                <span className="inline-block bg-alkota-orange/10 border border-alkota-orange/30 text-alkota-orange px-2 py-0.5 text-[10px] uppercase font-medium">
                  {u.role}
                </span>
              </div>

              <div className="col-span-3 text-alkota-silver text-[11px] space-y-0.5">
                <p>{u.email}</p>
                {u.phone && <p>{u.phone}</p>}
              </div>

              <div className="col-span-2 text-right">
                <span
                  className={`text-[9px] uppercase px-2 py-0.5 border ${
                    isPending
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {isPending ? 'Invite Sent' : 'Active'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
