/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["12px", "15px"],
        sm: ["14px", "18px"],
        smFooter: ["14px", "21px"],
        base: ["16px", "20px"],
      },
      colors: {
        lightSand: "#FCF7E6",
        orange: "#ED5E21",
        orangeHover: "#d84a0e",
      },
      boxShadow: {
        outline: "0px 0px 10px 4px rgba(237,94,33,0.5)",
      },
    },
  },
  plugins: [],
};
