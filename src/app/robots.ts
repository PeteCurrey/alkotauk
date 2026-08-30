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
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
