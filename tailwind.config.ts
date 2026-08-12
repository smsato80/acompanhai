import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080b12',
        panel: '#111722',
        line: '#273142',
        mint: '#74f2c0',
        lilac: '#aa9bff',
      },
      boxShadow: {
        glow: '0 0 60px rgba(116, 242, 192, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
