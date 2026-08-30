import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDealerApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: selectedStatus } = await searchParams;

  let applications: any[] = [];
  try {
    let query = supabaseAdmin
      .from('dealer_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedStatus && selectedStatus !== 'all') {
      query = query.eq('status', selectedStatus);
    }

    const { data } = await query;
    if (data) applications = data;
  } catch (err) {
    console.error('Error fetching dealer applications:', err);
  }

  // Count stats
  const { data: allApps } = await supabaseAdmin
    .from('dealer_applications')
    .select('status');

  const counts = {
    all: (allApps || []).length,
    pending: (allApps || []).filter((a) => a.status === 'pending').length,
    under_review: (allApps || []).filter((a) => a.status === 'under_review').length,
    more_info_required: (allApps || []).filter((a) => a.status === 'more_info_required').length,
    approved: (allApps || []).filter((a) => a.status === 'approved').length,
    rejected: (allApps || []).filter((a) => a.status === 'rejected').length,
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'more_info_required':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'under_review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          <h1 className="font-barlow-condensed text-4xl font-black uppercase text-white tracking-tight">
            Dealer Applications
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {counts.all} total partnership inquiries across the UK
          </p>
        </div>

        <Link
          href="/dealer/request"
          target="_blank"
          className="inline-flex items-center gap-2 border border-[#333] px-4 py-2 text-xs font-ibm-plex-mono uppercase text-[#ccc] hover:text-white hover:border-alkota-orange transition-colors"
        >
          <span>Live Form</span>
          <ChevronRight className="h-3 w-3 text-alkota-orange" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-ibm-plex-mono">
        <Link
          href="/admin/dealers/applications?status=pending"
          className={`border p-4 transition-colors ${
            selectedStatus === 'pending'
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-[#222] bg-[#0E0E0E] hover:border-[#444]'
          }`}
        >
          <span className="text-[9px] uppercase text-amber-400 block font-bold">Pending Review</span>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">{counts.pending}</p>
        </Link>

        <Link
          href="/admin/dealers/applications?status=under_review"
          className={`border p-4 transition-colors ${
            selectedStatus === 'under_review'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-[#222] bg-[#0E0E0E] hover:border-[#444]'
          }`}
        >
          <span className="text-[9px] uppercase text-blue-400 block font-bold">Under Review</span>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">{counts.under_review}</p>
        </Link>

        <Link
          href="/admin/dealers/applications?status=more_info_required"
          className={`border p-4 transition-colors ${
            selectedStatus === 'more_info_required'
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-[#222] bg-[#0E0E0E] hover:border-[#444]'
          }`}
        >
          <span className="text-[9px] uppercase text-purple-400 block font-bold">Info Required</span>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">{counts.more_info_required}</p>
        </Link>

        <Link
          href="/admin/dealers/applications?status=approved"
          className={`border p-4 transition-colors ${
            selectedStatus === 'approved'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-[#222] bg-[#0E0E0E] hover:border-[#444]'
          }`}
        >
          <span className="text-[9px] uppercase text-emerald-400 block font-bold">Approved</span>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">{counts.approved}</p>
        </Link>

        <Link
          href="/admin/dealers/applications?status=rejected"
          className={`border p-4 transition-colors ${
            selectedStatus === 'rejected'
              ? 'border-red-500 bg-red-500/10'
              : 'border-[#222] bg-[#0E0E0E] hover:border-[#444]'
          }`}
        >
          <span className="text-[9px] uppercase text-red-400 block font-bold">Declined</span>
          <p className="font-barlow-condensed text-3xl font-black text-white mt-1">{counts.rejected}</p>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#222] pb-3 overflow-x-auto font-ibm-plex-mono text-[10px] uppercase tracking-widest">
        {[
          { label: 'All Applications', val: 'all' },
          { label: 'Pending', val: 'pending' },
          { label: 'Under Review', val: 'under_review' },
          { label: 'More Info Required', val: 'more_info_required' },
          { label: 'Approved', val: 'approved' },
          { label: 'Rejected', val: 'rejected' },
        ].map((tab) => {
          const isActive = (!selectedStatus && tab.val === 'all') || selectedStatus === tab.val;
          return (
            <Link
              key={tab.val}
              href={tab.val === 'all' ? '/admin/dealers/applications' : `/admin/dealers/applications?status=${tab.val}`}
              className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-alkota-orange text-white font-bold'
                  : 'text-[#888] hover:text-white hover:bg-[#191919]'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="border border-[#222] bg-[#0A0A0A] p-16 text-center">
          <Users className="h-10 w-10 text-[#444] mx-auto mb-3" />
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white mb-2">
            No Applications Found
          </h3>
          <p className="font-inter text-xs text-[#666] max-w-md mx-auto">
            {selectedStatus
              ? `No dealer applications currently match the "${selectedStatus}" filter.`
              : 'When distributors or engineering firms submit partnership applications, they will appear here.'}
          </p>
        </div>
      ) : (
        <div className="border border-[#222] bg-[#0A0A0A] divide-y divide-[#1A1A1A]">
          {applications.map((app) => (
            <Link
              key={app.id}
              href={`/admin/dealers/applications/${app.id}`}
              className="block p-6 hover:bg-[#111] transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 uppercase font-bold border ${statusBadge(
                        app.status || 'pending'
                      )}`}
                    >
                      {(app.status || 'pending').replace(/_/g, ' ')}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                      {new Date(app.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    {app.geographic_territory && (
                      <span className="font-ibm-plex-mono text-[9px] text-alkota-orange">
                        📍 {app.geographic_territory}
                      </span>
                    )}
                  </div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white group-hover:text-alkota-orange transition-colors">
                    {app.company_name}
                  </h3>
                  <p className="font-inter text-xs text-[#888]">
                    Contact: <strong className="text-[#ccc]">{app.contact_name}</strong> ({app.job_title || 'Applicant'}) · {app.email} · {app.phone}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange group-hover:underline flex items-center gap-1">
                    <span>Review Application</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#222] p-3.5 font-ibm-plex-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Location</span>
                  <span className="text-white truncate block">{app.town}, {app.postcode}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Years Trading</span>
                  <span className="text-white">{app.years_in_business || app.years_trading || '—'} Years</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Workshop Facility</span>
                  <span className={app.workshop_facilities ? 'text-emerald-400' : 'text-[#666]'}>
                    {app.workshop_facilities ? '✓ Dedicated' : '✗ None'}
                  </span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Mobile Vans</span>
                  <span className="text-white">{app.service_van_count || 0} Vans</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
