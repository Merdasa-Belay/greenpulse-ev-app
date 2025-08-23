"use client";

import dynamic from 'next/dynamic';

const HeroVisual = dynamic(() => import('./HeroVisual.client'), {
    ssr: false,
    loading: () => <div className="relative h-80 md:h-[520px] rounded-2xl bg-slate-100/50" />,
});

export default function ClientVisualLoader() {
    return <HeroVisual />;
}
