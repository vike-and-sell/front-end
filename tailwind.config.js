/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'pri-blue': '#166aac',
      'sec-yellow': '#ffc427',
      'acc-gray': '#8795a5',
      'rt-dark-cover': '#072438' 
    },
    fontFamily: {
      inter: 'Inter, ui-serif',
    },
    extend: {},
  },
  plugins: [],
}