import type { MetadataRoute } from 'next';

// Normalize base URL (remove trailing slashes) and fall back to production URL
const origin = (process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulseaddis.vercel.app').replace(/\/+$/, '');

const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/companions', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/companions/new', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/subscription', changeFrequency: 'monthly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${origin}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
