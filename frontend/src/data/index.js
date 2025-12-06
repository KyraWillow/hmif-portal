import FaidzaImg from "../assets/mahasiswa/Muhammad-Faidza-Airlangga.png";
import AryaImg from "../assets/mahasiswa/Muhammad-Arya-Ivandy-Rohman.png";
import DosenImg from "../assets/dosen/Puji Andayani, S.Si., M.Si., M.Sc., MCE, MOS.jpg";

export const LOMBA_DETAILS = {
  "TechnoFest 2025": {
    description:
      "TechnoFest 2025 adalah kompetisi pemrograman kompetitif tingkat nasional. Peserta akan diuji kemampuannya dalam memecahkan masalah algoritmik.",
    requirements: [
      "Mahasiswa aktif S1/D4.",
      "Tim 2-3 orang.",
      "Biaya: Rp 150.000,-",
      "Bahasa: C++, Java, Python.",
    ],
  },
  "Cyber Security Challenge": {
    description:
      "Kompetisi Capture The Flag (CTF) yang menguji kemampuan keamanan siber, meliputi web exploitation, cryptography, dan forensics.",
    requirements: ["Terbuka untuk umum.", "Individu/Tim (maks 3).", "Gratis."],
  },
  "UI/UX Competition": {
    description:
      "Kompetisi desain antarmuka dan pengalaman pengguna untuk menciptakan solusi digital yang inovatif.",
    requirements: [
      "Mahasiswa aktif.",
      "Tim maks 3 orang.",
      "Proposal & Prototype.",
    ],
  },
};

export const PRESTASI_DATA = [
  {
    name: "Muhammad Faidza Airlangga",
    event: "UPZ BAZNAS SEMEN INDONESIA",
    rank: "PENERIMA BEASISWA",
    color: "blue",
    img: FaidzaImg,
    quote: "Teruslah belajar.",
  },
  {
    name: "Muhammad Arya Ivandy Rohman",
    event: "Terpilih menjadi Ketua Pelaksana LKMM PRA-TD UISI 2025",
    rank: "",
    color: "blue",
    img: AryaImg,
    quote: "Desain adalah solusi.",
  },
  {
    name: "Puji Andayani, S.Si., M.Si., M.Sc., MCE, MOS",
    event: "Terpilih menjadi Dosen Teladan UISI 2025 oleh SIG FOUNDATION",
    rank: "",
    color: "blue",
    img: DosenImg,
    quote: "Kolaborasi adalah kunci.",
  },
];
