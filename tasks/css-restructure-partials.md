# Task: Restructure index.css → Partial Files

## Goal

Pecah `src/index.css` (1164 baris, 1 file) jadi partial files di `src/styles/`, supaya lebih gampang di-debug.

**Constraint: TANPA mengubah UI, logika, nilai CSS, atau nama class sedikitpun.**

---

## Design Decisions (LOCKED)

| Aspek | Keputusan |
|---|---|
| Pendekatan | **B. Split partial files** di `src/styles/` |
| Dead CSS | **Dipertahankan** (tidak dihapus) — pindah ke `projects.css` di posisi semula |
| Rename class | **Tidak** — nol perubahan `.tsx` |
| Media query | **Tetap 1 blok** `@media (max-width:768px)` di `responsive.css`, dikelompokkan + komentar per halaman |
| Entry file | Tetap `src/index.css` (sudah di-import `main.tsx`) |

---

## Fakta Teknis (terverifikasi)

- **Vite 6** sudah bundle `postcss-import` → `@import` di CSS di-resolve otomatis. **Tidak perlu ubah `postcss.config.cjs`.**
- `postcss-import` hoist `@import` ke atas → aman meski `@tailwind` ada di atas import.
- **Tidak ada utility Tailwind di markup** (grep = false positive). `@tailwind` hanya emit nyaris kosong karena `preflight: false`.
- `main.tsx:4` → `import './index.css'` → entry tidak berubah.

---

## Aturan Anti-UI-Berubah (KRITIS)

1. **Nilai deklarasi disalin PERSIS** — angka, hex, unit, `!important`, spasi formatting tidak masalah tapi nilai harus identik.
2. **Urutan import partial = urutan blok asli** di `index.css`. Ini menjaga winner/loser cascade tetap sama.
3. **Override order kritis** — contoh: `.chapter-subtitle` (content-base) HARUS sebelum `.experience-page .chapter-subtitle` (experience). Specificity lebih tinggi memang menang, tapi tetap jaga urutan.
4. **`responsive.css` PALING AKHIR** — semua `@media` di situ.
5. **Dead CSS tetap ada** — `projects.css` memuat semua `.toc-*` termasuk yang tak terpakai sekarang.
6. Reset `* { border-radius: 0 !important }` tetap di `base.css`, dan `.exp-marker { border-radius: 50% !important }` tetap di `experience.css` (sesudahnya secara urutan file).

---

## Mapping Baris → File (sumber: `src/index.css` 1164 baris)

| # | File baru | Sumber baris asli | Isi |
|---|---|---|---|
| 0 | `src/index.css` (entry) | 1-3 | `@tailwind` directives + `@import` partials |
| 1 | `src/styles/tokens.css` | 5-20 | `:root` design tokens |
| 2 | `src/styles/base.css` | 22-39 | Reset `*`, `html, body` |
| 3 | `src/styles/layout.css` | 41-48, 164-181 | `.book-layout`, `.book-pages`, `.book-page` |
| 4 | `src/styles/sidebar.css` | 50-162 | `.book-sidebar` + semua `.sidebar-*` |
| 5 | `src/styles/cover.css` | 183-298 | `.cover-*`, `.colophon-*`, `.signature-*` |
| 6 | `src/styles/content-base.css` | 300-336 | `.book-page-content`, `.chapter-header`, `.chapter-label`, `.chapter-subtitle` |
| 7 | `src/styles/about.css` | 338-459 | `.about-*`, `.photo-frame`, `.sticker-effect` |
| 8 | `src/styles/skills.css` | 461-511 | `.skills-*` |
| 9 | `src/styles/projects.css` | 513-742 | `.projects-*`, `.toc-*` (termasuk dead CSS) |
| 10 | `src/styles/contact.css` | 744-797 | `.contact-*` |
| 11 | `src/styles/gallery.css` | 799-876 | `.gallery-*` |
| 12 | `src/styles/experience.css` | 878-1035 | `.experience-*`, `.exp-*` |
| 13 | `src/styles/page-indicator.css` | 1037-1048 | `.book-page-indicator` |
| 14 | `src/styles/responsive.css` | 1050-1164 | seluruh `@media (max-width: 768px)` |

**Catatan urutan:** Section "Cover" (183-298) muncul sebelum "Content base" (300-336) di file asli. Urutan ini dipertahankan.

---

