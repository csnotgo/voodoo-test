/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["monospace", "Space Mono"],
      },
      fontSize: {
        xs: ["12px", "15px"],
        sm: ["14px", "18px"],
        smFooter: ["14px", "21px"],
        base: ["16px", "20px"],
        xl: ["20px", "26px"],
      },
      colors: {
        lightSand: "#FCF7E6",
        orange: "#ED5E21",
        orangeHover: "#d84a0e",
      },
      boxShadow: {
        outline: "0px 0px 10px 4px rgba(237,94,33,0.5)",
      },
      screens: {
        sm: "400px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      container: {
        center: true,
        sm: "max-width: 400px",
        md: "max-width: 768px",
        lg: "max-width: 1024px",
        xl: "max-width: 1280px",
        "2xl": "max-width: 1280px",
        padding: {
          DEFAULT: "24px",
          sm: "24px",
          lg: "0",
          xl: "0",
          "2xl": "0",
        },
      },
    },
  },
  plugins: [],
};
