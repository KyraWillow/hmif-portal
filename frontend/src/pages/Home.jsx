import React, { useEffect, useState } from "react";
import Navbar from "../modules/core/components/Navbar";
import Footer from "../modules/core/components/Footer";
import HeroSection from "../modules/landing/components/HeroSection";
import AboutSection from "../modules/landing/components/AboutSection";
import Achievements from "../modules/achievements/components/Achievements";
import Competitions from "../modules/competitions/components/Competitions";
import TeamList from "../modules/organization/components/TeamList";
import ModalLomba from "../modules/competitions/components/CompetitionModal";
import MaintenancePage from "./MaintenancePage";
import { getJSON } from "../lib/api";

const Home = () => {
  const [activeCompetition, setActiveCompetition] = useState(null);
  const [siteContent, setSiteContent] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [siteResponse, achievementsResponse, competitionsResponse] =
          await Promise.all([
            getJSON("/site-content"),
            getJSON("/achievements"),
            getJSON("/competitions"),
          ]);

        setSiteContent(siteResponse);
        setAchievements(achievementsResponse);
        setCompetitions(competitionsResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-white" />
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-400">
            Memuat Konten HMIF
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-xl rounded-[2rem] border border-red-500/30 bg-red-500/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-red-300">
            Gagal Memuat Website
          </p>
          <h1 className="mt-4 font-['Fraunces'] text-4xl">Koneksi belum siap</h1>
          <p className="mt-4 text-slate-300">{error}</p>
        </div>
      </main>
    );
  }

  if (siteContent?.maintenance_mode) {
    return <MaintenancePage siteContent={siteContent} />;
  }

  return (
    <>
      <Navbar siteContent={siteContent} />
      <main>
        <HeroSection siteContent={siteContent} />
        <Achievements achievements={achievements} />
        <AboutSection siteContent={siteContent} />
        <TeamList />
        <Competitions
          competitions={competitions}
          onOpenLomba={(competition) => setActiveCompetition(competition)}
        />
      </main>

      <ModalLomba
        isOpen={!!activeCompetition}
        competition={activeCompetition}
        onClose={() => setActiveCompetition(null)}
      />

      <Footer siteContent={siteContent} />
    </>
  );
};

export default Home;
