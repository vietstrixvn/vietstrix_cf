export function JsonLd() {
  const baseUrl = 'https://www.vietstrix.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Vietstrix',
    alternateName: 'Vietstrix Team',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-cricle.svg`,
    description:
      'Vietstrix is a product-driven freelance team building high-performance and scalable web applications. We partner with startups and businesses to turn ideas into reliable digital products — from design and development to deployment and growth.',
    sameAs: [
      'https://www.facebook.com/VietStrix',
      'https://github.com/vietstrixvn',
      'https://www.linkedin.com/company/vietstrix',
      'https://www.instagram.com/vietstrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Vietnamese'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Vietstrix',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Vietstrix',
    image: `${baseUrl}/imgs/OG-Image.png`,
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-cricle.svg`,
    telephone: '+84906723985',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nhieu Loc Ward',
      addressLocality: 'Ho Chi Minh City',
      addressRegion: 'Ho Chi Minh City',
      postalCode: '70000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.762622, // TODO: Cập nhật tọa độ chính xác từ GBP nếu cần
      longitude: 106.660172,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '00:00',
        closes: '00:00', // Closed on Sunday
      },
    ],
    sameAs: [
      'https://www.facebook.com/VietStrix',
      'https://github.com/vietstrixvn',
      'https://www.linkedin.com/company/vietstrix',
      'https://www.instagram.com/vietstrix',
      'https://clutch.co/profile/vietstrix',
      'https://www.goodfirms.co/company/vietstrix',
    ],
    // Chỉ thêm aggregateRating khi có reviews (reviewCount > 0)
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5.0',
    //   reviewCount: '1', // Must be positive integer
    // },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service`,
    serviceType: 'Software & Web Development Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vietstrix',
      url: baseUrl,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vietstrix Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'End-to-End Web Development',
            description: 'Custom, high-performance web development utilizing React, Next.js, and Node.js for scalability.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Design to Real Website',
            description: 'Automated conversion of AI-generated designs into clean, responsive, production-ready React/Next.js code.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Design & UI/UX',
            description: 'User-centric UI/UX design, wireframing, high-fidelity mockups, and interactive prototyping.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'MVP Development for Startups',
            description: 'Rapid product design and technical execution of Minimum Viable Products in under 4 weeks to validate business ideas.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Systems & Optimization',
            description: 'Performance audit, SEO optimization, and cloud migration services to scale digital products.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Redesign & Revamp',
            description: 'Redesigning existing websites to improve UI/UX, modernize appearance, and optimize user engagement.',
          },
        },
      ],
    },
  };

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'SiteNavigationElement',
        'position': 1,
        'name': 'Home',
        'url': baseUrl
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 2,
        'name': 'Services',
        'url': `${baseUrl}/services`
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 3,
        'name': 'Projects',
        'url': `${baseUrl}/projects`
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 4,
        'name': 'About Us',
        'url': `${baseUrl}/about-us`
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 5,
        'name': 'Blogs',
        'url': `${baseUrl}/blogs`
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 6,
        'name': 'Contact Us',
        'url': `${baseUrl}/contact-us`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
    </>
  );
}
