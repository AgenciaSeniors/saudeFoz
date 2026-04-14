import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sus: {
          primary: '#047857',
          dark: '#065f46',
          light: '#d1fae5',
          accent: '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: ['18px', '1.6'],
      },
    },
  },
  plugins: [],
};

export default config;
