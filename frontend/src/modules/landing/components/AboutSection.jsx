import React from "react";
import { Info, Award, CheckCircle } from "lucide-react";
import PicAbout from "../../../assets/PICTURE-ABOUT.jpg";

const Tentang = ({ siteContent }) => {
  return (
    <section
      id="tentang"
      className="py-24 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <img
            src={PicAbout}
            className="relative rounded-3xl shadow-2xl transform transition-transform hover:scale-[1.02]"
            alt="About"
          />
        </div>
        <div>
          <div className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Info size={16} className="mr-2" />{" "}
            {siteContent?.about_badge || "Tentang Kami"}
          </div>
          <h2 className="text-4xl font-black mb-6">
            {siteContent?.about_title || "Tentang HMIF"}
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {siteContent?.about_description ||
              "Himpunan Mahasiswa Informatika (HMIF) adalah rumah bagi seluruh mahasiswa Informatika."}
          </p>
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-2xl flex items-start space-x-4 hover:translate-x-2 transition-transform">
              <div className="bg-blue-500 text-white p-3 rounded-xl shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Visi</h3>
                <p className="text-gray-600 text-sm">
                  {siteContent?.vision ||
                    "Membangun HMIF yang solid, bertanggung jawab, dan profesional."}
                </p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl flex items-start space-x-4 hover:translate-x-2 transition-transform">
              <div className="bg-purple-500 text-white p-3 rounded-xl shrink-0">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Misi</h3>
                <p className="text-gray-600 text-sm">
                  {siteContent?.mission ||
                    "Membentuk pribadi adaptif, peduli, dan inovatif dalam lingkungan Informatika."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tentang;
