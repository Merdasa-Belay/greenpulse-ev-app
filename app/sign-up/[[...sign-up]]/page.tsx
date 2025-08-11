'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Validation schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  role: z.enum(['teacher', 'student', 'admin']).default('student'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'student',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignUpForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
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

      // Success - redirect to sign in page with success message
      router.push('/sign-in?message=Account created successfully! Please sign in.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;

    const levels = [
      { score: 0, text: '', color: '' },
      { score: 1, text: 'Very Weak', color: 'bg-red-500' },
      { score: 2, text: 'Weak', color: 'bg-red-400' },
      { score: 3, text: 'Fair', color: 'bg-yellow-500' },
      { score: 4, text: 'Good', color: 'bg-blue-500' },
      { score: 5, text: 'Strong', color: 'bg-green-500' },
    ];

    return levels[score];
  };

  const passwordStrength = getPasswordStrength(password || '');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh+100px)] bg-gray-100">
      <div className="bg-white p-8 w-[450px] rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">
            Join our learning platform as a teacher, student, or admin
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-900 font-semibold mb-2">
              Full Name
            </label>
            <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
              <svg fill="none" viewBox="0 0 24 24" className="text-gray-400" width={20} height={20}>
                <circle strokeWidth="1.5" stroke="currentColor" r="4" cy="8" cx="12" />
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                />
              </svg>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-900 font-semibold mb-2">
              Email Address
            </label>
            <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
              <svg fill="none" viewBox="0 0 24 24" className="text-gray-400" width={20} height={20}>
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                />
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

          {/* Role Selection */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-gray-900 font-semibold mb-2">
              I am a...
            </label>
            <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
              <svg fill="none" viewBox="0 0 24 24" className="text-gray-400" width={20} height={20}>
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11ZM21 8V14M18 11H24"
                />
              </svg>
              <select
                {...register('role')}
                id="role"
                className="ml-3 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
                disabled={isSubmitting}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-900 font-semibold mb-2">
              Password
            </label>
            <div className="border border-gray-200 rounded-lg h-12 flex items-center pl-3 focus-within:border-blue-500 transition">
              <svg fill="none" viewBox="0 0 24 24" className="text-gray-400" width={20} height={20}>
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                />
              </svg>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="ml-3 rounded-lg border-none w-full h-full focus:outline-none"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3 text-gray-400 hover:text-gray-600"
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
            {password && passwordStrength.score > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Password strength</span>
                  <span className={`font-medium ${passwordStrength.score >= 4 ? 'text-green-600' : passwordStrength.score >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="text-blue-600 font-medium hover:text-blue-700 transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
