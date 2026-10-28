# 🚀 3D Creative Developer Portfolio — Laravel 12

Portofolio web interaktif 3D modern yang terinspirasi dari video TikTok [vt.tiktok.com/ZSgpFm4XY](https://vt.tiktok.com/ZSgpFm4XY/) milik **Muhammad Al-Fari Yusuf** ([alfari.my.id](https://alfari.my.id)).

Kini telah direstrukturisasi menggunakan **Laravel 12** sebagai backend & framework utama, terintegrasi penuh dengan **React**, **Three.js**, **GSAP**, **Tailwind CSS**, dan **VS Code**.

---

## 🛠️ Tech Stack

- **Backend / Framework:** [Laravel 12](https://laravel.com/) (`v12.70.2`) dengan PHP 8.3+
- **Frontend & UI:** [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi & Grafis 3D:** [Three.js](https://threejs.org/) (Interactive Verlet Physics Lanyard ID Badge) & [GSAP](https://gsap.com/)
- **Font & Widget:** [Lucide Icons](https://lucide.dev/) + Google Fonts API (`Space Grotesk`, `Inter`, `JetBrains Mono`) + Spotify Embed Widget
- **Konektor Asset:** [Laravel Vite Plugin](https://laravel.com/docs/vite) (`@viteReactRefresh`, `@vite`)
- **IDE:** Visual Studio Code (lengkap dengan konfigurasi `.vscode/tasks.json` dan `.vscode/launch.json`)

---

## 💻 Panduan Menjalankan di Visual Studio Code (VS Code)

Proyek ini telah dikonfigurasi secara khusus agar Anda dapat menjalankannya dengan mudah di **VS Code** menggunakan beberapa opsi:

### Opsi 1: Menjalankan via Terminal VS Code (Paling Cepat & Fleksibel)

Buka folder proyek ini di VS Code (`File > Open Folder...` -> pilih folder `Portoweb`), lalu buka terminal terintegrasi (**Ctrl + \`** atau menu `Terminal > New Terminal`):

```bash
# Cukup 1 perintah untuk menjalankan Laravel & Vite secara bersamaan:
npm start
```

*Perintah di atas akan menjalankan `php artisan serve` (port 8000) dan `npm run dev` (Vite) secara serentak.*

Setelah itu, buka browser Anda pada alamat:
👉 **`http://127.0.0.1:8000`**

---

### Opsi 2: Menjalankan via Fitur Run / F5 di VS Code

1. Buka folder `Portoweb` di VS Code.
2. Buka tab **Run & Debug** di bilah kiri (**Ctrl + Shift + D**).
3. Pilih konfigurasi: **Launch Portfolio (Chrome)** atau **Launch Portfolio (Edge)**.
4. Tekan tombol **Play hijau (F5)**.
5. VS Code akan otomatis mengeksekusi task backend/frontend dan membuka browser ke `http://127.0.0.1:8000`.

---

### Opsi 3: Menjalankan via VS Code Task (Ctrl + Shift + B)

1. Tekan kombinasi tombol **Ctrl + Shift + B** di VS Code.
2. Pilih task default: **Run Portfolio (Laravel 12 + Vite)**.
3. Terminal khusus akan muncul di panel bawah VS Code dan menjalankan server.

---

### Opsi 4: Menjalankan Perintah Secara Terpisah

Jika Anda ingin membuka 2 tab terminal terpisah di VS Code:

- **Terminal 1 (Laravel 12 Backend):**
  ```bash
  php artisan serve
  ```
- **Terminal 2 (Vite Frontend Hot-Reload):**
  ```bash
  npm run dev
  ```

---

## 📁 Struktur Direktori Laravel 12

```text
Portoweb/
├── .vscode/                     # Konfigurasi VS Code (Tasks, Launch F5, Settings)
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── app/                         # Logic PHP Laravel 12
├── bootstrap/                   # Bootstrap framework & CSRF route config
├── config/                      # Konfigurasi aplikasi
├── database/                    # SQLite database & migrations
├── public/                      # Entrypoint web & aset publik
│   ├── assets/                  # Tekstur kartu 3D (frontCard, backCard, band, gambar proyek)
│   ├── build/                   # Hasil build aset terkompilasi
│   ├── index.php                # Entrypoint Laravel
│   └── .htaccess
├── resources/
│   ├── css/
│   │   └── app.css              # Styling Tailwind CSS v4 & custom keyframes
│   ├── js/
│   │   ├── components/          # Komponen React (Lanyard, Hero, About, Portfolio, Spotify, Contact, Footer)
│   │   │   ├── Lanyard.jsx      # 3D Interactive Lanyard (Three.js physics)
│   │   │   ├── Navbar.jsx       # Floating Glass Navbar & Web Audio SFX
│   │   │   ├── Hero.jsx         # Hero section & Typewriter
│   │   │   ├── About.jsx        # About me & education timeline
│   │   │   ├── Portfolio.jsx    # Projects modal with confetti & tab filters
│   │   │   ├── SpotifyWidget.jsx# Spotify playlist embed & audio equalizer bars
│   │   │   ├── Contact.jsx      # Formulir kontak terhubung ke Laravel API
│   │   │   └── Footer.jsx       # Tech stack credits & back-to-top
│   │   ├── data/
│   │   │   └── portfolioData.js # Sumber data biodata, proyek, sertifikat, & lagu
│   │   ├── PortfolioApp.jsx     # Root React app dengan GSAP entrance
│   │   └── app.jsx              # Entrypoint render React ke #root
│   └── views/
│       └── welcome.blade.php    # Blade layout utama dengan directive @vite
├── routes/
│   └── web.php                  # Route '/' dan API endpoint POST '/api/contact'
├── composer.json                # Dependensi PHP (Laravel 12)
├── package.json                 # Dependensi Node (React, Three.js, GSAP, Tailwind v4)
└── vite.config.js               # Konfigurasi Vite & Laravel React Plugin
```

---

## 🌐 Endpoint & API Backend Laravel 12

- **`GET /`**: Menampilkan halaman portofolio interaktif dengan rendering komponen React 3D.
- **`POST /api/contact`**: Menerima kiriman pesan formulir kontak, melakukan validasi server-side (`name`, `email`, `message`), dan mencatat log kiriman pesan.

---

## 🎨 Kustomisasi Data & Tekstur

1. **Ubah Data Portofolio:** Buka file [`resources/js/data/portfolioData.js`](file:///c:/Users/fabia/OneDrive/Documents/Portoweb/resources/js/data/portfolioData.js).
2. **Ganti Tekstur ID Card 3D Lanyard:**
   - Kartu Depan: `public/assets/frontCard.png`
   - Kartu Belakang: `public/assets/backCard.png`
   - Tali Gantungan: `public/assets/band.png`
3. **Build Aset Produksi:**
   ```bash
   npm run build
   ```
