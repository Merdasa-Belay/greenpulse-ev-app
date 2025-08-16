'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/contexts/AuthContext';

// Validation schema
const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().default(false),
});

type SignInForm = z.input<typeof signInSchema>;

export default function SignInClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const redirectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    });

    // Check for success message from URL params (e.g., after successful signup)
    useEffect(() => {
        const message = searchParams.get('message');
        if (message) {
            setSuccessMessage(message);
        }
    }, [searchParams]);

    // Cleanup any pending redirect timeout on unmount
    useEffect(() => {
        return () => {
            if (redirectTimeout.current) {
                clearTimeout(redirectTimeout.current);
            }
        };
    }, []);

    const onSubmit = async (data: SignInForm) => {
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            // Parse JSON safely in case of empty/invalid response body
            let result: unknown = undefined;
            try {
                result = await response.json();
            } catch {
                // ignore
            }

            type SignInErr = { error: string };
            const isRecord = (v: unknown): v is Record<string, unknown> =>
                typeof v === 'object' && v !== null;
            const hasError = (r: unknown): r is SignInErr =>
                isRecord(r) && typeof r['error'] === 'string';
            const hasUser = (
                r: unknown
            ): r is { user: { id: number | string; email: string; name?: string | null; profileImage?: string | null; role?: 'teacher' | 'student' | 'admin' | null } } => {
                if (!isRecord(r)) return false;
                const u = r['user'];
                if (!isRecord(u)) return false;
                const idOk = typeof u['id'] === 'number' || typeof u['id'] === 'string';
                const emailOk = typeof u['email'] === 'string';
                return idOk && emailOk;
            };

            if (!response.ok) {
                throw new Error(hasError(result) ? result.error : 'Sign-in failed');
            }

            // Update auth context with user data
            if (!hasUser(result)) {
                throw new Error('Invalid response from server');
            }
            const apiUser = result.user;
            const clientUser: User = {
                id: String(apiUser.id),
                name: typeof apiUser.name === 'string' ? apiUser.name : '',
                email: apiUser.email,
                role:
                    apiUser.role === 'teacher' || apiUser.role === 'student' || apiUser.role === 'admin'
                        ? apiUser.role
                        : 'student',
                profileImage: typeof apiUser.profileImage === 'string' ? apiUser.profileImage : undefined,
            };
            login(clientUser);

            // Show success and redirect after a short delay
            setSuccessMessage('Successfully signed in! Redirecting...');
            setIsRedirecting(true);
            redirectTimeout.current = setTimeout(() => {
                router.replace('/'); // Adjust redirect target if needed
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-emerald-50/60 dark:from-slate-950 dark:to-emerald-950/10 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900/90 backdrop-blur-sm border border-emerald-100 dark:border-emerald-900/40 rounded-2xl shadow-md shadow-emerald-100/40 dark:shadow-black/40 px-8 py-10 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100/30 via-white/0 to-emerald-200/30 dark:from-emerald-900/30 dark:via-emerald-900/0 dark:to-emerald-800/20" />
                    </div>
                    <div className="relative flex flex-col items-center text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center mb-4" aria-label="Green Pulse Home">
                            <Image src="/images/logo.svg" alt="Green Pulse logo" width={64} height={64} priority className="h-14 w-auto" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Sign In</span>
                        </h1>
                        <span className="inline-block h-1 w-20 rounded-full bg-emerald-500/90 mb-2" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm">Access your Green Pulse account to continue learning and track your EV & green tech journey.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
                        {/* Success Message */}
                        {successMessage && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3" aria-live="polite">
                                <p className="text-emerald-700 text-sm">{successMessage}</p>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                                Email Address
                            </label>
                            <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
                                <svg
                                    height="20"
                                    viewBox="0 0 32 32"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-400"
                                >
                                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                                </svg>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                    disabled={isSubmitting || isRedirecting}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                                Password
                            </label>
                            <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
                                <svg
                                    height="20"
                                    viewBox="-64 0 512 512"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-400"
                                >
                                    <path d="m336 512h-288c-26.45 0-48-21.52-48-48v-224c0-26.48 21.55-48 48-48h288c26.45 0 48 21.52 48 48v224c0 26.48-21.55 48-48 48zm-288-288c-8.81 0-16 7.17-16 16v224c0 8.83 7.19 16 16 16h288c8.81 0 16-7.17 16-16v-224c0-8.83-7.19-16-16-16z"></path>
                                    <path d="m304 224c-8.83 0-16-7.17-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.83-7.17 16-16 16s-16-7.17-16-16v-80c0-70.59 57.41-128 128-128s128 57.41 128 128v80c0 8.83-7.17 16-16 16z"></path>
                                </svg>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                                    disabled={isSubmitting || isRedirecting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="pr-3 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <input
                                    {...register('rememberMe')}
                                    type="checkbox"
                                    id="rememberMe"
                                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor="rememberMe" className="text-gray-800 dark:text-gray-200">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-emerald-600 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isRedirecting}
                            className="group relative w-full overflow-hidden bg-emerald-600 text-white text-sm font-medium rounded-lg h-12 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {isRedirecting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Redirecting...
                                </div>
                            ) : isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/sign-up"
                                    className="text-emerald-600 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full border border-gray-200 dark:border-slate-700 rounded-lg h-12 flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition"
                                onClick={() => alert('Google sign-in not implemented yet')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <button
                                type="button"
                                className="w-full border border-gray-200 dark:border-slate-700 rounded-lg h-12 flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition"
                                onClick={() => alert('Apple sign-in not implemented yet')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Continue with Apple
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
