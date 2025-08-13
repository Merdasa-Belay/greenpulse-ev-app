"use client";

import Link from "next/link";
import { HomeIcon, ChartPieIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const MobileBottomNav = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    tap: { scale: 0.9 },
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-inner md:hidden">
      <ul className="flex justify-around items-center py-2">
        <motion.li variants={itemVariants} initial="hidden" animate="visible" whileTap="tap">
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
        </motion.li>

        <motion.li variants={itemVariants} initial="hidden" animate="visible" whileTap="tap">
          <Link
            href="/dashboard"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <ChartPieIcon className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </motion.li>

        <motion.li variants={itemVariants} initial="hidden" animate="visible" whileTap="tap">
          <Link
            href="/programs"
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
          >
            <AcademicCapIcon className="w-6 h-6" />
            <span className="text-xs">Programs</span>
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
