import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://greenpulse.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: "%s | Green Pulse",
    default: "EV Training & Maintenance Ethiopia | Green Pulse",
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
    title: "EV Training & Maintenance Ethiopia | Green Pulse",
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
    title: "EV Training & Maintenance Ethiopia | Green Pulse",
    description: "Local EV service & battery diagnostics training in Addis Ababa, Ethiopia.",
    images: ["/readme/thumbnail.png"],
    creator: "@greenpulse",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                  geo: { '@type': 'GeoCoordinates', latitude: 9.0108, longitude: 38.7870 },
                  areaServed: { '@type': 'Country', name: 'Ethiopia' },
                  sameAs: [
                    'https://twitter.com/greenpulse',
                    'https://www.linkedin.com/company/greenpulse'
                  ]
                },
                {
                  '@type': 'Course',
                  '@id': `${appUrl}#course-foundations`,
                  name: 'EV Foundations & Safety (Ethiopia)',
                  provider: { '@type': 'Organization', name: 'Green Pulse', sameAs: appUrl },
                  description: 'Introductory EV technician pathway focusing on safety, high-voltage basics and local maintenance context in Addis Ababa, Ethiopia.',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/PreOrder',
                    url: `${appUrl}/sign-up`,
                    validFrom: new Date().toISOString()
                  },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'onsite blended',
                    startDate: new Date(new Date().getFullYear(), 8, 1).toISOString(),
                    endDate: new Date(new Date().getFullYear(), 10, 30).toISOString(),
                    location: {
                      '@type': 'Place',
                      name: 'Green Pulse Training Lab',
                      address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Legesse Feleke Building, Megenagna',
                        addressLocality: 'Addis Ababa',
                        addressCountry: 'ET'
                      }
                    },
                    instructor: {
                      '@type': 'Person',
                      name: 'Certified EV Trainer'
                    }
                  }
                },
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
            })
          }}
        />
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
