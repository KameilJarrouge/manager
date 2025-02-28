/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#222831",
        primary: "#393E46",
        foreground: "#EEEEEE",
        accent: "#D65A31",
        input_bg: "#4B4F58",
        input_prefix_bg: "#3F424D",
      },
      keyframes: {
        popIn: {
          "0%": { scale: "0%" },
          "50%": { scale: "110%" },
          "100%": { scale: "100%" },
        },
        expand: {
          "0%": { transform: "scaleX(0%)" },
          "100%": { transform: "scaleX(100%)" },
        },
        collapse: {
          "0%": { transform: "scaleX(100%)" },
          "100%": { transform: "scaleX(0%)" },
        },
        slideIn: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        popIn: "popIn 0.3s linear ",
        expand: "expand 0.2s ease-in-out ",
        slideIn: "slideIn 0.2s ease-in-out ",
        collapse: "collapse 0.2s ease-in-out ",
        wiggle: "wiggle 1s ease-in-out infinite",
        rotate: "rotate 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
