import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070913",
        sidebar: "#0A0D18",
        panel: "#0C0F1D",
        card: "#0F1322",
        border: {
          DEFAULT: "#192033",
          light: "#1D263B",
          dark: "#161D2F",
        },
        brand: {
          purple: "#7C3AED",
          accent: "#8B5CF6",
          light: "#A855F7",
        },
      },
    },
  },
  plugins: [],
};

export default config;
