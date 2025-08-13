// components/landing/Contact.tsx
"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";


const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Get In <span className="text-green-500">Touch</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about our services or future vehicle imports? Our team is ready to assist you.
                    </p>
                </div>

                {/* Main content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Info */}
                    <motion.div
                        className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            {/* Location */}
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <MapPinIcon className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Our Locations</h4>
                                    <p className="text-gray-600">123 Green Ave, Seattle, WA</p>
                                    <p className="text-gray-600">456 Eco Blvd, Portland, OR</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <PhoneIcon className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
                                    <p className="text-gray-600">Main: (206) 555-0199</p>
                                    <p className="text-gray-600">Service: (206) 555-0188</p>
                                </div>
                            </div>

                            {/* Email */}
                            {/* Email */}
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <EnvelopeIcon className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
                                    <p className="text-gray-600">info@greenpulse.com</p>
                                    <p className="text-gray-600">service@greenpulse.com</p>
                                </div>
                            </div>
                            {/* Hours */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <ClockIcon className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Hours</h4>
                                    <p className="text-gray-600">Mon-Fri: 8:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Sat: 9:00 AM - 4:00 PM</p>
                                    <p className="text-gray-600">Sun: Emergency Only</p>
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="mt-8">
                            <h4 className="font-bold text-gray-800 mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                                >
                                    {/* Replace with actual SVG or icon */}
                                    F
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition duration-300"
                                >
                                    I
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition duration-300"
                                >
                                    T
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Y
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
