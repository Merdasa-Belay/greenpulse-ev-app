import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://greenpulse.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/landing'],
        disallow: ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
