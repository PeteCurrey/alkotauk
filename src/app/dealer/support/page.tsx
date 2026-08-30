import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { HeadphonesIcon, Phone, Mail, Clock, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';

export default async function DealerSupportPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId = user.dealerId;

  const db = getSupabaseAdmin();
  const { data: tickets } = await db
    .from('dealer_support_tickets')
    .select('*')
    .eq('dealer_id', dealerId || '00000000-0000-0000-0000-000000000000')
    .order('created_at', { ascending: false });

  const ticketList = tickets || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Priority Assistance
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Technical Support Desk
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Direct priority technical help for dealer service engineers, parts enquiries, and warranty requests.
          </p>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E8E8E4] p-5">
          <Phone className="h-5 w-5 text-alkota-orange mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-alkota-silver block mb-1">Dealer Priority Line</span>
          <a href="tel:+441772822822" className="text-lg font-light text-alkota-black hover:text-alkota-orange">
            01772 822 822
          </a>
          <p className="text-[10px] text-alkota-silver mt-1">Mon–Fri, 08:00 – 17:30</p>
        </div>

        <div className="bg-white border border-[#E8E8E4] p-5">
          <Mail className="h-5 w-5 text-alkota-orange mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-alkota-silver block mb-1">Technical Support Desk</span>
          <a href="mailto:support@alkota.co.uk" className="text-sm font-light text-alkota-black hover:text-alkota-orange truncate block">
            support@alkota.co.uk
          </a>
          <p className="text-[10px] text-alkota-silver mt-1">Ticket created automatically</p>
        </div>

        <div className="bg-white border border-[#E8E8E4] p-5">
          <Clock className="h-5 w-5 text-alkota-orange mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-alkota-silver block mb-1">Response SLA</span>
          <p className="text-lg font-light text-alkota-black">Under 2 Hours</p>
          <p className="text-[10px] text-alkota-silver mt-1">Priority routing for authorised dealers</p>
        </div>
      </div>

      {/* Support Tickets Section */}
      <div className="border border-[#E8E8E4] bg-white">
        <div className="px-6 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
          <h3 className="text-sm font-light text-alkota-black">Support Tickets ({ticketList.length})</h3>
        </div>
        {ticketList.length === 0 ? (
          <div className="p-12 text-center text-xs text-alkota-silver">
            No active support tickets. When your team submits technical requests, they will appear here.
          </div>
        ) : (
          <div className="divide-y divide-[#E8E8E4]">
            {ticketList.map((t: any) => (
              <div key={t.id} className="p-5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-alkota-black">{t.ticket_number}</span>
                    <span className="text-[9px] uppercase px-2 py-0.5 border bg-[#FAF9F5] text-alkota-silver">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-alkota-black mt-1">{t.subject}</p>
                </div>
                <span className="text-[9px] uppercase px-2 py-0.5 border border-amber-200 bg-amber-50 text-amber-700">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
