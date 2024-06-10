const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        alexa: ["Alex Brush", "cursive"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
