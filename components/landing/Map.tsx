// components/landing/Map.tsx
"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";

/**
 * Strategy:
 * 1. Prefer NEXT_PUBLIC_MAP_EMBED_URL if provided (full https://www.google.com/maps/embed?... pb param or Maps Embed API URL).
 * 2. Else build a lightweight fallback embed using a query (works without an API key, but less customizable).
 * 3. If iframe blocks (X-Frame-Options) show graceful fallback with external link.
 */
// In Next.js client components, process.env.NEXT_PUBLIC_* vars are statically inlined.
// We avoid accessing (window as any) to keep types clean.
const RAW_ENV_URL = process.env.NEXT_PUBLIC_MAP_EMBED_URL;
const DEFAULT_QUERY = encodeURIComponent("Addis Ababa, Ethiopia");

const FALLBACK_EMBED = `https://maps.google.com/maps?q=${DEFAULT_QUERY}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

const EXTERNAL_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${DEFAULT_QUERY}`;

const MapSection = () => {
    const [errored, setErrored] = useState(false);
    const iframeSrc = useMemo(() => {
        // If user supplied a full embed URL via env, trust it; else fallback.
        return RAW_ENV_URL && RAW_ENV_URL.startsWith('http') ? RAW_ENV_URL : FALLBACK_EMBED;
    }, []);

    // Provide an external link consistent with the iframe content
    const externalLink = useMemo(() => {
        if (RAW_ENV_URL && RAW_ENV_URL.includes('/maps/embed?')) {
            // Try to extract pb param location isn't trivial; keep generic link if not parseable
            return EXTERNAL_MAP_LINK;
        }
        return EXTERNAL_MAP_LINK;
    }, []);

    return (
        <section id="map" className="relative w-full bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Our Location</h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">Find us easily – tap for directions.</p>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                    {!errored && (
                        <iframe
                            title="Green Pulse location map"
                            className="w-full h-[420px] md:h-[480px]"
                            src={iframeSrc}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            onError={() => setErrored(true)}
                            allowFullScreen
                        />
                    )}
                    {errored && (
                        <div className="w-full h-[420px] md:h-[480px] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-850">
                            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
                                <MapPinIcon className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm text-center">Map preview blocked by Google. Open the location directly in Google Maps.</p>
                            <a
                                href={externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 dark:ring-white/10 rounded-2xl" />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center">
                    <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                        Open larger map →
                    </a>
                    <code className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Override: NEXT_PUBLIC_MAP_EMBED_URL</code>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
