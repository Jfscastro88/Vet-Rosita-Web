"use client";

import React from "react";
import Image from "next/image";
import rosiImage from "@/assets/Rosi-PNG.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pink-100 text-black flex flex-col items-center justify-center relative overflow-hidden py-8">
      <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Logo */}
        <div className="w-full max-w-2xl h-auto">
          <Image
            src={rosiImage}
            alt="RosiVetStudio Logo"
            width={1200}
            height={800}
            priority
            className="w-full h-auto max-h-[40vh] object-contain"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-center font-extrabold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Studio Veterinario
        </h1>

        {/* Doctor Name */}
        <h2 className="text-center font-bold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Dott.ssa Rosita Semenza
        </h2>

        {/* Specialization */}
        <h3 className="text-center font-semibold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Veterinaria esperta in animali esotici e non convenzionali
        </h3>

        {/* Appointment Notice */}
        <div className="bg-gradient-to-r from-pink-300 to-pink-400 rounded-2xl p-8 shadow-xl border-2 border-pink-400 w-full max-w-3xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-3xl">📋</span>
              <h4 className="font-bold text-2xl sm:text-3xl text-pink-900 drop-shadow-sm">
                Prenotazioni
              </h4>
            </div>
            <p className="font-bold text-xl sm:text-2xl text-pink-900">Si riceve su appuntamento</p>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 shadow-xl border-2 border-pink-200 w-full max-w-3xl">
          <h4 className="text-center font-bold text-3xl sm:text-4xl mb-8 text-pink-800 drop-shadow-sm">
            ⏰ Orario
          </h4>
          <div className="grid gap-4">
            <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-400">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg sm:text-xl text-pink-800">Lunedì</span>
                <span className="font-semibold text-lg sm:text-xl text-gray-700">
                  dalle 16 alle 19
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-400">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg sm:text-xl text-pink-800">Martedì</span>
                <span className="font-semibold text-lg sm:text-xl text-gray-700">
                  dalle 10 alle 12.30
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-400">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg sm:text-xl text-pink-800">Mercoledì</span>
                <span className="font-semibold text-lg sm:text-xl text-gray-700">
                  dalle 16 alle 19
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-400">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg sm:text-xl text-pink-800">Venerdì</span>
                <span className="font-semibold text-lg sm:text-xl text-gray-700">
                  dalle 09.30 alle 17
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-500">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg sm:text-xl text-pink-900">Sabato</span>
                <span className="font-semibold text-lg sm:text-xl text-pink-800">
                  mattina su appuntamento
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl p-8 shadow-xl border-2 border-pink-300 w-full max-w-3xl">
          <div className="text-center mb-6">
            <h4 className="font-bold text-2xl sm:text-3xl mb-4 text-pink-900 drop-shadow-sm">
              ☎️ Contatti
            </h4>
            <p className="font-semibold text-lg sm:text-xl text-pink-800">
              Per visite, visite a domicilio e fuori orario contattare
            </p>
          </div>
          <div className="grid gap-4">
            <a
              href="tel:+393427586288"
              className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-pink-500 group"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">📞</span>
                <span className="font-bold text-xl sm:text-2xl text-pink-800 group-hover:text-pink-900">
                  3427586288
                </span>
              </div>
            </a>
            <a
              href="tel:+393404129704"
              className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-pink-500 group"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">📞</span>
                <span className="font-bold text-xl sm:text-2xl text-pink-800 group-hover:text-pink-900">
                  3404129704
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Authorization */}
        <div className="absolute bottom-4 right-4 text-sm text-pink-600 font-medium">
          aut. 01/2025
        </div>
      </div>
    </div>
  );
}
