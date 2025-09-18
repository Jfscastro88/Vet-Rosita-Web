import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google"; 
import Providers from "./providers"; 
import { NavbarClient } from "./components/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
});

export const metadata: Metadata = {
  title: "My App",
  description: "Something great is coming soon!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Providers>
          <NavbarClient />  {/* nenhum handler passado do server! */}
          <div className="h-15 sm:h-20"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}