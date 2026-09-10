# Task: Projects TOC Fix + Skills Logo Marquee

## Overview

Dua perubahan halaman:
1. **ProjectsPage** — fix layout TOC (naik saat hover) + simplify preview (hapus desc/stack/highlights, simpan data untuk halaman lain)
2. **SkillsPage** — redesign jadi infinite logo scroll marquee, abu-abu background, 3 baris alternating direction, hover slowdown + full color

---

## Task 1: ProjectsPage Fix

### Masalah
- TOC list (kiri) naik ke atas ketika hover item, karena konten di kanan (description/stack/highlights/links) expand dan affect grid row height
- TOC list harus: mepet kiri, fixed position, tidak terpengaruh konten di sampingnya
- Preview kanan terlalu padat — description/stack/highlights dihapus, simpan datanya untuk halaman lain

### File Berubah

#### 1. `src/pages/contents/ProjectsPage.tsx`

**Apa yang dihapus:**
- Block `.projects-preview-desc` (lines 84-138) — seluruh motion.div berisi:
  - `<motion.p className="projects-desc-text">` (description)
  - `<motion.div className="projects-stack">` (stack items)
  - `<motion.ul className="projects-highlights">` (highlights)
  - `<motion.div className="projects-links">` (github + demo links)

**Apa yang tetap:**
- `.projects-preview-empty` (empty state dengan book lines)
- `.projects-preview-content` wrapper
- `.projects-preview-frame` (border + image dengan scale 0.1→1 animation)
- `.projects-book-lines` di bawah frame

**Struktur akhir ProjectsPage:**
```
<div className="book-page book-page-content projects-page">
  <motion.div className="chapter-header">...</motion.div>

  <div className="projects-split">
    {/* LEFT — TOC list */}
    <div className="projects-toc-list">
      {projects.map(...)}  // toc-entry dengan hover
    </div>

    {/* RIGHT — Preview frame only */}
    <div className="projects-preview">
      <div className="projects-preview-empty">
        <div className="projects-book-lines" />
      </div>
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div className="projects-preview-content">
            <div className="projects-preview-frame">
              <motion.img ... />  // scale 0.1→1
            </div>
            <div className="projects-book-lines" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>
```

**Catatan:** Data `projects.ts` TIDAK diubah. Field `description`, `stack`, `highlights`, `githubUrl`, `demoUrl` tetap ada — akan dipakai di halaman lain nanti (case study / detail page).

#### 2. `src/index.css` — Projects section

**Apa yang diubah:**

`.projects-toc-list` — tambah properties:
```css
.projects-toc-list {
  display: flex;
  flex-direction: column;
  position: sticky;       /* BARU */
  top: 120px;            /* BARU — pin di bawah chapter header */
  align-self: start;     /* BARU — tidak stretch oleh grid */
}
```

**Apa yang dihapus (CSS yang tidak lagi dipakai):**
- `.projects-preview-desc`
- `.projects-desc-text`
- `.projects-stack`
- `.projects-highlights`
- `.projects-links`

**Yang tetap:**
- `.projects-split` (grid)
- `.projects-toc-list` (dengan sticky)
- `.projects-preview` (container)
- `.projects-preview-empty` + `.hidden`
- `.projects-preview-content`
- `.projects-preview-frame` (border + aspect-ratio)
- `.projects-preview-image`
- `.projects-book-lines`

---

## Task 2: SkillsPage Redesign

### Deskripsi
Halaman Skills diubah dari 3-column text list menjadi infinite logo marquee:
- Background: abu-abu terang (`#faf9f6` dari Khanh Nguyen palette)
- 3 baris logo stack, alternating direction (up / down / up)
- Logo dari `react-icons/si` (Simple Icons brand logos)
- Default: grayscale + opacity 0.4 (match tema monochrome)
- Hover per baris: animasi melambat (40s → 200s), logo berwarna full
- Marquee area: 40% page height, positioned di bottom

### Install Package
```bash
npm install react-icons
```

### File Berubah

#### 1. `src/pages/contents/SkillsPage.tsx`

**Struktur baru:**
```tsx
import { motion } from 'framer-motion';
import {
  SiTypescript, SiJavascript, SiPhp, SiPython,
  SiPostgresql, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiLaravel, SiNodedotjs,
  SiTailwindcss, SiFramer,
  SiGit, SiDocker, SiVite, SiFigma, SiLinux
} from 'react-icons/si';

interface SkillsPageProps { isActive?: boolean; }

// 3 rows, alternating direction
const row1 = [SiTypescript, SiJavascript, SiPhp, SiPython, SiPostgresql, SiHtml5, SiCss3];
const row2 = [SiReact, SiNextdotjs, SiLaravel, SiNodedotjs, SiTailwindcss, SiFramer];
const row3 = [SiGit, SiDocker, SiVite, SiFigma, SiLinux];

export default function SkillsPage({ isActive = false }) {
  return (
    <div className="book-page book-page-content skills-page">
      <motion.div className="chapter-header">...</motion.div>

      {/* Marquee container — 40% page height */}
      <div className="skills-marquee">
        {/* Row 1 — scroll up */}
        <div className="skills-marquee-row" data-direction="up">
          <div className="skills-marquee-track">
            {[...row1, ...row1].map((Icon, i) => (
              <span key={i} className="skills-logo-item">
                <Icon size={48} />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scroll down */}
        <div className="skills-marquee-row" data-direction="down">
          <div className="skills-marquee-track">
            {[...row2, ...row2].map((Icon, i) => (
              <span key={i} className="skills-logo-item">
                <Icon size={48} />
              </span>
            ))}
          </div>
        </div>

        {/* Row 3 — scroll up */}
        <div className="skills-marquee-row" data-direction="up">
          <div className="skills-marquee-track">
            {[...row3, ...row3].map((Icon, i) => (
              <span key={i} className="skills-logo-item">
                <Icon size={48} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Catatan:**
- Content di-duplicate 2x per row (`[...row, ...row]`) untuk seamless infinite loop
- `data-direction` attribute untuk CSS selector `up` / `down`
- Icon size 48px (bisa adjust di CSS)
- Tidak ada text label per category — logo saja, lebih clean

#### 2. `src/index.css` — Skills section

**Apa yang dihapus:**
- `.skills-columns`
- `.skills-column`
- `.skills-column-title`
- `.skills-list`
- `.skills-list-item`

**Apa yang ditambahkan:**

```css
/* Skills Page — Marquee */
.skills-page {
  background: #faf9f6;
}

