import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Alkota UK | Direct Technical Sales, Service & Parts Desk',
  description: 'Direct contact with Alkota UK engineers, parts specialists, and mobile service coordinators. Request technical machinery specifications, on-site demonstrations, or rapid parts lookup.',
  openGraph: {
    title: 'Contact Alkota UK | Industrial Cleaning Equipment Specialists',
    description: 'Direct engineering support, nationwide service dispatch, and parts sourcing across the United Kingdom.',
    url: 'https://alkota.co.uk/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
