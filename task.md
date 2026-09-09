# Task Plan: Sidebar + Cover Refinement

## 1. Cover Name — Kecilin 50% + Kapital
- Font-size: dari `clamp(6rem, 20vw, 22rem)` → `clamp(3rem, 10vw, 11rem)`
- Text: `MUHAMMAD RIZQI` (uppercase)
- File: `src/index.css` (`.cover-name`), `src/components/book/pages/Cover.tsx`

## 2. Sidebar — Lebar +40% + Garis Batas
- Width: dari `44px` → `62px` (44 × 1.4 = 61.6 ≈ 62)
- Border-right: `1px solid` (warna menyesuaikan tema halaman)
- File: `src/index.css` (`--sidebar-width`, `.book-sidebar`)

## 3. Warna — Dark Gray (bukan hijau)
- Cover bg: `#2e2c28` → `#1a1a1a` (abu gelap)
- Text tetap `#f3ede3`
- Sidebar bg menyesuaikan halaman aktif:
  - Halaman dark (cover): sidebar bg = `#1a1a1a`
  - Halaman light (dalam): sidebar bg = `#ffffff`
  - Transisi smooth dengan `transition: background 450ms`
- File: `src/index.css` (`:root`, `.book-sidebar`, `.cover-page`)

## 4. Sidebar Adaptive Color
- Sidebar bg berubah berdasarkan halaman aktif (dark ↔ light)
- Text color juga ikut menyesuaikan
- Implementasi: pass `currentPage` ke Sidebar, conditional class
- File: `src/components/book/Sidebar.tsx`, `src/index.css`

## 5. Sticky Line Kiri Sidebar
- Garis tipis vertikal di sebelah kiri sidebar
- Mengalir dari atas ke bawah sesuai halaman aktif
- Implementasi: `::before` pseudo-element atau div terpisah, `transform: translateY()` berdasarkan `currentPage`
- File: `src/index.css`, `src/components/book/Sidebar.tsx`

## 6. Scroll — Bukan Snap, Tapi Follow Mouse
- Hapus page-snapping (wheel threshold → pindah halaman)
- Ganti: scroll bebas horizontal mengikuti deltaY mouse
- `currentPage` dihitung dari `scrollLeft / pageWidth` (bukan state discrete)
- Transisi halaman tetap smooth tapi tidak auto-snap
- File: `src/hooks/useHorizontalScroll.ts` (rewrite besar)

## Urutan Eksekusi
1. Update CSS tokens (sidebar width, dark gray bg)
2. Update Cover.tsx (uppercase name)
3. Update index.css (cover-name size, sidebar border, adaptive colors)
4. Update Sidebar.tsx (adaptive bg, sticky line)
5. Rewrite useHorizontalScroll.ts (free scroll, no snap)
6. Update BookLayout.tsx (pass scroll position instead of discrete page)
7. Build + verify
