import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { PlayCircle, GraduationCap, FileCheck, HelpCircle, Users } from 'lucide-react';

export default async function TrainingHub() {
  const session = await auth();
  if (!session) redirect('/portal/login');

  const modules = [
    { title: 'The Alkota Burner System', type: 'Video', duration: '18m', status: 'Completed', level: 'Intermediate' },
    { title: 'Pump Maintenance & Rebuilds', type: 'Course', duration: '4h', status: 'In Progress', level: 'Advanced' },
    { title: 'Electrical Troubleshooting', type: 'Video', duration: '25m', status: 'Not Started', level: 'Advanced' },
    { title: 'Sales Strategy: Selling Hot vs Cold', type: 'Video', duration: '12m', status: 'Completed', level: 'Beginner' },
    { title: 'Elite Series Installation Guide', type: 'PDF/Quiz', duration: '45m', status: 'Not Started', level: 'Intermediate' },
    { title: 'Safety Certification 2024', type: 'Certification', duration: '2h', status: 'Renewal Required', level: 'Mandatory' },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 border-b border-alkota-iron pb-12">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            TRAINING <span className="text-alkota-orange">HUB.</span>
          </h1>
          <p className="mt-4 text-xl text-alkota-silver max-w-2xl italic leading-relaxed">
            Professional development, technical certification, and service guides for authorized Alkota engineers and sales staff.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="group border border-alkota-iron bg-alkota-steel/20 p-8 hover:border-alkota-orange transition-all">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-alkota-orange/10 text-alkota-orange">
                  {module.type === 'Video' && <PlayCircle className="h-6 w-6" />}
                  {module.type === 'Course' && <GraduationCap className="h-6 w-6" />}
                  {module.type === 'Certification' && <FileCheck className="h-6 w-6" />}
                  {!['Video', 'Course', 'Certification'].includes(module.type) && <HelpCircle className="h-6 w-6" />}
                </div>
                <div className="text-right">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-alkota-steel mb-1">
                    {module.level} Level
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${module.status === 'Completed' ? 'text-green-500' : module.status === 'In Progress' ? 'text-yellow-500' : 'text-alkota-orange'}`}>
                    {module.status}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white group-hover:text-alkota-orange transition-colors">
                {module.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-alkota-silver mb-8">
                {module.type} | {module.duration}
              </p>
              <button className="flex w-full items-center justify-center gap-2 border border-alkota-iron py-3 text-[10px] font-black uppercase tracking-widest text-alkota-steel hover:bg-alkota-orange hover:text-white transition-all">
                {module.status === 'Completed' ? 'Rewatch Module' : 'Start Module'} <PlayCircle className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Live Training Row */}
        <div className="mt-16 border border-alkota-iron bg-alkota-steel/30 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-alkota-orange text-white md:flex">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase italic text-white italic tracking-tight">On-site Factory Training</h3>
              <p className="text-alkota-silver text-sm mt-1">Book a session with our Master Engineers at the Alkota UK headquarters.</p>
            </div>
          </div>
          <button className="bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-alkota-black hover:bg-alkota-silver transition-all shrink-0">
            Request Factory Visit
          </button>
        </div>
      </div>
    </main>
  );
}
