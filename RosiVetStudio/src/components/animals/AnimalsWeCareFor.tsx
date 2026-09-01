"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Container, Stack, Title, Text, Paper, Grid, Box, Button } from "@mantine/core";
import { animals, type Animal } from "./animals.data";
import AnimalDetailModal from "./AnimalDetailModal";
import classes from "./AnimalsWeCareFor.module.css";

export default function AnimalsWeCareFor() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback((animal: Animal) => {
    setSelectedAnimal(animal);
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, animal: Animal) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOpen(animal);
      }
    },
    [handleOpen],
  );

  return (
    <Box
      component="section"
      style={{ backgroundColor: "#869684" }}
      className="py-16 md:py-24"
      id="animals"
      aria-labelledby="animals-title"
    >
      <Container size="xl">
        <Stack gap="xl">
          <Title
            order={2}
            size="2.5rem"
            ta="center"
            style={{ color: "#2F3A2F" }}
            id="animals-title"
          >
            Animali di cui ci prendiamo cura
          </Title>
          <Grid gutter="md">
            {animals.map((animal) => (
              <Grid.Col key={animal.name} span={{ base: 12, sm: 6, md: 3 }}>
                <Paper
                  shadow="sm"
                  p="lg"
                  radius="md"
                  className={classes.animalCard}
                  style={{
                    backgroundColor: "#F4F6F2",
                    border: "2px solid #869684",
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(animal)}
                  onKeyDown={(event) => handleCardKeyDown(event, animal)}
                  aria-haspopup="dialog"
                  aria-expanded={opened && selectedAnimal?.name === animal.name}
                  aria-label={`Apri i dettagli su ${animal.name}`}
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
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
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
                  order={3}
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
      <AnimalDetailModal animal={selectedAnimal} opened={opened} onClose={handleClose} />
    </Box>
  );
}
