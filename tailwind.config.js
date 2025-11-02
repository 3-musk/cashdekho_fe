/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkgoldenrod: "#cc9d2f",
        white: "#fff",
        maroon: "#5b0017",
        gray: "rgba(255, 255, 255, 0.15)",
        sandybrown: "#ffb577",
        darkslateblue: "#243054",
      },
      spacing: {},
      fontFamily: {
        "cormorant-garamond": "'Cormorant Garamond'",
        poppins: "Poppins",
        inter: "Inter",
        coustard: "Coustard",
      },
    },
    fontSize: {
      "13xl": "32px",
      "5xl": "24px",
      "10xl-9": "29.9px",
      mini: "15px",
      "2xl": "21px",
      sm: "14px",
      "sm-3": "13.3px",
      "3xs": "10px",
      lg: "18px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    // preflight: false,
  },
};
