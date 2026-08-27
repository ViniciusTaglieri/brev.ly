import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          base: "#2C46B1",
          dark: "#2C4091",
        },
        gray: {
          100: "#F9F9FB",
          200: "#E4E6EC",
          300: "#CDCFD5",
          400: "#74798B",
          500: "#4D505C",
          600: "#1F2025",
        },
        danger: "#B12C4D",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xl: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        lg: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        md: ["0.875rem", { lineHeight: "1.125rem", fontWeight: "600" }],
        sm: ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.625rem", { lineHeight: "0.875rem" }],
      },
    },
  },
  plugins: [],
};
