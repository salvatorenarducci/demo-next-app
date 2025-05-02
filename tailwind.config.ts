import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/city-health/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        primaryRed: "#FF367F",
        primaryGreen: "#15803D",
        primaryOrange: "#FF8B16",
      },

      backgroundImage: {
        "border-linear":
          "linear-gradient(90.83deg, #D8FEBF 0%, #FFE1C5 51%, #FFDAF4 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
