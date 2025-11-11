/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors: {
      primary: "#009639", // Schaeffler Green
      primaryLight: "#4CAF50",
      primaryDark: "#006D2C",
    }
  }
},
  plugins: [],
}