/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { forest: "#123D2B", ivory: "#F5F0E4", ink: "#171A16", lime: "#D7EF52", sage: "#A7B99B" },
      fontFamily: {
        display: ["var(--font-dela)", "Impact", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        hand: ["var(--font-gaegu)", "cursive"],
      },
    },
  },
  plugins: [],
};
