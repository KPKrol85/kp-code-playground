/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf8",
          100: "#f8f2e8",
          200: "#eadfce",
        },
        forge: {
          50: "#eef7f5",
          100: "#d9ece8",
          500: "#2f756b",
          600: "#245e56",
          700: "#194941",
          900: "#102f2b",
        },
        charcoal: {
          700: "#2d302f",
          800: "#202322",
          900: "#141817",
        },
        clay: {
          500: "#a56a43",
          600: "#855332",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(20, 24, 23, 0.08)",
        premium: "0 28px 80px rgba(20, 24, 23, 0.14)",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
