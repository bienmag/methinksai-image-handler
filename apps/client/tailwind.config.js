/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        my1: 'rgb(var(--color-1)/<alpha-value>)',
        my2: 'rgb(var(--color-2)/<alpha-value>)',
        my3: 'rgb(var(--color-3)/<alpha-value>)',
        my4: 'rgb(var(--color-4)/<alpha-value>)',
      },
    },
  },
  plugins: [],
};
