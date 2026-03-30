import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import EnquiryActions from './EnquiryActions';
import { ArrowLeft, Mail, Phone, Building2, Calendar, Tag } from 'lucide-react';

const STATUS_COLOURS: Record<string, string> = {
  new: '#FF6900', read: '#666', responded: '#3B82F6', closed: '#22C55E',
};

function MetadataBlock({ type, metadata }: { type: string; metadata: any }) {
  if (!metadata || Object.keys(metadata).length === 0) return null;

  const renderRow = (key: string, value: unknown) => {
    if (value === null || value === undefined || value === '') return null;
    const display = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
    return (
      <div key={key} className="flex gap-4 py-2 border-b border-[#1A1A1A]">
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] w-40 shrink-0">
          {key.replace(/_/g, ' ')}
        </span>
        <span className="font-inter text-[13px] text-[#aaa]">{display}</span>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">
        {type === 'trailer' ? '// Trailer Specification' :
          type === 'machine-match' ? '// Machine Match Data' :
          type === 'compliance' ? '// Compliance Report' :
          '// Submission Data'}
      </p>
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-4">
        {Object.entries(metadata).map(([k, v]) => renderRow(k, v))}
      </div>
    </div>
  );
}

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: enq, error } = await supabaseAdmin.from('enquiries').select('*').eq('id', id).single();
  if (error || !enq) notFound();

  return (
    <div className="text-white">
      {/* Back */}
      <Link href="/admin/enquiries" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] hover:text-[#FF6900] mb-6 transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back to Enquiries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Details (60%) */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="border border-[#222] bg-[#141414] p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-ibm-plex-mono text-[22px] font-bold text-[#FF6900] tracking-wider">
                  {enq.reference || 'No Reference'}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest" style={{
                    color: STATUS_COLOURS[enq.status] || '#666',
                    border: `1px solid ${STATUS_COLOURS[enq.status] || '#333'}`,
                    background: `${STATUS_COLOURS[enq.status] || '#333'}18`,
                  }}>{enq.status}</span>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] border border-[#222] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                    {enq.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#555]">
                <Calendar className="h-3.5 w-3.5" />
                <span className="font-ibm-plex-mono text-[10px]">
                  {new Date(enq.created_at).toLocaleString('en-GB')}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border border-[#222] bg-[#141414] p-6 mb-4">
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-4">// Contact Information</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: null, label: 'Name', value: enq.name },
                { icon: Building2, label: 'Company', value: enq.company },
                { icon: Mail, label: 'Email', value: enq.email },
                { icon: Phone, label: 'Phone', value: enq.phone },
              ].map(({ icon: Icon, label, value }) => value ? (
                <div key={label} className="flex items-start gap-3">
                  {Icon && <Icon className="h-4 w-4 text-[#444] mt-0.5 shrink-0" />}
                  <div>
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444]">{label}</p>
                    <p className="font-inter text-[14px] text-white mt-0.5">{value}</p>
                  </div>
                </div>
              ) : null)}
            </div>
          </div>

          {/* Message */}
          {(enq.subject || enq.message) && (
            <div className="border border-[#222] bg-[#141414] p-6 mb-4">
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">// Message</p>
              {enq.subject && <p className="font-barlow-condensed text-xl font-black italic text-white mb-2">{enq.subject}</p>}
              {enq.message && <p className="font-inter text-[14px] text-[#aaa] leading-relaxed whitespace-pre-wrap">{enq.message}</p>}
            </div>
          )}

          {/* Metadata */}
          {enq.metadata && (
            <div className="border border-[#222] bg-[#141414] p-6">
              <MetadataBlock type={enq.type} metadata={enq.metadata} />
            </div>
          )}
        </div>

        {/* Right: Admin Actions (40%) */}
        <div className="lg:col-span-2">
          <EnquiryActions enquiry={enq} />
        </div>
      </div>
    </div>
  );
}
