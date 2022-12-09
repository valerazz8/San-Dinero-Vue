/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'lera-green-light': '#88CCBB',
        'lera-green-dark': '#49AB92',
        'lera-green': '#49AB92',
        'lera-yellow': '#EDCA7F',
        'lera-yellow-light': '#F6E4BF',
        'lera-red': '#D98481',
        'lera-blue': '#7892B5',
      }
    },
  },
  plugins: [],
}

