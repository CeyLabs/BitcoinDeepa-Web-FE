import Script from "next/script";
import { FB_PIXEL_ID } from "@/src/lib/facebook-pixel";
import { CONSENT_COOKIE } from "@/src/lib/consent";

// Meta Pixel, gated on cookie consent: consent is set to "revoke" before init
// unless the visitor has already accepted, so nothing is sent until they do.
// (No <noscript> pixel: it would fire without any way to honour consent.)
export default function FacebookPixel() {
  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', /(?:^|; )${CONSENT_COOKIE}=granted/.test(document.cookie) ? 'grant' : 'revoke');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
