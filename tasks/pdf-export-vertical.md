# Task: PDF Export — Vertical Document

> **⚠️ SUPERSEDED (partial)** — Orientasi final adalah **A4 landscape**, bukan portrait.
> Lihat `tasks/pdf-landscape-fix.md` untuk detail perubahan terbaru:
> landscape A4, gallery 3 kolom, `break-before: page` per chapter, chapter label
> absolute pojok kiri, dan fix preview `html.is-print`.

## Overview

Menambahkan **output PDF** dari portfolio web. Web saat ini adalah buku **horizontal** (8 halaman × 100vw×100vh, digeser `transform: translateX`). PDF yang diinginkan adalah **dokumen vertikal A4** — semua section tersusun **scroll ke bawah**, layout tetap mempertahankan look & feel web (cream/dark book aesthetic).

**Pendekatan:** render route terpisah (`?print=1`) yang menampilkan versi vertikal statis, lalu generate file `.pdf` via Playwright headless (`page.pdf()`).

**Scope:** fitur baru, aditif. **TIDAK mengubah** perilaku web horizontal sama sekali.

---

## Design Decisions (LOCKED)

| Aspek | Keputusan |
|---|---|
| Output | File `.pdf` jadi (bukan sekadar route print) |
| Ukuran | **A4 landscape** (fix di `pdf-landscape-fix.md`), konten scroll vertikal multi-halaman |
| Cover & Back Cover | Tetap **dark** (sesuai gaya web) |
| Gallery | **Grid statis 3 kolom** (fix di `pdf-landscape-fix.md`) |
| Chapter label | **Absolute pojok kiri atas** (fix di `pdf-landscape-fix.md`) |
| Page break | `break-before: page` per section (fix di `pdf-landscape-fix.md`) |
| Skills | **List teks** per kategori, tanpa ikon, tanpa penjelasan |
| Bahasa | **Inggris** |
| CSS | **class `print-*` terpisah** — tidak menyentuh CSS web |
| Lokasi PDF | `public/portfolio.pdf` (gitignored; user download manual) |
| Generator | **Playwright script** (reuse binary existing) |
| Playwright version | **1.62.1** (pin exact — match Chromium revision `1234` di PC) |
| Routing | Query param `?print=1` → `PrintDocument`, else `BookLayout` |

---

## Environment Findings (VERIFIED)

Hasil pengecekan aktual di PC user:

| Item | Status | Detail |
|---|---|---|
| MCP Playwright | ✅ Ada | `npx -y @playwright/mcp@latest`, executable → Brave |
| Brave Browser | ✅ Ada | `brave.exe` v152.1.94.121 |
| Playwright Chromium | ✅ Ada | `C:\Users\Kiki\AppData\Local\ms-playwright\chromium-1234\chrome-win64\chrome.exe` |
| Chromium headless shell | ✅ Ada | `chromium_headless_shell-1234` |
| Playwright npm pkg | ❌ Belum | Tidak ada di `node_modules` project |
| Chrome/Edge sistem | ❌ Tidak ada | Tidak terpasang |

**Browser build map (dari `browsers.json`):**

| Versi Playwright | Chromium revision | Cocok dgn PC? |
|---|---|---|
| **1.62.1** | **1234** | ✅ Match — tanpa download |
| 1.63.0 | 1243 | ❌ Butuh download ~150MB |

**Keputusan versi:** `playwright@1.62.1` (exact). Alasan:
- Binary Chromium `1234` sudah lengkap (`INSTALLATION_COMPLETE` + `DEPENDENCIES_VALIDATED`).
- Konsisten dengan `nurman-course/node_modules/playwright-core@1.62.1`.
- Konsisten dengan npx cache MCP (`playwright-core@1.62.1`).

**Catatan MCP Playwright:** hanya menyediakan tool *screenshot*, **tidak ada `page.pdf()`**. Jadi PDF asli wajib via Playwright script. MCP dipakai untuk verifikasi visual saja.

---

## Scope & Non-Goals

