import { defineConsentConfig, hosted } from "c15t/next";
import { consentScripts } from "./src/lib/consent-scripts";

// Consent is resolved in the browser through the backend's /init (hosted
// mode), so every page stays static and the build never calls the backend.
// The backend sits behind Cloudflare and reads the visitor's country itself.
// This file is bundled into the browser: no secrets here.
export default defineConsentConfig({
  backendURL: process.env.NEXT_PUBLIC_C15T_BACKEND_URL ?? "https://consent.ceylabs.io",
  mode: hosted(),
  scripts: consentScripts,
  // Declaring the vendor lists "Meta Pixel" by name under Marketing in the
  // preferences dialog, with its own switch.
  vendors: [
    {
      id: "meta-pixel",
      name: "Meta Pixel",
      category: "marketing",
      legalName: "Meta Platforms, Inc.",
      description: "Measures which ads bring visitors to Bitcoin Deepa and counts sign-ups and book orders.",
      privacyPolicyUrl: "https://www.facebook.com/privacy/policy/",
    },
  ],
  options: {
    colorScheme: "dark",
    legalLinks: {
      privacyPolicy: { href: "/privacy-policy#cookies-and-tracking-technologies" },
      termsOfService: { href: "/terms" },
    },
  },
});
