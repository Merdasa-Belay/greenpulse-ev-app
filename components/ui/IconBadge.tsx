import React from 'react';

export type IconBadgeProps = {
    icon?: React.ReactNode;
    label?: string;
    className?: string;
};

export const IconBadge = ({ icon, label, className = '' }: IconBadgeProps) => {
    return (
        <div className={`inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/70 px-2 py-1 rounded-full text-sm font-medium shadow-sm ring-1 ring-slate-900/5 ${className}`}>
            {icon ? <span className="w-5 h-5 flex-none">{icon}</span> : null}
            {label ? <span className="truncate">{label}</span> : null}
        </div>
    );
};
