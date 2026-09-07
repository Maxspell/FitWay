import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/*?*_rsc=*', '/_next/'],
    },
    sitemap: 'https://fitway.best/sitemap.xml',
  };
}
