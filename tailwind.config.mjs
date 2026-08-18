/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ink: "#1A1410",
        pearl: "#FFFDF9",
        "noor-rose": "#ff8fb2",
        "noor-gold": "#ffd7a1",
        "noor-violet": "#a78bfa",
        "noor-mint": "#5eead4",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        urdu: ["var(--font-urdu)", "serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

