import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function WebsiteNotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Container size="sm">
        <div style={{ textAlign: "center" }}>
          <Title order={1} c="blue" mb="md">
            404 - Pagina del sito non trovata
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            La pagina del sito che stai cercando non esiste. Torna alla home o esplora i nostri
            servizi.
          </Text>
          <Button component={Link} href="/" variant="filled" size="md" color="blue">
            Torna alla Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
