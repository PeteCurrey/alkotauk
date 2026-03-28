import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { BookOpen, Shield, Wrench, Settings, HelpCircle, GraduationCap, ClipboardList, Book } from 'lucide-react';

export const metadata = {
  title: 'Alkota UK Support Hub | Service, Warranty & Documentation',
  description: 'Access the Alkota UK support hub for manuals, warranty registration, service requests, and operator training.',
};

export default function SupportHubPage() {
  const supportLinks = [
    { title: 'Service & Repair', desc: 'Book a service or request breakdown support.', href: '/support/service', icon: <Wrench className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Warranty', desc: 'Register your machine or review terms.', href: '/support/warranty', icon: <Shield className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Manuals', desc: 'Download operating manuals and diagrams.', href: '/support/manuals', icon: <BookOpen className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Replacement Parts', desc: 'Look up specific parts for your machine.', href: '/support/replacement-parts', icon: <Settings className="h-8 w-8 text-alkota-orange" /> },
    { title: 'FAQs', desc: 'Frequently asked technical and sales questions.', href: '/support/faqs', icon: <HelpCircle className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Training', desc: 'Operator training and certification courses.', href: '/support/training', icon: <GraduationCap className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Wash Plant Management', desc: 'Multi-site PPM and asset lifecycle control.', href: '/support/wash-plant-management', icon: <ClipboardList className="h-8 w-8 text-alkota-orange" /> },
    { title: 'Glossary', desc: 'Pressure washer terminology explained.', href: '/support/glossary', icon: <Book className="h-8 w-8 text-alkota-orange" /> },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            ALKOTA UK <span className="text-alkota-orange">SUPPORT.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-alkota-silver">
            Direct access to manuals, service dispatch, and technical resources to keep your Platinum Standard equipment running flawlessly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportLinks.map((link) => (
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
      </div>
    </main>
  );
}
