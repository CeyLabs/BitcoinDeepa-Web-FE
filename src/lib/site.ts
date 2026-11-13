// Single source of truth for site-wide values used in metadata, JSON-LD,
// the sitemap and share links.

export const SITE_URL = "https://www.bitcoindeepa.com";
export const SITE_NAME = "Bitcoin Deepa";
export const SITE_DESCRIPTION =
  "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰";

export const SOCIAL_LINKS = {
  telegram: "https://t.me/BitcoinDeepa",
  x: "https://x.com/pearlofsatoshi",
  instagram: "https://instagram.com/bitcoindeepa",
  github: "https://github.com/CeyLabs",
} as const;

export const CONTACT_EMAIL = "hello@bitcoindeepa.com";

/** Absolute URL for a site path ("/terms" → "https://www.bitcoindeepa.com/terms"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
