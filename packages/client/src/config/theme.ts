import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",

  colors: {
    // Main brand gradient shades
    brand: [
      "#fff4ea", // 0
      "#ffe3cc", // 1
      "#ffc799", // 2
      "#ffa366", // 3
      "#ff8a3d", // 4
      "#ff7a1f", // 5
      "#ff6b00", // 6
      "#e65f00", // 7
      "#cc5500", // 8
      "#994000", // 9
    ],

    gradient: [
      "#FF6B6B",
      "#FF7C5F",
      "#FF8D54",
      "#FF9E48",
      "#FFAF3D",
      "#FFC032",
      "#FFD227",
      "#FFD93D",
      "#FFE65A",
      "#FFF179",
    ],

    // Semantic colors for homepage visuals
    lightRed: [
      "#FFDAD6",
      "#FFB4AA",
      "#FF8C7F",
      "#FF6555",
      "#FF3E2B",
      "#FF1500",
      "#E60F00",
      "#CC0A00",
      "#990500",
      "#660300",
    ],
    mediumRed: [
      "#FF8A3D",
      "#FF7A1F",
      "#FF6B00",
      "#E65F00",
      "#CC5500",
      "#994000",
      "#802F00",
      "#661F00",
      "#4C1400",
      "#330900",
    ],

    lightYellow: [
      "#FFF9E6",
      "#FFF3CC",
      "#FFED99",
      "#FFE566",
      "#FFDE33",
      "#FFD93D",
      "#FFC700",
      "#E6B800",
      "#CC9900",
      "#997300",
    ],
    mediumYellow: [
      "#FFD93D",
      "#FFC032",
      "#FFB100",
      "#E6A000",
      "#CC8F00",
      "#997000",
      "#805500",
      "#664000",
      "#4C2B00",
      "#331700",
    ],

    lightGreen: [
      "#E6F9F0",
      "#CCF3E1",
      "#99E6C3",
      "#66D9A5",
      "#33CC87",
      "#00BF69",
      "#00A65C",
      "#008F4F",
      "#006D3F",
      "#004B2F",
    ],
    mediumGreen: [
      "#00BF69",
      "#00A65C",
      "#008F4F",
      "#007A43",
      "#006636",
      "#004D28",
      "#00371B",
      "#00240F",
      "#001204",
      "#000000",
    ],

    lightBlue: [
      "#E6F0FF",
      "#CCE0FF",
      "#99C2FF",
      "#66A3FF",
      "#3385FF",
      "#0066FF",
      "#0055E6",
      "#0044CC",
      "#003399",
      "#002266",
    ],
    mediumBlue: [
      "#0066FF",
      "#0055E6",
      "#0044CC",
      "#003399",
      "#002266",
      "#001144",
      "#000933",
      "#000522",
      "#000311",
      "#000000",
    ],
  },

  fontFamily: "Inter, system-ui, sans-serif",

  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: "700",
  },

  defaultRadius: "lg",
});
