# Task: Experience Page — Book Redesign (Work & Journey)

## Overview

Redesign halaman **Chapter III — Work & Journey** (`ExperiencePage`) supaya berasa seperti halaman **buku cetak**: font serif cetak, layout kronologi bergaris (spine vertikal), ornamen buku (drop cap, fleuron, small caps, angka old-style), dan semua detail langsung terbuka.

**Scope: LOKAL halaman ini saja.** Tidak menyentuh halaman lain.

---

## Design Decisions (LOCKED)

| Aspek | Keputusan |
|---|---|
| Font heading | `EB Garamond` |
| Font body | `EB Garamond` |
| Font meta (tahun/tipe) | `Inter` (tetap) |
| Arah layout | **A + B** — refine daftar + kronologi garis (spine kiri, tahun di margin, entri menggantung) |
| Ornamen | Ya — drop cap, fleuron `❦`, small caps label, angka old-style |
| Interaksi | **Semua entri terbuka** (tanpa accordion/klik) |
| Overflow | **Inner scroll vertikal** — `.experience-scroll[data-inner-scroll]`, handoff horizontal tetap jalan |

---

## Scope & Non-Goals

### In scope
- `index.html` — tambah family `EB Garamond` ke link Google Fonts
- `src/pages/contents/ExperiencePage.tsx` — restrukturisasi total
- `src/index.css` — blok baru `/* Experience Page — Book Style */`

### NON-goals (JANGAN disentuh)
- Base `.toc-*` classes — **dipakai bareng ProjectsPage** (`ProjectsPage.tsx`). Wajib dibiarkan utuh.
- `.chapter-header` base rule (shared oleh semua content page). Varian hanya di-scope `.experience-page .chapter-subtitle`.
- `src/data/projects.ts` — data **tidak diubah**.
- `AboutPage`, `ProjectsPage`, `SkillsPage`, `GalleryPage`, `ContactPage`, `BookLayout`, `useHorizontalScroll`, cover pages.
- `--font-heading` / `--font-body` global tokens (dipakai halaman lain).

### Shared class bahaya (VERIFY sebelum edit)
- `.toc-entry`, `.toc-title`, `.toc-leader`, `.toc-year`, `.toc-number`, `.toc-detail`, `.toc-company`, `.toc-desc`, `.toc-stack`, `.toc-stack-item`, `.toc-highlights`, `.toc-highlight-item`, `.toc-bullet` → ProjectsPage pakai `.toc-entry/.toc-number/.toc-title/.toc-leader/.toc-year` (`ProjectsPage.tsx:37-40`).
- `.experience-toc` → **eksklusif halaman ini**, aman diganti/dihapus.

---

## Current State (baseline)

### `src/pages/contents/ExperiencePage.tsx` (76 baris)
- Render `.experience-toc` → `experiences.map(...)`.
- Tiap entri: accordion (`useState activeId`, `AnimatePresence`, `onClick`, `onMouseEnter`).
- Markup: `.toc-entry-wrapper` → `.toc-entry` (title/leader/year) → `.toc-detail` (company/desc/highlights/stack).
- Pakai `motion`, `AnimatePresence`, `useState` dari React/framer-motion.

### `src/index.css` (relevant line refs)
- `514` `.experience-toc`
- `541-543` `.toc-entry-wrapper`
- `545-576` `.toc-entry` (+ `::before`, hover/active)
- `578-609` `.toc-number`, `.toc-title`, `.toc-leader`, `.toc-year`
- `611-694` `.toc-detail`, `.toc-company`, `.toc-desc`, `.toc-stack`, `.toc-stack-item`, `.toc-highlights`, `.toc-highlight-item`, `.toc-bullet`, `.toc-links`, `.toc-link`
- `864-875` mobile: `.toc-leader`, `.toc-entry`, `.toc-title`
- `308-336` `.chapter-header`, `.chapter-label`, `.chapter-subtitle` (shared)

### `src/data/projects.ts` — `experiences` (3 entri)
Field tersedia: `id`, `role`, `company`, `period`, `type`, `context`, `highlights[]`, `stack[]`.

### `index.html`
Link Google Fonts eksisting:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap
```

---

## File Changes

### 1. `index.html`

Tambah `EB+Garamond` ke query `family` (satu `<link>` yang sama):

```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap
```

**Catatan:** font di-load global, tapi hanya *dipakai* di `.experience-page` (via `--font-book`). Halaman lain tidak berubah tampilannya.

---

### 2. `src/pages/contents/ExperiencePage.tsx` — REWRITE

**Hapus:**
- `import { useState } from 'react';`
- `import { motion, AnimatePresence } from 'framer-motion';` → ganti jadi `import { motion } from 'framer-motion';` (masih perlu untuk `chapter-header`)

**Struktur baru:**
```tsx
import { motion } from 'framer-motion';
import { experiences } from '../../data/projects';

interface ExperiencePageProps {
  isActive?: boolean;
}

