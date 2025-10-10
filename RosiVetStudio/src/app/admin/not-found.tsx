import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function AdminNotFoundPage() {
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
          <Title order={1} c="red" mb="md">
            404 - Sezione Admin non trovata
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            La sezione amministrativa che stai cercando non esiste. Verifica l'URL o torna alla
            dashboard admin.
          </Text>
          <Button component={Link} href="/admin" variant="filled" size="md" color="red">
            Torna alla Dashboard Admin
          </Button>
        </div>
      </Container>
    </div>
  );
}
