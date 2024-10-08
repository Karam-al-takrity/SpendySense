/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEEEEE",
        cobalt: "#334166",
        labosi: "#C8ACD6",
      },
    },
  },
  plugins: [],
};
