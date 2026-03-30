import type { Metadata } from "next";
import { Inter, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { safeFetch, getMockSettings } from "@/sanity/client";
import { generateSeo } from "@/lib/seo";
import Script from 'next/script';
import { headers, cookies } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await safeFetch(`*[_type == "siteSettings"][0]`, getMockSettings());
  return generateSeo({
    title: siteSettings?.title || "Alkota UK",
    description: siteSettings?.seoGroup?.defaultDescription,
  });
}

import { SessionProvider } from "@/components/SessionProvider";
import AlkotaAdvisor from "@/components/AlkotaAdvisor";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import SplashScreen from "@/components/SplashScreen";
import SiteBanner from "@/components/SiteBanner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-url") || "";
  const isStudio = pathname.startsWith("/studio") || pathname.startsWith("/admin");

  const siteSettings = await safeFetch(`*[_type == "siteSettings"][0]`, getMockSettings());
  
  const isMaintenanceMode = siteSettings?.maintenanceGroup?.isMaintenanceMode || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('alkota_admin_access')?.value === 'true';
  const isMaintenance = isMaintenanceMode && !isAdmin;

  const splashSeen = cookieStore.get('alkota_splash_seen');
  const showSplash = siteSettings?.visualExperience?.enableSplashScreen && !splashSeen;
  const showBanner = siteSettings?.bannerGroup?.showGlobalBanner;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-inter bg-alkota-bg text-alkota-black text-base">
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* Hotjar Tracking Code */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>

        {isStudio ? (
          <div className="h-full bg-white">
            {children}
          </div>
        ) : isMaintenance ? (
          <MaintenanceScreen 
            title={siteSettings?.maintenanceGroup?.maintenanceTitle}
            message={siteSettings?.maintenanceGroup?.maintenanceMessage}
            videoId={siteSettings?.maintenanceGroup?.maintenanceVideoUrl}
            phone={siteSettings?.maintenanceGroup?.maintenancePhone}
          />
        ) : (
          <>
            {showSplash && <SplashScreen title={siteSettings?.visualExperience?.splashTitle} />}
            <SessionProvider>
              <CartProvider>
                <div className="flex-1 flex flex-col">
                  {showBanner && (
                    <SiteBanner 
                      text={siteSettings?.bannerGroup?.bannerText}
                      link={siteSettings?.bannerGroup?.bannerLink}
                      type={siteSettings?.bannerGroup?.bannerType}
                    />
                  )}
                  {children}
                </div>
                <Footer />
                {/* Native cart drawer — replaces Snipcart */}
                <CartDrawer />
                {/* AI Technical Advisor */}
                <AlkotaAdvisor />
              </CartProvider>
            </SessionProvider>
          </>
        )}
      </body>
    </html>
  );
}

