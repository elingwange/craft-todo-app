/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // App Router
    './pages/**/*.{js,ts,jsx,tsx}', // Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // 可选
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        'theme-light': '#f8f4ea',
        'theme-coffee': '#d7c8af',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        playfair: 'var(--font-playfair)',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};
