'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from "next/image";


// Define the types for the navigation items
interface NavItem {
  name: string;
  href: string;
}

// Navigation links data
const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Future Imports', href: '#future-imports' },
  { name: 'Contact', href: '#contact' },
];

const NewNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  // Track scroll position to toggle background + active section
  useEffect(() => {
    const sectionIds = navItems.map(i => i.href).filter(h => h.startsWith('#'));

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);
      // Determine active section (simple heuristic: last section above midpoint)
      let current = '';
      for (const id of sectionIds) {
        const el = document.querySelector<HTMLElement>(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          current = id;
        }
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Variants for the mobile menu animation
  const menuVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 0.8, 0.36, 1], staggerChildren: 0.08 }
    }
  };
  const menuItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'backdrop-blur-md bg-white/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]' : 'bg-transparent'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Green Pulse logo"
              width={56} // Slightly larger logo
              height={56}
              priority
              className="select-none transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${isActive ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-emerald-50"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Sign In
            </Link>
            <motion.a
              href="/sign-up"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <span>Sign Up</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(o => !o)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 z-50 w-[78%] max-w-sm h-full overflow-y-auto md:hidden bg-white/90 backdrop-blur-xl shadow-xl border-l border-slate-200/70"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <motion.div
                className="px-6 pt-6 pb-10 flex flex-col h-full"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
                    <Image src="/images/logo.svg" alt="Green Pulse" width={40} height={40} />
                    Green Pulse
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = active === item.href;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        variants={menuItemVariants}
                        className={`relative rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-700'}`}
                      >
                        {item.name}
                        {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-emerald-500" />}
                      </motion.a>
                    );
                  })}
                </nav>
                <div className="mt-10 space-y-3">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-white/70 px-5 py-3 text-sm font-medium text-emerald-700 backdrop-blur-sm hover:border-emerald-300 hover:bg-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:brightness-105"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="mt-auto pt-8 text-xs text-slate-500">
                  © {new Date().getFullYear()} Green Pulse. All rights reserved.
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NewNavbar;
