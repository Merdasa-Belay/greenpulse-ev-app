"use client";

import { useEffect, useState } from 'react';
import { motion } from '@/lib/motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 240);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={onClick}
            aria-label="Back to top"
            className="fixed right-4 bottom-16 z-50 rounded-full bg-emerald-600 text-white p-3 shadow-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
            <ChevronUpIcon className="h-5 w-5" />
        </motion.button>
    );
}
