/**
 * Site-wide config for SEO, canonical URL, and structured data.
 */
export const SITE_URL = "https://www.studioveterinarioanimalidomesticiedovecurarli.it";

export const SITE_NAME = "Studio Veterinario Animali Domestici e Dove Curarli";
export const SITE_NAME_SHORT = "Studio Veterinario Animali Domestici";

export const SITE_DESCRIPTION =
  "Studio Veterinario Animali Domestici e Dove Curarli - Dott.ssa Rosita Semenza. Studio veterinario a Garbagna Novarese (NO), esperto in animali esotici e non convenzionali.";

export const CONTACT = {
  mainPhone: "+393427586288",
  secondaryPhone: "+393404129704",
  address: "Via G. Matteotti, 37, 28070 Garbagna Novarese NO, Italia",
  streetAddress: "Via G. Matteotti, 37",
  addressLocality: "Garbagna Novarese",
  postalCode: "28070",
  addressRegion: "NO",
  addressCountry: "IT",
  latitude: 45.3874319,
  longitude: 8.6598375,
  googleMapsPlaceId: "0x478657ad1a62f493:0x228a895c15328a91",
  instagram: "https://www.instagram.com/ros_the_exotic_vet",
  instagramBaldog: "https://www.instagram.com/baldog_dogtrainer",
} as const;

export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${CONTACT.latitude},${CONTACT.longitude}`;

export const GOOGLE_MAPS_PLACE_URL =
  `https://www.google.com/maps/place/Via+G.+Matteotti,+37,+28070+Garbagna+Novarese+NO/@${CONTACT.latitude},${CONTACT.longitude},18z/data=!4m6!3m5!1s${CONTACT.googleMapsPlaceId}!8m2!3d${CONTACT.latitude}!4d${CONTACT.longitude}!16s%2Fg%2F11fls7hj8m`;

export const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${CONTACT.latitude},${CONTACT.longitude}&z=18&output=embed`;

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
