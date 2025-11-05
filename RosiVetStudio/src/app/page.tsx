"use client";

import React from "react";
import Image from "next/image";
import rosiImage from "@/assets/Rosi-PNG.png";
import rosiImageWhite from "@/assets/Rosi-PNG-W.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center relative overflow-hidden py-4 sm:py-8">
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 max-w-4xl mx-auto px-4 sm:px-6">
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
      </div>
    </div>
  );
}
