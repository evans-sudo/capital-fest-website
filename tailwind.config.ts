import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fest-dark': '#0a0b0d',
        'fest-cream': '#f2eee3',
        'fest-mint': '#37e4d4',
        'fest-lime': '#b8ff46',
      },
    },
  },
  plugins: [],
};
export default config;
