import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  display: "swap", // Optimize font loading
  preload: true,
  variable: "--font-roboto", // CSS variable for consistent class names
});

export const metadata: Metadata = {
  title: "Rosita VetStudio",
  description: "Veterinaria esperta in animali esotici e non convenzionali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${roboto.className}`} suppressHydrationWarning>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
