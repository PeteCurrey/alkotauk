import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety Data Sheets (SDS) & COSHH Compliance Portal | Alkota UK',
  description: 'Download official 16-point UK GB-CLP and REACH Safety Data Sheets (SDS) for all Alkota master chemical formulations including TR-407, DE-703, TS-602, and SD-927.',
  openGraph: {
    title: 'Chemical Safety Data Sheets (SDS) Portal | Alkota UK',
    description: 'Official GB-CLP Safety Data Sheets, COSHH documentation, and handling instructions for Alkota industrial chemicals.',
    url: 'https://alkota.co.uk/chemicals/safety-data',
  },
};

export default function ChemicalSafetyDataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
