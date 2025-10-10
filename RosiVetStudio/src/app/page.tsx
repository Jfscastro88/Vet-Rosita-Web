import React from "react";
import Image from "next/image";
import rosiImage from "@/assets/images/logo/Rosi-PNG.png";
import Link from "next/link";
import { Button } from "@mantine/core";

export default function HomePage() {
  return (
    <div className="h-screen bg-pink-100 text-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-8 max-w-full max-h-full">
        <div className="w-full max-w-4xl h-auto">
          <Image
            src={rosiImage}
            alt="RosiVetStudio Logo"
            width={1200}
            height={800}
            priority
            className="w-full h-auto max-h-[60vh] object-contain"
          />
        </div>
        <h1 className="text-center font-extrabold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4">
          Dott.ssa Rosita Semenza
        </h1>
        <h2 className="text-center font-bold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4">
          Veterinaria esperta in animali esotici e non convenzionali
        </h2>
        <section className="flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-4xl font-bold mb-4">
            Cura veterinaria con attenzione e professionalità
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl">
            Prenota una visita per il tuo animale domestico in pochi minuti.
          </p>
          <Button component={Link} href="/book" variant="light" color="red" size="md" radius="xl">
            Prenota una visita
          </Button>
        </section>
      </div>
    </div>
  );
}
