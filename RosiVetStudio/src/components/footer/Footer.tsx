"use client";

import React from "react";
import Link from "next/link";
import { Container, Stack, Text, Group, Anchor } from "@mantine/core";

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
      <Container size="xl" py="lg">
        <Stack gap="md" align="center">
          <Group gap="xl" justify="center" wrap="wrap">
            <Anchor
              href="tel:+393427586288"
              style={{
                textDecoration: "none",
                color: "#2F3A2F",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <Text size="sm" fw={500} style={{ color: "#2F3A2F" }}>
                📞 3427586288
              </Text>
            </Anchor>
            <Anchor
              href="tel:+393404129704"
              style={{
                textDecoration: "none",
                color: "#2F3A2F",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <Text size="sm" fw={500} style={{ color: "#2F3A2F" }}>
                📞 3404129704
              </Text>
            </Anchor>
          </Group>
          <Text size="sm" style={{ color: "#2F3A2F" }} className="text-center">
            © {currentYear} Rosita VetStudio - Tutti i diritti riservati
          </Text>
          <Text size="xs" style={{ color: "#2F3A2F" }} className="text-center">
            Veterinaria esperta in animali esotici e non convenzionali
          </Text>
          <Anchor
            component={Link}
            href="/privacy"
            style={{
              textDecoration: "none",
              color: "#2F3A2F",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Text size="xs" style={{ color: "#2F3A2F" }}>
              Informativa sulla Privacy
            </Text>
          </Anchor>
          <Anchor
            component={Link}
            href="https://www.linkedin.com/in/jfscastro88"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#2F3A2F",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Text size="xs" style={{ color: "#2F3A2F" }}>
              Jfscastro
            </Text>
          </Anchor>
        </Stack>
      </Container>
    </footer>
  );
}
