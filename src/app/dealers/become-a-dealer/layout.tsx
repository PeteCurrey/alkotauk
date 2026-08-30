import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become an Authorised Alkota Dealer | Commercial Partnership | Alkota UK',
  description: 'Discover the commercial benefits of partnering with Alkota UK. Premium American industrial pressure washers, generous dealer margins, warranty backing, and technical support across the UK.',
  openGraph: {
    title: 'Become an Authorised Alkota Dealer | Alkota UK',
    description: 'Grow your industrial cleaning equipment business with Alkota UK dealership partnerships.',
    url: 'https://alkota.co.uk/dealers/become-a-dealer',
  },
};

export default function BecomeDealerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
