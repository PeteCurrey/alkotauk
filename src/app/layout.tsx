import type { Metadata } from "next";
import { Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { CartProvider } from "@/context/CartContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-work-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alkota.co.uk'),
  title: "Alkota UK | The Platinum Standard in Industrial Cleaning",
  description: "Highest quality hot water pressure washers, custom trailers, and industrial cleaning equipment. Born in South Dakota, built for the UK.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

import { PartsRequestProvider } from "@/components/parts/PartsRequestListContext";
import PartsRequestDrawer from "@/components/parts/PartsRequestDrawer";
import CartDrawer from "@/components/CartDrawer";
import { ComparisonProvider } from "@/lib/comparison/context";
import ComparisonDock from "@/components/comparison/ComparisonDock";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${workSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-alkota-bg text-alkota-black min-h-screen flex flex-col font-normal antialiased">
        <SessionProvider>
          <CartProvider>
            <PartsRequestProvider>
              <ComparisonProvider>
                <div className="flex-1 flex flex-col">
                  {children}
                </div>
                <PartsRequestDrawer />
                <CartDrawer />
                <ComparisonDock />
              </ComparisonProvider>
            </PartsRequestProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
