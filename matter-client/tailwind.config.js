/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5A9C1C",
        secondary: "#8d5381",
        tertiary: "#25262d",
        quad: "#C1D7AC",
        pent: "#8D5381",
        hex: "#55832B"
      }
    },
  },
  plugins: [],
}

