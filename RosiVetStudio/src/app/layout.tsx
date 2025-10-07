import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Rosita VetStudio",
  description: "Veterinaria esperta in animali esotici e non convenzionali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}
