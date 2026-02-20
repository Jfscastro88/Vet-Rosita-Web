"use client";

import React from "react";
import { Container, Stack, Title, Text, Card, Image, Grid, Box } from "@mantine/core";
import consulenzaImg from "@/assets/services/consulenza.jpg";
import esamiImg from "@/assets/services/poop.jpg";
import lezioniImg from "@/assets/services/lezioni.jpg";
import terapieImg from "@/assets/services/terapie.jpg";
import testrapidoImg from "@/assets/services/testrapido.jpg";
import vaccinazioniImg from "@/assets/services/vaccinazioni.jpg";
import visitecanegatoImg from "@/assets/services/visitecanegato.jpg";
import visiteesoticiImg from "@/assets/services/visiteesotici.jpg";
import visitespecialImg from "@/assets/services/visitespecial.jpg";
import vistebaseImg from "@/assets/services/visitebase.jpg";

const services = [
  {
    image: vistebaseImg,
    title: "Visite base cane e gatto",
    description: "Controlli di routine e visite per cani e gatti.",
  },
  {
    image: visitespecialImg,
    title: "Visite specialistiche",
    description: "Animali esotici e non convenzionali.",
  },
  {
    image: vaccinazioniImg,
    title: "Vaccinazioni",
    description: "Programmi vaccinali per cani, gatti e conigli.",
  },
  {
    image: esamiImg,
    title: "Esami coprologici",
    description: "Analisi e test di laboratorio.",
  },
  {
    image: testrapidoImg,
    title: "Test rapidi",
    description: "Test rapidi per cani e gatti.",
  },
  {
    image: consulenzaImg,
    title: "Consulenze",
    description: "Pre-adozione e consulenze online.",
  },
  {
    image: lezioniImg,
    title: "Educazione cinofila",
    description: "Lezioni per cuccioli e cani di ogni età.",
  },
  {
    image: visiteesoticiImg,
    title: "Visite animali esotici",
    description: "Visite a domicilio per esotici e da cortile.",
  },
  {
    image: visitecanegatoImg,
    title: "Visite a domicilio cane e gatto",
    description: "Visite a domicilio per cani e gatti.",
  },
  {
    image: terapieImg,
    title: "Terapie a domicilio",
    description: "Terapie a domicilio per cane, gatto ed esotici.",
  },
];

export default function Services() {
  return (
    <Box style={{ backgroundColor: "#F4F6F2" }} className="py-16 md:py-24" id="services">
      <Container size="xl">
        <Stack gap="xl">
          <Title order={2} size="2.5rem" ta="center" style={{ color: "#2F3A2F" }}>
            I nostri servizi
          </Title>
          <Text size="lg" ta="center" style={{ color: "#2F3A2F" }} mb="md">
            Presso lo studio Veterinario dr.ssa Rosita Semenza troverete uno spazio accogliente per
            voi e i vostri animali.
          </Text>
          <Grid gutter="lg" align="stretch">
            {services.map((service, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "#FFFFFF",
                    // border: "2px solid #2F3A2F",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 380,
                  }}
                  className="hover:shadow-xl transition-all"
                >
                  <Card.Section
                    style={{
                      height: 200,
                      overflow: "hidden",
                      margin: 12,
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    <Image
                      src={service.image.src}
                      h={200}
                      w="100%"
                      fit="cover"
                      alt={service.title}
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
    </Box>
  );
}
