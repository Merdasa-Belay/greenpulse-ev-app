import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

export const CTA = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
      <div>
        <h3 className="text-lg font-bold">Join the Green Pulse Community</h3>
        <p className="text-sm opacity-90 mt-1">Get access to workshops, certification paths and partner networks.</p>
      </div>
      <div className="flex gap-3">
        <Button>Get Started</Button>
        <Button variant="ghost" className="text-white/90">Learn more</Button>
      </div>
    </Card>
  );
};
