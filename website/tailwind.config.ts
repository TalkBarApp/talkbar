import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,ts,tsx,html}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontSize: {
        xs: ["0.825rem", { lineHeight: "1.1rem" }],
        sm: ["0.9625rem", { lineHeight: "1.375rem" }],
        base: ["1.1rem", { lineHeight: "1.65rem" }],
        lg: ["1.2375rem", { lineHeight: "1.75rem" }],
        xl: ["1.375rem", { lineHeight: "1.925rem" }],
        "2xl": ["1.65rem", { lineHeight: "2.2rem" }],
        "3xl": ["2.0625rem", { lineHeight: "2.475rem" }],
        "4xl": ["2.475rem", { lineHeight: "2.75rem" }],
        "5xl": ["3.3rem", { lineHeight: "1" }],
        "6xl": ["4.125rem", { lineHeight: "1" }],
        "7xl": ["4.95rem", { lineHeight: "1" }],
        "8xl": ["6.6rem", { lineHeight: "1" }],
        "9xl": ["8.8rem", { lineHeight: "1" }],
      },
      fontFamily: {
        sans: ["'Hanken Grotesk'", "'Onest'", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Urbanist'", "'Onest'", "'Hanken Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Urbanist'", "'Onest'", "ui-sans-serif", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        raised: "hsl(var(--surface-raised))",
        sunken: "hsl(var(--surface-sunken))",
        dim: "hsl(var(--dim))",
        ink: "hsl(var(--ink))",
        "ink-foreground": "hsl(var(--ink-foreground))",
        cream: "hsl(var(--cream))",
        "brand-deep": "hsl(var(--brand-deep))",
        "ps-green": "hsl(var(--green))",
        "ps-green-soft": "hsl(var(--green-soft))",
        "ps-amber": "hsl(var(--amber))",
        "ps-amber-soft": "hsl(var(--amber-soft))",
        "ps-purple": "hsl(var(--purple))",
        "ps-purple-soft": "hsl(var(--purple-soft))",
        "accent-soft": "hsl(var(--accent-soft))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
