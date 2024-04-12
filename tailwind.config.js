/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {

        heading: "Montserrat",
        body: "Hind",
        heading3: "Roboto",
      },
      colors: {

        grey1: "#FFFFFF",
        grey2: "#F7F7F7",
        grey3: "#E9E9E9",
        grey4: "#CDCDCD",
        grey5: "#B1B1B1",
        grey6: "#969696",
        grey7: "#7D7D7D",
        grey8: "#010E21",

        primary1: "#EFF8FF",
        primary2: "#D0E9FF",
        primary3: "#B2DDFF",
        primary4: "#84CAFE",
        primary5: "#54B1FE",
        primary6: "#2E90FB",
        primary7: "#1470EF",
        primary8: "#175CD3",
        primary9: "#1849A8",
        primary10: "#1A4186",

        green1: "#C3FFF1",
        green2: "#42CEAD",
        green3: "#0B8064",

        red1: "#FFC3C3",
        red2: "#CE4242",
        red3: "#800B0B",

        yellow1: "#FFE7C3",
        yellow2: "#CE9642",
        yellow3: "#80510B",
      },
    },
  },
  plugins: [],
};
