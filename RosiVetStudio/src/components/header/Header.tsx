"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const brandLinkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#ffffff",
};

const navLinkStyle: CSSProperties = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "var(--mantine-font-size-lg)",
  lineHeight: "var(--mantine-line-height-lg)",
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      style={{
        backgroundColor: "#869684",
        borderBottom: "2px solid #2F3A2F",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
      }}
      className="shadow-md"
    >
      <div
        style={{
          maxWidth: "var(--mantine-container-size-xl, 82.5rem)",
          margin: "0 auto",
          padding: "var(--mantine-spacing-md) var(--mantine-spacing-md)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--mantine-spacing-md)",
            flexWrap: "wrap",
          }}
        >
          {isHome ? (
            <a
              href="#hero"
              className="hover:opacity-80 transition-opacity"
              style={brandLinkStyle}
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onKeyDown={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <BrandMark />
            </a>
          ) : (
            <Link href="/" className="hover:opacity-80 transition-opacity" style={brandLinkStyle}>
              <BrandMark />
            </Link>
          )}
          <nav aria-label="Navigazione principale">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--mantine-spacing-xl)",
                flexWrap: "wrap",
              }}
            >
              <NavItem href="#about" isHome={isHome}>
                Chi siamo
              </NavItem>
              <NavItem href="#services" isHome={isHome}>
                I nostri servizi
              </NavItem>
              <NavItem href="#contact" isHome={isHome}>
                Contatti
              </NavItem>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <span
        style={{
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "var(--mantine-font-size-lg)",
          lineHeight: "var(--mantine-line-height-lg)",
        }}
      >
        Studio Veterinario
      </span>
      <span
        style={{
          color: "#ffffff",
          fontSize: "var(--mantine-font-size-sm)",
          lineHeight: "var(--mantine-line-height-sm)",
        }}
      >
        Dott.ssa Rosita Semenza
      </span>
    </span>
  );
}

function NavItem({
  href,
  isHome,
  children,
}: {
  href: string;
  isHome: boolean;
  children: ReactNode;
}) {
  const id = href.replace("#", "");

  if (isHome) {
    return (
      <a
        href={href}
        className="hover:opacity-80 transition-opacity"
        style={navLinkStyle}
        onClick={(event) => {
          event.preventDefault();
          scrollToId(id);
        }}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            scrollToId(id);
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${href}`} className="hover:opacity-80 transition-opacity" style={navLinkStyle}>
      {children}
    </Link>
  );
}
