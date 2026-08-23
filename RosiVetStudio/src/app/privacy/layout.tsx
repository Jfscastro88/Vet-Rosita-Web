import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, serializeJsonLd } from "@/lib/site";

const privacyDescription =
  "Informativa sulla privacy di Studio Veterinario Animali Domestici e Dove Curarli: come trattiamo i dati personali, cookie e diritti dell'interessato (GDPR).";
const privacyUrl = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Informativa sulla Privacy",
  description: privacyDescription,
  alternates: {
    canonical: privacyUrl,
  },
  openGraph: {
    title: `Informativa sulla Privacy | ${SITE_NAME}`,
    description: privacyDescription,
    url: privacyUrl,
    type: "website",
    locale: "it_IT",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: `Informativa sulla Privacy | ${SITE_NAME}`,
    description: privacyDescription,
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Informativa sulla Privacy",
      item: privacyUrl,
    },
  ],
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
