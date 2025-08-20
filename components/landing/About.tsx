"use client";
// components/About.tsx
import { FC, ReactNode } from "react";
import Image from "next/image";
import { FaBolt, FaEye, FaSeedling, FaCertificate, FaGlobeAfrica, FaHandsHelping, FaLeaf, FaTools, FaUniversity } from "react-icons/fa";
import { motion } from "@/lib/motion";

// Shared motion variants for staggered entrance
const fadeStaggerParent = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
} as const;

const fadeLift = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
} as const;

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
} as const;

interface Value { title: string; desc: string; icon: ReactNode; }

const values: Value[] = [
    {
        title: 'Contextual First',
        desc: 'We localize global EV standards to East African grid realities, climate and tooling constraints.',
        icon: <FaGlobeAfrica />
    },
    {
        title: 'Hands‑On Rigor',
        desc: 'Skills mapped to real maintenance workflows: diagnose, calibrate, source, sustain.',
        icon: <FaTools />
    },
    {
        title: 'Open Progress',
        desc: 'Transparent curriculum evolution with partner feedback & measurable learning outcomes.',
        icon: <FaUniversity />
    },
    {
        title: 'Sustainable Impact',
        desc: 'Lower waste, extend battery life, and reduce emissions through smarter care practices.',
        icon: <FaLeaf />
    },
    {
        title: 'Inclusive Access',
        desc: 'Offline packs, low‑bandwidth media & multilingual roadmap broaden participation.',
        icon: <FaHandsHelping />
    },
    {
        title: 'Credential Pathways',
        desc: 'Stackable badges align with institutional & industry recognition frameworks.',
        icon: <FaCertificate />
    }
];

