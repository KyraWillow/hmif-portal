import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Award,
  BookOpenText,
  LogOut,
  Megaphone,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { sendJSON } from "../lib/api";

const STORAGE_KEY = "hmif_admin_token";

const createAchievement = () => ({
  student_name: "",
  title: "",
  rank: "",
  event_name: "",
  photo_url: "",
  description: "",
  sort_order: 0,
});

const createCompetition = () => ({
  name: "",
  description: "",
  requirements: "",
  level: "Nasional",
  audience: "Mahasiswa",
  registration_url: "",
  month_label: "Okt",
  date_label: "10",
  sort_order: 0,
});

const createDivision = () => ({
  name: "",
  description: "",
  logo_url: "",
  sort_order: 0,
});

const createMember = () => ({
  division_id: 0,
  name: "",
  nim: "",
  role: "",
  image_url: "",
  sort_order: 0,
});

const createSiteContent = () => ({
  site_name: "HMIF UISI",
  organization_label: "Universitas Internasional Semen Indonesia",
  hero_title: "Himpunan Mahasiswa\nInformatika",
  hero_description: "",
  hero_subtitle: "",
  about_badge: "Tentang Kami",
  about_title: "Tentang HMIF",
  about_description: "",
  vision: "",
  mission: "",
  footer_description: "",
  maintenance_mode: false,
  maintenance_title: "Website Sedang Maintenance",
  maintenance_message: "",
});

