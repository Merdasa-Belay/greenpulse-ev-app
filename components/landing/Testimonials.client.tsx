'use client';
import { motion } from 'framer-motion';

interface Testimonial {
    name: string;
    role: string;
    message: string;
    color: 'emerald' | 'blue' | 'teal';
    rating: number;
}

const data: Testimonial[] = [
    { name: 'Hanna G.', role: 'Electrical Student – Addis Ababa', message: 'The battery module lessons finally explained what we only guessed in class. I feel job‑ready now.', color: 'emerald', rating: 5 },
    { name: 'Samuel T.', role: 'Vocational Instructor – Adama', message: 'Offline packs kept our workshop going during outages. Students stayed engaged and confident.', color: 'blue', rating: 5 },
    { name: 'Lulit M.', role: 'Solar & EV Enthusiast – Hawassa', message: 'The local context examples make a huge difference—finally content that understands Ethiopia.', color: 'teal', rating: 5 },
];

const colorMap: Record<Testimonial['color'], { bg: string; ring: string }> = {
    emerald: { bg: 'bg-emerald-50 text-emerald-600', ring: 'ring-emerald-200' },
    blue: { bg: 'bg-blue-50 text-blue-600', ring: 'ring-blue-200' },
    teal: { bg: 'bg-teal-50 text-teal-600', ring: 'ring-teal-200' },
};

function Stars({ value }: { value: number }) {
    return (
        <div className="flex" aria-label={`Rating: ${value} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 ${i < value ? 'text-yellow-400' : 'text-slate-300'}`}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Voices From <span className="text-emerald-600">Early Learners</span></h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">Real feedback from students, instructors & enthusiasts shaping Ethiopia’s clean mobility future.</p>
                </motion.div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((t, i) => {
                        const c = colorMap[t.color];
                        return (
                            <motion.article
                                key={t.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="group relative flex flex-col rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`flex h-14 w-14 items-center justify-center rounded-full ring-1 ${c.bg} ${c.ring} font-semibold text-sm`}>{t.name[0]}</span>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{t.name}</h3>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">“{t.message}”</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <Stars value={t.rating} />
                                    <span className="text-[11px] font-medium tracking-wide text-emerald-600/80">Verified</span>
                                </div>
                                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
