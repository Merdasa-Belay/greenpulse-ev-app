import { MetadataRoute } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';

const base = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulseaddis.vercel.app/';
const now = new Date().toISOString();

const routes = [
  { path: '/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/companions', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/companions/new', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/subscription', changeFrequency: 'monthly', priority: 0.5 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (r) => `<url>
    <loc>${base}${r.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changeFrequency}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  res.status(200).send(xml);
}
