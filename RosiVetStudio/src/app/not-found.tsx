import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFoundPage() {
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
            404 - Pagina non trovata
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            La pagina che stai cercando non esiste. Potresti aver digitato male l'indirizzo, o la
            pagina è stata spostata su un altro URL. Se pensi che questo sia un errore, contatta il
            supporto.
          </Text>
          <Button component={Link} href="/" variant="filled" size="md" color="blue">
            Torna alla Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
