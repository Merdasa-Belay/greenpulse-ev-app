import Hero from '@/components/landing/Hero';
import FeatureSection from '@/components/landing/Feature';
// import Features from '@/components/landing/Features';
// import CTASection from '@/components/landing/CTASection';
import type { Metadata } from 'next';
import Script from 'next/script';
import Stat from '@/components/landing/Stats';
import Services from '@/components/landing/Services';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials.client';

import Appointment from '@/components/landing/Appointment';

import Contact from '@/components/landing/Contact';
import Map from '@/components/landing/Map';
import FAQ from '@/components/landing/FAQ';
import Newsletter from '@/components/landing/Newsletter';
import Footer from '@/components/landing/Footer';








import NewNavbar from '@/components/ui/NewNavbar';

import MobileBottomNav from '@/components/MobileBottomNav';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulse.com';

const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Green Pulse',
    url: appUrl,
    logo: `${appUrl}/images/logo.svg`,
    sameAs: [
        'https://twitter.com/greenpulse',
        'https://www.linkedin.com/company/greenpulse'
    ]
};

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Green Pulse',
    url: `${appUrl}/landing`,
    potentialAction: {
        '@type': 'SearchAction',
        target: `${appUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
    }
};

const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
        'Battery Intelligence', 'Smart Charging', 'Hands‑On Skills', 'Sustainability'
    ].map((name, i) => ({
        '@type': 'Service',
        position: i + 1,
        name,
        provider: { '@type': 'Organization', name: 'Green Pulse' },
        areaServed: 'ET'
    }))
};

const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${appUrl}/landing` },
        { '@type': 'ListItem', position: 2, name: 'Features', item: `${appUrl}/landing#features` },
        { '@type': 'ListItem', position: 3, name: 'Learning Paths', item: `${appUrl}/landing#paths` }
    ]
};

export const metadata: Metadata = {
    title: 'Green Pulse — Smarter EV Journeys',
    description: 'Plan routes, optimize charging, and track your EV journey with intelligent insights. Built for students, teachers, and admins to learn and manage sustainably.',
    alternates: { canonical: `${appUrl}/landing` },
    openGraph: {
        title: 'Green Pulse — Smarter EV Journeys',
        description: 'Plan routes, optimize charging, and track your EV journey with intelligent insights.',
        url: `${appUrl}/landing`,
        siteName: 'Green Pulse',
        images: [{ url: '/readme/thumbnail.png', width: 1200, height: 630, alt: 'Green Pulse preview' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Green Pulse — Smarter EV Journeys',
        description: 'Plan routes, optimize charging, and track your EV journey with intelligent insights.',
        images: ['/readme/thumbnail.png'],
    },
};

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pb-24 md:pb-0 transition-colors">
            <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(orgJsonLd)}</Script>
            <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(websiteJsonLd)}</Script>
            <Script id="ld-services" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(servicesJsonLd)}</Script>
            <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(breadcrumbJsonLd)}</Script>
            <NewNavbar />
            <Hero />
            <Stat />
            <FeatureSection />
            <Services />
            <About />
            <Testimonials />
            <Appointment />
            <Contact />
            <FAQ />
            <Map />
            <Newsletter />
            <Footer />
            {/* Mobile bottom navigation (hidden on md+) */}
            <MobileBottomNav />
        </main>
    );
}

