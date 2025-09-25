/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#8b5cf6',
          dark: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
}