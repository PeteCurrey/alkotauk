import type { Metadata } from "next";
import { Inter, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Alkota UK | The Platinum Standard in Industrial Cleaning",
  description: "Highest quality hot water pressure washers, custom trailers, and industrial cleaning equipment. Born in South Dakota, built for the UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-alkota-bg text-alkota-black min-h-screen flex flex-col antialiased">
        <SessionProvider>
          <CartProvider>
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

