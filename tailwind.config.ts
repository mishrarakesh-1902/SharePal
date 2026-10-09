import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sharepal: {
          purple: {
            DEFAULT: "#3e0d5e",
            dark: "#32074d",
            light: "#581c87",
            header: "#3f0a59",
          },
          lime: {
            DEFAULT: "#8ee600",
            hover: "#7ecb00",
            light: "#d9f99d",
            badge: "#ecfccb",
          },
          navy: {
            DEFAULT: "#081329",
            dark: "#050b18",
            card: "#0b1a38",
            light: "#112248",
          },
          blue: {
            DEFAULT: "#2563eb",
            royal: "#1d4ed8",
            banner: "#1e4bb5",
            tag: "#2563eb",
          },
          orange: {
            DEFAULT: "#ea580c",
            trending: "#f97316",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-ubuntu)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
