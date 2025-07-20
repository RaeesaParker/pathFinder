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
        customGray: {
          50: { value: "#FAFAFA" },
          100: { value: "#f7fafc" },
          200: { value: "#edf2f7" },
          300: { value: "#D9D9D9" },
          400: { value: "#a0aec0" },
          500: { value: "#718096" },
          600: { value: "#4a5568" },
          700: { value: "#2d3748" },
          800: { value: "#1a202c" },
          900: { value: "#1C1C1C" },
        },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": {
          value: {
            base: "{colors.customGray.50}",
            _dark: "{colors.customGray.900}",
          },
        },
        "bg.surface": {
          value: {
            base: "white",
            _dark: "{colors.customGray.800}",
          },
        },
        "bg.muted": {
          value: {
            base: "{colors.brand.100}",
            _dark: "{colors.brand.900}",
          },
        },
        fg: {
          value: {
            base: "{colors.customGray.900}",
            _dark: "white",
          },
        },
        "fg.muted": {
          value: {
            base: "{colors.customGray.600}",
            _dark: "{colors.customGray.300}",
          },
        },
        "fg.subtle": {
          value: {
            base: "{colors.customGray.500}",
            _dark: "{colors.customGray.400}",
          },
        },
        border: {
          value: {
            base: "{colors.customGray.300}",
            _dark: "{colors.customGray.600}",
          },
        },
        "border.accent": {
          value: {
            base: "{colors.brand.600}",
            _dark: "{colors.brand.600}",
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "system-ui, sans-serif",
      transition: "background-color 0.2s, color 0.2s",
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
