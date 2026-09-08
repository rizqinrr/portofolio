# Roadmap Migrasi Portofolio: Static HTML ke React + Vite

Dokumen ini mencatat seluruh rencana dan progres migrasi website portofolio Muhammad Rizqi Nurrahman (`rizqinrr/portofolio`) dari template HTML statis menjadi arsitektur modern berbasis **React + Vite + TypeScript**, dengan tetap mempertahankan **100% tampilan visual dan styling** aslinya.

---

## 1. Ringkasan Tujuan & Keputusan

- **Visual / Styling**: Pertahankan 100% style yang ada (`style-starter.css`, font Poppins, Font Awesome, tata letak, warna, gambar). Tidak mendesain ulang dari nol.
- **Teknologi Baru**: 
  - Build Tool: Vite
  - UI Library: React 18 / 19 + TypeScript
  - Routing: React Router DOM (Single Page Application, SPA)
  - Data Layer: Array statis TypeScript (`src/data/projects.ts`) agar mudah menambah dan mengelola proyek
- **Hosting**: GitHub Pages (otomatis via GitHub Actions)
- **Base Path**: `/portofolio/` (sesuai URL repo GitHub Pages)
- **Git Strategy**: Melanjutkan riwayat commit secara normal dan bertahap.

---

## 2. Struktur Proyek Target

```
portofolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD otomatis deploy ke GitHub Pages
├── public/
│   └── assets/                 # Aset CSS, gambar, dan webfonts dipindah ke sini
│       ├── css/style-starter.css
│       ├── images/
│       ├── jpg/
│       └── webfonts/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigasi, mobile toggle, sticky header, dark/light toggle
│   │   ├── Footer.tsx          # Footer konsisten di setiap halaman
│   │   └── ProjectCard.tsx     # Komponen kartu proyek portofolio
│   ├── pages/
│   │   ├── Home.tsx            # Halaman utama (Banner, Intro, Skills, Projects Gallery)
│   │   ├── About.tsx           # Halaman My Intro & Timeline
│   │   ├── Services.tsx        # Halaman Services
│   │   └── Contact.tsx         # Halaman Contact Me
│   ├── data/
│   │   └── projects.ts         # Sumber data utama daftar proyek
│   ├── types/
│   │   └── index.ts            # Definisi tipe TypeScript
│   ├── App.tsx                 # Router & Layout Wrapper
│   ├── main.tsx                # Entry point React
│   └── index.css               # Import global & fallback styles
├── index.html                  # Shell utama Vite
├── vite.config.ts              # Konfigurasi Vite & base path
├── tsconfig.json               # Konfigurasi TypeScript
├── package.json
└── task.md                     # File tracking ini
```

---

## 3. Checklist & Status Pengerjaan

### Fase 1: Inisialisasi Proyek & Penataan Aset
- [x] Buat file `package.json` dengan dependensi React, React-DOM, React Router DOM, Vite, dan TypeScript.
- [x] Buat `tsconfig.json` dan `tsconfig.node.json`.
- [x] Buat `vite.config.ts` dengan pengaturan `base: '/portofolio/'`.
- [x] Pindahkan folder `assets/` ke `public/assets/` agar path internal CSS & font tetap terjaga.
- [x] Siapkan `index.html` root Vite yang me-load Google Font Poppins dan `/portofolio/assets/css/style-starter.css`.
- [x] Jalankan `npm install` dan pastikan dependensi terpasang.
- [x] Verifikasi tes build Vite + TypeScript (`npm run build`) berjalan sukses.

### Fase 2: Ekstraksi Komponen Global & Logic Native
- [x] Buat tipe data proyek di `src/types/index.ts`.
- [x] Buat `src/data/projects.ts` dengan template data terstruktur untuk portofolio.
- [x] Implementasikan `Navbar.tsx`:
  - [x] Porting struktur HTML navbar.
  - [x] Konversi logic scroll sticky header dari jQuery ke React (`useEffect`).
  - [x] Konversi mobile menu toggle ke state React (`useState`).
  - [x] Konversi Dark/Light theme toggle ke state React (sinkron dengan `data-theme` di `<html>`).
  - [x] Ganti navigasi `<a>` dengan `<NavLink>` / `<Link>` dari React Router.
- [x] Implementasikan `Footer.tsx` (reusable untuk semua halaman).
- [x] Setup Router & Placeholder Routes di `src/App.tsx` serta verifikasi build TypeScript.

### Fase 3: Migrasi Halaman Menjadi Komponen React (JSX)
- [ ] Buat `src/pages/Home.tsx`:
  - [ ] Porting Hero Banner & teks dinamis/ketik (typing effect).
  - [ ] Porting partner/tech logos.
  - [ ] Porting section About preview & Progress bars.
  - [ ] Render galeri proyek secara dinamis dari `src/data/projects.ts`.
- [ ] Buat `src/pages/About.tsx`:
  - [ ] Porting breadcrumb & timeline riwayat pengalaman/pendidikan.
  - [ ] Porting skill progress section.
- [ ] Buat `src/pages/Services.tsx`:
  - [ ] Porting card layanan yang ditawarkan.
- [ ] Buat `src/pages/Contact.tsx`:
  - [ ] Porting form kontak dan info alamat/social.
- [ ] Bersihkan file HTML lama yang sudah tidak dipakai (`about.html`, `services.html`, `contact.html`).

### Fase 4: Routing, Build & Otomasi GitHub Pages
- [ ] Konfigurasi `src/App.tsx` dengan `HashRouter` atau `BrowserRouter` yang mendukung base GitHub Pages.
- [ ] Uji build lokal (`npm run build`) dan pastikan tidak ada error TypeScript atau bundling.
- [ ] Buat workflow GitHub Actions `.github/workflows/deploy.yml`.
- [ ] Buat dokumentasi panduan di `README.md` (cara menjalankan lokal dan cara menambah proyek di `projects.ts`).
- [ ] Commit dan push hasil migrasi ke GitHub.
