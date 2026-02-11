import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy",
  description:
    "Informativa sulla privacy di Rosita VetStudio: come trattiamo i dati personali, cookie e diritti dell'interessato (GDPR).",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: `Informativa sulla Privacy | ${SITE_NAME}`,
    description:
      "Informativa sulla privacy di Rosita VetStudio: come trattiamo i dati personali, cookie e diritti dell'interessato (GDPR).",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
