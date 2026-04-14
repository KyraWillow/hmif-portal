import React from "react";
import { X, Trophy, ExternalLink, Globe, Info } from "lucide-react";

const CompetitionModal = ({ isOpen, onClose, competition }) => {
  if (!isOpen || !competition) return null;

  const requirements = (competition.requirements || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg overflow-hidden rounded-3xl relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- HEADER --- */}
        <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 p-8 pb-12 text-center border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full p-2 transition-all"
          >
            <X size={24} />
          </button>

          <div className="bg-white text-yellow-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white">
            <Trophy size={36} className="fill-yellow-500 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-800 leading-tight px-4">
            {competition.name}
          </h3>
          <p className="text-blue-600 text-sm font-semibold mt-2 uppercase tracking-wider">
            {competition.level || "Tingkat Nasional"}
          </p>
        </div>

        <div className="p-8 overflow-y-auto max-h-[50vh]">
          <p className="text-gray-600 leading-relaxed mb-6 text-center">
            {competition.description || "Detail lomba belum tersedia."}
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h4 className="flex items-center font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
              <Info size={16} className="mr-2 text-blue-500" />
              Persyaratan & Kriteria
            </h4>
            <ul className="space-y-2">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"></span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            {!requirements.length ? (
              <p className="text-sm text-gray-500">
                Persyaratan belum diisi oleh admin.
              </p>
            ) : null}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col gap-3">
            <p className="text-center text-xs text-gray-500 mb-1">
              Anda akan diarahkan ke website resmi penyelenggara.
            </p>

            {/* Link ke external site */}
            <a
              href={competition.registration_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!competition.registration_url}
              className="group flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              <Globe size={20} className="mr-2 group-hover:animate-pulse" />
              Kunjungi Website Resmi
              <ExternalLink
                size={16}
                className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform"
              />
            </a>
            {!competition.registration_url ? (
              <p className="text-center text-xs text-amber-600">
                Link pendaftaran belum tersedia.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionModal;
