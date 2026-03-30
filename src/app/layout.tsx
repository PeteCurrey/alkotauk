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

import { supabaseAdmin } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('key, value');
  
  const settingsMap: Record<string, string> = {};
  settings?.forEach(s => { settingsMap[s.key] = s.value; });

  return generateSeo({
    title: settingsMap['site_name'] || "Alkota UK",
    description: settingsMap['meta_description'],
  });
}

import { SessionProvider } from "@/components/SessionProvider";
import AlkotaAdvisor from "@/components/AlkotaAdvisor";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import SplashScreen from "@/components/SplashScreen";
import SiteBanner from "@/components/SiteBanner";

async function getSiteSettings() {
  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('key, value');
  
  const { data: banners } = await supabaseAdmin
    .from('banners')
    .select('*')
    .eq('active', true);

  const settingsMap: Record<string, string> = {};
  settings?.forEach(s => { settingsMap[s.key] = s.value; });

  return { 
    ...settingsMap, 
    banners: (banners || []) as any[] 
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-url") || "";
  const isAdminPage = pathname.startsWith("/admin");
  const isStudio = pathname.startsWith("/studio");

  // Fetch settings for maintenance and common UI
  const settings = await getSiteSettings() as Record<string, any>;
  const isMaintenance = settings['maintenance_mode'] === 'true';
  const showSplash = settings['enable_splash'] === 'true';
  const activeBanner = settings.banners?.[0];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-inter bg-alkota-bg text-alkota-black text-base">
        <CartProvider>
          <SessionProvider>
            {isStudio ? (
               <div className="h-full bg-white">
                 {children}
               </div>
            ) : isMaintenance && !isAdminPage ? (
              <MaintenanceScreen 
                title="System Maintenance"
                message={settings['maintenance_message']}
                phone={settings['maintenance_phone']}
              />
            ) : (
              <>
                {!isAdminPage && showSplash && <SplashScreen />}
                <div className="flex-1 flex flex-col">
                  {!isAdminPage && activeBanner && (
                    <SiteBanner />
                  )}
                  {children}
                </div>
                {!isAdminPage && <Footer />}
                <CartDrawer />
                {!isAdminPage && <AlkotaAdvisor />}
              </>
            )}
          </SessionProvider>
        </CartProvider>

        {/* Analytics Scripts */}
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
      </body>
    </html>
  );
}

