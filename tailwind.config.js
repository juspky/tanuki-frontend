const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.red,
      gray: colors.trueGray
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
