import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#F6F1E8",
        bege: "#E8DBC7",
        nude: "#DFC9B4",
        champagne: "#F0E4D0",
        gold: {
          DEFAULT: "#BC9C63",
          soft: "#D8C199",
          deep: "#9A7C46",
        },
        cocoa: {
          DEFAULT: "#3B2C22",
          soft: "#6C594A",
          muted: "#8B7867",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.14em",
        widest2: "0.3em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "70%": { transform: "translateY(26px)", opacity: "1" },
          "100%": { transform: "translateY(36px)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "scroll-dot": "scroll-dot 2.4s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
