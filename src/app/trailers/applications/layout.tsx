import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Applications for Mobile Pressure Washer Trailers | Alkota UK',
  description: 'Specialised mobile washing configurations tailored for commercial fleets, highways graffiti removal, agricultural biosecurity, rail depots, and quarry plant.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/applications',
  },
};

export default function ApplicationsHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
