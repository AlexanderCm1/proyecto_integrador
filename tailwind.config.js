const colors = require("tailwindcss/colors");


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        cards: "#930534",
        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        blue: colors.blue,
        amber: colors.amber,
      },
     },
   },
   variants: {
     extend: {
        opacity: ['disabled'],
     },
   },
   plugins: [
    require('@tailwindcss/forms'),
   ],
 }