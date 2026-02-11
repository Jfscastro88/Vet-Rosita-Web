"use client";

import React from "react";
import Image from "next/image";
import { Container, Stack, Title, Text, Paper, Grid, Box } from "@mantine/core";
import animal01 from "@/assets/animals/01.jpg";
import animal02 from "@/assets/animals/02.jpg";
import animal03 from "@/assets/animals/03.jpg";
import animal04 from "@/assets/animals/04.jpg";
import animal05 from "@/assets/animals/05.jpg";
import animal06 from "@/assets/animals/06.jpg";
import animal07 from "@/assets/animals/07.jpg";
import animal08 from "@/assets/animals/08.jpg";

export default function AnimalsWeCareFor() {
  const animals = [
    { name: "Ricci", image: animal01 },
    { name: "Criceti", image: animal08 },
    { name: "Cavie", image: animal07 },
    { name: "Furetti", image: animal06 },
    { name: "Uccelli esotici", image: animal05 },
    { name: "Rettili", image: animal02 },
    { name: "Anfibi", image: animal03 },
    { name: "Altri animali esotici", image: animal04 },
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
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
