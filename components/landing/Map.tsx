// components/landing/Map.tsx
"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";

const MapSection = () => {
    return (
        <div className="h-96 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <MapPinIcon className="h-24 w-24 text-gray-400" />
            </div>
        </div>
    );
};

export default MapSection;
