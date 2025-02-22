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
    },
  },
  plugins: [],
};