.skills-marquee {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  overflow: hidden;
  padding: 0 var(--spacing-unit);
}

.skills-marquee-row {
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Track — content duplicated 2x, translate 0 → -50% for seamless loop */
.skills-marquee-track {
  display: flex;
  align-items: center;
  gap: 48px;
  width: max-content;
  white-space: nowrap;
}

/* Row direction: up = translateY 0 → -50% (content moves up) */
.skills-marquee-row[data-direction="up"] .skills-marquee-track {
  animation: scrollUp 40s linear infinite;
}

/* Row direction: down = translateY -50% → 0 (content moves down) */
.skills-marquee-row[data-direction="down"] .skills-marquee-track {
  animation: scrollDown 40s linear infinite;
}

/* Logo item */
.skills-logo-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #8a8178;
  filter: grayscale(100%) opacity(0.4);
  transition: filter 0.4s ease;
}

/* Hover per row — slowdown + full color */
.skills-marquee-row:hover .skills-marquee-track {
  animation-duration: 200s;
}

.skills-marquee-row:hover .skills-logo-item {
  filter: grayscale(0%) opacity(1);
}

/* Keyframes */
@keyframes scrollUp {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@keyframes scrollDown {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
```

**Responsive (mobile):**
```css
@media (max-width: 768px) {
  .skills-marquee {
    height: 50%;
  }

  .skills-marquee-track {
    gap: 32px;
  }

  .skills-logo-item svg {
    width: 36px;
    height: 36px;
  }
}
```

---

## Execution Steps

### Step 1: Install react-icons
```bash
npm install react-icons
```

### Step 2: Edit `src/pages/contents/ProjectsPage.tsx`
1. Hapus block `.projects-preview-desc` (lines 84-138)
2. Pastikan struktur: frame + book lines saja di preview
3. Hapus import yang tidak terpakai jika ada

### Step 3: Edit `src/index.css` — Projects section
1. Tambah `position: sticky; top: 120px; align-self: start;` ke `.projects-toc-list`
2. Hapus CSS: `.projects-preview-desc`, `.projects-desc-text`, `.projects-stack`, `.projects-highlights`, `.projects-links`
3. Responsive: tetap pertahankan `.projects-split` grid 1fr untuk mobile

### Step 4: Rewrite `src/pages/contents/SkillsPage.tsx`
1. Import 18 icons dari `react-icons/si`
2. Define 3 rows (row1: 7 logos, row2: 6 logos, row3: 5 logos)
3. Render `.skills-marquee` container dengan 3 `.skills-marquee-row`
4. Each row: duplicate content `[...row, ...row]`, map to `<Icon size={48} />`
5. `data-direction` attribute: row1="up", row2="down", row3="up"

### Step 5: Edit `src/index.css` — Skills section
1. Hapus: `.skills-columns`, `.skills-column`, `.skills-column-title`, `.skills-list`, `.skills-list-item`
2. Tambah: `.skills-page` (bg #faf9f6), `.skills-marquee`, `.skills-marquee-row`, `.skills-marquee-track`, `.skills-logo-item`
3. Tambah: `@keyframes scrollUp`, `@keyframes scrollDown`
4. Tambah: hover effects (slowdown + full color)
5. Update responsive: mobile font-size → svg size 36px, marquee height 50%

### Step 6: Build & verify
```bash
npm run build
```

---

## Verification Checklist

### ProjectsPage
- [ ] TOC list (kiri) tidak bergerak saat hover item
- [ ] TOC list mepet kiri, tidak terpengaruh konten kanan
- [ ] Preview kanan: hanya image frame (scale 0.1→1) + book lines
- [ ] Tidak ada description/stack/highlights/links di preview
- [ ] Data `projects.ts` tetap utuh (field tidak dihapus)

### SkillsPage
- [ ] Background abu-abu terang (#faf9f6)
- [ ] 3 baris logo, alternating direction (up/down/up)
- [ ] Logo scroll infinite, smooth, seamless loop
- [ ] Default: grayscale + opacity 0.4
- [ ] Hover per baris: animasi melambat, logo berwarna
- [ ] Marquee area: 40% page height, di bawah
- [ ] Responsive mobile: logo lebih kecil, height 50%

### Build
- [ ] `npm run build` sukses tanpa error
- [ ] TypeScript: tidak ada unused import
- [ ] CSS: tidak ada syntax error
