import React from "react";
import { Star, Trophy } from "lucide-react";
import { PRESTASI_DATA } from "../../../data";

const PrestasiOption3 = () => {
  return (
    <section
      id="prestasi"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
            Prestasi Kami
          </span>
          <h2 className="text-4xl font-black text-slate-800 mt-2">
            Kebanggaan <br />
            Informatika
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESTASI_DATA.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300"></div>

              <div className="relative z-10">
                {/* Foto + Rank */}
                <div className="flex justify-between items-start mb-4">
                  {/* Foto dalam kotak rounded */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Icon Trophy */}
                  <div className="bg-yellow-50 text-yellow-600 p-2 rounded-xl">
                    <Trophy size={20} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">
                  {item.name}
                </h3>
                <div className="text-xs font-bold text-blue-600 mb-3 bg-blue-50 inline-block px-2 py-1 rounded-md">
                  {item.rank} {item.event}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-slate-200 pl-3 italic group-hover:border-blue-400 transition-colors">
                  "{item.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrestasiOption3;
