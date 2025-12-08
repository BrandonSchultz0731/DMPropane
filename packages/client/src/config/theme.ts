import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",

  colors: {
    brand: [
      "#fff4ea",
      "#ffe3cc",
      "#ffc799",
      "#ffa366",
      "#ff8a3d",
      "#ff7a1f",
      "#ff6b00",
      "#e65f00",
      "#cc5500",
      "#994000",
    ],
  },

  fontFamily: "Inter, system-ui, sans-serif",

  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: "700",
  },

  defaultRadius: "lg",
});
