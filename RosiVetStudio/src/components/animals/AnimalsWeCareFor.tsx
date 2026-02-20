"use client";

import React from "react";
import Image from "next/image";
import { Container, Stack, Title, Text, Paper, Grid, Box, Button } from "@mantine/core";
import animal01 from "@/assets/animals/conigli.jpg";
import animal02 from "@/assets/animals/criceti.jpg";
import animal03 from "@/assets/animals/cavie.jpg";
import animal04 from "@/assets/animals/furetti.jpg";
import animal05 from "@/assets/animals/canario.jpg";
import animal06 from "@/assets/animals/rettilli.jpg";
import animal07 from "@/assets/animals/selvatici.jpg";
import animal08 from "@/assets/animals/cincilla.jpg";
import animal09 from "@/assets/animals/degu.jpg";
import animal10 from "@/assets/animals/rattodomestico.jpg";
import animal11 from "@/assets/animals/topolino.jpg";
import animal12 from "@/assets/animals/galina.jpg";

export default function AnimalsWeCareFor() {
  const animals = [
    { name: "Conigli", image: animal01 },
    { name: "Criceti", image: animal02 },
    { name: "Cavie", image: animal03 },
    { name: "Selvatici", image: animal07 },
    { name: "Furetti", image: animal04 },
    { name: "Pappagalli e Uccelli", image: animal05 },
    { name: "Topolino", image: animal11 },
    { name: "Rettili", image: animal06 },
    { name: "Cincillà", image: animal08 },
    { name: "Degu", image: animal09 },
    { name: "Ratto Domestico", image: animal10 },
    { name: "Animale da Cortile", image: animal12 },
  ];

  return (
    <Box style={{ backgroundColor: "#869684" }} className="py-16 md:py-24" id="animals">
      <Container size="xl">
        <Stack gap="xl">
          <Title order={2} size="2.5rem" ta="center" style={{ color: "#2F3A2F" }}>
            Animali di cui ci prendiamo cura
          </Title>
          <Grid gutter="md">
            {animals.map((animal, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <Paper
                  shadow="sm"
                  p="lg"
                  radius="md"
                  style={{
                    backgroundColor: "#F4F6F2",
                    border: "2px solid #869684",
                  }}
                  className="hover:shadow-lg transition-all"
                >
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={animal.image}
                      alt={animal.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Box>
                  <Text fw={600} size="lg" ta="center" style={{ color: "#2F3A2F" }}>
                    {animal.name}
                  </Text>
                </Paper>
              </Grid.Col>
            ))}
            <Grid.Col span={12}>
              <Box ta="center">
                <Title
                  order={4}
                  size="1.5rem"
                  ta="center"
                  style={{ color: "#2F3A2F" }}
                  mt="xl"
                  mb="xl"
                >
                  Il tuo animale è in buone mani
                </Title>
                <Button
                  component="a"
                  href="#contact"
                  size="md"
                  variant="filled"
                  style={{
                    backgroundColor: "#2F3A2F",
                    color: "#F4F6F2",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Prenota ora
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
