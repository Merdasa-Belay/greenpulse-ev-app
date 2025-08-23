/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    // Serve AVIF/WebP where supported
    formats: ['image/avif', 'image/webp'],
    // Allow common external image hosts still referenced in the codebase
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        // Long cache for built static assets
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Long cache for images served from the public/images (or /images) folder
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Long cache for common image extensions under public/
        source: '/:all*(png|jpg|jpeg|webp|avif|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
