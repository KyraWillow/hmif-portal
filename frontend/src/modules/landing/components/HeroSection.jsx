import React from "react";
import heroBg from "../../../assets/HIMAHero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Himpunan Mahasiswa Informatika"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 pt-16">
        <h3 className="text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 text-shadow-sm">
          Universitas Internasional Semen Indonesia
        </h3>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
          Himpunan Mahasiswa <br />
          Informatika
        </h1>

        <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6 opacity-80"></div>

        {/* Deskripsi Singkat */}
        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          BERSAMA KITA BISA, SAMPEAN JOSSS.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
