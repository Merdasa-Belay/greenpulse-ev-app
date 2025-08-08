"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Companions", href: "/companions" },
    { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
    const pathname = usePathname();
    const activeColor = "#14C88F";

    return (
        <nav className="flex items-center gap-6">
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "relative pb-1 transition-all duration-300 hover:scale-105",
                            "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                            isActive ? "font-bold after:w-full" : "text-gray-700"
                        )}
                        style={{
                            color: isActive ? activeColor : undefined,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = activeColor;
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.color = "";
                        }}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavItems;
