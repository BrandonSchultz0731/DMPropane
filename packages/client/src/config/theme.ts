import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",

  colors: {
    // Main brand - earthy terracotta/orange
    brand: [
      "#FEF5ED", // 0 - lightest cream
      "#FCE8D5", // 1
      "#F8D4B3", // 2
      "#F4C08F", // 3
      "#E8A569", // 4
      "#D6893F", // 5
      "#C46D2A", // 6 - primary
      "#A8551F", // 7
      "#8B4513", // 8 - saddle brown
      "#6B3410", // 9 - darkest
    ],

    // Earth tones - browns and tans
    earth: [
      "#F5F1E8", // 0 - light sand
      "#E8DFD0", // 1
      "#D4C4A8", // 2
      "#B8A082", // 3
      "#9C7C5C", // 4
      "#7D5F3F", // 5
      "#5C4228", // 6
      "#4A3420", // 7
      "#3A2818", // 8
      "#2A1E10", // 9
    ],

    // Natural greens - forest and sage
    forest: [
      "#F0F5F0", // 0
      "#D9E8D9", // 1
      "#B3D1B3", // 2
      "#8DB98D", // 3
      "#5A8A5A", // 4
      "#3D6B3D", // 5
      "#2D502D", // 6
      "#1F3A1F", // 7
      "#152815", // 8
      "#0D1A0D", // 9
    ],

    // Sage green accents
    sage: [
      "#F4F6F2", // 0
      "#E8EDE0", // 1
      "#D1DBC1", // 2
      "#B5C79A", // 3
      "#9AB373", // 4
      "#7A9559", // 5
      "#5F7445", // 6
      "#4A5A36", // 7
      "#364028", // 8
      "#252C1B", // 9
    ],

    // Warm amber/orange for accents
    amber: [
      "#FFF8ED", // 0
      "#FFEED1", // 1
      "#FFDAA3", // 2
      "#FFC575", // 3
      "#FFB047", // 4
      "#E8961A", // 5
      "#CC7A0F", // 6
      "#A85F0C", // 7
      "#854709", // 8
      "#663506", // 9
    ],

    // Deep browns for text and accents
    brown: [
      "#F5F0E8", // 0
      "#E8DCC8", // 1
      "#D4B890", // 2
      "#B8945F", // 3
      "#9C6F3F", // 4
      "#7D562F", // 5
      "#5C3F22", // 6
      "#4A3219", // 7
      "#3A2612", // 8
      "#2A1B0C", // 9
    ],
  },

  fontFamily: "'Inter', 'Georgia', serif, system-ui, sans-serif",

  headings: {
    fontFamily: "'Inter', 'Georgia', serif, system-ui, sans-serif",
    fontWeight: "700",
  },

  defaultRadius: "md",

  shadows: {
    xs: "0 1px 3px rgba(106, 52, 16, 0.1)",
    sm: "0 2px 6px rgba(106, 52, 16, 0.12)",
    md: "0 4px 12px rgba(106, 52, 16, 0.15)",
    lg: "0 8px 24px rgba(106, 52, 16, 0.18)",
    xl: "0 16px 48px rgba(106, 52, 16, 0.2)",
  },
});
