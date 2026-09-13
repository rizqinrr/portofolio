# Task: PDF Export — Bugfix Preview + Landscape A4

## Overview

Dua tujuan:

1. **Fix bug preview** — `?print=1` tidak bisa di-scroll, hanya cover yang terlihat terpotong.
2. **Ubah orientasi ke Landscape A4** — halaman lebih lebar & pendek, tiap chapter mulai di halaman baru, label chapter tetap di pojok kiri atas.

Melanjutkan pekerjaan `tasks/pdf-export-vertical.md` (fase awal sudah selesai: komponen, style, routing, generator, PDF portrait 8 halaman).

**Scope:** perbaikan pada 3 file yang sudah ada + 1 regenerasi PDF. **Tidak** membuat fitur baru.

---

## Root Cause (VERIFIED via Playwright)

Bukti dari inspeksi live `?print=1`:

| Probe | Nilai | Arti |
|---|---|---|
| `htmlOverflow` | `hidden` | Halaman terkunci |
| `htmlHeight` | `726.4px` | Dipaksa = viewport, bukan konten |
| `bodyOverflow` | `hidden` | Tidak bisa scroll |
| `bodyBg` | `rgb(34, 34, 34)` | Masih dark dari `base.css` |
| `activeMediaPrint` | **`false`** | Blok `@media print` **tidak aktif** di browser |
| `docHeight` | `8509px` | Konten ada & panjang |
| `scrollTest` | **`0`** | `window.scrollTo(0,9999)` tidak menggerakkan apa pun |
| `visibleSections` | **1 dari 8** | Hanya cover (945px) masuk viewport |

**Penyebab:** reset `html, body { overflow: visible; height: auto }` di `print.css` berada **di dalam `@media print`**, sehingga hanya aktif saat print/PDF, **bukan** saat dibuka di browser.

**Bukti stylesheet:** bloknya terbaca sebagai
```
@media print {
  html, body { background: #fff; overflow: visible !important; height: auto !important; }
  ...
}
```
dengan `matchMedia('print').matches === false` di browser.

**Catatan penting:** PDF yang di-generate sebelumnya **tidak terpengaruh** — `generate-pdf.mjs` memanggil `page.emulateMedia({ media: 'print' })` sebelum `page.pdf()`. Bug ini murni **preview browser**.

---

## Design Decisions (LOCKED)

| Aspek | Keputusan |
|---|---|
| Orientasi | **A4 landscape** (297 × 210 mm) |
| Scroll | Vertikal, multi-halaman, semua section mengalir ke bawah |
| Chapter label | **Opsi A** — `position: absolute`, pojok kiri atas (gaya web) |
| Anti-kepotong | **Opsi 2a** — `break-before: page` tiap section (mulai halaman baru) |
| Gallery | **3 kolom** |
| Preview browser | **Dibatasi lebar 297mm**, dipusatkan, ada outline kertas |
| Lebar konten | **Mengisi penuh** halaman (hanya padding, tanpa `max-width` internal) |
| PDF output | `public/portfolio.pdf` (gitignored) |

---

## Baseline Tinggi Section (viewport 1536px, portrait)

| Section | Tinggi | Perkiraan landscape |
|---|---|---|
| Cover | 945px | ~1 halaman |
| About | 692px | ~1 halaman |
| Projects | **2261px** | **~2 halaman** (tetap terbelah) |
| Experience | 913px | ~1 halaman |
| Gallery | **2017px** | **~2 halaman** (3 kolom → lebih pendek) |
| Skills | 364px | ~1 halaman |
| Contact | 372px | ~1 halaman |
| Back Cover | 945px | ~1 halaman |

**Konsekuensi yang disadari user:** Opsi 2a hanya menjamin tiap chapter **mulai** di halaman baru — bukan menjamin muat 1 halaman. Projects & Gallery tetap bisa lebih dari satu halaman.

---

## Patch 1 — `src/styles/print.css`

### 1a. Fix scroll (keluar dari `@media print`)

Tambah di **level atas** (bukan di dalam blok media):

