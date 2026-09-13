# Task: Mobile View Redesign — Portfolio Book

## Overview

Memperbaiki tampilan web portofolio `portofolio` saat dibuka di **mobile** (target utama: **Android Chrome**), tanpa mengubah konsep buku horizontal.

Keluhan utama user: **"tampilan saat mobile web ga berantakan, ga tumpuk2an"** — prioritas **estetika**, bukan fungsionalitas baru.

Referensi yang dipakai user: halaman utama project `cv` (`D:\01_Coding\www\cv`) yang dianggap **sudah pas** di HP.

**Scope:** perbaikan CSS responsif + 1 komponen baru (panah navigasi) + 2 perbaikan hook. **Tidak** mengubah konsep buku horizontal, tidak membuat fitur baru, tidak menyentuh print/PDF.

**Push ke `dev`** (bukan `main`). **Verifikasi manual**, tanpa Playwright.

---

## Kondisi Awal (VERIFIED — hasil pembacaan kode)

### Arsitektur

| Aspek | Nilai | Sumber |
|---|---|---|
| Mekanisme | `book-pages` flex row + `translateX` (Framer Motion spring) | `layout.css:11-16`, `useHorizontalScroll.ts:35-43` |
| Lebar halaman | `calc(100vw - var(--sidebar-width))` | `layout.css:19` |
| Sidebar | `position: fixed`, `width: var(--sidebar-width)` | `sidebar.css:2-18` |
| Total halaman | 8 (FrontCover + 6 konten + BackCover) | `BookLayout.tsx:15` |
| Input | wheel (`deltaY`), touch (`deltaX`), keyboard | `useHorizontalScroll.ts:73,110,137` |
| Breakpoint mobile | **hanya satu**: `@media (max-width: 768px)` | `responsive.css:2` |

### Halaman & Halaman Ber-scroll Sendiri

| # | Halaman | Komponen | Catatan |
|---|---|---|---|
| 0 | FrontCover | `pages/cover/FrontCover.tsx` | |
| 1 | About (Ch. I) | `pages/contents/AboutPage.tsx` | grid 2 kolom |
| 2 | Projects (Ch. II) | `pages/contents/ProjectsPage.tsx` | hover-driven |
| 3 | Experience (Ch. III) | `pages/contents/ExperiencePage.tsx` | `data-inner-scroll` |
| 4 | Gallery (Ch. IV) | `pages/contents/GalleryPage.tsx` | `data-inner-scroll` |
| 5 | Skills (Ch. IV) | `pages/contents/SkillsPage.tsx` | marquee `left: 50%` |
| 6 | Contact (Ch. V) | `pages/contents/ContactPage.tsx` | email besar |
| 7 | BackCover | `pages/cover/BackCover.tsx` | |

### Pola Referensi dari `cv` (dipakai sebagai acuan)

| Teknik | Nilai di `cv` | Sumber |
|---|---|---|
| Lebar kontainer | `max-width: 440px` | `cv/src/index.css:132` |
| Tinggi | `100dvh` | `cv/src/index.css:117,134` |
| Breakpoint | **tidak ada** — mobile-first fluid | — |
| Layout | `flex-direction: column` satu kolom | `cv/src/index.css:137` |

Pelajarannya: `cv` "sudah pas" karena **tidak ada layout multi-kolom yang perlu di-override** dan **tidak pakai `100vh`**.

---

## Root Cause — Masalah Mobile

### M1. Sidebar memakan 16% lebar & tidak berguna di mobile

`sidebar.css:2-18` — sidebar `fixed` 62px. Di viewport 390px, itu **16% layar**.

Mayoritas isinya teks vertikal yang tidak terbaca di layar sempit:
- `.sidebar-top` — `"FOLIO — EDITION"`
- `.sidebar-center` — nama lengkap
- `.sidebar-bottom` — `"© 2026"`
- `.sidebar-hamburger` (`Sidebar.tsx:24`) — **tanpa handler**, murni dekorasi

`responsive.css:5` meng-override `--sidebar-width: 62px` → **sama dengan nilai default** (`tokens.css:10`). Override ini tidak melakukan apa-apa.

### M2. `pageWidth` hardcoded 62px — duplikasi nilai

`useHorizontalScroll.ts:14,23`:
```ts
const [pageWidth, setPageWidth] = useState(() => window.innerWidth - 62);
// ...
const handleResize = () => { setPageWidth(window.innerWidth - 62); };
```

