// const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: `hsla(0, 0%, 7%, 1)`,
        secondary: `hsla(0, 0%, 20%, 1)`,
      },
    },
  },
  plugins: [],
};
