import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070a10',
        panel: '#101722',
        line: '#2a3547',
        mint: '#77f5c5',
        lilac: '#b5a5ff',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(119, 245, 197, 0.08), 0 24px 80px rgba(60, 222, 163, 0.16)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
