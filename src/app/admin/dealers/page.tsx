import Link from 'next/link';
import { getDealers } from '@/lib/dealers';
import { Plus, Building2, MapPin, Phone, Mail, ExternalLink, ShieldCheck, Users, Truck } from 'lucide-react';

export default async function AdminDealersPage() {
  const dealers = await getDealers({ onlyActive: false });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Dealer Network Management
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {dealers.length} regional authorised partners & technical hubs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dealers/applications"
            className="flex items-center gap-2 border border-[#333] bg-[#111] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white hover:border-alkota-orange transition-colors"
          >
            <Users className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Applications</span>
          </Link>
          <Link
            href="/dealers"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white transition-colors"
          >
            <span>Live Directory</span>
            <ExternalLink className="h-3.5 w-3.5 text-alkota-orange" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase font-bold">
            ACTIVE DEALERS
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {dealers.filter((d) => d.status === 'active').length} Hubs
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            Full UK regional coverage
          </p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase font-bold">
            MOBILE FLEET VANS
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {dealers.reduce((sum, d) => sum + (d.mobile_service_vans || 1), 0)} Vans
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            Equipped with factory spares
          </p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase font-bold">
            ROUTING ENGINE
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            Territory + Proximity
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#666] mt-1">
            Zero-latency Haversine dispatch
          </p>
        </div>
      </div>

      {/* Dealers Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
            Authorised Dealerships
          </span>
          <span className="font-ibm-plex-mono text-[10px] text-[#666]">
            Database Snapshot Active
          </span>
        </div>

        <div className="divide-y divide-[#1A1A1A]">
          {dealers.map((dealer) => {
            const isHQ = dealer.tier === 'national_hub';
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
                        className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 uppercase font-bold ${
                          isHQ
                            ? 'bg-white text-black'
                            : 'bg-alkota-orange/10 text-alkota-orange border border-alkota-orange/20'
                        }`}
                      >
                        {dealer.tier.replace('_', ' ')}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                        {dealer.town}, {dealer.county} ({dealer.postcode})
                      </span>
                    </div>

                    <h4 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                      {dealer.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 mt-2 font-ibm-plex-mono text-[10px] text-[#888]">
                      <span>📞 {dealer.phone}</span>
                      <span>✉️ {dealer.email}</span>
                      <span>🚐 {dealer.mobile_service_vans} Mobile Vans</span>
                      <span>⭐ {dealer.rating} / 5.00</span>
                    </div>

                    {/* Territories Covered */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {dealer.territories?.slice(0, 6).map((t) => (
                        <span
                          key={t.postcode_prefix}
                          className="font-ibm-plex-mono text-[8px] bg-[#222] text-[#bbb] px-1.5 py-0.5"
                        >
                          {t.postcode_prefix}
                        </span>
                      ))}
                      {(dealer.territories?.length || 0) > 6 && (
                        <span className="font-ibm-plex-mono text-[8px] text-[#666] px-1 py-0.5">
                          +{(dealer.territories?.length || 0) - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/dealers/${dealer.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold text-[#aaa] hover:text-white hover:border-alkota-orange transition-colors"
                  >
                    <span>View Public</span>
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
