"use client";

import React from "react";
import { Box, Text } from "@mantine/core";
import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/about/AboutUs";
import AnimalsWeCareFor from "@/components/animals/AnimalsWeCareFor";
import Services from "@/components/services/Services";
import LocationContact from "@/components/contacts/LocationContact";

export default function HomePage() {
  return (
    <Box className="w-full" style={{ backgroundColor: "#F4F6F2" }}>
      <Hero />
      <AboutUs />
      <AnimalsWeCareFor />
      <Services />
      <LocationContact />

      {/* Authorization */}
      <Box className="py-4 text-center">
        <Text size="xs" style={{ color: "#2F3A2F" }}>
          aut. 01/2025
        </Text>
      </Box>
    </Box>
  );
}
