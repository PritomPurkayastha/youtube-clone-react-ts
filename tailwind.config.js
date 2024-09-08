/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1750px'
      },
      colors: {
        secondary: {
          default: colors.neutral[200],
          hover: colors.neutral[900]
        }
      },
      backgroundColor: {
        'white-opacity-20': 'rgba(255, 255, 255, 0.2)', // Custom background color
      },
    },
  },
  plugins: [],
}

