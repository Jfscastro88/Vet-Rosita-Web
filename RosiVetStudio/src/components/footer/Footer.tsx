import type { CSSProperties } from "react";
import Link from "next/link";
import { CONTACT, SITE_NAME } from "@/lib/site";

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#2F3A2F",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#869684",
        borderTop: "2px solid #2F3A2F",
      }}
      className="shadow-md mt-auto"
    >
      <div
        style={{
          maxWidth: "var(--mantine-container-size-xl, 82.5rem)",
          margin: "0 auto",
          padding: "var(--mantine-spacing-lg) var(--mantine-spacing-md)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--mantine-spacing-md)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "var(--mantine-spacing-xl)",
            }}
          >
            <a
              href={`tel:${CONTACT.mainPhone}`}
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
            >
              <span
                style={{
                  color: "#2F3A2F",
                  fontWeight: 500,
                  fontSize: "var(--mantine-font-size-sm)",
                }}
              >
                📞 3427586288
              </span>
            </a>
            <a
              href={`tel:${CONTACT.secondaryPhone}`}
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
            >
              <span
                style={{
                  color: "#2F3A2F",
                  fontWeight: 500,
                  fontSize: "var(--mantine-font-size-sm)",
                }}
              >
                📞 3404129704
              </span>
            </a>
          </div>
          <p
            style={{
              color: "#2F3A2F",
              fontSize: "var(--mantine-font-size-sm)",
              textAlign: "center",
              margin: 0,
            }}
          >
            © {currentYear} {SITE_NAME} - Tutti i diritti riservati
          </p>
          <p
            style={{
              color: "#2F3A2F",
              fontSize: "var(--mantine-font-size-xs)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Veterinaria esperta in animali esotici e non convenzionali
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "var(--mantine-spacing-xl)",
            }}
          >
            <Link
              href="/privacy"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
            >
              <span style={{ color: "#2F3A2F", fontSize: "var(--mantine-font-size-xs)" }}>
                Informativa sulla Privacy
              </span>
            </Link>
            <a
              href="https://www.linkedin.com/in/jfscastro88"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
            >
              <span style={{ color: "#2F3A2F", fontSize: "var(--mantine-font-size-xs)" }}>
                Jfscastro
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
