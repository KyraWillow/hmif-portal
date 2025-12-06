// src/components/Lomba.jsx
import React from 'react';
import { Trophy } from 'lucide-react';
import { LOMBA_DETAILS } from '../../../data';

const Lomba = ({ onOpenLomba }) => {
    return (
        <section id="lomba" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Trophy size={16} className="mr-2" /> Kompetisi
                    </div>
                    <h2 className="text-4xl font-black mb-4">Info <span className="text-gradient">Lomba Terkini</span></h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {Object.keys(LOMBA_DETAILS).map((key, idx) => (
                        <div key={key} className="glass-card rounded-3xl p-6 hover:scale-[1.01] transition-transform flex flex-col md:flex-row items-center gap-6 shadow-lg">
                            <div className="shrink-0 relative">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'} text-white flex flex-col items-center justify-center shadow-lg`}>
                                    <span className="text-3xl font-black">{10 + idx * 5}</span>
                                    <span className="text-xs font-bold uppercase">Okt</span>
                                </div>
                            </div>
                            <div className="grow text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{key}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{LOMBA_DETAILS[key].description}</p>
                                <div className="flex gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">Nasional</span>
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">Mahasiswa</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onOpenLomba(key)}
                                className={`shrink-0 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r ${idx % 2 === 0 ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'} shadow-md hover:shadow-lg transition-all`}
                            >
                                Lihat Detail
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Lomba;