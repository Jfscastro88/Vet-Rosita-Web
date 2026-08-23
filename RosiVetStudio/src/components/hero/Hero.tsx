"use client";

import React from "react";
import Image from "next/image";
import { Container, Title, Overlay } from "@mantine/core";
import rosiImage from "@/assets/images/hero.jpg";
import classes from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero} id="hero" aria-label="Presentazione">
      <Image
        src={rosiImage}
        alt="Coniglio in un prato con un fiore in bocca"
        fill
        priority
        sizes="100vw"
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
        <p className={classes.subTitle} style={{ marginTop: "var(--mantine-spacing-sm)", marginBottom: 0 }}>
          Studio Veterinario
          <span className={classes.description} style={{ display: "block" }}>
            Dott.ssa Rosita Semenza
          </span>
        </p>
      </Container>
    </section>
  );
}
