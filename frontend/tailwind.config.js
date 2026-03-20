/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d6a4f',
        secondary: '#52b788',
        accent: '#95d5b2',
        surface: '#f8faf8',
        border: '#e8f0e8',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}