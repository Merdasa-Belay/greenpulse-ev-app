"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { FaTiktok, FaTwitter, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import SocialButton from "../ui/SocialButton";
import Image from "next/image";

const Footer = () => {
    const googleMapsUrl = 'https://www.google.com/maps/place/Totot+Traditional+Food+Hall+%7C+Gerji+%7C+%E1%89%B6%E1%89%B6%E1%89%B5+%7C+%E1%8C%88%E1%88%AD%E1%8C%82/@9.0072312,38.8062175,17z/data=!3m1!4b1!4m6!3m5!1s0x164b8599dd6be6a5:0x6f01def6f8644ea2!8m2!3d9.0072312!4d38.8062175!16s%2Fg%2F11j5qlc4dr?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D';
    const latitude = 9.0072312;
    const longitude = 38.8062175;
    return (
        <footer className="relative py-12 bg-gradient-to-t from-emerald-50/40 dark:from-slate-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center mb-3">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm ring-1 ring-emerald-200 dark:ring-emerald-800">
                                <Image src="/images/logo.svg" alt="Green Pulse logo" width={48} height={48} priority className="h-10 w-auto" />
                            </div>
                            <a href="#" className="ml-3 text-2xl font-bold leading-none">
                                Green<span className="text-emerald-500">Pulse</span>
                            </a>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Ethiopia’s EV training & service hub — practical skills, safer workshops.</p>
                        <div className="flex flex-wrap gap-3 mt-3">
                            <SocialButton href="https://www.tiktok.com/@greenpulseaddis" label="TikTok" brand="#010101" icon={<FaTiktok />} />
                            <SocialButton href="https://twitter.com/yourhandle" label="Twitter" brand="#1DA1F2" icon={<FaTwitter />} />
                            <SocialButton href="https://www.youtube.com/@greenpulse-addis" label="YouTube" brand="#FF0000" icon={<FaYoutube />} />
                            <SocialButton href="https://t.me/Evcarsethio" label="Telegram" brand="#0088CC" icon={<FaTelegramPlane />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            {['Home', 'Services', 'About', 'Contact'].map(l => (
                                <li key={l}><a href={`#${l.toLowerCase().replace(/\s/g, '')}`} className="hover:text-emerald-600 transition">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            {['EV Maintenance', 'Battery Diagnostics', 'Capstone Projects'].map(s => (
                                <li key={s}><a href="#" className="hover:text-emerald-600 transition">{s}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPinIcon className="h-5 w-5 text-emerald-500 mt-1" />
                                <div>
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:underline"
                                        aria-label="Open Green Pulse location in Google Maps"
                                    >
                                        Around Totot Traditional Food Hall | Gerji
                                    </a>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}{' '}
                                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="ml-2 hover:underline text-emerald-600">
                                            Open in Google Maps
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <PhoneIcon className="h-5 w-5 text-emerald-500 mt-1" />
                                <a href="tel:+251912072341" className="hover:underline">+251912072341</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <EnvelopeIcon className="h-5 w-5 text-emerald-500 mt-1" />
                                <a href="mailto:info@greenpulse.com" className="hover:underline">info@greenpulse.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-emerald-100/60 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Green Pulse — Training · Service · Sustainability</div>
                        <div className="flex gap-4 text-sm">
                            <a href="#" className="hover:text-emerald-600">Privacy</a>
                            <a href="#" className="hover:text-emerald-600">Terms</a>
                            <a href="#" className="hover:text-emerald-600">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
