"use client";

import dynamic from 'next/dynamic';

const HeroCTA = dynamic(() => import('./HeroCTA.client'), {
    ssr: false,
    loading: () => null,
});

export default function ClientCTALoader() {
    return <HeroCTA />;
}
