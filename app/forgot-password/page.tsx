import type { Metadata } from 'next';
import ForgotPasswordClientPage from './ForgotPasswordClientPage';

// Explicitly prevent indexing of password recovery page.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClientPage />;
}
