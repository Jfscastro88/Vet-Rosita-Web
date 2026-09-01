"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Container, Stack, Title, Text, Card, Grid, Box } from "@mantine/core";
import { services, type Service } from "./services.data";
import ServiceDetailModal from "./ServiceDetailModal";
import classes from "./Services.module.css";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback((service: Service) => {
    setSelectedService(service);
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, service: Service) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOpen(service);
      }
    },
    [handleOpen],
  );

  return (
    <Box
      component="section"
      style={{ backgroundColor: "#F4F6F2" }}
      className="py-16 md:py-24"
      id="services"
      aria-labelledby="services-title"
    >
      <Container size="xl">
        <Stack gap="xl">
          <Title
            order={2}
            size="2.5rem"
            ta="center"
            style={{ color: "#2F3A2F" }}
            id="services-title"
          >
            I nostri servizi
          </Title>
          <Text size="lg" ta="center" style={{ color: "#2F3A2F" }} mb="md">
            Presso lo studio Veterinario dr.ssa Rosita Semenza troverete uno spazio accogliente per
            voi e i vostri animali.
          </Text>
          <Grid gutter="lg" align="stretch">
            {services.map((service) => (
              <Grid.Col key={service.title} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  className={classes.serviceCard}
                  style={{
                    backgroundColor: "#FFFFFF",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 380,
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(service)}
                  onKeyDown={(event) => handleCardKeyDown(event, service)}
                  aria-haspopup="dialog"
                  aria-expanded={opened && selectedService?.title === service.title}
                  aria-label={`Apri i dettagli del servizio ${service.title}`}
                >
                  <Card.Section
                    style={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                      margin: 12,
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt ?? service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Card.Section>
                  <Text fw={500} size="xl" mt="md" ta="center" style={{ color: "#2F3A2F" }}>
                    {service.title}
                  </Text>
                  <Text size="sm" mt="xs" ta="center" style={{ color: "#1a1f1a", opacity: 0.95 }}>
                    {service.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
      <ServiceDetailModal service={selectedService} opened={opened} onClose={handleClose} />
    </Box>
  );
}
