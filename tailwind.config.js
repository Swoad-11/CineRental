/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // font-sans  → DM Sans  (body text, UI)
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // font-playfair → Playfair Display  (titles, logo)
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          dim: "#8A6D2F",
        },
        surface: {
          0: "#0A0A0B",
          1: "#111114",
          2: "#18181C",
          3: "#222228",
        },
      },
    },
  },
  plugins: [],
};
