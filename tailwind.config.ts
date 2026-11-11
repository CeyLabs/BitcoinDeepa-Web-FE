import type { Config } from "tailwindcss"

// Warm neutral scale from the Bitcoin Deepa brand guidelines. Anchors:
// 50 Paper Wallet Cream, 100 light panel, 200 light line, 400 muted text,
// 700/800 dark line, 900 dark panel. Other steps are interpolated to keep
// roughly the same lightness as the Tailwind zinc step they replace.
const BRAND_NEUTRAL = {
  50: "#fffcfa",
  100: "#f6f2ed",
  200: "#e4ddd5",
  300: "#c9c1b8",
  400: "#a39a91",
  500: "#7a7169",
  600: "#5a524b",
  700: "#3a3330",
  800: "#2b2723",
  900: "#141210",
  950: "#0a0908",
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Brand typefaces: Ubuntu is the primary site font, Nunito Sans the
        // secondary one. Noto Sans Sinhala picks up Sinhala glyphs.
        sans: ["var(--font-ubuntu)", "var(--font-noto-sinhala)", "system-ui", "sans-serif"],
        display: ["var(--font-ubuntu)", "var(--font-noto-sinhala)", "system-ui", "sans-serif"],
        secondary: ["var(--font-nunito-sans)", "var(--font-noto-sinhala)", "system-ui", "sans-serif"],
        sinhala: ["var(--font-noto-sinhala)", "var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand warm neutrals replace Tailwind's cool greys site-wide, so every
        // existing zinc/gray/neutral class picks up the brand palette.
        zinc: BRAND_NEUTRAL,
        gray: BRAND_NEUTRAL,
        neutral: BRAND_NEUTRAL,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F8931A",
          foreground: "hsl(var(--primary-foreground))",
        },
        bitcoin: {
          DEFAULT: "#F8931A",
          light: "#ffb84d",
          dark: "#e68a00",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "shimmer-text": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-text": "shimmer-text 2s infinite linear",
      },
      backgroundImage: {
        // Yaka flame gradient (brand guidelines, Colour): mask and one hero moment only.
        "bitcoin-gradient":
          "linear-gradient(to top right, #F6921E 0%, #F58D1E 21%, #F2801F 44%, #EE6B21 67%, #E94D24 91%, #E74126 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
