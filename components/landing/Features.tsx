export default function Features() {
    const items = [
        {
            title: 'Smart Routing',
            desc: 'Optimize your EV routes with charging stop recommendations and energy-aware planning.',
            icon: (
                <svg aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M9 12l2 2 4-4" />
                </svg>
            ),
        },
        {
            title: 'Companions',
            desc: 'Personalized learning companions to guide students through EV and sustainability topics.',
            icon: (
                <svg aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01" />
                </svg>
            ),
        },
        {
            title: 'Admin Insights',
            desc: 'Fleet and user analytics for teachers and admins to monitor progress and usage.',
            icon: (
                <svg aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M3 3v18h18" />
                </svg>
            ),
        },
    ];

    return (
        <section aria-labelledby="features-heading" className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <h2 id="features-heading" className="text-2xl font-bold text-slate-900 md:text-3xl">
                    Why Green Pulse?
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((f) => (
                        <article
                            key={f.title}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-emerald-200"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                {f.icon}
                            </div>
                            <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>

                            {/* Hover lift with shadow, motion-safe only */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-lg" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
