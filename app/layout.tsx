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
    template: "%s | GreenPulse EV",
    default: "GreenPulse EV — EV & Green Tech Skills",
  },
  description:
    "Smart EV routing, charging optimization, and contextual EV & green tech learning for emerging markets.",
  alternates: {
    canonical: appUrl,
  },
  openGraph: {
    title: "GreenPulse EV — Smarter EV Journeys",
    description:
      "Plan routes, optimize charging, and build EV maintenance & green energy skills.",
    url: appUrl,
    siteName: "GreenPulse EV",
    type: "website",
    images: [
      {
        url: "/readme/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Green Pulse platform preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenPulse EV — Smarter EV Journeys",
    description:
      "Optimize charging & learn EV maintenance skills with localized content.",
    images: ["/readme/thumbnail.png"],
    creator: "@greenpulse",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  category: "education",
  keywords: [
    "EV training",
    "electric vehicle",
    "battery maintenance",
    "green tech skills",
    "Ethiopia",
    "charging optimization",
    "sustainability",
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
