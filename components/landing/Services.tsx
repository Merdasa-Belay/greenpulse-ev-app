"use client";

import { motion } from "framer-motion";
import {
    FaCarBattery,
    FaTools,
    FaChargingStation,
    FaMicrochip,
    FaShieldAlt,
    FaHeadset,
    FaCheckCircle,
} from "react-icons/fa";

export default function Services() {
    const services = [
        {
            icon: <FaCarBattery className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Battery Diagnostics",
            text: "Advanced diagnostics and maintenance for your EV's battery system to maximize range and lifespan.",
            features: [
                "State of Health analysis",
                "Cell balancing",
                "Thermal management check",
            ],
            color: "green",
        },
        {
            icon: <FaTools className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "Hybrid Maintenance",
            text: "Specialized care for hybrid vehicles, combining traditional and electric system expertise.",
            features: [
                "Regenerative braking inspection",
                "Power split device service",
                "HV cable integrity check",
            ],
            color: "blue",
        },
        {
            icon: <FaChargingStation className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Charging Solutions",
            text: "Installation, maintenance, and troubleshooting for all types of EV charging equipment.",
            features: [
                "Home charger installation",
                "Public station diagnostics",
                "Fast charger compatibility",
            ],
            color: "green",
        },
        {
            icon: <FaMicrochip className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "Software Updates",
            text: "Keep your vehicle's systems up-to-date with the latest performance enhancements and features.",
            features: [
                "BMS firmware updates",
                "Range optimization",
                "Charging curve adjustments",
            ],
            color: "blue",
        },
        {
            icon: <FaShieldAlt className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Safety Inspections",
            text: "Comprehensive safety checks specific to high-voltage electric vehicle systems.",
            features: [
                "HV isolation testing",
                "Emergency disconnect verification",
                "Crash sensor calibration",
            ],
            color: "green",
        },
        {
            icon: <FaHeadset className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "24/7 Roadside Assistance",
            text: "Specialized EV and hybrid support whenever and wherever you need it.",
            features: [
                "Flatbed towing for EVs",
                "Emergency charging",
                "HV system emergency protocols",
            ],
            color: "blue",
        },
    ];

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our <span className="text-green-500">Services</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive solutions for your electric and hybrid vehicles,
                        ensuring peak performance and longevity.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            className="service-card bg-white p-8 rounded-lg transition duration-300 hover:shadow-lg"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`w-16 h-16 ${service.bg} rounded-full flex items-center justify-center mb-6`}
                            >
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{service.text}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <FaCheckCircle
                                            className={`text-${service.color}-500 mr-2`}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
