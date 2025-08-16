import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import SignInClient from './SignInClient';

// Server component wrapper to allow metadata export while keeping interactive logic client-side
export const metadata: Metadata = generatePageMetadata({
  title: 'Sign In',
  description: 'Access your Green Pulse account to continue EV & green tech learning.',
  path: '/sign-in',
  noIndex: true,
});

export default function SignInPage() {
  return <SignInClient />;
}
