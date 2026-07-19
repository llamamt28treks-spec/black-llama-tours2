/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,html}",
  ],
  theme: {
    extend: {
      colors: {
        snow: '#F7F8FA',
        surface: '#FFFFFF',
        ink: '#1C2530',
        slate: '#5B6572',
        accent: '#C4362B',
        glacier: '#3E7C99',
        line: '#E4E7EB',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
