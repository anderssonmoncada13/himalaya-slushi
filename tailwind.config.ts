import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        glass: {
          white: 'rgba(255,255,255,0.12)',
          blue:  'rgba(125,211,252,0.08)',
          dark:  'rgba(8,12,28,0.6)',
        },
        luxury: {
          dark:   '#06090f',
          navy:   '#0a1628',
          deep:   '#0f2040',
          mid:    '#1a3a6e',
          silver: '#c8d8e8',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ice-gradient':  'linear-gradient(135deg, #06090f 0%, #0a1628 35%, #0f2040 65%, #06090f 100%)',
        'glow-radial':   'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 70%)',
        'card-glass':    'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(125,211,252,0.04) 100%)',
        'hero-radial':   'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.2) 0%, rgba(6,9,15,0) 70%)',
        'shimmer':       'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      },
      boxShadow: {
        'ice':        '0 0 40px rgba(56,189,248,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        'ice-hover':  '0 0 60px rgba(56,189,248,0.25), 0 20px 60px rgba(0,0,0,0.5)',
        'glass':      '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover':'0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        'glow-blue':  '0 0 20px rgba(56,189,248,0.4), 0 0 60px rgba(56,189,248,0.2)',
        'card':       '0 4px 24px rgba(0,0,0,0.2)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'float-fast':  'float 4s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'pulse-ice':   'pulseIce 3s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
        'glow':        'glow 3s ease-in-out infinite alternate',
        'slide-up':    'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseIce: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56,189,248,0.2)' },
          '50%':      { boxShadow: '0 0 50px rgba(56,189,248,0.5)' },
        },
        glow: {
          '0%':   { textShadow: '0 0 10px rgba(125,211,252,0.5)' },
          '100%': { textShadow: '0 0 30px rgba(125,211,252,0.9), 0 0 60px rgba(56,189,248,0.6)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
