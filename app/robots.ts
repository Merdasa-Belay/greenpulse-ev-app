import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulse-ev-app.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        // Only block auth & recovery endpoints; everything else implicitly allowed.
        disallow: ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
