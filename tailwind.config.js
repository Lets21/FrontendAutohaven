/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#1F1F1F',
          800: '#2E2E2E',
          700: '#3F3F3F',
          600: '#7A7A7A',
          400: '#B0B0B0',
          300: '#D1D1D1',
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
};