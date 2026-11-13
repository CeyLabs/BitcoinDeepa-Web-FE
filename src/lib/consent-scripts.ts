import type { Script } from "c15t";
import { metaPixel } from "@c15t/integrations/meta-pixel";
import { FB_PIXEL_ID, setMarketingAllowed } from "./facebook-pixel";

// Third-party scripts, each loaded only once its consent category is allowed.
export const consentScripts: Script[] = [
  // Marketing: loads fbevents.js and sends the PageView after consent.
  metaPixel({ pixelId: FB_PIXEL_ID }),
  // No script of its own: keeps fbEvent() (Lead, Purchase, …) in step with the
  // marketing permission, so custom events stop after a visitor withdraws it
  // even though window.fbq still exists until the reload.
  {
    id: "meta-pixel-events-guard",
    category: "marketing",
    callbackOnly: true,
    alwaysLoad: true,
    onBeforeLoad: ({ hasConsent }) => setMarketingAllowed(hasConsent),
    onConsentChange: ({ hasConsent }) => setMarketingAllowed(hasConsent),
  },
];
