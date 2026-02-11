"use client";

import React from "react";
import { Container, Stack, Title, Text, Paper, Grid, Group, Anchor, Box } from "@mantine/core";
import { IconPhone, IconMapPin, IconClock, IconBrandInstagram } from "@tabler/icons-react";

export default function LocationContact() {
  const mainPhone = "+393427586288";
  const secondaryPhone = "+393404129704";
  const address = "Via G. Matteotti, 37, 28070 Garbagna Novarese NO, Italia";
  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Via+G.+Matteotti,+37,+28070+Garbagna+Novarese+NO,+Italia";
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const instagramUrl = "https://www.instagram.com/ros_the_exotic_vet";
  const baldogTrainingUrl = "https://www.instagram.com/baldog_dogtrainer";
  const schedule = [
    { day: "Lunedì", hours: "dalle 16 alle 19" },
    { day: "Martedì", hours: "dalle 10 alle 12.30" },
    { day: "Mercoledì", hours: "dalle 16 alle 19" },
    { day: "Venerdì", hours: "dalle 09.30 alle 17" },
    { day: "Sabato", hours: "su appuntamento" },
    { day: "Domenica", hours: "Chiuso (solo emergenze)" },
  ];

  const sectionBg = "#7d8b7a";
  const cardBg = "#f8f9f6";
  const textPrimary = "#2c352c";
  const textMuted = "#5a6658";
  const accent = "#6b7c69";

  return (
    <Box style={{ backgroundColor: sectionBg }} className="py-20 md:py-28" id="contact">
      <Container size="xl">
        <Stack gap="xl">
          <Stack gap="xs" align="center">
            <Title
              order={2}
              size="2rem"
              ta="center"
              style={{ color: "#2f3a2f", letterSpacing: "-0.02em" }}
            >
              Contatti e Orari
            </Title>
          </Stack>

          {/* Contact cards */}
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  height: "100%",
                }}
              >
                <Stack gap="md" align="center">
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(107,124,105,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconMapPin size={24} style={{ color: accent }} />
                  </Box>
                  <Text fw={600} size="sm" style={{ color: textMuted }}>
                    Indirizzo
                  </Text>
                  <Text size="sm" ta="center" style={{ color: textPrimary }} lh={1.5}>
                    {address}
                  </Text>
                  <Anchor
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="xs"
                    fw={600}
                    style={{ color: accent }}
                    className="hover:underline"
                  >
                    Indicazioni
                  </Anchor>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  height: "100%",
                }}
              >
                <Stack gap="md" align="center">
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(107,124,105,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconPhone size={24} style={{ color: accent }} />
                  </Box>
                  <Text fw={600} size="sm" style={{ color: textMuted }}>
                    Telefono
                  </Text>
                  <Stack gap={4}>
                    <Anchor
                      href={`tel:${mainPhone}`}
                      component="a"
                      style={{ textDecoration: "none" }}
                    >
                      <Text
                        size="sm"
                        fw={500}
                        style={{ color: textPrimary }}
                        className="hover:opacity-80"
                      >
                        {mainPhone.replace("+39", "")}
                      </Text>
                    </Anchor>
                    <Anchor
                      href={`tel:${secondaryPhone}`}
                      component="a"
                      style={{ textDecoration: "none" }}
                    >
                      <Text
                        size="sm"
                        fw={500}
                        style={{ color: textPrimary }}
                        className="hover:opacity-80"
                      >
                        {secondaryPhone.replace("+39", "")}
                      </Text>
                    </Anchor>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  height: "100%",
                }}
              >
                <Stack gap="md" align="center">
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(107,124,105,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconBrandInstagram size={24} style={{ color: accent }} />
                  </Box>
                  <Text fw={600} size="sm" style={{ color: textMuted }}>
                    Social
                  </Text>
                  <Stack gap={4} align="center">
                    <Anchor
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      fw={500}
                      style={{ color: textPrimary }}
                      className="hover:underline"
                    >
                      Rosi VetStudio
                    </Anchor>
                    <Anchor
                      href={baldogTrainingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      fw={500}
                      style={{ color: textPrimary }}
                      className="hover:underline"
                    >
                      Baldog DogTrainer
                    </Anchor>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>

          {/* Orari + Map */}
          <Grid gutter="md" style={{ alignItems: "stretch" }}>
            <Grid.Col
              span={{ base: 12, md: 6 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Paper
                p="xl"
                radius="xl"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Stack gap="lg">
                  <Group gap="sm">
                    <Box
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "rgba(107,124,105,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconClock size={22} style={{ color: accent }} />
                    </Box>
                    <Title
                      order={3}
                      style={{ color: textPrimary, fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      Orari
                    </Title>
                  </Group>

                  <Stack gap={0}>
                    {schedule.map((item, index) => (
                      <Box
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom:
                            index < schedule.length - 1 ? "1px solid rgba(44,53,44,0.08)" : "none",
                        }}
                      >
                        <Text size="sm" fw={500} style={{ color: textPrimary }}>
                          {item.day}
                        </Text>
                        <Text size="sm" style={{ color: textMuted }}>
                          {item.hours}
                        </Text>
                      </Box>
                    ))}
                  </Stack>

                  <Box
                    p="md"
                    style={{
                      backgroundColor: "rgba(107,124,105,0.08)",
                      borderRadius: "12px",
                    }}
                  >
                    <Text size="xs" fw={600} style={{ color: textMuted }} tt="uppercase" mb={4}>
                      Nota
                    </Text>
                    <Text size="sm" style={{ color: textPrimary }} lh={1.5}>
                      Prenotazioni consigliate. Emergenze: chiamare prima di venire.
                    </Text>
                  </Box>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, md: 6 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Paper
                p="xl"
                radius="xl"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack gap="md" style={{ flex: 1, minHeight: 0 }}>
                  <Group gap="sm">
                    <Box
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "rgba(107,124,105,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconMapPin size={22} style={{ color: accent }} />
                    </Box>
                    <Title
                      order={3}
                      style={{ color: textPrimary, fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      La Nostra Posizione
                    </Title>
                  </Group>

                  <Box
                    style={{
                      flex: 1,
                      minHeight: 400,
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "rgba(0,0,0,0.04)",
                    }}
                  >
                    <iframe
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "400px", display: "block" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mappa dello Studio Veterinario"
                    />
                  </Box>

                  <Anchor
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    fw={600}
                    style={{ color: accent }}
                    className="hover:underline"
                  >
                    Apri in Google Maps
                  </Anchor>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
