export const FB_PIXEL_ID = '1818035272112095';

// The pixel itself is loaded by the consent manager (lib/consent-scripts.ts)
// once marketing is allowed. This flag mirrors that permission, because
// window.fbq stays defined after a visitor withdraws it.
let marketingAllowed = false;

export function setMarketingAllowed(allowed: boolean) {
  marketingAllowed = allowed;
}

export const fbEvent = (name: string, options: Record<string, any> = {}) => {
  if (!marketingAllowed) return;
  // window.fbq is typed by @c15t/integrations; our event names are plain strings.
  const fbq = typeof window !== 'undefined' ? (window.fbq as ((...args: unknown[]) => void) | undefined) : undefined;
  if (typeof fbq === 'function') fbq('track', name, options);
};

// Meta Pixel only accepts values in its supported currencies, and LKR is not
// one of them ("Parameter 'currency' is invalid"). Purchase values are
// converted to USD at the Ceylon Cash mid-rate. (Custom params such as an LKR
// amount are stripped by this pixel's setup, so only value/currency are sent.)
let lkrPerUsd: number | null = null;
let ratePromise: Promise<number | null> | null = null;

/** Fetch (once) and cache the LKR per USD mid-rate. Call ahead of time so the
 *  rate is ready synchronously when the event fires. */
export function preloadUsdRate(): Promise<number | null> {
  if (!ratePromise) {
    ratePromise = fetch('/api/bitcoin-price/usd')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { buying_rate?: number | null; selling_rate?: number | null } | null) => {
        const buy = Number(d?.buying_rate);
        const sell = Number(d?.selling_rate);
        lkrPerUsd = buy > 0 && sell > 0 ? (buy + sell) / 2 : null;
        if (lkrPerUsd === null) ratePromise = null; // allow a retry later
        return lkrPerUsd;
      })
      .catch(() => {
        ratePromise = null;
        return null;
      });
  }
  return ratePromise;
}

/** Pixel value params for an LKR amount: a USD value when the rate is known,
 *  otherwise none (the event is still sent, without a guessed value). */
export function lkrValueParams(lkr: number): Record<string, number | string> {
  if (!lkrPerUsd) return {};
  return { value: Math.round((lkr / lkrPerUsd) * 100) / 100, currency: 'USD' };
}