export default function ExperiencePage({ isActive = false }: ExperiencePageProps) {
  return (
    <div className="book-page book-page-content experience-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter III</span>
        <span className="chapter-subtitle">Work &amp; Journey</span>
      </motion.div>

      <div className="experience-scroll" data-inner-scroll>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <div key={exp.id}>
              <article className="exp-entry">
                <span className="exp-marker" aria-hidden="true" />
                <span className="exp-year">{exp.period}</span>

                <div className="exp-body">
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-meta">
                    {exp.company} — {exp.type}
                  </p>
                  <p className="exp-context">{exp.context}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="exp-highlights">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="exp-highlight-item">
                          <span className="exp-bullet">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.stack && exp.stack.length > 0 && (
                    <p className="exp-stack">
                      {exp.stack.map((s, idx) => (
                        <span key={s} className="exp-stack-item">
                          {s}{idx < exp.stack!.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </article>

              {i < experiences.length - 1 && (
                <div className="exp-fleuron" aria-hidden="true">❦</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Catatan implementasi:**
- `chapter-header` **di luar** `.experience-scroll` → berfungsi sebagai running head, tidak ikut tergulir, tetap absolute di atas.
- `.experience-scroll` pakai `data-inner-scroll` → sudah dikenali `useHorizontalScroll.ts` (handoff wheel/touch). Pola identik GalleryPage.
- Grid `exp-entry`: `[tahun] [konten]`. Marker (titik spine) absolute di kiri.
- Fleuron `❦` antar-entri (bukan sesudah entri terakhir).
- Tidak ada state/accordion — semua dirender terbuka.
- `exp.stack` join pakai koma + spasi (bukan `·` pseudo-element, lebih aman dengan map).

---

### 3. `src/index.css` — blok baru

Tambahkan blok berikut (lokasi disarankan: setelah blok `.experience-toc` lama, atau di akhir sebelum section `/* ─── Page Indicator ─── */`). **Tidak menghapus** base `.toc-*`.

```css
/* ─── Experience Page — Book Style (LOCAL) ──────────────── */
.experience-page {
  --font-book: 'EB Garamond', Georgia, 'Times New Roman', serif;
}

.experience-page .chapter-subtitle {
  font-family: var(--font-book);
  font-style: italic;
}

/* Inner scroll — sama pola dengan gallery */
.experience-scroll {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.experience-scroll::-webkit-scrollbar {
  display: none;
}

/* Daftar + spine vertikal */
.experience-list {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding: 22vh 1rem 18vh 3.5rem;
}

.experience-list::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22vh;
  bottom: 18vh;
  width: 1px;
  background: #d8d3c8;
}

/* Entri: grid [tahun] [konten], hanging */
.exp-entry {
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 1.5rem;
  align-items: start;
}

.exp-marker {
  position: absolute;
  left: -3.78rem;
  top: 0.62em;
  width: 7px;
  height: 7px;
  border-radius: 50% !important; /* override global border-radius:0 !important */
  background: #1f1d1b;
}

.exp-year {
  font-family: 'Inter', var(--font-body);
  font-size: 12px;
  font-weight: 400;
  color: #8a8178;
  text-align: right;
  line-height: 1.5;
  padding-top: 0.35em;
  font-variant-numeric: oldstyle-nums;
}

/* Judul peran */
.exp-role {
  font-family: var(--font-book);
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  font-weight: 400;
  color: #1f1d1b;
  line-height: 1.2;
  font-variant-numeric: oldstyle-nums;
}

/* Meta: company — type, small caps */
.exp-meta {
  font-family: 'Inter', var(--font-body);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a8178;
  margin-top: 0.5rem;
  font-variant-caps: small-caps;
}

/* Konteks — body serif + drop cap */
.exp-context {
  font-family: var(--font-book);
  font-size: 1.05rem;
  line-height: 1.65;
  color: #33302c;
  margin-top: 0.9rem;
  text-align: justify;
  hyphens: auto;
}

.exp-context::first-letter {
  font-family: var(--font-book);
  font-size: 3.4em;
  line-height: 0.8;
  float: left;
  padding: 0.08em 0.12em 0 0;
  color: #1f1d1b;
  font-weight: 400;
}

/* Highlights */
.exp-highlights {
  list-style: none;
  margin: 0.9rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.exp-highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-family: var(--font-book);
  font-size: 1rem;
  line-height: 1.55;
  color: #4a4642;
}

.exp-bullet {
  color: #b8b3ac;
  flex-shrink: 0;
}

/* Stack — footnote style */
.exp-stack {
  margin-top: 1rem;
  font-family: var(--font-book);
  font-size: 0.95rem;
  font-style: italic;
  color: #6a6560;
  line-height: 1.5;
}

/* Fleuron pemisah */
.exp-fleuron {
  text-align: center;
  color: #b8b3ac;
  font-family: var(--font-book);
  font-size: 1.15rem;
  margin: 4.5rem 0;
  user-select: none;
}
```

**Catatan:**
- `border-radius: 50% !important` di `.exp-marker` wajib — `index.css:27` punya reset global `* { border-radius: 0 !important }`.
- `padding-left: 3.5rem` di `.experience-list` memberi ruang untuk kolom tahun + marker tanpa keluar dari halaman.
- `text-align: justify; hyphens: auto` untuk nuansa cetak (aman, baris pendek).
- Blok lama `.experience-toc` (line 514-520) boleh dibiarkan (tak terpakai lagi) **atau** dihapus — lihat Step cleanup.

---

### 4. Mobile override (`@media (max-width: 768px)`)

Tambahkan ke dalam media query yang sudah ada (sekitar line 864-875):

```css
  .experience-list {
    padding: 16vh 1rem 12vh 2.25rem;
  }

  .experience-list::before {
    top: 16vh;
    bottom: 12vh;
  }

  .exp-entry {
    grid-template-columns: 2.75rem 1fr;
    gap: 1rem;
  }

  .exp-marker {
    left: -2.9rem;
  }

  .exp-context {
    font-size: 1rem;
  }

  .exp-context::first-letter {
    font-size: 2.8em;
  }

  .exp-fleuron {
    margin: 3rem 0;
  }
```

---

## Execution Steps (urut)

1. **`index.html`** — tambah `&family=EB+Garamond:ital,wght@0,400;0,500;1,400` ke link Google Fonts.
2. **`src/pages/contents/ExperiencePage.tsx`** — rewrite sesuai struktur di atas. Pastikan import bersih (tidak ada `useState`/`AnimatePresence`).
3. **`src/index.css`** — tambah blok `/* Experience Page — Book Style */`.
4. **`src/index.css`** — tambah mobile override dalam `@media (max-width: 768px)`.
5. **Cleanup (opsional, aman)** — hapus `.experience-toc` (line ~514-520) HANYA jika sudah tidak direferensikan file manapun. Verifikasi dulu: `grep -r "experience-toc" src/` → harus kosong setelah rewrite.
6. **Build:**
   ```bash
   npm run build
   ```

---

## Verification Checklist

### Fungsional
- [ ] Semua 3 entri tampil terbuka (role, meta, context, highlights, stack)
- [ ] Drop cap muncul di awal tiap `.exp-context`
- [ ] Fleuron `❦` tampil di antara entri (bukan sesudah entri terakhir)
- [ ] Spine garis vertikal + marker titik di kiri tiap entri
- [ ] Tahun rata kanan di kolom margin
- [ ] Scroll vertikal di dalam halaman berfungsi (overflow konten panjang)
- [ ] Wheel di ujung atas/bawah halaman → **handoff** ke Projects / Gallery (horizontal tetap jalan)
- [ ] Font heading "Work & Journey" jadi EB Garamond italic

### Scope Safety
- [ ] `grep -rn "toc-entry\|toc-title\|toc-leader\|toc-year\|toc-number" src/pages/contents/ProjectsPage.tsx` tetap match → base `.toc-*` TIDAK dihapus/ubah
- [ ] Halaman Projects masih tampil benar (TOC kiri, preview kanan)
- [ ] `--font-heading` / `--font-body` global tidak diubah
- [ ] `src/data/projects.ts` tidak diubah

### Build / Types
- [ ] `npm run build` sukses (tsc + vite), 0 error
- [ ] Tidak ada unused import di `ExperiencePage.tsx`
- [ ] Tidak ada CSS syntax error

---

## Risks & Notes

| Risiko | Mitigasi |
|---|---|
| Reset global `border-radius: 0 !important` mematikan titik marker | Pakai `border-radius: 50% !important` di `.exp-marker` |
| `.toc-*` shared terhapus tanpa sengaja → ProjectsPage rusak | Jangan sentuh base `.toc-*`; hanya pakai class baru `.exp-*` |
| Inner scroll `data-inner-scroll` di-scope global: jika ada elemen lain dengan atribut sama | Saat ini hanya Gallery + Experience; aman |
| Drop cap bikin baris pertama aneh jika `context` diawali tanda baca/kutip | `context` data sekarang diawali huruf kapital; aman. Kalau nanti berubah, pantau visual |
| Font EB Garamond belum ke-load (offline/CSP) | Fallback `Georgia, serif` sudah disiapkan |

**Rollback:** semua perubahan lokal. `git checkout -- index.html src/index.css src/pages/contents/ExperiencePage.tsx`.

---

## File Summary

| File | Aksi |
|---|---|
| `index.html` | Tambah `EB+Garamond` di link Google Fonts |
| `src/pages/contents/ExperiencePage.tsx` | Rewrite (hapus accordion, semua terbuka, markup buku) |
| `src/index.css` | + blok `.experience-page/.exp-*`, + mobile override, (opsional) hapus `.experience-toc` |
| `src/data/projects.ts` | TIDAK diubah |
| `src/hooks/useHorizontalScroll.ts` | TIDAK diubah (sudah dukung `data-inner-scroll`) |
| `src/components/book/BookLayout.tsx` | TIDAK diubah |
