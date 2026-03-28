import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Newspaper, FileText, Video, Banknote, HelpCircle, HardDrive, Tag, Clock } from 'lucide-react';

export const metadata = {
  title: 'Resource Centre | Alkota UK',
  description: 'Access the Alkota UK Resource Centre. Read Good Clean News, view case studies, and download buying guides.',
};

export default function ResourcesHubPage() {
  const resourceLinks = [
    { title: 'Good Clean News (Blog)', desc: 'The latest updates, tips, and industry news.', href: '/resources/blog', icon: <Newspaper className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Testimonials & Case Studies', desc: 'Real-world examples of Alkota power.', href: '/resources/case-studies', icon: <FileText className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Document Library', desc: 'Brochures, catalogs, and technical downloads.', href: '/resources/downloads', icon: <HardDrive className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Video Vault', desc: 'Demonstrations and instructional videos.', href: '/resources/videos', icon: <Video className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Buying Guide', desc: 'How to choose the right industrial washer.', href: '/resources/buying-guide', icon: <HelpCircle className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Financial Solutions', desc: 'Leasing, rental, and TCO breakdowns.', href: '/resources/financing', icon: <Banknote className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Plaque Rental Programme', desc: 'Long-term corporate rental solutions.', href: '/resources/rent', icon: <Clock className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Short-Term Hire', desc: 'Coming soon. Hire an Alkota for the day.', href: '/resources/hire', icon: <Tag className="h-8 w-8 text-alkota-orange" /> },
  ];

  const guideLinks = [
    { title: 'Hot vs Cold Water', href: '/resources/hot-water-vs-cold-water' },
    { title: 'Nozzles Explained', href: '/resources/nozzles-explained' },
    { title: 'Coil Systems Guide', href: '/resources/coil-guide' },
    { title: 'Total Cost of Ownership', href: '/resources/total-cost-of-ownership' },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            RESOURCE <span className="text-alkota-orange">CENTRE.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-alkota-silver">
            Everything you need to make an informed decision and run a profitable wash operation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {resourceLinks.map((link) => (
            <Link 
              key={link.title}
              href={link.href}
              className="group flex flex-col justify-between border border-alkota-iron bg-alkota-steel/30 p-8 transition-colors hover:border-alkota-orange"
            >
              <div className="mb-6 h-12 w-12 text-alkota-steel group-hover:text-alkota-orange transition-colors flex items-center justify-center">
                {link.icon}
              </div>
              <div>
                <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">
                  {link.title}
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-alkota-iron pt-16">
           <h2 className="mb-10 text-3xl font-black uppercase italic tracking-tighter text-white">Deep Dive <span className="text-alkota-orange">Guides.</span></h2>
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guideLinks.map(guide => (
                 <Link key={guide.title} href={guide.href} className="group border-l-4 border-alkota-iron pl-4 py-2 hover:border-alkota-orange transition-all">
                    <span className="text-lg font-bold text-alkota-silver group-hover:text-white transition-colors">{guide.title}</span>
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </main>
  );
}
