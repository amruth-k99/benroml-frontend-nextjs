const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        blue: colors.blue,
        teal: colors.teal,
        rose: colors.rose,
        main: {
          100: "#5d9e63",
          200: "#3e8044",
          500: "#091e0b",
          600: "#091e0b",
        },
        purple: colors.purple,
        emerald: colors.emerald,
        orange: colors.orange,
        lime: colors.lime,
        fuchsia: colors.fuchsia,
        myellow: {
          100: "#ffdd33",
        },
        newblue: {
          100: "#0066ee",
        },
        newblack: {
          100: "#21212",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
