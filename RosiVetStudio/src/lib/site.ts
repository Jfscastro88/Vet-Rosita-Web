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
  instagram: "https://www.instagram.com/ros_the_exotic_vet",
  instagramBaldog: "https://www.instagram.com/baldog_dogtrainer",
} as const;

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
