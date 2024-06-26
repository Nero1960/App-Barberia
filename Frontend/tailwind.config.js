/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{tsx, jsx, ts, js}'],
  theme: {
    extend: {
      colors: {
        "black": {
          "50": "#E8E8E8",
          "100": "#CFCFCF",
          "200": "#9E9E9E",
          "300": "#707070",
          "400": "#404040",
          "500": "#0F0F0F",
          "600": "#0D0D0D",
          "700": "#0A0A0A",
          "800": "#050505",
          "900": "#030303",
          "950": "#030303"
        },

        "dark": {
          "50": "#E8E8E8",
          "100": "#D1D1D1",
          "200": "#A6A6A6",
          "300": "#787878",
          "400": "#4D4D4D",
          "500": "#1F1F1F",
          "600": "#1A1A1A",
          "700": "#121212",
          "800": "#0D0D0D",
          "900": "#050505",
          "950": "#030303"
        },

        "primary": {
          "50": "#FBF6EF",
          "100": "#F7EDDE",
          "200": "#EED9B9",
          "300": "#E6C798",
          "400": "#DEB577",
          "500": "#D6A354",
          "600": "#C1872E",
          "700": "#906423",
          "800": "#5F4217",
          "900": "#31220C",
          "950": "#191106"
        },

        "secondary": {
          "50": "#FBF8F4",
          "100": "#F6F1E9",
          "200": "#ECE0CF",
          "300": "#E4D1B9",
          "400": "#DBC3A3",
          "500": "#D2B48C",
          "600": "#BE935A",
          "700": "#966F3B",
          "800": "#634927",
          "900": "#332614",
          "950": "#1A130A"
        },

        "white": "#F7F7F7"
      }, 

      fontFamily: {
        Body : ["Poppins"],
        Heading: ["Kaisei HarunoUmi"]
      }
    },
  },
  plugins: [],
}

