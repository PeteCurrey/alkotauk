import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { getDealerOrg } from '@/lib/dealer-portal';

export default async function NewDealerOrderPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealer = user.dealerId ? await getDealerOrg(user.dealerId) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[#E8E8E4] pb-5">
        <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
          Dealer Commerce
        </span>
        <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
          Place a Dealer Order
        </h1>
        <p className="text-xs text-alkota-silver mt-1">
          Direct purchase with authorised dealer pricing for {dealer?.name || 'your organisation'}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="h-10 w-10 bg-alkota-black flex items-center justify-center text-alkota-orange">
            <Package className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-light text-alkota-black">Order from Genuine Parts Catalogue</h2>
          <p className="text-xs text-alkota-silver leading-relaxed">
            Browse our complete catalogue of over 2,400 Alkota genuine OEM parts, triplex pump components, burners, coils, nozzles and accessories.
          </p>
          <Link
            href="/dealer/parts"
            className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-5 py-2.5 text-xs uppercase tracking-widest transition-colors"
          >
            <span>Open Parts Catalogue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-[#E8E8E4] p-6 space-y-4">
          <div className="h-10 w-10 bg-alkota-black flex items-center justify-center text-alkota-orange">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-light text-alkota-black">Complete Machine &amp; Trailer Orders</h2>
          <p className="text-xs text-alkota-silver leading-relaxed">
            For complete hot/cold water pressure washing machines, industrial steam units, and bespoke trailer rigs, contact your dedicated account manager.
          </p>
          <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-3 text-xs space-y-1">
            <p className="text-alkota-silver">Account Manager: <strong className="text-alkota-black">{dealer?.account_manager || 'Alkota UK Commercial Desk'}</strong></p>
            <p className="text-alkota-silver">Direct Phone: <strong className="text-alkota-black">01772 822 822</strong></p>
            <p className="text-alkota-silver">Email: <strong className="text-alkota-black">orders@alkota.co.uk</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
