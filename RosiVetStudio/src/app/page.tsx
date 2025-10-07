"use client";

import React from "react";
import Image from "next/image";
import rosiImage from "@/assets/Rosi-PNG.png";

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
        <h3 className="text-center font-bold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-lg sm:text-xl md:text-2xl lg:text-3xl px-4">
          Qualcosa di grande sta per arrivare!
        </h3>
      </div>
    </div>
  );
}
