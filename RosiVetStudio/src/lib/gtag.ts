export const GOOGLE_TAG_ID = "GTM-PT2DBSPX";
export const GOOGLE_ADS_ID = "AW-18582297201";
export const CONTACT_CONVERSION_SEND_TO = "AW-18582297201/VE57CIDx-b0dEPG03ZxF";

type GtagArgs = IArguments;

declare global {
  interface Window {
    dataLayer?: GtagArgs[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactConversion() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  window.gtag("event", "conversion", {
    send_to: CONTACT_CONVERSION_SEND_TO,
  });
}
