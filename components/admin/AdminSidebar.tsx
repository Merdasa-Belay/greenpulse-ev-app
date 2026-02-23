"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Squares2X2Icon,
    DocumentTextIcon,
    TagIcon,
    PhotoIcon,
    UsersIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const links = [
    { href: "/admin/dashboard", label: "Dashboard Overview", icon: Squares2X2Icon },
    { href: "/admin/posts", label: "Blog Posts", icon: DocumentTextIcon },
    { href: "/admin/categories", label: "Categories", icon: TagIcon },
    { href: "/admin/media", label: "Media Library", icon: PhotoIcon },
    { href: "/admin/users", label: "Users (future)", icon: UsersIcon, disabled: true },
    { href: "/admin/settings", label: "Settings", icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 dark:lg:border-slate-800 bg-white dark:bg-slate-950">
            <div className="flex h-16 items-center px-6 text-lg font-bold text-emerald-600">
                Green Pulse Admin
            </div>
            <nav className="flex-1 space-y-1 px-4 py-6">
                {links.map((link) => {
                    const active = pathname === link.href;
                    const Icon = link.icon;
                    const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${link.disabled
                        ? "text-slate-400 cursor-not-allowed"
                        : active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900"
                        }`;

                    if (link.disabled) {
                        return (
                            <span key={link.href} className={className} aria-disabled="true">
                                <Icon className="h-5 w-5" />
                                {link.label}
                            </span>
                        );
                    }

                    return (
                        <Link key={link.href} href={link.href} className={className}>
                            <Icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
