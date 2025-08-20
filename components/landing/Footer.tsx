"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { FaTiktok, FaTwitter, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import SocialButton from "../ui/SocialButton";
import Image from "next/image";

const Footer = () => {
    // Scroll button removed per branding simplification

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
                            Ethiopia’s EV knowledge hub—training technicians, servicing electric & hybrid vehicles, and advising institutions on sustainable adoption.
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            Green Pulse not only trains — we also support real maintenance, diagnostics, and deployment.
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
                        <div className="flex flex-col items-center md:items-start gap-2 mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">&copy; 2024 Green Pulse. All rights reserved.</p>
                            <p className="text-[11px] text-gray-500 tracking-wide uppercase">Training • Service • Consultation • Sustainability</p>
                        </div>
                        <div className="flex space-x-6">
                            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
                                <a key={link} href="#" className="text-gray-400 hover:text-green-500 text-sm transition duration-300">{link}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button removed */}
        </footer>
    );
};

export default Footer;
