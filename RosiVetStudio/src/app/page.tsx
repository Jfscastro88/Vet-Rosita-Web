"use client";

import React from "react";
import Image from "next/image";
import { Grid, Paper, Title, Text, Stack, Anchor } from "@mantine/core";
import rosiImage from "@/assets/Rosi-PNG.png";
import rosiImageWhite from "@/assets/Rosi-PNG-W.png";

export default function HomePage() {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center relative overflow-hidden py-4 sm:py-8">
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="w-full max-w-2xl h-auto">
          {/* Light mode logo */}
          <Image
            src={rosiImage}
            alt="RosiVetStudio Logo"
            width={1200}
            height={800}
            priority
            className="w-full h-auto max-h-[40vh] object-contain dark:hidden"
          />
          {/* Dark mode logo */}
          <Image
            src={rosiImageWhite}
            alt="RosiVetStudio Logo"
            width={1200}
            height={800}
            priority
            className="w-full h-auto max-h-[40vh] object-contain hidden dark:block"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-center font-extrabold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black dark:text-white">
          Studio Veterinario
        </h1>

        {/* Doctor Name */}
        <h2 className="text-center font-bold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black dark:text-white">
          Dott.ssa Rosita Semenza
        </h2>

        {/* Specialization */}
        <h3 className="text-center font-semibold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)] text-lg sm:text-xl md:text-2xl lg:text-3xl text-black dark:text-white">
          Veterinaria esperta in animali esotici e non convenzionali
        </h3>

        {/* Grid Layout with Leading Item */}
        <Grid gutter="md" className="w-full">
          {/* Leading Item - Schedule Section */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper
              shadow="xl"
              p="xl"
              radius="lg"
              className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-2 border-pink-200 dark:border-gray-600 h-full"
            >
              <Stack gap="lg">
                <Title order={2} ta="center" c="pink.8" className="dark:text-pink-900">
                  Orario
                </Title>
                <Stack gap="md">
                  <Paper
                    p="md"
                    radius="lg"
                    className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 border-l-4 border-pink-400 dark:border-pink-500"
                  >
                    <div className="flex justify-between items-center">
                      <Text fw={700} size="lg" c="pink.8" className="dark:text-pink-200">
                        Lunedì
                      </Text>
                      <Text fw={600} size="lg" c="gray.7" className="dark:text-gray-300">
                        dalle 16 alle 19
                      </Text>
                    </div>
                  </Paper>
                  <Paper
                    p="md"
                    radius="lg"
                    className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 border-l-4 border-pink-400 dark:border-pink-500"
                  >
                    <div className="flex justify-between items-center">
                      <Text fw={700} size="lg" c="pink.8" className="dark:text-pink-200">
                        Martedì
                      </Text>
                      <Text fw={600} size="lg" c="gray.7" className="dark:text-gray-300">
                        dalle 10 alle 12.30
                      </Text>
                    </div>
                  </Paper>
                  <Paper
                    p="md"
                    radius="lg"
                    className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 border-l-4 border-pink-400 dark:border-pink-500"
                  >
                    <div className="flex justify-between items-center">
                      <Text fw={700} size="lg" c="pink.8" className="dark:text-pink-200">
                        Mercoledì
                      </Text>
                      <Text fw={600} size="lg" c="gray.7" className="dark:text-gray-300">
                        dalle 16 alle 19
                      </Text>
                    </div>
                  </Paper>
                  <Paper
                    p="md"
                    radius="lg"
                    className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 border-l-4 border-pink-400 dark:border-pink-500"
                  >
                    <div className="flex justify-between items-center">
                      <Text fw={700} size="lg" c="pink.8" className="dark:text-pink-200">
                        Venerdì
                      </Text>
                      <Text fw={600} size="lg" c="gray.7" className="dark:text-gray-300">
                        dalle 09.30 alle 17
                      </Text>
                    </div>
                  </Paper>
                  <Paper
                    p="md"
                    radius="lg"
                    className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 border-l-4 border-pink-400 dark:border-pink-500"
                  >
                    <div className="flex justify-between items-center">
                      <Text fw={700} size="lg" c="pink.8" className="dark:text-pink-200">
                        Sabato
                      </Text>
                      <Text fw={600} size="lg" c="gray.7" className="dark:text-gray-300">
                        su appuntamento
                      </Text>
                    </div>
                  </Paper>
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Right Column - Appointment Notice and Contact Information */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="sm">
              {/* Appointment Notice */}
              <Paper
                shadow="xl"
                p="xl"
                radius="lg"
                className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-2 border-pink-200 dark:border-gray-600 h-full"
              >
                <Stack gap="md" align="center">
                  <div className="flex items-center gap-3">
                    <Title order={3} c="pink.9" className="dark:text-pink-100"></Title>
                  </div>
                  <Text fw={700} size="xl" c="pink.9" className="dark:text-pink-100" ta="center">
                    Prenotazioni: si riceve su appuntamento
                  </Text>
                </Stack>
              </Paper>

              {/* Contact Information */}
              <Paper
                shadow="xl"
                p="xl"
                radius="lg"
                className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-2 border-pink-200 dark:border-gray-600 h-full"
              >
                <Stack gap="sm">
                  <div>
                    <Title order={3} ta="center" c="pink.9" mb="sm" className="dark:text-pink-200">
                      Contatti
                    </Title>
                    <Text fw={600} size="lg" ta="center" c="pink.8" className="dark:text-pink-300">
                      Per visite, visite a domicilio e fuori orario contattare
                    </Text>
                  </div>
                  <Stack gap="sm">
                    <Anchor
                      href="tel:+393427586288"
                      component="a"
                      style={{ textDecoration: "none" }}
                    >
                      <Paper
                        p="sm"
                        radius="lg"
                        className="bg-white dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 border-l-4 border-pink-500 dark:border-pink-400 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Text size="xl">📞</Text>
                          <Text fw={700} size="xl" c="pink.8" className="dark:text-pink-200">
                            3427586288
                          </Text>
                        </div>
                      </Paper>
                    </Anchor>
                    <Anchor
                      href="tel:+393404129704"
                      component="a"
                      style={{ textDecoration: "none" }}
                    >
                      <Paper
                        p="sm"
                        radius="lg"
                        className="bg-white dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 border-l-4 border-pink-500 dark:border-pink-400 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Text size="xl">📞</Text>
                          <Text fw={700} size="xl" c="pink.8" className="dark:text-pink-200">
                            3404129704
                          </Text>
                        </div>
                      </Paper>
                    </Anchor>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Authorization */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs sm:text-sm text-pink-600 dark:text-pink-400 font-medium">
          aut. 01/2025
        </div>
      </div>
    </div>
  );
}
