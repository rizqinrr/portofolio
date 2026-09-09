interface SidebarProps {
  currentPage: number;
  onNavigate: (index: number) => void;
}

const chapters = [
  { label: 'cover', index: 0 },
  { label: 'about', index: 1 },
  { label: 'skills', index: 2 },
  { label: 'projects', index: 3 },
  { label: 'experience', index: 4 },
  { label: 'contact', index: 5 },
  { label: 'colophon', index: 6 },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="book-sidebar">
      <div>
        <div className="book-sidebar-title">
          muhammad rizqi nurrahman
        </div>
        <nav className="book-sidebar-nav">
          {chapters.map((ch) => (
            <a
              key={ch.index}
              className={`book-sidebar-link ${currentPage === ch.index ? 'active' : ''}`}
              onClick={() => onNavigate(ch.index)}
            >
              {String(ch.index).padStart(2, '0')} · {ch.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="book-sidebar-footer">
        portfolio · 2026
      </div>
    </aside>
  );
}
