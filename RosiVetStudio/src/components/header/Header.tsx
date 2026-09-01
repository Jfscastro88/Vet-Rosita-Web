"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconX } from "@tabler/icons-react";
import { useReducedMotion } from "@mantine/hooks";
import classes from "./Header.module.css";

const NAV_ITEMS = [
  { href: "#about", label: "Chi siamo" },
  { href: "#services", label: "I nostri servizi" },
  { href: "#contact", label: "Contatti" },
] as const;

const brandLinkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#ffffff",
  minWidth: 0,
  flex: 1,
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
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const titleId = useId();

  const close = useCallback(() => setOpened(false), []);
  const toggle = useCallback(() => setOpened((value) => !value), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (media.matches) {
        close();
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [close]);

  useEffect(() => {
    if (!opened) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const burgerButton = burgerRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      burgerButton?.focus();
    };
  }, [opened, close]);

  const handleNavigate = useCallback(
    (href: string) => {
      const id = href.replace("#", "");
      close();

      if (!isHome) {
        return;
      }

      window.setTimeout(
        () => {
          scrollToId(id);
        },
        reduceMotion ? 0 : 220,
      );
    },
    [close, isHome, reduceMotion],
  );

  const overlay =
    opened && mounted
      ? createPortal(
          <div
            className={classes.overlay}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2500,
              width: "100vw",
              height: "100dvh",
              backgroundColor: "#869684",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={classes.overlayHeader}>
              <p className={classes.overlayTitle} id={titleId}>
                Menu
              </p>
              <button
                ref={closeRef}
                type="button"
                className={classes.closeButton}
                onClick={close}
                aria-label="Chiudi il menu"
              >
                <IconX size={24} stroke={2} aria-hidden="true" />
              </button>
            </div>
            <nav className={classes.overlayNav} aria-label="Menu di navigazione">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isHome={isHome}
                  className={classes.menuLink}
                  onNavigate={() => handleNavigate(item.href)}
                >
                  {item.label}
                </NavItem>
              ))}
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <header
      className="shadow-md"
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
    >
      <div
        style={{
          maxWidth: "var(--mantine-container-size-xl, 82.5rem)",
          margin: "0 auto",
          padding: "var(--mantine-spacing-md)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--mantine-spacing-md)",
          }}
        >
          {isHome ? (
            <a
              href="#hero"
              className="hover:opacity-80 transition-opacity"
              style={brandLinkStyle}
              onClick={(event) => {
                event.preventDefault();
                close();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <BrandMark />
            </a>
          ) : (
            <Link href="/" className="hover:opacity-80 transition-opacity" style={brandLinkStyle}>
              <BrandMark />
            </Link>
          )}

          <nav className={classes.desktopNav} aria-label="Navigazione principale">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--mantine-spacing-xl)",
                flexWrap: "wrap",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.href} href={item.href} isHome={isHome} style={navLinkStyle}>
                  {item.label}
                </NavItem>
              ))}
            </div>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            className={classes.burger}
            onClick={toggle}
            aria-label={opened ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={opened}
            aria-controls={menuId}
          >
            <span className={classes.burgerLines} aria-hidden="true" />
          </button>
        </div>
      </div>
      {overlay}
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
        Studio veterinario animali domestici e dove curarli
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
  className,
  style,
  onNavigate,
}: {
  href: string;
  isHome: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onNavigate?: () => void;
}) {
  const id = href.replace("#", "");

  if (isHome) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onClick={(event) => {
          event.preventDefault();
          if (onNavigate) {
            onNavigate();
            return;
          }
          scrollToId(id);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${href}`} className={className} style={style} onClick={onNavigate}>
      {children}
    </Link>
  );
}
