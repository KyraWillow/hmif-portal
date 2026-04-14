import React from "react";
import { Instagram, Youtube, Linkedin, Github } from "lucide-react";
import HmifLogo from "../../../assets/LOGO-HMIF.jpg";

const Footer = ({ siteContent }) => {
  return (
    <footer className="bg-[#3396FF] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-white/20 pb-12">
          {/* Kolom 1: Logo & Deskripsi */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-full p-1 shadow-lg">
                <img
                  src={HmifLogo}
                  alt="Logo HMIF"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                      "text-blue-600",
                      "font-bold"
                    );
                    e.target.parentNode.innerHTML = "IF";
                  }}
                />
              </div>
              <span className="text-3xl font-black tracking-tight drop-shadow-md">
                HMIF
              </span>
            </div>
            <p className="text-blue-50 leading-relaxed font-medium pr-4">
              {siteContent?.footer_description ||
                "Membentuk pribadi adaptif, peduli, dan inovatif dalam lingkungan Informatika."}
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 drop-shadow-sm">
              Navigasi Cepat
            </h3>
            <ul className="space-y-3 text-blue-50">
              {["Prestasi", "Tentang", "Staff", "Lomba"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group font-medium"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-yellow-400 mr-0 group-hover:mr-2 rounded-full"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Sosmed */}
          <div>
            <h3 className="text-xl font-bold mb-6 drop-shadow-sm">
              Ikuti Kami
            </h3>
            <p className="text-blue-50 mb-4 text-sm">
              Update terbaru seputar kegiatan dan info teknologi.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl hover:bg-white hover:text-pink-600 transition-all hover:-translate-y-1 shadow-sm"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl hover:bg-white hover:text-red-600 transition-all hover:-translate-y-1 shadow-sm"
              >
                <Youtube size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl hover:bg-white hover:text-blue-700 transition-all hover:-translate-y-1 shadow-sm"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl hover:bg-white hover:text-gray-900 transition-all hover:-translate-y-1 shadow-sm"
              >
                <Github size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-blue-100 text-sm font-light">
          &copy; {new Date().getFullYear()} Himpunan Mahasiswa Informatika.{" "}
          <br className="md:hidden" />
          Universitas Internasional Semen Indonesia.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
