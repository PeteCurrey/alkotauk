import { Metadata } from 'next';
import LobbyHeader from '@/components/lobby/LobbyHeader';
import LobbyFooter from '@/components/lobby/LobbyFooter';

export const metadata: Metadata = {
  title: {
    template: '%s | The Lobby — Alkota UK',
    default: 'The Lobby | Alkota UK Engineering Intelligence & Industry Platform',
  },
  description:
    'Alkota UK’s engineering intelligence repository: In-depth technical teardowns, heating coil metallurgy, UK wash bay environmental compliance, and thermodynamic cleaning science.',
  openGraph: {
    title: 'The Lobby | Alkota UK Engineering Intelligence',
    description:
      'Industrial pressure washer engineering teardowns, UK environmental regulations, and thermal fluid dynamics.',
    siteName: 'Alkota UK — The Lobby',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A18] selection:bg-[#FF6900] selection:text-white font-normal">
      <LobbyHeader />
      <main>{children}</main>
      <LobbyFooter />
    </div>
  );
}
