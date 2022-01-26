const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      orange: colors.orange,
      red: colors.red,
      green: colors.green
    },
    extend: {}
  },
  plugins: []
}
