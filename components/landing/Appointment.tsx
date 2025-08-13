// components/landing/Appointment.tsx
"use client";

import { motion } from "framer-motion";
import { CalendarIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/solid";


const features = [
    {
        icon: CalendarIcon,
        title: "Easy Scheduling",
        description: "24/7 online booking",
    },
    {
        icon: ShieldCheckIcon,
        title: "Certified Experts",
        description: "EV-specific training",
    },
    {
        icon: BoltIcon,
        title: "Loaner Chargers",
        description: "While you wait",
    },
];


const Appointment = () => {
    return (
        <section id="appointment" className="py-20 bg-gradient-to-r from-green-500 to-blue-500">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Left Info Panel */}
                        <motion.div
                            className="md:w-1/2 bg-green-600 p-12 text-white"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Book Your Service</h2>
                            <p className="mb-8">
                                Schedule your EV or hybrid service appointment online and receive 10% off your first visit.
                            </p>
                            <div className="space-y-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{feature.title}</h4>
                                            <p className="text-sm opacity-90">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Form Panel */}
                        <motion.div
                            className="md:w-1/2 p-12"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Service Request</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="vehicle" className="block text-gray-700 mb-2">
                                        Vehicle Make/Model
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicle"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-gray-700 mb-2">
                                        Service Needed
                                    </label>
                                    <select
                                        id="service"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option>Battery Diagnostics</option>
                                        <option>Routine Maintenance</option>
                                        <option>Charger Installation</option>
                                        <option>Software Update</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition duration-300"
                                >
                                    Schedule Appointment
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
