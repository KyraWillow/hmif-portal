import React, { useEffect, useState } from "react";
import Navbar from "../modules/core/components/Navbar";
import Footer from "../modules/core/components/Footer";
import HeroSection from "../modules/landing/components/HeroSection";
import AboutSection from "../modules/landing/components/AboutSection";
import Achievements from "../modules/achievements/components/Achievements";
import Competitions from "../modules/competitions/components/Competitions";
import TeamList from "../modules/organization/components/TeamList";
import ModalDivisi from "../modules/organization/components/DivisionModal.jsx";
import ModalLomba from "../modules/competitions/components/CompetitionModal";

const Home = () => {
  const [activeDivision, setActiveDivision] = useState(null);
  const [activeLomba, setActiveLomba] = useState(null);

  // Logic Scroll Reveal
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
          element.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Achievements />
        <AboutSection />
        <TeamList />
        <Competitions onOpenLomba={(key) => setActiveLomba(key)} />
      </main>

      <ModalDivisi
        isOpen={!!activeDivision}
        divisionKey={activeDivision}
        onClose={() => setActiveDivision(null)}
      />

      <ModalLomba
        isOpen={!!activeLomba}
        lombaKey={activeLomba}
        onClose={() => setActiveLomba(null)}
      />

      <Footer />
    </>
  );
};

export default Home;
