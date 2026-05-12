import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: "#071827",
        midnightNavy: "#0D1321",
        metallicGold: "#D4A017",
        luminousGold: "#F8C955",
        softGold: "#F8E7B2",
        ivoryWhite: "#FFFDF7",
        warmCream: "#F7F1E5",
        slateText: "#263447",
        successGreen: "#16A34A",
        warningAmber: "#D97706",
        dangerRed: "#DC2626",
        mutedText: "#64748B",
      },
    },
  },
  plugins: [],
};

export default config;
