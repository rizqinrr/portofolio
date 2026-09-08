# Portfolio Website - Muhammad Rizqi Nurrahman

Website portofolio pribadi modern yang dibangun ulang menggunakan **React**, **Vite**, dan **TypeScript** dengan mempertahankan 100% desain, tipografi, dan aset visual aslinya. Proyek ini mendukung Single Page Application (SPA), Dark Mode, responsive mobile view, galeri interaktif, dan terintegrasi otomatis dengan **GitHub Actions** untuk deployment ke **GitHub Pages**.

🔗 **Demo Live:** [https://rizqinrr.github.io/portofolio/](https://rizqinrr.github.io/portofolio/)

---

## 🚀 Fitur Utama

- **Vite + React 19 + TypeScript**: Arsitektur komponen modular, tipe data ketat, dan performa bundling super cepat.
- **Responsive Navigation & Dark Mode**: Sticky header otomatis saat scroll, toggler mobile responsif, dan dark/light mode toggle dengan penyimpanan `localStorage`.
- **Hero Interaktif**: Animasi mengetik dinamis (*Typing Effect*) murni React (`TypingText.tsx`).
- **Galeri Portofolio & Sertifikat**: Tab filter kategori (*All*, *Projects*, *Certificates*) dengan modal popup lightbox interaktif (`GalleryModal.tsx`).
- **Data Driven**: Seluruh proyek dan sertifikat tersentralisasi di folder `src/data/`, memudahkan update konten tanpa mengubah JSX.
- **Otomasi CI/CD**: Workflow deployment GitHub Actions langsung ke GitHub Pages saat push ke branch `main`.
- **SPA Fallback**: Dilengkapi skrip redirect `404.html` agar tidak error 404 saat pengguna merefresh halaman di sub-rute GitHub Pages.

---

## 📂 Struktur Direktori

```text
portofolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD otomatis ke GitHub Pages
├── public/
│   ├── 404.html              # Fallback router SPA GitHub Pages
│   └── assets/               # CSS asli, webfonts, ikon, dan gambar statis
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Navigasi, Dark Mode, & Mobile Menu
│   │   ├── Footer.tsx        # Footer & Back to top button
│   │   ├── TypingText.tsx    # Animasi ketik hero section
│   │   └── GalleryModal.tsx  # Lightbox preview gambar
│   ├── data/
│   │   ├── projects.ts       # Data proyek & link repository
│   │   └── certificates.ts   # Data sertifikat asli
│   ├── pages/
│   │   ├── Home.tsx          # Halaman beranda
│   │   ├── About.tsx         # Profil, timeline riwayat, dan skills
│   │   ├── Services.tsx      # Layanan & galeri karya
│   │   └── Contact.tsx       # Info kontak & form
│   ├── types/
│   │   └── index.ts          # TypeScript interface
│   ├── App.tsx               # Konfigurasi routing
│   └── main.tsx              # Entry point aplikasi
├── vite.config.ts            # Base path & plugin Vite
├── package.json
└── README.md
```

---

## 🛠️ Menjalankan Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18+ disarankan).

1. **Clone repository:**
   ```bash
   git clone https://github.com/rizqinrr/portofolio.git
   cd portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Akses `http://localhost:5173/portofolio/` di browser.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   Hasil build akan dibuat di direktori `dist/`.

---

## ✍️ Cara Menambah / Mengubah Konten

### Menambah Proyek Baru
Buka file `src/data/projects.ts` dan tambahkan objek proyek baru ke dalam array `projects`:
```typescript
{
  id: 'new-project',
  title: 'Judul Proyek Anda',
  category: 'Web App',
  description: 'Deskripsi singkat mengenai proyek.',
  image: '/portofolio/assets/images/foto_proyek.png',
  technologies: ['React', 'TypeScript', 'Tailwind'],
  liveUrl: 'https://...',
  githubUrl: 'https://github.com/rizqinrr/...'
}
```

### Menambah Sertifikat Baru
Simpan file gambar sertifikat di `public/assets/images/` lalu buka `src/data/certificates.ts`:
```typescript
{
  id: 'cert-7',
  title: 'Nama Pelatihan / Sertifikat',
  issuer: 'Penyelenggara (Dicoding / Coursera / dll)',
  year: '2026',
  image: '/portofolio/assets/images/nama_sertifikat.jpg'
}
```

---

## 🌐 Konfigurasi GitHub Pages

Untuk memastikan GitHub Pages aktif:
1. Masuk ke tab **Settings** di repository GitHub: `https://github.com/rizqinrr/portofolio/settings/pages`.
2. Pada bagian **Build and deployment > Source**, pilih opsi **GitHub Actions**.
3. Setiap kali ada commit baru yang di-push ke branch `main`, GitHub Actions akan otomatis melakukan build dan deploy.
