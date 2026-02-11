"use client";

import React from "react";
import Image from "next/image";
import { Container, Stack, Title, Text, Paper } from "@mantine/core";
import rosiImage from "@/assets/images/rosi.jpg";
import camiImage from "@/assets/images/cami.png";
import classes from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={classes.aboutSection} id="about">
      <Container size="xl">
        <Stack gap="xl">
          <Title order={2} size="2.5rem" className={classes.title}>
            Chi siamo
          </Title>

          {/* Rosita Section - Image on Right */}
          <Paper className={classes.card} radius="lg" p={0}>
            <div className={classes.cardInner}>
              <div className={classes.content}>
                <Text className={classes.name} size="xl" fw={700}>
                  Rosita Semenza
                </Text>
                <Text className={classes.description} size="md">
                  Veterinaria (DVM, MS) esperta in medicina degli animali esotici/non convenzionali,
                  con esperienza in ambulatori, cliniche, pronto soccorso e recupero fauna
                  selvatica.
                </Text>
                <Text className={classes.description} size="md">
                  Ha conseguito il master universitario di II livello in "riproduzione, management,
                  patologia e terapia degli animali non convenzionali" presso l'Università di Parma
                  ed è, ad oggi, specializzanda in "Malattie infettive, profilassi e polizia
                  veterinaria" presso l'università Federico II di Napoli.
                </Text>
                <Text className={classes.description} size="md">
                  Si dedica con dedizione alla cura di animali non convenzionali, compresi piccoli
                  animali da cortile, senza rinunciare a visite base di cane e gatto.
                </Text>
              </div>
              <div className={classes.imageContainer}>
                <Image
                  src={rosiImage}
                  alt="Rosita Semenza"
                  fill
                  className={classes.image}
                  priority
                />
              </div>
            </div>
          </Paper>

          {/* Camilla Section - Image on Left */}
          <Paper className={classes.card} radius="lg" p={0}>
            <div className={`${classes.cardInner} ${classes.cardReverse}`}>
              <div className={classes.imageContainer}>
                <Image
                  src={camiImage}
                  alt="Camilla Baldina"
                  fill
                  className={classes.image}
                  priority
                />
              </div>
              <div className={classes.content}>
                <Text className={classes.name} size="xl" fw={700}>
                  Camilla Baldina
                </Text>
                <Text className={classes.description} size="md">
                  Si occupa di benessere animale integrato. Il suo profilo unisce tre ambiti
                  complementari: è educatrice cinofila con approccio cognitivo-relazionale,
                  operatrice in Interventi Assistiti con gli Animali (I.A.A.) e tecnica veterinaria.
                </Text>
                <Text className={classes.description} size="md">
                  Come tecnica veterinaria, oltre ad essere di supporto a Rosita durante le visite
                  in studio, può essere il punto di riferimento per i proprietari che affrontano a
                  casa dei percorsi di cura del proprio animale. Grazie alla sua formazione è in
                  grado di assistere le famiglie nella gestione domiciliare delle terapie.
                </Text>
                <Text className={classes.description} size="md">
                  Come educatrice cinofila Camilla promuove una visione del cane che mette al centro
                  la mente, le emozioni e la salute a 360º. Il suo lavoro si focalizza sulla
                  costruzione di una relazione funzionale e positiva tra il cane e l'umano di
                  riferimento, facilitando la comunicazione e il rispetto reciproco attraverso
                  metodologie basate sulle più recenti evidenze scientifiche e comportamentali.
                </Text>
              </div>
            </div>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}