### In scope
- `src/pages/print/PrintDocument.tsx` — komponen dokumen vertikal (baru)
- `src/styles/print.css` — styling print terpisah (baru)
- `src/App.tsx` — routing `?print=1`
- `src/index.css` — import `print.css`
- `scripts/generate-pdf.mjs` — generator PDF (baru)
- `package.json` — devDependency `playwright@1.62.1` + script `pdf`
- `.gitignore` — abaikan `public/portfolio.pdf`

### NON-goals (JANGAN disentuh)
- `src/components/book/*` (BookLayout, Sidebar, PageIndicator)
- `src/hooks/useHorizontalScroll.ts`
- `src/pages/contents/*` (semua halaman web)
- `src/pages/cover/*` (FrontCover, BackCover web)
- `src/data/projects.ts`, `src/data/certificates.ts` — data **tidak diubah**, hanya dibaca
- Semua file `src/styles/*.css` yang ada (kecuali `index.css` untuk import baru)
- `vite.config.ts`, `tailwind.config.cjs`, `postcss.config.cjs`
- `index.html`, `public/404.html`

### Shared class bahaya (VERIFY sebelum edit)
- `src/index.css` di-edit **hanya** untuk menambah 1 baris `@import './styles/print.css'`. Jangan sentuh baris lain.
- `src/App.tsx` — file kecil (12 baris), aman di-refactor penuh.

---

## Current State (baseline)

