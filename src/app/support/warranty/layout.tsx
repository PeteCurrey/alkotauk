import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alkota 7-Year Heating Coil Warranty Registration | Alkota UK',
  description: 'Register your Alkota industrial pressure washer to activate the industry-leading 7-Year Schedule 80 heating coil warranty and standard machinery coverage.',
  openGraph: {
    title: '7-Year Coil Warranty Registration | Alkota UK Support',
    description: 'Activate your 7-year boiler warranty and access priority parts and technical support.',
    url: 'https://alkota.co.uk/support/warranty',
  },
};

export default function WarrantyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
