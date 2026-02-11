import "./globals.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "./providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT, OPENING_HOURS_JSON_LD } from "@/lib/site";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  display: "swap", // Optimize font loading
  preload: true,
});

const ogImageUrl = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Studio Veterinario - Animali esotici e non convenzionali`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "veterinario animali esotici",
    "veterinario Garbagna Novarese",
    "Dott.ssa Rosita Semenza",
    "studio veterinario Novara",
    "animali non convenzionali",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Studio Veterinario`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: ogImageUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via G. Matteotti, 37",
    addressLocality: "Garbagna Novarese",
    postalCode: "28070",
    addressRegion: "NO",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    address: CONTACT.address,
  },
  telephone: [CONTACT.mainPhone, CONTACT.secondaryPhone],
  openingHours: [...OPENING_HOURS_JSON_LD],
  sameAs: [CONTACT.instagram],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", address: CONTACT.address },
    geoRadius: "50000",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${roboto.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
