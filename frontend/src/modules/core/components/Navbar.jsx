import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react"; // Tambah ChevronRight
import logoImage from "../../../assets/LOGO-HMIF.jpg";

const Navbar = ({ siteContent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Prestasi", href: "#prestasi" },
    { name: "Tentang", href: "#tentang" },
    { name: "Staff", href: "#staff" },
    { name: "Lomba", href: "#lomba" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#3396FF]/90 backdrop-blur-md shadow-lg shadow-blue-900/20 py-3 border-white/10"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* --- LOGO --- */}
            <a
              href="#"
              className="flex items-center space-x-3 group z-50 relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <img
                  src={logoImage}
                  alt="Logo HMIF"
                  className="relative z-10 w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                />
              </div>
              <span className="text-xl md:text-2xl font-black text-white tracking-wide">
                {siteContent?.site_name || "HMIF"}
              </span>
            </a>

            {/* --- DESKTOP MENU --- */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:scale-105 transition-all font-medium text-sm tracking-wide relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 text-white p-2 focus:outline-none transition-transform duration-300"
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X size={30} className="text-red-400" />
                ) : (
                  <Menu size={30} />
                )}
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-b bg-[#3396FF] backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Menu Items Container */}
        <div className="w-full max-w-sm px-6 space-y-6 relative z-10">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                                group flex items-center justify-between text-3xl font-bold text-white/90 border-b border-white/10 pb-4
                                transform transition-all duration-500 hover:text-blue-400 hover:pl-4 hover:border-blue-500/50
                                ${
                                  isMobileMenuOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                                }
                            `}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
              <ChevronRight
                size={24}
                className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Footer Mobile Menu */}
        <div
          className={`absolute bottom-10 text-white/30 text-xs tracking-widest uppercase transition-opacity duration-700 delay-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Universitas Internasional Semen Indonesia
        </div>
      </div>
    </>
  );
};

export default Navbar;
