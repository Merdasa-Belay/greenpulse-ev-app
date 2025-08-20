// components/About.tsx
import { FC } from "react";
import Image from "next/image";
import { FaBolt, FaEye, FaSeedling, FaCertificate, FaExpand } from "react-icons/fa";

const About: FC = () => {
    return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            Built For <span className="text-green-500 dark:text-emerald-400">Ethiopia’s Transition</span>
                        </h2>
                        <p className="text-gray-600 dark:text-slate-300 mb-6">
                            Green Pulse exists to close the emerging skills gap in EV maintenance, sustainable energy and battery systems as clean mobility adoption begins to accelerate across Ethiopia.
                        </p>
                        <p className="text-gray-600 dark:text-slate-300 mb-8">
                            We localize global standards to real infrastructure constraints—power fluctuation, limited tooling, and access to parts—so learners, educators and institutions can leapfrog confidently.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-green-100 dark:bg-emerald-900/40 p-3 rounded-full mr-4 transition-colors">
                                    <FaBolt className="text-green-500 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-slate-100 mb-2">Mission</h4>
                                    <p className="text-gray-600 dark:text-slate-300">
                                        Equip Ethiopia’s next workforce with practical EV & green energy skills through contextual, accessible learning.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mr-4 transition-colors">
                                    <FaEye className="text-blue-500 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-slate-100 mb-2">Vision</h4>
                                    <p className="text-gray-600 dark:text-slate-300">
                                        An inclusive green tech talent pipeline powering sustainable transport & energy innovation across East Africa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image and Timeline */}
                    <div className="lg:w-1/2 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Green Pulse Team"
                            width={1470}
                            height={980}
                            className="rounded-lg shadow-xl w-full h-auto"
                            style={{ objectFit: "cover" }}
                            priority
                        />

                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hidden lg:block border border-transparent dark:border-slate-700/60 transition-colors">
                            <h4 className="font-bold text-gray-800 dark:text-slate-100 mb-3">Early Milestones</h4>
                            <div className="space-y-4">
                                <div className="timeline-item relative pl-10">
                                    <div className="absolute left-0 top-0 w-8 h-8 bg-green-500 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                        <FaSeedling />
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">2024</p>
                                    <p className="font-medium text-gray-800 dark:text-slate-200">Curriculum Draft & Pilot Cohorts</p>
                                </div>
                                <div className="timeline-item relative pl-10">
                                    <div className="absolute left-0 top-0 w-8 h-8 bg-green-500 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                        <FaCertificate />
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">2025</p>
                                    <p className="font-medium text-gray-800 dark:text-slate-200">Beta Expansion with Institutions</p>
                                </div>
                                <div className="timeline-item relative pl-10">
                                    <div className="absolute left-0 top-0 w-8 h-8 bg-green-500 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                        <FaExpand />
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">2026+</p>
                                    <p className="font-medium text-gray-800 dark:text-slate-200">Regional Scaling & Labs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
