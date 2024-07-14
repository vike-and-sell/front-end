/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: "Inter, ui-serif",
    },
    extend: {
      colors: {
        "pri-blue": "#166aac",
        "acc-blue": "#BEE3F8",
        "sec-yellow": "#ffc427",
        "acc-gray": "#8795a5",
        "rt-dark-blue": "#072438",
        red: "#be0f0f",
      },
    },
  },
  plugins: [],
};
