
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
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
                const { error } = await res.json();
                setError(error || 'Something went wrong.');
                return;
            }

            // Redirect to sign-in with a one-time success message
            router.push('/sign-in?message=Account%20created.%20Please%20sign%20in.');

        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh+100px)] bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-8 w-[450px] rounded-2xl">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {/* Username */}
                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Username</label>
                </div>
                <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
                    <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                        <circle strokeWidth="1.5" stroke="currentColor" r="4" cy="8" cx="12" />
                        <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                        />
                    </svg>
                    <input
                        required
                        placeholder="Username"
                        className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Email</label>
                </div>
                <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
                    <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                        />
                    </svg>
                    <input
                        required
                        placeholder="Email"
                        className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Password</label>
                </div>
                <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition relative">
                    <svg fill="none" viewBox="0 0 24 24" className="input-icon" width={20} height={20}>
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                        />
                    </svg>
                    <input
                        required
                        placeholder="Password"
                        className="form-input ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Optional: Password toggle button here */}
                </div>

                {/* Role Selection */}
                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Role</label>
                </div>
                <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
                    <svg viewBox="0 0 24 24" width={20} height={20} className="text-gray-400">
                        <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-8 9a8 8 0 0 1 16 0z" />
                    </svg>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'student' | 'teacher' | 'admin')}
                        className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
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
                    className="mt-5 mb-3 bg-gray-900 text-white text-sm font-medium rounded-lg h-12 w-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}
