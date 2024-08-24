import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "red-ribbon": {
          "50": "#fff0f3",
          "100": "#ffdee4",
          "200": "#ffc2ce",
          "300": "#ff98ab",
          "400": "#ff5d7c",
          "500": "#ff2b53",
          "600": "#f71943",
          "700": "#d0052b",
          "800": "#ab0928",
          "900": "#8d0f27",
          "950": "#4e0110",
        },
      },
    },
  },
};