function buildPayload(section, item) {
  if (section === "members") {
    const { division, ...memberPayload } = item;
    return memberPayload;
  }

  return item;
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

function SectionFrame({ icon: Icon, title, description, children, actions }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
            <Icon size={14} />
            {title}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

function ResourceCard({ title, children, onSave, onDelete, saving, deleting }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={14} />
            {saving ? "Menyimpan" : "Simpan"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={14} />
            Hapus
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

const AdminPanel = () => {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [tokenInput, setTokenInput] = useState(
    () => localStorage.getItem(STORAGE_KEY) || ""
  );
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [status, setStatus] = useState("");
  const [siteContent, setSiteContent] = useState(createSiteContent());
  const [achievements, setAchievements] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [members, setMembers] = useState([]);
  const [busyKey, setBusyKey] = useState("");

  const stats = useMemo(
    () => [
      {
        label: "Prestasi",
        value: achievements.length,
        icon: Award,
      },
      {
        label: "Lomba",
        value: competitions.length,
        icon: Megaphone,
      },
      {
        label: "Divisi",
        value: divisions.length,
        icon: BookOpenText,
      },
      {
        label: "Anggota",
        value: members.length,
        icon: Users,
      },
    ],
    [achievements.length, competitions.length, divisions.length, members.length]
  );

  const hydrate = (bootstrap) => {
    setSiteContent({ ...createSiteContent(), ...bootstrap.site_content });
    setAchievements(bootstrap.achievements || []);
    setCompetitions(bootstrap.competitions || []);
    setDivisions(bootstrap.divisions || []);
    setMembers(bootstrap.members || []);
  };

  const loadBootstrap = async (adminToken = token) => {
    if (!adminToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      const response = await sendJSON("/admin/bootstrap", {
        method: "GET",
        token: adminToken,
      });
      hydrate(response);
      setToken(adminToken);
      localStorage.setItem(STORAGE_KEY, adminToken);
    } catch (error) {
      setLoginError(error.message);
      setToken("");
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBootstrap(localStorage.getItem(STORAGE_KEY) || "");
  }, []);

  const persistSiteContent = async () => {
    setBusyKey("site-content");
    setStatus("");
    try {
      await sendJSON("/admin/site-content", {
        method: "PUT",
        token,
        body: siteContent,
      });
      setStatus("Pengaturan website berhasil disimpan.");
      await loadBootstrap(token);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusyKey("");
    }
  };

  const saveResource = async (section, item) => {
    const isNew = !item.id;
    const path = isNew ? `/admin/${section}` : `/admin/${section}/${item.id}`;

    setBusyKey(`${section}-${item.id || "new"}-save`);
    setStatus("");
    try {
      await sendJSON(path, {
        method: isNew ? "POST" : "PUT",
        token,
        body: buildPayload(section, item),
      });
      setStatus("Perubahan berhasil disimpan.");
      await loadBootstrap(token);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusyKey("");
    }
  };

  const deleteResource = async (section, item) => {
    if (!item.id) {
      if (section === "achievements") {
        setAchievements((current) => current.filter((entry) => entry !== item));
      }
      if (section === "competitions") {
        setCompetitions((current) => current.filter((entry) => entry !== item));
      }
      if (section === "divisions") {
        setDivisions((current) => current.filter((entry) => entry !== item));
      }
      if (section === "members") {
        setMembers((current) => current.filter((entry) => entry !== item));
      }
      return;
    }

    if (!window.confirm("Yakin ingin menghapus data ini?")) {
      return;
    }

    setBusyKey(`${section}-${item.id}-delete`);
    setStatus("");

    try {
      await sendJSON(`/admin/${section}/${item.id}`, {
        method: "DELETE",
        token,
      });
      setStatus("Data berhasil dihapus.");
      await loadBootstrap(token);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusyKey("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await loadBootstrap(tokenInput);
  };

  const handleLogout = () => {
    setToken("");
    setTokenInput("");
    setSiteContent(createSiteContent());
    setAchievements([]);
    setCompetitions([]);
    setDivisions([]);
    setMembers([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#f6f2e9_0%,#ffffff_50%,#edf5ff_100%)] px-6 py-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
          <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] md:p-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                <Sparkles size={14} />
                HMIF Control Room
              </div>
              <h1 className="mt-6 font-['Fraunces'] text-4xl leading-tight md:text-6xl">
                Panel admin untuk maintenance dan pembaruan konten website.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300">
                Dari satu dashboard, admin bisa mengaktifkan mode maintenance,
                memperbarui hero dan profil HMIF, mengelola prestasi, info
                lomba, divisi, dan anggota yang tampil di website.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="text-emerald-300" />
                  <p className="mt-4 font-semibold">Login berbasis token</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Gunakan `ADMIN_TOKEN` dari backend untuk masuk ke dashboard.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <Activity className="text-sky-300" />
                  <p className="mt-4 font-semibold">Publikasi real-time</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Setelah disimpan, homepage langsung membaca data terbaru dari
                    API.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Admin Access
              </p>
              <h2 className="mt-4 font-['Fraunces'] text-4xl leading-tight text-slate-900">
                Masuk ke dashboard HMIF.
              </h2>
              <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                <Field
                  label="Admin Token"
                  type="password"
                  value={tokenInput}
                  onChange={setTokenInput}
                  placeholder="Masukkan token admin"
                />
                <button
                  type="submit"
                  disabled={loading || !tokenInput}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3396FF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#257ad2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShieldCheck size={16} />
                  {loading ? "Memeriksa Akses" : "Masuk"}
                </button>
              </form>
              {loginError ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600">
                  {loginError}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-700">
                  Gunakan nilai `ADMIN_TOKEN` yang sama dengan konfigurasi
                  backend Railway untuk login.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#f6f2e9_0%,#ffffff_50%,#edf5ff_100%)] px-6 py-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 px-10 py-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Menyiapkan dashboard admin
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f6f2e9_0%,#ffffff_50%,#edf5ff_100%)] px-4 py-4 text-slate-900 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white/85 px-6 py-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <Settings2 size={14} />
                HMIF Admin Panel
              </div>
              <h1 className="mt-4 font-['Fraunces'] text-4xl leading-tight text-slate-900 md:text-5xl">
                Maintenance, publikasi, dan pembaruan konten website dalam satu
                panel.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">
                Gunakan dashboard ini untuk mengaktifkan maintenance mode,
                memperbarui copywriting homepage, mengelola prestasi dan lomba,
                serta menyunting divisi dan anggota HMIF.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Lihat Website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[1.75rem] border border-slate-200 bg-white/75 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {label}
                </p>
                <Icon size={18} className="text-[#3396FF]" />
              </div>
              <p className="mt-4 font-['Fraunces'] text-4xl text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {status ? (
          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white/90 px-5 py-4 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            {status}
          </div>
        ) : null}

        <div className="mt-6 space-y-6">
          <SectionFrame
            icon={AlertTriangle}
            title="Website Settings"
            description="Kontrol mode maintenance dan seluruh konten inti yang muncul di landing page."
            actions={
              <button
                type="button"
                onClick={persistSiteContent}
                disabled={busyKey === "site-content"}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={14} />
                {busyKey === "site-content" ? "Menyimpan" : "Simpan Pengaturan"}
              </button>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Field
                label="Nama Website"
                value={siteContent.site_name}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, site_name: value }))
                }
              />
              <Field
                label="Label Organisasi"
                value={siteContent.organization_label}
                onChange={(value) =>
                  setSiteContent((current) => ({
                    ...current,
                    organization_label: value,
                  }))
                }
              />
              <TextareaField
                label="Judul Hero"
                rows={3}
                value={siteContent.hero_title}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, hero_title: value }))
                }
              />
              <TextareaField
                label="Deskripsi Hero"
                rows={3}
                value={siteContent.hero_description}
                onChange={(value) =>
                  setSiteContent((current) => ({
                    ...current,
                    hero_description: value,
                  }))
                }
              />
              <Field
                label="Tagline Hero"
                value={siteContent.hero_subtitle}
                onChange={(value) =>
                  setSiteContent((current) => ({
                    ...current,
                    hero_subtitle: value,
                  }))
                }
              />
              <Field
                label="Badge Tentang"
                value={siteContent.about_badge}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, about_badge: value }))
                }
              />
              <Field
                label="Judul Tentang"
                value={siteContent.about_title}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, about_title: value }))
                }
              />
              <TextareaField
                label="Deskripsi Tentang"
                rows={4}
                value={siteContent.about_description}
                onChange={(value) =>
                  setSiteContent((current) => ({
                    ...current,
                    about_description: value,
                  }))
                }
              />
              <TextareaField
                label="Visi"
                rows={4}
                value={siteContent.vision}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, vision: value }))
                }
              />
              <TextareaField
                label="Misi"
                rows={4}
                value={siteContent.mission}
                onChange={(value) =>
                  setSiteContent((current) => ({ ...current, mission: value }))
                }
              />
              <TextareaField
                label="Deskripsi Footer"
                rows={3}
                value={siteContent.footer_description}
                onChange={(value) =>
                  setSiteContent((current) => ({
                    ...current,
                    footer_description: value,
                  }))
                }
              />
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Maintenance Mode
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {siteContent.maintenance_mode ? "Aktif" : "Nonaktif"}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Saat aktif, halaman publik akan menampilkan notice
                      maintenance dan menyembunyikan landing page utama.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSiteContent((current) => ({
                        ...current,
                        maintenance_mode: !current.maintenance_mode,
                      }))
                    }
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                      siteContent.maintenance_mode
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {siteContent.maintenance_mode ? "Matikan" : "Aktifkan"}
                  </button>
                </div>
                <div className="mt-5 grid gap-4">
                  <Field
                    label="Judul Maintenance"
                    value={siteContent.maintenance_title}
                    onChange={(value) =>
                      setSiteContent((current) => ({
                        ...current,
                        maintenance_title: value,
                      }))
                    }
                  />
                  <TextareaField
                    label="Pesan Maintenance"
                    rows={4}
                    value={siteContent.maintenance_message}
                    onChange={(value) =>
                      setSiteContent((current) => ({
                        ...current,
                        maintenance_message: value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </SectionFrame>

          <SectionFrame
            icon={Award}
            title="Prestasi"
            description="Kelola kartu prestasi yang tampil pada section kebanggaan Informatika."
            actions={
              <button
                type="button"
                onClick={() =>
                  setAchievements((current) => [...current, createAchievement()])
                }
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:bg-slate-50"
              >
                Tambah Prestasi
              </button>
            }
          >
            <div className="space-y-4">
              {achievements.map((item, index) => (
                <ResourceCard
                  key={item.id || `achievement-${index}`}
                  title={item.student_name || `Prestasi ${index + 1}`}
                  onSave={() => saveResource("achievements", item)}
                  onDelete={() => deleteResource("achievements", item)}
                  saving={busyKey === `achievements-${item.id || "new"}-save`}
                  deleting={busyKey === `achievements-${item.id || "new"}-delete`}
                >
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Field
                      label="Nama"
                      value={item.student_name}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, student_name: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Title"
                      value={item.title}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, title: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Peringkat"
                      value={item.rank}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, rank: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Nama Event"
                      value={item.event_name}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, event_name: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Photo URL"
                      value={item.photo_url}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, photo_url: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Urutan"
                      type="number"
                      value={item.sort_order}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, sort_order: Number(value) || 0 }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <TextareaField
                      label="Deskripsi / Quote"
                      rows={4}
                      value={item.description}
                      onChange={(value) =>
                        setAchievements((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, description: value }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                </ResourceCard>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame
            icon={Megaphone}
            title="Lomba"
            description="Kelola daftar kompetisi, link pendaftaran, tanggal badge, dan persyaratannya."
            actions={
              <button
                type="button"
                onClick={() =>
                  setCompetitions((current) => [...current, createCompetition()])
                }
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:bg-slate-50"
              >
                Tambah Lomba
              </button>
            }
          >
            <div className="space-y-4">
              {competitions.map((item, index) => (
                <ResourceCard
                  key={item.id || `competition-${index}`}
                  title={item.name || `Lomba ${index + 1}`}
                  onSave={() => saveResource("competitions", item)}
                  onDelete={() => deleteResource("competitions", item)}
                  saving={busyKey === `competitions-${item.id || "new"}-save`}
                  deleting={busyKey === `competitions-${item.id || "new"}-delete`}
                >
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Field
                      label="Nama Lomba"
                      value={item.name}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, name: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Level"
                      value={item.level}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, level: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Audience"
                      value={item.audience}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, audience: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Tanggal Badge"
                      value={item.date_label}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, date_label: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Bulan Badge"
                      value={item.month_label}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, month_label: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Urutan"
                      type="number"
                      value={item.sort_order}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, sort_order: Number(value) || 0 }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <TextareaField
                      label="Deskripsi"
                      rows={4}
                      value={item.description}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, description: value }
                              : entry
                          )
                        )
                      }
                    />
                    <TextareaField
                      label="Persyaratan"
                      rows={4}
                      value={item.requirements}
                      onChange={(value) =>
                        setCompetitions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, requirements: value }
                              : entry
                          )
                        )
                      }
                    />
                    <div className="lg:col-span-2">
                      <Field
                        label="Link Registrasi"
                        value={item.registration_url}
                        onChange={(value) =>
                          setCompetitions((current) =>
                            current.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, registration_url: value }
                                : entry
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </ResourceCard>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame
            icon={BookOpenText}
            title="Divisi"
            description="Perbarui nama, deskripsi, dan logo divisi yang muncul di section staff."
            actions={
              <button
                type="button"
                onClick={() =>
                  setDivisions((current) => [...current, createDivision()])
                }
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:bg-slate-50"
              >
                Tambah Divisi
              </button>
            }
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {divisions.map((item, index) => (
                <ResourceCard
                  key={item.id || `division-${index}`}
                  title={item.name || `Divisi ${index + 1}`}
                  onSave={() => saveResource("divisions", item)}
                  onDelete={() => deleteResource("divisions", item)}
                  saving={busyKey === `divisions-${item.id || "new"}-save`}
                  deleting={busyKey === `divisions-${item.id || "new"}-delete`}
                >
                  <div className="grid gap-4">
                    <Field
                      label="Nama Divisi"
                      value={item.name}
                      onChange={(value) =>
                        setDivisions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, name: value } : entry
                          )
                        )
                      }
                    />
                    <TextareaField
                      label="Deskripsi"
                      rows={4}
                      value={item.description}
                      onChange={(value) =>
                        setDivisions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, description: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Logo URL"
                      value={item.logo_url}
                      onChange={(value) =>
                        setDivisions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, logo_url: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Urutan"
                      type="number"
                      value={item.sort_order}
                      onChange={(value) =>
                        setDivisions((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, sort_order: Number(value) || 0 }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                </ResourceCard>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame
            icon={Users}
            title="Anggota"
            description="Kelola data anggota dan penempatan divisinya. Data ini otomatis dipakai oleh section staff."
            actions={
              <button
                type="button"
                onClick={() => setMembers((current) => [...current, createMember()])}
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:bg-slate-50"
              >
                Tambah Anggota
              </button>
            }
          >
            <div className="space-y-4">
              {members.map((item, index) => (
                <ResourceCard
                  key={item.id || `member-${index}`}
                  title={item.name || `Anggota ${index + 1}`}
                  onSave={() => saveResource("members", item)}
                  onDelete={() => deleteResource("members", item)}
                  saving={busyKey === `members-${item.id || "new"}-save`}
                  deleting={busyKey === `members-${item.id || "new"}-delete`}
                >
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Field
                      label="Nama"
                      value={item.name}
                      onChange={(value) =>
                        setMembers((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, name: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Role"
                      value={item.role}
                      onChange={(value) =>
                        setMembers((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, role: value } : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="NIM / Kode"
                      value={item.nim}
                      onChange={(value) =>
                        setMembers((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, nim: value } : entry
                          )
                        )
                      }
                    />
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Divisi
                      </span>
                      <select
                        value={item.division_id || ""}
                        onChange={(event) =>
                          setMembers((current) =>
                            current.map((entry, entryIndex) =>
                              entryIndex === index
                                ? {
                                    ...entry,
                                    division_id: Number(event.target.value) || 0,
                                  }
                                : entry
                            )
                          )
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-950"
                      >
                        <option value="">Pilih divisi</option>
                        {divisions.map((division) => (
                          <option key={division.id} value={division.id}>
                            {division.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      label="Image URL"
                      value={item.image_url}
                      onChange={(value) =>
                        setMembers((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, image_url: value }
                              : entry
                          )
                        )
                      }
                    />
                    <Field
                      label="Urutan"
                      type="number"
                      value={item.sort_order}
                      onChange={(value) =>
                        setMembers((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, sort_order: Number(value) || 0 }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                </ResourceCard>
              ))}
            </div>
          </SectionFrame>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
