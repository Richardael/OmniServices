/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ff9460",
          200: "#ff6d2a",
          300: "#fc5500",
          400: "#f55000",
          500: "#ee4a00"
        },
        secondary:{
          100: "#ffffff",
          200: "#EFEFEF",
          300: "#4D4D4D",
          900: "#131517",
        },
        terciary:{
          100: "#646464",
          200: "#131532",
        }

      }
    },
  },
  plugins: [],
}