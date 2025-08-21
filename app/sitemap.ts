import type { MetadataRoute } from 'next';

// Public, index-worthy routes only. Excludes auth & user-specific app areas.
// If later you add dynamic content (e.g. /companions/[id]), fetch & append.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulse-ev-app.vercel.app';
  const now = new Date().toISOString();

  // Avoid duplicate canonical targets: treat '/' as canonical for marketing homepage.
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number; }> = [
    { path: '/', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/companions', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/companions/new', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/subscription', changeFrequency: 'monthly', priority: 0.5 },
  ];

  return routes.map(r => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
