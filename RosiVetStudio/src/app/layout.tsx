import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "./providers";
import { NavbarClient } from "./components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Rosita VetStudio",
  description: "Something great is coming soon!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${roboto.className}`}>
        <Providers>
          <NavbarClient />
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
