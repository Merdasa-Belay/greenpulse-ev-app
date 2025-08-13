"use client";
import { motion } from "framer-motion";


interface Testimonial {
    name: string;
    role: string;
    message: string;
    avatarColor: string;
    iconColor: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Johnson",
        role: "Tesla Model 3 Owner",
        message:
            "Green Pulse saved me thousands by identifying a battery issue my dealership missed. Their EV expertise is unmatched!",
        avatarColor: "bg-green-100",
        iconColor: "text-green-500",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Toyota Prius Prime Owner",
        message:
            "As a hybrid owner, I appreciate technicians who understand both systems. Green Pulse does phenomenal work at fair prices.",
        avatarColor: "bg-blue-100",
        iconColor: "text-blue-500",
        rating: 5,
    },
    {
        name: "Aisha Williams",
        role: "Nissan Leaf Owner",
        message:
            "Their home charger installation was flawless, and they explained everything in terms I could understand. Highly recommend!",
        avatarColor: "bg-green-100",
        iconColor: "text-green-500",
        rating: 4.5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        What Our <span className="text-green-500">Clients</span> Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our customers have to
                        say about their experience with Green Pulse.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-gray-50 p-8 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                        >
                            <div className="flex items-center mb-6">
                                <div
                                    className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center mr-4`}
                                >
                                    <i className={`fas fa-user ${t.iconColor}`}></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{t.name}</h4>
                                    <p className="text-gray-500 text-sm">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{t.message}</p>
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }, (_, i) => {
                                    if (t.rating >= i + 1) return <i key={i} className="fas fa-star"></i>;
                                    if (t.rating > i && t.rating < i + 1)
                                        return <i key={i} className="fas fa-star-half-alt"></i>;
                                    return <i key={i} className="far fa-star"></i>;
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
