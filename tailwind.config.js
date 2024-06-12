/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    fontFamily: {
      inter: 'Inter, ui-serif',
    },
    extend: {
      colors: {
        'pri-blue': '#166aac',
        'sec-yellow': '#ffc427',
        'acc-gray': '#8795a5',
        'rt-dark-blue': '#072438' 
        
      },
    },
  },
  plugins: [],
  
}