import Hero from '@/components/landing/Hero';
import FeatureSection from '@/components/landing/Feature';
// import Features from '@/components/landing/Features';
// import CTASection from '@/components/landing/CTASection';
import type { Metadata } from 'next';
import Stat from '@/components/landing/Stats';
import Services from '@/components/landing/Services';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials.client';

import Appointment from '@/components/landing/Appointment';

import Contact from '@/components/landing/Contact';
import Map from '@/components/landing/Map';
import Newsletter from '@/components/landing/Newsletter';
import Footer from '@/components/landing/Footer';








import NewNavbar from '@/components/ui/NewNavbar';

import MobileBottomNav from '@/components/MobileBottomNav';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenpulse.com';

export const metadata: Metadata = {
    title: 'Green Pulse — Smarter EV Journeys',
    description:
        'Plan routes, optimize charging, and track your EV journey with intelligent insights. Built for students, teachers, and admins to learn and manage sustainably.',
    openGraph: {
        title: 'Green Pulse — Smarter EV Journeys',
        description:
            'Plan routes, optimize charging, and track your EV journey with intelligent insights.',
        url: `${appUrl}/landing`,
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
    other: {
        'json-ld': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Green Pulse',
            url: appUrl,
            logo: `${appUrl}/images/logo.svg`,
            sameAs: [
                'https://twitter.com/your-handle',
                'https://www.linkedin.com/company/your-company',
            ],
        }),
    },
};

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pb-24 md:pb-0 transition-colors">
            <NewNavbar />
            <Hero />
            <Stat />
            <FeatureSection />
            <Services />
            <About />
            <Testimonials />
            <Appointment />
            <Contact />
            <Map />
            <Newsletter />
            <Footer />
            {/* Mobile bottom navigation (hidden on md+) */}
            <MobileBottomNav />
        </main>
    );
}

