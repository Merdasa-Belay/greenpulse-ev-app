import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTASection from '@/components/landing/CTASection';
import type { Metadata } from 'next';
import Stat from '@/components/landing/Stats';
import Services from '@/components/landing/Services';

export const metadata: Metadata = {
    title: 'Green Pulse — Smarter EV Journeys',
    description:
        'Plan routes, optimize charging, and track your EV journey with intelligent insights. Built for students, teachers, and admins to learn and manage sustainably.',
    openGraph: {
        title: 'Green Pulse — Smarter EV Journeys',
        description:
            'Plan routes, optimize charging, and track your EV journey with intelligent insights.',
        url: 'https://your-domain.com/landing',
        siteName: 'Green Pulse',
        images: [
            {
                url: '/readme/thumbnail.png',
                width: 1200,
                height: 630,
                alt: 'Green Pulse preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Green Pulse — Smarter EV Journeys',
        description:
            'Plan routes, optimize charging, and track your EV journey with intelligent insights.',
        images: ['/readme/thumbnail.png'],
    },
};

export default function LandingPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Green Pulse',
        url: 'https://your-domain.com',
        logo: 'https://your-domain.com/images/logo.svg',
        sameAs: [
            'https://twitter.com/your-handle',
            'https://www.linkedin.com/company/your-company',
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero />
            <Stat />
            <Services />
            <Features />
            <CTASection />
        </main>
    );
}
