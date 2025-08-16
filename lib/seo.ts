// Central SEO utility helpers
import type { Metadata } from 'next';

interface GeneratePageMetaArgs {
  title: string;
  description: string;
  path?: string; // relative path e.g. '/dashboard'
  image?: { url: string; width?: number; height?: number; alt?: string };
  noIndex?: boolean;
  keywords?: string[];
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulse.com';

export function generatePageMetadata({ title, description, path = '/', image, noIndex, keywords }: GeneratePageMetaArgs): Metadata {
  const url = new URL(path, appUrl).toString();
  const imageObj = image || { url: '/readme/thumbnail.png', width: 1200, height: 630, alt: 'Green Pulse preview' };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Green Pulse',
      images: [imageObj],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageObj.url]
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    keywords,
  };
}

// Serialize structured data (JSON-LD). Accepts a generic record with unknown values for flexibility.
export function buildJsonLd<T extends Record<string, unknown>>(data: T): string {
  return JSON.stringify(data);
}
