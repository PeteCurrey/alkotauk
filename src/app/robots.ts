import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://alkota.co.uk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/portal/', // Protect dealer portal from being indexed
          '/api/',    // Protect API routes
          '/checkout/', // Protect checkout flow
        ],
      },
      {
        userAgent: 'GPTBot', // Allow AI crawlers for help/info but restrict sensitive areas
        allow: '/',
        disallow: ['/portal/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
