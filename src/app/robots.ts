import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://alkota.co.uk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/portal/',
          '/admin/',
          '/my-alkota/',
          '/service/my-alkota/',
          '/trailers/build/',
          '/trailers/asset/',
          '/api/',
          '/checkout/',
          '/cart/',
          '/dealer/dashboard/',
          '/dealer/orders/',
          '/dealer/parts/',
          '/dealer/resources/',
          '/dealer/training/',
          '/dealer/demo-days/',
          '/dealer/support/',
          '/dealer/marketing/',
          '/dealer/account/',
          '/dealer/invite/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/portal/',
          '/admin/',
          '/my-alkota/',
          '/service/my-alkota/',
          '/trailers/build/',
          '/trailers/asset/',
          '/api/',
          '/checkout/',
          '/cart/',
          '/dealer/dashboard/',
          '/dealer/orders/',
          '/dealer/parts/',
          '/dealer/resources/',
          '/dealer/training/',
          '/dealer/demo-days/',
          '/dealer/support/',
          '/dealer/marketing/',
          '/dealer/account/',
          '/dealer/invite/',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
