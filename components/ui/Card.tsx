import React from 'react';

export type CardProps = React.PropsWithChildren<{ className?: string }>;

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`rounded-4xl bg-white/90 dark:bg-slate-800/80 shadow-soft-lg border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1 p-4 ${className}`}>
            {children}
        </div>
    );
};
