/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@eo/tailwind-config")],
  theme: {
    extend: {
      fontFamily: {
        "new-hero": ["New Hero", "sans-serif"],
      },
    },
  },
};
