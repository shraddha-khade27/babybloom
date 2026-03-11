/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f4',
          100: '#e5eee5',
          200: '#cbdccb',
          300: '#a7c3a7',
          400: '#7fa57f',
          500: '#608a60',
          600: '#4a6e4a',
        },
        blush: {
          50: '#fdf5f6',
          100: '#fae8eb',
          200: '#f4d1d8',
          300: '#eaaab8',
          400: '#de7a90',
          500: '#d0536e',
        },
        cream: {
          DEFAULT: '#fdfbf7',
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f9f5ea',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
