import { Link } from 'react-router-dom';
import { CaseStudyFlipStack, CaseStudyFlipItem } from '@/components/CaseStudyFlipStack';
import { projects } from '@/data/projects';

// Palet warna kontras elegan untuk setiap kartu proyek
const PROJECT_THEMES = [
  { background: '#a94808', foreground: '#fff7ed' }, // Warm Rust
  { background: '#067b8f', foreground: '#ecfeff' }, // Deep Teal
  { background: '#ba075f', foreground: '#fff1f7' }, // Bold Magenta
  { background: '#1e3a8a', foreground: '#eff6ff' }, // Classic Navy
  { background: '#14532d', foreground: '#f0fdf4' }, // Forest Green
  { background: '#4c1d95', foreground: '#faf5ff' }, // Royal Violet
];

export default function Projects() {
  const flipItems: CaseStudyFlipItem[] = projects.map((proj, idx) => {
    const theme = PROJECT_THEMES[idx % PROJECT_THEMES.length];
    return {
      number: String(idx + 1).padStart(2, '0'),
      eyebrow: proj.category || 'Featured Work',
      title: proj.title,
      description: proj.description,
      image: proj.image,
      imageAlt: proj.title,
      background: theme.background,
      foreground: theme.foreground,
      githubUrl: proj.githubUrl,
    };
  });

  return (
    <div className="relative">
      {/* Floating Back Button di Pojok Kiri Atas */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-full bg-black/60 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/85"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
          <span>Kembali</span>
        </Link>
      </div>

      <CaseStudyFlipStack
        items={flipItems}
        hint="Gulir ke Bawah"
        heading="Selected Works & Engineering."
        endLabel="Karya Lainnya Segera Hadir"
      />
    </div>
  );
}