Nilai `62` diduplikasi dari CSS. Kalau `--sidebar-width` berubah, JS **tidak ikut berubah** → semua perhitungan halaman (`maxScroll`, `currentPage`, `goToPage`) salah.

### M3. AboutPage grid 2 kolom tanpa override mobile

`about.css:9-15`:
```css
.about-wrapper {
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: calc(var(--spacing-unit) * 1.5);
}
```

`responsive.css` **tidak punya** selector `.about-wrapper`. Konsekuensi di 390px:
- Tiap kolom ≈120px
- `.about-photo { max-width: 322px }` (`about.css:81`) → **terpotong**
- `.about-lead` (`about.css:23` `clamp(20px, 2.3vw, 32px)`) → jatuh ke 20px di kolom sempit
- Teks & foto berdesakan → **ini "tumpuk2an" yang dimaksud user**

### M4. SkillsPage marquee hanya separuh layar

`skills.css:6-18`:
```css
.skills-marquee {
  position: absolute;
  top: 0; bottom: 0;
  left: 50%; right: 0;   /* ← hanya separuh kanan */
  gap: 48px;
  padding: 0 calc(var(--spacing-unit) * 0.25);
}
```

Di desktop, separuh kiri disediakan untuk chapter header. Di 390px → marquee terjepit di ~195px untuk **3 kolom** logo → logo terpotong.

`responsive.css:35-47` hanya mengecilkan `gap` (48→24) dan ikon (80→64), **tidak** memperbaiki `left: 50%`.

### M5. ProjectsPage preview tidak berguna di touch

`ProjectsPage.tsx:34` — interaksi murni hover:
```tsx
<div className="toc-entry ..." onMouseEnter={() => setActiveId(project.id)}>
```

Di layar sentuh tidak ada hover → `activeId` tetap `null` → `.projects-preview` kosong.

`responsive.css:68-70` memberi `min-height: 300px` pada `.projects-preview` → jadi **kotak kosong 300px** dengan garis diagonal dekoratif.

### M6. `100vh` kena address bar Chrome Android

Dipakai di:
- `layout.css:4` `.book-layout`
- `layout.css:12` `.book-pages`
- `layout.css:20` `.book-page`
- `gallery.css:9` `.gallery-scroll`
- `experience.css:13` `.experience-scroll`

Di Chrome Android, `100vh` **termasuk** area address bar yang menyusut saat scroll → elemen lebih tinggi dari viewport yang terlihat → konten bawah terpotong.

`index.html` sudah pakai `<meta name="viewport" content="width=device-width, initial-scale=1">` (tanpa `viewport-fit=cover`), jadi `dvh` adalah solusi yang tepat.

### M7. Tidak ada affordance navigasi

Satu-satunya cara pindah halaman: swipe, scroll, atau tombol keyboard (`useHorizontalScroll.ts:137`) — keyboard tidak ada di HP.

- `.sidebar-hamburger` (`Sidebar.tsx:24`) — **tanpa handler**
- `PageIndicator.tsx:13` — hanya menampilkan angka (`01`, `02`, dst), **bukan tombol**
- `goToPage` sudah tersedia dari hook (`useHorizontalScroll.ts:158`) tapi **tidak pernah dipakai** di `BookLayout.tsx`

User yang tidak tahu ini buku horizontal akan **stuck di FrontCover**.

### M8. Touch gesture bisa memutus scroll vertikal

`useHorizontalScroll.ts:110-125`:
```ts
const handleTouchMove = (e: TouchEvent) => {
  const deltaX = touchStartX.current - e.touches[0].clientX;
  const deltaY = touchStartY.current - e.touches[0].clientY;

  const inner = (e.target as Element)?.closest?.('[data-inner-scroll]') as HTMLElement | null;
  if (inner && Math.abs(deltaY) >= Math.abs(deltaX)) return;   // biarkan native

  if (Math.abs(deltaX) > Math.abs(deltaY)) {                   // ← tanpa threshold
    e.preventDefault();
    const newPos = Math.max(0, Math.min(touchStartPos + deltaX, maxScroll));
    rawScrollX.set(newPos);
  }
};
```

**Masalah:** saat user scroll vertikal di Gallery/Experience lalu jari menyimpang sedikit ke samping (`|deltaX|` sedikit > `|deltaY|`), `preventDefault()` dipanggil → **scroll vertikal putus di tengah**. Di layar sentuh jari ini jauh lebih sering daripada trackpad.

