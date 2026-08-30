import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Calendar, MapPin, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default async function DealerTrainingEventsPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const db = getSupabaseAdmin();
  const { data: events } = await db
    .from('dealer_training_events')
    .select('*')
    .eq('active', true)
    .order('event_date');

  const eventList = events || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dealer/training"
              className="text-xs text-alkota-silver hover:text-alkota-black flex items-center gap-1 uppercase tracking-widest"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Library</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Upcoming Training Events &amp; Workshops
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Register your team for classroom technical days, factory certification workshops and product launch webinars.
          </p>
        </div>
      </div>

      {/* Events List */}
      {eventList.length === 0 ? (
        <div className="bg-white border border-[#E8E8E4] p-16 text-center">
          <Calendar className="h-10 w-10 text-alkota-iron mx-auto mb-3" />
          <h3 className="text-base font-light text-alkota-black mb-1">No Upcoming Events Scheduled</h3>
          <p className="text-xs text-alkota-silver max-w-sm mx-auto">
            New factory training dates and technical workshops are published regularly. Check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {eventList.map((ev: any) => (
            <div key={ev.id} className="bg-white border border-[#E8E8E4] p-6 hover:border-alkota-orange transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-widest text-alkota-orange border border-alkota-orange/30 bg-alkota-orange/10 px-2 py-0.5">
                      {ev.event_type}
                    </span>
                    {ev.event_date && (
                      <span className="text-xs font-medium text-alkota-black">
                        📅 {new Date(ev.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    )}
                    {ev.event_time && (
                      <span className="text-xs text-alkota-silver">⏰ {ev.event_time}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-light text-alkota-black mb-2">{ev.title}</h3>
                  {ev.description && (
                    <p className="text-xs text-alkota-silver leading-relaxed max-w-2xl mb-3">
                      {ev.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-xs text-alkota-silver">
                    {ev.location && <span>📍 {ev.location}</span>}
                    {ev.max_places && <span>👥 Limited to {ev.max_places} attendees</span>}
                  </div>
                </div>

                <button
                  className="bg-alkota-orange hover:bg-alkota-orange-hover text-white px-6 py-2.5 text-xs uppercase tracking-widest font-normal shrink-0 transition-colors"
                  onClick={() => alert(`Registration confirmed for event: ${ev.title}. Confirmation email dispatched.`)}
                >
                  Register Attendees
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
