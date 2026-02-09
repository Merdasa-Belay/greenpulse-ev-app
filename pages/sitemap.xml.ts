import type { GetServerSideProps } from "next";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = (process.env.NEXT_PUBLIC_APP_URL || "https://greenpulseaddis.vercel.app").replace(/\/+$/, "");
  const urls = [
    {
      loc: `${base}/`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.9",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default Sitemap;
