import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Wrench,
  Package,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  FileText,
  Shield,
  ExternalLink,
} from 'lucide-react';
import ApplicationReviewActions from './ApplicationReviewActions';

export const revalidate = 0;

export default async function AdminDealerApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: application } = await supabaseAdmin
    .from('dealer_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (!application) {
    notFound();
  }

  // Fetch audit logs for this application
  const { data: auditLogs } = await supabaseAdmin
    .from('dealer_audit_log')
    .select('*')
    .or(`entity_id.eq.${id},dealer_id.eq.${application.converted_dealer_id || '00000000-0000-0000-0000-000000000000'}`)
    .order('created_at', { ascending: false });

  // If approved, fetch the converted dealer and user
  let convertedDealer: any = null;
  let primaryUser: any = null;

  if (application.converted_dealer_id) {
    const { data: dealerData } = await supabaseAdmin
      .from('dealers')
      .select('*')
      .eq('id', application.converted_dealer_id)
      .single();
    convertedDealer = dealerData;

    const { data: userData } = await supabaseAdmin
      .from('dealer_users')
      .select('*')
      .eq('dealer_id', application.converted_dealer_id)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();
    primaryUser = userData;
  }

  const statusColorMap: Record<string, { bg: string; text: string; border: string }> = {
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    under_review: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    more_info_required: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    approved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    rejected: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  };

  const currentStatus = application.status || 'pending';
  const statusStyle = statusColorMap[currentStatus] || statusColorMap.pending;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/dealers/applications"
              className="text-[#888] hover:text-white flex items-center gap-1 font-ibm-plex-mono text-[10px] uppercase transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Applications</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-barlow-condensed text-4xl font-black uppercase text-white tracking-tight">
              {application.company_name}
            </h1>
            <span
              className={`font-ibm-plex-mono text-[9px] px-2.5 py-1 uppercase font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              {currentStatus.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            Submitted {new Date(application.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · ID: {application.id}
          </p>
        </div>

        {convertedDealer && (
          <Link
            href={`/admin/dealers/${convertedDealer.id}`}
            className="inline-flex items-center gap-2 border border-alkota-orange/40 bg-alkota-orange/10 px-4 py-2 text-xs uppercase font-ibm-plex-mono text-alkota-orange hover:bg-alkota-orange hover:text-white transition-colors"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>View Dealer Record</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>

      {/* Main Review Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Profile Card */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Company & Registration
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Registered Name</span>
                <p className="text-white font-medium text-sm mt-0.5">{application.company_name}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Trading Name</span>
                <p className="text-[#ccc] mt-0.5">{application.trading_name || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Company Reg No.</span>
                <p className="text-[#ccc] mt-0.5">{application.company_reg || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">VAT Number</span>
                <p className="text-[#ccc] mt-0.5">{application.vat_number || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Website</span>
                {application.website ? (
                  <a
                    href={application.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-alkota-orange hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{application.website}</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                ) : (
                  <p className="text-[#666] mt-0.5">—</p>
                )}
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Trading Address</span>
                <p className="text-[#ccc] mt-0.5">
                  {[application.address_line1, application.address_line2, application.town, application.county, application.postcode, application.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Contact Card */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center gap-2">
              <User className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Primary Contact Information
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Contact Name</span>
                <p className="text-white font-medium text-sm mt-0.5">{application.contact_name}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Job Title / Role</span>
                <p className="text-[#ccc] mt-0.5">{application.job_title || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Email Address</span>
                <p className="text-[#ccc] mt-0.5">{application.email}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Phone / Mobile</span>
                <p className="text-[#ccc] mt-0.5">{application.phone} {application.mobile ? `· ${application.mobile}` : ''}</p>
              </div>
            </div>
          </div>

          {/* Business & Commercial Profile */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Business Profile & Scale
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Years Trading</span>
                <p className="text-white text-base mt-0.5">{application.years_in_business || application.years_trading || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Employees</span>
                <p className="text-white text-base mt-0.5">{application.num_employees || '—'}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#666] uppercase block">Est. Annual Turnover</span>
                <p className="text-white text-base mt-0.5">{application.estimated_annual_sales || application.current_turnover_range || '—'}</p>
              </div>
              <div className="sm:col-span-3 pt-2">
                <span className="text-[9px] text-[#666] uppercase block">Current Brands Represented</span>
                <p className="text-[#ccc] mt-1 bg-[#141414] p-3 border border-[#222] text-xs leading-relaxed">
                  {application.current_brands_represented || application.current_pw_brands || 'None specified'}
                </p>
              </div>
              {application.industries_served && application.industries_served.length > 0 && (
                <div className="sm:col-span-3">
                  <span className="text-[9px] text-[#666] uppercase block mb-2">Industries Served</span>
                  <div className="flex flex-wrap gap-1.5">
                    {application.industries_served.map((ind: string) => (
                      <span key={ind} className="bg-[#222] text-[#ccc] px-2 py-0.5 text-[10px]">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technical & Service Capabilities */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-6 py-3.5 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Technical Capabilities & Territory
              </span>
            </div>
            <div className="p-6 space-y-4 font-ibm-plex-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-[#666] uppercase block">Target Territory</span>
                  <p className="text-alkota-orange text-sm font-bold mt-0.5">
                    {application.geographic_territory || application.territory_interest || 'General UK'}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] text-[#666] uppercase block">Mobile Fleet Vans</span>
                  <p className="text-white text-sm mt-0.5">{application.service_van_count || 0} Vans</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className={`p-3 border ${application.workshop_facilities ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#222] bg-[#141414]'}`}>
                  <span className="text-[9px] text-[#888] block">Workshop Facility</span>
                  <span className={application.workshop_facilities ? 'text-emerald-400 font-bold' : 'text-[#666]'}>
                    {application.workshop_facilities ? '✓ Confirmed' : '✗ No'}
                  </span>
                </div>
                <div className={`p-3 border ${application.mobile_service_capability ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#222] bg-[#141414]'}`}>
                  <span className="text-[9px] text-[#888] block">Mobile Service</span>
                  <span className={application.mobile_service_capability ? 'text-emerald-400 font-bold' : 'text-[#666]'}>
                    {application.mobile_service_capability ? '✓ Confirmed' : '✗ No'}
                  </span>
                </div>
                <div className={`p-3 border ${application.parts_service_capability ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#222] bg-[#141414]'}`}>
                  <span className="text-[9px] text-[#888] block">Parts Inventory Holding</span>
                  <span className={application.parts_service_capability ? 'text-emerald-400 font-bold' : 'text-[#666]'}>
                    {application.parts_service_capability ? '✓ Willing to stock' : '✗ No'}
                  </span>
                </div>
              </div>

              {application.dealer_interests && application.dealer_interests.length > 0 && (
                <div className="pt-2">
                  <span className="text-[9px] text-[#666] uppercase block mb-2">Products of Interest</span>
                  <div className="flex flex-wrap gap-1.5">
                    {application.dealer_interests.map((p: string) => (
                      <span key={p} className="bg-alkota-orange/10 border border-alkota-orange/20 text-alkota-orange px-2 py-0.5 text-[10px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {application.additional_notes && (
                <div className="pt-2">
                  <span className="text-[9px] text-[#666] uppercase block mb-1">Applicant Additional Notes</span>
                  <p className="text-[#aaa] bg-[#141414] p-4 border border-[#222] text-xs leading-relaxed italic">
                    "{application.additional_notes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Decision & Action Center + Audit Log */}
        <div className="space-y-6">
          {/* Action Center Component (Client Side Interactive) */}
          <ApplicationReviewActions
            applicationId={application.id}
            currentStatus={application.status}
            convertedDealerId={application.converted_dealer_id}
            primaryUserEmail={application.email}
            invitationToken={primaryUser?.invitation_token}
          />

          {/* Review Notes / State Card */}
          {(application.more_info_message || application.decision_reason || application.admin_notes) && (
            <div className="border border-[#222] bg-[#0E0E0E] p-5 font-ibm-plex-mono text-xs space-y-3">
              <span className="font-bold text-white uppercase text-[10px] tracking-widest block">
                Review Records
              </span>
              {application.more_info_message && (
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 text-purple-300">
                  <span className="text-[9px] text-purple-400 block uppercase font-bold">More Info Request Message</span>
                  <p className="mt-1">{application.more_info_message}</p>
                </div>
              )}
              {application.decision_reason && (
                <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-300">
                  <span className="text-[9px] text-red-400 block uppercase font-bold">Rejection Reason</span>
                  <p className="mt-1">{application.decision_reason}</p>
                </div>
              )}
              {application.admin_notes && (
                <div className="bg-[#141414] border border-[#222] p-3 text-[#aaa]">
                  <span className="text-[9px] text-[#666] block uppercase font-bold">Internal Admin Notes</span>
                  <p className="mt-1">{application.admin_notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Audit Trail Timeline */}
          <div className="border border-[#222] bg-[#0E0E0E]">
            <div className="border-b border-[#222] bg-[#141414] px-5 py-3 flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Audit Trail
              </span>
              <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                Immutable Record
              </span>
            </div>
            <div className="p-4 space-y-3 font-ibm-plex-mono text-xs">
              {auditLogs && auditLogs.length > 0 ? (
                auditLogs.map((log: any) => (
                  <div key={log.id} className="border-l-2 border-alkota-orange pl-3 py-1 text-[11px]">
                    <div className="flex items-center justify-between text-[#777] text-[9px]">
                      <span className="uppercase text-alkota-orange">{log.action.replace(/_/g, ' ')}</span>
                      <span>{new Date(log.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-white mt-0.5">By {log.actor_id || 'System'}</p>
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <p className="text-[#888] text-[9px] mt-0.5 break-all">
                        {JSON.stringify(log.metadata)}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-[#666] text-xs">
                  Initial application submitted at {new Date(application.created_at).toLocaleTimeString('en-GB')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
