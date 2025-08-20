"use client";
import React from 'react';
import { motion } from '@/lib/motion';

/**
 * Small demonstrative component showing usage of the local motion wrapper.
 * Safe for App Router client usage and compatible with Turbopack.
 */
export const MotionSample: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300"
      >
        Motion Wrapper Demo
      </motion.h3>
      <motion.div
        initial={{ scale: 0.85, rotate: -4, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="w-40 h-40 rounded-lg bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm flex items-center justify-center text-emerald-200 text-sm font-medium"
      >
        Animated Box
      </motion.div>
    </div>
  );
};

export default MotionSample;
