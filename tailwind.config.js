/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grey:{
          100:"#131417",
          200:"#18191D",
          300:"#8082B7",
        }
      }
    },
  },
  plugins: [],
}