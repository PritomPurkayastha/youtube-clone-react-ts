/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          default: colors.neutral[200],
          hover: colors.neutral[900]
        }
      }
    },
  },
  plugins: [],
}

