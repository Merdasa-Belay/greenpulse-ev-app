"use client";

import Link from "next/link";
import { HomeIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-inner md:hidden">
      <ul className="flex justify-around items-center py-2">
        <li>
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
        </li>

        <li>
          <Link
            href="/companions"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <UserGroupIcon className="w-6 h-6" />
            <span className="text-xs">Companions</span>
          </Link>
        </li>

        <li>
          <Link
            href="/my-journey"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <ChartBarIcon className="w-6 h-6" />
            <span className="text-xs">My Journey</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
