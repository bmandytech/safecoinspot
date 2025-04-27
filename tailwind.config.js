// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        binance: '#fcd535',
        darkBg: '#0b0e11'
      }
    }
  },
  plugins: []
}