### `src/App.tsx` (12 baris)
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLayout from './components/book/BookLayout';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="*" element={<BookLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### `src/index.css` (19 baris)
Import 14 partial `styles/*.css`, lalu 3 baris `@tailwind`.

### Data source (tidak diubah, dipakai ulang)
- `src/data/projects.ts` → `projects[]` (4 item), `experiences[]` (3 item)
- `src/data/certificates.ts` → `certificates[]` (6 item)
- `src/types/index.ts` → `Project`, `Experience`

### Kendala teknis yang harus diatasi di print
| Kendala | Sumber | Solusi di print.css |
|---|---|---|
| `html, body { overflow: hidden }` | `base.css:11` | `.print-doc` scope override `overflow: visible` |
| Halaman `100vw × 100vh` | `layout.css:19-21` | override ke `width/height: auto` |
| Flex horizontal | `layout.css:11-16` | `.print-doc` tidak pakai flex-row |
| `position: fixed` sidebar | `sidebar.css:3` | tidak render sidebar di print |
| `position: fixed` 100vh (gallery/experience) | `gallery.css:9`, `experience.css:13` | tidak dipakai; print pakai markup sendiri |
| Animasi `isActive` (opacity 0) | semua page | print render static, tanpa motion |
| `border-radius: 0 !important` global | `base.css:6` | biarkan (konsisten) |

---

## Phase 1 — Print Document Component

### File baru: `src/pages/print/PrintDocument.tsx`

Membaca data yang sama dengan web, render vertikal. **Tanpa** framer-motion, **tanpa** `isActive`.

**Struktur section (urut):**

1. **Cover** — dark
   - Nama: `MUHAMMAD RIZQI`
   - Tagline: `software engineer crafting digital experiences with intention and care`
   - Meta: `jakarta, indonesia` + `open for collaborations`
   - Format: full-page pertama, teks besar centered

2. **About** — light
   - Lead: "Hi, I'm Rizqi — a software engineer crafting digital products, web experiences, and scalable systems..."
   - Paragraf: "I care about craft — the quiet discipline reflected in clean abstractions..."
   - Foto: `getAssetUrl('assets/jpg/foto1nobg.png')`
   - Pull quote: "Code for purpose. Build for longevity."
   - Beyond: "Beyond engineering: system architecture, reading, coffee, and minimal aesthetics."

3. **Projects** — light
   - Untuk **setiap** project (4 item), card penuh:
     - Nomor (`01`–`04`) + judul + tahun + status
     - Deskripsi
     - Stack (inline, ` · ` separator)
     - Highlights (list bullet `—`)
     - Gambar project (dari `project.image`)
     - Link GitHub + Demo (kalau ada)
   - `page-break-inside: avoid` per card

4. **Experience** — light
   - Untuk **setiap** experience (3 item):
     - Role + company + type + period
     - Context
     - Highlights list
     - Stack

5. **Gallery** — light
   - Heading: `Certifications & Courses` (dummy — bisa diganti)
   - Grid **3 kolom** (landscape), 6 sertifikat:
     - Gambar (`cert.image`, `getAssetUrl`)
     - Subtitle (`cert.subtitle`)
   - `page-break-inside: avoid` per tile

6. **Skills** — light
   - Heading: `Skills & Stack` (dummy)
   - **List teks** per kategori (dummy kategori, isi dari logo data yang ada):
     - `Languages` — TypeScript, JavaScript, PHP, Python, HTML, CSS
     - `Frontend` — React, Next.js, Tailwind CSS, Framer Motion, Laravel
     - `Backend & Data` — Node.js, PostgreSQL, Supabase, Prisma
     - `Tools` — Git, Docker, Vite, Figma, Linux, VS Code
   - Format: `<dl>` atau heading + `<ul>` inline
   - **Tanpa ikon, tanpa penjelasan**

7. **Contact** — light
   - Email: `studyrizqi@gmail.com`
   - Social: GitHub, LinkedIn, Instagram (text list + URL)

8. **Back Cover** — dark
   - Colophon (4 baris): built with... / styled with... / typeset in... / deployed on...
   - Copyright: `© 2026 muhammad rizqi nurrahman`
   - Closing: `"this page intentionally left blank."`
   - Signature: teks statis "Muhammad Rizqi Nurrahman" (tanpa animasi SVG)

**Sub-components** (dalam file yang sama, agar mudah di-review):
- `PrintSection` — wrapper: heading chapter + children
- `PrintProjectCard`
- `PrintExperienceEntry`
- `PrintCertTile`
- `PrintSkillGroup`

**Dummy/placeholder policy:** semua teks yang belum final ditulis di **satu blok konstanta di atas file** agar mudah dicari & diganti:
```tsx
const PRINT_COPY = {
  galleryTitle: 'Certifications & Courses',
  skillsTitle: 'Skills & Stack',
  skillsGroups: [ ... ],
  // ...
};
```

---

## Phase 2 — Print Styles

### File baru: `src/styles/print.css`

Semua selector di-scope ke `.print-doc` agar tidak bocor ke web.

```css
/* ─── Print Document (Vertical A4) ──────────────────────── */
.print-doc { ... }

@page { size: A4 portrait; margin: 16mm; }

@media print {
  .book-sidebar, .book-page-indicator { display: none !important; }
}
```

**Rules inti:**
- `.print-doc` — `background: var(--bg-content)`, `color: var(--text-content)`, font body, `max-width: 297mm`, `margin: 0 auto`, outline `box-shadow`
- `html.is-print, body.is-print` — buka viewport-lock: `overflow: visible !important`, `height: auto !important`, bg putih (**level atas, bukan di dalam `@media print`**)
- `.print-section` — `position: relative`, `padding: 16mm`, `break-before: page`
- `.print-section-head` — `position: absolute`, `top/left: 16mm` (label pojok kiri)
- Konten section — `padding-left: 38mm` agar tidak menabrak label
- `.print-card`, `.print-cert-tile` — `break-inside: avoid`
- `.print-cover` / `.print-backcover` — dark bg, `min-height: 178mm` (A4 landscape − padding)
- `.print-gallery-grid` — `display: grid; grid-template-columns: repeat(3, 1fr)`
- Tipografi: ukuran **px/pt tetap** (bukan `vw`) supaya konsisten di kertas

**Breakpoint:** print.css **tanpa** media query responsif (ukuran kertas tetap). Hanya `@page` + `@media print` untuk sembunyikan sidebar/indicator.

---

## Phase 3 — Routing

### Edit: `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLayout from './components/book/BookLayout';
import PrintDocument from './pages/print/PrintDocument';

export default function App() {
  const isPrint = new URLSearchParams(window.location.search).get('print') === '1';

  if (isPrint) return <PrintDocument />;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="*" element={<BookLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**URL:**
- Web: `https://rizqinrr.github.io/portofolio/`
- Print: `https://rizqinrr.github.io/portofolio/?print=1`
- Dev: `http://localhost:5173/?print=1`

**Kenapa query param, bukan route `/print`?** GitHub Pages SPA + `basename` bikin route path rawan 404 di reload. Query param aman di semua host (GH Pages & Vercel).

### Edit: `src/index.css`

Tambah 1 baris di akhir daftar import partial:
```css
@import './styles/print.css';
```

---

## Phase 4 — PDF Generator Script

### File baru: `scripts/generate-pdf.mjs`

```js
// Pseudo-flow
1. Tentukan target URL:
   - arg ke-2 (CLI): node scripts/generate-pdf.mjs http://localhost:4173/?print=1
   - default: http://localhost:4173/?print=1  (vite preview default)
2. launch chromium (default binary, revision 1234)
3. newPage
4. goto(url, { waitUntil: 'networkidle' })
5. await page.evaluate(() => document.fonts.ready)
6. await page.emulateMedia({ media: 'print' })
7. `await page.pdf({
     path: 'public/portfolio.pdf',
     format: 'A4',
     landscape: true,
     printBackground: true,
     margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
   })`
8. Log path + ukuran file
```

**Detail penting:**
- `printBackground: true` — wajib, cover dark & tile butuh background.
- `networkidle` + `document.fonts.ready` — memastikan Google Fonts & gambar selesai dimuat.
- Brave **tidak** dipakai; pakai Chromium bundled Playwright (revision 1234).
- Script harus jalan cross-platform (Windows OK) — pakai API Playwright, bukan shell.

### Edit: `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "pdf": "node scripts/generate-pdf.mjs"
},
"devDependencies": {
  "playwright": "1.62.1",
  ...
}
```

**Catatan:** pin `"playwright": "1.62.1"` (tanpa `^`).

### Edit: `.gitignore`

Tambah:
```
# Generated PDF
public/portfolio.pdf
```

---

## Phase 5 — Build & Run Flow

Urutan pemakaian:

```powershell
# 1. Install dep (sekali)
npm install

# 2. Build web (termasuk route print)
npm run build

# 3. Jalankan preview server (terminal terpisah, biarkan jalan)
npm run preview          # default: http://localhost:4173

# 4. Generate PDF
npm run pdf              # → public/portfolio.pdf
```

Alternatif: `npm run dev` (port 5173) lalu
`node scripts/generate-pdf.mjs http://localhost:5173/?print=1`

**Belum masuk scope:** otomatisasi CI (generate PDF saat deploy). Dicatat sebagai *future enhancement*.

---

## Phase 6 — Verification Checklist

### Build
- [ ] `npm install` sukses, `playwright@1.62.1` terpasang tanpa download browser
- [ ] `npm run build` sukses (`tsc -b` + `vite build`), tanpa error TS
- [ ] `dist/` berisi bundle normal (route print ter-bundle)

### Print route (browser)
- [ ] `?print=1` menampilkan dokumen vertikal, semua 8 section ada
- [ ] Web normal (`/`) tidak berubah sedikit pun
- [ ] Tidak ada scrollbar horizontal
- [ ] Gambar tampil semua (project 4/4, certificat 6/6, foto 1/1)

### PDF output
- [ ] `npm run pdf` menghasilkan `public/portfolio.pdf`
- [ ] Ukuran halaman A4 portrait
- [ ] Cover dark di halaman pertama
- [ ] Back cover dark di halaman terakhir
- [ ] Gallery tampil **grid 2 kolom**, rapi
- [ ] Skills tampil **list teks** (bukan marquee)
- [ ] Tidak ada card/tile terpotong di tengah (page-break)
- [ ] Background (dark cover, abu-abu tile) ikut ter-print
- [ ] Font (Playfair Display, Inter) ter-render benar

### Visual (MCP Playwright)
- [ ] Screenshot `?print=1` full-page untuk perbandingan
- [ ] Cek tidak ada elemen meluber keluar margin

---

## File Change Matrix

| File | Aksi | Risiko |
|---|---|---|
| `src/pages/print/PrintDocument.tsx` | **Baru** | Rendah — file terisolasi |
| `src/styles/print.css` | **Baru** | Rendah — semua di-scope `.print-doc` |
| `scripts/generate-pdf.mjs` | **Baru** | Rendah — script standalone |
| `src/App.tsx` | Edit | Sedang — entry point; perubahan minimal & guarded |
| `src/index.css` | Edit (+1 baris) | Rendah |
| `package.json` | Edit | Rendah |
| `.gitignore` | Edit | Rendah |
| `public/portfolio.pdf` | **Generated** | Tidak di-commit |

---

## Risks & Mitigations

| Risiko | Mitigasi |
|---|---|
| `playwright@1.62.1` tetap ingin download browser | Verifikasi `PLAYWRIGHT_BROWSERS_PATH` default ke `%LOCALAPPDATA%\ms-playwright`; binary 1234 sudah ada |
| Gambar tidak muncul di PDF | `networkidle` + tunggu `img.complete` semua sebelum `page.pdf()` |
| Font fallback ke serif generic | Tunggu `document.fonts.ready` |
| Dark background hilang | `printBackground: true` |
| Page-break memotong card | `break-inside: avoid` di card/tile |
| CSS print bocor ke web | Semua selector prefix `.print-doc` |
| `?print=1` bentrok dengan router | Deteksi sebelum `<BrowserRouter>` di-render (early return) |

---

## Rollback Strategy

Semua perubahan aditif & terisolasi. Rollback = hapus 3 file baru + revert 4 edit:

1. Hapus `src/pages/print/PrintDocument.tsx`
2. Hapus `src/styles/print.css`
3. Hapus `scripts/generate-pdf.mjs`
4. Revert `src/App.tsx` ke versi asli (12 baris)
5. Hapus baris import di `src/index.css`
6. Revert `package.json` (hapus dep + script)
7. Revert `.gitignore`

Tidak ada perubahan pada data, layout web, atau komponen web → web dijamin tetap utuh.

---

## Handoff: Yang Perlu Dikoreksi User Sebelum/Sesudah Eksekusi

Marker dummy di `PRINT_COPY` (`PrintDocument.tsx`) yang **wajib di-review**:

- [ ] Judul section Gallery: `Certifications & Courses`
- [ ] Judul section Skills: `Skills & Stack`
- [ ] Kategori Skills (4 grup): nama & isi item
- [ ] Footer page number format
- [ ] Apakah project card perlu link Demo (data `demoUrl` saat ini kosong)
- [ ] Apakah sertifikat perlu nomor urut / penerbit
- [ ] Urutan section final
- [ ] Cover print: apakah perlu tanggal cetak

---

## Future Enhancements (OUT OF SCOPE)

- Generate PDF otomatis saat GitHub Actions deploy
- Tombol "Download PDF" di web
- Light-mode version untuk hemat tinta (saat ini cover tetap dark by request)
- Pilihan ukuran kertas (A4/Letter)
- Watermark / metadata PDF (title, author)

---

## Estimasi Task Breakdown (urut eksekusi)

1. **T1** — `npm i -D playwright@1.62.1` (verify tidak download browser)
2. **T2** — Buat `src/styles/print.css` (kerangka + `@page` + reset viewport)
3. **T3** — Buat `src/pages/print/PrintDocument.tsx` (semua 8 section + `PRINT_COPY`)
4. **T4** — Edit `src/App.tsx` (routing) + `src/index.css` (import)
5. **T5** — Verify `npm run build` bersih; buka `?print=1` di dev
6. **T6** — Buat `scripts/generate-pdf.mjs` + script `pdf` di `package.json`
7. **T7** — Update `.gitignore`
8. **T8** — Jalankan `npm run build` + `preview` + `pdf`; verify output PDF
9. **T9** — (Opsional) Screenshot via MCP Playwright untuk verifikasi visual
10. **T10** — Laporkan hasil + daftar dummy yang perlu dikoreksi user