Galeri & Experience punya scroll internal sendiri:
- `GalleryPage.tsx:16` → `.gallery-scroll[data-inner-scroll]`
- `ExperiencePage.tsx:21` → `.experience-scroll[data-inner-scroll]`

### M9. ContactPage email overflow

`contact.css:2-4`:
```css
.contact-email {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

Di 390px → `5vw` = 19.5px, tapi minimum `2rem` = **32px**. Teks `studyrizqi@gmail.com` (21 karakter) di 32px Playfair Display butuh **~330px** — lebih lebar dari area konten (390 − 48 padding = **342px**). **Berisiko overflow** atau terpotong.

`.contact-socials` (`contact.css:31-35`) pakai `gap: calc(var(--spacing-unit) * 0.5)` = 25px, dengan 3 link → rapat.

### M10. Cover & Colophon

| Selector | Masalah | Sumber |
|---|---|---|
| `.cover-name` | `clamp(3rem, 10vw, 11rem)` → `responsive.css:21` override jadi `clamp(1.8rem, 8vw, 4rem)` = **31px** di 390px — terlalu kecil untuk cover | `cover.css:33`, `responsive.css:21` |
| `.cover-tagline` | `position: absolute` `top/right` + `max-width: 280px` → rapat; `responsive.css:28` override 200px | `cover.css:26-32` |
| `.cover-bottom-bar` | `padding: 24px var(--spacing-unit)` → 24px×48px total | `cover.css:53` |
| `.signature-svg` | `max-width: 440px` → di 390px bisa overflow | `cover.css:105` |
| `.colophon-content` | `max-width: 400px` → tidak masalah, tapi bisa 100% | `cover.css:78` |

---

## Design Decisions (LOCKED — jawaban user)

| # | Aspek | Keputusan |
|---|---|---|
| 1 | Prioritas | **Estetika** — tidak berantakan, tidak tumpuk |
| 2 | Target device | **Android Chrome** |
| 3 | Referensi | Halaman utama `cv` — mobile-first, fluid, satu kolom |
| 4 | Sidebar mobile | **Hilang total** — `display: none`, konten dapat 100% lebar |
| 5 | Navigasi | **Panah kiri-kanan**, jelas tapi **tidak besar** |
| 6 | About: posisi foto | **Di atas** teks |
| 7 | Projects preview mobile | **Disembunyikan**; **desktop hover tetap utuh** |
| 8 | Breakpoint | **Tetap 768px** saja |
| 9 | Verifikasi | **Manual** (Chrome DevTools device toolbar) |
| 10 | Tailwind | **Dibiarkan** (out of scope) |
| 11 | Branch | **`dev`** |

**Sisa keputusan yang belum dijawab user (pakai usulan):**

| Aspek | Usulan | Alasan |
|---|---|---|
| Panah di cover | **Sembunyikan** di FrontCover (0) & BackCover (7) | Cover tidak punya `chapter-header`; panah mengganggu komposisi editorial |

---

## Patch Plan

### T1 — Full-width tanpa sidebar (mobile)

**File:** `src/styles/responsive.css`, `src/hooks/useHorizontalScroll.ts`

**`responsive.css`** — ganti blok token:
```css
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;   /* dari 62px */
    --spacing-unit: 24px;   /* tetap */
  }

  .book-sidebar {
    display: none;
  }
}
```

Konsekuensi otomatis (karena CSS pakai var):
- `.book-pages { margin-left: var(--sidebar-width) }` → `0`
- `.book-page { flex-basis: calc(100vw - var(--sidebar-width)) }` → `100vw`

**`useHorizontalScroll.ts`** — hapus hardcode `62`:
```ts
const readSidebarWidth = () => {
  if (typeof window === 'undefined') return 0;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--sidebar-width')
    .trim();
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

const [pageWidth, setPageWidth] = useState(() =>
  typeof window !== 'undefined' ? window.innerWidth - readSidebarWidth() : 0
);

useEffect(() => {
  const handleResize = () => {
    setPageWidth(window.innerWidth - readSidebarWidth());
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Efek:** satu sumber kebenaran (`--sidebar-width` di CSS). Kalau nilai berubah, JS ikut. Di mobile → `pageWidth = innerWidth`.

**Risiko:** `getComputedStyle` pada `:root` dipanggil saat init — perlu di dalam guard `typeof window !== 'undefined'` (sudah ada). Media query sudah ter-apply sebelum JS init karena CSS di-load lebih dulu.

**Verifikasi:**
- [ ] Mobile: `book-sidebar` tidak terlihat
- [ ] Mobile: halaman konten 100% lebar
- [ ] Desktop: sidebar masih 62px, layout tidak berubah
- [ ] `pageWidth` di mobile = `window.innerWidth`

---

### T2 — Panah navigasi kiri-kanan (mobile only)

**File baru:** `src/components/book/PageArrows.tsx`
**File edit:** `src/components/book/BookLayout.tsx`, `src/styles/page-indicator.css`

**Komponen:**
```tsx
interface PageArrowsProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (index: number) => void;
}

export default function PageArrows({ currentPage, totalPages, onNavigate }: PageArrowsProps) {
  const atStart = currentPage <= 0;
  const atEnd = currentPage >= totalPages - 1;
  // sembunyikan di cover
  if (atStart || atEnd) return null;

  return (
    <>
      <button
        type="button"
        className="page-arrow page-arrow-prev"
        onClick={() => onNavigate(currentPage - 1)}
        disabled={atStart}
        aria-label="Halaman sebelumnya"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        className="page-arrow page-arrow-next"
        onClick={() => onNavigate(currentPage + 1)}
        disabled={atEnd}
        aria-label="Halaman berikutnya"
      >
        <span aria-hidden="true">→</span>
      </button>
    </>
  );
}
```

**CSS** (tambahkan di `page-indicator.css`):
```css
.page-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  width: 40px;
  height: 40px;
  display: none;              /* desktop: sembunyi */
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1;
  color: var(--text-content);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--border-content);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-duration) var(--transition-easing),
              background var(--transition-duration) var(--transition-easing);
  -webkit-tap-highlight-color: transparent;
}

.page-arrow-prev { left: 12px; }
.page-arrow-next { right: 12px; }

.page-arrow:disabled {
  opacity: 0.25;
  pointer-events: none;
}

@media (max-width: 768px) {
  .page-arrow {
    display: flex;
    opacity: 1;
  }
}
```

**Catatan penting:**
- `background` pakai `rgba` — **aman** (tidak pakai `oklch`/`color-mix`)
- Warna teks pakai token `var(--text-content)` = `#1a1a1a` — kontras di halaman putih
- Di FrontCover/BackCover (dark `#222`), tombol **disembunyikan** (return `null`), jadi tidak ada masalah kontras
- `border-radius: 0` sudah dipaksa global (`base.css:6` `border-radius: 0 !important`) — konsisten gaya editorial

**Render di `BookLayout.tsx`**, sejajar `PageIndicator`:
```tsx
<PageArrows
  currentPage={currentPage}
  totalPages={TOTAL_PAGES}
  onNavigate={goToPage}
/>
```
`goToPage` sudah tersedia dari hook (`useHorizontalScroll.ts:158`) — **tidak perlu ubah hook**.

**Tidak menyentuh** `Sidebar.tsx:24` (hamburger tetap mati, biar desktop tidak berubah).

**Verifikasi:**
- [ ] Mobile: panah tampil di halaman 1–6
- [ ] Mobile: panah **tidak** tampil di halaman 0 & 7
- [ ] Klik kiri → mundur 1 halaman; klik kanan → maju 1 halaman
- [ ] Desktop: panah tidak tampil sama sekali
- [ ] Ukuran 40×40px — jelas tapi tidak besar

---

### T3 — AboutPage satu kolom, foto di atas

**File:** `src/styles/responsive.css`

Tambahkan di dalam `@media (max-width: 768px)`:
```css
.about-wrapper {
  grid-template-columns: 1fr;
  gap: 20px;
}

.about-aside {
  order: -1;
  gap: 18px;
}

.photo-frame {
  padding: 5px 5px 0;
}

.about-photo {
  max-width: 100%;
  max-height: 38dvh;
  width: auto;
}

.about-content {
  gap: 18px;
}

.about-quote-block {
  max-width: 100%;
}
```

**Alasan `order: -1`:** `.about-aside` (foto + quote) di DOM setelah `.about-content` (`AboutPage.tsx:84`). `order: -1` menaikkannya ke atas tanpa mengubah urutan DOM (aman untuk aksesibilitas & screen reader).

**Verifikasi:**
- [ ] Foto tampil penuh, tidak terpotong
- [ ] Layout satu kolom, tidak ada tumpuk
- [ ] Foto di atas, teks di bawah
- [ ] `.about-cta` (`href="#projects"`) masih terlihat

---

### T4 — SkillsPage marquee full lebar

**File:** `src/styles/responsive.css`

Ganti blok skills yang ada (`responsive.css:35-47`):
```css
.skills-marquee {
  left: 0;
  right: 0;
  gap: 16px;
  padding: 0;
  top: 84px;              /* beri ruang chapter-header */
}

.skills-marquee-track {
  gap: 22px;
}

.skills-logo-item svg {
  width: 48px;
  height: 48px;
}
```

**Alasan `top: 84px`:** `.chapter-header` absolute di `top: var(--spacing-unit)` = 24px (`content-base.css:11`) dengan tinggi ~40px (label 14px + subtitle 20px + gap 4px) → berakhir ~64px. Beri margin ~20px → 84px.

**Verifikasi:**
- [ ] Marquee mengisi lebar penuh
- [ ] 3 kolom logo terlihat, tidak terpotong
- [ ] Marquee tidak menabrak chapter header
- [ ] Animasi masih jalan (tidak stuck)

---

### T5 — ProjectsPage: preview hilang di mobile saja

**File:** `src/styles/responsive.css`

Ganti blok projects yang ada (`responsive.css:49-74`):
```css
.toc-leader {
  display: none;
}

.toc-entry {
  flex-wrap: wrap;
  gap: 4px 8px;
}

.toc-title {
  flex: 1;
  font-size: 16px;
}

.projects-split {
  grid-template-columns: 1fr;
  gap: calc(var(--spacing-unit) * 0.5);
}

.projects-preview {
  display: none;          /* ← mobile: preview disembunyikan */
}
```

**Yang dihapus:** `.projects-preview { min-height: 300px }` dan `.projects-preview-frame { aspect-ratio: 16 / 9 }` (tidak berguna kalau parent di-`display: none`).

**⚠️ Desktop TIDAK disentuh.** `ProjectsPage.tsx` tidak diubah sama sekali — hover `onMouseEnter` (`ProjectsPage.tsx:34`) tetap berfungsi penuh di desktop. Perubahan **hanya** di dalam `@media (max-width: 768px)`.

**Verifikasi:**
- [ ] Mobile: hanya TOC yang tampil, tidak ada kotak kosong
- [ ] Mobile: tidak ada ruang kosong 300px
- [ ] Mobile: `.toc-title` tidak bertumpuk dengan `.toc-year` saat wrap
- [ ] **Desktop (1440px): hover pada TOC → preview gambar muncul** (regresi)

---

### T6 — `dvh` ganti `vh` (dengan fallback)

**File:** `src/styles/layout.css`, `src/styles/gallery.css`, `src/styles/experience.css`

Pola: **deklarasi `vh` dulu, lalu `dvh`** — browser lama pakai `vh`, browser modern override dengan `dvh`.

**`layout.css`:**
```css
.book-layout {
  height: 100vh;
  height: 100dvh;
  /* ... */
}

.book-pages {
  height: 100vh;
  height: 100dvh;
  /* ... */
}

.book-page {
  height: 100vh;
  height: 100dvh;
  /* ... */
}
```

**`gallery.css:9`** `.gallery-scroll` → tambah `height: 100dvh;` setelah `height: 100vh;`

**`experience.css:13`** `.experience-scroll` → sama

**Alasan:** Chrome Android support `dvh` sejak **v108**. `dvh` = `100vh` dikurangi area address bar dinamis → konten tidak terpotong.

**Verifikasi:**
- [ ] Mobile: konten bawah tidak terpotong
- [ ] Mobile: tidak ada scrollbar vertikal yang tidak perlu di halaman konten
- [ ] Desktop: tinggi tidak berubah

---

### T7 — Cover & Colophon

**File:** `src/styles/responsive.css`

Ganti blok cover yang ada (`responsive.css:19-32`):
```css
.cover-name {
  font-size: clamp(2.4rem, 13vw, 4rem);
  letter-spacing: -0.04em;
}

.cover-tagline {
  font-size: 13px;
  max-width: 200px;
}

.cover-bottom-bar {
  padding: 18px 24px;
  gap: 12px;
}

.cover-bottom-left,
.cover-bottom-center {
  font-size: 10.5px;
}

.cover-bottom-right {
  font-size: 20px;
}

.signature-svg {
  max-width: 240px;
}

.signature-wrapper {
  bottom: 20px;
  right: 20px;
}

.colophon-content {
  max-width: 100%;
}

.colophon-line {
  font-size: 12px;
  line-height: 1.9;
}

.colophon-closing {
  font-size: 14px;
  margin-top: 24px;
}
```

**Alasan `.cover-name` dinaikkan:** `responsive.css:21` sekarang `clamp(1.8rem, 8vw, 4rem)` → hanya **31px** di 390px. Cover adalah kesan pertama; 31px terlalu kecil. Usulan `clamp(2.4rem, 13vw, 4rem)` → **50px** di 390px.

**Verifikasi:**
- [ ] Cover: nama besar & berwibawa, tidak overflow
- [ ] Cover: tagline tidak menabrak nama
- [ ] Cover: bottom bar rapi, tidak bertumpuk
- [ ] Colophon: tanda tangan tidak overflow
- [ ] Colophon: teks terbaca

---

### T8 — ContactPage anti-overflow

**File:** `src/styles/responsive.css` (blok baru)

```css
.contact-email {
  font-size: clamp(1.1rem, 5.5vw, 4rem);
  word-break: break-word;
  overflow-wrap: anywhere;
}

.contact-socials {
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 28px;
}
```

**Alasan:** `contact.css:3` `clamp(2rem, 5vw, 4rem)` → minimum **32px** di mobile, sedangkan email 21 karakter butuh ~330px dari 342px tersedia → rawan overflow. Turunkan minimum ke `1.1rem` (17.6px) dan tambah `overflow-wrap` sebagai jaring pengaman.

**Verifikasi:**
- [ ] Email tampil satu baris atau wrap rapi, **tidak** overflow horizontal
- [ ] 3 link sosmed tidak bertumpuk
- [ ] `contact-socials` bisa wrap kalau sempit

---

### T9 — Touch threshold

**File:** `src/hooks/useHorizontalScroll.ts`

Ganti `handleTouchMove` (`useHorizontalScroll.ts:110-125`):
```ts
const handleTouchMove = (e: TouchEvent) => {
  const deltaX = touchStartX.current - e.touches[0].clientX;
  const deltaY = touchStartY.current - e.touches[0].clientY;
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  // Nested vertical scroller — let native vertical scroll win inside it.
  const inner = (e.target as Element)?.closest?.('[data-inner-scroll]') as HTMLElement | null;
  if (inner && absY >= absX) {
    return;
  }

  // Threshold + axis dominance: avoid hijacking vertical scroll when the
  // finger drifts slightly sideways.
  if (absX > 12 && absX > absY * 1.5) {
    e.preventDefault();
    const newPos = Math.max(0, Math.min(touchStartPos + deltaX, maxScroll));
    rawScrollX.set(newPos);
  }
};
```

**Alasan:**
- `absX > 12` — abaikan pergerakan kecil (jitter jari)
- `absX > absY * 1.5` — harus **dominan horizontal**, bukan sekadar lebih besar
- Mencegah `preventDefault()` memutus scroll vertikal Gallery/Experience

**Verifikasi:**
- [ ] Mobile Gallery: scroll vertikal lancar, tidak putus
- [ ] Mobile Experience: scroll vertikal lancar, tidak putus
- [ ] Mobile: swipe horizontal di halaman konten tetap pindah halaman
- [ ] Desktop: wheel tidak terpengaruh (kode berbeda)

---

### T10 — Verifikasi Manual

**File:** tidak ada (verifikasi)

**Langkah:**

1. `npm run build` → pastikan `tsc -b` & `vite build` bersih
2. `npm run dev`
3. Chrome → DevTools (F12) → **Toggle device toolbar** (Ctrl+Shift+M)
4. Test di **2 ukuran**:
   - **Pixel 7** — 412×915
   - **390×844** (iPhone 12/13/14 preset, sebagai pembanding)
5. Kunjungi **8 halaman** satu per satu (scroll/swipe):
   - FrontCover → About → Projects → Experience → Gallery → Skills → Contact → BackCover

**Checklist per halaman:**

| Cek | Cara |
|---|---|
| Tidak ada elemen tumpuk | Mata |
| Tidak ada overflow horizontal | DevTools Console: `document.documentElement.scrollWidth === document.documentElement.clientWidth` |
| Teks tidak terpotong | Mata |
| Panah tampil (halaman 1–6) | Mata |
| Panah **tidak** tampil (halaman 0 & 7) | Mata |
| Panah berfungsi | Klik |
| Konten bawah tidak terpotong | Scroll ke bawah |
| Sidebar tidak terlihat | Mata |

**Regresi desktop:**
- Set viewport ke **1440×900**
- [ ] Sidebar muncul (62px)
- [ ] Projects: hover TOC → preview gambar muncul
- [ ] Panah **tidak** tampil
- [ ] Layout 8 halaman tidak berubah

**Tidak pakai Playwright** (sesuai keputusan user #9).

---

### T11 — Commit + Push `dev`

**File:** tidak ada (git)

**Langkah:**
1. `git status` → pastikan hanya file yang relevan
2. `git add` file yang berubah (jangan `.codegraph/`, jangan `dist/`)
3. Commit — usul **3 commit terpisah** kalau memungkinkan:
   - **(a)** T1 + T2 + T6 — struktur & navigasi (`responsive.css` sidebar, `PageArrows.tsx`, `BookLayout.tsx`, `useHorizontalScroll.ts`, `layout.css`, `gallery.css`, `experience.css`, `page-indicator.css`)
   - **(b)** T3–T8 — layout per-halaman (`responsive.css`)
   - **(c)** T9 — touch threshold (`useHorizontalScroll.ts`)
4. `git push origin dev`

**⚠️ Branch `dev`, BUKAN `main`.**

---

## File Change Matrix

| File | Aksi | Patch | Risiko |
|---|---|---|---|
| `src/styles/responsive.css` | Edit besar | T1, T3, T4, T5, T7, T8 | **Sedang** — ter-scope `@media max-width: 768px`, tidak menyentuh desktop |
| `src/hooks/useHorizontalScroll.ts` | Edit | T1, T9 | **Sedang** — menyentuh `pageWidth` (dipakai `maxScroll`, `currentPage`, `goToPage`) |
| `src/components/book/PageArrows.tsx` | **Baru** | T2 | Rendah — komponen murni presentational |
| `src/components/book/BookLayout.tsx` | Edit (+1 render) | T2 | Rendah |
| `src/styles/page-indicator.css` | Edit (+`.page-arrow`) | T2 | Rendah |
| `src/styles/layout.css` | Edit (`dvh`) | T6 | Rendah |
| `src/styles/gallery.css` | Edit (`dvh`) | T6 | Rendah |
| `src/styles/experience.css` | Edit (`dvh`) | T6 | Rendah |

**Tidak disentuh:**
- `src/pages/**` — nol perubahan komponen halaman
- `src/components/book/Sidebar.tsx` — hamburger tetap mati
- `src/components/ui/ScrollTiltedGrid.tsx`
- `src/styles/{tokens,base,sidebar,cover,content-base,about,skills,projects,contact,print}.css`
- `src/pages/print/**`, `scripts/generate-pdf.mjs`, `package.json`, `tailwind.config.cjs`, `postcss.config.cjs`
- `src/data/**`, `src/utils/**`, `src/types/**`, `src/App.tsx`, `src/main.tsx`
- Tailwind pipeline (keputusan user #10)

---

## Risks & Mitigations

| Risiko | Dampak | Mitigasi |
|---|---|---|
| `--sidebar-width: 0px` merusak perhitungan `pageWidth` | Navigasi halaman salah | T1 membaca dari CSS, bukan hardcode; verifikasi `pageWidth === innerWidth` di mobile |
| `getComputedStyle` dipanggil sebelum CSS ter-apply | `pageWidth` salah saat init | CSS di-load via `import './index.css'` di `main.tsx` sebelum render; media query sudah aktif |
| `.about-aside { order: -1 }` mengubah urutan baca | Screen reader / tab order | `order` hanya visual — urutan DOM tetap; tidak mengubah aksesibilitas |
| `.projects-preview { display: none }` bocor ke desktop | Fitur hover hilang | Selector berada **di dalam** `@media (max-width: 768px)`; verifikasi regresi desktop |
| `dvh` tidak didukung browser lama | Tinggi salah | Fallback `height: 100vh` ditulis **sebelum** `height: 100dvh` |
| `top: 84px` di `.skills-marquee` menutup chapter header | Header tidak terlihat | Nilai dihitung dari `--spacing-unit` (24) + tinggi header (~40) + margin (~20); verifikasi manual |
| Touch threshold terlalu ketat | Swipe horizontal tidak terdeteksi | `absX > 12` cukup longgar untuk jari; bisa diturunkan jadi `8` kalau terlalu ketat |
| `PageArrows` `return null` di cover | Tidak ada masalah | Disengaja (usulan) |
| Panah 40px menghalangi konten | Menutupi teks | `left/right: 12px`, konten punya padding 24px (`--spacing-unit`) — aman; verifikasi manual |
| `contact-email` masih overflow | Teks terpotong | `overflow-wrap: anywhere` sebagai jaring pengaman; verifikasi manual |

---

## Rollback Strategy

Karena push ke `dev` (bukan `main`), rollback sederhana:

```powershell
# Sebelum commit
git checkout src/styles/responsive.css src/styles/layout.css src/styles/gallery.css src/styles/experience.css src/styles/page-indicator.css src/hooks/useHorizontalScroll.ts src/components/book/BookLayout.tsx
Remove-Item src/components/book/PageArrows.tsx

# Setelah commit
git revert <commit-hash>
```

**Jaminan terisolasi:** seluruh perubahan CSS berada di dalam `@media (max-width: 768px)` kecuali:
- `dvh` di `layout.css` / `gallery.css` / `experience.css` — nilainya identik dengan `vh` di desktop (tidak ada address bar)
- `.page-arrow { display: none }` di base, `display: flex` hanya di media query
- `.phone-arrow` tidak dirender di desktop (CSS `display: none`)

---

## Urutan Eksekusi

| # | Task | File | Dependensi |
|---|---|---|---|
| 1 | **T6** | `layout.css`, `gallery.css`, `experience.css` | — |
| 2 | **T1** | `responsive.css`, `useHorizontalScroll.ts` | — |
| 3 | **T2** | `PageArrows.tsx` (baru), `BookLayout.tsx`, `page-indicator.css` | T1 |
| 4 | **T3** | `responsive.css` | T1 |
| 5 | **T4** | `responsive.css` | T1 |
| 6 | **T5** | `responsive.css` | T1 |
| 7 | **T7** | `responsive.css` | T1 |
| 8 | **T8** | `responsive.css` | T1 |
| 9 | **T9** | `useHorizontalScroll.ts` | — |
| 10 | **T10** | — | T1–T9 |
| 11 | **T11** | — | T10 |

**Alasan T6 dulu:** perubahan mekanis & terisolasi, jadi fondasi untuk verifikasi selanjutnya.

**Alasan T1 dulu sebelum T3–T8:** setelah sidebar hilang, lebar konten berubah dari 328px → 390px. Semua tuning layout per-halaman (T3–T8) harus diukur pada lebar yang sudah baru.

**Catatan:** T3–T8 semuanya menyentuh `responsive.css` yang sama. Kerjakan **berurutan**, jangan paralel.

---

## Verification Checklist (Ringkas)

### Mobile (Pixel 7 — 412×915, & 390×844)
- [ ] Sidebar tidak terlihat
- [ ] Konten 100% lebar
- [ ] Panah tampil di halaman 1–6, sembunyi di 0 & 7
- [ ] Panah kiri/kanan berfungsi
- [ ] About: 1 kolom, foto di atas, tidak terpotong
- [ ] Projects: hanya TOC, tidak ada kotak kosong
- [ ] Skills: marquee full lebar, 3 kolom logo terlihat
- [ ] Contact: email tidak overflow
- [ ] Gallery: scroll vertikal lancar, tidak putus saat jari menyimpang
- [ ] Experience: scroll vertikal lancar
- [ ] Cover: nama besar, tidak overflow
- [ ] Colophon: tanda tangan tidak overflow
- [ ] 8 halaman: `scrollWidth === clientWidth` (nol overflow horizontal)
- [ ] 8 halaman: tidak ada elemen tumpuk

### Desktop (1440×900) — Regresi
- [ ] Sidebar 62px muncul
- [ ] Projects hover → preview muncul
- [ ] Panah tidak tampil
- [ ] Layout tidak berubah dari sebelumnya

### Build
- [ ] `npm run build` bersih (TS + Vite)

---

## Future Enhancements (OUT OF SCOPE)

- Ganti panah dengan dot indicator / progress bar
- Swipe hint animation di FrontCover
- Swipe on rail untuk pindah halaman
- Breakpoint tambahan 480px untuk HP kecil
- Cleanup Tailwind pipeline (config + deps tidak terpakai)
- Perbaiki anchor `#projects` di `AboutPage.tsx:76` — **tidak ada target** `id="projects"` di mana pun
- Aktifkan `.sidebar-hamburger` (`Sidebar.tsx:24`) sebagai menu navigasi
