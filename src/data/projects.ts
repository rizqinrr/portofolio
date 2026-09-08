import { Project } from '../types';

/**
 * ============================================================================
 * PANDUAN MENAMBAHKAN PROYEK BARU:
 * ============================================================================
 * Cukup tambahkan object baru ke dalam array `projects` di bawah ini.
 * Format:
 * {
 *   id: "nama-slug-unik",
 *   title: "Judul Proyek",
 *   description: "Deskripsi singkat tentang apa fungsi proyek ini.",
 *   category: "Web Development" | "Mobile App" | "Backend / API" | "UI/UX",
 *   tags: ["React", "Laravel", "Tailwind", dll],
 *   image: "/portofolio/assets/jpg/port1.png", // Letakkan gambar di public/assets/jpg/ atau public/assets/images/
 *   githubUrl: "https://github.com/rizqinrr/nama-repo", // Opsional
 *   demoUrl: "https://demo-link.com", // Opsional
 *   featured: true, // true jika ingin disorot
 * }
 * ============================================================================
 */

export const projects: Project[] = [
  {
    id: 'nurman-course',
    title: 'Nurman Course',
    description: 'Platform edukasi daring untuk kursus dan pembelajaran terstruktur dengan manajemen materi interaktif.',
    category: 'Web Development',
    tags: ['PHP', 'Laravel', 'Bootstrap', 'MySQL'],
    image: '/portofolio/assets/jpg/port1.png',
    githubUrl: 'https://github.com/rizqinrr/nurman-course',
    featured: true,
  },
  {
    id: 'sip-pkbm',
    title: 'SIP PKBM',
    description: 'Sistem Informasi Pembelajaran Pusat Kegiatan Belajar Masyarakat untuk administrasi dan monitoring siswa.',
    category: 'Web Development',
    tags: ['Web Application', 'Database', 'Admin Dashboard'],
    image: '/portofolio/assets/jpg/port2.png',
    githubUrl: 'https://github.com/rizqinrr/sip_pkbm',
    featured: true,
  },
  {
    id: 'nvr-router',
    title: 'nvrRouter',
    description: 'Solusi routing jaringan dan manajemen integrasi perangkat kamera pengawas berbasis IP.',
    category: 'Networking & System',
    tags: ['Networking', 'Scripting', 'Automation'],
    image: '/portofolio/assets/jpg/g1.jpg',
    githubUrl: 'https://github.com/rizqinrr/nvrRouter',
    featured: false,
  },
  {
    id: 'cv-builder',
    title: 'Curriculum Vitae Web',
    description: 'Halaman interaktif profil resume profesional yang responsif dan siap cetak.',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/portofolio/assets/jpg/g2.jpg',
    githubUrl: 'https://github.com/rizqinrr/cv',
    featured: false,
  },
];
