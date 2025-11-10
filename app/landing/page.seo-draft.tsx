import React from 'react';
import Link from 'next/link';

// SEO-structured landing page built strictly from the provided second-version content.
export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Hero */}
            <header className="relative px-6 pt-10 pb-16 sm:pt-16 sm:pb-24 max-w-7xl mx-auto">
                <nav aria-label="Primary" className="flex items-center justify-between mb-10">
                    <div className="text-lg font-bold">Green Pulse</div>
                    <ul className="hidden md:flex gap-6 text-sm font-medium">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#metrics">Metrics</a></li>
                        <li><a href="#paths">Learning Paths</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#service">Service</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="flex gap-3 text-sm font-medium">
                        <Link href="/sign-in" className="underline">Sign In</Link>
                        <Link href="/sign-up" className="rounded bg-emerald-600 px-4 py-2 text-white">Sign Up</Link>
                    </div>
                </nav>
                <div className="flex flex-wrap gap-3 text-xs font-semibold tracking-wide">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">EV Maintenance</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">EV training</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Practical EV Workshops</span>
                </div>
                <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" id="hero-title">EV Training &amp; Maintenance in Addis Ababa | የኤሌክትሪክ መኪና ስልጠና</h1>
                <p className="mt-6 text-lg max-w-2xl">Accelerate Ethiopia’s EV &amp; Green Tech Skills</p>
                <p className="mt-3 max-w-2xl text-base">EV service and green tech training—practical, local, and hands-on for Ethiopia’s emerging workforce.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#join" className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold">Join the Beta</a>
                    <a href="#paths" className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold">View Curriculum</a>
                </div>
                <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">Limited early access • Localized content • Founding member recognition.</p>
                <figure className="mt-10">
                    <figcaption className="sr-only">Electric vehicle gliding along a smart, sustainable route</figcaption>
                    <div className="aspect-[16/7] w-full rounded-2xl bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-sm text-slate-500">Electric vehicle gliding along a smart, sustainable route</div>
                </figure>
                <div className="mt-6 text-sm font-medium text-emerald-600 flex items-center gap-2">Practical EV Workshops &amp; Training <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> Live</span></div>
            </header>

            {/* Early Impact Metrics (H2) */}
            <section id="metrics" aria-labelledby="metrics-heading" className="py-20 bg-gradient-to-b from-white to-emerald-50/40 dark:from-slate-950 dark:to-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 id="metrics-heading" className="text-3xl font-bold text-center">Early Impact Metrics – EV Training Ethiopia</h2>
                    <p className="mt-4 text-center max-w-3xl mx-auto text-slate-600 dark:text-slate-300">Circular maintenance mindset &amp; energy efficiency.</p>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                        <div className="p-6 rounded-xl border bg-white/50 dark:bg-slate-900/40">
                            <p className="text-4xl font-bold">500+</p>
                            <p className="mt-2 text-xs tracking-wide font-medium">Learners Tracked</p>
                        </div>
                        <div className="p-6 rounded-xl border bg-white/50 dark:bg-slate-900/40">
                            <p className="text-4xl font-bold">100+</p>
                            <p className="mt-2 text-xs tracking-wide font-medium">Workshops / Labs</p>
                        </div>
                        <div className="p-6 rounded-xl border bg-white/50 dark:bg-slate-900/40">
                            <p className="text-4xl font-bold">6</p>
                            <p className="mt-2 text-xs tracking-wide font-medium">Learning Levels</p>
                        </div>
                        <div className="p-6 rounded-xl border bg-white/50 dark:bg-slate-900/40">
                            <p className="text-4xl font-bold">100+</p>
                            <p className="mt-2 text-xs tracking-wide font-medium">Partner Workshops</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section id="features" aria-labelledby="features-heading" className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 id="features-heading" className="text-3xl font-bold text-center">Platform Features – EV Training Ethiopia</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-slate-600 dark:text-slate-300">Tools that make EV maintenance learning practical, localized and trackable.</p>
                    <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Structured Learning Levels</h3>
                            <p className="mt-2 text-sm">Six progressive paths from fundamentals to capstone—focused on safety, diagnostics &amp; applied service.</p>
                        </article>
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Battery Diagnostics Toolkit</h3>
                            <p className="mt-2 text-sm">Guided fault trees, SOH tracking hints &amp; thermal risk awareness built around local use cases.</p>
                        </article>
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Offline Access Mode</h3>
                            <p className="mt-2 text-sm">Bandwidth‑friendly lesson packs &amp; quiz syncing for intermittent connectivity environments.</p>
                        </article>
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Workshop &amp; Lab Integration</h3>
                            <p className="mt-2 text-sm">Real component labs and partner workshop alignment accelerate maintenance readiness.</p>
                        </article>
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Progress &amp; Certification</h3>
                            <p className="mt-2 text-sm">Badge issuance &amp; capstone validation mapped to employable EV service skills.</p>
                        </article>
                        <article className="p-6 rounded-2xl border bg-white/50 dark:bg-slate-900/40">
                            <h3 className="text-lg font-semibold">Community &amp; Support</h3>
                            <p className="mt-2 text-sm">Peer Q&amp;A, cohort updates and partner pathways to internships &amp; service roles.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Structured Learning Paths */}
            <section id="paths" aria-labelledby="paths-heading" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center" id="paths-heading">Structured Learning Paths – Battery Diagnostics Ethiopia</h2>
                    <p className="mt-5 text-center max-w-3xl mx-auto text-slate-600 dark:text-slate-300">Clear, hands-on paths from basics to applied EV skills — fast, practical, and locally relevant.</p>
                    <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {/* Level 1 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Hands working with insulated tools inside an electric vehicle component bay</figure>
                            <h3 className="text-lg font-semibold">Level 1 – Foundation Essentials</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Safety-first basics: electricity, components, and essential tools.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>High‑voltage safety</li>
                                <li>System components</li>
                                <li>Tooling basics</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>1/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                        {/* Level 2 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Macro photo of lithium ion EV battery pack cells and connections</figure>
                            <h3 className="text-lg font-semibold">Level 2 – EV Power &amp; Batteries</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Understand battery packs, BMS basics, and thermal safety.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>Cell &amp; module structure</li>
                                <li>State of health checks</li>
                                <li>Thermal diagnostics</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>2/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                        {/* Level 3 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Engineer reviewing diagnostic signals on an electronics bench</figure>
                            <h3 className="text-lg font-semibold">Level 3 – Systems Diagnostics</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Fast troubleshooting for controls, inverters and charging systems.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>Error code logic</li>
                                <li>Signal tracing</li>
                                <li>Common fault trees</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>3/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                        {/* Level 4 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Technician performing maintenance on an electric vehicle platform</figure>
                            <h3 className="text-lg font-semibold">Level 4 – EV Service Skills</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Practical, workshop-focused repair &amp; maintenance skills.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>Routine maintenance procedures</li>
                                <li>Battery replacement &amp; diagnostics</li>
                                <li>Charging system inspection</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>4/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                        {/* Level 5 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Abstract icon collage representing downloadable learning content</figure>
                            <h3 className="text-lg font-semibold">Level 5 – Offline Access</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Downloadable, bandwidth-friendly lesson packs.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>Compressed media</li>
                                <li>Sync later mode</li>
                                <li>Lightweight quizzes</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>5/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                        {/* Level 6 */}
                        <article className="rounded-2xl border p-6 flex flex-col">
                            <figure className="aspect-video w-full rounded-lg bg-slate-200/60 dark:bg-slate-800 mb-4 text-xs flex items-center justify-center text-slate-500">Developer building an EV analytics dashboard on a laptop</figure>
                            <h3 className="text-lg font-semibold">Level 6 – Capstone &amp; Progress</h3>
                            <span className="mt-1 text-[11px] uppercase tracking-wide font-semibold text-emerald-600">Path</span>
                            <p className="mt-3 text-sm">Project-based capstone and skill tracking for jobs.</p>
                            <ul className="mt-3 text-sm list-disc list-inside space-y-1">
                                <li>Project brief</li>
                                <li>Skill badges</li>
                                <li>Portfolio export</li>
                            </ul>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs"><span>6/6</span><a href="#" className="text-emerald-600 font-medium">Explore</a></div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Join Community / Get Started */}
            <section id="join" aria-labelledby="join-heading" className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold" id="join-heading">Join the Green Pulse Community – EV Training Ethiopia</h2>
                    <p className="mt-5 text-slate-600 dark:text-slate-300">Get access to workshops, certification paths and partner networks.</p>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <a href="#paths" className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold">Get Started</a>
                        <a href="#about" className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold">Learn more</a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" aria-labelledby="about-heading" className="py-28 bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-10" id="about-heading">About Green Pulse – EV Maintenance Ethiopia</h2>
                    <p className="text-lg max-w-3xl">Practical EV training, local capacity building, and circular battery stewardship — tailored for Ethiopia’s emerging EV ecosystem.</p>
                    <div className="mt-8 flex gap-4">
                        <a href="#join" className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold">Join Us</a>
                        <a href="#paths" className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold">Learn more</a>
                    </div>
                    <figure className="mt-12">
                        <figcaption className="sr-only">EV training lab</figcaption>
                        <div className="aspect-[16/7] w-full rounded-2xl bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">EV training lab • Hands-on • Charging</div>
                    </figure>
                    <div className="mt-16 grid gap-12 lg:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-semibold">Who we are</h3>
                            <p className="mt-4 text-sm leading-relaxed">We train technicians, certify workshops, and partner with local institutions to deliver resilient EV services. Our programs combine classroom learning with real-vehicle labs and diagnostics adapted to local conditions. In addition to training, we directly provide EV service &amp; maintenance support—covering diagnostics, battery health assessment, and safe repair practices—to accelerate ecosystem readiness.</p>
                            <figure className="mt-6 aspect-[16/8] rounded-xl bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">Workshop training</figure>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold">Mission – EV Training Ethiopia</h3>
                                <p className="mt-2 text-sm">Build local maintenance capacity through practical training and certified pathways.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Vision – EV Maintenance Ethiopia</h3>
                                <p className="mt-2 text-sm">A resilient, low-carbon mobility ecosystem powered by skilled local teams and circular battery stewardship.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Core values – Battery Diagnostics Ethiopia</h3>
                                <ul className="mt-4 space-y-3 text-sm">
                                    <li><span className="font-semibold">Community first</span><br />Local partnerships and inclusive access.</li>
                                    <li><span className="font-semibold">Practical skills</span><br />Hands-on labs and diagnostics training.</li>
                                    <li><span className="font-semibold">Impact-driven</span><br />Measured outcomes and community impact.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Our journey – EV Training Ethiopia</h3>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <li><span className="font-semibold">2024 • Founding (Jan 1, 2024)</span><br />Green Pulse established to close EV skills gaps &amp; localise maintenance knowledge from day one.</li>
                                    <li><span className="font-semibold">2024 • EV service offering</span><br />Launch of hands-on EV service &amp; maintenance support: diagnostics, battery care &amp; safety.</li>
                                    <li><span className="font-semibold">2024 • Official platform launch (Jan 3)</span><br />Platform &amp; early curriculum released with initial participant onboarding.</li>
                                    <li><span className="font-semibold">2024 • Scaling cohorts</span><br />Expanding training pathways &amp; certifying partner workshops.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Community &amp; impact – EV Maintenance Ethiopia</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li>500+ learners trained</li>
                                    <li>100+ partner workshops</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Pilot cohorts – EV Training Ethiopia</h3>
                                <p className="mt-3 text-sm">Progressive rollout across academic partners and applied lab hubs. Apply early to secure placement in an evaluation cycle.</p>
                                <div className="mt-4 space-y-4 text-sm">
                                    <div><span className="font-semibold">2025 • Institution Beta</span> – Full<br /><span className="text-xs">Waitlist active</span> <a href="#" className="text-emerald-600 font-medium">Details</a></div>
                                    <div><span className="font-semibold">2025 • Pilot Cohort</span> – Open<br /><span className="text-xs">Accepting candidates</span> <a href="#" className="text-emerald-600 font-medium">Details</a></div>
                                    <div><span className="font-semibold">2026+ • Regional Labs</span> – Planned<br /><span className="text-xs">Roadmapping phase</span> <a href="#" className="text-emerald-600 font-medium">Details</a></div>
                                </div>
                                <div className="mt-3"><a href="#" className="text-emerald-600 font-medium">View all →</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners & Collaborators */}
            <section id="partners" aria-labelledby="partners-heading" className="py-28 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold" id="partners-heading">Partners &amp; Collaborators – EV Training Ethiopia</h2>
                    <p className="mt-5 max-w-3xl text-slate-600 dark:text-slate-300">Cross‑sector alignment powering Ethiopia’s EV talent, service capability &amp; sustainable adoption.</p>
                    <div className="mt-12 space-y-12">
                        <div>
                            <h3 className="text-xl font-semibold">Founding / Policy</h3>
                            <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
                                <li><span className="font-semibold">Mo – Ministry of Transport &amp; Logistics</span><br />Policy Alignment<br /><span className="text-xs uppercase tracking-wide text-emerald-600">founding</span><br />Aligns technician pathways with national EV &amp; safety standards.</li>
                                <li><span className="font-semibold">EE – Ethiopian Electric Power</span><br />Grid Insight<br /><span className="text-xs uppercase tracking-wide text-emerald-600">founding</span><br />Provides charging &amp; grid resilience context for curriculum.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Strategic / Tech</h3>
                            <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
                                <li><span className="font-semibold">GA – GreenTech Assemblers</span><br />Assembly Exposure • Pilot<br /><span className="text-xs uppercase tracking-wide text-emerald-600">strategic</span><br />Real component handling &amp; assembly environment (pilot).</li>
                                <li><span className="font-semibold">EO – EV Owners Association</span><br />Operational Feedback<br /><span className="text-xs uppercase tracking-wide text-emerald-600">strategic</span><br />Shares real maintenance &amp; usage pain points for training.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Community / Local Integration</h3>
                            <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
                                <li><span className="font-semibold">AT – Addis Technical College</span><br />Pilot Training Site<br /><span className="text-xs uppercase tracking-wide text-emerald-600">community</span><br />Hosts blended labs validating learning pathways.</li>
                                <li><span className="font-semibold">MI – Marcon Import &amp; Export</span><br />Supply Chain Support<br /><span className="text-xs uppercase tracking-wide text-emerald-600">community</span><br />Facilitates tooling &amp; component access for service modules.</li>
                                <li><span className="font-semibold">RS – Renewable Skills Hub</span><br />Energy Integration<br /><span className="text-xs uppercase tracking-wide text-emerald-600">community</span><br />Extends scenarios with hybrid / solar charging contexts.</li>
                                <li><span className="font-semibold">UM – Urban Mobility Cooperative</span><br />Adoption Catalyst<br /><span className="text-xs uppercase tracking-wide text-emerald-600">community</span><br />Links training outcomes to growing local EV usage.</li>
                            </ul>
                        </div>
                        <p className="text-xs text-slate-500">Partners &amp; Collaborators listed across Founding/Policy, Strategic/Tech and Community tiers supporting Ethiopia’s EV talent development.</p>
                    </div>
                </div>
            </section>

            {/* Service Booking */}
            <section id="service" aria-labelledby="service-heading" className="py-28 bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold" id="service-heading">Book EV Service &amp; Support – Battery Diagnostics Ethiopia</h2>
                    <p className="mt-5 max-w-3xl text-slate-600 dark:text-slate-300">Green Pulse not only trains—our certified team supports diagnostics, maintenance and deployment for electric &amp; hybrid vehicles.</p>
                    <div className="mt-10 grid gap-8 md:grid-cols-3 text-sm">
                        <div><h3 className="font-semibold">Easy Scheduling</h3><p className="mt-1 text-slate-600 dark:text-slate-400">24/7 online booking</p></div>
                        <div><h3 className="font-semibold">Certified Experts</h3><p className="mt-1 text-slate-600 dark:text-slate-400">EV-specific training</p></div>
                        <div><h3 className="font-semibold">Loaner Chargers</h3><p className="mt-1 text-slate-600 dark:text-slate-400">While you wait</p></div>
                    </div>
                    <p className="mt-6 text-xs font-medium tracking-wide">Safety • Diagnostics • Sustainability</p>
                    <form className="mt-10 grid gap-6 md:grid-cols-2" aria-label="Service Request Form">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Full Name</label>
                            <input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="e.g. Meles Kebede" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Email</label>
                            <input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Phone</label>
                            <input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="+251 9XX XXX XXX" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Vehicle Make / Model</label>
                            <input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="e.g. BYD Qin, Hyundai Kona" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-semibold">Service Needed</label>
                            <input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="Battery Diagnostics" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-semibold">Additional Notes (Optional)</label>
                            <textarea className="rounded border px-3 py-2 h-28 bg-white dark:bg-slate-900" placeholder="Describe issue, warning lights, prior work..." />
                        </div>
                        <p className="text-xs text-slate-500 md:col-span-2">We respond within one business day. Your details stay confidential.</p>
                        <div className="md:col-span-2">
                            <button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold">Schedule Appointment</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" aria-labelledby="faq-heading" className="py-28 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 id="faq-heading" className="text-3xl font-bold">Frequently Asked Questions – EV Training Ethiopia</h2>
                    <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">Quick clarity on EV training, hands‑on maintenance services, and platform reliability.</p>
                    <div className="mt-12 grid gap-12 md:grid-cols-3 text-sm">
                        <div>
                            <h3 className="font-semibold text-base">TR – Training &amp; Learning Paths</h3>
                            <ul className="mt-4 space-y-2">
                                <li><h3 className="font-medium">What EV topics do the learning paths cover?</h3></li>
                                <li><h3 className="font-medium">Do I need prior experience to start?</h3></li>
                                <li><h3 className="font-medium">Is offline access available?</h3></li>
                                <li><h3 className="font-medium">Will you issue certifications?</h3></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base">EV – EV Service &amp; Maintenance</h3>
                            <ul className="mt-4 space-y-2">
                                <li><h3 className="font-medium">What types of EV services do you provide?</h3></li>
                                <li><h3 className="font-medium">How do I book a maintenance or diagnostic session?</h3></li>
                                <li><h3 className="font-medium">What is the typical turnaround time?</h3></li>
                                <li><h3 className="font-medium">Do you offer any service warranty?</h3></li>
                                <li><h3 className="font-medium">Can you help source rare EV parts locally?</h3></li>
                                <li><h3 className="font-medium">Do you provide mobile or on‑site service?</h3></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base">PL – Platform, Accounts &amp; Data</h3>
                            <ul className="mt-4 space-y-2">
                                <li><h3 className="font-medium">Who is Green Pulse for?</h3></li>
                                <li><h3 className="font-medium">How will pricing work?</h3></li>
                                <li><h3 className="font-medium">How is my data protected?</h3></li>
                                <li><h3 className="font-medium">Can institutions get custom dashboards?</h3></li>
                                <li><h3 className="font-medium">What features are coming next?</h3></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Location */}
            <section id="contact" aria-labelledby="contact-heading" className="py-28 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold" id="contact-heading">Connect With Green Pulse – Contact &amp; Location – EV Maintenance Ethiopia</h2>
                    <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">Questions about training, service or deployment support? We’ll help you move forward confidently.</p>
                    <div className="mt-12 grid gap-12 lg:grid-cols-2">
                        <div className="space-y-8 text-sm">
                            <div>
                                <h3 className="font-semibold text-lg">Contact Information</h3>
                                <ul className="mt-3 space-y-2">
                                    <li><span className="font-semibold">Location</span><br />Around Totot Traditional Food Hall | Gerji</li>
                                    <li><span className="font-semibold">Phone</span><br />+251 911 758 111<br />+251 912 072 341<br />+251 913 024 687</li>
                                    <li><span className="font-semibold">Email</span><br />info@greenpulse.com<br />service@greenpulse.com</li>
                                    <li><span className="font-semibold">Hours</span><br />Mon–Fri: 8:00–18:00<br />Sat: 9:00–16:00<br />Sun: Emergency Only</li>
                                    <li><span className="font-semibold">Follow Us</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Send Us a Message</h3>
                                <form className="mt-4 grid gap-4" aria-label="Contact form">
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        <div className="flex flex-col gap-2"><label className="text-sm font-semibold">First Name</label><input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="e.g. Hana" /></div>
                                        <div className="flex flex-col gap-2"><label className="text-sm font-semibold">Last Name</label><input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="e.g. Bekele" /></div>
                                    </div>
                                    <div className="flex flex-col gap-2"><label className="text-sm font-semibold">Email</label><input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="you@example.com" /></div>
                                    <div className="flex flex-col gap-2"><label className="text-sm font-semibold">Subject</label><input className="rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="Training, Service, Consultation..." /></div>
                                    <div className="flex flex-col gap-2"><label className="text-sm font-semibold">Message</label><textarea className="rounded border px-3 py-2 h-32 bg-white dark:bg-slate-900" placeholder="How can we support you?" /></div>
                                    <p className="text-xs text-slate-500">We respond within 1 business day. Your details remain private.</p>
                                    <div><button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold">Send Message</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <h3 className="font-semibold text-lg">Our Location – EV Maintenance Ethiopia</h3>
                                <p className="mt-3 text-sm">Find us easily – tap for directions or open the map in a new tab for full accessibility.</p>
                                <div className="mt-4 text-sm"><a href="#" className="text-emerald-600 font-medium">Open larger map →</a></div>
                                <p className="mt-4 text-xs text-slate-500">Override: NEXT_PUBLIC_MAP_EMBED_URL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / Updates */}
            <section id="updates" aria-labelledby="updates-heading" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold" id="updates-heading">Get local EV &amp; training updates – Battery Diagnostics Ethiopia</h2>
                    <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">Practical tips, workshop dates and bite-sized learning — once a month.</p>
                    <form className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" aria-label="Newsletter subscription">
                        <div className="flex items-center rounded-xl border px-3 py-2 bg-white dark:bg-slate-900 w-full sm:w-auto">
                            <span className="mr-2" aria-hidden>📧</span>
                            <input placeholder="Your email address" className="bg-transparent focus:outline-none text-sm flex-1" />
                        </div>
                        <button className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-semibold" type="submit">Subscribe</button>
                    </form>
                    <p className="mt-3 text-xs text-slate-500">No spam — unsubscribe any time.</p>
                </div>
            </section>

            <footer className="bg-slate-900 text-slate-200 py-20" aria-labelledby="footer-heading">
                <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4 text-sm">
                    <div>
                        <h2 id="footer-heading" className="text-base font-semibold flex items-center gap-3">GreenPulse</h2>
                        <p className="mt-4 text-xs leading-relaxed">Ethiopia’s EV training &amp; service hub — practical skills, safer workshops.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Quick Links</h3>
                        <ul className="mt-3 space-y-1">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#service" className="hover:underline">Services</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Services</h3>
                        <ul className="mt-3 space-y-1">
                            <li>EV Maintenance</li>
                            <li>Battery Diagnostics</li>
                            <li>Capstone Projects</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Contact</h3>
                        <ul className="mt-3 space-y-1">
                            <li>Around Totot Traditional Food Hall | Gerji</li>
                            <li>+251 911 758 111</li>
                            <li>info@greenpulse.com</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-6 text-xs max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <p>© 2025 Green Pulse — Training · Service · Sustainability</p>
                    <ul className="flex flex-wrap gap-4">
                        <li><a href="#" className="hover:underline">Privacy</a></li>
                        <li><a href="#" className="hover:underline">Terms</a></li>
                        <li><a href="#" className="hover:underline">Sitemap</a></li>
                    </ul>
                </div>
            </footer>
        </main>
    );
}