const About: FC = () => {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="relative py-28 md:py-32 bg-gradient-to-b from-white via-emerald-50/40 to-emerald-100/10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/60 overflow-hidden"
        >
            {/* Decorative radial aura */}
            <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_65%)]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                    {/* Text Column */}
                    <div className="lg:w-7/12">
                        <div className="max-w-2xl">
                            <h2 id="about-heading" className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                                Bridging EV Skills Locally – Signalling Excellence Globally
                            </h2>
                            <p className="mt-6 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                                Green Pulse accelerates the emergence of a capable EV maintenance & energy workforce for Ethiopia and the broader East African corridor. We translate international engineering and safety standards into practical, resource‑aware training that works where grid volatility, tooling scarcity and import delays are real constraints—not footnotes.
                            </p>
                            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                                By combining structured learning paths, contextual diagnostics guidance, and partner‑anchored certification pathways, we de‑risk adoption for institutions, workshops, and fleet operators. Each module is built with dual accountability: local relevance and global transferability.
                            </p>
                        </div>

                        {/* Mission & Vision Cards */}
                        <motion.div
                            variants={fadeStaggerParent}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            className="mt-10 grid sm:grid-cols-2 gap-6"
                        >
                            {[{
                                icon: <FaBolt />, title: 'Mission', grad: 'from-emerald-500 to-teal-500', copy: 'Equip the next generation of technicians, educators & innovators with practical EV and green energy competencies that unlock safer, longer‑lived electric mobility ecosystems.'
                            }, {
                                icon: <FaEye />, title: 'Vision', grad: 'from-teal-500 to-emerald-500', copy: 'A resilient, inclusive regional green tech talent lattice powering circular battery lifecycles, efficient charging networks & lower‑carbon transport innovation recognized beyond borders.'
                            }].map(card => (
                                <motion.div
                                    key={card.title}
                                    variants={fadeLift}
                                    whileHover={{ y: -6, boxShadow: '0 8px 28px -6px rgba(16,185,129,0.25)' }}
                                    className="group relative rounded-xl border border-emerald-200/70 dark:border-emerald-700/40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-6 shadow-sm overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/5 via-teal-400/5 to-transparent" />
                                    <div className="flex items-center gap-3 mb-3 relative">
                                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.grad} text-white shadow ring-1 ring-white/30 dark:ring-slate-900/40`}>{card.icon}</span>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{card.title}</h3>
                                    </div>
                                    <p className="relative text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{card.copy}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Values */}
                        <div className="mt-14">
                            <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-medium ring-1 ring-white/30 dark:ring-slate-900/40">VA</span>
                                Core Operating Values
                            </h3>
                            <motion.div
                                variants={fadeStaggerParent}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.3 }}
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            >
                                {values.map(v => (
                                    <motion.div
                                        key={v.title}
                                        variants={fadeLift}
                                        whileHover={{ y: -5, borderColor: 'rgba(16,185,129,0.55)' }}
                                        className="group relative rounded-xl border border-slate-200/70 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm p-5 shadow-sm overflow-hidden"
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent" />
                                        <div className="flex items-center gap-3 mb-2 relative">
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/15 via-teal-500/15 to-emerald-400/15 text-emerald-600 dark:text-emerald-400">
                                                {v.icon}
                                            </span>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{v.title}</h4>
                                        </div>
                                        <p className="relative text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{v.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Local Impact & Global Alignment */}
                        <div className="mt-16 grid lg:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-xs ring-1 ring-white/30 dark:ring-slate-900/40">ET</span>
                                    Local Impact Focus
                                </h3>
                                <ul className="space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
                                    <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> Grid-aware training that assumes variable voltage & intermittent connectivity.</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> Guidance on safe reuse & second‑life battery pathways.</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> Sourcing intelligence for components & calibration tools under import constraints.</li>
                                    <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> Boosting workshop capability via structured diagnostic workflows.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs ring-1 ring-white/30 dark:ring-slate-900/40">GL</span>
                                    Global Alignment
                                </h3>
                                <ul className="space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
                                    <li className="flex gap-2"><span className="text-teal-500 dark:text-teal-400">•</span> Curriculum referencing international safety & high voltage handling standards.</li>
                                    <li className="flex gap-2"><span className="text-teal-500 dark:text-teal-400">•</span> Data model pathways for diagnostics interoperability.</li>
                                    <li className="flex gap-2"><span className="text-teal-500 dark:text-teal-400">•</span> Certification framework designed for cross‑border recognition & portability.</li>
                                    <li className="flex gap-2"><span className="text-teal-500 dark:text-teal-400">•</span> Sustainability metrics aligned with lifecycle CO₂ reduction benchmarks.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Partner Invitation */}
                        <div className="mt-16 rounded-2xl border border-emerald-300/50 dark:border-emerald-700/40 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-400/10 dark:from-emerald-400/10 dark:via-teal-400/10 dark:to-emerald-300/10 backdrop-blur-sm p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">Partner / Collaborate</h3>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl">
                                        Institutions, technical colleges, fleet operators & impact investors are invited to co‑develop labs, align curricula, and accelerate workforce readiness. Join our pilot ecosystem shaping the region’s reliable EV service backbone.
                                    </p>
                                </div>
                                <div>
                                    <a href="#partners" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-white px-6 py-3 text-sm font-semibold shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-slate-950 transition-all">
                                        Explore Collaboration
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media / Supplemental Column */}
                    <div className="lg:w-5/12 w-full relative flex flex-col">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-emerald-500/10 dark:ring-emerald-400/10">
                            <Image
                                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Green Pulse EV training session"
                                width={1470}
                                height={980}
                                className="w-full h-auto object-cover"
                                priority
                            />
                            {/* Overlay Stat Strip */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-6 flex flex-col gap-4 text-white">
                                <div className="flex flex-wrap gap-6 text-xs md:text-sm font-medium">
                                    <span className="inline-flex flex-col"><strong className="text-base md:text-lg">2024</strong><span className="opacity-80">Pilot Cohorts</span></span>
                                    <span className="inline-flex flex-col"><strong className="text-base md:text-lg">2025</strong><span className="opacity-80">Institution Beta</span></span>
                                    <span className="inline-flex flex-col"><strong className="text-base md:text-lg">2026+</strong><span className="opacity-80">Regional Labs</span></span>
                                </div>
                                <p className="text-[11px] md:text-xs leading-relaxed max-w-xs opacity-90">
                                    Iterative roadmap grounded in measurable skill competency, safe maintenance adoption & circular battery stewardship.
                                </p>
                            </div>
                        </div>

                        {/* Floating Timeline (desktop) */}
                        <div className="hidden xl:block absolute -left-10 top-1/2 -translate-y-1/2 w-64">
                            <motion.div
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                className="relative rounded-2xl border border-emerald-200/70 dark:border-emerald-700/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-5 shadow-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 text-sm tracking-tight">
                                    <FaSeedling className="text-emerald-500" /> Evolution Timeline
                                </h4>
                                <ul className="relative space-y-5 text-xs text-slate-600 dark:text-slate-300">
                                    <span className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-500" aria-hidden />
                                    {["Curriculum Draft, Early Skill Mapping", "Partner Validation & Beta Certification", "Lab & Applied Diagnostics Scaling", "Regional Data & Predictive Insights"].map((step, i) => (
                                        <motion.li
                                            key={step}
                                            className="relative pl-6"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.7 }}
                                            transition={{ delay: 0.1 + i * 0.15, duration: 0.5 }}
                                        >
                                            <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[10px] text-white shadow ring-1 ring-white/40">{i + 1}</span>
                                            {step}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Supplemental Right-Side Content (appears below image) */}
                        <motion.div
                            variants={fadeStaggerParent}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className="mt-10 space-y-6 hidden lg:block"
                        >
                            {/* Impact Snapshot */}
                            <motion.div
                                variants={fadeLift}
                                className="relative rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-6 shadow-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent" />
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 tracking-tight"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-[10px] ring-1 ring-white/30 dark:ring-slate-900/40">IM</span>Impact Snapshot</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[{ v: "150+", l: "Learners" }, { v: "800+", l: "Lessons" }, { v: "92%", l: "Completion" }, { v: "12", l: "Institutions" }].map(item => (
                                        <motion.div key={item.l} variants={fadeLift} className="flex flex-col items-start">
                                            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent tracking-tight">{item.v}</span>
                                            <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">{item.l}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="mt-4 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">Momentum built through early cohort feedback loops and applied workshop integration.</p>
                            </motion.div>

                            {/* Credential Pathway */}
                            <motion.div
                                variants={fadeLift}
                                className="relative rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-6 shadow-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-transparent" />
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2 tracking-tight"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-[10px] ring-1 ring-white/30 dark:ring-slate-900/40">CP</span>Credential Pathway</h3>
                                <ol className="relative ml-1 space-y-5 text-xs text-slate-600 dark:text-slate-300">
                                    <span className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-teal-500 via-emerald-400 to-teal-500" aria-hidden />
                                    {["Foundational Safety & Architecture", "Battery & Power Diagnostics", "Systems & Control Troubleshooting", "Applied Service Procedures", "Offline Field Adaptation", "Capstone + Portfolio Export"].map((step, i) => (
                                        <li key={step} className="relative pl-6">
                                            <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-[10px] text-white font-medium shadow ring-1 ring-white/40">{i + 1}</span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-4 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">Stackable micro‑credentials aggregate toward formal institutional and industry recognition.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Decorative corner gradients */}
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-60 w-60 bg-emerald-400/10 dark:bg-emerald-600/10 blur-3xl rounded-full" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 bg-teal-400/10 dark:bg-teal-700/10 blur-3xl rounded-full" />
        </section>
    );
};

export default About;
