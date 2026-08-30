import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Building2, User, CreditCard, ShieldCheck, MapPin, Phone, Mail, Users, ArrowRight } from 'lucide-react';
import { getDealerOrg, getDealerUsers } from '@/lib/dealer-portal';

export default async function DealerAccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId = user.dealerId;

  const [dealer, users] = await Promise.all([
    dealerId ? getDealerOrg(dealerId) : null,
    dealerId ? getDealerUsers(dealerId) : [],
  ]);

  if (!dealer) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-xs text-alkota-silver">
        Dealer organisation profile not loaded.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Organisation Settings
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Dealer Profile &amp; Terms
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Manage your company profile, billing addresses, team accounts, and view your authorised terms.
          </p>
        </div>

        <Link
          href="/dealer/account/users"
          className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-5 py-2.5 text-xs uppercase tracking-widest transition-colors"
        >
          <Users className="h-3.5 w-3.5" />
          <span>Manage Team ({users.length})</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Company Profile Card */}
        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E4] pb-3">
            <Building2 className="h-4 w-4 text-alkota-orange" />
            <h2 className="text-sm font-light text-alkota-black uppercase tracking-wider">Company Information</h2>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase text-alkota-silver block">Trading Name</span>
              <p className="font-light text-alkota-black text-base">{dealer.name}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-alkota-silver block">Registered Address</span>
              <p className="text-alkota-black">
                {[dealer.address_line1, dealer.address_line2, dealer.town, dealer.county, dealer.postcode, dealer.country]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">Phone</span>
                <p className="text-alkota-black">{dealer.phone}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">Email</span>
                <p className="text-alkota-black">{dealer.email}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">Company Reg</span>
                <p className="text-alkota-black">{dealer.company_reg || '—'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">VAT Number</span>
                <p className="text-alkota-black">{dealer.vat_number || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Terms Card */}
        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E4] pb-3">
            <CreditCard className="h-4 w-4 text-alkota-orange" />
            <h2 className="text-sm font-light text-alkota-black uppercase tracking-wider">Authorised Terms</h2>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase text-alkota-silver block">Authorised Partner Tier</span>
              <span className="inline-block mt-1 bg-alkota-orange/10 border border-alkota-orange/30 text-alkota-orange px-2.5 py-0.5 text-xs uppercase font-medium">
                {dealer.portal_tier || 'Standard'} Tier
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">Credit Terms</span>
                <p className="text-alkota-black uppercase font-medium">{(dealer.credit_terms || 'proforma').replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-alkota-silver block">Credit Limit</span>
                <p className="text-alkota-black font-medium">{dealer.credit_limit ? `£${Number(dealer.credit_limit).toLocaleString()}` : 'Proforma'}</p>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-[10px] uppercase text-alkota-silver block">Dedicated Account Manager</span>
              <p className="text-alkota-black">{dealer.account_manager || 'Alkota UK Commercial Desk (01772 822 822)'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