## Struktur `src/index.css` (entry) — hasil akhir

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './styles/tokens.css';
@import './styles/base.css';
@import './styles/layout.css';
@import './styles/sidebar.css';
@import './styles/cover.css';
@import './styles/content-base.css';
@import './styles/about.css';
@import './styles/skills.css';
@import './styles/projects.css';
@import './styles/contact.css';
@import './styles/gallery.css';
@import './styles/experience.css';
@import './styles/page-indicator.css';
@import './styles/responsive.css';
```

---

## Contoh isi tiap file

### `tokens.css`
```css
/* ─── Design Tokens ─────────────────────────────────────── */
:root {
  --bg-cover: #222222;
  /* ... PERSIS baris 6-20 asli ... */
}
```

### `projects.css` (awal)
```css
/* ─── Projects Page (TOC + Preview) ─────────────────────── */
/* Table of Contents — shared TOC entries (used by Projects) */
/* Projects Split Layout — TOC left + preview frame right */
.projects-split { /* ... baris 515-523 asli ... */ }
/* ... termasuk .toc-detail, .toc-company, .toc-desc, .toc-stack, .toc-highlights, dst (dead CSS tetap) ... */
```

### `responsive.css` (struktur, dengan komentar per halaman)
```css
/* ─── Responsive (max-width: 768px) ─────────────────────── */
@media (max-width: 768px) {
  /* Tokens override */
  :root { --sidebar-width: 62px; --spacing-unit: 24px; }

  /* Sidebar */
  .sidebar-center { font-size: 9px; }
  /* ... */

  /* Cover */
  .cover-name { /* ... */ }

  /* Skills */
  .skills-marquee { left: 0; gap: 24px; }
  /* ... */

  /* Projects */
  .toc-leader { display: none; }
  /* ... */

  /* Gallery */
  .gallery-scroll { width: 100%; border-left: none; border-right: none; }
  /* ... */

  /* Experience */
  .experience-list { /* ... */ }
  /* ... */
}
```

---

## Execution Steps (urut)

1. **Buat folder** `src/styles/`.
2. **Ekstrak tiap blok** dari `src/index.css` ke file sesuai mapping (baris 1 di atas). Salin **persis** nilai & isi.
   - Urutan pembuatan bebas, tapi isi harus lengkap dari baris yang dipetakan.
   - Jangan lupa memindahkan komentar section asli (`/* ─── ... ─── */`).
3. **Tambah header komentar** di tiap file baru (`/* ─── Projects Page ─── */`) kalau belum ada — hanya komentar, tidak mengubah rule.
4. **Tulis ulang** `src/index.css` jadi entry (`@tailwind` + 14 `@import`).
5. **Bersihkan komentar basi** di `projects.css` (aslinya baris 513-514 duplikat/nyempil) — hanya teks komentar.
6. **Build:**
   ```bash
   npm run build
   ```
7. **Verify** (lihat checklist).

---

## Verification Checklist

### Build
- [ ] `npm run build` sukses (tsc + vite), 0 error
- [ ] `dist/assets/*.css` terbentuk dan berisi rule partials (bukan kosong)

### Cascade / Nilai
- [ ] Output CSS total ukuran setara sebelum refactor (± beberapa byte karena komentar/whitespace)
- [ ] Rule kunci ada di `dist` CSS:
  - [ ] `.exp-context::first-letter`
  - [ ] `.gallery-tile-frame.is-motion`
  - [ ] `.toc-entry::before`
  - [ ] `.experience-page .chapter-subtitle`
  - [ ] `*{...;border-radius:0 !important}`
  - [ ] `.exp-marker` dengan `border-radius:50% !important`
- [ ] Urutan `@import` di `index.css` persis mapping

### Regression visual (manual, `npm run dev`)
- [ ] Front cover OK
- [ ] Chapter I About OK (foto, quote, CTA)
- [ ] Chapter II Projects OK (TOC kiri, preview kanan, hover)
- [ ] Chapter III Experience OK — subtitle tetap EB Garamond italic (bukti override urut benar), drop cap, spine, fleuron
- [ ] Gallery OK (kolom abu, tile tilt, infinite scroll)
- [ ] Chapter IV Skills OK (marquee jalan, hover color)
- [ ] Chapter V Contact OK
- [ ] Back cover OK (colophon + signature)
- [ ] Sidebar light/dark switch saat scroll
- [ ] Page indicator angka
- [ ] Mobile (resize < 768px): semua halaman menyesuaikan

### Scope Safety
- [ ] Tidak ada file `.tsx` yang diubah (`git status`)
- [ ] Nama class tidak ada yang berubah
- [ ] Nilai CSS tidak ada yang berubah (diff hanya pemindahan baris + komentar)

---

## Risks & Notes

| Risiko | Mitigasi |
|---|---|
| Urutan import salah → cascade berubah (override kalah) | Import persis urutan mapping; verifikasi rule konflik kunci |
| `@import` tidak ke-inline | Vite bundle postcss-import; cek `dist` CSS berisi semua rule |
| Salah copy nilai saat ekstrak | Salin blok utuh, jangan ketik ulang; bandingkan total |
| `@import` harus di atas `@tailwind`? | Tidak — postcss-import hoist otomatis. Format entry boleh `@tailwind` dulu lalu `@import` |
| File `responsive.css` terbaca sebelum base | Mustahil — `responsive.css` di-import paling akhir |

**Rollback:** `git checkout -- src/index.css && git clean -fd src/styles` (atau revert commit).

---

## File Summary

| File | Aksi |
|---|---|
| `src/index.css` | Rewrite jadi entry (`@tailwind` + `@import` partials) |
| `src/styles/tokens.css` | Baru |
| `src/styles/base.css` | Baru |
| `src/styles/layout.css` | Baru |
| `src/styles/sidebar.css` | Baru |
| `src/styles/cover.css` | Baru |
| `src/styles/content-base.css` | Baru |
| `src/styles/about.css` | Baru |
| `src/styles/skills.css` | Baru |
| `src/styles/projects.css` | Baru |
| `src/styles/contact.css` | Baru |
| `src/styles/gallery.css` | Baru |
| `src/styles/experience.css` | Baru |
| `src/styles/page-indicator.css` | Baru |
| `src/styles/responsive.css` | Baru |
| `*.tsx` | TIDAK diubah |
| `postcss.config.cjs` | TIDAK diubah |
| `tailwind.config.cjs` | TIDAK diubah |
