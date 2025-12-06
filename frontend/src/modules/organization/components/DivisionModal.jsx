import React from "react";
import { X, Users } from "lucide-react";

const ModalDivisi = ({ isOpen, onClose, divisionData }) => {
  if (!isOpen || !divisionData) return null;
  const data = divisionData;
  const getColorClass = (colorName) => {
    const variants = {
      blue: {
        bgIcon: "bg-blue-500",
        text: "text-blue-600",
        border: "border-blue-100",
      },
      purple: {
        bgIcon: "bg-purple-500",
        text: "text-purple-600",
        border: "border-purple-100",
      },
      pink: {
        bgIcon: "bg-pink-500",
        text: "text-pink-600",
        border: "border-pink-100",
      },
      orange: {
        bgIcon: "bg-orange-500",
        text: "text-orange-600",
        border: "border-orange-100",
      },
      green: {
        bgIcon: "bg-green-500",
        text: "text-green-600",
        border: "border-green-100",
      },
      yellow: {
        bgIcon: "bg-yellow-500",
        text: "text-yellow-600",
        border: "border-yellow-100",
      },
      red: {
        bgIcon: "bg-red-500",
        text: "text-red-600",
        border: "border-red-100",
      },
      indigo: {
        bgIcon: "bg-indigo-500",
        text: "text-indigo-600",
        border: "border-indigo-100",
      },
      cyan: {
        bgIcon: "bg-cyan-500",
        text: "text-cyan-600",
        border: "border-cyan-100",
      },
    };
    return variants[colorName] || variants.blue;
  };

  const colors = getColorClass(data.color);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Container Kartu Utama */}
      <div
        className="bg-white w-full max-w-2xl h-auto max-h-[85vh] rounded-3xl relative shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tomobol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto p-8 h-full custom-scrollbar">
          {/* Header Divisi */}
          <div className="text-center mb-8 pt-2">
            <div
              className={`${colors.bgIcon} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gray-200`}
            >
              <Users size={36} />
            </div>

            {/* fullName diambil dari props divisionData */}
            <h3 className="text-3xl font-black text-gray-800 mb-2">
              {data.fullName}
            </h3>
            <p className="text-gray-500 px-4">
              {data.description || "Divisi Himpunan Mahasiswa Informatika"}
            </p>
          </div>

          {/* List Anggota */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Daftar Anggota
            </h4>

            {data.members && data.members.length > 0 ? (
              data.members.map((member, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col p-4 bg-white rounded-xl border ${colors.border} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">
                    {member.name}
                  </h4>
                  <p className={`text-sm ${colors.text} font-medium mt-1`}>
                    {member.role}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic">
                Belum ada data anggota.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDivisi;
