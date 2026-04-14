import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F766E',
          dark: '#134E4A',
          light: '#F0FDFA',
          accent: '#F97316',
          surface: '#F8FAFC',
          muted: '#64748B',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: ['18px', '1.6'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 118, 110, 0.06), 0 1px 2px rgba(15, 118, 110, 0.04)',
        'card-hover': '0 10px 25px rgba(15, 118, 110, 0.1), 0 4px 10px rgba(15, 118, 110, 0.06)',
        glow: '0 0 20px rgba(15, 118, 110, 0.15)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
