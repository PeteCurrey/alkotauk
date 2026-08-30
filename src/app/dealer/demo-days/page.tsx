import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Zap, Calendar, MapPin, CheckCircle2, Clock, Plus } from 'lucide-react';
import { getDealerOrg } from '@/lib/dealer-portal';

export default async function DealerDemoDaysPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId = user.dealerId;
  const dealer = dealerId ? await getDealerOrg(dealerId) : null;

  const db = getSupabaseAdmin();
  const { data: requests } = await db
    .from('dealer_demo_requests')
    .select('*')
    .eq('dealer_id', dealerId || '00000000-0000-0000-0000-000000000000')
    .order('created_at', { ascending: false });

  const requestList = requests || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Commercial Support
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Machine Demonstrations &amp; Demo Days
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Request on-site factory demonstration units or organise a dealer open day with the Alkota UK technical demonstration team.
          </p>
        </div>
      </div>

      {/* Demo Booking Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="h-10 w-10 bg-alkota-black flex items-center justify-center text-alkota-orange">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-light text-alkota-black">Customer On-Site Demonstration</h2>
          <p className="text-xs text-alkota-silver leading-relaxed">
            Have a major industrial customer opportunity? Alkota UK will dispatch an engineer and demonstration trailer rig to support your client pitch.
          </p>
          <div className="bg-[#FAF9F5] p-3 text-xs text-alkota-silver border border-[#E8E8E4] space-y-1">
            <p>Hot Water &amp; Steam demonstration rigs available nationwide.</p>
            <p>Direct support contact: <strong className="text-alkota-black">01772 822 822</strong></p>
          </div>
        </div>

        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="h-10 w-10 bg-alkota-black flex items-center justify-center text-alkota-orange">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-light text-alkota-black">Dealer Open Day &amp; Roadshow</h2>
          <p className="text-xs text-alkota-silver leading-relaxed">
            Host an Alkota demonstration day at your depot. We provide machine rigs, demonstration chemicals, promotional literature, and technical staff.
          </p>
          <div className="bg-[#FAF9F5] p-3 text-xs text-alkota-silver border border-[#E8E8E4] space-y-1">
            <p>Available for Silver, Gold and Platinum dealer partners.</p>
            <p>Lead time: Minimum 14 days advance booking.</p>
          </div>
        </div>
      </div>

      {/* Requests History */}
      <div className="border border-[#E8E8E4] bg-white">
        <div className="px-6 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
          <h3 className="text-sm font-light text-alkota-black">Demonstration Requests ({requestList.length})</h3>
        </div>
        {requestList.length === 0 ? (
          <div className="p-12 text-center text-xs text-alkota-silver">
            No demonstration requests submitted yet. Contact your account manager or call 01772 822 822 to schedule a demonstration.
          </div>
        ) : (
          <div className="divide-y divide-[#E8E8E4]">
            {requestList.map((req: any) => (
              <div key={req.id} className="p-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-alkota-black">{req.request_number}</span>
                  <p className="text-alkota-silver text-[11px]">{req.customer_company || req.contact_name} · {req.demo_type}</p>
                </div>
                <span className="text-[9px] uppercase px-2 py-0.5 border bg-[#FAF9F5] text-alkota-black">
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
