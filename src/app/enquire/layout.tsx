import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Enquire | Alkota UK Industrial Machinery',
  description:
    'Direct factory technical enquiry and formal quotations from Alkota UK application engineers.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://alkota.co.uk/enquire',
  },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-neutral-900 flex flex-col antialiased">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
