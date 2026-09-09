import { Link } from 'react-router-dom';
import { CaseStudyFlipStack, CaseStudyFlipItem } from '@/components/CaseStudyFlipStack';
import { projects } from '@/data/projects';

// Palet warna modern kontras untuk tema kartu
const PROJECT_THEMES = [
  { background: '#1c1917', foreground: '#fafaf9' }, // Dark Warm Stone
  { background: '#092d3b', foreground: '#e0f2fe' }, // Midnight Ocean
  { background: '#450a0a', foreground: '#fef2f2' }, // Crimson Rust
  { background: '#172554', foreground: '#eff6ff' }, // Deep Royal Navy
  { background: '#052e16', foreground: '#f0fdf4' }, // Emerald Pine
  { background: '#3b0764', foreground: '#faf5ff' }, // Deep Aubergine
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
      demoUrl: proj.demoUrl,
      tags: proj.tags,
    };
  });

  return (
    <div className="relative bg-[#0f1013]">
      {/* Floating Back Button di Pojok Kiri Atas */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/90 active:scale-95"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-base transition-transform group-hover:-translate-x-1">←</span>
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <CaseStudyFlipStack items={flipItems} />
    </div>
  );
}
