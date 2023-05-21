/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        ...colors,
        dark: "#121212",
        primary: "#33AEA2",
        important: "#FFFFFF",
        highlighted: "rgb(255 255 255 / 0.9)",
        "less-important": "rgb(255 255 255 / 0.8);",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        progress90: {
          from: {
            "--init-value": "0",
          },
          to: {
            "--init-value": "90",
          },
        },
        progress80: {
          from: {
            "--init-value": "0",
          },
          to: {
            "--init-value": "80",
          },
        },
        progress70: {
          from: {
            "--init-value": "0",
          },
          to: {
            "--init-value": "70",
          },
        },
        buildHight: {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
        buildWidth: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        rotate: "rotate 100s linear infinite",
        progress90: "progress90 1s 1 forwards ",
        progress80: "progress80 1s 1 forwards ",
        progress70: "progress70 1s 1 forwards ",
        buildHight: "buildHight 1s 1  ",
        buildWidth: "buildWidth 1s 1 forwards ",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
