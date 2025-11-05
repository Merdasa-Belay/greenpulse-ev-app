import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { buildCourseJsonLd, sanitizeCourseGraph } from "@/lib/structuredData";
import "./globals.css";
import ConditionalNavbar from "@/components/ui/ConditionalNavbar";
import EnvironmentBadge from "@/components/env/EnvironmentBadge";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://greenpulseaddis.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: "%s | Green Pulse",
    default: "Green Pulse EV Training & Maintenance in Ethiopia",
  },
  description:
    "Hands-on electric vehicle training, maintenance & battery diagnostics in Addis Ababa, Ethiopia. Build EV service skills fast with local, practical courses.",
  alternates: { canonical: appUrl },
  keywords: [
    "EV Ethiopia",
    "Electric Vehicle Training Ethiopia",
    "EV Maintenance Addis Ababa",
    "Battery Diagnostics Ethiopia",
    "Ethiopia Electric Mobility",
    "EV Service Ethiopia",
  ],
  openGraph: {
    title: "Green Pulse EV Training & Maintenance in Ethiopia",
    description:
      "Practical EV training & maintenance services in Addis Ababa. Local courses, diagnostics, workshops & certification pathways.",
    url: appUrl,
    siteName: "Green Pulse",
    locale: "en_ET",
    type: "website",
    images: [
      {
        url: "/readme/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "EV technician training session in Addis Ababa workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Pulse EV Training & Maintenance in Ethiopia",
    description: "Local EV service & battery diagnostics training in Addis Ababa, Ethiopia.",
    images: ["/readme/thumbnail.png"],
    creator: "@greenpulseaddis",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  category: "education",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured Data: LocalBusiness + Course (+ WebSite for completeness) */}
        {(() => {
          const graph = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LocalBusiness',
                '@id': `${appUrl}#business`,
                name: 'Green Pulse',
                image: `${appUrl}/readme/thumbnail.png`,
                url: appUrl,
                telephone: '+251911758111',
                description: 'EV training and maintenance services in Addis Ababa, Ethiopia: battery diagnostics, safety, workshops and technician upskilling.',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Legesse Feleke Building, Megenagna',
                  addressLocality: 'Addis Ababa',
                  addressCountry: 'ET'
                },
                geo: { '@type': 'GeoCoordinates', latitude: 9.0072312, longitude: 38.8062175 },
                // Link to a Google Maps listing for the business location
                hasMap: 'https://www.google.com/maps/place/Totot+Traditional+Food+Hall+%7C+Gerji+%7C+%E1%89%B6%E1%89%B6%E1%89%B5+%7C+%E1%8C%88%E1%88%AD%E1%8C%82/@9.0072312,38.8062175,17z/data=!3m1!4b1!4m6!3m5!1s0x164b8599dd6be6a5:0x6f01def6f8644ea2!8m2!3d9.0072312!4d38.8062175!16s%2Fg%2F11j5qlc4dr?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D',
                areaServed: { '@type': 'Country', name: 'Ethiopia' },
                sameAs: [
                  'https://x.com/greenpulseaddis',
                  'https://www.linkedin.com/company/greenpulse'
                ]
              },
              buildCourseJsonLd({
                name: 'EV Foundations & Safety (Ethiopia)',
                description: 'Introductory EV technician course focused on safety, high-voltage basics, battery fundamentals and local maintenance context in Addis Ababa, Ethiopia.',
                providerName: 'Green Pulse',
                providerURL: appUrl,
                startDate: new Date(new Date().getFullYear(), 8, 1).toISOString().split('T')[0],
                endDate: new Date(new Date().getFullYear(), 10, 30).toISOString().split('T')[0],
                courseMode: 'hybrid',
                courseWorkload: '6 weeks',
                locationName: 'Green Pulse Training Lab',
                streetAddress: 'Legesse Feleke Building, Megenagna',
                addressLocality: 'Addis Ababa',
                addressCountry: 'ET',
                instructorName: 'Certified EV Trainer',
                offerURL: `${appUrl}/sign-up`,
                price: 0,
                priceCurrency: 'USD',
                availability: 'https://schema.org/PreOrder',
                offerCategory: 'Certificate Course'
              }),
              {
                '@type': 'WebSite',
                '@id': `${appUrl}#website`,
                url: appUrl,
                name: 'Green Pulse',
                description: 'EV training & maintenance: diagnostics, safety & practical workshops in Ethiopia.',
                inLanguage: 'en',
                publisher: { '@id': `${appUrl}#business` },
                potentialAction: [
                  {
                    '@type': 'SearchAction',
                    target: `${appUrl}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                  }
                ]
              }
            ]
          };
          const sanitized = sanitizeCourseGraph(graph);
          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitized) }}
            />
          );
        })()}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta
            name="msvalidate.01"
            content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}
          />
        )}
        {process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION && (
          <meta
            name="yandex-verification"
            content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION}
          />
        )}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${bricolage.variable} antialiased transition-colors duration-300 bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[100] bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded shadow"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <AuthProvider>
            <EnvironmentBadge />
            <ConditionalNavbar />
            <div id="main">{children}</div>
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
