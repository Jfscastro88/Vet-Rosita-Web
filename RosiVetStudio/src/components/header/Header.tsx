"use client";

import React from "react";
import { Container, Group, Stack, Text } from "@mantine/core";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <Container size="xl" py="md">
        <Group justify="space-between" align="center" gap="md">
          <Stack
            gap={0}
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
            className="hover:opacity-80 transition-opacity"
          >
            <Text fw={700} size="lg" style={{ color: "#ffffff" }}>
              Studio Veterinario
            </Text>
            <Text size="sm" style={{ color: "#ffffff" }}>
              Dott.ssa Rosita Semenza
            </Text>
          </Stack>
          <Group gap="xl">
            <Text
              fw={700}
              size="lg"
              style={{ color: "#ffffff", cursor: "pointer" }}
              onClick={() => scrollToSection("about")}
              className="hover:opacity-80 transition-opacity"
            >
              Chi siamo
            </Text>
            <Text
              fw={700}
              size="lg"
              style={{ color: "#ffffff", cursor: "pointer" }}
              onClick={() => scrollToSection("services")}
              className="hover:opacity-80 transition-opacity"
            >
              I nostri servizi
            </Text>
            <Text
              fw={700}
              size="lg"
              style={{ color: "#ffffff", cursor: "pointer" }}
              onClick={() => scrollToSection("contact")}
              className="hover:opacity-80 transition-opacity"
            >
              Contatti
            </Text>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
