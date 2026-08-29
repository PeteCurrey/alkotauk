interface Props {
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function WashPlantSchema({
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbs = [
    { name: 'Home', url: 'https://alkota.co.uk' },
    { name: 'Wash Plant Infrastructure', url: 'https://alkota.co.uk/wash-plant' }
  ]
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        provider: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
          logo: 'https://alkota.co.uk/logo.png',
          telephone: '+44-7912-506738',
          email: 'sales@alkota.co.uk',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'GB'
          }
        },
        serviceType: 'Industrial Wash Plant Design, Engineering & Maintenance',
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
