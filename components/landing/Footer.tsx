"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { FaTiktok, FaTwitter, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import SocialButton from "../ui/SocialButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

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
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-green-200/70 transition-shadow duration-300 group">
                                <span className="text-xl">
                                    <Image
                                        src="/images/logo.svg"
                                        alt="Green Pulse logo"
                                        width={60}
                                        height={60}
                                        priority
                                        className="
    select-none
    transition-all duration-500 ease-out
    hover:scale-110 hover:rotate-3
    drop-shadow-[0_3px_8px_rgba(20,200,143,0.4)]
    hover:drop-shadow-[0_5px_14px_rgba(20,200,143,0.55)]
  "
                                    />


                                </span>
                            </div>

                            <a href="#" className="ml-3 text-2xl font-bold">
                                Green<span className="text-[#14C88F]">Pulse</span>

                            </a>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Empowering Ethiopia’s EV future with maintenance service, consultation, expert training, hands-on practice, and sustainable mobility solutions.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {/* Social Media Buttons */}
                            <SocialButton
                                href="https://www.tiktok.com/@greenpulseaddis"
                                label="TikTok"
                                brand="#010101"
                                icon={<FaTiktok className="text-[1.1rem]" />}
                            />
                            <SocialButton
                                href="https://twitter.com/yourhandle"
                                label="Twitter"
                                brand="#1DA1F2"
                                icon={<FaTwitter className="text-[1.1rem]" />}
                            />
                            <SocialButton
                                href="https://www.youtube.com/@greenpulse-addis"
                                label="YouTube"
                                brand="#FF0000"
                                icon={<FaYoutube className="text-[1.1rem]" />}
                            />
                            <SocialButton
                                href="https://t.me/Evcarsethio"
                                label="Telegram"
                                brand="#0088CC"
                                icon={<FaTelegramPlane className="text-[1.1rem]" />}
                            />
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
                                <span className="text-gray-400">Megenagna, Addis Ababa, Legesse Feleke Building</span>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">+251911758111 +251912072341
                                    +251913024687</span>
                            </li>
                            <li className="flex items-start">
                                <EnvelopeIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">info@greenpulse.com</span>
                            </li>
                            <li className="flex items-start">
                                <ClockIcon className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                <span className="text-gray-400">Mon-Sat: 8AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; 2024 Green Pulse. All rights reserved.
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
