"use client";

import React from "react";
import Image from "next/image";
import { Container, Title, Text, Overlay } from "@mantine/core";
import rosiImage from "@/assets/images/hero.jpg";
import classes from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={classes.hero} id="hero">
      <Image
        src={rosiImage}
        alt="RosiVetStudio"
        fill
        priority
        style={{ objectFit: "cover", zIndex: 0 }}
        className={classes.backgroundImage}
      />
      <Overlay
        gradient="linear-gradient(180deg, rgba(134, 150, 132, 0.4) 0%, rgba(47, 58, 47, 0.6) 100%)"
        opacity={1}
        zIndex={1}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title} order={1}>
          Ogni animale merita le migliori cure
        </Title>
        <Title className={classes.subTitle} size="xl" mt="sm">
          Studio Veterinario
          <Text className={classes.description} size="lg">
            Dott.ssa Rosita Semenza
          </Text>
        </Title>
      </Container>
    </div>
  );
}
