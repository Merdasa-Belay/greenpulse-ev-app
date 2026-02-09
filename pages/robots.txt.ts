import type { GetServerSideProps } from "next";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = (process.env.NEXT_PUBLIC_APP_URL || "https://greenpulseaddis.vercel.app").replace(/\/+$/, "");
  res.setHeader("Content-Type", "text/plain");
  res.write(["User-agent: *", "Allow: /", `Sitemap: ${base}/sitemap.xml`, ""].join("\n"));
  res.end();
  return { props: {} };
};

export default Robots;
