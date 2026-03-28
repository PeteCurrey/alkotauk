import { safeFetch } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { HardHat, Truck, Droplets, Layers, Home, Settings, ShieldCheck, Eraser, Activity, GitMerge, Snowflake } from 'lucide-react';

export const metadata = {
  title: 'Applications | Alkota UK Industrial Pressure Washers',
  description: 'Discover how Alkota UK pressure washers provide the ultimate cleaning solutions for various industrial applications including heavy equipment, degreasing, and food hygiene.',
};

const iconMap: Record<string, React.ReactNode> = {
  HardHat: <HardHat className="h-8 w-8 text-alkota-orange" />,
  Truck: <Truck className="h-8 w-8 text-alkota-orange" />,
  Droplets: <Droplets className="h-8 w-8 text-alkota-orange" />,
  Layers: <Layers className="h-8 w-8 text-alkota-orange" />,
  Home: <Home className="h-8 w-8 text-alkota-orange" />,
  Settings: <Settings className="h-8 w-8 text-alkota-orange" />,
  ShieldCheck: <ShieldCheck className="h-8 w-8 text-alkota-orange" />,
  Eraser: <Eraser className="h-8 w-8 text-alkota-orange" />,
  Activity: <Activity className="h-8 w-8 text-alkota-orange" />,
  GitMerge: <GitMerge className="h-8 w-8 text-alkota-orange" />,
  Snowflake: <Snowflake className="h-8 w-8 text-alkota-orange" />,
};

export default async function ApplicationsPage() {
  const query = `*[_type == "application"] | order(name asc) {
    name,
    slug,
    icon,
    description
  }`;

  const applications = await safeFetch(query, []);

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24">
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter text-white sm:text-7xl">
            BUILT FOR <span className="text-alkota-orange">YOUR WORK.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-alkota-silver">
            Explore dedicated cleaning solutions engineered for specialized industrial applications. If you can dream it, we can build it.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app: any) => (
            <Link 
              key={app.slug.current}
              href={`/applications/${app.slug.current}`}
              className="group relative flex flex-col justify-between overflow-hidden border border-alkota-iron bg-alkota-steel/30 p-8 transition-all hover:border-alkota-orange focus:outline-none focus:ring-2 focus:ring-alkota-orange/50 focus:ring-offset-2 focus:ring-offset-alkota-black"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-alkota-iron/50 transition-colors group-hover:bg-alkota-orange/10">
                {app.icon && iconMap[app.icon as string] ? iconMap[app.icon as string] : <Settings className="h-8 w-8 text-alkota-orange" />}
              </div>
              
              <div>
                <h3 className="mb-3 text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange transition-colors">
                  {app.name}
                </h3>
                <p className="text-sm text-alkota-steel leading-relaxed line-clamp-2">
                  {app.description}
                </p>
              </div>

              <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-alkota-orange">
                Explore Solutions
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
