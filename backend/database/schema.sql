-- 1. BERSIHKAN DATA LAMA (RESET)
-- Perintah ini akan menghapus isi tabel members, divisions, dan achievements lalu mereset ID ke 1 lagi.
TRUNCATE TABLE members, divisions, achievements RESTART IDENTITY CASCADE;


-- 2. INSERT DATA DIVISI (Termasuk BPH)
-- Kita set ID secara manual agar nanti mudah menghubungkan anggotanya
INSERT INTO divisions (id, name, description, logo_url) VALUES
(1, 'BPH', 'Badan Pengurus Harian HMIF', 'logo_bph.jpg'),
(2, 'PSDM', 'Divisi yang fokus pada pengembangan softskill dan hardskill anggota HMTI', 'logo_psdm.jpg'),
(3, 'Kominfo', 'Divisi yang mengelola informasi dan komunikasi internal-eksternal HMTI', 'logo_kominfo.jpg'),
(4, 'Humas', 'Divisi yang membangun relasi dengan pihak eksternal dan sponsorship', 'logo_humas.jpg'),
(5, 'Ristek', 'Divisi yang fokus pada penelitian dan pengembangan teknologi', 'logo_ristek.jpg'),
(6, 'KWU', 'Divisi yang mengembangkan jiwa entrepreneurship mahasiswa', 'logo_kwu.jpg'),
(7, 'MinatBakat', 'Divisi yang mewadahi minat dan bakat mahasiswa', 'logo_minatbakat.jpg');

-- (Catatan: Untuk MinatBakat, saya buatkan ID sendiri meskipun datanya di JS Anda duplikat dari KWU)


-- 3. INSERT ANGGOTA BPH (Ke Division ID 1)
INSERT INTO members (division_id, name, role, nim) VALUES
(1, 'Naufal Alam Haidar', 'Ketua HMIF', 'NH'),
(1, 'Muhammad Sahbilul Khoir', 'Wakil Ketua', 'SK'),
(1, 'Latifah Nur Qalbi', 'Sekretaris 1', 'LQ'),
(1, 'Achmad Ricky Hariono', 'Sekretaris 2', 'RH'),
(1, 'Muhammad Rafli Afriansyah', 'Bendahara 1', 'RA'),
(1, 'Regita Lundi Tifara', 'Bendahara 2', 'RT');


-- 4. INSERT ANGGOTA PSDM (Ke Division ID 2)
INSERT INTO members (division_id, name, role) VALUES
(2, 'Muhammad Bimo Adyatma Broto', 'Ketua'),
(2, 'Abinaya Arya Zaidan', 'Anggota'),
(2, 'Ratna Agustina', 'Anggota'),
(2, 'Muhammad Arya Ivandi Rohman', 'Anggota'),
(2, 'Muhammad Daniel Arya', 'Anggota'),
(2, 'Raafa Nabil Rabbani', 'Anggota'),
(2, 'Raditya Fahrezi Putra Ahsan', 'Anggota'),
(2, 'Fidyah Afifah Azis', 'Anggota'),
(2, 'Rhenita Theresia Grace B', 'Anggota');


-- 5. INSERT ANGGOTA KOMINFO (Ke Division ID 3)
INSERT INTO members (division_id, name, role) VALUES
(3, 'Arya Putra Irwansyah', 'Ketua'),
(3, 'Muhammad Amirun Nadhif', 'Anggota'),
(3, 'Rasendriyo Reswara Iriawanto', 'Anggota'),
(3, 'Ahmad Nazar Khoirul Amin', 'Anggota'),
(3, 'Azka Liano', 'Anggota'),
(3, 'Lilyana Fitria Sari', 'Anggota'),
(3, 'Angga Dwi Putra', 'Anggota'),
(3, 'Agustia Eriani', 'Anggota');


-- 6. INSERT ANGGOTA HUMAS (Ke Division ID 4)
INSERT INTO members (division_id, name, role) VALUES
(4, 'Miftahul Ulum', 'Ketua'),
(4, 'Gizha Nasywa Islamy Pasya', 'Anggota'),
(4, 'Moh Farizal Sholahuddin Ghoni', 'Anggota'),
(4, 'Ahmad Andi Alfiansyah', 'Anggota'),
(4, 'Muhammad Riyash Kediri Al Qu', 'Anggota'),
(4, 'Muhammad Rizqi Fadhlilah', 'Anggota'),
(4, 'Rendy Hikmawan Saputro', 'Anggota'),
(4, 'Alfian Khusnul Fatoni', 'Anggota');


-- 7. INSERT ANGGOTA RISTEK (Ke Division ID 5)
INSERT INTO members (division_id, name, role) VALUES
(5, 'Rahmansyah Ragil Cahyadi', 'Ketua'),
(5, 'Alicya Khusnul Chotimah', 'Anggota'),
(5, 'Rio Octavian Mangembulude', 'Anggota'),
(5, 'Achmad Zacky Ghoutsu', 'Anggota'),
(5, 'Nia Ramadani', 'Anggota'),
(5, 'Nuruddin Rusydi Ilham', 'Anggota'),
(5, 'Okta Putra Ramadhan', 'Anggota');


-- 8. INSERT ANGGOTA KWU (Ke Division ID 6)
INSERT INTO members (division_id, name, role) VALUES
(6, 'Ruziqna Hadika Filardi Muhtarom', 'Ketua'),
(6, 'Muhammad Fakhrudin', 'Anggota'),
(6, 'Muhammad Muqoffin Nuha', 'Anggota'),
(6, 'Amelia Ma''rifah', 'Anggota'), -- Tanda kutip ' harus di-escape jadi '' di SQL
(6, 'Muhammad Awaludin Ikbar', 'Anggota'),
(6, 'Muhammad Faidza Airlangga', 'Anggota'),
(6, 'Naila Nur Hidayah', 'Anggota'),
(6, 'Arfanta Pradana Putra Bayu', 'Anggota');


-- 9. INSERT ANGGOTA MINAT BAKAT (Ke Division ID 7)
-- (Data disamakan dengan KWU sesuai request data Anda)
INSERT INTO members (division_id, name, role) VALUES
(7, 'Ruziqna Hadika Filardi Muhtarom', 'Ketua'),
(7, 'Muhammad Fakhrudin', 'Anggota'),
(7, 'Muhammad Muqoffin Nuha', 'Anggota'),
(7, 'Amelia Ma''rifah', 'Anggota'),
(7, 'Muhammad Awaludin Ikbar', 'Anggota'),
(7, 'Muhammad Faidza Airlangga', 'Anggota'),
(7, 'Naila Nur Hidayah', 'Anggota'),
(7, 'Arfanta Pradana Putra Bayu', 'Anggota');


-- 10. INSERT PRESTASI
INSERT INTO achievements (student_name, title, rank, description, photo_url) VALUES
('Muhammad Faidza Airlangga', 'UPZ BAZNAS SEMEN INDONESIA', 'PENERIMA BEASISWA', 'Teruslah belajar.', '/images/faidza.jpg'),
('Muhammad Arya Ivandy Rohman', 'Ketua Pelaksana LKMM PRA-TD UISI 2025', 'Terpilih', 'Desain adalah solusi.', '/images/arya.jpg'),
('Puji Andayani, S.Si., M.Si., M.Sc., MCE, MOS', 'Dosen Teladan UISI 2025', 'SIG FOUNDATION', 'Kolaborasi adalah kunci.', '/images/dosen.jpg');