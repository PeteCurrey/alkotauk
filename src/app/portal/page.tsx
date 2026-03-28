import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  Trophy, 
  ShoppingCart, 
  FileText, 
  GraduationCap, 
  Settings, 
  LogOut, 
  ChevronRight,
  Truck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default async function PortalDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/portal/login');
  }

  const user = session.user as any;
  const tierColors: Record<string, string> = {
    gold: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10',
    silver: 'text-slate-400 border-slate-400/30 bg-slate-400/10',
    bronze: 'text-orange-700 border-orange-700/30 bg-orange-700/10',
  };

  const portalSections = [
    { title: 'Machine Pricing', icon: <ShoppingCart className="h-6 w-6" />, href: '/machines', desc: 'Browse full fleet with dealer discounts. (Gold: 25%)', color: 'border-alkota-orange' },
    { title: 'Marketing Hub', icon: <FileText className="h-6 w-6" />, href: '/portal/marketing', desc: 'Download Hi-Res brochures, logos, and dealer templates.', color: 'border-alkota-iron' },
    { title: 'Service Training', icon: <GraduationCap className="h-6 w-6" />, href: '/portal/training', desc: 'Instructional videos, certification, and technical guides.', color: 'border-alkota-iron' },
    { title: 'Warranty Claims', icon: <AlertCircle className="h-6 w-6" />, href: '/support/warranty', desc: 'Submit and track dealer-level warranty registrations.', color: 'border-alkota-iron' },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-alkota-iron pb-12 md:flex-row md:items-end">
          <div>
            <div className={`mb-4 inline-flex items-center gap-2 border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${tierColors[user.tier] || ''}`}>
              <Trophy className="h-3 w-3" />
              {user.tier} Dealer Account
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
              WELCOME, <span className="text-alkota-orange">{user.name.split(' ')[0]}.</span>
            </h1>
            <p className="mt-2 text-xl text-alkota-silver uppercase font-bold tracking-tight">
              {user.company} Dealer Portal Dashboard
            </p>
          </div>
          
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
            <button className="flex items-center gap-2 border border-alkota-iron bg-alkota-steel/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-alkota-steel transition-all hover:border-alkota-orange hover:text-white">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Quick Links */}
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {portalSections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className={`group border ${section.color} bg-alkota-steel/20 p-8 transition-all hover:bg-alkota-steel/40`}
              >
                <div className="mb-4 text-alkota-orange">{section.icon}</div>
                <h3 className="mb-2 text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed">{section.desc}</p>
              </Link>
            ))}
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="border border-alkota-iron bg-alkota-steel/10 p-8">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-white border-b border-alkota-iron pb-4">
                Active Orders
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-alkota-iron/30">
                    <Truck className="h-5 w-5 text-alkota-steel" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">PO-45920-X</p>
                    <p className="text-[10px] text-alkota-orange font-bold uppercase">In Transit — Tracking Available</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-alkota-iron/30">
                    <Settings className="h-5 w-5 text-alkota-steel" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">Bespoke Build #229</p>
                    <p className="text-[10px] text-alkota-silver font-bold uppercase">Production — Assembly Phase</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 block w-full border border-alkota-iron py-3 text-center text-[10px] font-black uppercase tracking-widest text-alkota-steel transition-all hover:border-alkota-orange hover:text-white">
                View Order History →
              </button>
            </div>

            <div className="border border-alkota-orange/20 bg-alkota-orange/5 p-8">
              <h3 className="mb-2 text-xl font-black uppercase italic text-white italic tracking-tight uppercase">
                Dealer News
              </h3>
              <p className="text-sm text-alkota-silver mb-4 uppercase font-bold tracking-tight">Q1 Factory Update Now Available</p>
              <p className="text-xs text-secondary leading-relaxed mb-6">Learn about the new high-volume coil windings and lead times for the upcoming season.</p>
              <Link href="/portal/news" className="text-[10px] font-black uppercase tracking-widest text-alkota-orange hover:underline">
                Read Full Bulletin →
              </Link>
            </div>
          </div>

        </div>

        {/* Support Section */}
        <div className="mt-12 grid gap-8 border-t border-alkota-iron pt-12 text-center md:grid-cols-3">
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-2">Technical Support</p>
             <p className="text-lg font-bold text-white uppercase tracking-tight">01709 123 456</p>
           </div>
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-2">Priority Sales Desk</p>
             <p className="text-lg font-bold text-white uppercase tracking-tight">sales-dealer@alkota.co.uk</p>
           </div>
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-alkota-steel mb-2">Emergency Dispatch</p>
             <p className="text-lg font-bold text-white uppercase tracking-tight">24/7 Priority Line</p>
           </div>
        </div>

      </div>
    </main>
  );
}
