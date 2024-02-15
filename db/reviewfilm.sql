-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Feb 2024 pada 22.29
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reviewfilm`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `judul`
--

CREATE TABLE `judul` (
  `kdJudul` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ringkasan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `publikasi` tinyint(1) NOT NULL DEFAULT 0,
  `kdMember` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kdMemberSub` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `tingkat` int(5) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `judul`
--

INSERT INTO `judul` (`kdJudul`, `judul`, `ringkasan`, `publikasi`, `kdMember`, `kdMemberSub`, `tingkat`, `created_at`, `updated_at`) VALUES
('1', 'Batminton Academik', 'Rangkaian bagian penting dalam dunia bulu tangkis', 0, 'Mw==', '', 0, '2024-02-11 05:26:46', '2024-02-11 09:45:35'),
('10', 'design apps', 'kumpulan design sebagai insfirasi', 0, 'Mw==', 'Mw==', 0, '2024-02-12 03:39:54', '2024-02-12 03:39:54'),
('11', '11', '11', 0, 'Mw==', 'Mw==', 0, '2024-02-12 03:50:39', '2024-02-12 03:50:39'),
('12', '1', '1', 0, 'Mw==', 'Mw==', 0, '2024-02-12 04:22:34', '2024-02-12 04:22:34'),
('13', '12', '122', 0, 'Mw==', 'Mw==', 0, '2024-02-12 04:23:08', '2024-02-12 04:23:08'),
('1MFC1', 'Program bimbingan', 'rangkaian kegiatan bimbingan organisasi', 0, 'Mw==', '', 1, '2024-02-12 03:08:21', '2024-02-12 03:36:11'),
('1MFC2', 'Struktur Organisasi', 'informasi kepengurusan organisasi', 0, 'Mw==', '', 1, '2024-02-12 03:31:22', '2024-02-12 03:31:22'),
('1MFC3', 'Data Peserta Didik', 'informasi berkaitan dengan peserta didik', 0, 'Mw==', '', 1, '2024-02-12 03:32:38', '2024-02-12 03:32:38'),
('1MFC4', 'kegiatan kejuaraan', 'informasi kejuaraan yang diikuti oleh organisasi', 0, 'Mw==', '', 1, '2024-02-12 03:34:50', '2024-02-12 03:34:50'),
('2', 'daftar inventaris zam zam mukmin', 'informasi alur terbentuk, pergerakan dan capaian usaha', 0, 'Mw==', '', 0, '2024-02-11 05:31:58', '2024-02-11 09:47:52'),
('2MFC1', 'uang 20 jt', 'uang bersama', 0, 'Mw==', '', 1, '2024-02-12 08:15:26', '2024-02-12 08:15:26'),
('2MFC1#1', 'wajan penggoreng kentang', '650.000 rb', 0, 'Mw==', '', 2, '2024-02-12 08:16:20', '2024-02-12 08:17:28'),
('2MFC1#2', 'alat kentang spiral', '250.000 rb', 0, 'Mw==', '', 2, '2024-02-12 08:17:13', '2024-02-12 08:17:13'),
('2MFC1#3', 'mesin tutup minuman', '600.000 rb', 0, 'Mw==', '', 2, '2024-02-12 08:18:11', '2024-02-12 08:18:11'),
('2MFC1#4', 'grobak second', '400.000', 0, 'Mw==', '', 2, '2024-02-12 08:18:27', '2024-02-12 08:18:27'),
('2MFC2', 'bantuan pemda', 'dukungan pergerakan', 0, 'Mw==', '', 1, '2024-02-12 08:15:55', '2024-02-12 08:15:55'),
('2MFC2#1', 'roda 3 HTM', 'alat bantu UMKN, berdagang', 0, 'Mw==', '', 2, '2024-02-12 08:20:33', '2024-02-12 08:20:33'),
('2MFC2#2', 'rotary drayer', 'mesin pengering padi, jagung dll', 0, 'Mw==', '', 2, '2024-02-12 08:21:05', '2024-02-12 08:21:05'),
('3', 'MFC', 'Catatan penting pengembangan sistem M Software Center', 0, 'Mw==', '', 0, '2024-02-11 05:35:09', '2024-02-11 09:49:38'),
('4', 'Data Pribadi', 'berbagai data diri untuk penyusunan yang lebih baik', 0, 'Mw==', '', 0, '2024-02-11 05:48:34', '2024-02-11 09:52:25'),
('4MFC1', 'Akun Media Software', 'informasi akun yang berhubungan dengan media dan teknologi Informasi', 0, 'Mw==', '', 1, '2024-02-12 04:55:38', '2024-02-12 04:55:38'),
('4MFC1#1', 'github', 'https://github.com/login', 0, 'Mw==', '', 2, '2024-02-12 05:43:38', '2024-02-12 05:56:27'),
('4MFC1#2', 'jagoan Hosting', 'https://member.jagoanhosting.com/clientarea.php', 0, 'Mw==', '', 2, '2024-02-12 05:54:16', '2024-02-12 05:54:16'),
('4MFC1#3', 'gmail', 'https://gmail.com', 0, 'Mw==', '', 2, '2024-02-12 05:58:01', '2024-02-12 05:58:01'),
('4MFC2', 'riwayat pendidikan', 'hal - hal yang berkaitan dengan pendidikan', 0, 'Mw==', '', 1, '2024-02-12 04:57:15', '2024-02-12 04:57:15'),
('4MFC2#1', 'ijazah', 'hasil pendidikan SD, SMP, SMA, PT', 0, 'Mw==', '', 2, '2024-02-12 07:58:08', '2024-02-12 08:01:17'),
('4MFC2#2', 'Sertifikat Pendidikan', 'kompetensi yang diikuti', 0, 'Mw==', '', 2, '2024-02-12 07:58:32', '2024-02-12 08:02:08'),
('4MFC2#3', 'materi pendidikan', 'hal yang dipelajari', 0, 'Mw==', '', 2, '2024-02-12 07:58:57', '2024-02-12 08:03:05'),
('4MFC2#4', 'hasil pendidikan', '-', 0, 'Mw==', '', 2, '2024-02-12 07:59:57', '2024-02-12 08:03:35'),
('4MFC3', 'catatan hutang', 'semua yang berhubungan dengan hak orang lain', 0, 'Mw==', '', 1, '2024-02-12 05:00:06', '2024-02-12 05:00:06'),
('4MFC3#1', 'tanah rumah', '50 jt\n22.500.000 ibu\n16.000.000 bagus\n11.500.000 ibu\ntotal = 34.000.000', 0, 'Mw==', '', 2, '2024-02-12 08:06:53', '2024-02-12 08:07:56'),
('4MFC3#2', 'jual motor king', '16.000.000', 0, 'Mw==', '', 2, '2024-02-12 08:08:35', '2024-02-12 08:08:35'),
('4MFC3#3', 'tiang lantai 2 (bapak mos)', '17.000.000\ndibayar 2.000.000\ntotal = 15.000.000', 0, 'Mw==', '', 2, '2024-02-12 08:10:11', '2024-02-12 08:10:28'),
('4MFC3#4', 'tambahan biaya bangunan desy', '11.000.000\ndibayar 5.000.000\ntotal = 6.000.000', 0, 'Mw==', '', 2, '2024-02-12 08:12:10', '2024-02-12 08:12:10'),
('4MFC3#5', 'uang bersama yang dipakai', '20 jt\n18 jt dipinjam\n2 jt belanja', 0, 'Mw==', '', 2, '2024-02-12 08:13:46', '2024-02-12 08:13:46'),
('4MFC4', 'ajaran agama islam', 'berkaitan dengan Robbulalamin', 0, 'Mw==', '', 1, '2024-02-12 05:01:29', '2024-02-12 05:02:05'),
('5', 'Daftar kegiatan kantor', 'rangkaian catatan penting yang menjadi dasar pekerjaan', 0, 'Mw==', '', 0, '2024-02-11 09:01:14', '2024-02-11 09:46:32'),
('6', 'Design', 'Kumpulan Hasil Design', 0, 'Mw==', '', 0, '2024-02-11 09:40:49', '2024-02-11 09:53:06'),
('7', 'KUE DMF', 'Berbagai jenis jajanan Desy Mulya Fitri', 0, 'Mw==', '', 0, '2024-02-11 09:41:00', '2024-02-11 09:53:54'),
('8', 'Simple Bahasa Pemograman', 'Mencakupi sekala bahasa pemograman untuk kemudahan pengembangan sistem', 0, 'Mw==', '', 0, '2024-02-11 09:41:43', '2024-02-11 09:51:22'),
('9', 'se1', 'dd2', 0, 'Mw==', 'Mw==', 0, '2024-02-11 19:27:29', '2024-02-12 03:36:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `judul_file`
--

CREATE TABLE `judul_file` (
  `kdJudul` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kdMember` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kdMemberSub` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'member ajakan yang add',
  `file` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ind` int(11) NOT NULL COMMENT 'index upload file',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `judul_user_access`
--

CREATE TABLE `judul_user_access` (
  `kdJudul` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kdMember` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kdMemberSub` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'member ajakan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_07_18_162943_create_produk', 1),
(6, '2023_10_27_150005_products', 2),
(7, '2023_10_27_150134_transactions', 3),
(13, '2024_02_11_005655_create_judul_table_', 4),
(14, '2024_02_11_005946_create_profil_table', 5),
(15, '2024_02_11_011116_create_judul_file_table', 5),
(16, '2024_02_11_011144_create_judul_user_access_table', 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `profil`
--

CREATE TABLE `profil` (
  `kdMember` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `noHP` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ind` int(11) NOT NULL COMMENT 'ind perubahan',
  `on` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quality` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `produk_id` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'bagusH', 'bgs07dev@io.com', NULL, '$2y$10$xchHs/CujVILgWx/hfq0UeVxpEeIkp8oNNGwvZypMRj52HACMeRuy', NULL, '2023-07-18 19:40:06', '2023-07-18 19:40:06'),
(3, 'BagusH', 'bagushartiansyah07@gmail.com', NULL, '$2y$10$r2Dwnszg15Xh9FiOesxRx.36mcHZdkHcGmLRFiAznqh33EvEd0wH2', NULL, '2023-11-06 22:17:06', '2023-11-06 22:17:06');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `judul`
--
ALTER TABLE `judul`
  ADD PRIMARY KEY (`kdJudul`,`kdMember`,`tingkat`);

--
-- Indeks untuk tabel `judul_file`
--
ALTER TABLE `judul_file`
  ADD PRIMARY KEY (`ind`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`ind`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`,`produk_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `judul_file`
--
ALTER TABLE `judul_file`
  MODIFY `ind` int(11) NOT NULL AUTO_INCREMENT COMMENT 'index upload file';

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `profil`
--
ALTER TABLE `profil`
  MODIFY `ind` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ind perubahan';

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
