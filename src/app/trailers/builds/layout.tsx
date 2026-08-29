import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Bespoke Trailer Rig Case Studies & Handover Gallery | Alkota UK',
  description: 'Explore verified bespoke Alkota trailer builds across UK haulage fleets, highways maintenance, civil engineering, and zero-drainage airport operations.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/builds',
  },
};

export default function BuildsHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
