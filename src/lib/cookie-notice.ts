// Cookie notice: an informational banner (the Meta Pixel runs for every
// visitor; see components/facebook-pixel.tsx). Dismissing it is remembered in
// a first-party cookie for a year so it isn't shown on every visit.

export const NOTICE_COOKIE = "bd_cookie_notice";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function isNoticeDismissed(): boolean {
  if (typeof document === "undefined") return false;
  return new RegExp(`(?:^|; )${NOTICE_COOKIE}=dismissed`).test(document.cookie);
}

export function dismissNotice() {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${NOTICE_COOKIE}=dismissed; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
}
