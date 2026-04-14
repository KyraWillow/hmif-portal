import React from "react";
import { Clock3, ShieldAlert, Sparkles } from "lucide-react";

const MaintenancePage = ({ siteContent }) => {
  const title =
    siteContent?.maintenance_title || "Website Sedang Dalam Pemeliharaan";
  const message =
    siteContent?.maintenance_message ||
    "Kami sedang melakukan pembaruan sistem dan konten. Silakan kembali beberapa saat lagi.";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(51,150,255,0.18),_transparent_35%),linear-gradient(135deg,#f7f4ea_0%,#fffef9_48%,#eef6ff_100%)] text-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-[#3396FF]/20 blur-3xl" />
        <div className="absolute right-[-6rem] bottom-16 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur md:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
              <Sparkles size={14} />
              Maintenance Mode
            </div>

            <h1 className="mt-6 max-w-3xl font-['Fraunces'] text-4xl leading-tight text-slate-900 md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {message}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <div className="flex items-center gap-3 text-slate-800">
                  <Clock3 size={18} className="text-[#3396FF]" />
                  <span className="font-semibold">Pembaruan Website</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Tim admin sedang mengelola perubahan konten dan memastikan
                  seluruh informasi tampil rapi saat website kembali dibuka.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <div className="flex items-center gap-3 text-slate-800">
                  <ShieldAlert size={18} className="text-amber-500" />
                  <span className="font-semibold">Akses Publik Ditutup</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Mode maintenance aktif. Halaman admin tetap bisa diakses lewat
                  route khusus untuk melanjutkan pengelolaan konten.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Admin Notice
              </p>
              <h2 className="mt-4 font-['Fraunces'] text-3xl leading-tight">
                Panel admin tetap tersedia untuk proses maintenance.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Gunakan route `/admin` dan token admin untuk memperbarui hero,
                profil organisasi, prestasi, info lomba, divisi, serta anggota.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-white/75 p-8 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Organisasi
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                {siteContent?.site_name || "HMIF UISI"}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {siteContent?.organization_label ||
                  "Universitas Internasional Semen Indonesia"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MaintenancePage;
