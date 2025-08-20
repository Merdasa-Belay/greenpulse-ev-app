"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Minimum 8 characters').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, 'Must include upper, lower & number'),
    role: z.enum(['student', 'teacher', 'admin']),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpClient() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, watch, formState: { errors, isValid, dirtyFields } } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
        defaultValues: { name: '', email: '', password: '', role: 'student' }
    });

    const values = watch();
    const totalFields = 4;
    type FieldKey = keyof SignUpForm;
    const orderedFields: FieldKey[] = ['name', 'email', 'password', 'role'];
    const completedCount = useMemo(() => orderedFields.filter(f => (dirtyFields as Partial<Record<FieldKey, boolean>>)[f] && values[f]).length, [dirtyFields, values]);
    const progressPct = Math.round((completedCount / totalFields) * 100);

    const passwordStrength = useMemo(() => {
        const p = values.password || '';
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[a-z]/.test(p)) score++;
        if (/\d/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return score; // 0-5
    }, [values.password]);

    const onSubmit = async (data: SignUpForm) => {
        setServerError(null);
        setSubmitting(true);
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                let msg = 'Something went wrong';
                try { const j = await res.json(); if (j?.error) msg = j.error; } catch { }
                throw new Error(msg);
            }
            router.push('/sign-in?message=Account%20created.%20Please%20sign%20in.');
        } catch (e) {
            setServerError(e instanceof Error ? e.message : 'Unexpected error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-emerald-50/60 dark:from-slate-950 dark:to-emerald-950/10 px-4 py-12">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="signup-heading" className="relative flex flex-col gap-5 bg-white dark:bg-slate-900/90 backdrop-blur-sm border border-emerald-100 dark:border-emerald-900/40 px-8 py-10 rounded-2xl shadow-md shadow-emerald-100/40 dark:shadow-black/40">
                    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100/30 via-white/0 to-emerald-200/30 dark:from-emerald-900/30 dark:via-emerald-900/0 dark:to-emerald-800/20" />
                    </div>
                    <div className="relative flex flex-col items-center text-center mb-2">
                        <Link href="/" className="inline-flex items-center justify-center mb-4" aria-label="Green Pulse Home">
                            <Image src="/images/logo.svg" alt="Green Pulse logo" width={64} height={64} priority className="h-14 w-auto" />
                        </Link>
                        <h1 id="signup-heading" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Create Account</span>
                        </h1>
                        <span className="inline-block h-1 w-20 rounded-full bg-emerald-500/90 mb-2" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm">Join Green Pulse to build EV maintenance & green tech skills tailored to emerging markets.</p>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-2" aria-label="Form completion progress">
                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            <span>Progress</span><span>{progressPct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <span className="block h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                    </div>

                    {serverError && <p role="alert" aria-live="assertive" className="relative text-red-600 text-center text-sm bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md py-2 px-3">{serverError}</p>}

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-gray-900 dark:text-gray-100 font-semibold">Username</label>
                        <div className={`border ${errors.name ? 'border-red-400 ring-2 ring-red-300/40' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition`}>
                            <svg fill="none" viewBox="0 0 24 24" width={20} height={20} className="text-gray-400">
                                <circle strokeWidth="1.5" stroke="currentColor" r="4" cy="8" cx="12" />
                                <path strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20" />
                            </svg>
                            <input id="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Username" className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400" {...register('name')} />
                        </div>
                        {errors.name && <p id="name-error" className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-900 dark:text-gray-100 font-semibold">Email</label>
                        <div className={`border ${errors.email ? 'border-red-400 ring-2 ring-red-300/40' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition`}>
                            <svg fill="none" viewBox="0 0 24 24" width={20} height={20} className="text-gray-400">
                                <path strokeWidth="1.5" stroke="currentColor" d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" />
                            </svg>
                            <input id="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="Email" className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400" {...register('email')} />
                        </div>
                        {errors.email && <p id="email-error" className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-900 dark:text-gray-100 font-semibold">Password</label>
                        <div className={`border ${errors.password ? 'border-red-400 ring-2 ring-red-300/40' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition relative`}>
                            <svg fill="none" viewBox="0 0 24 24" width={20} height={20} className="text-gray-400">
                                <path strokeWidth="1.5" stroke="currentColor" d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z" />
                            </svg>
                            <input id="password" type="password" aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error password-hint' : 'password-hint'} placeholder="Password" className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400" {...register('password')} />
                        </div>
                        {/* Strength meter */}
                        <div className="flex items-center gap-2">
                            {[0, 1, 2, 3, 4].map(i => (
                                <span key={i} className={`h-1.5 w-full rounded-full transition-colors ${passwordStrength > i ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                            ))}
                        </div>
                        <p id="password-hint" className="text-[11px] text-slate-500 dark:text-slate-400">Use 8+ chars incl. upper, lower, number (symbol optional).</p>
                        {errors.password && <p id="password-error" className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="role" className="text-gray-900 dark:text-gray-100 font-semibold">Role</label>
                        <div className={`border ${errors.role ? 'border-red-400 ring-2 ring-red-300/40' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 rounded-lg h-12 flex items-center pl-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition`}>
                            <svg viewBox="0 0 24 24" width={20} height={20} className="text-gray-400"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-8 9a8 8 0 0 1 16 0z" /></svg>
                            <select id="role" aria-invalid={!!errors.role} aria-describedby={errors.role ? 'role-error' : undefined} className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent text-gray-900 dark:text-gray-100" {...register('role')}>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {errors.role && <p id="role-error" className="text-red-500 text-xs">{errors.role.message}</p>}
                    </div>

                    <button type="submit" disabled={!isValid || submitting} aria-disabled={!isValid || submitting} aria-busy={submitting} className="group relative mt-4 mb-1 bg-emerald-600 text-white text-sm font-medium rounded-lg h-12 w-full hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center">
                        {submitting && <span className="absolute left-4 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                        {submitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p className="relative text-center text-sm text-gray-600 dark:text-gray-300">Already have an account?{' '}<Link href="/sign-in" className="text-emerald-600 font-medium hover:text-emerald-700 dark:hover:text-emerald-400">Sign In</Link></p>
                </form>
            </div>
        </div>
    );
}
