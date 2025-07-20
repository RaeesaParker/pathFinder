import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#ef4444" },
          600: { value: "#B20F18" },
          700: { value: "#991b1b" },
          800: { value: "#7f1d1d" },
          900: { value: "#450a0a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        "bg.primary": {
          value: { base: "{colors.gray.50}", _dark: "{colors.gray.900}" },
          description: "Main background color",
        },
        "bg.secondary": {
          value: { base: "white", _dark: "{colors.gray.800}" },
          description: "Card and surface backgrounds",
        },
        "text.primary": {
          value: { base: "{colors.gray.900}", _dark: "white" },
          description: "Primary text color",
        },
        "text.secondary": {
          value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" },
          description: "Secondary text color",
        },
        "text.brand": {
          value: { base: "{colors.brand.600}", _dark: "{colors.brand.600}" },
          description: "Brand color text",
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.primary",
      color: "text.primary",
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
