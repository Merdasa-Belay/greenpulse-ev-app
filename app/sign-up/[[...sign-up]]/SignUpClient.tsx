'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!res.ok) {
                let errorMessage = 'Something went wrong.';
                try {
                    const data = await res.json();
                    if (data?.error) errorMessage = data.error;
                } catch { }
                setError(errorMessage);
                return;
            }

            router.push('/sign-in?message=Account%20created.%20Please%20sign%20in.');
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-emerald-50/60 dark:from-slate-950 dark:to-emerald-950/10 px-4 py-12">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 bg-white dark:bg-slate-900/90 backdrop-blur-sm border border-emerald-100 dark:border-emerald-900/40 px-8 py-10 rounded-2xl shadow-md shadow-emerald-100/40 dark:shadow-black/40" aria-labelledby="signup-heading">
                    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100/30 via-white/0 to-emerald-200/30 dark:from-emerald-900/30 dark:via-emerald-900/0 dark:to-emerald-800/20" />
                    </div>
                    <div className="relative flex flex-col items-center text-center mb-4">
                        <Link href="/" className="inline-flex items-center justify-center mb-4" aria-label="Green Pulse Home">
                            <Image src="/images/logo.svg" alt="Green Pulse logo" width={64} height={64} priority className="h-14 w-auto" />
                        </Link>
                        <h1 id="signup-heading" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Create Account</span>
                        </h1>
                        <span className="inline-block h-1 w-20 rounded-full bg-emerald-500/90 mb-2" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm">Join Green Pulse to build EV maintenance & green tech skills tailored to emerging markets.</p>
                    </div>

                    {error && <p className="relative text-red-500 text-center text-sm bg-red-50 border border-red-200 rounded-md py-2 px-3">{error}</p>}
                    {/* Username */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 dark:text-gray-100 font-semibold">Username</label>
                    </div>
                    <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                            <circle strokeWidth="1.5" stroke="currentColor" r="4" cy="8" cx="12" />
                            <path strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20" />
                        </svg>
                        <input
                            required
                            placeholder="Username"
                            className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 dark:text-gray-100 font-semibold">Email</label>
                    </div>
                    <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                            <path strokeWidth="1.5" stroke="currentColor" d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" />
                        </svg>
                        <input
                            required
                            placeholder="Email"
                            className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 dark:text-gray-100 font-semibold">Password</label>
                    </div>
                    <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition relative">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                            <path strokeWidth="1.5" stroke="currentColor" d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z" />
                        </svg>
                        <input
                            required
                            placeholder="Password"
                            className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 dark:text-gray-100 font-semibold">Role</label>
                    </div>
                    <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
                        <svg viewBox="0 0 24 24" width={20} height={20} className="text-gray-400">
                            <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-8 9a8 8 0 0 1 16 0z" />
                        </svg>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'student' | 'teacher' | 'admin')}
                            className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative mt-6 mb-2 bg-emerald-600 text-white text-sm font-medium rounded-lg h-12 w-full hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p className="relative text-center text-sm text-gray-600 dark:text-gray-300">Already have an account?{' '}<Link href="/sign-in" className="text-emerald-600 font-medium hover:text-emerald-700 dark:hover:text-emerald-400">Sign In</Link></p>
                </form>
            </div>
        </div>
    );
}