```css
html.is-print,
body.is-print {
  overflow: visible !important;
  height: auto !important;
  background: #ffffff;
}
```

### 1b. Orientasi landscape

```css
@page {
  size: A4 landscape;
  margin: 0;
}
```

### 1c. Preview dibatasi lebar kertas

```css
.print-doc {
  max-width: 297mm;
  margin: 0 auto;
  box-shadow: 0 0 0 1px var(--print-line);
}
```

### 1d. Chapter label absolute pojok kiri

```css
.print-section {
  position: relative;
  padding: 16mm;
}

.print-section-head {
  position: absolute;
  top: 16mm;
  left: 16mm;
  margin-bottom: 0;
}

/* Beri ruang agar konten tidak menabrak label */
.print-section > .print-about,
.print-section > .print-experience,
.print-section > .print-gallery-grid,
.print-section > .print-skills,
.print-section > .print-contact,
.print-section > .print-project {
  padding-left: 38mm;
}
```

### 1e. Page-break per chapter

```css
.print-section {
  break-before: page;
  page-break-before: always;
}

.print-doc > .print-section:first-of-type {
  break-before: auto;
  page-break-before: auto;
}
```

Cover & back cover sudah punya `break-before: page` (keep), dengan `.print-doc > .print-cover:first-child { break-before: auto }`.

### 1f. Gallery 3 kolom

```css
.print-gallery-grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 6mm 5mm;
}
```

### 1g. Cover landscape

```css
.print-cover,
.print-backcover {
  min-height: 178mm;   /* A4 landscape (210mm) − padding vertikal 32mm */
}
```

### 1h. Bersihkan `@media print`

Hapus duplikasi yang jadi redundan (padding section, min-height cover). Sisakan hanya yang spesifik cetak:

```css
@media print {
  .book-sidebar,
  .book-page-indicator {
    display: none !important;
  }

  .print-doc {
    box-shadow: none;
    max-width: none;
  }
}
```

---

## Patch 2 — `src/pages/print/PrintDocument.tsx`

Tambah `useEffect` untuk menandai halaman, dengan cleanup:

```tsx
import { useEffect } from 'react';

// di dalam komponen:
useEffect(() => {
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('is-print');
  body.classList.add('is-print');
  return () => {
    root.classList.remove('is-print');
    body.classList.remove('is-print');
  };
}, []);
```

**Alasan pakai class, bukan `:has()`:** eksplisit, tidak bergantung dukungan fitur CSS baru, dan cleanup menjamin web normal tidak terpengaruh.

---

## Patch 3 — `scripts/generate-pdf.mjs`

Ubah pemanggilan `page.pdf()`:

```js
await page.pdf({
  path: outputPath,
  format: 'A4',
  landscape: true,
  printBackground: true,
  margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
});
```

---

## Patch 4 — `tasks/pdf-export-vertical.md`

Perbarui bagian **Design Decisions** & **Phase 2** agar mencerminkan kondisi akhir:
- A4 → **A4 landscape**
- Gallery 2 kolom → **3 kolom**
- Tambah catatan `break-before: page` & chapter label absolute
- Tambah catatan `html.is-print` reset

---

## File Change Matrix

| File | Aksi | Risiko |
|---|---|---|
| `src/styles/print.css` | Edit (restrukturisasi) | Sedang — semua selector `.print-doc`/`.print-*`, terisolasi |
| `src/pages/print/PrintDocument.tsx` | Edit (+`useEffect`) | Rendah |
| `scripts/generate-pdf.mjs` | Edit (+`landscape: true`) | Rendah |
| `tasks/pdf-export-vertical.md` | Edit (dokumentasi) | Nol |
| `public/portfolio.pdf` | Regenerate | Tidak di-commit |

**Tidak disentuh:** `App.tsx`, `index.css`, web horizontal, semua `src/styles/*` lain, `src/data/*`, `package.json`, `.gitignore`.

---

## Verification Checklist

