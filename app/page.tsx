// Root landing page for initial public phase.
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Services from '@/components/landing/Services';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';
import Newsletter from '@/components/landing/Newsletter';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import NewNavbar from '@/components/ui/NewNavbar';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function LandingRootPage() {
  return (
    <main className="overflow-x-hidden min-h-screen bg-white pt-20 pb-24 md:pb-0">
      <NewNavbar />
      <Hero />
      <Features />
      <Services />
      <Stats />
      <Testimonials />
      <CTASection />
      <Newsletter />
      <Contact />
      <Footer />
      {/* Mobile bottom navigation (hidden on md+) */}
      <MobileBottomNav />
    </main>
  );
}
