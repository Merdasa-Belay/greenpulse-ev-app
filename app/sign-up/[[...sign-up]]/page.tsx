import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import SignUpClient from './SignUpClient';

export const metadata: Metadata = generatePageMetadata({
    title: 'Create Account',
    description: 'Join Green Pulse to build EV maintenance & green tech skills.',
    path: '/sign-up',
    noIndex: true,
});

export default function SignUpPage() {
    return <SignUpClient />;
}
