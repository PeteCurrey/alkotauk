import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart,
  Package,
  BookOpen,
  GraduationCap,
  Zap,
  HeadphonesIcon,
  Megaphone,
  ArrowRight,
  TrendingUp,
  Bell,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  getDealerOrg,
  getDealerAnnouncements,
  getDealerOrders,
  getOpenOrderCount,
  getDealerTraining,
  getTrainingProgress,
} from '@/lib/dealer-portal';
import type { DealerPortalTier } from '@/lib/types/dealer-portal';

const QUICK_ACTIONS = [
  { icon: ShoppingCart, label: 'Place an Order',   href: '/dealer/orders/new',   desc: 'Order parts & equipment' },
  { icon: Package,      label: 'Find a Part',      href: '/dealer/parts',        desc: 'Search parts catalogue' },
  { icon: BookOpen,     label: 'Resources',        href: '/dealer/resources',    desc: 'Manuals, specs & drawings' },
  { icon: GraduationCap, label: 'Training',        href: '/dealer/training',     desc: 'Modules & certification' },
  { icon: Zap,          label: 'Request Demo',     href: '/dealer/demo-days',    desc: 'Book a machine demo' },
  { icon: HeadphonesIcon, label: 'Support',        href: '/dealer/support',      desc: 'Get technical help' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function orderStatusBadge(status: string) {
  const map: Record<string, string> = {
    new:       'bg-blue-50 text-blue-700 border-blue-200',
    pending:   'bg-amber-50 text-amber-700 border-amber-200',
    hold:      'bg-orange-50 text-orange-700 border-orange-200',
    shipped:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-[#F5F4F0] text-alkota-silver border-alkota-iron',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
  };
  return map[status] || 'bg-[#F5F4F0] text-alkota-silver border-alkota-iron';
}

function AnnouncementPriorityBar({ priority }: { priority: string }) {
  if (priority === 'urgent') return <div className="w-1 bg-red-500 rounded-full shrink-0" />;
  if (priority === 'high')   return <div className="w-1 bg-alkota-orange rounded-full shrink-0" />;
  return <div className="w-1 bg-alkota-iron rounded-full shrink-0" />;
}

export default async function DealerDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId      = user.dealerId as string | undefined;
  const dealerUserId  = user.dealerUserId as string | undefined;
  const tier          = (user.tier as DealerPortalTier) || 'standard';
  const firstName     = user.name?.split(' ')[0] || 'Dealer';

  // Fetch data in parallel — all scoped to this dealer
  const [dealer, announcements, recentOrders, openOrderCount, training, progress] =
    await Promise.all([
      dealerId ? getDealerOrg(dealerId) : null,
      getDealerAnnouncements(tier, 3),
      dealerId ? getDealerOrders(dealerId, 5) : [],
      dealerId ? getOpenOrderCount(dealerId) : 0,
      getDealerTraining(tier, 6),
      dealerUserId ? getTrainingProgress(dealerUserId) : { completed: 0, inProgress: 0, total: 0 },
    ]);

  const dealerName = dealer?.name || user.company || 'Dealer';
  const monthOrders = (recentOrders as any[]).filter((o: any) => {
    const d = new Date(o.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="bg-alkota-black text-white px-8 py-8 border border-[#222]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-alkota-orange mb-1">
              {getGreeting()}
            </p>
            <h1 className="text-3xl font-extralight tracking-tight text-white leading-none mb-1">
              {firstName}
            </h1>
            <p className="text-sm text-alkota-silver">{dealerName}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-alkota-orange border border-alkota-orange/30 bg-alkota-orange/10 px-2.5 py-1">
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Partner
            </span>
            {dealer?.account_manager && (
              <span className="text-[10px] text-alkota-silver border border-[#333] px-2.5 py-1">
                AM: {dealer.account_manager}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── KPI STRIP ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Open Orders',
            value: openOrderCount,
            sub: 'Awaiting fulfilment',
            accent: openOrderCount > 0,
          },
          {
            label: 'Orders This Month',
            value: monthOrders,
            sub: new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' }),
            accent: false,
          },
          {
            label: 'Training Available',
            value: training.length - progress.completed,
            sub: `${progress.completed} completed`,
            accent: false,
          },
          {
            label: 'Support Tickets',
            value: 0,
            sub: 'No open tickets',
            accent: false,
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-[#E8E8E4] p-5">
            <p className="text-[9px] uppercase tracking-widest text-alkota-silver mb-2">{kpi.label}</p>
            <p className={`text-3xl font-extralight mb-1 ${kpi.accent ? 'text-alkota-orange' : 'text-alkota-black'}`}>
              {kpi.value}
            </p>
            <p className="text-[10px] text-alkota-silver">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTIONS ─────────────────────────────────────── */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-alkota-silver mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group bg-white border border-[#E8E8E4] hover:border-alkota-orange p-4 transition-colors text-center"
            >
              <action.icon className="h-5 w-5 text-alkota-orange mx-auto mb-2" />
              <p className="text-xs text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight">
                {action.label}
              </p>
              <p className="text-[10px] text-alkota-silver mt-0.5 hidden sm:block">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── TWO-COLUMN: Orders + Announcements ────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-white border border-[#E8E8E4]">
          <div className="px-5 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-alkota-orange mb-0.5">Commerce</p>
              <h3 className="text-sm font-light text-alkota-black">Recent Orders</h3>
            </div>
            <Link
              href="/dealer/orders"
              className="text-[10px] text-alkota-silver hover:text-alkota-orange uppercase tracking-widest transition-colors"
            >
              View All →
            </Link>
          </div>

          {(recentOrders as any[]).length === 0 ? (
            <div className="px-5 py-12 text-center">
              <ShoppingCart className="h-6 w-6 text-alkota-iron mx-auto mb-3" />
              <p className="text-sm text-alkota-silver mb-3">No orders yet</p>
              <Link
                href="/dealer/orders/new"
                className="inline-flex items-center gap-1.5 text-[10px] text-alkota-orange uppercase tracking-widest hover:underline"
              >
                Place Your First Order <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E8E4]">
              {(recentOrders as any[]).map((order: any) => (
                <Link
                  key={order.id}
                  href={`/dealer/orders/${order.id}`}
                  className="px-5 py-3.5 flex items-center justify-between hover:bg-[#FAF9F5] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-alkota-black truncate">{order.order_number}</p>
                    <p className="text-[10px] text-alkota-silver">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                      {order.po_number ? ` · PO: ${order.po_number}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`text-[9px] px-2 py-0.5 border uppercase tracking-widest ${orderStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-alkota-black">£{(order.total || 0).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Dealer Announcements */}
        <div className="bg-white border border-[#E8E8E4]">
          <div className="px-5 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-alkota-orange mb-0.5">From Alkota UK</p>
              <h3 className="text-sm font-light text-alkota-black">Dealer News</h3>
            </div>
            <Bell className="h-3.5 w-3.5 text-alkota-silver" />
          </div>

          {announcements.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Bell className="h-6 w-6 text-alkota-iron mx-auto mb-3" />
              <p className="text-sm text-alkota-silver">No announcements at this time</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E8E4]">
              {announcements.map((ann) => (
                <div key={ann.id} className="px-5 py-4 flex gap-3">
                  <AnnouncementPriorityBar priority={ann.priority} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.priority === 'urgent' && (
                        <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      )}
                      {ann.priority === 'high' && (
                        <TrendingUp className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      )}
                      <p className="text-xs text-alkota-black truncate">{ann.title}</p>
                    </div>
                    <p className="text-[11px] text-alkota-silver leading-relaxed line-clamp-2">{ann.body}</p>
                    <p className="text-[10px] text-alkota-iron mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ann.published_at
                        ? new Date(ann.published_at).toLocaleDateString('en-GB')
                        : 'Recent'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── TRAINING SNAPSHOT ─────────────────────────────────── */}
      {training.length > 0 && (
        <div className="bg-white border border-[#E8E8E4]">
          <div className="px-5 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-alkota-orange mb-0.5">Learning</p>
              <h3 className="text-sm font-light text-alkota-black">Training Library</h3>
            </div>
            <Link
              href="/dealer/training"
              className="text-[10px] text-alkota-silver hover:text-alkota-orange uppercase tracking-widest transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E4]">
            {training.slice(0, 3).map((module: any) => (
              <Link
                key={module.id}
                href={`/dealer/training/${module.slug}`}
                className="px-5 py-4 hover:bg-[#FAF9F5] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                  <span className="text-[9px] uppercase tracking-widest text-alkota-silver capitalize">
                    {module.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-alkota-black mb-1">{module.title}</p>
                <p className="text-[10px] text-alkota-silver">
                  {module.duration_minutes ? `${module.duration_minutes} min` : 'Self-paced'} ·{' '}
                  <span className="capitalize">{module.difficulty}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── SUPPORT & MARKETING STRIP ─────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-[#E8E8E4] bg-white p-6">
          <HeadphonesIcon className="h-5 w-5 text-alkota-orange mb-3" />
          <h3 className="text-sm font-light text-alkota-black mb-1">Technical Support</h3>
          <p className="text-[11px] text-alkota-silver mb-4">
            Raise a support ticket or speak to the Alkota UK technical team directly.
          </p>
          <div className="space-y-1 text-[11px] text-alkota-silver mb-4">
            <p>📞 <a href="tel:+441772822822" className="hover:text-alkota-orange">01772 822 822</a></p>
            <p>✉️ <a href="mailto:dealer@alkota.co.uk" className="hover:text-alkota-orange">dealer@alkota.co.uk</a></p>
          </div>
          <Link
            href="/dealer/support"
            className="inline-flex items-center gap-1.5 text-[10px] text-alkota-orange uppercase tracking-widest hover:underline"
          >
            Open a Support Ticket <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="border border-[#E8E8E4] bg-white p-6">
          <Megaphone className="h-5 w-5 text-alkota-orange mb-3" />
          <h3 className="text-sm font-light text-alkota-black mb-1">Marketing Hub</h3>
          <p className="text-[11px] text-alkota-silver mb-4">
            Download approved Alkota brand assets, product imagery, brochures and sales tools.
          </p>
          <Link
            href="/dealer/marketing"
            className="inline-flex items-center gap-1.5 text-[10px] text-alkota-orange uppercase tracking-widest hover:underline"
          >
            Go to Marketing Hub <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

    </div>
  );
}
