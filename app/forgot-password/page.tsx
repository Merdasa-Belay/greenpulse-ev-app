'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh+100px)] bg-gray-100">
        <div className="bg-white p-8 w-[450px] rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              If an account with that email exists, we sent you a password reset link.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn&apos;t receive an email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <Link
                href="/sign-in"
                className="block w-full bg-gray-900 text-white text-sm font-medium rounded-lg h-12 flex items-center justify-center hover:bg-gray-800 transition"
              >
                Back to Sign In
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setError(null);
                }}
                className="block w-full border border-gray-300 text-gray-700 text-sm font-medium rounded-lg h-12 flex items-center justify-center hover:bg-gray-50 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh+100px)] bg-gray-100">
      <div className="bg-white p-8 w-[450px] rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-900 font-semibold mb-2">
              Email Address
            </label>
            <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
              <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </svg>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white text-sm font-medium rounded-lg h-12 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>

          {/* Back to Sign In */}
          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
