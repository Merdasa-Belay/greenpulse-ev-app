'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Assuming the original Navbar is here

const ConditionalNavbar = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname === '/landing';

  if (isLandingPage) {
    return null; // Don't render Navbar on the landing page
  }

  return <Navbar />;
};

export default ConditionalNavbar;
