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
        success: {
          DEFAULT: `hsla(115, 69%, 52%, 1)`,
          light: `hsla(113, 100%, 95%, 1)`,
        },
        danger: {
          DEFAULT: `hsla(8, 100%, 28%, 1)`,
          light: `hsla(9, 100%, 95%, 1)`,
        },
      },
    },
  },
  plugins: [],
};
