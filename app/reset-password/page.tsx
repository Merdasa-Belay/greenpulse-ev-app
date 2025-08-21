import type { Metadata } from 'next';
import ResetPasswordClientPage from './ResetPasswordClientPage';

// Prevent indexing of password reset flow for security & SEO hygiene.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClientPage />;
}
