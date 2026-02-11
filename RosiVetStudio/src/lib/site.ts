/**
 * Site-wide config for SEO, canonical URL, and structured data.
 */
export const SITE_URL = "https://www.rosivetstudio.it";

export const SITE_NAME = "Rosita VetStudio";
export const SITE_DESCRIPTION =
  "Veterinaria esperta in animali esotici e non convenzionali. Dott.ssa Rosita Semenza - Studio Veterinario a Garbagna Novarese (NO).";

export const CONTACT = {
  mainPhone: "+393427586288",
  secondaryPhone: "+393404129704",
  address: "Via G. Matteotti, 37, 28070 Garbagna Novarese NO, Italia",
  instagram: "https://www.instagram.com/ros_the_exotic_vet",
} as const;

/** Opening hours for JSON-LD (Google format: Day HH:MM-HH:MM) */
export const OPENING_HOURS_JSON_LD = [
  "Mo 16:00-19:00",
  "Tu 10:00-12:30",
  "We 16:00-19:00",
  "Fr 09:30-17:00",
  "Sa By appointment",
] as const;
