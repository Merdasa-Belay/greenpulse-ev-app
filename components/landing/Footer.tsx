// components/landing/Footer.tsx
"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = () => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                                <span className="text-white text-xl">🌱</span>
                            </div>
                            <a href="#" className="ml-3 text-2xl font-bold">
                                Green<span className="text-green-500">Pulse</span>
                            </a>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Pioneering sustainable mobility solutions through innovation and exceptional service.
                        </p>
                        <div className="flex space-x-4">
                            {["facebook", "twitter", "instagram", "linkedin"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-white transition duration-300"
                                >
                                    {s.charAt(0).toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {["Home", "Services", "About Us", "Future Imports", "Contact"].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(/\s/g, "")}`} className="text-gray-400 hover:text-green-500 transition duration-300">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {["EV Maintenance", "Hybrid Service", "Battery Diagnostics", "Charger Installation", "Software Updates"].map((s) => (
                                <li key={s}>
                                    <a href="#" className="text-gray-400 hover:text-green-500 transition duration-300">{s}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Info</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">123 Green Ave, Seattle, WA 98101</span>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">(206) 555-0199</span>
                            </li>
                            <li className="flex items-start">
                                <EnvelopeIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">info@greenpulse.com</span>
                            </li>
                            <li className="flex items-start">
                                <ClockIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">Mon-Fri: 8AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; 2023 Green Pulse. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
                                <a key={link} href="#" className="text-gray-400 hover:text-green-500 text-sm transition duration-300">{link}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 hover:bg-green-600"
                    >
                        <ArrowUpIcon className="h-6 w-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;
