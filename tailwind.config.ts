import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        "brand-card": "var(--shadow-brand-card)",
        "brand-soft": "var(--shadow-brand-soft)",
      },
      maxWidth: {
        brand: "var(--container-brand)",
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section-padding)",
      },
    },
  },
} satisfies Config;

export default config;