### Preview browser (`?print=1`)
- [ ] `window.scrollY` bisa > 0 (`scrollTest` > 0)
- [ ] `document.documentElement.scrollHeight` > viewport
- [ ] 8/8 section ter-render
- [ ] `body` background **putih** (bukan dark `rgb(34,34,34)`)
- [ ] Tidak ada scroll horizontal (`scrollWidth === clientWidth`)
- [ ] Chapter label muncul **pojok kiri atas** tiap section
- [ ] Konten tidak menabrak label
- [ ] Gallery tampil **3 kolom**
- [ ] Lebar dokumen dibatasi ~297mm & dipusatkan

### PDF
- [ ] `npm run pdf` sukses
- [ ] MediaBox **lebar > tinggi** (landscape)
- [ ] `npm run build` tanpa error TS
- [ ] Cover dark di halaman pertama
- [ ] Back cover dark di halaman terakhir
- [ ] Gambar semua muncul (11/11)

### Regresi
- [ ] Web normal (`/`) **tidak berubah** — class `is-print` ter-cleanup setelah unmount
- [ ] Tidak ada class `is-print` tertinggal di `<html>`/`<body>` saat kembali ke web

---

## Risks & Mitigations

| Risiko | Mitigasi |
|---|---|
| Class `is-print` bocor ke web | `useEffect` cleanup; verifikasi manual setelah navigasi |
| `padding-left: 38mm` membuat konten terlalu sempit | Preview dibatasi 297mm; kontrol lebar relatif tetap proporsional |
| `break-before` + `break-inside: avoid` konflik | Kompatibel — `avoid` hanya mencegah potong di dalam card |
| Projects/Gallery tetap >1 halaman | Disadari & diterima user (Opsi 2a) |
| Label hanya muncul di halaman pertama section panjang | Batasan Chromium (tidak ada `position: running()`); disadari |
| `max-width: 297mm` salah di layar kecil | Tetap responsif (`margin: 0 auto` menyesuaikan) |

---

## Rollback Strategy

```powershell
git checkout src/styles/print.css src/pages/print/PrintDocument.tsx scripts/generate-pdf.mjs
Remove-Item public/portfolio.pdf
```

Semua perubahan terisolasi pada route print. Web horizontal dijamin utuh karena `print.css` seluruhnya ter-scope `.print-doc`/`.print-*` dan class `is-print` selalu dibersihkan saat unmount.

---

## Urutan Eksekusi

1. **T1** — Patch `print.css` (poin 1a–1h)
2. **T2** — Patch `PrintDocument.tsx` (`useEffect`)
3. **T3** — Patch `generate-pdf.mjs` (`landscape: true`)
4. **T4** — `npm run build` — verify compile bersih
5. **T5** — `npm run preview` + verifikasi `?print=1` via MCP Playwright (checklist preview)
6. **T6** — `npm run pdf` — regenerate + verify landscape
7. **T7** — Update `tasks/pdf-export-vertical.md`
8. **T8** — Lapor hasil

---

## Dummy yang Masih Perlu Dikoreksi User

Dari fase sebelumnya, masih berlaku (blok `PRINT_COPY` di `PrintDocument.tsx`):

- [ ] `galleryTitle`: `"Certifications & Courses"`
- [ ] `skillsTitle`: `"Skills & Stack"`
- [ ] `skillsGroups`: 4 kategori (Languages / Frontend / Backend & Data / Tools)
- [ ] Chapter numbering: Gallery=`IV`, Skills=`V`, Contact=`VI` (web: Skills=`IV`, Contact=`V`) — **mismatch, cek**
- [ ] Sertifikat: belum ada nomor urut / penerbit
- [ ] Cover print: belum ada tanggal cetak
- [ ] Tanda tangan masih teks italic (web pakai SVG animasi)

---

## Future Enhancements (OUT OF SCOPE)

- Generate PDF otomatis via CI saat deploy
- Tombol "Download PDF" di web
- Running head per halaman (butuh pra-render/pecah manual)
- Pilihan orientasi (portrait/landscape) via parameter
