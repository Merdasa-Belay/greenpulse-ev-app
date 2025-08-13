"use client";

import { APP_ENV } from "@/config/features";

const colors: Record<string, string> = {
    production: "bg-emerald-600",
    beta: "bg-indigo-600",
    alpha: "bg-amber-600",
    development: "bg-slate-600",
};

export function EnvironmentBadge() {
    if (APP_ENV === 'production') return null;
    const label = APP_ENV.toUpperCase();
    const color = colors[APP_ENV] || colors.development;
    return (
        <div className={`fixed top-2 right-2 z-[60] rounded px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm bg-opacity-90 select-none pointer-events-none ${color}`}>
            {label}
        </div>
    );
}

export default EnvironmentBadge;
