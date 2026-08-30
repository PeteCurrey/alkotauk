import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Calendar, Clock, CheckCircle2, Play, BookOpen } from 'lucide-react';
import { getDealerTraining, getTrainingProgress } from '@/lib/dealer-portal';
import type { DealerPortalTier } from '@/lib/types/dealer-portal';

export default async function DealerTrainingPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const tier = (user.tier as DealerPortalTier) || 'standard';
  const dealerUserId = user.dealerUserId;

  const [modules, progress] = await Promise.all([
    getDealerTraining(tier, 50),
    dealerUserId ? getTrainingProgress(dealerUserId) : { completed: 0, inProgress: 0, total: 0 },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Technical Education
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Training Library
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Technical modules, combustion certifications, pump rebuild tutorials and product sales training.
          </p>
        </div>

        <Link
          href="/dealer/training/events"
          className="inline-flex items-center gap-2 border border-alkota-black text-alkota-black px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-alkota-black hover:text-white transition-colors"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Upcoming Live Events</span>
        </Link>
      </div>

      {/* Progress Strip */}
      <div className="bg-white border border-[#E8E8E4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">Personal Training Progress</span>
          <p className="text-sm font-light text-alkota-black">
            {progress.completed} of {modules.length} Modules Completed
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-alkota-silver">
          <span>✓ {progress.completed} Completed</span>
          <span>⏳ {progress.inProgress} In Progress</span>
          <span>📖 {modules.length - progress.completed - progress.inProgress} Remaining</span>
        </div>
      </div>

      {/* Training Modules Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((m: any) => (
          <div key={m.id} className="bg-white border border-[#E8E8E4] p-6 flex flex-col justify-between hover:border-alkota-orange transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[9px] uppercase tracking-widest text-alkota-orange">
                  {m.category.replace(/_/g, ' ')}
                </span>
                <span className="text-[9px] uppercase px-2 py-0.5 bg-[#FAF9F5] border border-[#E8E8E4] text-alkota-silver capitalize">
                  {m.difficulty}
                </span>
              </div>
              <h3 className="text-base font-light text-alkota-black mb-2">{m.title}</h3>
              {m.description && (
                <p className="text-xs text-alkota-silver leading-relaxed line-clamp-3 mb-4">
                  {m.description}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-alkota-silver">
                <Clock className="h-3.5 w-3.5" />
                <span>{m.duration_minutes ? `${m.duration_minutes} min` : 'Self-paced'}</span>
              </div>
              <button
                className="inline-flex items-center gap-1.5 bg-alkota-black hover:bg-alkota-orange text-white px-4 py-2 text-[10px] uppercase tracking-widest transition-colors"
                onClick={() => alert(`Starting training module: ${m.title}`)}
              >
                <Play className="h-3 w-3" />
                <span>Start Module</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
