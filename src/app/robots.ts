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
          '/trailers/build/',
          '/api/',
          '/checkout/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/portal/', '/admin/', '/my-alkota/', '/trailers/build/', '/api/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
