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
    lg: "0 16px 40px -8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  },
  // Accept is the one filled action; Reject and Customize are outlined, so
  // both choices stay clearly visible next to each other.
  consentActions: {
    default: { variant: "neutral", mode: "stroke" },
    accept: { variant: "primary", mode: "filled" },
  },
});

// A compact banner: one card with no separate footer band, smaller type and
// small buttons. Tailwind's utilities layer sits above c15t's `components`
// layer, so these classes win without !important.
const smallButton = "h-8 rounded-xl px-3.5 text-[13px] font-medium";

export const consentSlots = {
  banner: {
    card: { className: "rounded-xl" },
    header: { className: "gap-1 px-4 pt-4 pb-5" },
    title: { className: "text-[15px] leading-snug font-medium" },
    footer: { className: "gap-2 border-t-0 bg-transparent px-4 pt-0 pb-4" },
    actionGroup: { className: "gap-2" },
  },
  description: {
    banner: { className: "mt-0 text-[13px] leading-relaxed" },
  },
  button: {
    primary: { className: smallButton },
    secondary: { className: smallButton },
  },
};
