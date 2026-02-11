"use client";

import React from "react";
import { Box, Container, Stack, Text, Button, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      className="w-full min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F4F6F2", paddingTop: "100px" }}
    >
      <Container size="md">
        <Stack gap="xl" align="center" className="text-center">
          <Title
            order={1}
            size="6rem"
            fw={700}
            style={{ color: "#2F3A2F", lineHeight: 1 }}
          >
            404
          </Title>
          <Title
            order={2}
            size="2rem"
            fw={700}
            style={{ color: "#2F3A2F" }}
          >
            Pagina non trovata
          </Title>
          <Text size="lg" style={{ color: "#2F3A2F", maxWidth: "500px" }}>
            Sembra che la pagina che stai cercando non esista o sia stata
            spostata. Torna alla homepage per continuare la navigazione.
          </Text>
          <Button
            component={Link}
            href="/"
            size="lg"
            style={{
              backgroundColor: "#869684",
              color: "#ffffff",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Torna alla Homepage
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
