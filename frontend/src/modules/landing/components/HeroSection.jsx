import React from "react";
import heroBg from "../../../assets/HIMAHero.jpg";

const HeroSection = ({ siteContent }) => {
  const titleLines = (siteContent?.hero_title || "Himpunan Mahasiswa\nInformatika")
    .split("\n")
    .filter(Boolean);

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
          {siteContent?.organization_label ||
            "Universitas Internasional Semen Indonesia"}
        </h3>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
          {titleLines.map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              {line}
              {index !== titleLines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </h1>

        <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6 opacity-80"></div>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          {siteContent?.hero_description || siteContent?.hero_subtitle}
        </p>
        {siteContent?.hero_subtitle ? (
          <p className="mt-4 text-sm md:text-base font-semibold tracking-[0.18em] text-white/75 uppercase">
            {siteContent.hero_subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
