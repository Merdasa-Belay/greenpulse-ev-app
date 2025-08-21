/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        neutral: 'var(--muted)',
        cta: 'var(--cta)',
        'cta-gold': 'var(--cta-gold)',
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)',
      },
    },
  },
  plugins: [],
};
