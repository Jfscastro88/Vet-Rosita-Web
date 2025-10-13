// app/layout.tsx (RootLayout)
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; // keep it global (not per-component)
import "./globals.css"; // your styles last

import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript, AppShell } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Rosita VetStudio",
  description: "Veterinaria esperta in animali esotici e non convenzionali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={roboto.className} suppressHydrationWarning>
        <MantineProvider defaultColorScheme="light">
          <Notifications />
          <AppShell header={{ height: 60 }} padding={0}>
            <Header />
            <div
              style={{
                paddingTop: "60px",
                minHeight: "calc(100vh - 60px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </div>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
