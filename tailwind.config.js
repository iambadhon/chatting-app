/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        pop: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#5F35F5",
        durkblue: "#11175D",
        gray: "rgba(17, 23, 93, 0.5)",
        lightwhite: "#f1f1f1",
      },
      screens: {
        sm: "320px",
        sml: "667px",
      },
      clipPath: {
        leftpolygon: "polygon(100% 0, 0% 100%, 100% 100%)",
        rightpolygon: "polygon(0 0, 0 100%, 100% 100%)",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-clip-path")],
};
