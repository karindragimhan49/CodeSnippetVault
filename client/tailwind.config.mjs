/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#0D1117',
        'brand-surface': '#161B22',
        'brand-primary': '#58A6FF',
        'brand-secondary': '#1F6FEB',
        'brand-accent': '#F78166',
        'brand-text-main': '#C9D1D9',
        'brand-text-secondary': '#8B949E',
        'brand-border': '#30363D',
      },
    },
  },
  plugins: [],
};
export default config;