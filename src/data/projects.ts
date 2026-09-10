import { Project, Experience } from '../types';

export const projects: Project[] = [
  {
    id: 'sip-pkbm',
    title: 'Sistem Informasi Penilaian PKBM Khoiru Ummah',
    status: 'Production',
    year: '2025',
    description: 'Sistem akademik end-to-end untuk lembaga pendidikan non-formal, aktif digunakan sejak 2025.',
    stack: ['Laravel 12', 'PHP 8.3', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Docker', 'VPS'],
    highlights: [
      'Role-based access 5 role (Admin, Pengajar, Wali Kelas, Kepala PKBM, Peserta Didik)',
      'Approval workflow nilai: input → rekap → validasi → publish',
      'Import/Export Excel peserta didik',
      'Queue job untuk proses berat & audit trail activity log',
      'Deploy ke VPS via Docker container',
    ],
    image: '/assets/images/projects/sip_pkbm.png',
    githubUrl: 'https://github.com/rizqinrr/sip_pkbm',
  },
  {
    id: 'lms-personal',
    title: 'Learning Management System (LMS)',
    status: 'In Development',
    year: '2026',
    description: 'Platform belajar mandiri dengan arsitektur modern, dikembangkan sebagai solusi untuk kebutuhan tutor pribadi.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Express.js', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
    highlights: [
      'Arsitektur monorepo terstruktur (npm workspaces)',
      'Autentikasi via Supabase Auth + JWT verification',
      'Shared Zod schemas antara frontend dan backend',
      'App Router (Next.js) + REST API (Express + TypeScript)',
    ],
    image: '/assets/jpg/foto2.jpg',
    githubUrl: 'https://github.com/rizqinrr',
  },
  {
    id: 'sim-penanggulangan-bencana',
    title: 'Sistem Informasi Manajemen Penanggulangan Bencana',
    status: 'Academic Project',
    year: '2024',
    description: 'Sistem pengelolaan distribusi logistik dan layanan sosial pasca bencana, diusulkan untuk Dinas Sosial Kabupaten Cilacap.',
    stack: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    highlights: [
      'Manajemen distribusi logistik bencana terpadu',
      'Koordinasi layanan sosial pasca bencana',
      'Peran sebagai Project Manager — koordinasi tim, dokumentasi, jadwal',
    ],
    image: '/assets/jpg/port1.png',
    githubUrl: 'https://github.com/rizqinrr',
  },
];

export const experiences: Experience[] = [
  {
    id: 'instruktur-coding',
    role: 'Instruktur Coding',
    company: 'PKBM Khoiru Ummah',
    period: 'Agustus 2026 — Sekarang',
    type: 'Freelance',
    context: 'Pengajaran pemrograman dasar di lembaga pendidikan non-formal.',
    highlights: [
      'Menyusun kurikulum dan materi coding dari nol',
      'Mengelola kelas dan dokumentasi kegiatan',
    ],
    stack: ['Programming Fundamentals', 'Web Basics', 'Mentoring'],
  },
  {
    id: 'tutor-komputer',
    role: 'Tutor Komputer & Coding',
    company: 'Mandiri / Privat',
    period: 'April 2026 — Sekarang',
    type: 'Freelance',
    context: 'Bimbingan privat komputer dan coding secara mandiri.',
    highlights: [
      'Mengelola 5 peserta aktif secara mandiri',
      'Menyusun laporan perkembangan untuk orang tua',
    ],
    stack: ['Computer Literacy', 'Python', 'Web Development'],
  },
  {
    id: 'backend-dev-baracipta',
    role: 'Junior Backend Developer',
    company: 'PT Baracipta Esa Engineering',
    period: 'Agustus 2025 — Desember 2025',
    type: 'Full Time',
    context: 'Pengembangan REST API dalam tim software development perusahaan engineering.',
    highlights: [
      'Membangun dan memelihara REST API menggunakan CodeIgniter 3',
      'Dokumentasi API menggunakan Postman',
      'Kolaborasi tim dengan alur kerja terstruktur',
    ],
    stack: ['PHP', 'CodeIgniter 3', 'Postman', 'REST API', 'MySQL'],
  },
];

