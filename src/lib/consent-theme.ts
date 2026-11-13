import { defineTheme } from "c15t/next";

// The consent banner and preferences dialog in the site's own colours:
// warm near-black surfaces, Satoshi Orange for the main action, Ubuntu type.
// The site is always dark, so the dark palette is the same as the light one.
const colors = {
  primary: "#f8931a",
  primaryHover: "#e68a00",
  textOnPrimary: "#000000",
  surface: "#141210",
  surfaceHover: "#1d1a17",
  border: "#2b2723",
  borderHover: "#3a3330",
  text: "#ffffff",
  textMuted: "#a39a91",
  overlay: "rgba(0, 0, 0, 0.6)",
  switchTrack: "#3a3330",
  switchTrackActive: "#f8931a",
  switchThumb: "#ffffff",
};

export const consentTheme = defineTheme({
  colors,
  dark: colors,
  typography: { fontFamily: "var(--font-sans)" },
  radius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
  shadows: {
    lg: "0 16px 40px -8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.06)",
  },
});
