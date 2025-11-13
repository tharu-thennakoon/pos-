// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e0e7ff",
          300: "#a5b4fc",
          600: "#6366f1",
          700: "#4f46e5",
          800: "#4338ca",
          900: "#312e81",
        },
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
};