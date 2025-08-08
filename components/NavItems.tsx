'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const navItems = [
    {
        lable: "Home",
        href: "/",
    },
    {
        lable: "Companions",
        href: "/companions",
    },
    {
        lable: "My Journey",
        href: "/my-journey",
    }
]

const NavItems = () => {
    const pathname = usePathname();
    return (
        <nav className="flex items-center gap-4">

            {navItems.map((item) => (
                <Link
                    key={item.lable}
                    href={item.href}
                    className={cn(
                        pathname === item.href
                            ? "text-green-500 underline"
                            : "text-gray-700",
                        "hover:text-blue-500 transition-colors"
                    )}

                >
                    {item.lable}
                </Link>
            ))}
        </nav>
    )

}

export default NavItems
