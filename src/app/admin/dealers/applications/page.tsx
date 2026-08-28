import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Users, Building, MapPin, Mail, Phone, ArrowLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default async function AdminDealerApplicationsPage() {
  let applications: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('dealer_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) applications = data;
  } catch (err) {
    console.error('Error fetching dealer applications:', err);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/dealers"
              className="text-[#888] hover:text-white flex items-center gap-1 font-ibm-plex-mono text-[10px] uppercase"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Dealers</span>
            </Link>
          </div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Dealer Partnership Applications
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {applications.length} submitted distributor & service partner inquiries
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-12 text-center">
          <Users className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Applications Pending
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            When new distributors or regional engineering centres submit applications via `/dealers/become-a-dealer`, they will appear here.
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {applications.map((app) => (
            <div key={app.id} className="p-6 hover:bg-[#111] transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-ibm-plex-mono text-[9px] bg-alkota-orange/10 text-alkota-orange px-2 py-0.5 uppercase font-bold">
                      {app.status || 'PENDING'}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                      {new Date(app.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {app.company_name}
                  </h3>
                  <p className="font-inter text-xs text-[#888]">
                    Contact: <strong>{app.contact_name}</strong> ({app.job_title || 'Applicant'})
                  </p>
                </div>

                <div className="font-ibm-plex-mono text-xs text-right space-y-1">
                  <p className="text-[#ccc]">📞 {app.phone}</p>
                  <p className="text-[#888]">✉️ {app.email}</p>
                  <p className="text-alkota-orange">📍 {app.town}, {app.county} ({app.postcode})</p>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#222] p-4 font-ibm-plex-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-[#666] block text-[9px]">TARGET TERRITORY</span>
                  <span className="text-white">{app.territory_interest}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px]">MOBILE VANS</span>
                  <span className="text-white">{app.service_van_count || 1} Dedicated Fleet</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px]">CURRENT BRANDS</span>
                  <span className="text-white">{app.current_brands_represented || 'None'}</span>
                </div>
              </div>

              {app.additional_notes && (
                <div className="bg-[#111] p-3 text-xs text-[#aaa] font-inter border-l-2 border-alkota-orange">
                  "{app.additional_notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
