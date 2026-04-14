// src/modules/organization/components/TeamList.jsx
import React, { useState, useEffect } from "react";
import { Users, Loader2 } from "lucide-react";
import ModalDivisi from "./DivisionModal";
import { getJSON } from "../../../lib/api";

// Konfigurasi Warna Divisi
const DIVISION_CONFIG = {
  PSDM: { color: "purple" },
  Kominfo: { color: "blue" },
  Humas: { color: "green" },
  Ristek: { color: "yellow" },
  KWU: { color: "pink" },
  MinatBakat: { color: "orange" },
  BPH: { color: "red" },
};

// Helper varian warna Tailwind
const colorVariants = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    gradient: "from-blue-400 to-blue-600",
    border: "border-blue-400",
    buttonHover: "hover:bg-blue-200",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    gradient: "from-purple-400 to-purple-600",
    border: "border-purple-400",
    buttonHover: "hover:bg-purple-200",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    gradient: "from-pink-400 to-pink-600",
    border: "border-pink-400",
    buttonHover: "hover:bg-pink-200",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    gradient: "from-orange-400 to-orange-600",
    border: "border-orange-400",
    buttonHover: "hover:bg-orange-200",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    gradient: "from-green-400 to-green-600",
    border: "border-green-400",
    buttonHover: "hover:bg-green-200",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    gradient: "from-yellow-400 to-yellow-600",
    border: "border-yellow-400",
    buttonHover: "hover:bg-yellow-200",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    gradient: "from-red-400 to-red-600",
    border: "border-red-400",
    buttonHover: "hover:bg-red-200",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    gradient: "from-indigo-400 to-indigo-600",
    border: "border-indigo-400",
    buttonHover: "hover:bg-indigo-200",
  },
};

const TeamList = () => {
  const [bphData, setBphData] = useState([]);
  const [divisionsData, setDivisionsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDivisionData, setSelectedDivisionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMembers = await getJSON("/members");
        const bph = [];
        const groups = {};

        allMembers.forEach((member) => {
          const divName = member.division.name;

          if (divName === "BPH") {
            bph.push({
              name: member.name,
              role: member.role,
              code: member.nim,
              img: member.image_url, // Mengambil path gambar dari database
              color: "red",
            });
          } else {
            if (!groups[divName]) {
              groups[divName] = {
                fullName: member.division.description || divName,
                // Mengambil logo dari database (tabel divisions)
                logo: member.division.logo_url,
                color: DIVISION_CONFIG[divName]?.color || "blue",
                members: [],
              };
            }
            groups[divName].members.push(member);
          }
        });

        setBphData(bph);
        setDivisionsData(groups);
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal memuat data. Pastikan API backend dapat diakses.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="py-32 text-center">
        <Loader2
          className="animate-spin mx-auto text-blue-500 mb-4"
          size={40}
        />
        <p className="text-gray-500 font-medium">
          Sedang mengambil data terbaru...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="py-32 text-center">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-xl inline-block border border-red-100">
          <p className="font-bold mb-1">Terjadi Kesalahan</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );

  return (
    <section id="staff" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users size={16} className="mr-2" /> Tim Kami
          </div>
          <h2 className="text-4xl font-black mb-4">
            Jajaran <span className="text-gradient">Staff 2025</span>
          </h2>
        </div>

        {/* --- BPH SECTION --- */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
            Badan Pengurus Harian
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bphData.map((staff, idx) => {
              const colors = colorVariants[staff.color] || colorVariants.blue;
              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all group hover:shadow-xl border-t-4 ${colors.border}`}
                >
                  <div
                    className={`w-24 h-24 mx-auto bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg overflow-hidden`}
                  >
                    {staff.img ? (
                      <img
                        src={staff.img}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.classList.remove("bg-white");
                          e.target.parentNode.innerText = staff.code;
                        }}
                      />
                    ) : (
                      <span>{staff.code}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg">{staff.name}</h4>
                  <p className={`${colors.text} text-sm font-medium`}>
                    {staff.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- DIVISI SECTION --- */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
            Divisi HMIF
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.keys(divisionsData).map((key) => {
              const div = divisionsData[key];
              const colors = colorVariants[div.color] || colorVariants.blue;

              return (
                <div
                  key={key}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all cursor-pointer border border-gray-100 group flex flex-col items-center"
                  onClick={() => setSelectedDivisionData({ key: key, ...div })}
                >
                  <div className="h-20 w-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={div.logo || `/images/LOGO-${key.toUpperCase()}.jpg`}
                      alt={key}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.classList.add(
                          colors.bg,
                          colors.text
                        );
                        e.target.parentNode.innerHTML = `<span class='font-bold text-2xl'>${key[0]}</span>`;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{key}</h4>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {div.fullName}
                  </p>

                  <button
                    className={`${colors.bg} ${colors.text} px-6 py-2 rounded-full text-sm font-medium ${colors.buttonHover} transition-colors w-full mt-auto`}
                  >
                    Lihat Anggota
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <ModalDivisi
          isOpen={!!selectedDivisionData}
          divisionData={selectedDivisionData}
          onClose={() => setSelectedDivisionData(null)}
        />
      </div>
    </section>
  );
};

export default TeamList;
