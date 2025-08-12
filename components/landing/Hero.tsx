import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
            {/* Decorative gradient bloom */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(closest-side, #14C88F22, transparent)" }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    {/* Copy side */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <Image
                                src="/images/logo.svg"
                                alt="Green Pulse logo"
                                width={48}
                                height={48}
                                priority
                                className="select-none"
                            />
                            <span className="text-2xl font-bold" style={{ color: "#14C88F" }}>
                                Green Pulse
                            </span>
                        </div>

                        <h1
                            id="hero-heading"
                            className="text-balance text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl"
                        >
                            EV route planning, charging optimization, and sustainable travel with Green Pulse
                        </h1>

                        <p className="mt-4 max-w-xl text-lg text-slate-600">
                            Plan routes, optimize charging, and track your EV journey with intelligent insights.
                            Built for students, teachers, and admins to learn, manage, and scale sustainably.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/sign-up"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-slate-900 px-6 text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/sign-in"
                                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-6 text-slate-900 transition-colors duration-200 hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                Sign In
                            </Link>
                        </div>

                        <p className="mt-3 text-sm text-slate-500">No credit card required.</p>
                    </div>

                    {/* Visual side */}
                    <div className="relative h-64 md:h-[420px]">
                        <div className="absolute inset-0 will-change-transform transition-transform duration-300 ease-out motion-safe:hover:translate-y-[-2px]">
                            <Image
                                src="/images/cta.svg"
                                alt="Green Pulse app preview illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
