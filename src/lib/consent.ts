// Cookie consent for optional tracking (currently the Meta Pixel).
//
// The choice is stored in a first-party cookie for a year. The pixel always
// starts with consent revoked (see components/facebook-pixel.tsx) and only
// sends events once the visitor accepts.

export const CONSENT_COOKIE = "bd_consent";
export const OPEN_CONSENT_EVENT = "bd:open-cookie-settings";

export type ConsentChoice = "granted" | "denied";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return (match?.[1] as ConsentChoice | undefined) ?? null;
}

export function writeConsent(choice: ConsentChoice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.fbq?.("consent", choice === "granted" ? "grant" : "revoke");
}

/** Re-open the cookie banner (e.g. from a "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
